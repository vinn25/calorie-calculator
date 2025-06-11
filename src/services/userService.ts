import { Api } from '@/config';
import apiKey from '@/config/apiKey';
import baseUrl from '@/config/baseUrl';

const request = new Api({
    baseUrl: baseUrl.URL_KTP ?? '',
    xApiKey: apiKey.API_KEY ?? '',
});

// user logs
export const userListLog = async (id: number | null, range?: string) => {
    const response = await request.get(`api/user/${id}/get-logs?range=${range}`, {});
    return response;
}
export const userProfile = async (id: number | null) => {
    const response = await request.get(`api/user/${id}/get-profile`, {});
    return response;
}
export const userGap = async (id: number | null) => {
    const response = await request.get(`api/user/${id}/gap`, {});
    return response;
}
export const userFoodFavorite = async (id: number | null) => {
    const response = await request.get(`api/user/${id}/favorites`, {});
    return response;
}
export const userCreateFoodLog = async (id: number | null, data: any) => {
    const response = await request.post(`api/user/${id}/insert-log`, data, {});
    return response;
}
export const userCreateFoodFavorite = async (id: number | null, data: any) => {
    const response = await request.post(`api/user/${id}/favorites`, data, {});
    return response;
}
export const userDeleteFoodFavorite = async (id: number | null, data: any) => {
    const response = await request.post(`api/user/${id}/delete-favorites`, data, {});
    return response;
}
export const userProfileUpdate = async (id: number | null, data: any) => {
    const response = await request.put(`api/user/${id}/get-profile`, data, {});
    return response;
}