import React from 'react';
import { Row, Col, PanelGroup, Panel, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Input from '../../form/Input.jsx';
import NPCSpellsTableHeader from './NPCSpellsTableHeader.jsx';


const mapStateToProps = state => ({
  options: state.NPCEditor.spellsetOptions
});

class NPCSpells extends React.PureComponent {
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

export default connect(mapStateToProps)(NPCSpells);