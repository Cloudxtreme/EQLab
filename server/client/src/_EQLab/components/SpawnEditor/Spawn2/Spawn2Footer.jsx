import React from 'react'
import { Row, Col, Button, FormGroup } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import api from '../../../../api.js'
import { debounce } from 'lodash'
import Select from 'react-select'


class Spawn2Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spawngroupID: this.props.input.value
    }

    this.searchSpawngroups = debounce((input, callback) => {
      let options;
      if (this.state.spawngroupID === 0 && input === '') {
        options = [];
        callback(null, { options })
      } else if (this.state.spawngroupID !== 0 && input === '') {
        options = [{ id: this.props.input.value, label: `${this.props.spawngroupName} (${this.props.input.value})` }];
        callback(null, { options })
      }
      else if (input.length > 2 || input === '') {
        api.zone.searchSpawngroups(input ? input : this.state.spawngroupID)
          .then(results => {
            options = results.map(spawngroup => {
              return {
                id: spawngroup.id,
                label: `${spawngroup.name} (${spawngroup.id})`
              }
            });
            callback(null, { options })
          })
          .catch(error => callback(error, null));
      } else {
        options = [];
        callback(null, { options })
      }
    }, 400);

    this.selectSpawngroup = spawngroup => {
      if (spawngroup) {
        this.props.changeSpawngroup(spawngroup.id);
        this.setState({ spawngroupID: spawngroup.id });
      } else {
        this.setState({ spawngroupID: this.props.input.value})
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value !== this.state.spawngroupID) {
      this.setState({ spawngroupID: nextProps.input.value })
    }
  }

  componentDidUpdate() {
    this.refs.selectspawngroup.loadOptions("")
  }

  render() {
    return (
      <Row id="Spawn2Footer">
        <Col md={10}>
          <FormGroup> 
            <Select.Async
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
              cache={false}
              autoload={true}
              value={this.state.spawngroupID}
              resetValue={this.state.spawngroupID}
              loadOptions={this.searchSpawngroups}
              onChange={this.selectSpawngroup}
              className="input-sm"
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
                  <FontAwesome name="chain-broken"/>&nbsp;Clear
                </Button>
          }
        </Col>

        
      </Row>
    );
  }
}

export default Spawn2Footer;