import SocketIOClient from 'socket.io-client';
import stores from '../store';
import CONFIG from '../config';

const ENDPOINT = CONFIG.SERVER_URL;

let socket = SocketIOClient(ENDPOINT);

socket.on('release', message => {
    console.log('release');

    console.log(message, stores.file.id);
    if (+message.id === stores.file.id) {
        socket.emit('lock', { id: +message.id })
    }
});  

socket.on('lock', message => {
    const { result } = message;
    console.log('message:', message);
    stores.file.setLock(result);
});

export default socket;