import React from 'react';
import { Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
// import Checkbox from '../../components/form/Checkbox.jsx';
import {
  PLAYER_CLASSES
  // SPELL_DEITIES
} from '../../../constants/constants.js';
import { SPELL_CATEGORIES } from '../../../constants/spell_categories.js';

const SpellSearchFormOptions = {
  form: 'SpellSearchForm',
  onChange: (values, dispatch, props) => {
    props.searchSpells(values);
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

const FormSelect = field => {
  const {
    input,
    type,
    meta,
    options,
    ...props
  } = field;
  return (
    <FormControl componentClass="select" { ...input } { ...props }>
      <option value={null}></option>
      {
        options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)
      }
    </FormControl>
  );
}

class SpellSearchForm extends React.PureComponent {
  render() {
    return (
      <div id="SpellSearchForm">
        <Form horizontal spellCheck={false}>
          <FormGroup controlId="id">
            <Col componentClass={ControlLabel} md={4}>
              Name/ID
            </Col>
            <Col md={20}>
              <Field component={FormInput} bsSize="sm" type="text" placeholder="Search by Name or ID" name="id" />
            </Col>
          </FormGroup>
          <FormGroup controlId="class">
            <Col componentClass={ControlLabel} md={4}>
              Class
            </Col>
            <Col md={20}>
              <Field component={FormSelect} bsSize="sm" type="text" placeholder="Search by Class" options={PLAYER_CLASSES} name="class" />
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
          <FormGroup controlId="spell_category">
            <Col componentClass={ControlLabel} md={4}>
              Category
            </Col>
            <Col md={20}>
              <Field component={FormSelect} bsSize="sm" type="text" placeholder="Search by Category" options={SPELL_CATEGORIES} name="spell_category" />
            </Col>
          </FormGroup>
          {/* <FormGroup controlId="deity">
            <Col componentClass={ControlLabel} md={4}>
              Deity
            </Col>
            <Col md={20}>
              <Field component={FormSelect} bsSize="sm" type="text" placeholder="Search by Deity" options={SPELL_DEITIES} name="deity" />
            </Col>
          </FormGroup> */}
        </Form>
      </div>

    )
  }
}

SpellSearchForm = reduxForm(SpellSearchFormOptions)(SpellSearchForm)

export default SpellSearchForm;