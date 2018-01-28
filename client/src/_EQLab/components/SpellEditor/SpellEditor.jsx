import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, Field } from 'redux-form';
// import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirm } from '../form/confirm/confirm.js';
import diff from 'object-diff';
import api from '../../../api.js';
// import { debounce } from 'lodash';
import Input from '../form/Input.jsx';
import Checkbox from '../form/Checkbox.jsx';
import Select from '../form/Select.jsx';
import {
  SPELL_BUFFDURATION_FORMULAS,
  SPELL_FORMULAS,
  SPELL_GOODEFFECT,
  SPELL_RESIST_TYPES,
  SPELL_SKILLS,
  SPELL_ZONE_TYPES,
  SPELL_ENVIRONMENT_TYPES,
  SPELL_TIME_OF_DAY,
  SPELL_NUMHIT_TYPES,
  SPELL_DISPEL_TYPES,
  SPELL_NPC_CATEGORIES,
  SPELL_AFFECT_INDEX,
  SPELL_PCNPC_ONLY_FLAG
} from '../../../constants/constants.js';
import { SPELL_EFFECTS_ARRAY } from '../../../constants/spell_effects.js';
import { SPELL_TARGET_TYPES } from '../../../constants/spell_target_types.js';
import { SPELL_CATEGORIES, SPELL_GROUPS } from '../../../constants/spell_categories.js';
import {
  SPELLEDITOR_GET_SPELL,
  SPELLEDITOR_GET_SPELLTEMPLATE,
  SPELLEDITOR_UNLOAD_SPELL,
  SPELLEDITOR_PUT_SPELL,
  SPELLEDITOR_PUT_SPELLTEMPLATE,
  SPELLEDITOR_UPDATE_SPELL,
  SPELLEDITOR_UPDATE_SPELLTEMPLATE,
  SPELLEDITOR_DELETE_SPELL,
  SPELLEDITOR_DELETE_SPELLTEMPLATE
} from '../../../constants/actionTypes.js';
import SpellEditorHeader from './SpellEditorHeader.jsx';


const mapStateToProps = state => ({
  isLoaded: state.SpellEditor.isLoaded,
  isTemplate: state.SpellEditor.isTemplate,
  initialValues: state.SpellEditor.spell
});

const mapDispatchToProps = dispatch => ({
  loadSpell: spellID =>
    dispatch({ type: SPELLEDITOR_GET_SPELL, spellID }),
  loadTemplate: templateID =>
    dispatch({ type: SPELLEDITOR_GET_SPELLTEMPLATE, templateID }),
  unload: () =>
    dispatch({ type: SPELLEDITOR_UNLOAD_SPELL }),
  putSpell: (spellID, values) => 
    dispatch({ type: SPELLEDITOR_PUT_SPELL, spellID, values }),
  putTemplate: (templateID, values) => 
    dispatch({ type: SPELLEDITOR_PUT_SPELLTEMPLATE, templateID, values }),
  updateSpell: (spellID, values) => 
    dispatch({ type: SPELLEDITOR_UPDATE_SPELL, spellID }),
  updateTemplate: (templateID) => 
    dispatch({ type: SPELLEDITOR_UPDATE_SPELLTEMPLATE, templateID }),
  deleteSpell: (spellID) => 
    dispatch({ type: SPELLEDITOR_DELETE_SPELL, spellID }),
  deleteTemplate: (templateID) => 
    dispatch({ type: SPELLEDITOR_DELETE_SPELLTEMPLATE, templateID })
});

const SpellEditorOptions = {
  form: 'SpellEditor',
  enableReinitialize: true
}

