import { User } from "@prisma/client";

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
    register: AuthRegisterState;
    food: FoodState,
    user: UserState,
    suggest: SuggestState;
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
        data: User | null
    };
    actions?: {
        loading: boolean;
        error: any;
        type: 'success' | 'failed' | null;
        message: any;
    };
}

export interface AuthRegisterState {
    loading: boolean;
    isRegister: boolean;
    isLogin: boolean;
    error: any;
    token: {
        accessToken: string;
        refreshToken: string;
    };
    profile: {
        loading: boolean;
        error: string;
        data: User | null;
    };
    actions?: {
        loading: boolean;
        error: any;
        type: 'success' | 'failed' | null;
        message: any;
    };
}

export interface FoodState {
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
    search: {
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

export interface UserState {
    list: {
        loading: boolean;
        error: any;
        data: any;
    }
    profile: {
        loading: boolean;
        error: any;
        data: any;
    }
    gap: {
        loading: boolean;
        error: any;
        data: any;
    }
    favorite: {
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

export interface SuggestState {
    list: {
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