import React from 'react';
import { 
  Row, 
  Col, 
  Navbar, 
  Nav, 
  NavItem, 
  NavDropdown, 
  MenuItem, 
  FormGroup, 
  FormControl, 
  ButtonToolbar, 
  DropdownButton,
  Checkbox
} from 'react-bootstrap';
import { connect } from 'react-redux';
// import * as d3 from "d3";
import { minBy } from 'lodash';
import math from 'mathjs';
import { k_combinations } from '../../../lib/combinations.js';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
// import FontAwesome from 'react-fontawesome';
import {
  ZONEAPP_EDITOR_LOAD,
  ZONEAPP_EDITOR_UNLOAD
} from '../../../constants/actionTypes';
import MapLayer from './MapLayer.jsx';
import { 
  MapDoors,
  MapGroundSpawns,
  MapObjects,
  MapSpawns,
  MapTraps
} from './MapEntities.jsx';


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
      entityMode: 'select',
      showLayer0: true,
      showLayer1: true,
      showLayer2: true,
      showLayer3: true,
      showDoors: true,
      showGrid: true,
      showGroundSpawns: true,
      showObjects: true,
      showSpawns: true,
      showTraps: true,
      polygon: null,
      SVGwidth: 8000,
      SVGheight: 8000,
      SVGBackground: 'white',
      background: 'black'
    }

    this.handleClick = (event) => {
      let x = event.x - (this.state.SVGwidth /2);
      let y = event.y - (this.state.SVGheight /2);

      let point = {x, y, z: undefined}
      
      let bestTriangle = this.findBestTriangle({x, y}, this.props.zoneMapData.baseData[0].linePoints, 3);

      if (bestTriangle) {
        point.z = this.calculateZPosition(x, y, bestTriangle);

        let polygon = {
          0: { x: bestTriangle[0].point.x, y: bestTriangle[0].point.y},
          1: { x: bestTriangle[1].point.x, y: bestTriangle[1].point.y},
          2: { x: bestTriangle[2].point.x, y: bestTriangle[2].point.y}
        }
  
        console.log(point);
        this.setState({ polygon });
      }
      
    }

    this.findBestTriangle = (point, linePoints, k) => {
      let allDistances = [];
      let closestDistances = [];
      let allTrianglesArray = [];
      let validTriangles = [];
      let currentBestAnswer;
      
      // Find all distances from click point
      for (let i = 0, len = linePoints.length; i < len; i++) {
        let distance = Math.hypot(linePoints[i].x - point.x, linePoints[i].y - point.y);
        allDistances.push({ point: linePoints[i], distance }); 
      }

      // Choose the 100 closest points from allDistances to calculate triangles
      for (let i = 0; i < 100; i++) {
        let closestPoint = minBy(allDistances, 'distance');
        closestDistances.push(closestPoint);
        allDistances = allDistances.filter(o => o.point.id !== closestPoint.point.id);
      }

      // Create array of all possible triangles made by the 100 closest points
      allTrianglesArray = k_combinations(closestDistances, k);

      // Check all triangles to see if the click point is contained by that triangle. If it isn't contained, discard the triangle.
      validTriangles = allTrianglesArray.filter(triangle => this.isPointInTriangle(point, triangle));

      // If there are no valid triangles
      if (!validTriangles.length) { return null; }

      // Find the containing triangle with the points closest to the click point, this is the best answer
      for (let i = 0, len = validTriangles.length; i < len; i++) {
        let currentTriangle = validTriangles[i];
        
        if (!currentBestAnswer) {
          currentBestAnswer = currentTriangle;
        } else {
          let currentTriangleDistance = currentTriangle[0].distance + currentTriangle[1].distance + currentTriangle[2].distance;
          let currentBestAnswerDistance = currentBestAnswer[0].distance + currentBestAnswer[1].distance + currentBestAnswer[2].distance;

          if (currentTriangleDistance < currentBestAnswerDistance) {
            currentBestAnswer = currentTriangle;
          }
        }
      }

      return currentBestAnswer;
    }

    this.isPointInTriangle = (point, triangle) => {
      //http://www.blackpawn.com/texts/pointinpoly/default.html

      let px = point.x;
      let py = point.y;

      let ax = triangle[0].point.x;
      let ay = triangle[0].point.y;
      let bx = triangle[1].point.x;
      let by = triangle[1].point.y;
      let cx = triangle[2].point.x;
      let cy = triangle[2].point.y;

      let v0 = [cx-ax,cy-ay];
      let v1 = [bx-ax,by-ay];
      let v2 = [px-ax,py-ay];
      
      let dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
      let dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
      let dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);
      let dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
      let dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);
      
      let invDenom = 1/ (dot00 * dot11 - dot01 * dot01);
      
      let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
      let v = (dot00 * dot12 - dot01 * dot02) * invDenom;
      
      return ((u >= 0) && (v >= 0) && (u + v < 1));
      }

    this.calculateZPosition = (x, y, triangle) => {
      const Ax = triangle[0].point.x, Ay = triangle[0].point.y, Az = triangle[0].point.z;
      const Bx = triangle[1].point.x, By = triangle[1].point.y, Bz = triangle[1].point.z;
      const Cx = triangle[2].point.x, Cy = triangle[2].point.y, Cz = triangle[2].point.z;

      const e1 = (x-Ax)*((By-Ay)*(Cz-Az)-(Bz-Az)*(Cy-Ay)) - (y-Ay)*((Bx-Ax)*(Cz-Az)-(Bz-Az)*(Cx-Ax));
      const e2 = ((Bx-Ax)*(Cy-Ay)-(By-Ay)*(Cx-Ax));
      const e3 = `z = (${e1}/${e2} * -1) + ${Az}`;

      let z = math.eval(e3);
      return z;
    }

    this.handleLayerCheckbox = (e) => {
      switch(e) {
        case '0':
          this.setState({ showLayer0: !this.state.showLayer0 });
          break;
        case '1':
          this.setState({ showLayer1: !this.state.showLayer1 });
          break;
        case '2':
          this.setState({ showLayer2: !this.state.showLayer2 });
          break;
        case '3':
          this.setState({ showLayer3: !this.state.showLayer3 });
          break;
        default:
          break;
      }
    }

    this.handleEntityCheckbox = (e) => {
      switch(e) {
        case 'doors':
          this.setState({ showDoors: !this.state.showDoors });
          break;
        case 'grid':
          this.setState({ showGrid: !this.state.showGrid });
          break;
        case 'groundSpawns':
          this.setState({ showGroundSpawns: !this.state.showGroundSpawns });
          break;
        case 'objects':
          this.setState({ showObjects: !this.state.showObjects });
          break;
        case 'spawns':
          this.setState({ showSpawns: !this.state.showSpawns });
          break;
        case 'traps':
          this.setState({ showTraps: !this.state.showTraps });
          break;
        default:
          break;
      }
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.zone && (nextProps.zone !== this.props.zone)) {
      this.setState({ polygon: null }, () => {
        this.props.load(nextProps.zone);
      });
    }
  }

  componentDidMount() {
    if (this.props.zone){
      this.props.load(this.props.zone);
      this.Viewer.fitSelection(2000, 3000, 2000, 2000);
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
              <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl componentClass="select" onSelect={this.handleEntitySelect} placeholder="select">
                    <option value="select">Entity Type</option>
                    <option value="door">Door</option>
                    {/* <option value="grid">Grid Entry</option> */}
                    <option value="groundSpawn">Ground Spawn</option>
                    <option value="object">Object</option>
                    <option value="spawn">Spawn</option>
                    <option value="trap">Trap</option>
                  </FormControl>
                </FormGroup>
              </Navbar.Form>
              <ButtonToolbar>
                <DropdownButton id="showLayers" title="Show/Hide Layers">
                  <MenuItem onSelect={this.handleLayerCheckbox} eventKey="0">
                    <FormGroup><Checkbox readOnly checked={this.state.showLayer0}>Base Layer</Checkbox></FormGroup>
                  </MenuItem>
                  <MenuItem onSelect={this.handleLayerCheckbox} eventKey="1">
                    <FormGroup><Checkbox readOnly checked={this.state.showLayer1}>Layer 1</Checkbox></FormGroup>
                  </MenuItem>
                  <MenuItem onSelect={this.handleLayerCheckbox} eventKey="2">
                    <FormGroup><Checkbox readOnly checked={this.state.showLayer2}>Layer 2</Checkbox></FormGroup>
                  </MenuItem>
                  <MenuItem onSelect={this.handleLayerCheckbox} eventKey="3">
                    <FormGroup><Checkbox readOnly checked={this.state.showLayer3}>Layer 3</Checkbox></FormGroup>
                  </MenuItem>
                </DropdownButton>
                <DropdownButton id="showEntities" title="Show/Hide Entities">
                  <MenuItem onSelect={this.handleEntityCheckbox} eventKey="doors">
                    <FormGroup><Checkbox readOnly checked={this.state.showDoors}>Doors</Checkbox></FormGroup>
                  </MenuItem>
                  <MenuItem onSelect={this.handleEntityCheckbox} eventKey="grid">
                    <FormGroup><Checkbox readOnly checked={this.state.showGrid}>Grid Entries</Checkbox></FormGroup>
                  </MenuItem>
                  <MenuItem onSelect={this.handleEntityCheckbox} eventKey="groundSpawns">
                    <FormGroup><Checkbox readOnly checked={this.state.showGroundSpawns}>Ground Spawns</Checkbox></FormGroup>
                  </MenuItem>
                  <MenuItem onSelect={this.handleEntityCheckbox} eventKey="objects">
                    <FormGroup><Checkbox readOnly checked={this.state.showObjects}>Objects</Checkbox></FormGroup>
                  </MenuItem>
                  <MenuItem onSelect={this.handleEntityCheckbox} eventKey="spawns">
                    <FormGroup><Checkbox readOnly checked={this.state.showSpawns}>Spawns</Checkbox></FormGroup>
                  </MenuItem>
                  <MenuItem onSelect={this.handleEntityCheckbox} eventKey="traps">
                    <FormGroup><Checkbox readOnly checked={this.state.showTraps}>Traps</Checkbox></FormGroup>
                  </MenuItem>
                </DropdownButton>
              </ButtonToolbar>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <ReactSVGPanZoom 
              ref={Viewer => this.Viewer = Viewer}
              width={1900} 
              height={900}
              SVGBackground={this.state.SVGBackground}
              background={this.state.background}
              miniaturePosition='right'
              detectAutoPan={false}
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
                      {/* {
                        !base[0] && !base[1] && !base[2] && !base[3]
                          ? <text x={4000} y={4000} fontSize={20}>No Map Found</text>
                          : null
                      } */}
                      {
                        !this.state.showLayer0 || !base[0]
                          ? null
                          : <MapLayer layer={0} lines={base[0].lines} points={base[0].points}/>
                      }
                      {
                        !this.state.showLayer1 || !base[1]
                          ? null
                          : <MapLayer layer={1} lines={base[1].lines} points={base[1].points}/>
                      }
                      {
                        !this.state.showLayer2 || !base[2]
                          ? null
                          : <MapLayer layer={2} lines={base[2].lines} points={base[2].points}/>
                      }
                      {
                        !this.state.showLayer3 || !base[3]
                          ? null
                          : <MapLayer layer={3} lines={base[3].lines} points={base[3].points}/>
                      }
                      </g>
                }
                {
                  !entity
                    ? null
                    : <g id="entity">
                      {
                        !this.state.showDoors || !entity.doors
                          ? null
                          : <MapDoors doors={entity.doors}/>
                      }
                      {/* {
                        !this.state.showGrid || !entity.grid
                          ? null
                          : <MapGrid grid={entity.grid}/>
                      } */}
                      {
                        !this.state.showGroundSpawns || !entity.ground_spawns
                          ? null
                          : <MapGroundSpawns groundSpawns={entity.ground_spawns}/>
                      }
                      {
                        !this.state.showObjects || !entity.objects
                          ? null
                          : <MapObjects objects={entity.objects}/>
                      }
                      {
                        !this.state.showSpawns || !entity.spawns
                          ? null
                          : <MapSpawns spawns={entity.spawns}/>
                      }
                      {
                        !this.state.showTraps || !entity.traps
                          ? null
                          : <MapTraps traps={entity.traps}/>
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