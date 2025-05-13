import { Api } from '@/config';
import apiKey from '@/config/apiKey';
import baseUrl from '@/config/baseUrl';

const request = new Api({
    baseUrl: baseUrl.API_USER ?? '',
    xApiKey: apiKey.API_KEY ?? '',
});

// tools / claim
export const userClaimList = async (
    token: string,
    workspace: string,
    params: any
) => {
    const response = await request.get(`/claim/list`, {
        token,
        workspace,
        queries: params,
    });
    return response;
};

export const userClaimDetail = async (
    token: string,
    workspace: string,
    id: string
) => {
    const response = await request.get(`/claim/get/${id}`, {
        token,
        workspace,
    });
    return response;
};

export const userClaimCreate = async (
    token: string,
    data: any,
    workspace: string
) => {
    const response = await request.post(`/claim/create`, data, {
        token,
        workspace,
    });
    return response;
};

export const userClaimUpdate = async (
    token: string,
    data: any,
    workspace: string,
    id: string
) => {
    const response = await request.put(`/claim/update/${id}`, data, {
        token,
        workspace,
    });
    return response;
};

export const userClaimExport = async (
    token: string,
    data: any,
    workspace: string,
    id: string
) => {
    const response = await request.post(`/claim/export/${id}`, data, {
        token,
        workspace,
    });
    return response;
};

export const userUpdateMobileNumber = async (token: string, data: any) => {
    const response = await request.put('/user/update/mobile-number', data, {
        token,
    });
    return response;
};

export const userWorkspaceList = async (token: string, params: any) => {
    const response = await request.get('/workspace/list', {
        token,
        queries: params,
    });
    return response;
};

export const userWorkspaceRecent = async (token: string) => {
    const response = await request.get('/workspace/recent', {
        token,
    });
    return response;
};

export const userWorkspaceCreateRecent = async (token: string, data: any) => {
    const response = await request.post('/workspace/create/recent', data, {
        token,
    });
    return response;
};
