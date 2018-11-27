import fetch from 'node-fetch';

function post(url, data = {}) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json());
}

function get(url) {
  return fetch(url, {
    method: 'GET',
  })
    .then(response => response.json());
}

const api = {
  post,
  get,
};

export default api;
