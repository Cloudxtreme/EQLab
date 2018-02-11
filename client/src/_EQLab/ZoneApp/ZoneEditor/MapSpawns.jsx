import React from 'react';


class MapSpawns extends React.Component {
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
                <text 
                  x={spawn.x+5} y={spawn.y}
                >
                  {spawn.spawngroup.name}
                </text>
              </g>    
            )
          })
      }
      </g>
    )
  }
}

export default MapSpawns;