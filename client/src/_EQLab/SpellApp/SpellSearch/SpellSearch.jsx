import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { throttle, isEmpty } from 'lodash';
import api from '../../../api.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import FontAwesome from 'react-fontawesome';
import { getFormValues } from 'redux-form';
import { SPELL_RESIST_TYPES } from '../../../constants/constants.js';
import {
  SPELLAPP_SEARCH_SET_SPELLLIST,
  SPELLAPP_SEARCH_SET_SPELLID
} from '../../../constants/actionTypes';
import SpellSearchForm from './SpellSearchForm.jsx';
import SpellEditor from '../../components/SpellEditor/SpellEditor.jsx';

const mapStateToProps = state => ({
  searchFormValues: getFormValues('SpellSearchForm')(state),
  spellList: state.SpellApp.spellList,
  spellID: state.SpellApp.searchSpellID
});

const mapDispatchToProps = dispatch => ({
  setSpellList: (payload) =>
    dispatch({ type: SPELLAPP_SEARCH_SET_SPELLLIST, payload }),
  setSpellID: (spellID) =>
    dispatch({ type: SPELLAPP_SEARCH_SET_SPELLID, spellID })
});

class SpellSearch extends React.Component {
  constructor(props) {
    super(props);

    this.searchSpells = throttle((values) => {
      if (!isEmpty(values)) {
        api.spell.searchSpells(values)
          .then(data => {
            this.props.setSpellList(data);
          })
          .catch(error => null)
      } else {
        this.props.setSpellList([]);
      }
    }, 600, { leading: false })
  }

  render() {
    const form = this.props.searchFormValues;

    const columns = [{
      Header: "ID",
      accessor: "id",
      width: 80
    }, {
      Header: form && form.class ? "Level" : "Resist",
      id: "variable",
      accessor: form && form.class ? `classes${form.class}` : row => SPELL_RESIST_TYPES[row.resisttype].label,
      width: 80
    }, {
      Header: "Name",
      accessor: "name"
    }];

    return (
      <div id="SpellSearch">
        <Row>
          <Col md={5}>
            <Panel>
              <Panel.Heading>
                <Row>
                  <Col md={24}>
                    <SpellSearchForm
                      searchSpells={this.searchSpells}
                    />
                  </Col>
                </Row>
              </Panel.Heading>
              <Panel.Body>
                <Row>
                  <Col md={24} style={{ padding: 0 }}>
                    <ReactTable
                      data={this.props.spellList}
                      columns={columns}
                      defaultSorted={[
                        {
                          id: form && form.class ? "variable" : "id",
                          desc: false
                        }
                      ]}
                      filterable={false}
                      className="-striped -highlight"
                      style={{ height: 794, overflowY: "auto", fontSize: 12 }}
                      showPagination={true}
                      pageSize={50}
                      getTdProps={(state, row, column, instance) => {
                        return { onClick: (e, handleOriginal) => {
                          if (row) {
                            this.props.setSpellID(row.original.id)
                          }
                        }}
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
                  !this.props.spellID
                    ? null
                    : <SpellEditor spellID={this.props.spellID} />
              }
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpellSearch);