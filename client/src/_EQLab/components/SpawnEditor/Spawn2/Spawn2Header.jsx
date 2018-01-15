import React from 'react';
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


class Spawn2Header extends React.PureComponent {
  render() {
    const { formPristine, formSubmitting } = this.props
    return (
      <Row id="Spawn2Header">
        <Col md={6}>
          <span className="panel-title">spawn2: {this.props.input.value}</span>
        </Col>
        <Col md={12}>
        </Col>
        <Col md={6}>
          <ButtonToolbar className="pull-right">
            <Button bsStyle="danger" bsSize="xs" disabled={formSubmitting} onClick={this.props.deleteSpawn2}>
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
      </Row>
    );
  }
}

export default Spawn2Header;