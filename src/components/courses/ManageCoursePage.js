import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from '../courses/CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
      super(props, context);

      this.state = {
        course: Object.assign({}, this.props.course),        
        errors: {}
      };
  }

  render() {
      return(
        <CourseForm
          course={this.state.course}
          allAuthors={this.props.authors}
          errors={this.state.errors}            
        />
      );
  }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired
};

function mapStateToProps(state,ownprops) {
  let courseIn = {id: '',watchHref: '', title: 'Mariano', authorId: '', length: '', category: ''};
  
  const authorsFormattedDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
    
  return {
    course: courseIn,
    authors: authorsFormattedDropdown
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };  
}

export default connect(mapStateToProps,mapDispatchToProps)(ManageCoursePage);