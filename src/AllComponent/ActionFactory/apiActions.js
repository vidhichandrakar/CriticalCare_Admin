import axios from "axios";
import { APIS } from "./apiConstants";

export const getAllUsersApi =({callBack})=>{
  const url = APIS.getAllUsers;
  axios.get(url).then(response =>{
    callBack(response);
  })
}