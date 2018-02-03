import React from 'react';
import { Row, Col, Panel, Tab, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { 
  SubmissionError,
  reset,
  submit,
  isPristine,
  isSubmitting,
  hasSubmitSucceeded,
  hasSubmitFailed
} from 'redux-form';
import { confirm } from '../form/confirm/confirm.js';
import { diff } from 'deep-object-diff';
import api from '../../../api.js';
// import { debounce } from 'lodash';
import {
  SPELLEDITOR_GET_SPELL,
  SPELLEDITOR_GET_SPELLTEMPLATE,
  SPELLEDITOR_UNLOAD_SPELL,
  SPELLEDITOR_PATCH_SPELL,
  SPELLEDITOR_PATCH_SPELLTEMPLATE,
  SPELLEDITOR_UPDATE_SPELL,
  SPELLEDITOR_UPDATE_SPELLTEMPLATE,
  SPELLEDITOR_DELETE_SPELL,
  SPELLEDITOR_DELETE_SPELLTEMPLATE
} from '../../../constants/actionTypes.js';
import SpellEditorHeader from './SpellEditorHeader.jsx';
import SpellEditorForm from './SpellEditorForm.jsx';


const mapStateToProps = state => ({
  isLoaded: state.SpellEditor.isLoaded,
  isTemplate: state.SpellEditor.isTemplate,
  spell: state.SpellEditor.spell.spell,
  spellFormisPristine: isPristine('SpellEditorForm')(state),
  spellFormisSubmitting: isSubmitting('SpellEditorForm')(state),
  spellFormhasSubmitSucceeded: hasSubmitSucceeded('SpellEditorForm')(state),
  spellFormhasSubmitFailed: hasSubmitFailed('SpellEditorForm')(state),
  recourse: state.SpellEditor.spell.recourse,
  recourseFormisPristine: isPristine('RecourseEditorForm')(state),
  recourseFormisSubmitting: isSubmitting('RecourseEditorForm')(state),
  recourseFormhasSubmitSucceeded: hasSubmitSucceeded('RecourseEditorForm')(state),
  recourseFormhasSubmitFailed: hasSubmitFailed('RecourseEditorForm')(state)
});

const mapDispatchToProps = dispatch => ({
  loadSpell: spellID =>
    dispatch({ type: SPELLEDITOR_GET_SPELL, spellID }),
  loadTemplate: templateID =>
    dispatch({ type: SPELLEDITOR_GET_SPELLTEMPLATE, templateID }),
  unload: () =>
    dispatch({ type: SPELLEDITOR_UNLOAD_SPELL }),
  resetForm: (form) =>
    dispatch(reset(form)),
  submitForm: (form) =>
    dispatch(submit(form)),
  patchSpell: (spellID, values) => 
    dispatch({ type: SPELLEDITOR_PATCH_SPELL, spellID, values }),
  patchTemplate: (templateID, values) => 
    dispatch({ type: SPELLEDITOR_PATCH_SPELLTEMPLATE, templateID, values }),
  updateSpell: (spellID, values) => 
    dispatch({ type: SPELLEDITOR_UPDATE_SPELL, spellID }),
  updateTemplate: (templateID) => 
    dispatch({ type: SPELLEDITOR_UPDATE_SPELLTEMPLATE, templateID }),
  deleteSpell: (spellID) => 
    dispatch({ type: SPELLEDITOR_DELETE_SPELL, spellID }),
  deleteTemplate: (templateID) => 
    dispatch({ type: SPELLEDITOR_DELETE_SPELLTEMPLATE, templateID })
});

class SpellEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'spell'
    }

    this.selectTab = (tab) => {
      this.setState({ tab });
    }

    this.resetForm = (isRecourse) => {
      if (isRecourse) {
        this.props.resetForm('RecourseEditorForm');
      } else {
        this.props.resetForm('SpellEditorForm');
      }
    }

    this.deleteSpell = (spellID, isRecourse) => {
      console.log(spellID)
      // if (this.props.isTemplate) {
      //   confirm('Are you sure you want to delete this template?', {
      //     title: 'Delete Spell Template'
      //   }).then(() => {
      //     this.props.deleteTemplate(this.props.templateID);
      //   }, () => {});
      // } else {
      //   confirm('Are you sure you want to delete this spell?', {
      //     title: 'Delete Spell'
      //   }).then(() => {
      //     this.props.deleteSpell(this.props.spellID);
      //   }, () => {});
      // }
    }

    this.handleSubmit = (spellID, isRecourse) => {
      if (isRecourse) {
        this.props.submitForm('RecourseEditorForm');
      } else {
        this.props.submitForm('SpellEditorForm');
      }
    }

    this.submitSpellForm = (values, dispatch, props) => {
      return new Promise((resolve, reject) => {
        if (props.dirty && props.valid) {
          let delta = diff(props.initialValues, values);
          if (delta.descriptions) {
            delta.descriptions = {...props.initialValues.descriptions.nums, ...delta.descriptions}
          }
          if (this.props.isTemplate) {
            api.spell.patchTemplate(values.data.id, delta).then(res => {
              this.props.updateTemplate(values.data.id);
              resolve();
            }).catch(error => {
              if (error.validationErrors) {
                reject(new SubmissionError(error.validationErrors));
              } 
            });
          } else {
            api.spell.patchSpell(values.data.id, delta).then(res => {
              this.props.updateSpell(values.data.id);
              resolve();
            }).catch(error => {
              if (error.validationErrors) {
                reject(new SubmissionError(error.validationErrors));
              } 
            });
          }
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoaded && nextProps.spellID && (nextProps.spellID !== this.props.spellID)) {
      this.props.loadSpell(nextProps.spellID);
    } else if (this.props.isLoaded && nextProps.templateID && (nextProps.templateID !== this.props.templateID)) {
      this.props.loadTemplate(nextProps.templateID);
    }
  }

  componentDidMount() {
    if (this.props.spellID){
      this.props.loadSpell(this.props.spellID)
    } else if (this.props.templateID) {
      this.props.loadTemplate(this.props.templateID)
    }
  }

  componentWillUnmount() {
    this.props.unload();
  }

  render() {

    const { spell, recourse } = this.props;

    if (!this.props.isLoaded) {
      return null;
    } else {
      return (
        <div id="SpellEditor">
          <Tab.Container id="spell-panel-container" activeKey={this.state.tab} onSelect={this.selectTab}>
            <Panel id="spell-panel" style={{ height: 1006 }}>
              <Panel.Heading style={{ padding: 0 }}>
                <Row id="spell-panel-header" style={{ height: 45 }}>
                  <Col md={14}>
                    <Nav bsStyle="tabs" style={{ marginTop: 7, borderBottom: "none" }}>
                      <NavItem eventKey="spell">Spell{this.props.isTemplate && " Template"}: {spell.form.data.id} {spell.form.data.name}</NavItem>
                      {
                        !recourse
                          ? null
                          : <NavItem eventKey="recourse">Recourse: {recourse.form.data.id} {recourse.form.data.name}</NavItem>
                      }         
                    </Nav> 
                  </Col>
                  {
                    this.state.tab === 'spell'
                      ? <SpellEditorHeader
                          isRecourse={false}
                          spellID={spell.form.data.id}
                          formPristine={this.props.spellFormisPristine}
                          formSubmitting={this.props.spellFormisSubmitting}
                          submitSucceeded={this.props.spellFormhasSubmitSucceeded}
                          submitFailed={this.props.spellFormhasSubmitFailed}
                          delete={this.deleteSpell}
                          reset={this.resetForm}
                          handleSubmit={this.handleSubmit}
                        />
                      : <SpellEditorHeader
                          isRecourse={true}
                          spellID={recourse.form.data.id}
                          formPristine={this.props.recourseFormisPristine}
                          formSubmitting={this.props.recourseFormisSubmitting}
                          submitSucceeded={this.props.recourseFormhasSubmitSucceeded}
                          submitFailed={this.props.recourseFormhasSubmitFailed}
                          delete={this.deleteSpell}
                          reset={this.resetForm}
                          handleSubmit={this.handleSubmit}
                        />
                  }     
                </Row>
              </Panel.Heading>
              <Panel.Body collapsible={false}>
                <Tab.Content animation={false} mountOnEnter={false} unmountOnExit={false}>
                  <Tab.Pane eventKey="spell">
                  {
                    !spell
                      ? null
                      : <SpellEditorForm 
                          isRecourse={false} 
                          initialValues={spell.form} 
                          form="SpellEditorForm" 
                          onSubmit={this.submitSpellForm} 
                          scrolls={spell.scrolls}
                          effectitems={spell.effectitems}
                        />
                  } 
                  </Tab.Pane>
                  {
                    !recourse
                      ? null
                      : <Tab.Pane eventKey="recourse">
                          <SpellEditorForm 
                            isRecourse={true} 
                            initialValues={recourse.form} 
                            form="RecourseEditorForm"
                            onSubmit={this.submitSpellForm}
                            scrolls={recourse.scrolls}
                            effectitems={recourse.effectitems}
                          />
                        </Tab.Pane>            
                  }
                </Tab.Content>
              </Panel.Body>
            </Panel>
          </Tab.Container>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellEditor);