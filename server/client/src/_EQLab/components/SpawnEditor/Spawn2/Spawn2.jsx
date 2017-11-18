import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Input from '../../form/Input.jsx'
import Checkbox from '../../form/Checkbox.jsx'
import Spawn2Header from './Spawn2Header.jsx'
import Spawn2Footer from './Spawn2Footer.jsx'

const mapStateToProps = state => ({
  initialValues: state.global.spawn.spawn2
});

const Spawn2Options = {
  form: 'Spawn2',
  enableReinitialize: true
}

class Spawn2 extends React.PureComponent {
  render() {
    return (
      <form id="Spawn2" spellCheck={false}>
        <Panel 
          header={
            <Field 
              name="id" 
              component={Spawn2Header} 
              deleteSpawn2={this.props.deleteSpawn2}
              formPristine={this.props.pristine}
              formSubmitting={this.props.submitting}
              reset={this.props.reset}
              handleSubmit={this.props.handleSubmit}
            />
          } 
          footer={
            <Field 
              name="spawngroupID"
              component={Spawn2Footer} 
              spawngroupName={this.props.spawngroupName}
              newSpawngroup={this.props.newSpawngroup}
              changeSpawngroup={this.props.changeSpawngroup}
              clearSpawngroup={this.props.clearSpawngroup}
            />
          }
        >
          <Row>
            <Col md={19}>
              <fieldset className="form-border">
              <legend className="form-border">Location</legend>
                <Row>
                  <Col md={3}>
                    <Field component={Input} type="text" name="zone" label="zone"  
                      bsSize="sm"
                      readOnly />
                  </Col>
                  <Col md={2}>
                    <Field component={Input} type="text" name="version" label="version"  
                      bsSize="sm" />
                  </Col>
                  <Col md={4}>
                    <Field component={Input} type="text" name="x" label="x"  
                      bsSize="sm" />      
                  </Col>
                  <Col md={4}>
                    <Field component={Input} type="text" name="y" label="y"  
                      bsSize="sm" />            
                  </Col>
                  <Col md={4}>
                    <Field component={Input} type="text" name="z" label="z"  
                      bsSize="sm" />             
                  </Col>
                  <Col md={4}>
                    <Field component={Input} type="text" name="heading" label="heading"  
                      bsSize="sm" />            
                  </Col>
                  <Col md={3}>
                    <Field component={Input} type="text" name="pathgrid" label="pathgrid"  
                      bsSize="sm" />             
                  </Col>
                </Row>
              </fieldset>
            </Col>
            <Col md={5}>
            {/* Empty */}
            </Col>
          </Row>
          <Row>
            <Col md={24}>
              <Row>
                <Col md={12}>
                  <fieldset className="form-border">
                  <legend className="form-border">Respawn</legend>
                    <Row>
                      <Col md={6}>
                        <Field component={Input} type="text" name="respawntime" label="respawntime"  
                          bsSize="sm" />
                      </Col>
                      <Col md={6}>
                        <Field component={Input} type="text" name="variance" label="variance"  
                          bsSize="sm" />
                      </Col>
                      <Col md={6}>
                        <Field component={Input} type="text" name="_condition" label="_condition"  
                          bsSize="sm" />
                      </Col>
                      <Col md={6}>
                        <Field component={Input} type="text" name="cond_value" label="cond_value"  
                          bsSize="sm" />
                      </Col>
                    </Row>
                  </fieldset>
                </Col>
                <Col md={6}>
                  <fieldset className="form-border">
                  <legend className="form-border">Misc</legend>
                    <Row>
                    <Col md={12}>
                        <Field component={Input} type="text" name="animation" label="animation"  
                          bsSize="sm" />
                      </Col>
                      <Col md={12}>
                        <Field component={Checkbox} name="enabled" label="enabled" />
                      </Col>
                    </Row>
                  </fieldset>
                </Col>
                <Col md={6}>
                {/* Empty */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </form>
    )
  }
}

Spawn2 = reduxForm(Spawn2Options)(Spawn2)

Spawn2 = connect(mapStateToProps)(Spawn2)

export default Spawn2;