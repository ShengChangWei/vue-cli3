import request from '../services/request.service';

const login: any = {
    loginByUserName(params: any) {
        return request.post('/UserController/login', params);
    },
    logOut(): any {
        return request.post('/UserController/logout');
    }
};

export default login;

