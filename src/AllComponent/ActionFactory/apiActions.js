import axios from "axios";
import { APIS } from "./apiConstants";

export const getAllUsersApi = ({ callBack }) => {
  const url = APIS.getAllUsers;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const getAllCourses = ({ callBack }) => {
  const url = APIS.allCourses;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const deleteUser = ({ userId, callBack }) => {
  const url = APIS.getAllUsers + "/" + userId;
  axios.delete(url).then((response) => {
    callBack(response);
  });
};
