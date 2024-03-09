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

export const getCategory = ({ callBack }) => {
  const url = APIS.getCategory;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const createCategory = ({ payload, callBack }) => {
  const url = APIS.getCategory;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

export const updateDuration = ({ payload, callBack }) => {
  const url = APIS.updateDuration;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

export const updateMemberDetails = ({ payload, callBack }) => {
  const url = APIS.updateMember;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

export const getTeam = ({ callBack }) => {
  const url = APIS.updateMember;
  axios.get(url).then((response)=>{
    callBack(response);
  });
};

export const deleteMember = ({ userId, callBack }) => {
  const url = APIS.updateMember + "/" + userId;
  axios.delete(url).then((response) => {
    callBack(response);
  });
};

export const updateTeam = ({ payload, callBack }) => {
  const url = APIS.updateMember;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};
