import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

class Select extends React.PureComponent {
  render () {
    const {
      options,
      bsSize,
      feedbackIcon,
      input,
      label,
      type,
      meta: { error, warning, touched },
      ...props
    } = this.props;

    let message;
    const validationState = touched ? ( error && "error" ) || ( warning && "warning" ) : null;
   
    if ( touched && ( error || warning ) ) {
      message = <HelpBlock>{ error || warning }</HelpBlock>;
    }

    return (
      <FormGroup controlId={input.name} bsSize={ bsSize } validationState={ validationState }>
        <ControlLabel>{ label }</ControlLabel>
        <FormControl 
          componentClass="select" 
          value={input.value}
          { ...input } 
          { ...props }
        >
          {options.map((option, index) => {
            return <option key={index} value={option.value}>{option.label}</option>
          })}
        </FormControl>
        { feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> : null }
        { message }
      </FormGroup>
    );
  }
}

export default Select;