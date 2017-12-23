import React from 'react'
import { Row, Col, Button, Well, Table } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { Field, Fields } from 'redux-form'
import SpawnEntriesHeader from './SpawnEntriesHeader.jsx'

class SpawnEntries extends React.Component {
  constructor(props) {
    super(props)

    this.balanceChances = () => {
      const length = this.props.fields.length;
      
      if (length) {
        const change = (entry, value) => this.props.change(`${entry}.chance`, value);
        const val = Math.floor(100 / length);
        const spread = 100 - (val * length);
  
        this.props.fields.forEach((entry, index) => {
          if (index < length - spread) {
            change(entry, val);
          } else {
            change(entry, val + 1);
          }
        });
      }
    }

    this.handleDelete = e => {
      this.props.deleteSpawnentry(parseInt(e.currentTarget.id, 10));
    }
  }

  render() {
    const entryLevels = (props) => {
      const entry = props.spawnentries[props.index];
      return (
        <span>
          {`${entry.level.input.value}`}
          {
            entry.maxlevel.input.value && entry.maxlevel.input.value !== '0'
              ? ` - ${entry.maxlevel.input.value}`
              : null
          }
        </span>
      );
    }

    const entryLabel = (props) => {
      const entry = props.spawnentries[props.index];
      return (
        <div>
          <span>{`${entry.name.input.value} (${entry.npcID.input.value})`}</span>
          <span className="pull-right">
            <Button 
              bsStyle="danger" 
              bsSize="xs"
              disabled={this.props.formSubmitting}
              id={`${entry.npcID.input.value}`}
              onClick={this.handleDelete}
            >
              <FontAwesome name="chain-broken"/>
            </Button>
          </span> 
        </div>
      );
    }

    return (
      <div id="SpawnEntries">
        <Row>
          <SpawnEntriesHeader
            formSubmitting={this.props.formSubmitting}
            newSpawnentry={this.props.newSpawnentry}
          />
        </Row>
        <Row>
          <Col md={24}>
            <Well style={{ height: 400, overflowY: "scroll"}}>
              <Table condensed={true} striped={true} responsive={false}>
                <thead>
                  <tr>
                    <th>
                      <Button 
                        bsStyle="warning" 
                        bsSize="xs"
                        disabled={!this.props.fields.length || this.props.formSubmitting}
                        className="center-block"
                        onClick={() => this.balanceChances()}
                      >
                        <FontAwesome name="balance-scale"/> Chance
                      </Button>
                    </th>
                    <th>Level</th>
                    <th>NPC</th>
                  </tr>
                </thead> 
                <tbody>
                  {this.props.fields.map((entry, index) =>
                    <tr key={`${index}`}>
                      <td>
                        <Field 
                          name={`${entry}.chance`} 
                          component="input"
                          type="text" 
                          className="center-block"
                          style={{textAlign: "center", width: 50}} />
                      </td>
                      <td>
                        <Fields
                          names={[`${entry}.level`, `${entry}.maxlevel`]}
                          component={entryLevels}
                          index={index} />
                      </td>
                      <td>
                        <Fields
                          names={[`${entry}.name`, `${entry}.npcID`]}
                          component={entryLabel}
                          index={index} />
                      </td>
                    </tr>    
                  )}
                </tbody>
              </Table>
            </Well>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SpawnEntries;