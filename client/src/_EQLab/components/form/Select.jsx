import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

class Select extends React.PureComponent {
  static defaultProps = {
    showLabel: true,
    usePlaceholder: false
  };

  render () {
    const {
      options,
      bsSize,
      feedbackIcon,
      input,
      showLabel,
      usePlaceholder,
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
        {
          showLabel && <ControlLabel>{ label }</ControlLabel>
        }
        <FormControl 
          componentClass="select" 
          value={input.value}
          { ...input } 
          { ...props }
        >
          {
            usePlaceholder && <option key={0} value={0}></option>
          }
          {
            options.map((option, index) => {
              return <option key={index} value={option.value}>{option.label}</option>
            })
          }
        </FormControl>
        { feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> : null }
        { message }
      </FormGroup>
    );
  }
}

export default Select;