import { RequestMetadata } from '../../shared/http';
import Schema from '../../shared/schema';

export const metadata: RequestMetadata = {
    url: '/api/samples',
    method: 'GET',
    schema: {
        querystring: Schema.object({
            limit: Schema.int(),
            offset: Schema.int(),
            query: Schema.string(),
        }),
    },
};

export type SamplesRequest = {
    limit?: number,
    offset?: number,
    query?: string,
};

export type SamplesResponse = {
    data: Array<{
        id: number,
        name: string,
    }>,
};