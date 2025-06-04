import { Api } from '@/config';
import apiKey from '@/config/apiKey';
import baseUrl from '@/config/baseUrl';

const request = new Api({
    baseUrl: baseUrl.BASE_URL ?? '',
    xApiKey: apiKey.API_KEY ?? '',
});

export const publicLoginUser = async (data: any) => {
    const response = await request.post('api/auth/login', data);
    return response;
};

export const publicRegisterUser = async (data: any) => {
    const response = await request.post('api/auth/register', data);
    return response;
};