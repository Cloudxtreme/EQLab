import React from 'react';
import { Row, Col, PanelGroup, Panel, FormGroup, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import api from '../../../../api.js';
import { debounce } from 'lodash';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


const mapStateToProps = state => ({
  spells: state.global.npc.spells
});

class NPCSpells extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  // componentDidMount() {
  //   console.log(this.props);
  // }

  render() {
    const columns = [{
      Header: "spell",
      accessor: "name",
      width: 120
    }, {
      Header: "type",
      accessor: "type",
      width: 40
    }, {
      Header: "minlevel",
      accessor: "minlevel",
      width: 70
    }, {
      Header: "maxlevel",
      accessor: "maxlevel",
      width: 70
    }, {
      Header: "recast_delay",
      accessor: "recast_delay",
      width: 80
    }, {
      Header: "priority",
      accessor: "priority",
      width: 60
    }, {
      Header: "resist_adjust",
      accessor: "resist_adjust",
      width: 70
    }
  ]

    return (
      <div id="NPCSpells">
        <Row>
          <Col md={12}>
            <FormGroup>
              {/* <Select.Async
                name="selectspellset"
                ref="selectspellset"
                valueKey="id"
                placeholder="Search Spellsets"
                searchPromptText="Minimum of 3 characters to search"
                clearable={false}
                onSelectResetsInput={false}
                onBlurResetsInput={false}
                onCloseResetsInput={false}
                backspaceRemoves={false}
                deleteRemoves={false}
                cache={false}
                autoload={true}
                value={this.props.spells.id}
                resetValue={this.props.spells.id}
                loadOptions={this.searchSpellSets}
                onChange={this.selectSpellSet}
                className="input-sm"
              /> */}
            </FormGroup>
          </Col>
          <Col md={6}>
            {/* { 
              !this.props.type.npc_spells_id
                ? null
                : <Button bsStyle="danger" bsSize="xs"   style={{ marginTop: 20 }} onClick={this.props.clearSpellSet}>
                    <FontAwesome name="chain-broken"/>&nbsp;Clear
                  </Button>
            } */}
          </Col>
          <Col md={6}>
          </Col>
        </Row>
        <Row>
          {
            !this.props.spells
              ? null
              : <PanelGroup>
                  <Panel collapsible defaultExpanded={true} eventKey="spellset"
                    header={
                      <div>
                        <Row>
                          <Col md={24}>
                            <span>{`${this.props.spells.id}: ${this.props.spells.name}`}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={24}>
                            <span>{`Attack Proc: ${this.props.spells.proc_name} Chance: ${this.props.spells.proc_chance}`}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={24}>
                            <span>{`Range Proc: ${this.props.spells.rproc_name} Chance: ${this.props.spells.rproc_chance}`}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={24}>
                            <span>{`Defensive Proc: ${this.props.spells.dproc_name} Chance: ${this.props.spells.dproc_chance}`}</span>
                          </Col>
                        </Row>
                      </div>
                  }>
                    {
                      !this.props.spells.entries.length
                        ? <center><span>No Spell Entries Found</span></center>
                        : <ReactTable
                            data={this.props.spells.entries}
                            columns={columns}
                            filterable={false}
                            className="-striped -highlight"
                            showPagination={false}
                            pageSize={this.props.spells.entries.length}
                            defaultSorted={[
                              {
                                id: "minlevel",
                                desc: false
                              }
                            ]}
                          />
                    }
                  </Panel>
            </PanelGroup>
          }
        </Row>
      </div>
    );
  }
}

NPCSpells = connect(mapStateToProps)(NPCSpells);

export default NPCSpells;