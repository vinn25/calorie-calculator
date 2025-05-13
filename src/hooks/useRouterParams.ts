import { useRouter } from 'next/router';

export function useRouterParam(name: string) {
    const router = useRouter();
    return router.query[name];
}
