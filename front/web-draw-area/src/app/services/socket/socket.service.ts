import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket;

  constructor() { }

  setupSocketConnection() {
    console.log("setupSocketConnection");
    
    this.socket = io(environment.SOCKET_ENDPOINT);
  }
}
