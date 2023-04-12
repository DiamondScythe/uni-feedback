//This function retrieves the JWT token from the cookies by
//searching for a cookie named jwt. If the cookie is found, it returns true;
//otherwise, it returns false.

export function getJwtToken() {
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith("jwt=");
  });
}
