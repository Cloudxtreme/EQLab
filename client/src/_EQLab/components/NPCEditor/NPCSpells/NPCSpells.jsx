import React from 'react';
import { Row, Col, PanelGroup, Panel, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import api from '../../../../api.js';
import { debounce } from 'lodash';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import { NPC_SPELL_TYPES } from '../form/constants/constants.js';

const mapStateToProps = state => ({
  spells: state.global.npc.spells
});

class NPCSpells extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spellsetID: this.props.spells.id
    }

    this.searchSpellSets = debounce((input, callback) => {
      let options;
      if (this.state.spellsetID === 0 && input === '') {
        options = [];
        callback(null, { options })
      } else if (this.state.spellsetID !== 0 && input === '') {
        options = [{ id: this.props.spells.id, label: `${this.props.spells.name} (${this.props.spells.id})` }];
        callback(null, { options })
      }
      else if (input.length > 2 || input === '') {
        // api.zone.searchSpawngroups(input ? input : this.state.spawngroupID)
        //   .then(results => {
        //     options = results.map(spawngroup => {
        //       return {
        //         id: spawngroup.id,
        //         label: `${spawngroup.name} (${spawngroup.id})`
        //       }
        //     });
        //     callback(null, { options })
        //   })
        //   .catch(error => callback(error, null));
      } else {
        options = [];
        callback(null, { options })
      }
    }, 400);
  }

  

  render() {

    const { spells } = this.props;
    const parent_list = spells && spells.parent_list;

    const columns = [{
      Header: "spell",
      accessor: "name"
    }, {
      Header: "type",
      accessor: "type"
    }, {
      Header: "minlevel",
      accessor: "minlevel"
    }, {
      Header: "maxlevel",
      accessor: "maxlevel"
    }, {
      Header: "recast_delay",
      accessor: "recast_delay"
    }, {
      Header: "priority",
      accessor: "priority"
    }, {
      Header: "resist_adjust",
      accessor: "resist_adjust"
    }
  ]

    return (
      <div id="NPCSpells">
        <Row>
          <Col md={8}>
            <FormGroup> 
              <Select.Async
                name="selectspellset"
                ref="selectspellset"
                valueKey="id"
                placeholder="Search Spellsets"
                searchPromptText="Minimum of 3 characters to search"
                clearable={false}
                onBlurResetsInput={false}
                onCloseResetsInput={false}
                backspaceRemoves={false}
                deleteRemoves={false}
                cache={false}
                autoload={true}
                value={this.state.spellsetID}
                resetValue={this.state.spellsetID}
                loadOptions={this.searchSpellSets}
                onChange={this.selectSpellSet}
                className="input-sm"
              />
            </FormGroup>
          </Col>
          <Col md={8}>
          </Col>
          <Col md={8}>
          </Col>
        </Row>
        <Row>
          {
            !spells
              ? null
              : <PanelGroup>
                  <Panel collapsible defaultExpanded={true} eventKey="spellset"
                    header={
                      <div>
                        <Row>
                          <Col md={24}>
                            <span>{`${spells.id}: ${spells.name}`}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={24}>
                            <span>{`Attack Proc: ${spells.proc_name} Chance: ${spells.proc_chance}`}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={24}>
                            <span>{`Range Proc: ${spells.rproc_name} Chance: ${spells.rproc_chance}`}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={24}>
                            <span>{`Defensive Proc: ${spells.dproc_name} Chance: ${spells.dproc_chance}`}</span>
                          </Col>
                        </Row>
                      </div>
                  }>
                    {
                      !spells.entries.length
                        ? <center><span>No Spell Entries Found</span></center>
                        : <ReactTable
                            data={spells.entries}
                            columns={columns}
                            filterable={false}
                            className="-striped -highlight"
                            showPagination={false}
                            pageSize={spells.entries.length}
                          />
                    }
                  </Panel>
                
              {
                !parent_list
                  ? null
                  : <Panel collapsible header="Parent List" eventKey="spellsparentlist">
                      Parent List
                    </Panel>
              }
            </PanelGroup>
          }
        </Row>
      </div>
    );
  }
}

NPCSpells = connect(mapStateToProps)(NPCSpells);

export default NPCSpells;