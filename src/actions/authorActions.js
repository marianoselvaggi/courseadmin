import authorAPI from '../api/mockAuthorAPI';
import * as types from '../actions/actionTypes';
import {beginAjaxCall} from '../actions/ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return authorAPI.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}
