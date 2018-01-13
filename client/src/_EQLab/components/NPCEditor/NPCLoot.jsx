import React from 'react';
import { Row, Col, PanelGroup, Panel, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import FontAwesome from 'react-fontawesome';
import api from '../../../../api.js';
import { debounce } from 'lodash';
import Select from 'react-select';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import NPCSpellsTableHeader from './NPCSpellsTableHeader.jsx';

class NPCLoot extends React.PureComponent {
  constructor(props) {
    super(props);

    this.searchLootTables = debounce((input, callback) => {
      let options;
      if (this.props.input.value === 0 && input === '') {
        options = [];
        callback(null, { options })
      } else if (this.props.loot && this.props.input.value !== 0 && input === '') {
        options = [{ id: this.props.input.value, label: `${this.props.loot.name} (${this.props.input.value})` }];
        callback(null, { options })
      } else if (input.length > 2 || input === '') {
        api.npc.searchSpellSets(input ? input : this.props.input.value)
          .then(results => {
            options = results.map(loottable => {
              return {
                id: loottable.id,
                label: `${loottable.name} (${loottable.id})`
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

    this.selectLootTable = loottable => {
      if (loottable) {
        this.props.changeLootTable(loottable.id);
      }
    }

    this.clearLootTable = () => {
      this.props.changeLootTable(0);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.refs.selectspellset.loadOptions("")
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  render() {
    return (
      <div id="NPCLoot">
        
      </div>
    )
  }
}

export default NPCLoot;