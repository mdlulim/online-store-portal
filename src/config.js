var Config = {};
let stage = 'local'
if (window.location) {
    var arr = window.location.hostname.split('.');
    if (arr[0] !== 'localhost') {
        stage = arr[1];
        if (stage === 'onsglobal') {
            Config.STAGE = 'development';
        } else if (stage === 'qa') {
            Config.STAGE = 'qa';
        } else if (stage === 'release') {
            Config.STAGE = 'release';
        }else {
            Config.STAGE = 'production';
        }
    }
}
Config.auth = {
    cookie: {
        name: '__onsAdminChannelUserSession',
        expires: 1, // days
    }
}
if (Config.STAGE === 'production') {
    Config.API = {
        BASE_URL: 'https://api.onsglobal.io/v1/admin',
        BASE_URL_LOGIN: 'https://api.onsglobal.io/v1/auth',
        BASE_URL_GEOAPI: 'https://geolocation-db.com/json/',
    }
} else if (Config.STAGE === 'qa') {
    Config.API = {
        BASE_URL: 'https://dev.qa.onsglobal.io/v1/admin',
        BASE_URL_LOGIN: 'https://dev.qa.onsglobal.io/v1/auth',
        BASE_URL_GEOAPI: 'https://geolocation-db.com/json/',
    }
} else if (Config.STAGE === 'development') {
    Config.API = {
        BASE_URL: 'https://dev.onsglobal.io/v1/admin',
        BASE_URL_LOGIN: 'https://dev.onsglobal.io/v1/auth',
        BASE_URL_GEOAPI: 'https://geolocation-db.com/json/',
    }
} else if (Config.STAGE === 'release') {
    Config.API = {
        BASE_URL: 'https://dev.release.onsglobal.io/v1/admin',
        BASE_URL_LOGIN: 'https://dev.release.onsglobal.io/v1/auth',
        BASE_URL_GEOAPI: 'https://geolocation-db.com/json/',
    }
}else {
    Config.STAGE = 'local'
    Config.API = {
        BASE_URL: 'http://localhost:7134/v1/admin',
        BASE_URL_LOGIN: 'https://localhost:7134/v1/Auth',
        BASE_URL_GEOAPI: 'https://geolocation-db.com/json/',
    }
}

export default Config;
