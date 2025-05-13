import { Api } from '@/config';
import apiKey from '@/config/apiKey';
import baseUrl from '@/config/baseUrl';

const request = new Api({
    baseUrl: baseUrl.BASE_URL ?? '',
    xApiKey: apiKey.API_KEY ?? '',
});

export const sharedUserProfile = async (token: string) => {
    const response = await request.get('/user/profile', {
        token,
    });
    return response;
};

//  auth
export const sharedAuthRefresh = async (token: string) => {
    const response = await request.post('/auth/refresh-token', undefined, {
        token,
    });
    return response;
};

export const sharedAuthChangePass = async (token: string, data: any) => {
    const response = await request.patch('/auth/change-password', data, {
        token,
    });
    return response;
};

// user
export const sharedUserUploadPhoto = async (token: string, data: any) => {
    const response = await request.postForm(
        '/user/profile/upload-photo',
        data,
        {
            token,
        }
    );
    return response;
};

// activity
export const sharedActivityList = async (token: string, params: any) => {
    const response = await request.get('/activity/list', {
        token,
        queries: params,
    });
    return response;
};

export const sharedSessionList = async (token: string, params: any) => {
    const response = await request.get('/session/list', {
        token,
        queries: params,
    });
    return response;
};

export const sharedSessionRevoke = async (token: string, session: string) => {
    const response = await request.delete(`/session/revoke/${session}`, {
        token,
    });
    return response;
};

export const sharedPasswordList = async (token: string, params: any) => {
    const response = await request.get('/password-history/list', {
        token,
        queries: params,
    });
    return response;
};
