import React from 'react'
import { Row, Col, FormGroup, FormControl } from 'react-bootstrap'
import Input from '../form/Input.jsx'
import AbilityCheckbox from './form/AbilityCheckbox.jsx'
import ParamInput from './form/ParamInput.jsx'


class NPCSpecialAbilities extends React.Component {
  constructor(props) {
    super(props);

    this.getAbilities = () => {
      const abilities = 
        this.props.input.value
          .match(/[^^]+(?=^)?/g)
          .filter((elem, index, self) => index === self.indexOf(elem))
          .map(match => match.split(','));

      return abilities;
    }

    this.decomposeAbilities = () => {
      const abilities = 
        !this.props.input.value 
          ? ''
          : this.getAbilities().reduce((abilities, ability) => {
              return {
                ...abilities,
                [ability[0]]: {
                  level: ability[1] ? ability[1] : '0',
                  params: ability.length > 2 ? ability.slice(2) : []
                }
              }
            }, {});

      return abilities;
    }

    this.recomposeAbilities = abilities => {
      const newAbilities = 
        abilities
          .sort((a,b) => a[0] - b[0])
          .map(ability => ability.join(','))
          .join('^');
          
      this.props.input.onChange(newAbilities);
    }

    this.handleSummonLevel = e => {
      let newAbilities;
      const newValue = e.target.value;
      const abilities = this.getAbilities();
      const summonAbility = abilities.find(ability => ability[0] === '1') || null;
      const summonLevel = summonAbility ? summonAbility[1] : '0';

      if (!summonAbility) {
        newAbilities = [...abilities, ['1', newValue]];
      } else if (summonAbility && newValue === '0') {
        newAbilities = abilities.filter(ability => ability[0] !== '1');
      } else if (summonAbility && newValue !== summonLevel) {
        newAbilities = abilities.map(ability => {
          if (ability[0] === '1') {
            ability[1] = newValue;
            return ability;
          }
          return ability;
        })
      } else {
        return;
      }

      this.recomposeAbilities(newAbilities);
    }
 
    this.handleCheckbox = (abilityID, newValue) => {
      let newAbilities;
      const abilities = this.getAbilities(); 

      if (newValue === '1') {
        newAbilities = [...abilities, [abilityID, newValue]];
      } else if (newValue === '0') {
        newAbilities = abilities.filter(ability => ability[0] !== abilityID);
      } else {
        return;
      }

      this.recomposeAbilities(newAbilities);
    }

    this.handleParam = (abilityID, paramIndex, newValue) => {
      if (newValue === '') {
        newValue = '0';
      }
      let newAbilities;
      let newAbility;
      let newParams = [];
      const abilities = this.getAbilities();
      const ability = abilities.find(ability => ability[0] === abilityID) || null;
      const meta = ability ? ability.slice(0, 2) : null;
      const params = ability ? ability.slice(2) : [];
      const value = params ? params[paramIndex] : null;

      // Param doesn't exist, create new Param
      if (!value && newValue !== '0') {
        // Get length difference between new params and current params
        const delta = paramIndex - params.length;
        // If delta is positive, fill the inbetween spots with zeroes
        if (delta > 0) {
          newParams = params;
          for (let i = 0; i < delta; i++) {
            newParams.push('0');
          }
          // Add the new param at the end
          newParams.push(newValue);
        // If delta is 0 or negative, change the param at index
        } else {
          newParams = params;
          newParams[paramIndex] = newValue;
        }
      // Param is being deleted
      } else if (value && newValue === '0') {
        // Get length difference between new params and current params
        const delta = (paramIndex + 1) - params.length;
        // If delta is 0, param to be deleted is at the end, remove param
        if (delta === 0) {
          newParams = params.slice(0, paramIndex);
          // Remove all trailing zero-value params
          for (let i = newParams.length - 1; i >= 0; --i) {
            if (newParams[i] === '0') {
              newParams.pop();
            } else {
              break;
            }
          }
        // If delta is negative, change param
        } else {
          newParams = params;
          newParams[paramIndex] = newValue;
        }
      // Param is being changed
      } else if (value && newValue !== value) {
        newParams = params;
        newParams[paramIndex] = newValue;
      } else {
        return;
      }

      newAbility = meta.concat(newParams);

      newAbilities = abilities.map(ability => {
        if (ability[0] === abilityID) {
          return newAbility;
        }
        return ability;
      });

      this.recomposeAbilities(newAbilities);
    }
  }

