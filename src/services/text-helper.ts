export function trimChar(string: string, charToRemove: string) {
    while (string.charAt(0) === charToRemove) {
        string = string.substring(1);
    }

    while (string.charAt(string.length - 1) === charToRemove) {
        string = string.substring(0, string.length - 1);
    }

    return string;
}

export function getUrlSafeId(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '') // remove non special chars except spaces
        .replace(/\s\s+/g, ' ') // change multiple spaces to single space
        .replace(/ /g, '-'); // replace spaces with hyphens
}

export function copyToClipboard(textToCopy: string): void {
    const el = document.createElement('textarea');      // Create a <textarea> element
    el.value = textToCopy;                              // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                    // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px';                          // Move outside the screen to make it invisible
    document.body.appendChild(el);                      // Append the <textarea> element to the HTML document
    const selected =
        document.getSelection()!.rangeCount > 0         // Check if there is any content selected previously
        ? document.getSelection()!.getRangeAt(0)        // Store selection if found
        : false;                                        // Mark as false to know no selection existed before
    el.select();                                        // Select the <textarea> content
    document.execCommand('copy');                       // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                      // Remove the <textarea> element
    if (selected) {                                     // If a selection existed before copying
        document.getSelection()!.removeAllRanges();     // Unselect everything on the HTML document
        document.getSelection()!.addRange(selected);    // Restore the original selection
    }
}