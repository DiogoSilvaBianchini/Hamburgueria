import io from 'socket.io-client'

const url = import.meta.env.VITE_URL_BACKEND_SOCKET

export const socket = io(url)