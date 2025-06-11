import { Api } from '@/config';
import apiKey from '@/config/apiKey';
import baseUrl from '@/config/baseUrl';

const request = new Api({
    baseUrl: baseUrl.URL_KTP ?? '',
    xApiKey: apiKey.API_KEY ?? '',
});

// user logs
export const suggestRemaining = async (id: number | null) => {
    const response = await request.get(`api/suggest/remaining?userId=${id}`, {});
    return response;
}