export const getEnv = () => ({
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    URL_KTP: process.env.NEXT_PUBLIC_API_URL_KTP,
});

export default getEnv();
