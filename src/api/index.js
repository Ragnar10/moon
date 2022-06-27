const apiPath = process.env.REACT_APP_TWITTER_API_PATH || 'http://localhost:4000/api';

export const api = {
    getTwitterOauthToken() {
        return fetch(`${apiPath}/twitter/request_token`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    requestTwitterAccessToken(data) {
        return fetch(`${apiPath}/twitter/access_token`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    getTwitterData() {
        return fetch(`${apiPath}/twitter/users/profile_banner`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
};

