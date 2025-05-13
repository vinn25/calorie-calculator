interface Payload {
    data?: any;
    token?: string;
    id?: string | number;
    code?: string | number;
    message?: string;
}

interface Params {
    type: string;
    payload?: Payload;
}

export type Dispatch = (params: Params | Function) => void;

export type GetState = () => Reducers;

export interface Action {
    type: string;
    payload?: Payload;
}

export interface Reducers {
    auth: AuthState;
    project: ProjectState;
    vendor: VendorState;
}

export interface AuthState {
    loading: boolean;
    isLogin: boolean;
    error: any;
    token: {
        accessToken: string;
        refreshToken: string;
    };
    profile: {
        loading: boolean;
        error: string;
        data: any;
    };
    actions?: {
        loading: boolean;
        error: any;
        type: 'success' | 'failed' | null;
        message: any;
    };
}

export interface ProjectState {
    list: {
        loading: boolean;
        error: any;
        data: any;
    }
    detail: {
        loading: boolean;
        error: any;
        data: any;
    }
    actions?: {
        loading: boolean;
        error: any;
        type: 'success' | 'failed' | null;
        message: any;
    };
}

export interface VendorState {
    list: {
        loading: boolean;
        error: any;
        data: any;
    }
    detail: {
        loading: boolean;
        error: any;
        data: any;
    }
    actions?: {
        loading: boolean;
        error: any;
        type: 'success' | 'failed' | null;
        message: any;
    };
}