  render() {

    const abilities = this.decomposeAbilities();

    return (
      <div id="NPCSpecialAbilities">
        <Row>
          <Col md={24}>
            <Input
              type="text"
              input={this.props.input} 
              meta={this.props.meta}
              bsSize="sm"
            />
          </Col>
        </Row>
        <Row>
          <Col md={24} className="scroll-col" style={{ height: 325 }}>
            <Row>
              <Col md={4}>
                <span>Summon/Warp</span>
              </Col>
              <Col md={8}>
                <FormGroup bsSize="sm">
                  <FormControl componentClass="select" onChange={this.handleSummonLevel} value={abilities[1] ? abilities[1].level : ''}>
                    <option value="0">Off</option>
                    <option value="1">Summon Target to NPC</option>
                    <option value="2">Warp NPC to Target</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col md={6}>
                <ParamInput type="number" onChange={this.handleParam} id="1" paramIndex="0" label="Cooldown (ms)"
                  disabled={abilities[1] && abilities[1].level ? false : true}
                  param={abilities[1] ? abilities[1].params[0] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={6}>
                <ParamInput type="number" onChange={this.handleParam} id="1" paramIndex="1" label="HP Ratio"
                  disabled={abilities[1] && abilities[1].level ? false : true}
                  param={abilities[1] ? abilities[1].params[1] : ''} 
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Enrage</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="2" ability={abilities[2]}/>
              </Col>
              <Col md={4}>
                <ParamInput type="number" onChange={this.handleParam} id="2" paramIndex="0" label="HP Ratio"
                  disabled={abilities[2] && abilities[2].level ? false : true}
                  param={abilities[2] ? abilities[2].params[0] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={8}>
                <ParamInput type="number" onChange={this.handleParam} id="2" paramIndex="1" label="Duration (ms)"
                  disabled={abilities[2] && abilities[2].level ? false : true}
                  param={abilities[2] ? abilities[2].params[1] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={8}>
                <ParamInput type="number" onChange={this.handleParam} id="2" paramIndex="2" label="Cooldown (ms)"
                  disabled={abilities[2] && abilities[2].level ? false : true}
                  param={abilities[2] ? abilities[2].params[2] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Rampage</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="3" ability={abilities[3]}/>
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="3" paramIndex="0" label="%Ch"
                  disabled={abilities[3] && abilities[3].level ? false : true}
                  param={abilities[3] ? abilities[3].params[0] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="3" paramIndex="1" label="#Tgts"
                  disabled={abilities[3] && abilities[3].level ? false : true}
                  param={abilities[3] ? abilities[3].params[1] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="3" paramIndex="2" label="x%Dmg"
                  disabled={abilities[3] && abilities[3].level ? false : true}
                  param={abilities[3] ? abilities[3].params[2] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="3" paramIndex="3" label="+Dmg"
                  disabled={abilities[3] && abilities[3].level ? false : true}
                  param={abilities[3] ? abilities[3].params[3] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="3" paramIndex="4" label="-%AC"
                  disabled={abilities[3] && abilities[3].level ? false : true}
                  param={abilities[3] ? abilities[3].params[4] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="3" paramIndex="5" label="-AC"
                  disabled={abilities[3] && abilities[3].level ? false : true}
                  param={abilities[3] ? abilities[3].params[5] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="3" paramIndex="6" label="x%Crit"
                  disabled={abilities[3] && abilities[3].level ? false : true}
                  param={abilities[3] ? abilities[3].params[6] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="3" paramIndex="7" label="+%Crit"
                  disabled={abilities[3] && abilities[3].level ? false : true}
                  param={abilities[3] ? abilities[3].params[7] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>AE Rampage</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="4" ability={abilities[4]}/>
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="4" paramIndex="0" label="%Ch"
                  disabled={abilities[4] && abilities[4].level ? false : true}
                  param={abilities[4] ? abilities[4].params[0] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="4" paramIndex="1" label="#Tgts"
                  disabled={abilities[4] && abilities[4].level ? false : true}
                  param={abilities[4] ? abilities[4].params[1] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="4" paramIndex="2" label="x%Dmg"
                  disabled={abilities[4] && abilities[4].level ? false : true}
                  param={abilities[4] ? abilities[4].params[2] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="4" paramIndex="3" label="+Dmg"
                  disabled={abilities[4] && abilities[4].level ? false : true}
                  param={abilities[4] ? abilities[4].params[3] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="4" paramIndex="4" label="-%AC"
                  disabled={abilities[4] && abilities[4].level ? false : true}
                  param={abilities[4] ? abilities[4].params[4] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="4" paramIndex="5" label="-AC"
                  disabled={abilities[4] && abilities[4].level ? false : true}
                  param={abilities[4] ? abilities[4].params[5] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="4" paramIndex="6" label="x%Crit"
                  disabled={abilities[4] && abilities[4].level ? false : true}
                  param={abilities[4] ? abilities[4].params[6] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="4" paramIndex="7" label="+%Crit"
                  disabled={abilities[4] && abilities[4].level ? false : true}
                  param={abilities[4] ? abilities[4].params[7] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Flurry</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="5" ability={abilities[5]}/>
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="5" paramIndex="0" label="%Ch"
                  disabled={abilities[5] && abilities[5].level ? false : true}
                  param={abilities[5] ? abilities[5].params[0] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="5" paramIndex="1" label="#Atks"
                  disabled={abilities[5] && abilities[5].level ? false : true}
                  param={abilities[5] ? abilities[5].params[1] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="5" paramIndex="2" label="x%Dmg"
                  disabled={abilities[5] && abilities[5].level ? false : true}
                  param={abilities[5] ? abilities[5].params[2] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="5" paramIndex="3" label="+Dmg"
                  disabled={abilities[5] && abilities[5].level ? false : true}
                  param={abilities[5] ? abilities[5].params[3] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="5" paramIndex="4" label="-%AC"
                  disabled={abilities[5] && abilities[5].level ? false : true}
                  param={abilities[5] ? abilities[5].params[4] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={2}>
                <ParamInput type="number" onChange={this.handleParam} id="5" paramIndex="5" label="-AC"
                  disabled={abilities[5] && abilities[5].level ? false : true}
                  param={abilities[5] ? abilities[5].params[5] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="5" paramIndex="6" label="x%Crit"
                  disabled={abilities[5] && abilities[5].level ? false : true}
                  param={abilities[5] ? abilities[5].params[6] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={3}>
                <ParamInput type="number" onChange={this.handleParam} id="5" paramIndex="7" label="+%Crit"
                  disabled={abilities[5] && abilities[5].level ? false : true}
                  param={abilities[5] ? abilities[5].params[7] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Ranged Attack</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="11" ability={abilities[11]}/>
              </Col>
              <Col md={5}>
                <ParamInput type="number" onChange={this.handleParam} id="11" paramIndex="0" label="Min Range"
                  disabled={abilities[11] && abilities[11].level ? false : true}
                  param={abilities[11] ? abilities[11].params[0] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={5}>
                <ParamInput type="number" onChange={this.handleParam} id="11" paramIndex="1" label="Max Range"
                  disabled={abilities[11] && abilities[11].level ? false : true}
                  param={abilities[11] ? abilities[11].params[1] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={5}>
                <ParamInput type="number" onChange={this.handleParam} id="11" paramIndex="2" label="x% Hit"
                  disabled={abilities[11] && abilities[11].level ? false : true}
                  param={abilities[11] ? abilities[11].params[2] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={5}>
                <ParamInput type="number" onChange={this.handleParam} id="11" paramIndex="3" label="x% Damage"
                  disabled={abilities[11] && abilities[11].level ? false : true}
                  param={abilities[11] ? abilities[11].params[3] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Tunnel Vision</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="29" ability={abilities[29]}/>
              </Col>
              <Col md={20}>
                <ParamInput type="number" onChange={this.handleParam} id="29" paramIndex="0" label="Non-Tank Aggro Modifier"
                  disabled={abilities[29] && abilities[29].level ? false : true}
                  param={abilities[29] ? abilities[29].params[0] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Leashed</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="32" ability={abilities[32]}/>
              </Col>
              <Col md={20}>
                <ParamInput type="number" onChange={this.handleParam} id="32" paramIndex="0" label="Range"
                  disabled={abilities[32] && abilities[32].level ? false : true}
                  param={abilities[32] ? abilities[32].params[0] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Tethered</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="33" ability={abilities[33]}/>
              </Col>
              <Col md={20}>
                <ParamInput type="number" onChange={this.handleParam} id="33" paramIndex="0" label="Range"
                  disabled={abilities[33] && abilities[33].level ? false : true}
                  param={abilities[33] ? abilities[33].params[0] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Flee Percent</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="37" ability={abilities[37]}/>
              </Col>
              <Col md={10}>
                <ParamInput type="number" onChange={this.handleParam} id="37" paramIndex="0" label="%HP to Flee"
                  disabled={abilities[37] && abilities[37].level ? false : true}
                  param={abilities[37] ? abilities[37].params[0] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={10}>
                <ParamInput type="number" onChange={this.handleParam} id="37" paramIndex="1" label="%Chance to Flee"
                  disabled={abilities[37] && abilities[37].level ? false : true}
                  param={abilities[37] ? abilities[37].params[1] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Chase Distance</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="40" ability={abilities[40]}/>
              </Col>
              <Col md={8}>
                <ParamInput type="number" onChange={this.handleParam} id="40" paramIndex="0" label="Max Distance"
                  disabled={abilities[40] && abilities[40].level ? false : true}
                  param={abilities[40] ? abilities[40].params[0] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={8}>
                <ParamInput type="number" onChange={this.handleParam} id="40" paramIndex="1" label="Min Distance"
                  disabled={abilities[40] && abilities[40].level ? false : true}
                  param={abilities[40] ? abilities[40].params[1] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={4}>
                <ParamInput type="number" onChange={this.handleParam} id="40" paramIndex="2" label="Ignore LOS"
                  disabled={abilities[40] && abilities[40].level ? false : true}
                  param={abilities[40] ? abilities[40].params[2] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Resist Diff</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="43" ability={abilities[43]}/>
              </Col>
              <Col md={20}>
                <ParamInput type="number" onChange={this.handleParam} id="43" paramIndex="0" label="Resist Diff"
                  disabled={abilities[43] && abilities[43].level ? false : true}
                  param={abilities[43] ? abilities[43].params[0] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <span>Flurry</span>
                <AbilityCheckbox className="pull-right" onChange={this.handleCheckbox} id="44" ability={abilities[44]}/>
              </Col>
              <Col md={4}>
                <ParamInput type="number" onChange={this.handleParam} id="44" paramIndex="0" label="-%All"
                  disabled={abilities[44] && abilities[44].level ? false : true}
                  param={abilities[44] ? abilities[44].params[0] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={4}>
                <ParamInput type="number" onChange={this.handleParam} id="44" paramIndex="1" label="-%Riposte"
                  disabled={abilities[44] && abilities[44].level ? false : true}
                  param={abilities[44] ? abilities[44].params[1] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={4}>
                <ParamInput type="number" onChange={this.handleParam} id="44" paramIndex="2" label="-%Parry"
                  disabled={abilities[44] && abilities[44].level ? false : true}
                  param={abilities[44] ? abilities[44].params[2] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={4}>
                <ParamInput type="number" onChange={this.handleParam} id="44" paramIndex="3" label="-%Block"
                  disabled={abilities[44] && abilities[44].level ? false : true}
                  param={abilities[44] ? abilities[44].params[3] : ''}
                  bsSize="sm" />
              </Col>
              <Col md={4}>
                <ParamInput type="number" onChange={this.handleParam} id="44" paramIndex="4" label="-%Dodge"
                  disabled={abilities[44] && abilities[44].level ? false : true}
                  param={abilities[44] ? abilities[44].params[4] : ''}
                  bsSize="sm" />
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="6" ability={abilities[6]} label="Triple Attack"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="7" ability={abilities[7]} label="Quad Attack"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="8" ability={abilities[8]} label="Dual Wield"/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="9" ability={abilities[9]} label="Bane Attack"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="10" ability={abilities[10]} label="Magic Attack"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="12" ability={abilities[12]} label="Unslowable"/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="13" ability={abilities[13]} label="Unmezable"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="14" ability={abilities[14]} label="Uncharmable"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="15" ability={abilities[15]} label="Unstunable"/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="16" ability={abilities[16]} label="Unsnareable"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="17" ability={abilities[17]} label="Unfearable"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="18" ability={abilities[18]} label="Immune to Dispell"/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="19" ability={abilities[19]} label="Immune to Melee"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="20" ability={abilities[20]} label="Immune to Magic"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="21" ability={abilities[21]} label="Immune to Fleeing"/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="22" ability={abilities[22]} label="Immune to Non-Bane Damage"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="23" ability={abilities[23]} label="Immune to Non-Magical Damage"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="24" ability={abilities[24]} label="Never Aggro"/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="25" ability={abilities[25]} label="Immune Target"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="26" ability={abilities[26]} label="Immune to Casting from Range"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="27" ability={abilities[27]} label="Immune to Feign Death"/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="28" ability={abilities[28]} label="Immune to Taunt"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="30" ability={abilities[30]} label="Doesn't Assist Allies"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="31" ability={abilities[31]} label="Immune to Pacify"/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="34" ability={abilities[34]} label="Destructible Object"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="35" ability={abilities[35]} label="Immune to Players"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="36" ability={abilities[36]} label="Always Flee"/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="38" ability={abilities[38]} label="Allow Beneficial"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="39" ability={abilities[39]} label="Disable Melee"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="41" ability={abilities[41]} label="Allow To Tank"/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="42" ability={abilities[42]} label="Ignore Root Aggro"/>
              </Col>
              <Col md={8}>
                <AbilityCheckbox onChange={this.handleCheckbox} id="45" ability={abilities[45]} label="Proximity Aggro"/>
              </Col>
              <Col md={8}>
                {/* Empty */}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NPCSpecialAbilities;