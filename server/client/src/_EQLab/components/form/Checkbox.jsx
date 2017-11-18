import React from 'react'
import { Checkbox as BootstrapCheckbox, FormGroup, HelpBlock } from 'react-bootstrap'


class Checkbox extends React.PureComponent {
  render () {
    const {
      disabled,
      required,
      inline,
      title,
      label,
      meta,
      input,
      ...props
    } = this.props;

    const formattedValue = input.value ? true : false;
    const validationState = meta.touched ? ( meta.error && "error" ) || ( meta.warning && "warning" ) : null;
    const Error = ({ meta: {touched, error} }) =>  (touched && error ? <HelpBlock>{error}</HelpBlock> : null);
   
    return (
      <FormGroup controlId={input.name}>
        {/* <ControlLabel>{label} { required && <Label bsStyle="info">required</Label> }</ControlLabel> */}
        <BootstrapCheckbox
          value={formattedValue}
          checked={formattedValue}
          onChange={e => {
            let newValue;
            e.target.checked ? newValue = true : newValue = false
            input.onChange(newValue);
          }}
          disabled={disabled}
          inline={inline || false}
          title={title || ''}
          validationState={validationState}
          { ...props }
        >
          {label}
        </BootstrapCheckbox>
        <Error meta={meta} />
      </FormGroup>
    );
  }
}

export default Checkbox;