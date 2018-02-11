import React from 'react';


class MapLayer extends React.Component {
  render() {
    return (
      <g id={`layer${this.props.layer}`}>
        <g id={`layer${this.props.layer}lines`}>
        {
          !this.props.lines
            ? null
            : this.props.lines.map(line => {
              return (
                <line 
                  key={line.key} 
                  x1={line.p1.x} y1={line.p1.y}
                  x2={line.p2.x} y2={line.p2.y}
                  style={{ stroke: `rgb(${line.color.r},${line.color.g},${line.color.b})`, strokeWidth: 1 }} 
                />
              )
            })
        }
        </g>
        <g id={`layer${this.props.layer}points`}>
        {
          !this.props.points
            ? null
            : this.props.points.map(point => {
              return (
                <g key={point.key}>
                  <circle
                    cx={point.p.x} cy={point.p.y} r={1}
                    style={{ stroke: `rgb(${point.color.r},${point.color.g},${point.color.b})`, fill: `rgb(${point.color.r},${point.color.g},${point.color.b})` }}
                  />
                  <text 
                    x={point.p.x+5} y={point.p.y}
                    fill={`rgb(${point.color.r},${point.color.g},${point.color.b})`}
                  >
                    {point.label}
                  </text>
                </g>    
              )
            })
        }
        </g>
      </g>
    )
  }
}

export default MapLayer;