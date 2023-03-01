import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(config => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  if (token) {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
  }

  return config;
});

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error('Error', error);
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }

    if (error?.response?.data['non_field_errors']) {
      return Promise.reject(error.response?.data['non_field_errors'][0]);
    } else {
      return Promise.reject(error.response?.statusText);
    }
  }
);

export default {
  api,
};
