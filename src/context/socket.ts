import { createContext } from 'react';
import socketio from "socket.io-client";
import { baseURL } from "../Api Services/Links";


export const socket = socketio(baseURL);
export const SocketContext = createContext(socket);
