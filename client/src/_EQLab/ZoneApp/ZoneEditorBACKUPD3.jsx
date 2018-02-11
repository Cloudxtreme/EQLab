import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as d3 from "d3";
import { AutoSizer } from 'react-virtualized';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
// import FontAwesome from 'react-fontawesome';
import {
  ZONEAPP_EDITOR_LOAD,
  ZONEAPP_EDITOR_UNLOAD
} from '../../constants/actionTypes';


const mapStateToProps = state => ({
  zoneMapData: state.ZoneApp.zoneMapData
});

const mapDispatchToProps = dispatch => ({
  load: (zoneName) =>
    dispatch({ type: ZONEAPP_EDITOR_LOAD, zoneName }),
  unload: () =>
    dispatch({ type: ZONEAPP_EDITOR_UNLOAD })
});


class ZoneEditor extends React.Component {
  constructor(props) {
    super(props)
    
    this.renderZoneMap = () => {
      const zoneMap = this.zoneMap;

      d3.select(zoneMap)
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)

      return svg2;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.zone && (nextProps.zone !== this.props.zone)) {
      this.props.load(nextProps.zone);
    }
  }

  componentDidMount() {
    if (this.props.zone){
      this.props.load(this.props.zone)
    }
  }

  componentWillUnmount() {
    this.props.unload();
  }

  render() {

    const zoneMap = this.renderZoneMap();

    return (
      <div id="ZoneEditor">
        <svg ref={node => this.zoneMap = zoneMap} width={1900} height={1200}>
          <circle cx="0" cy="0" r="5"/>
        </svg>
        {/* <ReactSVGPanZoom width={1900} height={1200}>
          {zoneMap}
        </ReactSVGPanZoom> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoneEditor);