import React from 'react';
import { Row, Col, Panel, Tab, Nav, NavItem, Button } from 'react-bootstrap';
import { reduxForm, Field, Fields } from 'redux-form';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { get } from 'lodash';
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
  SPELL_PCNPC_ONLY_FLAG,
  SPELL_DAMAGESHIELD_TYPES
} from '../../../constants/constants.js';
import { SPELL_EFFECTS_ARRAY } from '../../../constants/spell_effects.js';
import { SPELL_TARGET_TYPES } from '../../../constants/spell_target_types.js';
import { SPELL_CATEGORIES, SPELL_GROUPS } from '../../../constants/spell_categories.js';
import Input from '../form/Input.jsx';
import Checkbox from '../form/Checkbox.jsx';
import Select from '../form/Select.jsx';


const SpellEditorFormOptions = {
  enableReinitialize: true
}

const spellDescFields = props => {
  const num = get(props, props.names[0]);
  const desc = get(props, props.names[1]);
  const numReadOnly = desc.meta.initial !== desc.input.value;
  const descReadOnly = num.meta.initial !== num.input.value;
  return (
    <Row>
      <Col md={4}><Input bsSize="sm" type="number" readOnly={numReadOnly} input={num.input} meta={num.meta} label={props.labels[0]} /></Col>
      <Col md={20}><Input bsSize="sm" type="text" readOnly={descReadOnly} input={desc.input} meta={desc.meta} label={props.labels[1]} /></Col>
    </Row>
  );
}

const parseDescFields = (value, name) => {
  if (name === "data.typedescnum" || name === "data.effectdescnum" || name === "data.descnum") {
    if (value === '') return 0;
    return parseInt(value, 10)
  } else {
    return value
  }
}

