import React from 'react';
import { Row, Col, PanelGroup, Panel, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { SPELL_EFFECTS } from '../../../constants/spell_effects.js';


const mapStateToProps = state => ({
  options: state.NPCEditor.effectsetOptions
});

class NPCEffects extends React.PureComponent {
  render() {

    const effects = this.props.effects;

    const columns = [{
      Header: "Effect",
      id: "effect_id",
      accessor: (data) => SPELL_EFFECTS[data.spell_effect_id].effect,
      width: 190
    }, {
      Header: "SE_Base",
      accessor: "se_base",
      width: 80,
      style: { textAlign: "center" }
    }, {
      Header: "SE_Limit",
      accessor: "se_limit",
      width: 60,
      style: { textAlign: "center" }
    }, {
      Header: "SE_Max",
      accessor: "se_max",
      width: 60,
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
      <div id="NPCEffects">
        <Row style={{ height: 50 }}>
          <Col md={20}>
            <Select
              name="selecteffectset"
              ref="selecteffectset"
              valueKey="id"
              placeholder="Search Effect Sets"
              searchPromptText="Minimum of 3 characters to search"
              clearable={false}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              backspaceRemoves={false}
              deleteRemoves={false}
              value={this.props.input.value}
              resetValue={this.props.input.value}
              options={this.props.options}
              onInputChange={this.props.searchEffectSets}
              onChange={this.props.changeEffectSet}
              className="input-sm"
              style={{ borderRadius: 0}}
            />
          </Col>
          <Col md={4}>
            { 
              !effects
                ? null
                : <Button bsStyle="danger" bsSize="xs" style={{ marginTop: 20 }} onClick={() => this.props.changeEffectSet({id: 0})}>
                    <FontAwesome name="chain-broken"/>&nbsp;Unlink
                  </Button>
            }
          </Col>
        </Row>
        <Row>
          <Col md={24} style={{ maxHeight: 797, overflowY: "scroll" }}>
          {
            !effects
              ? null
              : <PanelGroup id="npc-effects">
                  <Panel>
                    <Panel.Body style={{ padding: 0 }}>
                      {
                        !effects.entries.length
                          ? <center><span>No Effect Entries Found</span></center>
                          : <ReactTable
                              data={effects.entries}
                              pageSize={effects.entries.length}
                              {...tableProps}
                            />
                      }
                    </Panel.Body>
                  </Panel>
                  {
                    !effects.parent_list
                      ? null
                      : <Panel>
                          <Panel.Heading>
                            <Row>
                              <Col md={24}>
                                <span>{`Parent List: ${effects.parent_list.name} (${effects.parent_list.id})`}</span>
                              </Col>
                            </Row>                       
                          </Panel.Heading>
                          <Panel.Body style={{ padding: 0 }}>
                            {
                              !effects.parent_list.entries.length
                                ? <center><span>No Effect Entries Found</span></center>
                                : <ReactTable
                                    data={effects.parent_list.entries}
                                    pageSize={effects.parent_list.entries.length}
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

export default connect(mapStateToProps)(NPCEffects);