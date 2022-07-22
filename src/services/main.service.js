import api from "./api";

class MainService {

    getUsersList() {
        return api.get("/users");
    }

    addUser(user) {
        return api.post("/register", user);
    }


    getCongesList() {
        return api.get("/conges/all");
    }

    addConges(conge) {
        return api.post("/conges", conge);
    }

    getDetailsList(){
        return api.get("/details_all")
    }

    getStatics(){
        return api.get("/statics")
    }
}

export default new MainService();
