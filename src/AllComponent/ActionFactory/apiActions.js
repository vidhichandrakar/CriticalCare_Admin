import axios from "axios";
import { APIS } from "./apiConstants";

export const getAllUsersApi = ({ callBack, searchString, error }) => {
  let url = new URL(`${APIS.getAllUsers}`);
  if (searchString) {
    url.searchParams.set("user_name", searchString);
  }
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const getAllCourses = ({ callBack, searchString, error }) => {
  let url = new URL(`${APIS.allCourses}`);
  if (searchString) {
    url.searchParams.set("course_name", searchString);
  }
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const getAllCoursesFilter = ({
  is_publish,
  duration_type_id,
  category_id,
  callBack,
  error,
}) => {
  let url = new URL(`${APIS.allCoursesFilter}`);
  if (is_publish) {
    url.searchParams.set("is_publish", is_publish);
  }
  if (duration_type_id) {
    url.searchParams.set("duration_type_id", duration_type_id);
  }
  if (category_id) {
    url.searchParams.set("category_id", category_id);
  }
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

export const banner = ({ callBack, error }) => {
  const url = APIS.banner;
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const getCoupon = ({ callBack, error }) => {
  const url = APIS.getCoupon;
  axios.get(url).then((response) => {
    callBack(response);
  });
};
export const putCoupon = ({ coupon_id, payload, callBack, error }) => {
  const url = APIS.getCoupon + "/" + coupon_id;
  axios.put(url, payload).then((response) => {
    callBack(response);
  });
};
export const deleteCoupon = ({ coupon_id, callBack, error }) => {
  const url = APIS.getCoupon + "/" + coupon_id;
  axios.delete(url).then((response) => {
    callBack(response);
  });
};
export const postCoupon = ({ payload, callBack, error }) => {
  const url = APIS.getCoupon;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};
export const EditCoupon = ({ coupon_id, payload, callBack, error }) => {
  const url = APIS.getCoupon + "/" + coupon_id;
  axios.get(url, payload).then((response) => {
    callBack(response);
  });
};

export const bannerTypeapi = ({ callBack, error }) => {
  const url = APIS.banner + "/webbannertype";
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const bannerPositionapi = ({ callBack, error }) => {
  const url = APIS.banner + "/webbannerposition";
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const bannerPage = ({ callBack, error }) => {
  const url = APIS.getBanner;
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const uploadBanner = ({ payload, callBack, error }) => {
  const url = APIS.banner;
  axios
    .post(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      console.error(
        "Error uploading banner:",
        errorMessage.response?.data || errorMessage.message
      );
      error(
        errorMessage.response?.data || {
          message: "An unexpected error occurred.",
        }
      );
      //error(errorMessage);
    });
};

export const updateBanner = ({ web_banner_id, payload, callBack, error }) => {
  const url = `${APIS.banner}/${web_banner_id}`;
  axios
    .put(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const deleteBanner = ({ web_banner_id, callBack, error }) => {
  const url = `${APIS.banner}/${web_banner_id}`;
  axios
    .delete(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const addwebinar = ({ payload, callBack, error }) => {
  const url = APIS.addwebinar;
  axios
    .post(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
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
export const getSubCategory = ({ callBack }) => {
  const url = APIS.getSubCategory;
  axios.get(url).then((response) => {
    callBack(response);
  });
};

export const updateCategory = ({ category_id, payload, callBack }) => {
  const url = APIS.getCategory + "/" + category_id;
  axios.put(url, payload).then((response) => {
    callBack(response);
  });
};

export const createCategory = ({ payload, callBack }) => {
  const url = APIS.getCategory;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

// export const deleteCategory = ({ category_id, callBack, error }) => {
//   const url = `${APIS.getCategory}/${category_id}`;
//   axios
//     .delete(url)
//     .then((response) => {
//       callBack(response);
//     })
//     .catch((errorMessage) => {
//       error(errorMessage);
//     });
// };

export const deleteCategory = ({ category_id, callBack, error }) => {
  const url = `${APIS.getCategory}/${category_id}`;
  axios
    .delete(url)
    .then((response) => callBack && callBack(response))
    .catch((err) => error && error(err));
};

//TeamMember
// Get all team members
export const getAllTeamMembers = ({ callBack, error }) => {
  const url = `${APIS.teamMember}`;
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

// Get a single team member by member_id
export const getTeamMemberById = ({ memberId, callBack, error }) => {
  const url = `${APIS.teamMember}/${memberId}`;
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

// Add a new team member
export const addTeamMember = ({ payload, callBack, error }) => {
  const url = `${APIS.teamMember}`;
  axios
    .post(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

// Delete a team member by member_id
export const deleteTeamMember = ({ memberId, callBack, error }) => {
  const url = `${APIS.teamMember}/${memberId}`;
  axios
    .delete(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

// Update a team member by member_id
export const updateTeamMember = ({ memberId, payload, callBack, error }) => {
  const url = `${APIS.teamMember}/${memberId}`;
  axios
    .put(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const updateMemberDetails = ({ payload, callBack }) => {
  const url = APIS.updateMember;
  axios.post(url, payload).then((response) => {
    callBack(response);
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

export const getAllUsers = ({ userId, callBack }) => {
  const url = APIS.getAllUsers+ "/" + userId;
  axios.get(url).then((response) => {
    callBack(response);
  });
};
export const putTeamByID = ({ payload, teamId, callBack }) => {
  const url = APIS.updateMember + "/" + teamId;
  axios.put(url, payload).then((response) => {
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

export const updateTeam = ({ payload, callBack }) => {
  const url = APIS.updateMember;
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
export const adminLogin = ({ payload, callBack, error }) => {
  const url = APIS.adminLogin;
  axios
    .post(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};
export const resetpass = ({user_id, payload, callBack, error }) => {
  const url = APIS.adminLogin + "/" + "resetpass/" + user_id;
  axios
    .put(url, payload)
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

export const createNumberOfQuestions = ({ payload, callBack }) => {
  const url = APIS.testQuestions;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

export const editQuestions = ({ payload, callBack, questionId }) => {
  const url = APIS.editQuestions + "/" + questionId;
  axios.put(url, payload).then((response) => {
    callBack(response);
  });
};

export const addContentOnCreateCourse = ({ payload, callBack }) => {
  const url = APIS.module;
  axios.post(url, payload).then((response) => {
    callBack(response);
  });
};

export const getBlog = ({ payload, callBack, error }) => {
  const url = APIS.addBlog;
  axios
    .post(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const getBlogs = ({ callBack, error }) => {
  const url = APIS.addBlog;
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {});
};

export const deleteBlog = ({ bloglist_id, callBack }) => {
  const url = APIS.deleteBlog + "/" + bloglist_id;
  axios.delete(url).then((response) => {
    callBack(response);
  });
};
export const getCourseContentById = ({ callBack, courseId, error }) => {
  const url = APIS.getCourseContent + "/" + courseId;
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const postBlog = ({ payload, callBack, error }) => {
  const url = APIS.addBlog;
  axios
    .post(url, payload)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};

export const getModuleByContentCount = ({ callBack, moduleId, error }) => {
  const url = APIS.getModuleContentCount + "/" + moduleId;
  axios
    .get(url)
    .then((response) => {
      callBack(response);
    })
    .catch((errorMessage) => {
      error(errorMessage);
    });
};
