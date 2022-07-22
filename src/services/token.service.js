
class TokenService {

    setUser(user) {
        console.log(JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    getUserAccessToken(){
        return this.getUser()?.access_token;
    }

    getUserRefreshToken(){
        return this.getUser()?.refresh_token;
    }

    getUserName(){
        return this.getUser()?.name;
    }

    getUserRole(){
        return this.getUser()?.role;
    }

    getUserId(){
        return this.getUser()?.id;
    }

    updateUserAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.access_token = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }

}

export default new TokenService();