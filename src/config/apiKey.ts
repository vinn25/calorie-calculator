export const getEnv = () => ({
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    API_KEY_SYSTEM: process.env.NEXT_PUBLIC_API_KEY_SYSTEM,
});

export default getEnv();
