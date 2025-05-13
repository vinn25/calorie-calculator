function createInitial(name: string) {
    let initial: string = '';
    if (name) {
        const splitName = name.split(' ');
        if (splitName.length > 1) {
            for (let i = 0; i < 1; i++) {
                initial += splitName[i]?.charAt(0).toUpperCase() ?? '';
            }
        } else {
            initial = name.charAt(0).toUpperCase();
        }
    }

    return initial;
}

export default createInitial;
