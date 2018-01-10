import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import ViewModal from '../common/ViewModal';

class CoursesPage extends React.Component{
  constructor(props,context) {
    super(props,context);

    this.state = {
      isDeleted: false
    };

    this.redirectToMasterPage = this.redirectToMasterPage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }
  
  redirectToMasterPage() {        
    browserHistory.push('/course');
  }

  deleteCourse(course) {    
    this.setState({isDeleted: true});
       
    this.props.actions.deleteCourse(course)
      .then(()=> {
        this.setState({isDeleted: false});
        toastr.success('Course deleted');
      });
  }

  render(){
    return(
      <div>
        <h1>Courses</h1>
        <ViewModal showModal={this.state.isDeleted} />
        <input type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToMasterPage} />

        <CourseList 
          courses={this.props.courses}
          deleteCourse={this.deleteCourse}
        />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions,dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);