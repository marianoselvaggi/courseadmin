import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import AuthorApi from '../../api/mockAuthorAPI';

const CourseForm = ({course, allAuthors, onSave, onChange, author, save, errors}) => {      
    return (
      <form>
        <h1>Manage Course</h1>
        
        <TextInput 
          name="title"
          label="Title"
          value={course.title}
          onChange={onChange}
          error={errors.title} />

        <SelectInput 
          name="authorId"
          label="Author"
          value={author}
          defaultOption="Select Author"
          options={allAuthors}
          onChange={onChange}
          error={errors.authorId} />

        <TextInput 
          name="category"
          label="Category"
          value={course.category}
          onChange={onChange}
          error={errors.category} />

        <TextInput 
          name="length"
          label="Lenght"
          value={course.length}
          onChange={onChange}
          error={errors.length} />

        <input
          type="submit"          
          disabled={save}
          value={save ? 'Saving...': 'Save'}
          className="btn btn-primary"
          onClick={onSave} />
      </form>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  allAuthors: PropTypes.array,  
  onSave: PropTypes.func.isRequired,
  author: PropTypes.string,
  onChange: PropTypes.func.isRequired,  
  save: PropTypes.bool.isRequired,
  errors: PropTypes.object
};

export default CourseForm;