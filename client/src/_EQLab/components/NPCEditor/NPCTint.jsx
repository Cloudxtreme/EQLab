import React from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import { CirclePicker } from 'react-color';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Select from 'react-select';


const mapStateToProps = state => ({
  options: state.NPCEditor.tintOptions
});

class NPCTint extends React.PureComponent {
  render() {

    const tint = this.props.tint;

    const data = !tint ? [] : [
      {
        slot: "Helmet",
        r: tint.red1h,
        g: tint.grn1h,
        b: tint.blu1h
      },
      {
        slot: "Chest",
        r: tint.red2c,
        g: tint.grn2c,
        b: tint.blu2c
      },
      {
        slot: "Arms",
        r: tint.red3a,
        g: tint.grn3a,
        b: tint.blu3a
      },
      {
        slot: "Bracers",
        r: tint.red4b,
        g: tint.grn4b,
        b: tint.blu4b
      },
      {
        slot: "Hands",
        r: tint.red5g,
        g: tint.grn5g,
        b: tint.blu5g
      },
      {
        slot: "Legs",
        r: tint.red6l,
        g: tint.grn6l,
        b: tint.blu6l
      },
      {
        slot: "Feet",
        r: tint.red7f,
        g: tint.grn7f,
        b: tint.blu7f
      },
      {
        slot: "Unknown1",
        r: tint.red8x,
        g: tint.grn8x,
        b: tint.blu8x
      },
      {
        slot: "Unknown2",
        r: tint.red9x,
        g: tint.grn9x,
        b: tint.blu9x
      }
    ]

    const columns = [{
      Header: "Slot",
      accessor: "slot",
      width: 100
    }, {
      Header: "Red",
      accessor: "r",
      width: 80,
      style: { textAlign: "center" }
    }, {
      Header: "Green",
      accessor: "g",
      width: 80,
      style: { textAlign: "center" }
    }, {
      Header: "Blue",
      accessor: "b",
      width: 80,
      style: { textAlign: "center" }
    }, {
      Header: "Color",
      id: "color",
      accessor: row => {return { r: row.r, g: row.g, b: row.b }},
      style: { textAlign: "center"},
      Cell: row => <FontAwesome name="square" style={{ color: `rgb(${row.value.r},${row.value.g},${row.value.b})` }}/>
    }];

    const tableProps = {
      style: { border: "none"},
      columns: columns,
      filterable: false,
      className: "-striped -highlight",
      showPagination: false
    }

    return (
      <div id="NPCTint">
        <Row>
          <Col md={24}>
            <Panel style={{ height: 393 }}>
              <Panel.Heading>
                <Row style={{ height: 50 }}>
                  <Col md={16}>
                    <Select
                      name="selecttint"
                      ref="selecttint"
                      valueKey="id"
                      placeholder="Search Tint Sets"
                      searchPromptText="Minimum of 3 characters to search"
                      clearable={false}
                      onBlurResetsInput={false}
                      onCloseResetsInput={false}
                      backspaceRemoves={false}
                      deleteRemoves={false}
                      value={this.props.input.value}
                      resetValue={this.props.input.value}
                      options={this.props.options}
                      onInputChange={this.props.searchTints}
                      onChange={this.props.changeTint}
                      className="input-sm"
                      style={{ borderRadius: 0}}
                    />
                  </Col>
                  <Col md={4}>
                  { 
                    !tint
                      ? null
                      : <Button bsStyle="danger" bsSize="xs" style={{ marginTop: 20 }} onClick={() => this.props.changeTint({id: 0})}>
                          <FontAwesome name="chain-broken"/>&nbsp;Unlink
                        </Button>
                  }
                  </Col>
                  <Col md={4}>
                  </Col>
                </Row>
              </Panel.Heading>
              <Panel.Body style={{ padding: 0 }}>
              {
                !tint
                  ? null
                  : <ReactTable
                      data={data}
                      pageSize={data.length}
                      {...tableProps}
                    />
              }
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NPCTint);