import api from "./api";
import TokenService from "./token.service";

class AuthService {

    login(data) {
        return api
          .post("/login", data)
          .then(response => {
            console.log(response);
            if (response.data.access_token) {
              TokenService.setUser(response.data);
            }
    
            return response.data;
          });
    }
    
    logout() {
    return api.post('/logout', {refresh_token: TokenService.getLocalRefreshToken()});
    }

    register(data) {
    return api.post("/register", data);
    }

    deleteMyAccount() {
    return api.delete("/deleteuser");
    }
    
}

export default new AuthService();