export default function roleName(type: string) {
    switch (type) {
        case 'USER':
            return 'USER';

        case 'MANAGER':
            return 'USER';

        case 'DIRECTOR':
            return 'USER';

        case 'FINANCE':
            return 'USER';

        case 'ADMIN':
            return 'ADMIN';

        case 'SUPER_ADMIN':
            return 'ADMIN';

        default:
            return 'ADMIN';
    }
}
