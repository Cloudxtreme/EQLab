import React from 'react';
import { Row, Col, Panel, Tab, Nav, NavItem, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, FormSection, Field, Fields } from 'redux-form';
import { confirm } from '../form/confirm/confirm.js';
import diff from 'object-diff';
import api from '../../../api.js';
import { debounce } from 'lodash';
import {
  NPCEDITOR_FETCH_NPC,
  NPCEDITOR_UNLOAD_NPC,
  NPCEDITOR_SET_FACTION_OPTIONS,
  NPCEDITOR_SET_TINT_OPTIONS,
  NPCEDITOR_SET_SPELLSET_OPTIONS,
  NPCEDITOR_SET_EFFECTSET_OPTIONS,
  NPCEDITOR_SET_LOOTTABLE_OPTIONS,
  NPCEDITOR_PUT_NPC,
  NPCEDITOR_UPDATE_NPC,
  NPCEDITOR_DELETE_NPC
} from '../../../constants/actionTypes.js';
import NPCEditorHeader from './NPCEditorHeader.jsx';
import NPCType from './NPCType.jsx';
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
  initialValues: state.NPCEditor.npc,
  faction: state.NPCEditor.npc.faction,
  emotes: state.NPCEditor.npc.emotes,
  tint: state.NPCEditor.npc.tint,
  spells: state.NPCEditor.npc.spells,
  effects: state.NPCEditor.npc.effects,
  loot: state.NPCEditor.npc.loot,
  merchant: state.NPCEditor.npc.merchant,
  altCurrency: state.Global.altCurrency
});

const mapDispatchToProps = dispatch => ({
  load: npcID =>
    dispatch({ type: NPCEDITOR_FETCH_NPC, npcID }),
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
  putNPC: (npcID, values, zone) => 
    dispatch({ type: NPCEDITOR_PUT_NPC, npcID, values, zone}),
  updateNPC: (npcID, values, zone) => 
    dispatch({ type: NPCEDITOR_UPDATE_NPC, npcID, values, zone}),
  deleteNPC: (npcID, zone) => 
    dispatch({ type: NPCEDITOR_DELETE_NPC, npcID, zone})
});

const NPCEditorOptions = {
  form: 'NPCEditor',
  enableReinitialize: true
}

class NPCEditor extends React.Component {
  constructor(props) {
    super(props);

    this.deleteNPC = () => {
      confirm('Are you sure you want to delete this NPC?', {
        title: 'Delete NPC'
      }).then(() => {
        this.props.deleteNPC(
          this.props.npcID, 
          this.props.zone ? this.props.zone : null
        );
      }, () => {});
    }

    this.submitNPCForm = (values, dispatch, props) => {
      return new Promise((resolve, reject) => {
        if (props.dirty && props.valid) {
          const delta = diff(props.initialValues.type, values.type);
          api.npc.putNPC(values.type.id, delta).then(res => {
            this.props.updateNPC(
              values.type.id, 
              delta,
              this.props.zone ? this.props.zone : null
            );
            resolve();
          }).catch(error => {
            if (error.validationErrors) {
              reject(new SubmissionError(error.validationErrors));
            } 
          });
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
        this.props.putNPC(
          this.props.npcID, 
          {npc_faction_id: faction.id},
          this.props.zone
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
        this.props.putNPC(
          this.props.npcID, 
          {armortint_id: tint.id},
          this.props.zone
        );
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
        this.props.putNPC(
          this.props.npcID, 
          {npc_spells_id: spellset.id},
          this.props.zone
        );
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
        this.props.putNPC(
          this.props.npcID, 
          {npc_spells_effects_id: effectset.id},
          this.props.zone
        );
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
        this.props.putNPC(
          this.props.npcID, 
          {loottable_id: loottable.id},
          this.props.zone
        );
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoaded && (nextProps.npcID !== this.props.npcID)) {
      this.props.load(nextProps.npcID);
    }
  }

  componentDidMount() {
    this.props.load(this.props.npcID)
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
                name="type.id"
                component={NPCEditorHeader}
                formPristine={this.props.pristine}
                formSubmitting={this.props.submitting}
                deleteNPC={this.deleteNPC}
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
                        <FormSection name="type">
                          <NPCType />
                        </FormSection>
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
                                  name="type.special_abilities"
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey="npcfaction">
                                <Field
                                  component={NPCFaction} 
                                  name="type.npc_faction_id"
                                  faction={this.props.faction}
                                  searchFactions={this.searchFactions}
                                  changeFaction={this.changeFaction}
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey="npcemotes">
                                <Field
                                  component={NPCEmotes} 
                                  name="type.emoteid"
                                  emotes={this.props.emotes}
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey="npctint">
                                <Field
                                  component={NPCTint} 
                                  name="type.armortint_id" // Possibly need to add more: armortint_red, armortint_green, armortint_blue
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
                              names={[ 'type.npc_spells_id', 'type.spellscale', 'type.healscale' ]}
                              spells={this.props.spells}
                              searchSpellSets={this.searchSpellSets}
                              changeSpellSet={this.changeSpellSet}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="npceffects">
                            <Field
                              component={NPCEffects} 
                              name="type.npc_spells_effects_id"
                              effects={this.props.effects}
                              searchEffectSets={this.searchEffectSets}
                              changeEffectSet={this.changeEffectSet}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="npcloot">
                            <Field
                              component={NPCLoot} 
                              name="type.loottable_id"
                              loot={this.props.loot}
                              searchLootTables={this.searchLootTables}
                              changeLootTable={this.changeLootTable}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="npcmerchant">
                            <Fields
                              component={NPCMerchantTable}
                              names={[ 'type.merchant_id', 'type.alt_currency_id' ]}
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