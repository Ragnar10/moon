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

    refreshLogin: (data) => {
        return fetch(`${apiPath}/api/token/refresh/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    },
};

