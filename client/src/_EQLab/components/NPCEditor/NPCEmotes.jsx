import React from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { NPC_EMOTE_ENTRIES } from '../../../constants/constants.js';
import Input from '../form/Input.jsx';


class NPCEmotes extends React.PureComponent {
  render() {

    const emotes = this.props.emotes;

    const columns = [{
      Header: "Event",
      id: "event_",
      accessor: (data) => NPC_EMOTE_ENTRIES.event_[data.event_],
      width: 100
    }, {
      Header: "Type",
      id: "type",
      accessor: (data) => {
        if (data.type === 1 || data.type === 2 || data.type === 3) {
          return NPC_EMOTE_ENTRIES.type[data.type];
        } else {
          return NPC_EMOTE_ENTRIES.type["Other"];
        }
      },
      width: 80,
      style: { textAlign: "center" }
    }, {
      Header: "Text",
      accessor: "text",
      style: { textAlign: "left" }
    }];

    const tableProps = {
      style: { border: "none"},
      columns: columns,
      filterable: false,
      className: "-striped -highlight",
      showPagination: false
    }

    return (
      <div id="NPCEmotes">
        <Row>
          <Col md={24}>
            <Panel style={{ height: 393 }}>
              <Panel.Heading>
                <Row style={{ height: 50 }}>
                  <Col md={6}>
                    <Input
                      type="text"
                      label="emoteid"
                      input={this.props.input}
                      meta={this.props.meta}
                      bsSize="sm"
                    />
                  </Col>
                  <Col md={18}>
                  </Col>
                </Row>
              </Panel.Heading>
              {
                !emotes
                  ? null
                  : <Panel.Body>
                      <ReactTable
                        data={emotes.entries}
                        pageSize={emotes.entries.length}
                        {...tableProps}
                      />
                    </Panel.Body>
              }
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NPCEmotes;