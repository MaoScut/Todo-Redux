import React from 'react';
import PropTypes from 'prop-types';

function CreateTodo({ onCreate }) {
  return (
    <button onClick={onCreate}>新建</button>
  );
}
CreateTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CreateTodo;
