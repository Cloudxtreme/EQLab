import React from 'react';
import { Col, ButtonToolbar, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


class SpellEditorHeader extends React.PureComponent {
  render() {
    const { 
      formPristine, 
      formSubmitting, 
      submitSucceeded
    } = this.props

    return (
      <div>
        <Col md={6}>
          <ButtonToolbar className="pull-right">
            <Button bsStyle="danger" bsSize="xs" disabled={formSubmitting} onClick={this.props.delete}>
              <FontAwesome name='times' />&nbsp;Delete
            </Button>
            <Button bsStyle="warning" bsSize="xs" disabled={formPristine || formSubmitting} onClick={this.props.reset}>
              <FontAwesome name='undo'/>&nbsp;Reset
            </Button>
            <Button bsStyle="primary" bsSize="xs" disabled={formPristine || formSubmitting} onClick={this.props.handleSubmit}>
              <FontAwesome name='hdd-o'/>&nbsp;Save
            </Button>
          </ButtonToolbar>
        </Col>
      </div>
    );
  }
}

export default SpellEditorHeader;