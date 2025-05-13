import { Api } from '@/config';
import apiKey from '@/config/apiKey';
import baseUrl from '@/config/baseUrl';

const request = new Api({
    baseUrl: baseUrl.URL_KTP ?? '',
    xApiKey: apiKey.API_KEY ?? '',
});

// Project
export const ktpProjectList = async (token: string, params: any) => {
    const response = await request.get('/projects', { token, queries: params });
    return response;
}

export const ktpProjectDetail = async (token: string, id: string) => {
    const response = await request.get(`/projects/${id}`, { token });
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

// Vendor
export const ktpVendorList = async (token: string, params: any) => {
    const response = await request.get('/vendors', { token, queries: params });
    return response;
}

export const ktpVendorCreate = async (token: string, data: any) => {
    const response = await request.post('/vendors', data, { token });
    return response;
}