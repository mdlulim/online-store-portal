var stage = process.env.REACT_APP_ENV || 'dev';

export default {
    stage,
    appName: process.env.APP_NAME || 'ONS Admin',
    auth: {
        cookie: {
            name: '__onsAdminUserSession',
            expires: 1, // days
        }
    },
    results: {
        offset: 0,
        limit: 50,
        pagination: {
            perPage: 50,
            perPageOptions: [50, 100, 250, 500, 1000]
        },
        sorting: {
            deals: {
                column: 'created',
                direction: 'desc',
            },
            devices: {
                column: 'created',
                direction: 'desc',
            }
        }
    },
};
