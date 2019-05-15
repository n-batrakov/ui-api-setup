import { metadata, SamplesRequest, SamplesResponse } from './contract';
import { ensureSuccessStatusCode, readJson, formatUrl } from '../../shared/http';

export const queryIssues = async (req?: SamplesRequest): Promise<SamplesResponse> => {
    const url = formatUrl(metadata.url, req);

    const response = await fetch(url, { method: metadata.method });

    ensureSuccessStatusCode(response);

    const body = await readJson(response);

    return body;
};