export async function LoginService(username, password) {

    var URL = "http://localhost:8080/auth/login";
    var data = { username, password };
    
    const response = fetch(URL,{
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}})
      .then((r) => r.json())
      .then((res) => res.token)
      .catch((error) => console.log("Error: ", error));
    return response;
  };
  
  export function DecodeJwt(jwt){
  
    const token = jwt;
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  }