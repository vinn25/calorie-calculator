import { Api } from '@/config';
import apiKey from '@/config/apiKey';
import baseUrl from '@/config/baseUrl';

const request = new Api({
    baseUrl: baseUrl.URL_KTP ?? '',
    xApiKey: apiKey.API_KEY ?? '',
});

// Food
export const foodList = async () => {
    const response = await request.get('api/food/get-all-foods', {});
    return response;
}
export const foodDetail = async (id: string) => {
    const response = await request.get(`api/food/${id}`, {});
    return response;
}
export const foodSearch = async (query: string) => {
    const response = await request.get(`api/food/search?query=${query}`, {});
    return response;
}

export const ktpProjectCreate = async (token: string, data: any) => {
    const response = await request.post('/projects', data, { token });
    return response;
}

export const ktpProjectUpdate = async (token: string, id: string, data: any) => {
    const response = await request.put(`/projects/${id}`, data, { token });
    return response;
}

export const ktpProjectDelete = async (token: string, id: string) => {
    const response = await request.delete(`/projects/${id}`, { token });
    return response;
}