export enum SOCKET_EVENTS {
  // Device
  SEND_DEVICE_CSS = 'SEND_DEVICE_CSS',

  JOIN_ROOM_CSS = 'JOIN_ROOM_CSS',
  JOIN_ROOM_SSC = 'JOIN_ROOM_SSC',
  //   Send message
  SEND_MESSAGE_CSS = 'SEND_MESSAGE_CSS',
  SEND_MESSAGE_SSC = 'SEND_MESSAGE_SSC',
  // Edit message
  UPDATE_MESSAGE_CSS = 'UPDATE_MESSAGE_CSS',
  UPDATE_MESSAGE_SSC = 'UPDATE_MESSAGE_SSC',
  // Remove message
  REMOVE_MESSAGE_CSS = 'REMOVE_MESSAGE_CSS',
  REMOVE_MESSAGE_SSC = 'REMOVE_MESSAGE_SSC',

  disconnect = 'disconnect',
}