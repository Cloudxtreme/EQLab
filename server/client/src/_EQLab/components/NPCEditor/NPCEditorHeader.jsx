import React from 'react';
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'


class NPCEditorHeader extends React.PureComponent {
  render() {
    const { formPristine, formSubmitting } = this.props
    return (
      <Row id="Spawn2Header">
        <Col md={6}>
          <span className="panel-title">NPC: {this.props.input.value}</span>
        </Col>
        <Col md={12}>
        </Col>
        <Col md={6}>
          <ButtonToolbar className="pull-right">
            <Button bsStyle="danger" bsSize="xs" disabled={formSubmitting} onClick={this.props.deleteNPC}>
              <FontAwesome name='times' />&nbsp;Delete
            </Button>
            <Button bsStyle="warning" bsSize="xs" disabled={formPristine || formSubmitting} onClick={this.props.reset}>
              <FontAwesome name='undo'/>&nbsp;Reset
            </Button>
            <Button bsStyle="primary" bsSize="xs" disabled={formPristine || formSubmitting} onClick={this.props.handleSubmit}>
              <FontAwesome name='floppy-o'/>&nbsp;Save
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    );
  }
}

export default NPCEditorHeader;