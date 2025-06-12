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
export const foodSearch = async (query: string, id: number | null) => {
    const response = await request.get(`api/food/search?query=${query}&userId=${id}`, {});
    return response;
}