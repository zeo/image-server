import API from "./Base/API";
import {User} from "../AuthService";
import Http from "./Base/Http";

export interface Image {
  id: number;
  name: string;
  url: string;
  size: string;
  created_at: string;
  user: User;
}

export interface Images {
  data: Image[];
}

class ImageService extends API {
  constructor() {
    super();
  }
  
  getAll() {
    return this.get<Images>('/images');
  }
  
  getOne(id: number) {
    return this.get<Image>('/images/' + id);
  }
  
  deleteOne(id: number) {
    return Http.delete('/images/' + id);
  }
}

export default new ImageService();