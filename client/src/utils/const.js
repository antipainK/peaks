// DEFINE YOUR CONST VARIABLES HERE
export const LEFT_MENU_WIDTH = 240;

const logoutUrlPath = 'auth/google/logout';
export const logoutUrl =
  process.env === 'production'
    ? `/${logoutUrlPath}`
    : `http://localhost:4000/${logoutUrlPath}`;
