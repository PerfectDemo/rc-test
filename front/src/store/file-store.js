import { observable, action } from 'mobx';
import socket from '../service/socket';
import CONFIG from '../config';

const BASE_URL = CONFIG.SERVER_URL;

export default class FileStore {
    @observable name = '';
    @observable url = '';
    @observable id = '';
    @observable content = '';
    @observable files = [];
    @observable lock = false;

    @action fetchFiles() {
        const filesApi = BASE_URL + '/api/v1/files';
        return fetch(filesApi)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(item => item.url = `${BASE_URL}${item.url}`);
                        this.files = data;
                    });
    }

    @action setCurrentFile(file) {
        const { name, id, url } = file;
        name ? this.name = name : null;
        id ? this.id = id : null;
        url ? this.url = url : null;
    }

    createFile(name, content) {
        const filesApi = BASE_URL + '/api/v1/files';
        return fetch(filesApi, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, content })
          })
          .then(response => response.json())   
    } 

    @action getFile(id) {
        const api = BASE_URL + `/api/v1/files/${id}`;
        return fetch(api)
          .then(response => response.json()) 
          .then(file => {
             this.id = file.id;
             this.url = file.url;
             this.name = file.name;

             return fetch(BASE_URL + this.url).then(res => res.text())
          })
          .then(content => this.content = content);
    }

    updateFile(id, content) {
        const api = BASE_URL + `/api/v1/files/${id}`;
        return fetch(api, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
          })
          .then(response => response.json())   
    }

    requireLock(id) {
        socket.emit('lock', { id });
    }

    @action setLock(lock) {
        console.log('do lock', lock);
        this.lock = lock;
    }
}