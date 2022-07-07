export const cutLine = (fullStr, strLen, separator) => {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || '...';

    const sepLen = separator.length;
    const charsToShow = strLen - sepLen;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);

    return fullStr.slice(0, frontChars)
        + separator
        + fullStr.slice(fullStr.length - backChars);
};

export const nameTransform = (name) => {
    const fullNameArr = name.split('_');

    if (fullNameArr.length > 1) {
        const firstName = fullNameArr[ 0 ].charAt(0).toUpperCase() + fullNameArr[ 0 ].slice(1);
        const lastName = fullNameArr[ 1 ].charAt(0).toUpperCase() + fullNameArr[ 1 ].slice(1);

        return `${firstName} ${lastName}`;
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
};
