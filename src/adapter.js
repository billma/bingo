import fetch from 'node-fetch';

const request = (...args)=>{
  return fetch(...args)
	  .then(res => res.json());
}

const get = (url) => {
  return request(url); 
}
const post = (url, data) => {
  return request(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST', 
    body: JSON.stringify(data)
  });
}

const Action = {
  getTickets: (count) => {
    return get(`/tickets?count=${count}`);
  },
  verify: (data) => {
    return post('/verify', data);
  },
  draw: (data) => {
    return post('/draw', data);
  }
}

export default Action;
