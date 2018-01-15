import React from 'react';
import { Row, Col, PanelGroup, Panel, Button, Checkbox } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


const mapStateToProps = state => ({
  options: state.NPCEditor.loottableOptions
});

class NPCLoot extends React.PureComponent {
  render() {
    const loot = this.props.loot;
    const lootdrops = loot.lootdrops && loot.lootdrops.sort((a, b) => b.probability - a.probability);

    const columns = [{
      Header: "Item",
      accessor: "name",
      width: 150
    }, {
      Header: "Chance",
      accessor: "chance",
      width: 60,
      style: { textAlign: "center" }
    }, {
      Header: "Charges",
      accessor: "item_charges",
      width: 60,
      style: { textAlign: "center" }
    }, {
      Header: "Multiplier",
      accessor: "multiplier",
      width: 60,
      style: { textAlign: "center" }
    }, {
      Header: "Min Lvl",
      accessor: "minlevel",
      width: 50,
      style: { textAlign: "center" }
    }, {
      Header: "Max Lvl",
      accessor: "maxlevel",
      width: 50,
      style: { textAlign: "center" }
    }, {
      Header: "Equipped",
      accessor: "equip_item",
      width: 60,
      style: { textAlign: "center" },
      Cell: row => <Checkbox disabled={true} checked={row.value === 1 ? true : false} style={{ margin: 0 }}/>
    }];

    const tableProps = {
      style: { border: "none"},
      columns: columns,
      filterable: false,
      className: "-striped -highlight",
      showPagination: false,
      defaultSorted: [
        {
          id: "Chance",
          desc: true
        }
      ]
    }

    return (
      <div id="NPCLoot">
        <Row style={{ height: 50 }}>
          <Col md={14}>
            <Select
              name="selectloottable"
              ref="selecteloottable"
              valueKey="id"
              placeholder="Search Loot Tables"
              searchPromptText="Minimum of 3 characters to search"
              clearable={false}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              backspaceRemoves={false}
              deleteRemoves={false}
              value={this.props.input.value}
              resetValue={this.props.input.value}
              options={this.props.options}
              onInputChange={this.props.searchLootTables}
              onChange={this.props.changeLootTable}
              className="input-sm"
              style={{ borderRadius: 0}}
            />
          </Col>
          <Col md={4}>
          { 
            !loot
              ? null
              : <Button bsStyle="danger" bsSize="xs" style={{ marginTop: 20 }} onClick={() => this.props.changeLootTable({id: 0})}>
                  <FontAwesome name="chain-broken"/>&nbsp;Unlink
                </Button>
          }
          </Col>
          <Col md={6}>
          {
            !loot
              ? null
              : <table style={{ tableLayout: "fixed", width: 130 }}>
                  <tbody>
                    <tr>
                      <th style={{ textAlign: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black" }}>Min</th>
                      <th style={{ textAlign: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black" }}>Max</th>
                      <th style={{ textAlign: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black" }}>Avg</th>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center", overflow: "hidden" }}>{loot.mincash}</td>
                      <td style={{ textAlign: "center", overflow: "hidden" }}>{loot.maxcash}</td>
                      <td style={{ textAlign: "center", overflow: "hidden" }}>{loot.avgcoin}</td>
                    </tr>
                  </tbody>
                </table>
          }
          </Col>
        </Row>
        <Row>
          <Col md={24} style={{ maxHeight: 797, overflowY: "scroll" }}>
          {
            !loot
              ? null
              : <PanelGroup accordion id="npc-loot">
                  {
                    lootdrops.map(lootdrop => {
                      return (
                        <Panel key={lootdrop.id} eventKey={lootdrop.id} defaultExpanded={lootdrop.entries.length > 10 ? false : true}>
                          <Panel.Heading>
                            <Panel.Toggle>
                              <Row>
                                <Col md={24}>
                                  <table style={{ tableLayout: "fixed", width: 480 }}>
                                    <tbody>
                                      <tr>
                                        <th style={{ textAlign: "left", rowspan: 2, overflow: "hidden"}}>{lootdrop.name}</th>
                                        <th style={{ textAlign: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black" }}>Multiplier</th>
                                        <th style={{ textAlign: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black" }}>Probability</th>
                                        <th style={{ textAlign: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black" }}>Min Drop</th>
                                        <th style={{ textAlign: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black" }}>Drop Limit</th>
                                      </tr>
                                      <tr>
                                        <td></td>
                                        <td style={{ textAlign: "center", overflow: "hidden" }}>{lootdrop.multiplier}</td>
                                        <td style={{ textAlign: "center", overflow: "hidden" }}>{lootdrop.probability}%</td>
                                        <td style={{ textAlign: "center", overflow: "hidden" }}>{lootdrop.mindrop}</td>
                                        <td style={{ textAlign: "center", overflow: "hidden" }}>{lootdrop.droplimit}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </Col>
                              </Row>
                            </Panel.Toggle>
                          </Panel.Heading>
                          <Panel.Body collapsible>
                          {
                            !lootdrop.entries.length
                              ? <center><span>No Loot Entries Found</span></center>
                              : <ReactTable
                                  data={lootdrop.entries}
                                  pageSize={lootdrop.entries.length}
                                  {...tableProps}
                                />
                          }
                          </Panel.Body>
                        </Panel>
                      )
                    })
                  }
                </PanelGroup>
          }
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NPCLoot);