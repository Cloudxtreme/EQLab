import React from 'react';
import { Col, ButtonToolbar, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


class SpellEditorHeader extends React.PureComponent {
  constructor(props) {
    super(props)

    this.onDelete = () => {
      this.props.delete(this.props.spellID, this.props.isRecourse)
    }

    this.onReset = () => {
      this.props.reset(this.props.isRecourse)
    }

    this.onSubmit = () => {
      this.props.handleSubmit(this.props.spellID, this.props.isRecourse)
    }
  }


  render() {
    const { 
      formPristine, 
      formSubmitting, 
      submitSucceeded,
      submitFailed
    } = this.props

    return (
      <div>
        <Col md={5}>
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
        <Col md={5}>
          <ButtonToolbar className="pull-right">
            <Button bsStyle="danger" bsSize="xs" disabled={formSubmitting} onClick={this.onDelete}>
              <FontAwesome name='times' />&nbsp;Delete
            </Button>
            <Button bsStyle="warning" bsSize="xs" disabled={formPristine || formSubmitting} onClick={this.onReset}>
              <FontAwesome name='undo'/>&nbsp;Reset
            </Button>
            <Button bsStyle="primary" bsSize="xs" disabled={formPristine || formSubmitting} onClick={this.onSubmit}>
              <FontAwesome name='hdd-o'/>&nbsp;Save
            </Button>
          </ButtonToolbar>
        </Col>
      </div>
    );
  }
}

export default SpellEditorHeader;