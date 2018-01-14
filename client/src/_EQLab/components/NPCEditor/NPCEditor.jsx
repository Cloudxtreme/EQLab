import React from 'react';
import { Row, Col, Panel, Tab, Nav, NavItem, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, FormSection, Field, Fields } from 'redux-form';
import api from '../../../api.js';
import { debounce } from 'lodash';
import {
  NPCEDITOR_FETCH_NPC,
  NPCEDITOR_UNLOAD_NPC,
  NPCEDITOR_SET_SPELLSET_OPTIONS,
  NPCEDITOR_UPDATE_NPC
} from '../../../constants/actionTypes';
import NPCEditorHeader from './NPCEditorHeader.jsx';
import NPCType from './NPCType.jsx';
import NPCSpecialAbilities from './NPCSpecialAbilities.jsx';
import NPCSpells from './NPCSpells/NPCSpells.jsx';
// import NPCLoot from './NPCLoot.jsx';


const mapStateToProps = state => ({
  isLoaded: state.NPCEditor.isLoaded,
  initialValues: state.NPCEditor.npc,
  spells: state.NPCEditor.npc.spells,
  loot: state.NPCEditor.npc.loot
});

const mapDispatchToProps = dispatch => ({
  load: npcID =>
    dispatch({ type: NPCEDITOR_FETCH_NPC, npcID }),
  unload: () =>
    dispatch({ type: NPCEDITOR_UNLOAD_NPC }),
  setSpellSetOptions: (options) => 
    dispatch({ type: NPCEDITOR_SET_SPELLSET_OPTIONS, options }),
  updateNPC: (npcID, values) => 
    dispatch({ type: NPCEDITOR_UPDATE_NPC, npcID, values})
});

const NPCEditorOptions = {
  form: 'NPCEditor',
  enableReinitialize: true
}

class NPCEditor extends React.Component {
  constructor(props) {
    super(props);

    this.deleteNPC = () => {
      console.log('NPC Deleted');
    }

    this.searchSpellSets = debounce((input) => {
      let options;

      if (input.length > 2) {
        api.npc.searchSpellSets(input ? input : this.props.spells.id)
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
        this.props.updateNPC(this.props.npcID, {npc_spells_id: spellset.id});
      }
    }

    this.changeLootTable = (loottableID) => {
      this.props.updateNPC(this.props.npcID, {loottable_id: loottableID});
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
                handleSubmit={this.props.handleSubmit}
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
                      <Tab.Container id="npc-panel" defaultActiveKey="specialabilities">
                        <Panel style={{ height: 449, marginBottom: 0 }}>
                          <Panel.Heading style={{ paddingBottom: 0 }}>
                            <Nav bsStyle="tabs" style={{ borderBottom: "none" }}>
                              <NavItem eventKey="specialabilities">Special Abilities</NavItem>
                              <NavItem eventKey="faction">Faction</NavItem>
                              <NavItem eventKey="emote">Emote</NavItem>
                              <NavItem eventKey="tint">Tint</NavItem>
                            </Nav> 
                          </Panel.Heading>
                          <Panel.Body collapsible={false}>
                            <Tab.Content animation={false} mountOnEnter={false} unmountOnExit={false}>
                              <Tab.Pane eventKey="specialabilities">
                                <Field 
                                  component={NPCSpecialAbilities} 
                                  name="type.special_abilities"
                                />
                              </Tab.Pane>
                              <Tab.Pane eventKey="faction">
                                FACTION
                              </Tab.Pane>
                              <Tab.Pane eventKey="emote">
                                EMOTE
                              </Tab.Pane>
                              <Tab.Pane eventKey="tint">
                                TINT
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
                    <Panel>
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
                            PASSIVES
                          </Tab.Pane>
                          <Tab.Pane eventKey="npcloot">
                            {/* <Field 
                              component={NPCLoot} 
                              name="type.loottable_id"
                              loot={this.props.loot}
                              changeLootTable={this.changeLootTable}
                            /> */}
                          </Tab.Pane>
                          <Tab.Pane eventKey="npcmerchant">
                            MERCHANT
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

NPCEditor = connect(mapStateToProps, mapDispatchToProps)(NPCEditor);

export default NPCEditor;