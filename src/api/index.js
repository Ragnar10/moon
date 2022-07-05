const apiPath = process.env.REACT_APP_BACK_PATH;

export const api = {
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

    createUser: (data) => {
        return fetch(`${apiPath}/v1/users/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    signupUser: (data) => {
        return fetch(`${apiPath}/api/register/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },

    loginUser: (data) => {
        return fetch(`${apiPath}/api/token/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },
};

