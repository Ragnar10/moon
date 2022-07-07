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

export const getCookie = (name) => {
    const matches = document.cookie.match(new RegExp(
        `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ));

    return matches ? decodeURIComponent(matches[ 1 ]) : null;
};

export const setCookie = (name, value, options = {}) => {
    options = {
        path: '/',
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (const optionKey in options) {
        updatedCookie += `; ${optionKey}`;
        const optionValue = options[ optionKey ];
        if (optionValue !== true) {
            updatedCookie += `=${optionValue}`;
        }
    }

    document.cookie = updatedCookie;
};

export const deleteCookie = (name) => {
    setCookie(name, '', {
        'max-age': -1,
    });
};
