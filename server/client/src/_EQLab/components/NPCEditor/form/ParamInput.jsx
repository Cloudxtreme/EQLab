import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

class ParamInput extends React.PureComponent {
  render () {
    const {
      id,
      paramIndex,
      disabled,
      param,
      onChange,
      bsSize,
      label,
      type,
      ...props
    } = this.props;

    return (
      <FormGroup bsSize={bsSize}>
        <FormControl type={type}
                     placeholder={label}
                     id={id}
                     disabled={disabled}
                     value={param ? param : ''}
                     onChange={e => {
                       let newValue;
                       e.target.value ? newValue = e.target.value : newValue = ''
                       onChange(e.target.id, parseInt(paramIndex, 10), newValue);
                     }}
                     {...props}/>
      </FormGroup>
    );
  }
}

export default ParamInput;