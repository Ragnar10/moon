const apiPath = process.env.REACT_APP_TWITTER_API_PATH;

export const api = {
    getTwitterOauthToken: () => {
        return fetch(`${apiPath}/twitter/request_token/`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    requestTwitterAccessToken: (data) => {
        return fetch(`${apiPath}/twitter/access_token/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    createUser: (data) => {
        return fetch(`${apiPath}/users/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    getUser: (data) => {
        return fetch(`${apiPath}/users/${data.id}/`, {
            method:  'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${data.token}`,
            },
        });
    },

    updateUser: (data) => {
        return fetch(`${apiPath}/users/${data.id}/`, {
            method:  'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${data.token}`,
            },
            body: JSON.stringify(data.update),
        });
    },
};

