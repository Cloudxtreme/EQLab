import React from 'react';
import { Row, Col, Button, FormGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Select from 'react-select';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  options: state.SpawnEditor.spawngroupOptions
});

class Spawn2Footer extends React.PureComponent {
  render() {
    return (
      <Row id="Spawn2Footer" style={{ height: 45 }}>
        <Col md={10}>
          <FormGroup> 
            <Select
              name="selectspawngroup"
              ref="selectspawngroup"
              valueKey="id"
              placeholder="Search Spawngroups"
              searchPromptText="Minimum of 3 characters to search"
              clearable={false}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              backspaceRemoves={false}
              deleteRemoves={false}
              value={this.props.input.value}
              resetValue={this.props.input.value}
              options={this.props.options}
              onInputChange={this.props.searchSpawngroups}
              onChange={this.props.changeSpawngroup}
              className="input-sm"
              style={{ borderRadius: 0}}
            />
          </FormGroup>
        </Col>
        <Col md={14}>
          { 
            !this.props.input.value
              ? <Button bsStyle="primary" bsSize="xs" style={{ marginTop: 20 }} onClick={this.props.newSpawngroup}>
                  <FontAwesome name="plus"/>&nbsp;New Spawngroup
                </Button>
              : <Button bsStyle="danger" bsSize="xs"   style={{ marginTop: 20 }} onClick={this.props.clearSpawngroup}>
                  <FontAwesome name="chain-broken"/>&nbsp;Unlink
                </Button>
          }
        </Col>

        
      </Row>
    );
  }
}

export default connect(mapStateToProps)(Spawn2Footer);