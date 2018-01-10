import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import AuthorApi from '../../api/mockAuthorAPI';

const CourseListRow = (props) => {  
  return(      
      <tr>
          <td>
            <a href={props.course.watchHref} target="_blank">Watch</a>
            <br />
            <a href="#" onClick={() => props.deleteCourse(props.course.id)}>Delete</a>
          </td>
          <td><Link to={'/course/' + props.course.id}>{props.course.title}</Link></td>
          <td>{AuthorApi.getAuthorName(props.course.authorId)}</td>
          <td>{props.course.category}</td>
          <td>{props.course.length}</td>
      </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

export default CourseListRow;