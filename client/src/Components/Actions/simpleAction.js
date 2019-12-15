import { RESTService } from '../Api/api';

/*
 src/actions/simpleAction.js
*/
export const simpleAction = () => async dispatch => {


    let temp = [];


    //get call to fetch details and pass payload to dispatch
    dispatch({
        type: 'SIMPLE_ACTION',
        payload: temp,
    })
}