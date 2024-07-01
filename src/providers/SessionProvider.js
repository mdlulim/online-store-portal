import Cookies from 'js-cookie';
import moment from 'moment';
import Config from '../config';

class SessionProvider {
    static cookiename = Config.auth.cookie.name;
    static start(token) {
        this.destroy();
        this.set(token);
    }

    static destroy() {
        Cookies.remove(this.cookiename);
    }

    static set(jwt, expires = Config.auth.cookie.expires) {
        Cookies.set(this.cookiename, jwt, { expires });
    }

    static get() {
        const jwt = Cookies.get(this.cookiename);
        let session = null;
        try {
            if (jwt) {
                const base64Url = jwt.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                session = JSON.parse(window.atob(base64));
            }
        } catch (error) {
            console.log(error);
        }
        return session;
    }

    static isValid() {
        let valid = false;
        const session = this.get();
        if (session) {
            const { time } = session;
            if (time) {
                const diff = moment(time).add(6, 'hours').diff();
                valid = diff > 0;
            }
        }
        return valid;
    }

    // return the token from the session storage
    static getToken() {
        return Cookies.get(this.cookiename) || null;
    }
}

export default SessionProvider;