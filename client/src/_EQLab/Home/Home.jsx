import React from 'react';

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <h4>Welcome to the EQLab Alpha!</h4>
        <h5>To Do:</h5>
        <ul>
          <li>Handle deletion of all linked data (items, spells, npcs, etc) and future integration with a live DB.
            <ul>

              <li>NPCs (needs additional review)
                <ul>Deletions:
                  <li>spawnentry</li>
                  <li>pets</li>
                  <li>merchantlist_temp</li>
                  <li>quest_globals</li>
                </ul>
                <ul>Updates to null/empty:
                  <li>spells_new (pet)</li>
                  <li>fishing</li>
                  <li>activities (need to do research on this table)</li>
                </ul>
              </li>

              <li>Spells
                <ul>Deletions:
                  <li>blocked_spells</li>
                  <li>bot_spells_entries?</li>
                  <li>character_buffs</li>
                  <li>character_memmed_spells</li>
                  <li>character_pet_buffs</li>
                  <li>character_pet_info</li>
                  <li>character_spells</li>
                  <li>damageshieldtypes</li>
                  <li>ldon_trap_templates</li>
                  <li>merc_buffs</li>
                  <li>merc_spell_list_entries</li>
                  <li>npc_spells_entries</li>
                  <li>spell_globals</li>
                </ul>
                <ul>Updates to null/empty:
                  <li>aa_actions</li>
                  <li>altadv_vars</li>
                  <li>items (procs and scroll effects)</li>
                  <li>spells (RecourseLink)</li>
                  <li>traps (where effect=0 and effectvalue=spellID, set chance to 0 too?)</li>
                </ul>
              </li>

              <li>Items
                <ul>Deletions:
                  <li>alternate_currency -> character_alt_currency</li>
                  <li>buyer</li>
                  <li>character_bandolier</li>
                  <li>character_corpse_items</li>
                  <li>character_pet_inventory</li>
                  <li>character_potion_belt</li>
                  <li>discovered_items</li>
                  <li>doors (keyitem)</li>
                  <li>fishing</li>
                  <li>forage</li>
                  <li>ground_spawns</li>
                  <li>guild_bank</li>
                  <li>inventory</li>
                  <li>inventory_snapshots</li>
                  <li>item_tick</li>
                  <li>keyring</li>
                  <li>lootdrop_entries</li>
                  <li>merchantlist</li>
                  <li>merchantlist_temp</li>
                  <li>merc_inventory</li>
                  <li>object_contents</li>
                  <li>pets_equipmentset_entries</li>
                  <li>sharedbank</li>
                  <li>starting_items</li>
                  <li>trader</li>
                  <li>tradeskill_recipe_entries</li>
                  <li>tribute_levels</li>
                  <li>veteran_reward_templates</li>
                </ul>
                <ul>Updates to null/empty:
                  <li>activities (need to do research on this table)</li>
                  <li>object</li>
                  <li>spells_new (where has effect SE_SummonItem and effect_base_value = itemID</li>
                  <li>tasks (rewardid)</li>
                  <li>titles</li>
                </ul>
              </li>

              <li>Folder Structure
                <ul>
                  <li>build#.sql (contains table data)</li>
                  <li>patch#.sql (contains deletions/changes for linked tables)</li>
                  <li>client folder
                    <ul>
                      <li>spells_us.txt</li>
                      <li>dbstr_us.txt</li>
                      <li>*_chr.txt</li>
                    </ul>
                  </li>
                </ul>
              </li>

            </ul>
          </li>
          <li>Finish up <s>server</s>/client side validation</li>
          <li><s>Files - Create dbstr_us.txt, Create spells_us.txt, Create Build (db, spells, textures, compressed)</s><i> Mostly Complete</i></li>
          <li>Merchant List Templates (for adding spell sets ie Wizard 1-8, Necro 40-49, etc)</li>
          <li>Authentication - Login/Logout, Admin Tools (Invites, Privileges)</li>
          <li>Zones - Mapper, Rules</li>
          <li>React Routes + React Helmet</li>
          <li>Re-style SpawnEditor</li>
          <li>CSS/Styling Improvements (Ongoing)</li>
          <li>Quest/Script Features (item, spell, npc scripts)</li>
        </ul>
      </div>
    );
  }
}

export default Home;