import axios from "axios";
import { APIS } from "./apiConstants";

export const getAllUsersApi = ({ callBack, error }) => {
  const url = APIS.getAllUsers;
  axios.get(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const getAllCourses = ({ callBack, error }) => {
  const url = APIS.allCourses;
  axios.get(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const deleteUser = ({ userId, callBack, error }) => {
  const url = APIS.getAllUsers + "/" + userId;
  axios.delete(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const createCourse = ({ courseData, callBack, error }) => {
  console.log("payload",courseData);
  const url = APIS.allCourses;
  axios
    .post(url, courseData)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMsg) => {
      error(errorMsg);
    });
};

export const getCourseById = ({ courseId, callBack, error }) => {
  const url = APIS.allCourses + "/" + courseId;
  axios.get(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const deleteCourses = ({ courseId, callBack, error }) => {
  const url = APIS.allCourses + "/" + courseId;
  axios.delete(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const getCategory = ({ callBack ,error}) => {
  const url = APIS.getCategory;
  axios.get(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const createCategory = ({ payload, callBack }) => {
  const url = APIS.getCategory;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

export const updateDuration = ({ payload, callBack, error }) => {
  const url = APIS.updateDuration;
  axios.post(url, payload).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const updateMemberDetails = ({ payload, callBack, error}) => {
  const url = APIS.updateMember;
  axios.post(url, payload).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};
export const createTestPortal = ({ payload, callBack, error}) => {
  const url = APIS.getTest;
  axios.post(url, payload).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};
export const getTeam = ({ callBack,error }) => {
  const url = APIS.updateMember;
  axios.get(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const getTeamByID = ({ teamId, callBack }) => {
  const url = APIS.updateMember + "/" + teamId;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const deleteMember = ({ userId, callBack, error }) => {
  const url = APIS.updateMember + "/" + userId;
  axios.delete(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};
export const deleteTestPortal = ({ userId, callBack, error }) => {
  const url = APIS.getTest + "/" + userId;
  axios.delete(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const updateTeam = ({ payload, callBack, error }) => {     //test portal
  const url = APIS.updateMember;
  axios.post(url, payload).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const getTestimonal = ({ callBack, error }) => {
  const url = APIS.getTestimonal;
  axios.get(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const updateTestimonial = ({ payload, callBack, error }) => {
  const url = APIS.getTestimonal;
  axios.post(url, payload).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const deleteTestimonial = ({ userId, callBack, error }) => {
  const url = APIS.getTestimonal + "/" + userId;
  axios.delete(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const getTest = ({ callBack, error }) => {
  const url = APIS.getTest;
  axios.get(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};

export const getTestByID = ({ testId, callBack, error }) => {    //test portal
  const url = APIS.getTest + "/" + testId;
  axios.get(url).then((response) => {
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
};


export const login =({payload, callBack,error})=>{
  const url = APIS.login;
  axios.post(url,payload).then((response)=>{
    callBack(response);
  }).catch((errorMessage) => {
    error(errorMessage);
  });
}