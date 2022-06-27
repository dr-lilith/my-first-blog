import { func } from "prop-types";

const addAuthHeader = (headers = new Headers()) =>{
    const accessToken = localStorage.getItem("token");
    if (accessToken)
        headers.append({ 'Authorization': `Bearer ${accessToken}`});

    return headers;
}

async function post(url = '', data = {}, errorCallback = ()=>{}) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers = addAuthHeader(headers);
    const response = await fetch(url, {
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: headers,
      body: JSON.stringify(data)
    }).catch(errorCallback);
    return await response.json();
  }

async function get(url = '', errorCallback = ()=>{}){
    const response = fetch(url, { headers: addAuthHeader()})
        .catch(errorCallback);
    return await response.json();
}

async function checkToken(){
    if (localStorage.getItem("token")){
        return await get("/user/profile")
            .then(_ => true, 
                err => { //todo try to use refresh token
                })
    }
    return false;   
}

export const getData = get;
export const postData = post;
export const validateLogin = checkToken;