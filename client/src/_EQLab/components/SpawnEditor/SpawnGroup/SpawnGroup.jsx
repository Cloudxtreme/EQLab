import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, Field } from 'redux-form';
import Input from '../../form/Input.jsx';
import FormHeader from '../../form/FormHeader.jsx';
import SpawnEntries from './SpawnEntries.jsx';

const mapStateToProps = state => ({
  initialValues: state.SpawnEditor.spawn.spawngroup
});

const SpawnGroupOptions = {
  form: 'SpawnGroup',
  enableReinitialize: true
}

class SpawnGroup extends React.PureComponent {
  render() {
    return (
      <form id="SpawnGroup" spellCheck={false}>
        <Panel style={{ height: 653 }}>
          <Panel.Heading>
            <Field 
              name="id"
              component={FormHeader}
              title="Spawngroup"
              titleName={this.props.initialValues.name}
              formPristine={this.props.pristine}
              formSubmitting={this.props.submitting}
              submitSucceeded={this.props.submitSucceeded}
              delete={this.props.deleteSpawngroup}
              reset={this.props.reset}
              handleSubmit={this.props.handleSubmit}
            />
          </Panel.Heading>
          <Panel.Body collapsible={false}>
            <Row>
              <Col md={12}>
                <Row>
                  <Col md={24}>
                    <Field component={Input} type="text" name="name" label="name"  
                      bsSize="sm" />
                  </Col>
                </Row>
                <Row>
                  <Col md={24}>
                    <fieldset className="form-border">
                    <legend className="form-border">Roam</legend>
                      <Row>
                        <Col md={6}>
                          <Field component={Input} type="text" name="min_x" label="min_x"  
                            bsSize="sm"
                              />
                        </Col>
                        <Col md={6}>
                        <Field component={Input} type="text" name="max_x" label="max_x"  
                            bsSize="sm"
                              />        
                        </Col>
                        <Col md={6}>
                        <Field component={Input} type="text" name="min_y" label="min_y"  
                            bsSize="sm"
                              />            
                        </Col>
                        <Col md={6}>
                        <Field component={Input} type="text" name="max_y" label="max_y"  
                            bsSize="sm"
                              />           
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                        <Field component={Input} type="text" name="mindelay" label="mindelay"  
                            bsSize="sm"
                              />
                        </Col>
                        <Col md={6}>
                        <Field component={Input} type="text" name="delay" label="delay"  
                            bsSize="sm"
                              />      
                        </Col>
                        <Col md={6}>
                        <Field component={Input} type="text" name="dist" label="dist"  
                            bsSize="sm"
                              />        
                        </Col>
                        <Col md={6}>
                          {/* Empty */}
                        </Col>
                      </Row>
                    </fieldset>
                  </Col>
                </Row>
                <Row>
                  <Col md={24}>
                    <fieldset className="form-border">
                    <legend className="form-border">Misc</legend>
                      <Row>
                        <Col md={8}>
                        <Field component={Input} type="text" name="spawn_limit" label="spawn_limit"  
                            bsSize="sm"
                              />
                        </Col>
                        <Col md={8}>
                        <Field component={Input} type="text" name="despawn" label="despawn"  
                            bsSize="sm"
                              />             
                        </Col>
                        <Col md={8}>
                        <Field component={Input} type="text" name="despawn_timer" label="despawn_timer"  
                            bsSize="sm"
                              />        
                        </Col>
                      </Row>
                    </fieldset>
                  </Col>
                </Row>
              </Col>
              <Col md={12}>
                <FieldArray 
                  name="spawnentries" 
                  component={SpawnEntries}
                  formSubmitting={this.props.submitting}
                  searchNPCs={this.props.searchNPCs}
                  newSpawnentry={this.props.newSpawnentry}
                  deleteSpawnentry={this.props.deleteSpawnentry}
                  change={this.props.change} />
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </form>
    )
  }
}

SpawnGroup = reduxForm(SpawnGroupOptions)(SpawnGroup)

SpawnGroup = connect(mapStateToProps)(SpawnGroup)

export default SpawnGroup;









