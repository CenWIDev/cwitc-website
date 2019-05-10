export function trimChar(string: string, charToRemove: string) {
    while (string.charAt(0) === charToRemove) {
        string = string.substring(1);
    }

    while (string.charAt(string.length - 1) === charToRemove) {
        string = string.substring(0, string.length - 1);
    }

    return string;
}