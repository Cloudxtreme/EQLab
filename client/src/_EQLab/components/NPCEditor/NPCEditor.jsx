import React from 'react';
import { Row, Col, Panel, Tab, Nav, NavItem, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, Field, Fields } from 'redux-form';
import { confirm } from '../form/confirm/confirm.js';
import { diff } from 'deep-object-diff';
import api from '../../../api.js';
import { debounce } from 'lodash';
import {
  GENDERS,
  NPC_CLASSES,
  BODY_TYPES,
  MELEE_ATTACK_SKILLS,
  RANGE_ATTACK_SKILLS
} from '../../../constants/constants.js';
import { RACES } from '../../../constants/races.js';
import {
  NPCEDITOR_GET_NPC,
  NPCEDITOR_GET_NPCTEMPLATE,
  NPCEDITOR_UNLOAD_NPC,
  NPCEDITOR_SET_FACTION_OPTIONS,
  NPCEDITOR_SET_TINT_OPTIONS,
  NPCEDITOR_SET_SPELLSET_OPTIONS,
  NPCEDITOR_SET_EFFECTSET_OPTIONS,
  NPCEDITOR_SET_LOOTTABLE_OPTIONS,
  NPCEDITOR_PATCH_NPC,
  NPCEDITOR_PATCH_NPCTEMPLATE,
  NPCEDITOR_UPDATE_NPC,
  NPCEDITOR_UPDATE_NPCTEMPLATE,
  NPCEDITOR_DELETE_NPC,
  NPCEDITOR_DELETE_NPCTEMPLATE
} from '../../../constants/actionTypes.js';
import Input from '../form/Input.jsx';
import Checkbox from '../form/Checkbox.jsx';
import Select from '../form/Select.jsx';
import FormHeader from '../form/FormHeader.jsx';
import NPCSpecialAbilities from './NPCSpecialAbilities.jsx';
import NPCFaction from './NPCFaction.jsx';
import NPCEmotes from './NPCEmotes.jsx';
import NPCTint from './NPCTint.jsx';
import NPCSpells from './NPCSpells/NPCSpells.jsx';
import NPCEffects from './NPCEffects.jsx';
import NPCLoot from './NPCLoot.jsx';
import NPCMerchantTable from './NPCMerchantTable.jsx';


const mapStateToProps = state => ({
  isLoaded: state.NPCEditor.isLoaded,
  isTemplate: state.NPCEditor.isTemplate,
  initialValues: state.NPCEditor.npc.type,
  faction: state.NPCEditor.npc.faction,
  emotes: state.NPCEditor.npc.emotes,
  tint: state.NPCEditor.npc.tint,
  spells: state.NPCEditor.npc.spells,
  effects: state.NPCEditor.npc.effects,
  loot: state.NPCEditor.npc.loot,
  merchant: state.NPCEditor.npc.merchant,
  altCurrency: state.EQLab.altCurrency
});

const mapDispatchToProps = dispatch => ({
  loadNPC: npcID =>
    dispatch({ type: NPCEDITOR_GET_NPC, npcID }),
  loadTemplate: templateID =>
    dispatch({ type: NPCEDITOR_GET_NPCTEMPLATE, templateID }),
  unload: () =>
    dispatch({ type: NPCEDITOR_UNLOAD_NPC }),
  setFactionOptions: (options) => 
    dispatch({ type: NPCEDITOR_SET_FACTION_OPTIONS, options }),
  setTintOptions: (options) => 
    dispatch({ type: NPCEDITOR_SET_TINT_OPTIONS, options }),
  setSpellSetOptions: (options) => 
    dispatch({ type: NPCEDITOR_SET_SPELLSET_OPTIONS, options }),
  setEffectSetOptions: (options) => 
    dispatch({ type: NPCEDITOR_SET_EFFECTSET_OPTIONS, options }),
  setLootTableOptions: (options) => 
    dispatch({ type: NPCEDITOR_SET_LOOTTABLE_OPTIONS, options }),
  patchNPC: (npcID, values) => 
    dispatch({ type: NPCEDITOR_PATCH_NPC, npcID, values }),
  patchNPCTemplate: (templateID, values) => 
    dispatch({ type: NPCEDITOR_PATCH_NPCTEMPLATE, templateID, values }),
  updateNPC: (npcID, values) => 
    dispatch({ type: NPCEDITOR_UPDATE_NPC, npcID }),
  updateNPCTemplate: (templateID) => 
    dispatch({ type: NPCEDITOR_UPDATE_NPCTEMPLATE, templateID }),
  deleteNPC: (npcID) => 
    dispatch({ type: NPCEDITOR_DELETE_NPC, npcID }),
  deleteNPCTemplate: (templateID) => 
    dispatch({ type: NPCEDITOR_DELETE_NPCTEMPLATE, templateID })
});

