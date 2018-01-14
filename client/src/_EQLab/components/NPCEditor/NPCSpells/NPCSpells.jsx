import React from 'react';
import { Row, Col, PanelGroup, Panel, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { NPC_SPELL_TYPES } from '../../form/constants/constants.js';
import Input from '../../form/Input.jsx';
import NPCSpellsTableHeader from './NPCSpellsTableHeader.jsx';


const mapStateToProps = state => ({
  options: state.NPCEditor.spellsetOptions
});

class NPCSpells extends React.PureComponent {
  render() {
    const columns = [{
      Header: "Spell",
      accessor: "name",
      width: 120
    }, {
      Header: "Type",
      id: "spelltype",
      accessor: (data) => NPC_SPELL_TYPES[data.type],
      width: 40,
      style: { textAlign: "center" }
    }, {
      Header: "Min Lvl",
      accessor: "minlevel",
      width: 60,
      style: { textAlign: "center" }
    }, {
      Header: "Max Lvl",
      accessor: "maxlevel",
      width: 60,
      style: { textAlign: "center" }
    }, {
      Header: "Recast Delay",
      id: "recast_delay",
      // accessor: "recast_delay",
      accessor: (data) => data.recast_delay === -1 ? "None" : data.recast_delay,
      width: 90,
      style: { textAlign: "center" }
    }, {
      Header: "Priority",
      accessor: "priority",
      width: 50,
      style: { textAlign: "center" }
    }, {
      Header: "Resist Adjust",
      accessor: "resist_adjust",
      style: { textAlign: "center" }
    }];

    const tableProps = {
      style: { border: "none"},
      columns: columns,
      filterable: false,
      className: "-striped -highlight",
      showPagination: false,
      defaultSorted: [
        {
          id: "minlevel",
          desc: false
        }
      ]
    }

    return (
      <div id="NPCSpells">
        <Row>
          <Col md={12}>
            <Select
              name="selectspellset"
              ref="selectspellset"
              valueKey="id"
              placeholder="Search Spell Sets"
              searchPromptText="Minimum of 3 characters to search"
              clearable={false}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              backspaceRemoves={false}
              deleteRemoves={false}
              value={this.props.type.npc_spells_id.input.value}
              resetValue={this.props.type.npc_spells_id.input.value}
              options={this.props.options}
              onInputChange={this.props.searchSpellSets}
              onChange={this.props.changeSpellSet}
              className="input-sm"
              style={{ borderRadius: 0}}
            />
          </Col>
          <Col md={4}>
            { 
              !this.props.spells
                ? null
                : <Button bsStyle="danger" bsSize="xs" style={{ marginTop: 20 }} onClick={() => this.props.changeSpellSet({id: 0})}>
                    <FontAwesome name="chain-broken"/>&nbsp;Unlink
                  </Button>
            }
          </Col>
          <Col md={4}>
            <Field component={Input} bsSize="sm" type="text" name={this.props.names[1]} label="spellscale"/>
          </Col>
          <Col md={4}>
            <Field component={Input} bsSize="sm" type="text" name={this.props.names[2]} label="healscale"/>
          </Col>
        </Row>
        <Row>
          <Col md={24} style={{ maxHeight: 797, overflowY: "scroll" }}>
          {
            !this.props.spells
              ? null
              : <PanelGroup id="npc-spells">
                  <Panel>
                    <Panel.Heading>
                      <NPCSpellsTableHeader isParentList={false} spells={this.props.spells}/>
                    </Panel.Heading>
                    <Panel.Body style={{ padding: 0 }}>
                      {
                        !this.props.spells.entries.length
                          ? <center><span>No Spell Entries Found</span></center>
                          : <ReactTable
                              data={this.props.spells.entries}
                              pageSize={this.props.spells.entries.length}
                              {...tableProps}
                            />
                      }
                    </Panel.Body>
                  </Panel>
                  {
                    !this.props.spells.parent_list
                      ? null
                      : <Panel>
                          <Panel.Heading>
                            <NPCSpellsTableHeader isParentList={true} spells={this.props.spells.parent_list}/>
                          </Panel.Heading>
                          <Panel.Body style={{ padding: 0 }}>
                            {
                              !this.props.spells.parent_list.entries.length
                                ? <center><span>No Spell Entries Found</span></center>
                                : <ReactTable
                                    data={this.props.spells.parent_list.entries}
                                    pageSize={this.props.spells.parent_list.entries.length}
                                    {...tableProps}
                                  />
                            }
                          </Panel.Body>
                        </Panel>
                  }
            </PanelGroup>
          }
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NPCSpells);