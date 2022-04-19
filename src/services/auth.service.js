import { base_url } from "../config/config";

export async function loginUser(user) {
    return fetch(`${base_url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      
}