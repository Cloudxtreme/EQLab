import React from 'react';
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


class FormHeader extends React.PureComponent {
  render() {
    const { 
      title,
      titleName,
      formPristine, 
      formSubmitting, 
      submitSucceeded, 
      meta: { submitFailed } 
    } = this.props

    return (
      <Row>
        <Col md={10}>
        {
          this.props.isTemplate
            ? <span className="panel-title">{title} Template: {this.props.input.value}{titleName && ` ${titleName}`}</span>
            : <span className="panel-title">{title}: {this.props.input.value}{titleName && ` ${titleName}`}</span>
        }
        </Col>
        <Col md={8}>
        {
          formSubmitting && <span>Submitting Form...</span>
        }
        {
          !formSubmitting && submitSucceeded && <span style={{ color: "green" }}>Saved Successfully!</span>
        }
        {
          !formSubmitting && submitFailed && <span style={{ color: "red" }}>Error Submitting Form!</span>
        }
        </Col>
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
      </Row>
    );
  }
}

export default FormHeader;