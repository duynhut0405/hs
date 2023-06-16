const IDENTITY_CARD = 1;
const CITYZEN_IDENTITY = 2;
const PASSPORT = 3;

// RegEx
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const userNameRegex = /^[a-zA-Z\d]{6,}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{8,}$/;
// const textFileFormatRegex = /(.*?)\.(docx|doc|pdf)$/i;
// const fullFileFormatRegex = /(.*?)\.(docx|doc|pdf|xls|xlsx|zip)$/i;
// const imageFormatRegex = /(.*?)\.(png|jpg|jpeg)$/i;
const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const numberRegex = /^[0-9]+$/;
const passportRegex = /[a-zA-Z]{2}[0-9]{7}/;
// const noRequireNumberRegex = /^[0-9]{1,3}$/;
// const urlRegex = /(https?:\/\/)?\.[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)/i;
// const nationalIdRegex = /^[0-9]{9,12}$/;
// const decimalNumberRegex = /^(\d+(\.\d+)?)*$/;
// const percentNumberRegex = /^(\d+(\.\d{1,2})?)$/;
// const projectCoordinateRegex = /^-?\d{1,2}(?:\.\d+)?\s*,\s*-?\d{1,3}(?:\.\d+)?$/;
// const bilPriceNumberRegex = /^(\d{1,5}(\.\d{1,3})?)$/;
// const milPriceNumberRegex = /^(\d{1,8}(\.\d{1,3})?)$/;
// const areaNumberRegex = /^(\d{1,6}(\.\d{1,2})?)$/;

interface Result {
  isError: boolean;
  message: string;
}

function validateEmail(value: string, required: boolean): Result {
  let isError: boolean = !emailRegex.test(value);
  let message = '';
  if (isError) {
    message = 'Email định dạng chưa đúng';
  }
  if ((required && value == '') || value == null) {
    isError = true;
    message = 'Email Required';
  }
  return {
    isError: isError,
    message: message,
  };
}

function validatePhone(value: string, required: boolean): Result {
  let isError: boolean = !phoneNumberRegex.test(value);
  let message = '';
  if (isError) {
    message = 'Phone định dạng chưa đúng';
  }
  if ((required && value == '') || value == null) {
    isError = true;
    message = 'Phone Required';
  }
  return {
    isError: isError,
    message: message,
  };
}

function validateRequired(value: string): Result {
  let isError = false;
  let message = '';
  if (value == '' || value == null) {
    isError = true;
    message = 'Required';
  }
  return {
    isError: isError,
    message: message,
  };
}

function validateIdentity(value: string, required: boolean, type: number): Result {
  let regex = passportRegex;
  if (type == IDENTITY_CARD || type == CITYZEN_IDENTITY) {
    regex = numberRegex;
  }
  let isError: boolean = !regex.test(value);
  let message = '';
  if (isError) {
    message = 'Định dạng chưa đúng';
  }
  if ((required && value == '') || value == null) {
    isError = true;
    message = 'Required';
  }
  return {
    isError: isError,
    message: message,
  };
}

function validateDate(value: string, required: boolean): Result {
  // First check for the pattern
  let isError: boolean = !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value);
  let message = '';
  if (isError) {
    message = 'Định dạng chưa đúng';
  }
  if (required) {
    if (value == '' || value == null) {
      isError = true;
      message = 'Date Required';
    }
  }
  return {
    isError: isError,
    message: message,
  };
}

function validatePassword(value: string, required: boolean): Result {
  // First check for the pattern
  let isError: boolean = !passwordRegex.test(value);
  let message = '';
  if (isError) {
    message = 'Định dạng chưa đúng';
  }
  if (required) {
    if (value == '' || value == null) {
      isError = true;
      message = 'Trường này không được để trống';
    }
  }
  return {
    isError: isError,
    message: message,
  };
}

export {validateEmail, validatePhone, validateRequired, validateIdentity, validateDate, validatePassword};
