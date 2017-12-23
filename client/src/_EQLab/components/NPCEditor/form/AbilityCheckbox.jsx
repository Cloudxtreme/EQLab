import React from 'react'
import { Checkbox } from 'react-bootstrap'


class AbilityCheckbox extends React.PureComponent {
  render () {
    const {
      id,
      ability,
      label,
      onChange,
      ...props
    } = this.props;

    return (
      <Checkbox
        id={id}
        value={ability ? ability.level : '0'}
        checked={ability && ability.level ? true : false}
        onChange={e => {
          let newValue;
          e.target.checked ? newValue = '1' : newValue = '0'
          onChange(e.target.id, newValue);
        }}
        {...props}
      >
        {label ? label : null}
      </Checkbox>
    );
  }
}

export default AbilityCheckbox;