import React from 'react'
import { Row, Col, Panel, Tab, Nav, NavItem, } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm, FormSection, Field, Fields } from 'redux-form'
import api from '../../../api.js'
import {
  GLOBAL_LOAD_NPC,
  GLOBAL_UNLOAD_NPC
} from '../../../constants/actionTypes'
import NPCEditorHeader from './NPCEditorHeader.jsx'
import NPCType from './NPCType.jsx'
import NPCSpecialAbilities from './NPCSpecialAbilities.jsx'
import NPCSpells from './NPCSpells.jsx'
// import NPCLoot from './NPCLoot.jsx'


const mapStateToProps = state => ({
  initialValues: state.global.npc
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: GLOBAL_LOAD_NPC, payload }),
  onUnload: payload =>
    dispatch({ type: GLOBAL_UNLOAD_NPC }),
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.npcID !== this.props.npcID) {
      this.props.onLoad(api.npc.getNPCData(nextProps.npcID))
    }
  }

  componentDidMount() {
    this.props.onLoad(api.npc.getNPCData(this.props.npcID))
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <form id="NPCEditor" spellCheck={false}>
        <Panel
          header={
            <Field
              name="type.id"
              component={NPCEditorHeader}
              formPristine={this.props.pristine}
              formSubmitting={this.props.submitting}
              deleteNPC={this.deleteNPC}
              reset={this.props.reset}
              handleSubmit={this.props.handleSubmit}
            />
        }>
          <Row>
            <Col md={14}>
              <Row>
                <Panel>
                  <Col md={24} className="scroll-col"  style={{ height: 350 }}>
                    <FormSection name="type">
                      <NPCType />
                    </FormSection>
                  </Col>
                </Panel>
              </Row>
              <Row>
                <Col md={24}>
                  <Tab.Container id="npc-panel" defaultActiveKey="specialabilities">
                    <Panel header={
                      <Nav bsStyle="tabs">
                        <NavItem eventKey="specialabilities">Special Abilities</NavItem>
                        <NavItem eventKey="faction">Faction</NavItem>
                        <NavItem eventKey="emote">Emote</NavItem>
                        <NavItem eventKey="tint">Tint</NavItem>
                      </Nav> 
                    }>
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
                    </Panel>
                  </Tab.Container> 
                </Col>
              </Row>
            </Col>
            <Col md={10}>
              <Tab.Container id="npc-panel" defaultActiveKey="npcspells">
                <Panel header={
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="npcspells">Spells</NavItem>
                    <NavItem eventKey="npceffects">Passives</NavItem>
                    <NavItem eventKey="npcloot">Loot</NavItem>
                    <NavItem eventKey="npcmerchant">Merchant</NavItem>
                  </Nav> 
                }>
                  <Tab.Content animation={false} mountOnEnter={false} unmountOnExit={false}>
                    <Tab.Pane eventKey="npcspells">
                      <Fields
                        component={NPCSpells} 
                        names={[ 'type.npc_spells_id', 'type.spellscale', 'type.healscale' ]}
                        spells={this.props.initialValues.spells || null}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="npceffects">
                      PASSIVES
                    </Tab.Pane>
                    <Tab.Pane eventKey="npcloot">
                      LOOT
                    </Tab.Pane>
                    <Tab.Pane eventKey="npcmerchant">
                      MERCHANT
                    </Tab.Pane>
                  </Tab.Content>
                </Panel>
              </Tab.Container> 
            </Col>
          </Row>
        </Panel>
      </form>
    );
  }
}

NPCEditor = reduxForm(NPCEditorOptions)(NPCEditor)

NPCEditor = connect(mapStateToProps, mapDispatchToProps)(NPCEditor)

export default NPCEditor;