import React from 'react';
import { Row, Col } from 'react-bootstrap';


class NPCSpellsTableHeader extends React.PureComponent {
  render() {
    const spells = this.props.spells;

    return (
      <div>
      {
        !this.props.isParentList
          ? null
          : <Row>
              <Col md={24}>
                <span>{`Parent List: ${spells.name} (${spells.id})`}</span>
              </Col>
            </Row>
      }
      {
        !(spells.attack_proc > 0) && 
        !(spells.ranged_proc > 0) && 
        !(spells.defensive_proc > 0)
          ? <Row>
              <Col md={24}>
                <span>No Procs</span>
              </Col>
            </Row>
          : <Row>
              <Col md={24}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ tableLayout: "fixed", width: 400 }}>
                    <thead>
                      <tr>
                        <th style={{ borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black" }}>Proc Type</th>
                        <th style={{ borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black" }}>Name</th>
                        <th style={{ textAlign: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "black" }}>Chance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !(spells.attack_proc > 0)
                          ? null
                          : <tr>
                              <td>Attack</td>
                              <td style={{ overflow: "hidden" }}>{spells.proc_name}</td>
                              <td style={{ textAlign: "center", overflow: "hidden" }}>{spells.proc_chance}</td>
                            </tr>
                      }
                      {
                        !(spells.ranged_proc > 0)
                          ? null
                          : <tr>
                              <td>Ranged</td>
                              <td style={{ overflow: "hidden" }}>{spells.rproc_name}</td>
                              <td style={{ textAlign: "center", overflow: "hidden" }}>{spells.rproc_chance}</td>
                            </tr>
                      }
                      {
                        !(spells.defensive_proc > 0)
                          ? null
                          : <tr>
                              <td>Defensive</td>
                              <td style={{ overflow: "hidden" }}>{spells.dproc_name}</td>
                              <td style={{ textAlign: "center", overflow: "hidden" }}>{spells.dproc_chance}</td>
                            </tr>                                 
                      }
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
      }
      </div>
    )
  }
}

export default NPCSpellsTableHeader;