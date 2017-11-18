import React from 'react'
import { Field } from 'redux-form'
import Checkbox from './Checkbox.jsx'

class FieldCheckbox extends React.PureComponent {
  render () {
    const {
      name,
      ...props
    } = this.props;

    const toBool = (value) => {
      if (value == 0) {
        return false;
      } else {
        return true;
      }
    }

    const toBool = value => value ? (value == 0 && false) || (value == 1 && true) : false;
    const toInt = value => value ? "1" : "0";
   
    return (
      <Field 
        component={Checkbox} 
        format= { toBool }
        normalize = { toInt }
        name={ name }
        { ...props }
      />
    );
  }
}

export default FieldCheckbox;

