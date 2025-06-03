import { Api } from '@/config';
import apiKey from '@/config/apiKey';
import baseUrl from '@/config/baseUrl';

const request = new Api({
    baseUrl: baseUrl.URL_KTP ?? '',
    xApiKey: apiKey.API_KEY ?? '',
});

// user logs
export const userListLog = async (id: string) => {
    const response = await request.get(`api/user/${id}/get-logs`, {});
    return response;
}
export const userProfile = async (id: string) => {
    const response = await request.get(`api/user/${id}/get-profile`, {});
    return response;
}
export const userGap = async (id: string) => {
    const response = await request.get(`api/user/${id}/gap`, {});
    return response;
}
export const userCreateFoodLog = async (id: string, data: any) => {
    const response = await request.post(`api/user/${id}/insert-log`, data, {});
    return response;
}
export const userCreateFoodFavorite = async (id: string, data: any) => {
    const response = await request.post(`api/user/${id}/favorites`, data, {});
    return response;
}
export const userProfileUpdate = async (id: string, data: any) => {
    const response = await request.put(`api/user/${id}/get-profile`, data, {});
    return response;
}
export const userDeleteFoodFavorite = async (id: string) => {
    const response = await request.delete(`api/user/${id}/favorites`, {});
    return response;
}