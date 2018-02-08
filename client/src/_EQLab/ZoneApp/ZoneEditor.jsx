import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AutoSizer } from 'react-virtualized';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
// import SVG from 'react-inlinesvg';
import InlineSVG from 'svg-inline-react';
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
    return (
      <div id="ZoneEditor">

      {/* 
      Idea:
      Create initial SVG here on client.
      Only render lines & points on server, then append them to this client svg

      Fallback option:
      Only use server to read data from map files then send data as json and fully render on client
      
       */}

            <ReactSVGPanZoom width={1900} height={1200}>
              <InlineSVG src={this.props.zoneMap} raw={true} />
              {/* <svg height={1200} style={{"borderStyle":"solid","borderWidth":"5px"}} width={1900} preserveAspectRatio="xMidYMid meet" viewBox="-875,-600,1900,1200">
              <defs/>
              <circle r="10"/>
              </svg> */}
            </ReactSVGPanZoom>
  
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoneEditor);