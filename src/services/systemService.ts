import { Api } from '@/config';
import apiKey from '@/config/apiKey';
import baseUrl from '@/config/baseUrl';

const request = new Api({
    baseUrl: baseUrl.API_SYSTEM ?? '',
    xApiKey: apiKey.API_KEY_SYSTEM ?? '',
});

export const systemWorkspaceList = async (token: string, params: any) => {
    const response = await request.get('/workspace/list', {
        token,
        queries: params,
    });
    return response;
};

export const systemWorkspaceListOwner = async (token: string, params: any) => {
    const response = await request.get('/workspace/list/owner', {
        token,
        queries: params,
    });
    return response;
};

export const systemWorkspaceListMember = async (token: string, params: any) => {
    const response = await request.get('/workspace/list/member', {
        token,
        queries: params,
    });
    return response;
};
export const systemWorkspaceCheckAssign = async (
    token: string,
    params: any
) => {
    const response = await request.get('/workspace/check/assign', {
        token,
        queries: params,
    });
    return response;
};

export const systemCountryList = async (token: string, params: any) => {
    const response = await request.get('/country/list', {
        token,
        queries: params,
    });
    return response;
};
export const systemRoleList = async (token: string, params: any) => {
    const response = await request.get('/role/list', {
        token,
        queries: params,
    });
    return response;
};

export const systemUserListNonAssignWorkspace = async (
    token: string,
    id: string,
    params: any
) => {
    const response = await request.get(
        `/user/list/non-assigned-workspace/${id}`,
        {
            token,
            queries: params,
        }
    );
    return response;
};

export const systemWorkspaceNonMember = async (
    token: string,
    id: string,
    params: any
) => {
    const response = await request.get(`/workspace/list/non-member/${id}`, {
        token,
        queries: params,
    });
    return response;
};

// claim
export const systemClaimListReviewer = async (
    token: string,
    workspace: string,
    params: any
) => {
    const response = await request.get(`/claim/${workspace}/list/reviewer`, {
        token,
        queries: params,
        workspace,
    });
    return response;
};

export const systemClaimListApprover = async (
    token: string,
    workspace: string,
    params: any
) => {
    const response = await request.get(`/claim/${workspace}/list/approver`, {
        token,
        queries: params,
        workspace,
    });
    return response;
};

export const systemClaimVendorList = async (
    token: string,
    workspace: string,
    params: any
) => {
    const response = await request.get(`/claim-vendor/${workspace}/list`, {
        token,
        queries: params,
    });
    return response;
};

export const systemClaimVendorCreate = async (
    token: string,
    data: any,
    workspace: string
) => {
    const response = await request.post(
        `/claim-vendor/${workspace}/create`,
        data,
        {
            token,
        }
    );
    return response;
};

export const systemClaimVendorDelete = async (
    token: string,
    workspace: string,
    params: any,
    id: string
) => {
    const response = await request.delete(
        `/claim-vendor/${workspace}/create/${id}`,
        {
            token,
            queries: params,
        }
    );
    return response;
};
