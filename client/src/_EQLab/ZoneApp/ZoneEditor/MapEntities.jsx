import React from 'react';


class MapDoors extends React.PureComponent {
  render() {
    const doors = this.props.doors;
    return (
      <g id="mapdoors">
      {
        !doors
          ? null
          : doors.map(door => {
            return (
              <g key={`door${door.id}`}>
                <circle
                  cx={door.pos_x} cy={door.pos_y} r={1}
                />
                <text 
                  x={door.pos_x+5} y={door.pos_y}
                >
                  {door.name}
                </text>
              </g>    
            )
          })
      }
      </g>
    )
  }
}

// class MapGrid extends React.PureComponent {
//   render() {
//     const doors = this.props.doors;
//     return (
//       <g id="mapdoors">
//       {
//         !doors
//           ? null
//           : doors.map(door => {
//             return (
//               <g key={`door${door.id}`}>
//                 <circle
//                   cx={door.pos_x} cy={door.pos_y} r={1}
//                 />
//                 <text 
//                   x={door.pos_x+5} y={door.pos_y}
//                 >
//                   {door.name}
//                 </text>
//               </g>    
//             )
//           })
//       }
//       </g>
//     )
//   }
// }

class MapGroundSpawns extends React.PureComponent {
  render() {
    const groundSpawns = this.props.groundSpawns;
    return (
      <g id="mapgroundSpawns">
      {
        !groundSpawns
          ? null
          : groundSpawns.map(groundSpawn => {
            return (
              <g key={`groundSpawn${groundSpawn.id}`}>
                <rect
                  x={groundSpawn.min_x} y={groundSpawn.min_y} 
                  width={groundSpawn.max_x - groundSpawn.min_x === 0 ? 1 : groundSpawn.max_x - groundSpawn.min_x} 
                  height={groundSpawn.max_y - groundSpawn.min_y === 0 ? 1 : groundSpawn.max_y - groundSpawn.min_y}
                  // style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"
                  style={{ fill: 'rgba(255, 0, 0, 0.1)'}}
                />
                <text 
                  x={groundSpawn.min_x+5} y={groundSpawn.min_y}
                >
                  {groundSpawn.comment}
                </text>
              </g>    
            )
          })
      }
      </g>
    )
  }
}

class MapObjects extends React.PureComponent {
  render() {
    const objects = this.props.objects;
    return (
      <g id="mapobjects">
      {
        !objects
          ? null
          : objects.map(object => {
            return (
              <g key={`object${object.id}`}>
                <circle
                  cx={object.xpos} cy={object.ypos} r={1}
                />
                <text 
                  x={object.xpos+5} y={object.ypos}
                >
                  {object.objectname}
                </text>
              </g>    
            )
          })
      }
      </g>
    )
  }
}

class MapSpawns extends React.PureComponent {
  render() {
    const spawns = this.props.spawns;
    return (
      <g id="mapspawns">
      {
        !spawns
          ? null
          : spawns.map(spawn => {
            return (
              <g key={`spawn2${spawn.id}`}>
                <circle
                  cx={spawn.x} cy={spawn.y} r={1}
                />
                {
                  !spawn.spawngroup
                    ? null
                    : <text x={spawn.x+1.5} y={spawn.y+1} fontSize={3} >
                        {spawn.spawngroup.name}
                      </text>
                }
              </g>    
            )
          })
      }
      </g>
    )
  }
}

class MapTraps extends React.PureComponent {
  render() {
    const traps = this.props.traps;
    return (
      <g id="maptraps">
      {
        !traps
          ? null
          : traps.map(trap => {
            return (
              <g key={`trap${trap.id}`}>
                <circle
                  cx={trap.x} cy={trap.y} r={1}
                />
                <text 
                  x={trap.x+5} y={trap.y}
                >
                  Trap: {trap.effect}
                </text>
              </g>    
            )
          })
      }
      </g>
    )
  }
}

export { 
  MapDoors, 
  MapGroundSpawns,
  MapObjects,
  MapSpawns,
  MapTraps
}