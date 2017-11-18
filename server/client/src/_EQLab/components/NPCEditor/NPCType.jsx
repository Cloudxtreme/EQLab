import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Field } from 'redux-form'
import Input from '../form/Input.jsx'
import Checkbox from '../form/Checkbox.jsx'
import Select from '../form/Select.jsx'
import {
  GENDERS,
  NPC_CLASSES,
  RACES,
  BODY_TYPES,
  MELEE_ATTACK_SKILLS,
  RANGE_ATTACK_SKILLS
} from '../form/constants/constants.js'


class NPCType extends React.PureComponent {
  render() {
    return (
      <div id="NPCType">
        <Row>
          <Col md={4}>
            <Field component={Input} type="text" name="name" label="name"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Input} type="text" name="lastname" label="lastname"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Input} type="text" name="level" label="level"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Input} type="text" name="maxlevel" label="maxlevel"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Input} type="text" name="scalerate" label="scalerate"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Select} options={NPC_CLASSES} name="class" label="class"  
              bsSize="sm"/>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Field component={Select} options={RACES} name="race" label="race"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Select} options={GENDERS} name="gender" label="gender"  
              bsSize="sm"/>
          </Col>
          <Col md={2}>
            <Field component={Select} options={BODY_TYPES} name="bodytype" label="bodytype"  
              bsSize="sm"/>
          </Col>
          <Col md={2}>
            <Field component={Input} type="text" name="texture" label="texture"  
              bsSize="sm"/>
          </Col>
          <Col md={2}>
            <Field component={Input} type="text" name="runspeed" label="runspeed"  
              bsSize="sm"/>
          </Col>
          <Col md={2}>
            <Field component={Input} type="text" name="walkspeed" label="walkspeed"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Input} type="text" name="aggroradius" label="aggroradius"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Input} type="text" name="assistradius" label="assistradius"  
              bsSize="sm"/>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Field component={Checkbox} type="text" name="see_invis" label="see_invis"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Checkbox} type="text" name="see_invis_undead" label="see_invis_undead"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Checkbox} type="text" name="see_hide" label="see_hide"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Checkbox} type="text" name="see_improved_hide" label="see_improved_hide"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
            <Field component={Checkbox} type="text" name="trackable" label="trackable"  
              bsSize="sm"/>
          </Col>
          <Col md={4}>
          {/* Empty */}
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <fieldset className="form-border">
            <legend className="form-border">Combat</legend>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="hp" label="hp"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="hp_regen_rate" label="hp_regen_rate"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="mana" label="mana"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="mana_regen_rate" label="mana_regen_rate"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="AC" label="AC"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="Avoidance" label="Avoidance"  
                    bsSize="sm"/>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="ATK" label="ATK"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="Accuracy" label="Accuracy"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="mindmg" label="mindmg"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="maxdmg" label="maxdmg"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="attack_delay" label="attack_delay"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="slow_mitigation" label="slow_mitigation"  
                    bsSize="sm"/>
                </Col>
              </Row>
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <fieldset className="form-border">
            <legend className="form-border">Stats</legend>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="STR" label="STR"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="STA" label="STA"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="DEX" label="DEX"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="AGI" label="AGI"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="_INT" label="_INT"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="WIS" label="WIS"  
                    bsSize="sm"/>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="CHA" label="CHA"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="MR" label="MR"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="CR" label="CR"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="DR" label="DR"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="FR" label="FR"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="PR" label="PR"  
                    bsSize="sm"/>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="Corrup" label="Corrup"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="PhR" label="PhR"  
                    bsSize="sm"/>
                </Col>
                <Col md={16}>
                {/* Empty */}
                </Col>
              </Row>
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <fieldset className="form-border">
            <legend className="form-border">Appearance</legend>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="size" label="size"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="face" label="face"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="herosforgemodel" label="herosforgemodel"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="drakkin_heritage" label="drakkin_heritage"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="drakkin_tattoo" label="drakkin_tattoo"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="drakkin_details" label="drakkin_details"  
                    bsSize="sm"/>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="helmtexture" label="helmtexture"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="armtexture" label="armtexture"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="bracertexture" label="bracertexture"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="handtexture" label="handtexture"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="legtexture" label="legtexture"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="feettexture" label="feettexture"  
                    bsSize="sm"/>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="d_melee_texture1" label="d_melee_texture1"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="d_melee_texture2" label="d_melee_texture2"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Select} options={MELEE_ATTACK_SKILLS} name="prim_melee_type" label="prim_melee_type"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Select} options={MELEE_ATTACK_SKILLS} name="sec_melee_type" label="sec_melee_type"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="ammo_idfile" label="ammo_idfile"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Select} options={RANGE_ATTACK_SKILLS} name="ranged_type" label="ranged_type"  
                    bsSize="sm"/>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="luclin_hairstyle" label="luclin_hairstyle"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="luclin_haircolor" label="luclin_haircolor"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="luclin_eyecolor" label="luclin_eyecolor"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="luclin_eyecolor2" label="luclin_eyecolor2"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="luclin_beardcolor" label="luclin_beardcolor"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="luclin_beard" label="luclin_beard"  
                    bsSize="sm"/>
                </Col>
              </Row>
            </fieldset>
          </Col>
        </Row>
        <Row>
          <Col md={24}>
            <fieldset className="form-border">
            <legend className="form-border">Misc</legend>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="version" label="version"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="npc_aggro" label="npc_aggro"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="spawn_limit" label="spawn_limit"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="unique_spawn_by_name" label="unique_spawn_by_name"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="qlobal" label="qlobal"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="isquest" label="isquest"  
                    bsSize="sm"/>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="findable" label="findable"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="isbot" label="isbot"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="private_corpse" label="private_corpse"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="underwater" label="underwater"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="no_target_hotkey" label="no_target_hotkey"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="adventure_template_id" label="adventure_template_id"  
                    bsSize="sm"/>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field component={Input} type="text" name="trap_template" label="trap_template"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="attack_count" label="attack_count"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="npcspecialattks" label="npcspecialattks"  
                    bsSize="sm" readOnly/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="attack_speed" label="attack_speed"  
                    bsSize="sm" readOnly/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="exclude" label="exclude"  
                    bsSize="sm" readOnly/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="light" label="light"  
                    bsSize="sm"/>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="raid_target" label="raid_target"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="unique_" label="unique_"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="ignore_despawn" label="ignore_despawn"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Checkbox} type="text" name="fixed" label="fixed"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  <Field component={Input} type="text" name="peqid" label="peqid"  
                    bsSize="sm"/>
                </Col>
                <Col md={4}>
                  {/* Empty */}
                </Col>
              </Row>
            </fieldset>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NPCType;