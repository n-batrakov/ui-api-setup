import { RegisterHandler, authenticate, getCredentials } from '../../server/shared';
import { metadata, SamplesRequest, SamplesResponse } from './contract';

const handler: RegisterHandler = (server, container) => server.route({
    ...metadata,
    preHandler: authenticate,
    handler: async (req, resp) => {
        const auth = getCredentials(req.headers.authorization);

        const { limit, offset, query } = req.query as SamplesRequest;

        const result : SamplesResponse = {
            data: [{
                id: 0,
                name: 'Sample #1',
            }],
        };

        return result;
    },
});

export default handler;