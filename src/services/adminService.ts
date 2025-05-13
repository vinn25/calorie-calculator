// import { Api } from '@/config';
import { Api } from '@/config';
import apiKey from '@/config/apiKey';
import baseUrl from '@/config/baseUrl';

const request = new Api({
    baseUrl: baseUrl.API_ADMIN ?? '',
    xApiKey: apiKey.API_KEY ?? '',
});

export const adminUserList = async (token: string, params: any) => {
    const response = await request.get('/user/list', {
        token,
        queries: params,
    });
    return response;
};

export const adminUserDetail = async (token: string, id: string) => {
    const response = await request.get(`/user/get/${id}`, {
        token,
    });
    return response;
};

export const adminUserStateHistory = async (
    token: string,
    id: string,
    params: any
) => {
    const response = await request.get(`/user/get/${id}/state/history`, {
        token,
        queries: params,
    });
    return response;
};

export const adminUserPasswordHistory = async (
    token: string,
    id: string,
    params: any
) => {
    const response = await request.get(`/user/get/${id}/password/history`, {
        token,
        queries: params,
    });
    return response;
};

export const adminUserLoginHistory = async (
    token: string,
    id: string,
    params: any
) => {
    const response = await request.get(`/user/get/${id}/login/history`, {
        token,
        queries: params,
    });
    return response;
};

export const adminUserUpdate = async (token: string, id: string, data: any) => {
    const response = await request.put(`/user/update/${id}`, data, {
        token,
    });
    return response;
};

export const adminUserUpdateWorkspaceRemove = async (
    token: string,
    id: string,
    data: any
) => {
    const response = await request.put(
        `/user/update/${id}/workspace/remove`,
        data,
        {
            token,
        }
    );
    return response;
};

export const adminUserCreate = async (token: string, data: any) => {
    const response = await request.post('/user/create', data, {
        token,
    });
    return response;
};

export const adminUserUpdateAssignWorkspace = async (
    token: string,
    id: string,
    data: any
) => {
    const response = await request.post(
        `/user/update/${id}/workspace/assign`,
        data,
        {
            token,
        }
    );
    return response;
};

export const adminUserAssignedWorkspace = async (
    token: string,
    id: string,
    params: any
) => {
    const response = await request.get(`/user/list/${id}/workspace`, {
        token,
        queries: params,
    });
    return response;
};

export const adminUserUpdateStatus = async (
    token: string,
    id: string,
    data: any
) => {
    const response = await request.patch(`/user/update/${id}/status`, data, {
        token,
    });
    return response;
};

export const adminUserAssignWorkspace = async (
    token: string,
    id: string,
    data: any
) => {
    const response = await request.post(
        `/user/update/${id}/assign-workspaces`,
        data,
        {
            token,
        }
    );
    return response;
};

// workspace
export const adminWorkspaceCreate = async (token: string, data: any) => {
    const response = await request.post('/workspace/create', data, {
        token,
    });
    return response;
};

export const adminWorkspaceList = async (token: string, params: any) => {
    const response = await request.get('/workspace/list', {
        token,
        queries: params,
    });
    return response;
};

export const adminWorkspaceDetail = async (token: string, id: string) => {
    const response = await request.get(`/workspace/get/${id}`, {
        token,
    });
    return response;
};

export const adminWorkspaceMembers = async (
    token: string,
    id: string,
    params: any
) => {
    const response = await request.get(`/workspace/get/${id}/members`, {
        token,
        queries: params,
    });
    return response;
};
export const adminWorkspaceUpdate = async (
    token: string,
    id: string,
    data: any
) => {
    const response = await request.put(`/workspace/update/${id}`, data, {
        token,
    });
    return response;
};

export const adminWorkspaceUpdateMember = async (
    token: string,
    id: string,
    data: any
) => {
    const response = await request.put(
        `/workspace/assign/${id}/members`,
        data,
        {
            token,
        }
    );
    return response;
};

export const adminWorkspaceUpdateOwner = async (
    token: string,
    id: string,
    data: any
) => {
    const response = await request.put(`/workspace/update/${id}/owner`, data, {
        token,
    });
    return response;
};

export const adminWorkspaceRemoveMember = async (
    token: string,
    data: any,
    id: string
) => {
    const response = await request.put(
        `/workspace/remove/${id}/members`,
        data,
        {
            token,
        }
    );
    return response;
};

export const adminWorkspaceChangeMemberType = async (
    token: string,
    data: any,
    id: string,
    user: string
) => {
    const response = await request.put(
        `/workspace/update/${id}/member/${user}/type`,
        data,
        {
            token,
        }
    );
    return response;
};

export const adminWorkspaceDelete = async (token: string, id: string) => {
    const response = await request.delete(`/workspace/delete/${id}`, {
        token,
    });
    return response;
};

// country
export const adminCountryList = async (token: string, params: any) => {
    const response = await request.get('/country/list', {
        token,
        queries: params,
    });
    return response;
};

// role
export const adminRoleList = async (token: string, params: any) => {
    const response = await request.get('/role/list', {
        token,
        queries: params,
    });
    return response;
};

export const adminActivityList = async (
    token: string,
    user: string,
    params: any
) => {
    const response = await request.get(`/activity/${user}/list`, {
        token,
        queries: params,
    });
    return response;
};

export const adminSessionList = async (
    token: string,
    user: string,
    params: any
) => {
    const response = await request.get(`/session/${user}/list`, {
        token,
        queries: params,
    });
    return response;
};

export const adminSessionRevoke = async (
    token: string,
    user: string,
    session: string
) => {
    const response = await request.delete(
        `/session/${user}/revoke/${session}`,
        {
            token,
        }
    );
    return response;
};

export const adminPasswordHistory = async (
    token: string,
    user: string,
    params: any
) => {
    const response = await request.get(`/password-history/${user}/list`, {
        token,
        queries: params,
    });
    return response;
};

// auth
export const adminAuthUpdatePassword = async (
    token: string,
    user: string,
    data: any
) => {
    const response = await request.put(`/auth/update/${user}/password`, data, {
        token,
    });
    return response;
};
