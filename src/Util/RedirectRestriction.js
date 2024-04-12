
export const checkAuthentication = () => {
  const authorized = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log("authorizedauthor 123",authorized)
  if (authorized?.token) {
    console.log("authorizedauthorized",authorized)
    return true;
  } else {
    return false;
  }
};

export const redirectRestriction = () => {
  return checkAuthentication() ? true : false;
};
