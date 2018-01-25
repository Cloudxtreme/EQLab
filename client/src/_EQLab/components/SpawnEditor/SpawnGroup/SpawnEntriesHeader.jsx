import React from 'react';
import { Col, Button, FormGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Select from 'react-select';


const mapStateToProps = state => ({
  options: state.SpawnEditor.npcOptions
});

class SpawnEntriesHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      npcID: ''
    }

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
        <Col md={20} style={{ padding: 0 }}>
          <FormGroup> 
            <Select
              name="selectnpc"
              valueKey="id"
              placeholder="Search NPCs"
              searchPromptText="Minimum of 3 characters to search"
              clearable={true}
              onBlurResetsInput={false}
              onCloseResetsInput={false}
              onSelectResetsInput={false}
              backspaceRemoves={false}
              deleteRemoves={false}
              value={this.state.npcID}
              resetValue={this.state.npcID}
              options={this.props.options}
              onInputChange={this.props.searchNPCs}
              onChange={this.selectNPC}
              className="input-sm"
              style={{ borderRadius: 0 }}
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

export default connect(mapStateToProps)(SpawnEntriesHeader);