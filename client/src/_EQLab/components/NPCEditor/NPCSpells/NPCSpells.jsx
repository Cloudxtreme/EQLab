import React from 'react';
import { Row, Col, PanelGroup, Panel, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import FontAwesome from 'react-fontawesome';
import api from '../../../../api.js';
import { debounce } from 'lodash';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Input from '../../form/Input.jsx';
import NPCSpellsTableHeader from './NPCSpellsTableHeader.jsx';


class NPCSpells extends React.Component {
  constructor(props) {
    super(props);

    this.searchSpellSets = debounce((input, callback) => {
      let options;
      if (this.props.type.npc_spells_id.input.value === 0 && input === '') {
        options = [];
        callback(null, { options })
      } else if (this.props.spells && this.props.type.npc_spells_id.input.value !== 0 && input === '') {
        options = [{ id: this.props.type.npc_spells_id.input.value, label: `${this.props.spells.name} (${this.props.type.npc_spells_id.input.value})` }];
        callback(null, { options })
      } else if (input.length > 2 || input === '') {
        api.npc.searchSpellSets(input ? input : this.props.type.npc_spells_id.input.value)
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
      }
    }

    this.clearSpellSet = () => {
      this.props.changeSpellSet(0);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.refs.selectspellset.loadOptions("")
  }

  componentDidUpdate() {
    console.log(this.props)
  }

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
    }];

    const tableProps = {
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
        <Row style={{ height: 50}}>
          <Col md={12}>
          
              <Select.Async
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
                cache={false}
                autoload={true}
                value={this.props.type.npc_spells_id.input.value}
                resetValue={this.props.type.npc_spells_id.input.value}
                loadOptions={this.searchSpellSets}
                onChange={this.selectSpellSet}
                className="input-sm"
              />

          </Col>
          <Col md={4}>
            { 
              !this.props.spells
                ? null
                : <Button bsStyle="danger" bsSize="xs" style={{ marginTop: 20 }} onClick={this.clearSpellSet}>
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
          {
            !this.props.spells
              ? null
              : <PanelGroup>
                  <Panel collapsible defaultExpanded={true} eventKey="spellset" 
                    header={<NPCSpellsTableHeader spells={this.props.spells} />}
                  >
                    {
                      !this.props.spells.entries.length
                        ? <center><span>No Spell Entries Found</span></center>
                        : <ReactTable
                            data={this.props.spells.entries}
                            pageSize={this.props.spells.entries.length}
                            {...tableProps}
                          />
                    }
                  </Panel>
                  {
                    !this.props.spells.parent_list
                      ? null
                      : <Panel collapsible defaultExpanded={true} eventKey="spellset_parent_list"
                          header={<NPCSpellsTableHeader spells={this.props.spells.parent_list} />}
                        >
                          {
                            !this.props.spells.parent_list.entries.length
                              ? <center><span>No Spell Entries Found</span></center>
                              : <ReactTable
                                  data={this.props.spells.parent_list.entries}
                                  pageSize={this.props.spells.parent_list.entries.length}
                                  {...tableProps}
                                />
                          }
                        </Panel>
                  }
            </PanelGroup>
          }
        </Row>
      </div>
    );
  }
}

export default NPCSpells;