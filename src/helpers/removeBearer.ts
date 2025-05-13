export function removeBearer(token: string) {
    if (token.startsWith("Bearer ")) {
        return token.substring(7);
    }
    return token;
}