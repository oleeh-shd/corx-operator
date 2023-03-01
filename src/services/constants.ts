const hostName = process.env.REACT_APP_BACKEND_URL
if (!hostName) {
  throw new Error('BACKEND_URL is not defined');
}

export const LOGIN_ENDPOINT = `${hostName}/login`;
