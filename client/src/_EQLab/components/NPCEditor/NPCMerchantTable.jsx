import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import Input from '../form/Input.jsx';
import Select from '../form/Select.jsx';
// import FontAwesome from 'react-fontawesome';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class NPCMerchantTable extends React.PureComponent {
  render() {
    const merchant = this.props.merchant;

    const columns = [{
      Header: "Slot",
      accessor: "slot",
      width: 30
    }, {
      Header: "Item",
      accessor: "name",
      width: 120,
      style: { textAlign: "center" }
    }, {
      Header: "Probability",
      accessor: "probability",
      width: 60,
      style: { textAlign: "center" }
    }, {
      Header: "Faction Req.",
      accessor: "faction_required",
      width: 60,
      style: { textAlign: "center" }
    }, {
      Header: "Level Req.",
      accessor: "level_required",
      width: 50,
      style: { textAlign: "center" }
    }, {
      Header: "Class Req.",
      accessor: "classes_required",
      width: 50,
      style: { textAlign: "center" }
    }, {
      Header: "Alt Currency",
      accessor: "alt_currency_cost",
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
          id: "slot",
          desc: false
        }
      ]
    }

    return (
      <div id="NPCMerchantTable">
        <Row>
          <Col md={24} style={{ maxHeight: 797, overflowY: "scroll" }}>
            <Panel>
              <Panel.Heading>
                <Row>
                  <Col md={12}>
                    <Input
                      type="text"
                      label="merchant_id"
                      input={this.props.merchant_id.input}
                      meta={this.props.alt_currency_id.meta}
                      bsSize="sm"
                    />
                  </Col>
                  <Col md={12}>
                    <Select
                      type="text"
                      label="alt_currency_id"
                      options={this.props.altCurrency}
                      usePlaceholder={true}
                      input={this.props.alt_currency_id.input}
                      meta={this.props.alt_currency_id.meta}
                      bsSize="sm"
                    />
                  </Col>
                </Row>
              </Panel.Heading>
              {
                !merchant
                  ? null
                  : <Panel.Body>
                      <ReactTable
                        data={merchant.items}
                        pageSize={merchant.items.length}
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

export default NPCMerchantTable;