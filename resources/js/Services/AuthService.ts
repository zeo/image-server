import { EventEmitter } from "events";
import Http from "./API/Base/Http";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  upload_token: string;
}

class AuthService extends EventEmitter {
  async login(token: string): Promise<void> {
    Http.setToken(token);

    let res = await Http.get<User>("/user");
    if (!res) return;
  
    localStorage.setItem("user", JSON.stringify(res.data));
    
    this.emit('login');
  }
  
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    this.emit('logout');
  }
  
  get loggedIn(): boolean {
    return localStorage.getItem("user") != null;
  }
  
  get user(): User | null {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();