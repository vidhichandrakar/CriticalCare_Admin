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

export const createCourse =({courseData, callBack,error})=>{
  const url = APIS.allCourses;
  axios.post(url,courseData).then((response) => {
    callBack(response);
  }).catch(errorMsg=>{
    error(errorMsg);
  });
}

export const getCourseById = ({ courseId, callBack }) => {
  const url = APIS.allCourses + "/" + courseId;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const deleteCourses = ({ courseId, callBack }) => {
  const url = APIS.allCourses + "/" + courseId;
  axios.delete(url).then((response) => {
    callBack(response);
  });
};