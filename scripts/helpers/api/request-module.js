import { CreateErrorAlert, ApiErrorsChecker } from "./api-errors-checker";
import { context } from "../store-context";

const CreateRequest  = async function (data) {
  if (data === undefined || data === null){
    return;
  }

  if (!data.hasOwnProperty('path') || context.apply(this).$ApiPath === undefined || context.apply(this).$ApiPath === null){
    return;
  }

  const token = () => {
    const token = data.hasOwnProperty('token') ? data.token : context.apply(this).getters['user/UserToken'];

    return token === null || token === undefined ? false : token;
  };

  await context.apply(this).$axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token(),
    },
    url: `${context.apply(this).$ApiPath}${data.path}`,
    data: data.RequestBody
  }).then(response => {
    //console.log(`response data from ${data.path}:`, response);

    ApiErrorsChecker.call(context.apply(this), response);

    if (data.hasOwnProperty('ResponseCallback')){
      data.ResponseCallback(response);
    }
  }).catch(error => {
    //console.log(`error data from ${data.path}:`, error);
    CreateErrorAlert.call(context.apply(this), error);

    if (data.hasOwnProperty('ErrorCallback')){
      data.ErrorCallback(error);
    }
  }).finally(() => {
    if (data.hasOwnProperty('FinallyCallback')){
      data.FinallyCallback();
    }
  })
};

export { CreateRequest };
