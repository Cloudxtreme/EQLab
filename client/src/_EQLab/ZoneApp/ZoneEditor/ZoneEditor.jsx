import React from 'react';
import { Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
// import * as d3 from "d3";
import { uniqBy, minBy } from 'lodash';
import math from 'mathjs';
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
    this.state = {
      SVGwidth: 8000,
      SVGheight: 8000,
      SVGBackground: 'white',
      background: 'black',
      polygon: null
    }

    this.handleClick = (event) => {
      let x = event.x - (this.state.SVGwidth /2);
      let y = event.y - (this.state.SVGheight /2);

      let point = {x, y, z: undefined}
      
      let ans = this.findNearestPoints({x, y}, this.props.zoneMapData.baseData[0].linePoints, 3);
      
      let polygon = {
        0: { x: ans[0].point.x, y: ans[0].point.y},
        1: { x: ans[1].point.x, y: ans[1].point.y},
        2: { x: ans[2].point.x, y: ans[2].point.y}
      }

      const Ax = ans[0].point.x, Ay = ans[0].point.y, Az = ans[0].point.z;
      const Bx = ans[1].point.x, By = ans[1].point.y, Bz = ans[1].point.z;
      const Cx = ans[2].point.x, Cy = ans[2].point.y, Cz = ans[2].point.z;

      const e1 = (x-Ax)*((By-Ay)*(Cz-Az)-(Bz-Az)*(Cy-Ay)) - (y-Ay)*((Bx-Ax)*(Cz-Az)-(Bz-Az)*(Cx-Ax));
      const e2 = ((Bx-Ax)*(Cy-Ay)-(By-Ay)*(Cx-Ax));
      const e3 = `z = (${e1}/${e2} * -1) + ${Az}`;

      point.z = math.eval(e3);

      console.log(point)
      this.setState({ polygon })
    }

    this.findNearestPoints = (point, linePoints, k) => {
      let ans = [];
      let distances = [];
      for (let i = 0, len = linePoints.length; i < len; i++) {
        let distance = Math.hypot(linePoints[i].x - point.x, linePoints[i].y - point.y);
        distances.push({ point: linePoints[i], distance }); 
      }
      distances = uniqBy(distances, 'distance');
      
      for (let i = 0; i < k; i++) {
        let min = minBy(distances, 'distance');
        ans.push(min);
        distances = distances.filter(o => o.point.id !== min.point.id)
      }

      return ans;
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
        <Row>
          <Col md={24}>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#home">React-Bootstrap</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <NavItem eventKey={1} href="#">
                  Link
                </NavItem>
                <NavItem eventKey={2} href="#">
                  Link
                </NavItem>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.4}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <ReactSVGPanZoom 
              width={1900} 
              height={900}
              SVGBackground={this.state.SVGBackground}
              background={this.state.background}
              miniaturePosition='right'
              onClick={this.handleClick}
            >
              <svg width={this.state.SVGwidth} height={this.state.SVGheight}>
                <g id="zonemap" transform={`translate(${this.state.SVGwidth/2},${this.state.SVGheight/2})`}>
                {
                  !this.state.polygon
                    ? null
                    : <polygon 
                        points={`
                          ${this.state.polygon[0].x},${this.state.polygon[0].y},
                          ${this.state.polygon[1].x},${this.state.polygon[1].y},
                          ${this.state.polygon[2].x},${this.state.polygon[2].y}
                        `} 
                        style={{ fill: 'lime', stroke: 'purple', strokeWidth: 1 }}
                      />
                }
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
                      } */}
                      {/* {
                        !base[2]
                          ? null
                          : <MapLayer layer={2} lines={base[2].lines} points={base[2].points}/>
                      } */}
                      {/* {
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
                          : null
                          // <MapSpawns spawns={entity.spawns}/>
                      }
                      </g>
                }
                </g>  
              </svg>
            </ReactSVGPanZoom>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoneEditor);