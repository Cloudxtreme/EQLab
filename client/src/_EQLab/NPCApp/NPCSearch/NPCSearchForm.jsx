import React from 'react';
import { Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
// import Checkbox from '../../components/form/Checkbox.jsx';

const NPCSearchFormOptions = {
  form: 'NPCSearchForm',
  onChange: (values, dispatch, props) => {
    props.searchNPCs(values);
  }
}

const FormInput = field => {
  const {
    input,
    type,
    meta,
    ...props
  } = field;
  return (
    <FormControl type={ type } { ...input } { ...props } />
  );
}

class NPCSearchForm extends React.PureComponent {
  render() {
    return (
      <div id="NPCSearchForm">
        <Form horizontal spellCheck={false}>
          <FormGroup controlId="id">
            <Col componentClass={ControlLabel} md={4}>
              Name/ID
            </Col>
            <Col md={20}>
              <Field component={FormInput} bsSize="sm" type="text" placeholder="Search by Name or ID" name="id" />
            </Col>
          </FormGroup>
          <FormGroup controlId="levelrange">
            <Col componentClass={ControlLabel} md={4}>
              Min Lvl
            </Col>
            <Col md={8}>
              <Field component={FormInput} bsSize="sm" type="text" name="minlevel" />
            </Col>
            <Col componentClass={ControlLabel} md={4}>
              Max Lvl
            </Col>
            <Col md={8}>
              <Field component={FormInput} bsSize="sm" type="text" name="maxlevel" />
            </Col>
          </FormGroup>
        </Form>
      </div>

    )
  }
}

NPCSearchForm = reduxForm(NPCSearchFormOptions)(NPCSearchForm)

export default NPCSearchForm;