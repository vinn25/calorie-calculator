export const getEnv = () => ({
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    URL_KTP: process.env.NEXT_PUBLIC_API_URL_KTP,
    BASE_API_URL: process.env.API_URL
});

export default getEnv();