const NPCEditorOptions = {
  form: 'NPCEditor',
  enableReinitialize: true
}

class NPCEditor extends React.Component {
  constructor(props) {
    super(props);

    this.deleteNPC = () => {
      if (this.props.isTemplate) {
        confirm('Are you sure you want to delete this template?', {
          title: 'Delete NPC Template'
        }).then(() => {
          this.props.deleteNPCTemplate(this.props.templateID);
        }, () => {});
      } else {
        confirm('Are you sure you want to delete this NPC?', {
          title: 'Delete NPC'
        }).then(() => {
          this.props.deleteNPC(this.props.npcID);
        }, () => {});
      }
    }

    this.submitNPCForm = (values, dispatch, props) => {
      return new Promise((resolve, reject) => {
        if (props.dirty && props.valid) {
          const delta = diff(props.initialValues, values);

          if (this.props.isTemplate) {
            api.npc.patchNPCTemplate(values.id, delta)
              .then(res => {
                this.props.updateNPCTemplate(values.id);
                resolve();
              })
              .catch(error => {
                if (error.response.body.validationErrors) {
                  reject(new SubmissionError(error.response.body.validationErrors));
                } 
              });
          } else {
            api.npc.patchNPC(values.id, delta)
              .then(res => {
                this.props.updateNPC(values.id);
                resolve();
              })
              .catch(error => {
                if (error.response.body.validationErrors) {
                  reject(new SubmissionError(error.response.body.validationErrors));
                } 
              });
          }
        }
      });
    }

    this.searchFactions = debounce((input) => {
      let options;
      if (input.length > 2) {
        api.npc.searchFactionOptions(input ? input : this.props.faction.id)
          .then(results => {
            options = results.map(faction => {
              return {
                id: faction.id,
                label: `${faction.name} (${faction.id})`
              }
            });
            this.props.setFactionOptions(options);
          })
          .catch(error => null);
      }
    }, 400);

    this.changeFaction = (faction) => {
      if (faction) {
        this.props.patchNPC(
          this.props.npcID, 
          {npc_faction_id: faction.id}
        );
      }
    }

    this.searchTints = debounce((input) => {
      let options;
      if (input.length > 2) {
        api.npc.searchTintOptions(input ? input : this.props.tint.id)
          .then(results => {
            options = results.map(tint => {
              return {
                id: tint.id,
                label: `${tint.tint_set_name} (${tint.id})`
              }
            });
            this.props.setTintOptions(options);
          })
          .catch(error => null);
      }
    }, 400);

    this.changeTint = (tint) => {
      if (tint) {
        if (this.props.isTemplate) {
          this.props.patchNPCTemplate(this.props.templateID, {armortint_id: tint.id});
        } else {
          this.props.patchNPC(this.props.npcID, {armortint_id: tint.id});
        }  
      }
    }

    this.searchSpellSets = debounce((input) => {
      let options;
      if (input.length > 2) {
        api.npc.searchSpellSetOptions(input ? input : this.props.spells.id)
          .then(results => {
            options = results.map(spellset => {
              return {
                id: spellset.id,
                label: `${spellset.name} (${spellset.id})`
              }
            });
            this.props.setSpellSetOptions(options);
          })
          .catch(error => null);
      }
    }, 400);

    this.changeSpellSet = (spellset) => {
      if (spellset) {
        if (this.props.isTemplate) {
          this.props.patchNPCTemplate(this.props.templateID, {npc_spells_id: spellset.id});
        } else {
          this.props.patchNPC(this.props.npcID, {npc_spells_id: spellset.id});
        }
      }
    }

    this.searchEffectSets = debounce((input) => {
      let options;
      if (input.length > 2) {
        api.npc.searchEffectSetOptions(input ? input : this.props.effects.id)
          .then(results => {
            options = results.map(effectset => {
              return {
                id: effectset.id,
                label: `${effectset.name} (${effectset.id})`
              }
            });
            this.props.setEffectSetOptions(options);
          })
          .catch(error => null);
      }
    }, 400);

    this.changeEffectSet = (effectset) => {
      if (effectset) {
        if (this.props.isTemplate) {
          this.props.patchNPCTemplate(this.props.templateID, {npc_spells_effects_id: effectset.id});
        } else {
          this.props.patchNPC(this.props.npcID, {npc_spells_effects_id: effectset.id});
        }
      }
    }

    this.searchLootTables = debounce((input) => {
      let options;
      if (input.length > 2) {
        api.item.searchLootTableOptions(input ? input : this.props.loot.id)
          .then(results => {
            options = results.map(loottable => {
              return {
                id: loottable.id,
                label: `${loottable.name} (${loottable.id})`
              }
            });
            this.props.setLootTableOptions(options);
          })
          .catch(error => null);
      }
    }, 400);

    this.changeLootTable = (loottable) => {
      if (loottable) {
        if (this.props.isTemplate) {
          this.props.patchNPCTemplate(this.props.templateID, {loottable_id: loottable.id});
        } else {
          this.props.patchNPC(this.props.npcID, {loottable_id: loottable.id});
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoaded && nextProps.npcID && (nextProps.npcID !== this.props.npcID)) {
      this.props.loadNPC(nextProps.npcID);
    } else if (this.props.isLoaded && nextProps.templateID && (nextProps.templateID !== this.props.templateID)) {
      this.props.loadTemplate(nextProps.templateID);
    }
  }

  componentDidMount() {
    if (this.props.npcID){
      this.props.loadNPC(this.props.npcID)
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
        <form id="NPCEditor" spellCheck={false}>
          <Panel style={{ height: 945 }}>
            <Panel.Heading>
              <Field
                name="id"
                component={FormHeader}
                title="NPC"
                titleName={this.props.initialValues.name}
                isTemplate={this.props.isTemplate}
                formPristine={this.props.pristine}
                formSubmitting={this.props.submitting}
                submitSucceeded={this.props.submitSucceeded}
                delete={this.deleteNPC}
                reset={this.props.reset}
                handleSubmit={this.props.handleSubmit(this.submitNPCForm)}
              />
            </Panel.Heading>
            <Panel.Body collapsible={false}>
              <Row>
                <Col md={14}>
                  <Row>
                    <Col md={24}>
                      <Panel style={{ height: 449, overflowY: "scroll", padding: 5, marginBottom: 5 }}>
                        <Row>
                          <Col md={4}><Field component={Input} bsSize="sm" type="text" name="name" label="name"/></Col>
                          <Col md={4}><Field component={Input} type="text" name="lastname" label="lastname" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Input} type="text" name="level" label="level" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Input} type="text" name="maxlevel" label="maxlevel" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Input} type="text" name="scalerate" label="scalerate" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Select} options={NPC_CLASSES} name="class" label="class" bsSize="sm"/></Col>
                        </Row>
                        <Row>
                          <Col md={4}><Field component={Select} options={RACES} name="race" label="race" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Select} options={GENDERS} name="gender" label="gender" bsSize="sm"/></Col>
                          <Col md={2}><Field component={Select} options={BODY_TYPES} name="bodytype" label="bodytype" bsSize="sm"/></Col>
                          <Col md={2}><Field component={Input} type="text" name="texture" label="texture" bsSize="sm"/></Col>
                          <Col md={2}><Field component={Input} type="text" name="runspeed" label="runspeed" bsSize="sm"/></Col>
                          <Col md={2}><Field component={Input} type="text" name="walkspeed" label="walkspeed" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Input} type="text" name="aggroradius" label="aggroradius" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Input} type="text" name="assistradius" label="assistradius" bsSize="sm"/></Col>
                        </Row>
                        <Row>
                          <Col md={4}><Field component={Checkbox} type="text" name="see_invis" label="see_invis" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Checkbox} type="text" name="see_invis_undead" label="see_invis_undead" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Checkbox} type="text" name="see_hide" label="see_hide" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Checkbox} type="text" name="see_improved_hide" label="see_improved_hide" bsSize="sm"/></Col>
                          <Col md={4}><Field component={Checkbox} type="text" name="trackable" label="trackable" bsSize="sm"/></Col>
                          <Col md={4}>{/* Empty */}</Col>
                        </Row>
                        <Row>
                          <Col md={24}>
                            <fieldset className="form-border">
                            <legend className="form-border">Combat</legend>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="hp" label="hp" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="hp_regen_rate" label="hp_regen_rate" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="mana" label="mana"  bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="mana_regen_rate" label="mana_regen_rate" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="AC" label="AC" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="Avoidance" label="Avoidance" bsSize="sm"/></Col>
                              </Row>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="ATK" label="ATK" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="Accuracy" label="Accuracy" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="mindmg" label="mindmg" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="maxdmg" label="maxdmg" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="attack_delay" label="attack_delay" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="slow_mitigation" label="slow_mitigation" bsSize="sm"/></Col>
                              </Row>
                            </fieldset>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={24}>
                            <fieldset className="form-border">
                            <legend className="form-border">Stats</legend>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="STR" label="STR" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="STA" label="STA" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="DEX" label="DEX" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="AGI" label="AGI" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="_INT" label="_INT" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="WIS" label="WIS" bsSize="sm"/></Col>
                              </Row>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="CHA" label="CHA" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="MR" label="MR" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="CR" label="CR" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="DR" label="DR" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="FR" label="FR" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="PR" label="PR" bsSize="sm"/></Col>
                              </Row>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="Corrup" label="Corrup" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="PhR" label="PhR" bsSize="sm"/></Col>
                                <Col md={16}>{/* Empty */}</Col>
                              </Row>
                            </fieldset>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={24}>
                            <fieldset className="form-border">
                            <legend className="form-border">Appearance</legend>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="size" label="size" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="face" label="face" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="herosforgemodel" label="herosforgemodel" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="drakkin_heritage" label="drakkin_heritage" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="drakkin_tattoo" label="drakkin_tattoo" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="drakkin_details" label="drakkin_details" bsSize="sm"/></Col>
                              </Row>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="helmtexture" label="helmtexture" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="armtexture" label="armtexture" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="bracertexture" label="bracertexture" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="handtexture" label="handtexture"bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="legtexture" label="legtexture" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="feettexture" label="feettexture" bsSize="sm"/></Col>
                              </Row>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="d_melee_texture1" label="d_melee_texture1" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="d_melee_texture2" label="d_melee_texture2" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Select} options={MELEE_ATTACK_SKILLS} name="prim_melee_type" label="prim_melee_type" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Select} options={MELEE_ATTACK_SKILLS} name="sec_melee_type" label="sec_melee_type" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="ammo_idfile" label="ammo_idfile" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Select} options={RANGE_ATTACK_SKILLS} name="ranged_type" label="ranged_type" bsSize="sm"/></Col>
                              </Row>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="luclin_hairstyle" label="luclin_hairstyle" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="luclin_haircolor" label="luclin_haircolor" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="luclin_eyecolor" label="luclin_eyecolor" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="luclin_eyecolor2" label="luclin_eyecolor2" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="luclin_beardcolor" label="luclin_beardcolor" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="luclin_beard" label="luclin_beard" bsSize="sm"/></Col>
                              </Row>
                            </fieldset>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={24}>
                            <fieldset className="form-border">
                            <legend className="form-border">Misc</legend>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="version" label="version" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Checkbox} type="text" name="npc_aggro" label="npc_aggro" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="spawn_limit" label="spawn_limit" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Checkbox} type="text" name="unique_spawn_by_name" label="unique_spawn_by_name" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Checkbox} type="text" name="qlobal" label="qlobal" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Checkbox} type="text" name="isquest" label="isquest" bsSize="sm"/></Col>
                              </Row>
                              <Row>
                                <Col md={4}><Field component={Checkbox} type="text" name="findable" label="findable" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Checkbox} type="text" name="isbot" label="isbot" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Checkbox} type="text" name="private_corpse" label="private_corpse" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Checkbox} type="text" name="underwater" label="underwater" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Checkbox} type="text" name="no_target_hotkey" label="no_target_hotkey" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="adventure_template_id" label="adventure_template" bsSize="sm"/></Col>
                              </Row>
                              <Row>
                                <Col md={4}><Field component={Input} type="text" name="trap_template" label="trap_template" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="attack_count" label="attack_count" bsSize="sm"/></Col>
                                <Col md={4}><Field component={Input} type="text" name="npcspecialattks" label="npcspecialattks" bsSize="sm" readOnly/></Col>
                                <Col md={4}><Field component={Input} type="text" name="attack_speed" label="attack_speed" bsSize="sm" readOnly/></Col>
                                <Col md={4}><Field component={Input} type="text" name="exclude" label="exclude" bsSize="sm" readOnly/></Col>
                                <Col md={4}><Field component={Input} type="text" name="light" label="light" bsSize="sm"/></Col>
                              </Row>
                              <Row>
                                <Col md={4}><Field component={Checkbox} bsSize="sm"type="text" name="raid_target" label="raid_target"/></Col>
                                <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="unique_" label="unique_"/></Col>
                                <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="ignore_despawn" label="ignore_despawn"/></Col>
                                <Col md={4}><Field component={Checkbox} bsSize="sm" type="text" name="fixed" label="fixed"/></Col>
                                <Col md={4}><Field component={Input} bsSize="sm" type="text" name="peqid" label="peqid"/></Col>
                                <Col md={4}>{/* Empty */}</Col>
                              </Row>
                            </fieldset>
                          </Col>
                        </Row>
                      </Panel>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={24}>
                      <Tab.Container id="npc-panel" defaultActiveKey="npcspecialabilities">
                        <Panel style={{ height: 449, marginBottom: 0 }}>
                          <Panel.Heading style={{ paddingBottom: 0 }}>
                            <Nav bsStyle="tabs" style={{ borderBottom: "none" }}>
                              <NavItem eventKey="npcspecialabilities">Special Abilities</NavItem>
                              <NavItem eventKey="npcfaction">Faction</NavItem>
                              <NavItem eventKey="npcemotes">Emotes</NavItem>
                              <NavItem eventKey="npctint">Tint</NavItem>
                            </Nav> 
                          </Panel.Heading>
                          <Panel.Body collapsible={false}>
                            <Tab.Content animation={false} mountOnEnter={false} unmountOnExit={false}>
                              <Tab.Pane eventKey="npcspecialabilities">
                                <Field 
                                  component={NPCSpecialAbilities} 
                                  name="special_abilities"
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey="npcfaction">
                                <Field
                                  component={NPCFaction} 
                                  name="npc_faction_id"
                                  faction={this.props.faction}
                                  searchFactions={this.searchFactions}
                                  changeFaction={this.changeFaction}
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey="npcemotes">
                                <Field
                                  component={NPCEmotes} 
                                  name="emoteid"
                                  emotes={this.props.emotes}
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey="npctint">
                                <Field
                                  component={NPCTint} 
                                  name="armortint_id" // Possibly need to add more: armortint_red, armortint_green, armortint_blue
                                  tint={this.props.tint}
                                  searchTints={this.searchTints}
                                  changeTint={this.changeTint}
                                />
                              </Tab.Pane>
                            </Tab.Content>
                          </Panel.Body>
                        </Panel>
                      </Tab.Container> 
                    </Col>
                  </Row>
                </Col>
                <Col md={10}>
                  <Tab.Container id="npc-panel" defaultActiveKey="npcspells">
                    <Panel style={{ height: 903 }}>
                      <Panel.Heading style={{ paddingBottom: 0 }}>
                        <Nav bsStyle="tabs" style={{ borderBottom: "none" }}>
                          <NavItem eventKey="npcspells">Spells</NavItem>
                          <NavItem eventKey="npceffects">Passives</NavItem>
                          <NavItem eventKey="npcloot">Loot</NavItem>
                          <NavItem eventKey="npcmerchant">Merchant</NavItem>
                        </Nav> 
                      </Panel.Heading>
                      <Panel.Body collapsible={false}>
                        <Tab.Content animation={false} mountOnEnter={false} unmountOnExit={false}>
                          <Tab.Pane eventKey="npcspells">
                            <Fields
                              component={NPCSpells} 
                              names={[ 'npc_spells_id', 'spellscale', 'healscale' ]}
                              spells={this.props.spells}
                              searchSpellSets={this.searchSpellSets}
                              changeSpellSet={this.changeSpellSet}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="npceffects">
                            <Field
                              component={NPCEffects} 
                              name="npc_spells_effects_id"
                              effects={this.props.effects}
                              searchEffectSets={this.searchEffectSets}
                              changeEffectSet={this.changeEffectSet}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="npcloot">
                            <Field
                              component={NPCLoot} 
                              name="loottable_id"
                              loot={this.props.loot}
                              searchLootTables={this.searchLootTables}
                              changeLootTable={this.changeLootTable}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="npcmerchant">
                            <Fields
                              component={NPCMerchantTable}
                              names={[ 'merchant_id', 'alt_currency_id' ]}
                              merchant={this.props.merchant}
                              altCurrency={this.props.altCurrency}
                            />
                          </Tab.Pane>
                        </Tab.Content>
                      </Panel.Body>
                    </Panel>
                  </Tab.Container> 
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        </form>
      );
    }
  }
}

NPCEditor = reduxForm(NPCEditorOptions)(NPCEditor);

export default connect(mapStateToProps, mapDispatchToProps)(NPCEditor);