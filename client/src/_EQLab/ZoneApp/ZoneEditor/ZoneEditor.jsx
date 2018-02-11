import React from 'react';
// import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
// import * as d3 from "d3";
import { AutoSizer } from 'react-virtualized';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
// import FontAwesome from 'react-fontawesome';
import {
  ZONEAPP_EDITOR_LOAD,
  ZONEAPP_EDITOR_UNLOAD
} from '../../../constants/actionTypes';
import MapLayer from './MapLayer.jsx';
import MapSpawns from './MapSpawns.jsx';


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

    this.handleClick = (event) => {
      console.log(event.point);
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

    const base = this.props.zoneMapData.baseData ? this.props.zoneMapData.baseData : null;
    const entity = this.props.zoneMapData.entityData ? this.props.zoneMapData.entityData : null;

    return (
      <div id="ZoneEditor">
        {/* <AutoSizer>
          {(({width, height}) => width === 0 || height === 0 ? null : ( */}
            <ReactSVGPanZoom 
              width={1900} 
              height={950}
              SVGBackground='white'
              background='black'
              onClick={this.handleClick}
            >
              {/* <svg width={6000} height={6000} viewBox="-3000, -3000, 1000, 1000"> */}
              <svg width={6000} height={6000}>
                <g id="zonemap" transform="translate(3000,3000)">
                {
                  !base
                    ? null
                    : <g id="base">
                      {
                        !base[0]
                          ? null
                          : <MapLayer layer={0} lines={base[0].lines} points={base[0].points}/>
                      }
                      {/* {
                        !base[1]
                          ? null
                          : <MapLayer layer={1} lines={base[1].lines} points={base[1].points}/>
                      }
                      {
                        !base[2]
                          ? null
                          : <MapLayer layer={2} lines={base[2].lines} points={base[2].points}/>
                      }
                      {
                        !base[3]
                          ? null
                          : <MapLayer layer={3} lines={base[3].lines} points={base[3].points}/>
                      } */}
                      </g>
                }
                {
                  !entity
                    ? null
                    : <g id="entity">
                      {
                        !entity.spawns
                          ? null
                          : <MapSpawns spawns={entity.spawns}/>
                      }
                      </g>
                }
                </g>  
              </svg>
            </ReactSVGPanZoom>
          {/* ))}  
        </AutoSizer>  */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoneEditor);