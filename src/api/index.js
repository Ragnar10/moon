const apiPath = process.env.REACT_APP_BACK_PATH;

export const api = {
    checkRef: (data) => {
        return fetch(`${apiPath}/v1/users/check_ref/?ref=${data}`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    getTwitterOauthToken: () => {
        return fetch(`${apiPath}/v1/twitter/request_token/`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    requestTwitterAccessToken: (data) => {
        return fetch(`${apiPath}/v1/twitter/access_token/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    createSocialUser: (data) => {
        return fetch(`${apiPath}/v1/users/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    getSocialUser: (data) => {
        return fetch(`${apiPath}/v1/users/${data.meta}/`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${data.token}`,
            },
        });
    },

    updateSocialUser: (data) => {
        return fetch(`${apiPath}/v1/users/${data.meta}/`, {
            method:  'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${data.token}`,
            },
            body: JSON.stringify(data.update),
        });
    },

    checkTwitterFollow: (data) => {
        return fetch(`${apiPath}/v1/users/is_twitter_subscribed/?twitter_id=${data.twitter_id}`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    checkTelegramFollow: (data) => {
        return fetch(`${apiPath}/v1/users/is_telegram_subscribed/?username=${data.username}`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    signupAffiliate: (data) => {
        return fetch(`${apiPath}/api/register/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    loginAffiliate: (data) => {
        return fetch(`${apiPath}/api/token/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    refreshLogin: (data) => {
        return fetch(`${apiPath}/api/token/refresh/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    getAffiliateUsers: (data) => {
        return fetch(`${apiPath}/v1/users/?referral__ref=${data.ref}`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${data.token}`,
            },
        });
    },
};

