export const handlerStatus = res => 
    res.ok ? res.json() : Promise.reject(res.statusText);
