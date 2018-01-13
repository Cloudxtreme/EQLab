import React from 'react'
import { Col, Button, FormGroup } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import api from '../../../../api.js'
import { debounce } from 'lodash'
import Select from 'react-select'


class SpawnEntriesHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      npcID: ''
    }

    this.searchNPCs = debounce((input, callback) => {
      let options;
      if (input.length > 2) {
        api.npc.searchNPCs(input ? input : '')
          .then(results => {
            options = results.map(npc => {
              return {
                id: npc.id,
                label: `${npc.name} (${npc.id})`
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

    this.selectNPC = npc => {
      this.setState({ npcID: npc.id })
    }

    this.handleNewEntry = () => {
      if (this.state.npcID) {
        this.props.newSpawnentry(this.state.npcID)
      }   
    }
  }

  render() {
    return (
      <div id="SpawnEntriesHeader">
        <Col md={20}>
          <FormGroup> 
            <Select.Async
              name="selectnpc"
              ref="selectnpc"
              valueKey="id"
              placeholder="Search NPCs"
              searchPromptText="Minimum of 3 characters to search"
              clearable={true}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              onSelectResetsInput={false}
              backspaceRemoves={false}
              deleteRemoves={false}
              cache={false}
              autoload={false}
              value={this.state.npcID}
              resetValue={this.state.npcID}
              loadOptions={this.searchNPCs}
              onChange={this.selectNPC}
              className="input-sm"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <Button 
            bsStyle="primary" 
            bsSize="xs" 
            className="pull-right"
            style={{ marginTop: 20 }}
            disabled={!this.state.npcID || this.props.formSubmitting}
            onClick={this.handleNewEntry}
          >
            <FontAwesome name="plus" />&nbsp;New Entry
          </Button>
        </Col>
      </div>
    );
  }
}

export default SpawnEntriesHeader;

