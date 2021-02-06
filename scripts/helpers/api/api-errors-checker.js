import { context } from "../store-context";

const CreateErrorAlert = function (error) {
  context.apply(this).dispatch('HelperPopupState', {
    text: error,
    classes: 'helper-popup--error',
  });
};

const ApiErrorsChecker = function (response) {
  if (response.data.status){
    return true;
  }

  if (response?.data?.status === undefined){
    throw new Error('Неизвестная ошибка');
  }

  if (response?.data?.error === undefined){
    throw new Error('Неизвестная ошибка');
  }

  if (response?.data?.error?.text === undefined){
    throw new Error('Неизвестная ошибка');
  }

  const ErrorText = response.data.error.text;

  /*

  if (response?.data?.error?.type !== undefined){
    const ErrorType = response.data.error.type;

    switch (ErrorType) {
      case 'authorization':
        //context.apply(this).dispatch('user/LogoutUser');
        throw new Error(ErrorText);
      //default:
        //throw new Error('Неизвестная ошибка');
    }
  }

  */

  throw new Error(ErrorText);
};

export { ApiErrorsChecker, CreateErrorAlert };