class SpellEditor extends React.Component {
  constructor(props) {
    super(props);

    this.deleteSpell = () => {
      if (this.props.isTemplate) {
        confirm('Are you sure you want to delete this template?', {
          title: 'Delete Spell Template'
        }).then(() => {
          this.props.deleteTemplate(this.props.templateID);
        }, () => {});
      } else {
        confirm('Are you sure you want to delete this spell?', {
          title: 'Delete Spell'
        }).then(() => {
          this.props.deleteSpell(this.props.spellID);
        }, () => {});
      }
    }

    this.submitSpellForm = (values, dispatch, props) => {
      return new Promise((resolve, reject) => {
        if (props.dirty && props.valid) {
          const delta = diff(props.initialValues.type, values.type);

          if (this.props.isTemplate) {
            api.spell.putTemplate(values.type.id, delta).then(res => {
              this.props.updateTemplate(values.type.id);
              resolve();
            }).catch(error => {
              if (error.validationErrors) {
                reject(new SubmissionError(error.validationErrors));
              } 
            });
          } else {
            api.spell.putSpell(values.type.id, delta).then(res => {
              this.props.updateSpell(values.type.id);
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
    if (!this.props.isLoaded) {
      return null;
    } else {
      return (
        <form id="SpellEditor" spellCheck={false}>
          <Panel style={{ height: 945 }}>
            <Panel.Heading>
              <Field
                name="id"
                component={SpellEditorHeader}
                isTemplate={this.props.isTemplate}
                formPristine={this.props.pristine}
                formSubmitting={this.props.submitting}
                deleteSpell={this.deleteSpell}
                reset={this.props.reset}
                handleSubmit={this.props.handleSubmit(this.submitSpellForm)}
              />
            </Panel.Heading>
            <Panel.Body collapsible={false}>
              <Row>
                <Col md={14}>
                  <Row>
                    <Col md={7}><Field component={Input} bsSize="sm" type="text" name="name" label="name"/></Col>
                    <Col md={2}><Field component={Input} bsSize="sm" type="text" name="new_icon" label="icon"/></Col>
                    <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_CATEGORIES} name="spell_category" label="spell_category"/></Col>
                    <Col md={4}><Field component={Select} bsSize="sm" options={SPELL_RESIST_TYPES} name="resisttype" label="resisttype"/></Col>
                    <Col md={4}><Field component={Select} bsSize="sm" options={SPELL_SKILLS} name="skill" label="skill"/></Col>
                  </Row>
                  <Row>
                    <Col md={6}><Field component={Input} bsSize="sm" type="text" name="cast_on_you" label="cast_on_you"/></Col>
                    <Col md={6}><Field component={Input} bsSize="sm" type="text" name="cast_on_other" label="cast_on_other"/></Col>
                    <Col md={6}><Field component={Input} bsSize="sm" type="text" name="spell_fades" label="spell_fades"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="you_cast" label="you_cast"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="other_casts" label="other_casts"/></Col>
                  </Row>
                  <Row>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="mana" label="mana"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="EndurCost" label="EndurCost"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="EndurUpkeep" label="EndurUpkeep"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="EndurTimerIndex" label="EndurTimerIndex"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="cast_time" label="cast_time"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="recovery_time" label="recovery_time"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="recast_time" label="recast_time"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="basediff" label="fizzleadj"/></Col>
                  </Row>
                  <Row>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="buffduration" label="buffduration"/></Col>
                    <Col md={4}><Field component={Select} bsSize="sm" options={SPELL_BUFFDURATION_FORMULAS} name="buffdurationformula" label="buffdurationformula"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="AEDuration" label="AEDuration"/></Col>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="short_buff_box" label="short_buff_box"/></Col>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="IsDiscipline" label="IsDiscipline"/></Col>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="can_mgb" label="can_mgb"/></Col>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="uninterruptable" label="uninterruptable"/></Col>
                  </Row>
                  <Row>
                    <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_TARGET_TYPES} name="targettype" label="targettype"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="range" label="range"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="maxtargets" label="maxtargets"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="aoerange" label="aoerange"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="aemaxtargets" label="aemaxtargets"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="pushback" label="pushback"/></Col>
                    <Col md={2}><Field component={Input} bsSize="sm" type="text" name="pushup" label="pushup"/></Col>
                  </Row>
                  <Row>
                    <Col md={5}><Field component={Input} bsSize="sm" type="text" name="ConeStartAngle" label="ConeStartAngle"/></Col>
                    <Col md={5}><Field component={Input} bsSize="sm" type="text" name="ConeStopAngle" label="ConeStopAngle"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="viral_targets" label="viral_targets"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="viral_timer" label="viral_timer"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="viral_range" label="viral_range"/></Col>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="npc_no_los" label="npc_no_los"/></Col>
                  </Row>
                  <Row>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="min_range" label="min_range"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="min_dist" label="min_dist"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="min_dist_mod" label="min_dist_mod"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max_dist" label="max_dist"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max_dist_mod" label="max_dist_mod"/></Col>
                  </Row>
                  <fieldset className="form-border">
                  <legend className="form-border">Effects</legend>
                    <Row>
                      <Col md={1}><span>1</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid1" label="Effect"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value1" label="SE_Base"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value1" label="SE_Limit"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max1" label="SE_Max"/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula1" label="Formula"/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>2</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid2" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value2" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value2" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max2" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula2" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>3</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid3" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value3" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value3" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max3" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula3" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>4</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid4" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value4" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value4" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max4" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula4" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>5</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid5" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value5" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value5" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max5" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula5" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>6</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid6" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value6" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value6" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max6" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula6" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>7</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid7" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value7" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value7" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max7" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula7" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>8</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid8" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value8" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value8" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max8" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula8" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>9</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid9" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value9" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value9" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max9" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula9" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>10</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid10" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value10" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value10" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max10" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula10" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>11</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid11" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value11" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value11" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max11" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula11" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>12</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="effectid12" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_base_value12" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="effect_limit_value12" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="max12" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula12" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="RecourseLink" label="Recourse"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="teleport_zone" label="teleport_zone"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="bonushate" label="bonushate"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="HateAdded" label="HateAdded"/></Col>
                      <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_NUMHIT_TYPES} name="numhitstype" label="numhitstype"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="numhits" label="numhits"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="dot_stacking_exempt" label="Stacking DoT"/></Col>
                    </Row>
                  </fieldset>
                </Col>
                <Col md={10} style={{ maxHeight: 900, overflowY: "scroll" }}>
                  <fieldset className="form-border">
                  <legend className="form-border">Classes</legend>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes1" label="WAR"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes2" label="CLE"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes3" label="PAL"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes4" label="RNG"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes5" label="SHD"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes6" label="DRU"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes7" label="MNK"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes8" label="BRD"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes9" label="ROG"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes10" label="SHM"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes11" label="NEC"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes12" label="WIZ"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes13" label="MAG"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes14" label="ENC"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes15" label="BST"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes16" label="BER"/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Dispel/Resist</legend>
                    <Row>
                      <Col md={15}><Field component={Select} bsSize="sm" options={SPELL_DISPEL_TYPES} name="nodispell" label="nodispell"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="reflectable" label="reflectable"/></Col> 
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="no_partial_resist" label="no_partial_resist"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="ResistDiff" label="ResistDiff"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="MinResist" label="MinResist"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="classes9" label="MaxResist"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="pvpresistbase" label="pvpresistbase"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="pvpresistcalc" label="pvpresistcalc"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="pvpresistcap" label="pvpresistcap"/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Restrictions</legend>
                    <Row>
                      <Col md={8}><Field component={Select} bsSize="sm" options={SPELL_ZONE_TYPES} name="zonetype" label="zonetype"/></Col>
                      <Col md={8}><Field component={Select} bsSize="sm" options={SPELL_ENVIRONMENT_TYPES} name="EnvironmentType" label="EnvironmentType"/></Col>
                      <Col md={8}><Field component={Select} bsSize="sm" options={SPELL_TIME_OF_DAY} name="TimeOfDay" label="TimeOfDay"/></Col>
                    </Row>
                    <Row>
                      <Col md={5}><Field component={Input} bsSize="sm" type="text" name="CastRestriction" label="CastRestriction"/></Col>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="allowrest" label="allowrest"/></Col>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="InCombat" label="InCombat"/></Col>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="OutofCombat" label="OutofCombat"/></Col>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="disallow_sit" label="disallow_sit"/></Col>
                    </Row>
                    <Row>
                      <Col md={6}><Field component={Checkbox} bsSize="sm" name="cast_not_standing" label="cast_not_standing"/></Col>
                      <Col md={6}><Field component={Checkbox} bsSize="sm" name="sneaking" label="sneaking"/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Reagents</legend>
                    <Row>
                      <Col md={2}><span>1</span></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="components1" label="Consumable"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="component_counts1" label="Quantity"/></Col>
                      <Col md={7}></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="NoexpendReagent1" label="Non-Consumed"/></Col>
                    </Row>
                    <Row>
                      <Col md={2}><span>2</span></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="components2" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="component_counts2" showLabel={false}/></Col>
                      <Col md={7}></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="NoexpendReagent2" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={2}><span>3</span></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="components3" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="component_counts3" showLabel={false}/></Col>
                      <Col md={7}></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="NoexpendReagent3" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={2}><span>4</span></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="components4" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="component_counts4" showLabel={false}/></Col>
                      <Col md={7}></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="NoexpendReagent4" showLabel={false}/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Visuals</legend>
                    <Row>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="CastingAnim" label="CastingAnim"/></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="TargetAnim" label="TargetAnim"/></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="spellanim" label="spellanim"/></Col>
                      <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_AFFECT_INDEX} name="SpellAffectIndex" label="SpellAffectIndex"/></Col>
                    </Row>
                    <Row>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="descnum" label="descnum"/></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="typedescnum" label="typedescnum"/></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="effectdescnum" label="effectdescnum"/></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="effectdescnum2" label="effectdescnum2"/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Miscellaneous</legend>
                    <Row>
                      <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_GOODEFFECT} name="goodEffect" label="goodEffect"/></Col>
                      <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_PCNPC_ONLY_FLAG} name="pcnpc_only_flag" label="pcnpc_only_flag"/></Col>
                      <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_NPC_CATEGORIES} name="npc_category" label="npc_category"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="npc_usefulness" label="npc_usefulness"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="songcap" label="songcap"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="rank" label="rank"/></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="player_1" label="player_1"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="not_extendable" label="not_extendable"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="suspendable" label="suspendable"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="persistdeath" label="persistdeath"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="deleteable" label="deleteable"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="ldon_trap" label="ldon_trap"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="no_block" label="no_block"/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Deprecated</legend>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="Activated" label="Activated"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="LightType" label="LightType"/></Col>
                    <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_GROUPS} name="spellgroup" label="spellgroup"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="icon" label="icon"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="memicon" label="memicon"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="TravelType" label="TravelType"/></Col>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Unused Fields</legend>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field142" label="field142"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field143" label="field143"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field152" label="field152"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field153" label="field153"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field160" label="field160"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field163" label="field163"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field164" label="field164"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field169" label="field169"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field170" label="field170"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field171" label="field171"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field172" label="field172"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field181" label="field181"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field182" label="field182"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field198" label="field198"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field199" label="field199"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field203" label="field203"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field204" label="field204"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field206" label="field206"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field209" label="field209"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field210" label="field210"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field215" label="field215"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field216" label="field216"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field217" label="field217"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field220" label="field220"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field221" label="field221"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field222" label="field222"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field223" label="field223"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field225" label="field225"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field226" label="field226"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field232" label="field232"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field233" label="field233"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field234" label="field234"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field235" label="field235"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="field236" label="field236"/></Col>
                    </Row>
                  </fieldset>
                  {/* <fieldset className="form-border">
                  <legend className="form-border">Deities</legend>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities1" label="deities1"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities2" label="deities2"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities3" label="deities3"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities4" label="deities4"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities5" label="deities5"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities6" label="deities6"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities7" label="deities7"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities8" label="deities8"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities9" label="deities9"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities10" label="deities10"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities11" label="deities11"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities12" label="deities12"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities13" label="deities13"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities14" label="deities14"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities15" label="deities15"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="deities16" label="deities16"/></Col>
                    </Row>
                  </fieldset> */}
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        </form>
      );
    }
  }
}

SpellEditor = reduxForm(SpellEditorOptions)(SpellEditor);

export default connect(mapStateToProps, mapDispatchToProps)(SpellEditor);