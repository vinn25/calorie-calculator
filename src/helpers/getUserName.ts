export function getUserName(email: string) {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return email; // no '@' found, return whole email string
    return email.substring(0, atIndex);
}