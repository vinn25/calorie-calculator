export function capitalizeWords(text: string) {
    const splitWord = text.split(' ');
    return splitWord.map(word => word.charAt(0).toUpperCase() + text.slice(1)).join(' ')
}