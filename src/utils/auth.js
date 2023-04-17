//This function retrieves the JWT token from the cookies by
//searching for a cookie named jwt. If the cookie is found, it returns true;
//otherwise, it returns false.

import axios from "axios";
import Cookies from "js-cookie";

export function getJwtToken() {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith("jwt=");
  });
}

//this function checks for authorization status from api, then returns the reponse from the api, which includes isAuthenticated check and user object

export async function checkAuthStatus() {
  try {
    const response = await axios.get("http://localhost:8081/userAuth", {
      headers: {
        Authorization: "Bearer " + Cookies.get("jwt"),
      },
    });
    if (response.data.isAuthenticated) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

//user object looks like this:
// {
//   _id: new ObjectId("643b7b28a54806a22669ebe5"),
//   email: 'abc@gmail.com',
//   role: 'Admin',
//   __v: 0
// }
