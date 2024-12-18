import CryptoJS from 'crypto-js';

export const Md5Converter = (mobileNumber) => {
return CryptoJS.MD5(mobileNumber).toString();
    }