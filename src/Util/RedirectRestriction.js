
export const checkAuthentication = () => {
  const authorized = JSON.parse(localStorage.getItem("loggedInUser"));
  if (authorized?.token) {
    return true;
  } else {
    return false;
  }
};

export const redirectRestriction = () => {
  return checkAuthentication() ? true : false;
};
