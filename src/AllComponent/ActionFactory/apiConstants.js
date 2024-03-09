import { REACT_APP_API } from "../../runtime-config";

export const APIS ={
  getAllUsers : REACT_APP_API + "/users",
  allCourses : REACT_APP_API + "/courses",
  getCategory: REACT_APP_API + "/category",
  updateDuration: REACT_APP_API + "/duration",
  updateMember: REACT_APP_API + "/teamMember"
  
}