import axios from 'axios';
import Config from '../config';
import SessionProvider from './SessionProvider';
import {
  osName,
  osVersion,
  browserName,
  isMobile,
} from 'react-device-detect';

const authToken = SessionProvider.getToken();

let headers = {
  'Content-Type': 'application/json'
};

if (SessionProvider.isValid()) {
  headers = {
    'Authorization'   : `Bearer ${authToken}`,
    'Content-Type'    : 'application/json',
    'X-Frame-Options' : 'SAMEORIGIN',
    'X-XSS-Protection': 1,
    'X-Content-Type-Options': 'nosniff',
  }
}

class AuthService { 
  

    static async login(username, password, device, geoinfo){
        
        const apiURL = Config.API.BASE_URL_LOGIN;
        console.log(apiURL+'/login',{"user":username, "password":password, "device":device, "geoinfo": geoinfo})
        const res    = await axios.post(apiURL+'/login',{"user":username, "password":password});
        return res;
    }

    static async addUser(user){
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          data: user,
          headers: headers,
          url: `${Config.API.BASE_URL}users`,
        }).then((res) =>{
          const result = {status: res.data.status, message: res.data.message}
          return result;
        });
      }

      static async editUser(id, user){
        return await axios({
          mode: 'no-cors',
          method: 'PUT',
          data: user,
          headers: headers,
          url: `${Config.API.BASE_URL}users/${id}`,
        }).then((res) =>{
          const result = {status: res.data.status, message: res.data.message}
          return result;
        });
      }

      static async getUsers() {
        return await axios({
          mode: 'no-cors',
          method: 'GET',
          headers: headers,
          url: `${Config.API.BASE_URL}/users?group=admin`,
        });
      }

      static async verifyToken(token, type = 'activation', data = {}) {
        if (token) {
          headers = {
            'Authorization': `Bearer ${token}`,
          }
        }
        const device = {
          browser: browserName,
          os_name: osName,
          os_version: osVersion,
          is_mobile: isMobile,
        };
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          url: `${Config.API.BASE_URL_LOGIN}/tokens/verify`,
          crossdomain: true,
          data: { ...data, type, device },
          headers,
        })
          .then((json) => json.data)
          .then(res => res)
          .catch((err) => {
            if (err.response) return err.response.data;
            return err;
          });
      };

      static async confirmResetPassword(data) {
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          url: `${Config.API.BASE_URL_LOGIN}/password/reset/confirm`,
          crossdomain: true,
          data,
          headers: {
            'Authorization': `Bearer ${data.token}`,
          },
        })
          .then((json) => json.data)
          .then(res => res)
          .catch((err) => {
            if (err.response) return err.response.data;
            return err;
          });
      };
    

      static async resetPassword(data){
        data.baseurl = `${Config.API.BASE_URL_LOGIN}`
        return await axios({
          mode: 'no-cors',
          method: 'POST',
          data: data,
          headers: headers,
          url: `${Config.API.BASE_URL_LOGIN}/password/reset`,
        }).then((res) =>{
          const result = {success: res.data.success, message: res.data.message}
          return result;
        });
      }

    static async logout() {
        // remove user from local storage to log user out bPDg2i
        SessionProvider.destroy();
    }
}
export default AuthService;
