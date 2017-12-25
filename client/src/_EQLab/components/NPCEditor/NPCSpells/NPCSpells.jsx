import React from 'react';
import { Row, Col, PanelGroup, Panel, FormGroup, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
// import { connect } from 'react-redux';
import api from '../../../../api.js';
import { debounce } from 'lodash';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import { NPC_SPELL_TYPES } from '../form/constants/constants.js';

// const mapStateToProps = state => ({
//   spells: state.global.npc.spells
// });

class NPCSpells extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spellsetID: this.props.spells ? this.props.spells.id : 0
    }

    this.searchSpellSets = debounce((input, callback) => {
      let options;
      if (this.props.spells.id === 0 && input === '') {
        options = [];
        callback(null, { options })
      } else if (input.length > 2 || input === '') {
        api.npc.searchSpellSets(input ? input : this.props.spells.id)
          .then(results => {
            options = results.map(spellset => {
              return {
                id: spellset.id,
                label: `${spellset.name} (${spellset.id})`
              }
            });
            callback(null, { options })
          })
          .catch(error => callback(error, null));
      } else {
        options = [];
        callback(null, { options })
      }
    }, 400);

    this.selectSpellSet = spellset => {
      if (spellset) {
        this.props.changeSpellSet(spellset.id);
        this.setState({ spellsetID: spellset.id });
      } else {
        this.setState({ spellsetID: this.props.spells.id})
      }
    }
  }

  componentDidUpdate() {
    console.log(this.props);
  }
  // componentDidMount() {
  //   console.log(this.props.type.npc_spells_id)
  // }

  render() {

    const { spells } = this.props;
    const parent_list = spells && spells.parent_list;

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
              <Select.Async
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
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            { 
              !this.props.type.npc_spells_id
                ? null
                : <Button bsStyle="danger" bsSize="xs"   style={{ marginTop: 20 }} onClick={this.props.clearSpellSet}>
                    <FontAwesome name="chain-broken"/>&nbsp;Clear
                  </Button>
            }
          </Col>
          <Col md={6}>
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
                            defaultSorted={[
                              {
                                id: "minlevel",
                                desc: false
                              }
                            ]}
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

// NPCSpells = connect(mapStateToProps)(NPCSpells);

export default NPCSpells;