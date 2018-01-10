import courseAPI from '../api/mockCourseAPI';
import * as types from '../actions/actionTypes';
import {beginAjaxCall, stopAjaxCall} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {  
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseSuccess(courseid) {
  return { type: types.DELETE_COURSE_SUCCESS, courseid };
}

export function loadCourses() {  
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return courseAPI.getAllCourses().then(courses => {      
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(stopAjaxCall());
      throw(error);      
    });
  };
}

export function saveCourse(course){  
  return function(dispatch) { 
    dispatch(beginAjaxCall());
    return courseAPI.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
      dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(stopAjaxCall());
      throw(error);
    });
  };
}

export function deleteCourse(courseid) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return courseAPI.deleteCourse(courseid).then(() => {
      dispatch(deleteCourseSuccess(courseid));
    });
  };
}
