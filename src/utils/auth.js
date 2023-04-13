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

//this function checks for authorization status from api

export async function checkAuthStatus() {
  try {
    const response = await axios.get("http://localhost:8081/userAuth", {
      headers: {
        Authorization: "Bearer " + Cookies.get("jwt"),
      },
    });
    if (response.data.isAuthenticated) {
      // console.log("User info:", response.data.user);
      // console.log("user authenticated:", response.data.isAuthenticated);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
