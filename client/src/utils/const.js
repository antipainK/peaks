// DEFINE YOUR CONST VARIABLES HERE
export const LEFT_MENU_WIDTH = 240;

export const serverUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://iodemo.jonatanklosko.com'
    : 'http://localhost:4000';

export const socketServerUrl =
  process.env.NODE_ENV === 'production'
    ? 'wss://iodemo.jonatanklosko.com'
    : 'ws://localhost:4000';

export const loginUrl = `${serverUrl}/auth/google/login`;
export const logoutUrl = `${serverUrl}/auth/google/logout`;
export const uploadUrl = `${serverUrl}/upload`;
