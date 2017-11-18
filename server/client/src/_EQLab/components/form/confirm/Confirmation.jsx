import React from 'react';
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import { confirmable } from 'react-confirm'

class Confirmation extends React.Component {
  render() {
    const {
      okLabel = 'OK',
      cancelLabel = 'Cancel',
      title,
      confirmation,
      show,
      proceed,
      cancel,
      enableEscape = true,
    } = this.props;
    return (
      <div className="static-modal">
        <Modal show={show} onHide={cancel} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {confirmation}
          </Modal.Body>
          <Modal.Footer>
            <Button className='button-sm' bsStyle="primary" onClick={proceed}><strong>{okLabel}</strong></Button>
            <Button className='button-sm' onClick={cancel}>{cancelLabel}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

Confirmation.propTypes = {
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func,     // called when ok button is clicked.
  cancel: PropTypes.func,      // called when cancel button is clicked.
  enableEscape: PropTypes.bool,
}

export default confirmable(Confirmation);