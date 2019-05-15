import fastify from 'fastify';
import staticFiles from 'fastify-static';
import { fallback } from './middleware/fallback';
import path from 'path';
import fs from 'fs';

import api from './api';
import { AppContainer } from './shared';

import app from 'commander';


const catchErrors = (callback: () => Promise<void>) => {
    const onError = (e: Error) => {
        console.log(e.stack, 'err');
    };
    try {
        callback()
        .catch((e) => {
            onError(e);
            process.exit(1);
        });
    } catch (e) {
        onError(e);
        process.exit(1);
    }
};


const logger = process.env.NODE_ENV !== 'production'
    ? {
        base: null,
        timestamp: false,
        prettyPrint: process.env.NODE_ENV !== 'production',
    }
    : {
        level: 'info',
    };

app
.name('app')
.version('0.1.0');

app
.command('start')
.option('-h|--host [host]', 'Address to bind server to.', '0.0.0.0')
.option('-p|--port [port]', 'Host address to bind server to.', 8080)
.action(cmd => catchErrors(async () => {
    const server = fastify({ logger });

    const host = cmd.host;
    const parsedPort = parseInt(cmd.port, 10);
    const port = isNaN(parsedPort) ? 8080 : parsedPort;

    const container: AppContainer = {};

    api.forEach(addRoute => addRoute(server, container));

    if (process.env.NODE_ENV !== 'production') {
        const { devServer } = require('./middleware/devServer');
        server.use(devServer());
    } else {
        const staticPath = path.join(__dirname, 'public');
        if (fs.existsSync(staticPath)) {
            server.use(fallback(path.join(staticPath, 'index.html')));
            server.register(staticFiles, {
                root: staticPath,
                cacheControl: true,
                maxAge: '30d',
                immutable: true,
            });
        }
    }

    await server.listen(port, host);
    console.log('Server is up and running...');
}));

app.parse(process.argv);