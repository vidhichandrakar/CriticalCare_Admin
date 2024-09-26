import { REACT_APP_API } from "../../runtime-config";

export const APIS = {
  getAllUsers: REACT_APP_API + "/user",
  allCourses: REACT_APP_API + "/course",
  allCoursesFilter: REACT_APP_API + "/course?",
  getCategory: REACT_APP_API + "/category",
  updateDuration: REACT_APP_API + "/duration",
  updateMember: REACT_APP_API + "/teamMember",
  getTestimonal: REACT_APP_API + "/testimonial",
  getTest: REACT_APP_API + "/test",
  login: REACT_APP_API + "/login",
  verifyLogin: REACT_APP_API + "/login/verify-otp",
  getSubCategory: REACT_APP_API + "/category/subCategory",
  getCourseDuration: REACT_APP_API + "/durationType",
  getDuration: REACT_APP_API + "/duration",
  fileUpload: REACT_APP_API + "/fileupload",
  getTestById: REACT_APP_API + "/test",
  contentType: REACT_APP_API + "/contentType",
  testInfo: REACT_APP_API + "/test/testinfo",
  testType: REACT_APP_API + "/test/testtype",
  testQuestions: REACT_APP_API + "/test/testquestions",
  editQuestions: REACT_APP_API + "/test/testquestions",
  banner: REACT_APP_API + "/webbanner",
  getBanner: REACT_APP_API + "/webbanner/webpage"
};
