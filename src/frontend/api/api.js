import axios from 'axios';

const DEFAULT_PORT_SERVER = 3000;
const REQUEST_TIMEOUT = 5000;
const SERVER_API_PREFIX = `/api`;
const BASE_URL = `http://localhost:${DEFAULT_PORT_SERVER}${SERVER_API_PREFIX}`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  getPhotos() {
    return this._load(`/photos`);
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }
}

const defaultAPI = new API(BASE_URL, REQUEST_TIMEOUT);

export const getAPI = () => defaultAPI;
