import * as types from './actionTypes';

export function beginAjaxCall() {
    return {type: types.BEGIN_AJAX_CALL};
}

export function stopAjaxCall() {
    return {type: types.STOP_AJAX_CALL};
}