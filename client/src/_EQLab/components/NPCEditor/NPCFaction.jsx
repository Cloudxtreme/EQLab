import React from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { NPC_FACTION_ENTRIES } from '../../../constants/constants.js';


const mapStateToProps = state => ({
  options: state.NPCEditor.factionOptions
});

class NPCFaction extends React.PureComponent {
  render() {

    const faction = this.props.faction;

    const columns = [{
      Header: "Name",
      accessor: "name",
      width: 190
    }, {
      Header: "Value",
      accessor: "value",
      width: 80,
      style: { textAlign: "center" }
    }, {
      Header: "NPC Behavior",
      id: "npc_value",
      accessor: (data) => NPC_FACTION_ENTRIES.npc_value[data.npc_value],
      width: 60,
      style: { textAlign: "center" }
    }, {
      Header: "Temporary Faction",
      id: "temp",
      accessor: (data) => NPC_FACTION_ENTRIES.temp[data.temp],
      width: 60,
      style: { textAlign: "center" }
    }];

    const tableProps = {
      style: { border: "none"},
      columns: columns,
      filterable: false,
      className: "-striped -highlight",
      showPagination: false
    }

    return (
      <div id="NPCFaction">
        <Row>
          <Col md={24}>
            <Panel style={{ height: 393 }}>
              <Panel.Heading>
                <Row style={{ height: 50 }}>
                  <Col md={20}>
                    <Select
                      name="selectfaction"
                      ref="selectfaction"
                      valueKey="id"
                      placeholder="Search Factions"
                      searchPromptText="Minimum of 3 characters to search"
                      clearable={false}
                      onBlurResetsInput={false}
                      onCloseResetsInput={false}
                      backspaceRemoves={false}
                      deleteRemoves={false}
                      value={this.props.input.value}
                      resetValue={this.props.input.value}
                      options={this.props.options}
                      onInputChange={this.props.searchFactions}
                      onChange={this.props.changeFaction}
                      className="input-sm"
                      style={{ borderRadius: 0}}
                    />
                  </Col>
                  <Col md={4}>
                    { 
                      !faction
                        ? null
                        : <Button bsStyle="danger" bsSize="xs" style={{ marginTop: 20 }} onClick={() => this.props.changeFaction({id: 0})}>
                            <FontAwesome name="chain-broken"/>&nbsp;Unlink
                          </Button>
                    }
                  </Col>
                </Row>
              </Panel.Heading>
              <Panel.Body style={{ padding: 0 }}>
              {
                !faction
                  ? null
                  : 
                      <ReactTable
                        data={faction.entries}
                        pageSize={faction.entries.length}
                        {...tableProps}
                      />
              }
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NPCFaction);