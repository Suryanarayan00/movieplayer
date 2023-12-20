import axios from 'axios';

export async function apiReq(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {},
) {
  console.log('ENDPOINT : ', endPoint);
  console.log('DATA : ', data);
  return new Promise(async (res, rej) => {
    headers = {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGYxYzlkYWI3Yzg1M2M3YWQ1MjQ0MDI1ODA3YmIxZSIsInN1YiI6IjY1ODE3NDc3MjI2YzU2MDgxOTllZTJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yaHUKZsmnPaDHUl9aumZLYYuL0YHdhfdf9elExU3pEE',
    };
    if (method === 'get' || method === 'delete') {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }

    axios[method](endPoint, data, {headers})
      .then(result => {
        console.log(endPoint, 'thejlj');
        const {data} = result;

        if (data.status === false) {
          return rej(data);
        }

        return res(data);
      })
      .catch(error => {
        console.log('Request Error: ', error);
        // console.log(error&&error.response,'the error respne')
        if (error && error.response && error.response.status === 401) {
          // NavigationService.resetNavigation());
          // NavigationService.navigate('onBoardScreen');
          // const {dispatch} = store;
          // dispatch({
          //   type: types.CLEAR_REDUX_STATE,
          //   payload: {},
          // });
        }
        console.log(error, 'this is error 2');
        if (error && error.response && error.response.data) {
          if (!error.response.data.msg) {
            return rej({
              ...error.response.data,
              msg: error.response.data.message || 'Network Error',
            });
          }
          return rej(error.response.data);
        } else {
          return rej({message: 'Network Error', msg: 'Network Error'});
        }
        return rej(error);
      });
  });
}

export function apiPost(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'put', headers);
}
export function apiPatch(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'patch', headers);
}