class SpellEditorForm extends React.PureComponent {
  render() {
    const scrolls = this.props.scrolls.length ? this.props.scrolls : null;
    const effectitems = this.props.effectitems;

    let clickitemsArr = effectitems && effectitems.length ? this.props.effectitems.filter(item => item.clickeffect > 0) : null;
    let procitemsArr = effectitems && effectitems.length ? this.props.effectitems.filter(item => item.proceffect > 0) : null;
    let focusitemsArr = effectitems && effectitems.length ? this.props.effectitems.filter(item => item.focuseffect > 0) : null;

    let clickitems = clickitemsArr && clickitemsArr.length ? clickitemsArr : null;
    let procitems = procitemsArr && procitemsArr.length ? procitemsArr : null;
    let focusitems = focusitemsArr && focusitemsArr.length ? focusitemsArr : null;

    const scrollsColumns = [{
      Header: "ID",
      accessor: "id",
      width: 50
    }, {
      Header: "Name",
      accessor: "name",
      width: 120
    }, {
      Header: "No Drop",
      accessor: "nodrop"
    }, {
      Header: "Price",
      accessor: "price"
    }];

    const procitemsColumns = [{
      Header: "Proc Items",
      columns: [{
        Header: "ID",
        accessor: "id",
        width: 50
      }, {
        Header: "Name",
        accessor: "name",
        width: 120
      }, {
        Header: "Level",
        accessor: "proclevel"
      }, {
        Header: "MaxLvl",
        accessor: "proclevel2"
      }]
    }];

    const clickitemsColumns = [{
      Header: "Click Items",
      columns: [{
        Header: "ID",
        accessor: "id",
        width: 40
      }, {
        Header: "Name",
        accessor: "name",
        width: 80
      }, {
        Header: "Type",
        accessor: "clicktype"
      }, {
        Header: "Level",
        accessor: "clicklevel"
      }, {
        Header: "MaxLvl",
        accessor: "clicklevel2"
      }, {
        Header: "Cast Time",
        accessor: "casttime_"
      }, {
        Header: "Recast Type",
        accessor: "recasttype"
      }, {
        Header: "Recast Delay",
        accessor: "recastdelay"
      }]
    }];

    const focusitemsColumns = [{
      Header: "Focus Items",
      columns: [{
        Header: "ID",
        accessor: "id",
        width: 50
      }, {
        Header: "Name",
        accessor: "name",
        width: 120
      }, {
        Header: "Type",
        accessor: "focustype"
      }, {
        Header: "Level",
        accessor: "focuslevel"
      }, {
        Header: "MaxLvl",
        accessor: "focuslevel2"
      }]
    }];

    const tableProps = {
      style: { border: "none"},
      filterable: false,
      className: "-striped -highlight",
      showPagination: false
    }

    return (
      <form id={this.props.form} spellCheck={false}>
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
            <Tab.Container id="spell-effects-panel" defaultActiveKey="effects">
              <Panel style={{ height: 520, marginBottom: 0 }}>
                <Panel.Heading style={{ paddingBottom: 0 }}>
                  <Nav bsStyle="tabs" style={{ borderBottom: "none" }}>
                    <NavItem eventKey="effects">Effects</NavItem>
                    <NavItem eventKey="dmgshield">Damage Shield Type</NavItem>
                    <NavItem eventKey="reagents">Reagents</NavItem>
                    <NavItem eventKey="scrolls">Scrolls</NavItem>
                    <NavItem eventKey="effectitems">Items</NavItem>
                  </Nav> 
                </Panel.Heading>
                <Panel.Body collapsible={false} style={{ height: 500, overflowY: "scroll" }}>
                  <Tab.Content animation={false} mountOnEnter={false} unmountOnExit={false}>
                    <Tab.Pane eventKey="effects">
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
                    </Tab.Pane>
                    {/* TODO: check for SE_DamageShield */}
                    <Tab.Pane eventKey="dmgshield">
                      <Row>
                        <Col md={7}><Field component={Select} bsSize="sm" options={SPELL_DAMAGESHIELD_TYPES} name="damageshield.type" label="type"/></Col>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="reagents">
                      <Row>
                        <Col md={1}><span>1</span></Col>
                        <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.components1" label="Consumable"/></Col>
                        <Col md={2}><Field component={Input} bsSize="sm" type="text" name="data.component_counts1" label="Quantity"/></Col>
                        <Col md={9}></Col>
                        <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.NoexpendReagent1" label="Non-Consumed"/></Col>
                      </Row>
                      <Row>
                        <Col md={1}><span>2</span></Col>
                        <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.components2" showLabel={false}/></Col>
                        <Col md={2}><Field component={Input} bsSize="sm" type="text" name="data.component_counts2" showLabel={false}/></Col>
                        <Col md={9}></Col>
                        <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.NoexpendReagent2" showLabel={false}/></Col>
                      </Row>
                      <Row>
                        <Col md={1}><span>3</span></Col>
                        <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.components3" showLabel={false}/></Col>
                        <Col md={2}><Field component={Input} bsSize="sm" type="text" name="data.component_counts3" showLabel={false}/></Col>
                        <Col md={9}></Col>
                        <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.NoexpendReagent3" showLabel={false}/></Col>
                      </Row>
                      <Row>
                        <Col md={1}><span>4</span></Col>
                        <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.components4" showLabel={false}/></Col>
                        <Col md={2}><Field component={Input} bsSize="sm" type="text" name="data.component_counts4" showLabel={false}/></Col>
                        <Col md={9}></Col>
                        <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.NoexpendReagent4" showLabel={false}/></Col>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="scrolls">
                      <Row>
                        <Col md={24}>
                          <Button>Add Scroll</Button>
                        </Col>
                      </Row>
                      <Row>
                      {
                        !scrolls
                          ? null
                          : <ReactTable
                              columns={scrollsColumns}
                              data={scrolls}
                              pageSize={scrolls.length}
                              {...tableProps}
                            />
                      }
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="effectitems">
                    {
                        !clickitems
                          ? null
                          : <ReactTable
                              columns={clickitemsColumns}
                              data={clickitems}
                              pageSize={clickitems.length}
                              {...tableProps}
                            />
                    }
                    {
                        !procitems
                          ? null
                          : <ReactTable
                              columns={procitemsColumns}
                              data={procitems}
                              pageSize={procitems.length}
                              {...tableProps}
                            />
                    }
                    {
                        !focusitems
                          ? null
                          : <ReactTable
                              columns={focusitemsColumns}
                              data={focusitems}
                              pageSize={focusitems.length}
                              {...tableProps}
                            />
                    }
                    </Tab.Pane>
                  </Tab.Content>
                </Panel.Body>
              </Panel>
            </Tab.Container> 
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
            <legend className="form-border">Visuals</legend>
              <Row>
                <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.CastingAnim" label="CastingAnim"/></Col>
                <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.TargetAnim" label="TargetAnim"/></Col>
                <Col md={6}><Field component={Input} bsSize="sm" type="text" name="data.spellanim" label="spellanim"/></Col>
                <Col md={6}><Field component={Select} bsSize="sm" options={SPELL_AFFECT_INDEX} name="data.SpellAffectIndex" label="SpellAffectIndex"/></Col>
              </Row>
              <Fields 
                names={[ 'data.typedescnum', 'descriptions.typedesc' ]}
                labels={[ 'typedescnum', 'typedesc' ]}
                component={spellDescFields}
                parse={parseDescFields}
              />
              <Fields 
                names={[ 'data.effectdescnum', 'descriptions.effectdesc' ]}
                labels={[ 'effectdescnum', 'effectdesc' ]}
                component={spellDescFields}
                parse={parseDescFields}
              />
              <Fields 
                names={[ 'data.descnum', 'descriptions.desc' ]}
                labels={[ 'descnum', 'desc (#1=Min, @1=Max, #5=Average, %z=Duration)' ]}
                component={spellDescFields}
                parse={parseDescFields}
              />
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
              <Col md={3}><Field component={Input} bsSize="sm" type="text" name="data.effectdescnum2" label="effectdescnum2"/></Col>
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
      </form>
    );
  }
}

SpellEditorForm = reduxForm(SpellEditorFormOptions)(SpellEditorForm);

export default SpellEditorForm;