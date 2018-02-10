import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as d3 from "d3";
import { AutoSizer } from 'react-virtualized';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
// import SVG from 'react-inlinesvg';
// import InlineSVG from 'svg-inline-react';
// import FontAwesome from 'react-fontawesome';
import {
  ZONEAPP_EDITOR_LOAD,
  ZONEAPP_EDITOR_UNLOAD
} from '../../constants/actionTypes';


const mapStateToProps = state => ({
  zoneMap: state.ZoneApp.zoneMap
});

const mapDispatchToProps = dispatch => ({
  load: (zoneName) =>
    dispatch({ type: ZONEAPP_EDITOR_LOAD, zoneName }),
  unload: () =>
    dispatch({ type: ZONEAPP_EDITOR_UNLOAD })
});


class ZoneEditor extends React.Component {

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

    const svg = <svg id="zonemapsvg" width={1900} height={1200}><circle cx="0" cy="0" r="5"/></svg>;

    return (
      <div id="ZoneEditor">

      {/* 

      Fallback option (CHOSEN):
      Only use server to read data from map files then send data as json and fully render on client
      
       */}

            <ReactSVGPanZoom width={1900} height={1200}>
              
              {/* <svg height={1200} style={{"borderStyle":"solid","borderWidth":"5px"}} width={1900} preserveAspectRatio="xMidYMid meet" viewBox="-875,-600,1900,1200">
              <defs/>
              <circle r="10"/>
              </svg> */}
              {svg}
            </ReactSVGPanZoom>
  
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoneEditor);