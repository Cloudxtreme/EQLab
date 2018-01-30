import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, Field } from 'redux-form';
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import { confirm } from '../form/confirm/confirm.js';
import diff from 'object-diff';
import api from '../../../api.js';
// import { debounce } from 'lodash';
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
  SPELLEDITOR_PATCH_SPELL,
  SPELLEDITOR_PATCH_SPELLTEMPLATE,
  SPELLEDITOR_UPDATE_SPELL,
  SPELLEDITOR_UPDATE_SPELLTEMPLATE,
  SPELLEDITOR_DELETE_SPELL,
  SPELLEDITOR_DELETE_SPELLTEMPLATE
} from '../../../constants/actionTypes.js';
import Input from '../form/Input.jsx';
import Checkbox from '../form/Checkbox.jsx';
import Select from '../form/Select.jsx';
import FormHeader from '../form/FormHeader.jsx';


const mapStateToProps = state => ({
  isLoaded: state.SpellEditor.isLoaded,
  isTemplate: state.SpellEditor.isTemplate,
  initialValues: state.SpellEditor.spell.spell,
  recourse: state.SpellEditor.spell.recourse,
  components: state.SpellEditor.spell.components,
  noexpendreagents: state.SpellEditor.spell.noexpendreagents,
  scrolls: state.SpellEditor.spell.scrolls,
  procitems: state.SpellEditor.spell.procitems
});

const mapDispatchToProps = dispatch => ({
  loadSpell: spellID =>
    dispatch({ type: SPELLEDITOR_GET_SPELL, spellID }),
  loadTemplate: templateID =>
    dispatch({ type: SPELLEDITOR_GET_SPELLTEMPLATE, templateID }),
  unload: () =>
    dispatch({ type: SPELLEDITOR_UNLOAD_SPELL }),
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
            api.spell.patchTemplate(values.type.id, delta).then(res => {
              this.props.updateTemplate(values.type.id);
              resolve();
            }).catch(error => {
              if (error.validationErrors) {
                reject(new SubmissionError(error.validationErrors));
              } 
            });
          } else {
            api.spell.patchSpell(values.type.id, delta).then(res => {
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
                name="data.id"
                component={FormHeader}
                title="Spell"
                titleName={this.props.initialValues.data.name}
                isTemplate={this.props.isTemplate}
                formPristine={this.props.pristine}
                formSubmitting={this.props.submitting}
                submitSucceeded={this.props.submitSucceeded}
                delete={this.deleteSpell}
                reset={this.props.reset}
                handleSubmit={this.props.handleSubmit(this.submitSpellForm)}
              />
            </Panel.Heading>
            <Panel.Body collapsible={false}>
              <Row>
                <Col md={14}>
                  <Row>
                    <Col md={7}><Field component={Input} bsSize="sm" type="text" name="data.name" label="name"/></Col>
                    <Col md={2}><Field component={Input} bsSize="sm" type="text" name="data.new_icon" label="icon"/></Col>
                    <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_CATEGORIES} name="data.spell_category" label="spell_category"/></Col>
                    <Col md={4}><Field component={Select} bsSize="sm" options={SPELL_RESIST_TYPES} name="data.resisttype" label="resisttype"/></Col>
                    <Col md={4}><Field component={Select} bsSize="sm" options={SPELL_SKILLS} name="data.skill" label="skill"/></Col>
                  </Row>
                  <Row>
                    <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.cast_on_you" label="cast_on_you"/></Col>
                    <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.cast_on_other" label="cast_on_other"/></Col>
                    <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.spell_fades" label="spell_fades"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.you_cast" label="you_cast"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.other_casts" label="other_casts"/></Col>
                  </Row>
                  <Row>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.mana" label="mana"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.EndurCost" label="EndurCost"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.EndurUpkeep" label="EndurUpkeep"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.EndurTimerIndex" label="EndurTimerIndex"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.cast_time" label="cast_time"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.recovery_time" label="recovery_time"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.recast_time" label="recast_time"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.basediff" label="fizzleadj"/></Col>
                  </Row>
                  <Row>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.buffduration" label="buffduration"/></Col>
                    <Col md={4}><Field component={Select} bsSize="sm" options={SPELL_BUFFDURATION_FORMULAS} name="data.buffdurationformula" label="buffdurationformula"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.AEDuration" label="AEDuration"/></Col>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.short_buff_box" label="short_buff_box"/></Col>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.IsDiscipline" label="IsDiscipline"/></Col>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.can_mgb" label="can_mgb"/></Col>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.uninterruptable" label="uninterruptable"/></Col>
                  </Row>
                  <Row>
                    <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_TARGET_TYPES} name="data.targettype" label="targettype"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.range" label="range"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.maxtargets" label="maxtargets"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.aoerange" label="aoerange"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.aemaxtargets" label="aemaxtargets"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.pushback" label="pushback"/></Col>
                    <Col md={2}><Field component={Input} bsSize="sm" type="text" name="data.pushup" label="pushup"/></Col>
                  </Row>
                  <Row>
                    <Col md={5}><Field component={Input} bsSize="sm" type="text" name="data.ConeStartAngle" label="ConeStartAngle"/></Col>
                    <Col md={5}><Field component={Input} bsSize="sm" type="text" name="data.ConeStopAngle" label="ConeStopAngle"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.viral_targets" label="viral_targets"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.viral_timer" label="viral_timer"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.viral_range" label="viral_range"/></Col>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.npc_no_los" label="npc_no_los"/></Col>
                  </Row>
                  <Row>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.min_range" label="min_range"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.min_dist" label="min_dist"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.min_dist_mod" label="min_dist_mod"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max_dist" label="max_dist"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max_dist_mod" label="max_dist_mod"/></Col>
                  </Row>
                  <fieldset className="form-border">
                  <legend className="form-border">Effects</legend>
                    <Row>
                      <Col md={1}><span>1</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid1" label="Effect"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value1" label="SE_Base"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value1" label="SE_Limit"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max1" label="SE_Max"/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="formula1" label="Formula"/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>2</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid2" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value2" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value2" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max2" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula2" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>3</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid3" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value3" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value3" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max3" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula3" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>4</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid4" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value4" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value4" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max4" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula4" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>5</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid5" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value5" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value5" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max5" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula5" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>6</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid6" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value6" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value6" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max6" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula6" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>7</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid7" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value7" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value7" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max7" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula7" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>8</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid8" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value8" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value8" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max8" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula8" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>9</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid9" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value9" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value9" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max9" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula9" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>10</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid10" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value10" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value10" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max10" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula10" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>11</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid11" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value11" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value11" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max11" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula11" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={1}><span>12</span></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_EFFECTS_ARRAY} name="data.effectid12" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_base_value12" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effect_limit_value12" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.max12" showLabel={false}/></Col>
                      <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_FORMULAS} name="data.formula12" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.RecourseLink" label="Recourse"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.teleport_zone" label="teleport_zone"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.bonushate" label="bonushate"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.HateAdded" label="HateAdded"/></Col>
                      <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_NUMHIT_TYPES} name="data.numhitstype" label="numhitstype"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.numhits" label="numhits"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.dot_stacking_exempt" label="Stacking DoT"/></Col>
                    </Row>
                  </fieldset>
                </Col>
                <Col md={10} style={{ maxHeight: 900, overflowY: "scroll" }}>
                  <fieldset className="form-border">
                  <legend className="form-border">Classes</legend>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes1" label="WAR"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes2" label="CLE"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes3" label="PAL"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes4" label="RNG"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes5" label="SHD"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes6" label="DRU"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes7" label="MNK"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes8" label="BRD"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes9" label="ROG"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes10" label="SHM"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes11" label="NEC"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes12" label="WIZ"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes13" label="MAG"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes14" label="ENC"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes15" label="BST"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes16" label="BER"/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Dispel/Resist</legend>
                    <Row>
                      <Col md={15}><Field component={Select} bsSize="sm" options={SPELL_DISPEL_TYPES} name="data.nodispell" label="nodispell"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.reflectable" label="reflectable"/></Col> 
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.no_partial_resist" label="no_partial_resist"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.ResistDiff" label="ResistDiff"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.MinResist" label="MinResist"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.classes9" label="MaxResist"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.pvpresistbase" label="pvpresistbase"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.pvpresistcalc" label="pvpresistcalc"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.pvpresistcap" label="pvpresistcap"/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Restrictions</legend>
                    <Row>
                      <Col md={8}><Field component={Select} bsSize="sm" options={SPELL_ZONE_TYPES} name="data.zonetype" label="zonetype"/></Col>
                      <Col md={8}><Field component={Select} bsSize="sm" options={SPELL_ENVIRONMENT_TYPES} name="data.EnvironmentType" label="EnvironmentType"/></Col>
                      <Col md={8}><Field component={Select} bsSize="sm" options={SPELL_TIME_OF_DAY} name="data.TimeOfDay" label="TimeOfDay"/></Col>
                    </Row>
                    <Row>
                      <Col md={5}><Field component={Input} bsSize="sm" type="text" name="data.CastRestriction" label="CastRestriction"/></Col>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="data.allowrest" label="allowrest"/></Col>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="data.InCombat" label="InCombat"/></Col>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="data.OutofCombat" label="OutofCombat"/></Col>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="data.disallow_sit" label="disallow_sit"/></Col>
                    </Row>
                    <Row>
                      <Col md={6}><Field component={Checkbox} bsSize="sm" name="data.cast_not_standing" label="cast_not_standing"/></Col>
                      <Col md={6}><Field component={Checkbox} bsSize="sm" name="data.sneaking" label="sneaking"/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Reagents</legend>
                    <Row>
                      <Col md={2}><span>1</span></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.components1" label="Consumable"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.component_counts1" label="Quantity"/></Col>
                      <Col md={7}></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.NoexpendReagent1" label="Non-Consumed"/></Col>
                    </Row>
                    <Row>
                      <Col md={2}><span>2</span></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.components2" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.component_counts2" showLabel={false}/></Col>
                      <Col md={7}></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.NoexpendReagent2" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={2}><span>3</span></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.components3" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.component_counts3" showLabel={false}/></Col>
                      <Col md={7}></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.NoexpendReagent3" showLabel={false}/></Col>
                    </Row>
                    <Row>
                      <Col md={2}><span>4</span></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.components4" showLabel={false}/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.component_counts4" showLabel={false}/></Col>
                      <Col md={7}></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.NoexpendReagent4" showLabel={false}/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Visuals</legend>
                    <Row>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.CastingAnim" label="CastingAnim"/></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.TargetAnim" label="TargetAnim"/></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.spellanim" label="spellanim"/></Col>
                      <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_AFFECT_INDEX} name="data.SpellAffectIndex" label="SpellAffectIndex"/></Col>
                    </Row>
                    <Row>
                      <Col md={4}><Field component={Input} bsSize="sm" type="text" name="data.typedescnum" label="typedescnum"/></Col>
                      <Col md={20}><Field component={Input} bsSize="sm" type="text" name="descriptions.type" label="typedesc"/></Col>
                    </Row>
                    <Row>
                      <Col md={4}><Field component={Input} bsSize="sm" type="text" name="data.descnum" label="descnum"/></Col>
                      <Col md={20}><Field component={Input} bsSize="sm" type="text" name="descriptions.effect" label="effectdesc (#1=Min, @1=Max, #5=Average, %z=Duration)"/></Col>
                    </Row>
                    <Row>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.effectdescnum" label="effectdescnum"/></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.effectdescnum2" label="effectdescnum2"/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Miscellaneous</legend>
                    <Row>
                      <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_GOODEFFECT} name="data.goodEffect" label="goodEffect"/></Col>
                      <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_PCNPC_ONLY_FLAG} name="data.pcnpc_only_flag" label="pcnpc_only_flag"/></Col>
                      <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_NPC_CATEGORIES} name="data.npc_category" label="npc_category"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.npc_usefulness" label="npc_usefulness"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.songcap" label="songcap"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.rank" label="rank"/></Col>
                      <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.player_1" label="player_1"/></Col>
                    </Row>
                    <Row>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" name="data.not_extendable" label="not_extendable"/></Col>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" name="data.suspendable" label="suspendable"/></Col>
                      <Col md={4}><Field component={Checkbox} bsSize="sm" name="data.persistdeath" label="persistdeath"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.deleteable" label="deleteable"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.ldon_trap" label="ldon_trap"/></Col>
                      <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.no_block" label="no_block"/></Col>
                    </Row>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Deprecated</legend>
                    <Col md={3}><Field component={Checkbox} bsSize="sm" name="data.Activated" label="Activated"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.LightType" label="LightType"/></Col>
                    <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_GROUPS} name="data.spellgroup" label="spellgroup"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.icon" label="icon"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.memicon" label="memicon"/></Col>
                    <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.TravelType" label="TravelType"/></Col>
                  </fieldset>
                  <fieldset className="form-border">
                  <legend className="form-border">Unused Fields</legend>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field142" label="field142"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field143" label="field143"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field152" label="field152"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field153" label="field153"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field160" label="field160"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field163" label="field163"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field164" label="field164"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field169" label="field169"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field170" label="field170"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field171" label="field171"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field172" label="field172"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field181" label="field181"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field182" label="field182"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field198" label="field198"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field199" label="field199"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field203" label="field203"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field204" label="field204"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field206" label="field206"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field209" label="field209"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field210" label="field210"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field215" label="field215"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field216" label="field216"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field217" label="field217"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field220" label="field220"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field221" label="field221"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field222" label="field222"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field223" label="field223"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field225" label="field225"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field226" label="field226"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field232" label="field232"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field233" label="field233"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field234" label="field234"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field235" label="field235"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.field236" label="field236"/></Col>
                    </Row>
                  </fieldset>
                  {/* <fieldset className="form-border">
                  <legend className="form-border">Deities</legend>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities1" label="deities1"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities2" label="deities2"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities3" label="deities3"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities4" label="deities4"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities5" label="deities5"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities6" label="deities6"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities7" label="deities7"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities8" label="deities8"/></Col>
                    </Row>
                    <Row>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities9" label="deities9"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities10" label="deities10"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities11" label="deities11"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities12" label="deities12"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities13" label="deities13"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities14" label="deities14"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities15" label="deities15"/></Col>
                      <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.deities16" label="deities16"/></Col>
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