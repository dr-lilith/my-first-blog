const addAuthHeader = (headers = {}) =>{
    const accessToken = localStorage.getItem("token");
    if (accessToken)
        headers['Authorization'] = `Bearer ${accessToken}`;

    return headers;
}

async function post(url = '', data = {}, errorCallback = ()=>{}) {
    let headers = { 'Content-Type': 'application/json' };
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
    console.log(url);
    const response = await fetch(url, { headers: addAuthHeader() })
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

export const appendAuthHeader = addAuthHeader;
export const httpGet = get;
export const httpPost = post;
export const validateLogin = checkToken;