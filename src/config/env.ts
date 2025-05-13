export const getEnv = () => ({
    BASE_URL_AUTH: process.env.BASE_URL_AUTH ?? '',
    API_KEY_AUTH: process.env.API_KEY_AUTH ?? '',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
});

export default getEnv();
