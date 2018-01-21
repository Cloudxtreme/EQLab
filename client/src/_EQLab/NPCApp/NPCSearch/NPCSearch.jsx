import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { throttle, isEmpty } from 'lodash';
import api from '../../../api.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import FontAwesome from 'react-fontawesome';
import {
  NPCAPP_SEARCH_SET_NPCLIST,
  NPCAPP_SEARCH_SET_NPCID
} from '../../../constants/actionTypes';
import NPCSearchForm from './NPCSearchForm.jsx';
import NPCEditor from '../../components/NPCEditor/NPCEditor.jsx';

const mapStateToProps = state => ({
  npcList: state.NPCApp.npcList,
  npcID: state.NPCApp.npcID
});

const mapDispatchToProps = dispatch => ({
  setNPCList: (payload) =>
    dispatch({ type: NPCAPP_SEARCH_SET_NPCLIST, payload }),
  setNPCID: (npcID) =>
    dispatch({ type: NPCAPP_SEARCH_SET_NPCID, npcID }),
});

class NPCSearch extends React.Component {
  constructor(props) {
    super(props);

    this.searchNPCs = throttle((values) => {
      if (!isEmpty(values)) {
        api.npc.searchNPCs(values)
          .then(data => {
            this.props.setNPCList(data);
          })
          .catch(error => null)
      } else {
        this.props.setNPCList([]);
      }
    }, 600, { leading: false })
  }

  render() {

    const columns = [{
      Header: "ID",
      accessor: "id",
      width: 80
    }, {
      Header: "Name",
      accessor: "name",
      width: 180
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
    }];

    return (
      <div id="NPCSearch">
        <Row>
          <Col md={5}>
            <Panel>
              <Panel.Heading>
                <Row>
                  <Col md={24}>
                    <NPCSearchForm
                      searchNPCs={this.searchNPCs}
                    />
                  </Col>
                </Row>
              </Panel.Heading>
              <Panel.Body>
                <Row>
                  <Col md={24} style={{ padding: 0 }}>
                    <ReactTable
                      data={this.props.npcList}
                      columns={columns}
                      defaultSorted={[
                        {
                          id: "id",
                          desc: true
                        }
                      ]}
                      filterable={false}
                      className="-striped -highlight"
                      style={{ height: 860, overflowY: "auto", fontSize: 12 }}
                      showPagination={true}
                      pageSize={50}
                      getTdProps={(state, row, column, instance) => {
                        return { onClick: e => {this.props.setNPCID(row.original.id)} }
                      }}
                    />
                  </Col>
                </Row>
              </Panel.Body>
            </Panel>
          </Col>
          <Col md={19}>
            <Row>
              <Col md={24}>
              {
                  !this.props.npcID
                    ? null
                    : <NPCEditor npcID={this.props.npcID} />
              }
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NPCSearch);