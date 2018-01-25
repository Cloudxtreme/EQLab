import React from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import api from '../../api.js';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import FontAwesome from 'react-fontawesome';
import {
  NPCAPP_CREATE_LOAD,
  NPCAPP_CREATE_UNLOAD,
  NPCAPP_CREATE_POST_NPC,
  NPCAPP_CREATE_COPY_NPC,
  NPCAPP_CREATE_SET_NPC_OPTIONS,
  NPCAPP_CREATE_POST_NPCTEMPLATE,
  NPCAPP_CREATE_COPY_NPCTEMPLATE
} from '../../constants/actionTypes';
import NPCEditor from '../components/NPCEditor/NPCEditor.jsx';

const mapStateToProps = state => ({
  npcTemplates: state.NPCApp.npcTemplates,
  options: state.NPCApp.npcOptions,
  npcID: state.NPCApp.createnpcID
});

const mapDispatchToProps = dispatch => ({
  load: (npcTemplates) =>
    dispatch({ type: NPCAPP_CREATE_LOAD, npcTemplates }),
  unload: () =>
    dispatch({ type: NPCAPP_CREATE_UNLOAD }),
  postNPC: () =>
    dispatch({ type: NPCAPP_CREATE_POST_NPC }),
  copyNPC: (npcID) =>
    dispatch({ type: NPCAPP_CREATE_COPY_NPC, npcID }),
  setNPCOptions: (options) =>
    dispatch({ type: NPCAPP_CREATE_SET_NPC_OPTIONS, options }),
  postNPCTemplate: () =>
    dispatch({ type: NPCAPP_CREATE_POST_NPCTEMPLATE }),
  copyNPCTemplate: (templateID) =>
    dispatch({ type: NPCAPP_CREATE_COPY_NPCTEMPLATE, templateID })
});

class NPCCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectednpcID: null
    }

    this.newNPC = () => {
      this.props.postNPC();
    }

    this.selectNPC = npc => {
      this.setState({ selectednpcID: npc.id })
    }

    this.copyNPC = () => {
      if (this.state.selectednpcID) {
        this.props.copyNPC(this.state.selectednpcID)
        // this.setState({ npcID: null })
      }   
    }

    this.searchNPCs = debounce((input) => {
      let options;

      if (input.length > 2) {
        api.npc.searchNPCOptions(input ? input : '')
          .then(results => {
            options = results.map(npc => {
              return {
                id: npc.id,
                label: `${npc.name} (${npc.id})`
              }
            });
            this.props.setNPCOptions(options);
          })
          .catch(error => null);
      }
    }, 400);

    this.newNPCTemplate = () => {
      this.props.postNPCTemplate();
    }

    this.copyNPCTemplate = (templateID) => {
      this.props.copyNPCTemplate(templateID);
    }
  }

  componentDidMount() {
    api.npc.getTemplates()
      .then(npcTemplates => {
        this.props.load(npcTemplates);
      })
  }

  componentWillUnmount() {
    this.props.unload();
  }

  render() {

    const columns = [{
      Header: "ID",
      accessor: "id",
      width: 80
    }, {
      Header: "Name",
      accessor: "name",
      width: 120
    }, {
      Header: "MinLvl",
      accessor: "level",
      width: 50,
      style: { textAlign: "center"}
    }, {
      Header: "MaxLvl",
      accessor: "maxlevel",
      width: 50,
      style: { textAlign: "center"}
    }, {
      Header: "Copy",
      accessor: "id",
      width: 50,
      style: { textAlign: "center"},
      Cell: row => {

      }
    }];

    return (
      <div id="NPCCreate">
        <Row>
          <Col md={5}>
            <Panel>
              <Panel.Heading>
                <Row>
                  <Col md={18}>
                    <Select
                      name="copynpc"
                      valueKey="id"
                      placeholder="Search NPCs"
                      searchPromptText="Minimum of 3 characters to search"
                      clearable={true}
                      onBlurResetsInput={false}
                      onCloseResetsInput={false}
                      onSelectResetsInput={false}
                      backspaceRemoves={false}
                      deleteRemoves={false}
                      value={this.state.selectednpcID}
                      resetValue={this.state.selectednpcID}
                      options={this.props.options}
                      onInputChange={this.searchNPCs}
                      onChange={this.selectNPC}
                      className="input-sm"
                      style={{ borderRadius: 0 }}
                    />
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={24}>
                        <Button 
                          bsStyle="primary" 
                          bsSize="xs" 
                          className="pull-right"
                          style={{ marginTop: 20 }}
                          onClick={this.newNPC}
                        >
                          <FontAwesome name="plus" />&nbsp;New NPC
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={24}>
                        <Button 
                          bsStyle="primary" 
                          bsSize="xs" 
                          className="pull-right"
                          style={{ marginTop: 20 }}
                          disabled={!this.state.selectednpcID}
                          onClick={this.copyNPC}
                        >
                          <FontAwesome name="clone" />&nbsp;Copy NPC
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Panel.Heading>
              <Panel.Body>
                <Row>
                  <Col md={24} style={{ padding: 0 }}>
                    <ReactTable
                      data={this.props.npcTemplates}
                      columns={columns}
                      defaultSorted={[
                        {
                          id: "id",
                          desc: false
                        }
                      ]}
                      filterable={false}
                      className="-striped -highlight"
                      style={{ height: 860, overflowY: "auto", fontSize: 12 }}
                      showPagination={true}
                      pageSize={50}
                      // getTdProps={(state, row, column, instance) => {
                      //   return { onClick: e => {this.props.setNPCID(row.original.id)} }
                      // }}
                    />
                  </Col>
                </Row>
              </Panel.Body>
            </Panel>
          </Col>
          <Col md={19}>
          {
            !this.props.npcID
              ? null
              : <NPCEditor npcID={this.props.npcID} />
          }
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NPCCreate);