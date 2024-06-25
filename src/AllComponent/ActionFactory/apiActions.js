import axios from "axios";
import { APIS } from "./apiConstants";

export const getAllUsersApi = ({ callBack, error }) => {
  const url = APIS.getAllUsers;
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const getAllCourses = ({ callBack, error }) => {
  const url = APIS.allCourses;
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const deleteUser = ({ userId, callBack }) => {
  const url = APIS.getAllUsers + "/" + userId;
  axios.delete(url).then((response) => {
    callBack(response);
  });
};

export const createCourse = ({ courseData, callBack, error }) => {
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
export const createTestPortal = ({ payload, callBack, error }) => {
  const url = APIS.getTest;
  axios
    .post(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      // error(errorMessage);
    });
};
export const getTeam = ({ callBack, error }) => {
  const url = APIS.updateMember;
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
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
  axios
    .delete(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};
export const deleteTestPortal = ({ userId, callBack, error }) => {
  const url = APIS.getTest + "/" + userId;
  axios
    .delete(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const updateTeam = ({ payload, callBack }) => {
  const url = APIS.updateMember;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

export const getTestimonal = ({ callBack }) => {
  const url = APIS.getTestimonal;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const updateTestimonial = ({ payload, callBack }) => {
  const url = APIS.getTestimonal;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

export const deleteTestimonial = ({ userId, callBack }) => {
  const url = APIS.getTestimonal + "/" + userId;
  axios.delete(url).then((response) => {
    callBack(response);
  });
};

export const getTest = ({ callBack }) => {
  const url = APIS.getTest;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const getTestByID = ({ testId, callBack }) => {
  const url = APIS.getTest + "/" + testId;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const login = ({ payload, callBack, error }) => {
  const url = APIS.login;
  axios
    .post(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const verifyOtp = ({ payload, callBack, error }) => {
  const url = APIS.verifyLogin;
  axios
    .post(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const createSubCategory = ({ payload, callBack }) => {
  const url = APIS.getCategory;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

export const getSubcategoryList = ({ callBack, mainCatID }) => {
  const url = APIS.getSubCategory + "/" + mainCatID;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const publishOrEditCourse = ({ callBack, courseId, payload }) => {
  const url = APIS.allCourses + "/" + courseId;
  axios.put(url, payload).then((response) => {
    callBack(response);
  });
};

export const getCourseDuration = ({ callBack }) => {
  const url = APIS.getCourseDuration;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const getDuration = ({ callBack }) => {
  const url = APIS.getDuration;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const uploadFile = ({ payload, callBack }) => {
  const url = APIS.fileUpload;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

export const getTestById = ({ callBack, test_id }) => {
  const url = APIS.getTestById + "/" + test_id;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const getOnlineTest = ({ callBack }) => {
  const url = APIS.getTestById;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const getContentType = ({ callBack }) => {
  const url = APIS.contentType;
  axios.get(url).then((respose) => {
    callBack(respose);
  });
};

export const createTestInfo = ({ payload, id, callBack }) => {
  let url = APIS.testInfo;
  if (id) {
    url = url + "/" + id;
    axios.put(url, payload).then((response) => {
      callBack(response);
    });
  } else {
    axios.post(url, payload).then((response) => {
      callBack(response);
    });
  }
};
export const getTestType = ({ callBack }) => {
  const url = APIS.testType;
  axios.get(url).then((respose) => {
    callBack(respose);
  });
};

export const createNumberOfQuestions=({payload, callBack})=>{
  const url = APIS.testQuestions;
  axios.post(url,payload).then((response)=>{
    callBack(response);
  })
}
