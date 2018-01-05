import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from '../courses/CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
      super(props, context);

      this.state = {
        course: Object.assign({}, this.props.course),        
        errors: {}
      };

      this.updateCourseState = this.updateCourseState.bind(this);
      this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({},nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;    
    return this.setState({course: course});
  }

/*  getAuthorText() {    
    if(!this.state.course.authorId) return '';

    let auth = this.props.authors.filter(data => {
      return data.value == this.state.course.authorId;
    });
        
    return auth[0].text;
  }*/

  courseFormisInvalid(){
    let formisvalid = true;
    let errors= {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
      formisvalid = false;
    }

    this.setState({errors: errors});
    return formisvalid;
  }

  saveCourse(event) {    
    event.preventDefault();
    
    if(!this.courseFormisInvalid()) {
      return;
    }

    this.props.actions.saveCourse(this.state.course)
      .then(()=> {
        this.redirect();
        toastr.success('Course saved');
      })
      .catch(error => {                 
        toastr.error(error);        
      });    
  }

  redirect() {
    this.context.router.push('/courses');    
  }

  render() {
      return(        
        <CourseForm
          course={this.state.course}
          authorText={this.state.course.authorId}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          allAuthors={this.props.authors}
          errors={this.state.errors}            
        />
      );
  }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object 
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  
  if(course) return course[0];
  return null;
}

function mapStateToProps(state,ownProps) {        
  //const courseid = ownProps.params.id;
  const courseid = ownProps.params.id;    

  let course = {id: '',watchHref: '', title: '', authorId: '', length: '', category: ''};    

  if(courseid && state.courses.length > 0) {
    course = getCourseById(state.courses, courseid);
  }
  
  const authorsFormattedDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
    
  return {
    course: course,
    authors: authorsFormattedDropdown
  };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };  
}

export default connect(mapStateToProps,mapDispatchToProps)(ManageCoursePage);