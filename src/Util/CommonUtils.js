export const validatePhoneNo = (phoneNo, originalNum) => {
  let num = originalNum;
  if (phoneNo.length > 10) {
    return num;
  } else {
    return phoneNo;
  }
};

export const validateEmail =(email)=>{
    let mail = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    return mail;
}

export function isNotEmptyObject(obj) {
  return obj && typeof obj === "object" && Object.keys(obj).length;
}