import API from "./Base/API";
import Axios, {AxiosResponse} from "axios";
import AuthService from "../AuthService";
import Http from "./Base/Http";

interface RedirectResponse {
  redirect_url: string;
}

class Auth extends API {
  constructor() {
    super();
  }

  login(method: string) {
    return new Promise((resolve, reject) => {
      Axios.get('/sanctum/csrf-cookie')
        .then(res => {
          this.get<RedirectResponse>('/login/' + method)
            .then(res => {
              resolve(res.data.redirect_url);
            });
        });
    });
  }
  
  async logout(): Promise<AxiosResponse | void> {
    return Http.post('/logout');
  }
}

export default new Auth();