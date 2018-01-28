export const GENDERS = [
  {value: 0, label: "Male"},
  {value: 1, label: "Female"},
  {value: 2, label: "Monster"}
];

export const PLAYER_CLASSES = [
  {value: 1, bitmask: 1, label: "Warrior"},
  {value: 2, bitmask: 2, label: "Cleric"},
  {value: 3, bitmask: 4, label: "Paladin"},
  {value: 4, bitmask: 8, label: "Ranger"},
  {value: 5, bitmask: 16, label: "Shadow Knight"},
  {value: 6, bitmask: 32, label: "Druid"},
  {value: 7, bitmask: 64, label: "Monk"},
  {value: 8, bitmask: 128, label: "Bard"},
  {value: 9, bitmask: 256, label: "Rogue"},
  {value: 10, bitmask: 512, label: "Shaman"},
  {value: 11, bitmask: 1024, label: "Necromancer"},
  {value: 12, bitmask: 2048, label: "Wizard"},
  {value: 13, bitmask: 4096, label: "Magician"},
  {value: 14, bitmask: 8192, label: "Enchanter"},
  {value: 15, bitmask: 16384, label: "Beastlord"},
  {value: 16, bitmask: 32768, label: "Berserker"}
];

export const NPC_CLASSES = [
  {value: 1, label: "Warrior"},
  {value: 2, label: "Cleric"},
  {value: 3, label: "Paladin"},
  {value: 4, label: "Ranger"},
  {value: 5, label: "Shadow Knight"},
  {value: 6, label: "Druid"},
  {value: 7, label: "Monk"},
  {value: 8, label: "Bard"},
  {value: 9, label: "Rogue"},
  {value: 10, label: "Shaman"},
  {value: 11, label: "Necromancer"},
  {value: 12, label: "Wizard"},
  {value: 13, label: "Magician"},
  {value: 14, label: "Enchanter"},
  {value: 15, label: "Beastlord"},
  {value: 16, label: "Berserker"},
  {value: 20, label: "GM Warrior"},
  {value: 21, label: "GM Cleric"},
  {value: 22, label: "GM Paladin"},
  {value: 23, label: "GM Ranger"},
  {value: 24, label: "GM Shadow Knight"},
  {value: 25, label: "GM Druid"},
  {value: 26, label: "GM Monk"},
  {value: 27, label: "GM Bard"},
  {value: 28, label: "GM Rogue"},
  {value: 29, label: "GM Shaman"},
  {value: 30, label: "GM Necromancer"},
  {value: 31, label: "GM Wizard"},
  {value: 32, label: "GM Magician"},
  {value: 33, label: "GM Enchanter"},
  {value: 34, label: "GM Beastlord"},
  {value: 35, label: "GM Berserker"},
  {value: 40, label: "Banker"},
  {value: 41, label: "Shopkeeper"},
  {value: 59, label: "Discord Merchant"},
  {value: 60, label: "Adventure Recruiter"},
  {value: 61, label: "Adventure Merchant"},
  {value: 63, label: "Tribute Master"},
  {value: 64, label: "Guild Tribute Master"},
  {value: 66, label: "Guild Bank"},
  {value: 67, label: "Radiant Crystal Merchant"},
  {value: 68, label: "Ebon Crystal Merchant"},
  {value: 69, label: "Fellowships"},
  {value: 70, label: "Alternate Currency Merchant"},
  {value: 71, label: "Mercenary Merchant"}
];

export const BODY_TYPES = [
  {value: 1, label: "Humanoid"},
  {value: 2, label: "Lycanthrope"},
  {value: 3, label: "Undead"},
  {value: 4, label: "Giant"},
  {value: 5, label: "Construct"},
  {value: 6, label: "Extraplanar"},
  {value: 7, label: "Magical"},
  {value: 8, label: "Summoned Undead"},
  {value: 9, label: "Raid Giant"},
  {value: 11, label: "No Target"},
  {value: 12, label: "Vampire"},
  {value: 13, label: "Atenha Ra"},
  {value: 14, label: "Greater Akheva"},
  {value: 15, label: "Khati Sha"},
  {value: 16, label: "Seru"},
  {value: 18, label: "Draz Nurakk"},
  {value: 19, label: "Zek"},
  {value: 20, label: "Luggald"},
  {value: 21, label: "Animal"},
  {value: 22, label: "Insect"},
  {value: 23, label: "Monster"},
  {value: 24, label: "Summoned"},
  {value: 25, label: "Plant"},
  {value: 26, label: "Dragon"},
  {value: 27, label: "Summoned2"},
  {value: 28, label: "Summoned3"},
  {value: 30, label: "Velious Dragon"},
  {value: 32, label: "Dragon3"},
  {value: 33, label: "Boxes"},
  {value: 34, label: "Muramite"},
  {value: 60, label: "NoTarget2"},
  {value: 63, label: "Swarm Pet"},
  {value: 66, label: "Invis Man"},
  {value: 67, label: "Special"}
];

export const SKILLS = [
  {value: 0, label: "1H Blunt"},
  {value: 1, label: "1H Slashing"},
  {value: 2, label: "2H Blunt"},
  {value: 3, label: "2H Slashing"},
  {value: 4, label: "Abjuration"},
  {value: 5, label: "Alteration"},
  {value: 6, label: "Apply Poison"},
  {value: 7, label: "Archery"},
  {value: 8, label: "Backstab"},
  {value: 9, label: "Bind Wound"},
  {value: 10, label: "Bash"},
  {value: 11, label: "Block"},
  {value: 12, label: "Brass Instruments"},
  {value: 13, label: "Channeling"},
  {value: 14, label: "Conjuration"},
  {value: 15, label: "Defense"},
  {value: 16, label: "Disarm"},
  {value: 17, label: "Disarm Traps"},
  {value: 18, label: "Divination"},
  {value: 19, label: "Dodge"},
  {value: 20, label: "Double Attack"},
  {value: 21, label: "Dragon Punch"},
  {value: 22, label: "Dual Wield"},
  {value: 23, label: "Eagle Strike"},
  {value: 24, label: "Evocation"},
  {value: 25, label: "Feign Death"},
  {value: 26, label: "Flying Kick"},
  {value: 27, label: "Forage"},
  {value: 28, label: "Hand to Hand"},
  {value: 29, label: "Hide"},
  {value: 30, label: "Kick"},
  {value: 31, label: "Meditate"},
  {value: 32, label: "Mend"},
  {value: 33, label: "Offense"},
  {value: 34, label: "Parry"},
  {value: 35, label: "Pick Lock"},
  {value: 36, label: "Piercing"},
  {value: 37, label: "Riposte"},
  {value: 38, label: "Round Kick"},
  {value: 39, label: "Safe Fall"},
  {value: 40, label: "Sense Heading"},
  {value: 41, label: "Singing"},
  {value: 42, label: "Sneak"},
  {value: 43, label: "Specialize Abjuration"},
  {value: 44, label: "Specialize Alteration"},
  {value: 45, label: "Specialize Conjuration"},
  {value: 46, label: "Specialize Divination"},
  {value: 47, label: "Specialize Evocation"},
  {value: 48, label: "Pick Pockets"},
  {value: 49, label: "Stringed Instruments"},
  {value: 50, label: "Swimming"},
  {value: 51, label: "Throwing"},
  {value: 52, label: "Tiger Claw"},
  {value: 53, label: "Tracking"},
  {value: 54, label: "Wind Instruments"},
  {value: 55, label: "Fishing"},
  {value: 56, label: "Make Poison"},
  {value: 57, label: "Tinkering"},
  {value: 58, label: "Research"},
  {value: 59, label: "Alchemy"},
  {value: 60, label: "Baking"},
  {value: 61, label: "Tailoring"},
  {value: 62, label: "Sense Traps"},
  {value: 63, label: "Blacksmithing"},
  {value: 64, label: "Fletching"},
  {value: 65, label: "Brewing"},
  {value: 66, label: "Alcohol Tolerance"},
  {value: 67, label: "Begging"},
  {value: 68, label: "Jewelry Making"},
  {value: 69, label: "Pottery"},
  {value: 70, label: "Percussion Instruments"},
  {value: 71, label: "Intimidation"},
  {value: 72, label: "Berserking"},
  {value: 73, label: "Taunt"},
  {value: 74, label: "Frenzy"},
  {value: 75, label: "Remove Traps"},
  {value: 76, label: "Triple Attack"},
  {value: 77, label: "2H Piercing"}
];

export const MELEE_ATTACK_SKILLS = [
  {value: 0, label: "1H Blunt"},
  {value: 1, label: "1H Slashing"},
  {value: 2, label: "2H Blunt"},
  {value: 3, label: "2H Slashing"},
  {value: 8, label: "Backstab"},
  {value: 10, label: "Bash"},
  {value: 21, label: "Dragon Punch"},
  {value: 23, label: "Eagle Strike"},
  {value: 26, label: "Flying Kick"},
  {value: 28, label: "Hand to Hand"},
  {value: 30, label: "Kick"},
  {value: 36, label: "Piercing"},
  {value: 38, label: "Round Kick"},
  {value: 52, label: "Tiger Claw"},
  {value: 74, label: "Frenzy"},
  {value: 77, label: "2H Piercing"}
];

export const RANGE_ATTACK_SKILLS = [
  {value: 7, label: "Archery"},
  {value: 51, label: "Throwing"}
];

export const SPELL_SKILLS = [
  {value: 4, label: "Abjuration"},
  {value: 5, label: "Alteration"},
  {value: 12, label: "Brass Instruments"},
  {value: 13, label: "Channeling"},
  {value: 14, label: "Conjuration"},
  {value: 18, label: "Divination"},
  {value: 24, label: "Evocation"},
  {value: 41, label: "Singing"},
  {value: 49, label: "Stringed Instruments"},
  {value: 54, label: "Wind Instruments"},
  {value: 70, label: "Percussion Instruments"}
];

export const SPELL_BUFFDURATION_FORMULAS = [
  {value: 0, label: ""},
  {value: 1, label: "Level / 2"},
  {value: 2, label: "(Level / 2) + 5"},
  {value: 3, label: "Level * 30"},
  {value: 4, label: "Flat 50sec"},
  {value: 5, label: "Bard Song"},
  {value: 6, label: "(Level / 2) + 2"},
  {value: 7, label: "Level"},
  {value: 8, label: "Level + 10"},
  {value: 9, label: "(Level * 2) + 10"},
  {value: 10, label: "(Level * 3) + 10"},
  {value: 11, label: "(Level + 3) * 30"},
  {value: 12, label: "Level / 4"},
  {value: 13, label: "(Level * 4) + 10"},
  {value: 14, label: "(Level + 2) * 5"},
  {value: 15, label: "(Level + 10) * 10"},
  {value: 50, label: "Permanent (canceled by some actions)"},
  {value: 51, label: "Permanent (canceled when out of range of aura)"}
];

export const SPELL_FORMULAS = [
  {value: 1, label: "Effect Base + Level * Multiplier"},
  {value: 60, label: "Effect Base / 100"},
  {value: 100, label: "Effect Base Value"},
  {value: 101, label: "Effect Base + Level / 2"},
  {value: 102, label: "Effect Base + Level"},
  {value: 103, label: "Effect Base + Level * 2"},
  {value: 104, label: "Effect Base + Level * 3"},
  {value: 105, label: "Effect Base + Level * 4"},
  {value: 107, label: "Effect Base + Level / 2"},
  {value: 108, label: "Effect Base + Level / 3"},
  {value: 109, label: "Effect Base + Level / 4"},
  {value: 110, label: "Effect Base + Level / 5"},
  {value: 111, label: "Effect Base + 6 * (Level - Spell Level)"},
  {value: 112, label: "Effect Base + 8 * (Level - Spell Level)"},
  {value: 113, label: "Effect Base + 10 * (Level - Spell Level)"},
  {value: 114, label: "Effect Base + 15 * (Level - Spell Level)"},
  {value: 115, label: "Effect Base + 6 * (Level - Spell Level)"},
  {value: 116, label: "Effect Base + 8 * (Level - Spell Level)"},
  {value: 117, label: "Effect Base + 12 * (Level - Spell Level)"},
  {value: 118, label: "Effect Base + 20 * (Level - Spell Level)"},
  {value: 119, label: "Effect Base + Level / 8,"},
  {value: 121, label: "Effect Base + Level / 3"},
  {value: 122, label: "Splurt"},
  {value: 123, label: "Random (Effect Base, Effect Max)"},
  {value: 203, label: "Effect Max"}
];

export const SPELL_GOODEFFECT = [
  {value: 0, label: "Detrimental"},
  {value: 1, label: "Beneficial"},
  {value: 2, label: "Beneficial, Group Only"}
];

export const SPELL_RESIST_TYPES = [
  {value: 0, label: "Unresistable"},
  {value: 1, label: "Magic"},
  {value: 2, label: "Fire"},
  {value: 3, label: "Cold"},
  {value: 4, label: "Poison"},
  {value: 5, label: "Disease"},
  {value: 6, label: "Chromatic (Average)"},
  {value: 7, label: "Prismatic (Lowest)"},
  {value: 8, label: "Physical"},
  {value: 9, label: "Corruption"}
];

export const SPELL_DEITIES = [
  {value: 1, label: "Bertoxxulous"},
  {value: 2, label: "Brell Serilis"},
  {value: 3, label: "Cazic-Thule"},
  {value: 4, label: "Erollisi Marr"},
  {value: 5, label: "Bristlebane"},
  {value: 6, label: "Innoruuk"},
  {value: 7, label: "Karana"},
  {value: 8, label: "Mithaniel Marr"},
  {value: 9, label: "Prexus"},
  {value: 10, label: "Quellious"},
  {value: 11, label: "Rallos Zek"},
  {value: 12, label: "Rodcet Nife"},
  {value: 13, label: "Solusek Ro"},
  {value: 14, label: "The Tribunal"},
  {value: 15, label: "Tunare"},
  {value: 16, label: "Veeshan"}
];

export const SPELL_ZONE_TYPES = [
  {value: -1, label: "Any"},
  {value: 0, label: "Indoor Only"},
  {value: 1, label: "Outdoor Only"},
  {value: 2, label: "Dungeon Only"},
  {value: 255, label: "Any"}
];

export const SPELL_ENVIRONMENT_TYPES = [
  {value: 0, label: "Everywhere"},
  {value: 12, label: "Cities Only"},
  {value: 24, label: "Planes Only"}
];

export const SPELL_TIME_OF_DAY = [
  {value: 0, label: "Any"},
  {value: 1, label: "Day Only"},
  {value: 2, label: "Night Only"}
];

export const SPELL_DISPEL_TYPES = [
  {value: -1, label: "Cannot be dispelled"},
  {value: 0, label: "Can be dispelled"},
  {value: 1, label: "Can be cancelled with a cure, but not dispelled"}
];

export const SPELL_NUMHIT_TYPES = [
  {value: 0, label: ""},
  {value: 1, label: "Attempted incoming melee attacks (hit or miss) on YOU"},
  {value: 2, label: "Attempted outgoing melee attacks (hit or miss) on YOUR TARGET"},
  {value: 3, label: "Incoming detrimental spells"},
  {value: 4, label: "Outgoing deterimental spells"},
  {value: 5, label: "Successful outgoing melee attack HIT on YOUR TARGET"},
  {value: 6, label: "Successful incoming melee attack HIT on YOU"},
  {value: 7, label: "Any casted spell matching/triggering a focus effect"},
  {value: 8, label: "Successful incoming spell or melee dmg attack on YOU"},
  {value: 9, label: "Incoming Reflected spells"},
  {value: 10, label: "Defensive spell buff procs"},
  {value: 11, label: "Offensive spell buff procs"}
];

export const SPELL_NPC_CATEGORIES = [
  {value: 0, label: "Non NPC Spell"},
  {value: 1, label: "Area of Effect Detrimental"},
  {value: 2, label: "Single Target Detrimental"},
  {value: 3, label: "Buffs"},
  {value: 4, label: "Pet Spells"},
  {value: 5, label: "Healing Spells"},
  {value: 6, label: "Gate or last cast"},
  {value: 7, label: "Debuffs"},
  {value: 8, label: "Dispells"}
];

export const SPELL_PCNPC_ONLY_FLAG = [
  {value: 0, label: "Any"},
  {value: 1, label: "PCs/Mercs Only"},
  {value: 2, label: "NPCs Only"}
];

export const SPELL_AFFECT_INDEX = [
  {value: -1, label: "Summon Mount/None"},
  {value: 0, label: "Direct Damage"},
  {value: 1, label: "Heal/Cure"},
  {value: 2, label: "AC Buff"},
  {value: 3, label: "AE Damage"},
  {value: 4, label: "Summon Pet/Item"},
  {value: 5, label: "Sight"},
  {value: 6, label: "HP/MP/Resist Song"},
  {value: 7, label: "Stat Buff"},
  {value: 9, label: "Invis/Gate"},
  {value: 10, label: "Illusion/Size"},
  {value: 11, label: "Enchanter Pet"},
  {value: 12, label: "Lull (Spell)"},
  {value: 13, label: "Fear"},
  {value: 14, label: "Dispel/Sight"},
  {value: 15, label: "Stun"},
  {value: 16, label: "Haste/Runspeed"},
  {value: 17, label: "Combat Slow"},
  {value: 18, label: "Damage Shield"},
  {value: 19, label: "Cannibalize"},
  {value: 20, label: "Weaken"},
  {value: 21, label: "Banish"},
  {value: 22, label: "Blind/Poison"},
  {value: 23, label: "Cold DD"},
  {value: 24, label: "Poison/Disease DD"},
  {value: 25, label: "Fire DD"},
  {value: 27, label: "Memory Blur"},
  {value: 28, label: "Gravity Fling"},
  {value: 29, label: "Suffocate"},
  {value: 30, label: "Lifetap Over Time"},
  {value: 31, label: "Fire AE"},
  {value: 33, label: "Cold AE"},
  {value: 34, label: "Poison/Disease AE"},
  {value: 40, label: "Teleport"},
  {value: 41, label: "Direct Damage Song"},
  {value: 42, label: "Combat/Buff Song"},
  {value: 43, label: "Lull (Song)"},
  {value: 45, label: "Firework"},
  {value: 46, label: "Firework AE"},
  {value: 47, label: "Weather Rocket"},
  {value: 50, label: "Convert Vitals"},
  {value: 60, label: "NPC Special 60"},
  {value: 61, label: "NPC Special 61"},
  {value: 62, label: "NPC Special 62"},
  {value: 63, label: "NPC Special 63"},
  {value: 70, label: "NPC Special 70"},
  {value: 71, label: "NPC Special 71"},
  {value: 80, label: "NPC Special 80"},
  {value: 88, label: "Trap/Lock"}
];

export const NPC_SPELL_TYPES = {
  1: "Nuke",
  2: "Heal",
  4: "Root",
  8: "Buff",
  16: "Escape",
  32: "Pet",
  64: "Lifetap",
  128: "Snare",
  256: "DoT",
  512: "Dispel",
  1024: "InCombatBuff",
  2048: "Mez",
  4096: "Charm",
  8192: "Slow",
  16384: "Debuff",
  32768: "Cure",
  65536: "Resurrect",
  131072: "HateReduction",
  262144: "InCombatBuffSong",
  524288: "OutOfCombatBuffSong",
  1048576: "PreCombatBuff",
  2097152: "PreCombatBuffSong"
}

export const NPC_FACTION_ENTRIES = {
  npc_value: {
    "-1": "Attack",
    "0": "Neutral",
    "1": "Assist"
  },
  temp: {
    "0": "Faction is permanent, player recieves a message.",
    "1": "Faction is temporary, player does not recieve a message.",
    "2": "Faction is temporary, player recieves a message.",
    "3": "Faction is permanent, but player does not recieve a message.",
  }
}

export const NPC_EMOTE_ENTRIES = {
  event_: {
    "0": "Leave Combat",
    "1": "Enter Combat",
    "2": "On Death",
    "3": "After Death",
    "4": "Hailed",
    "5": "Killed PC",
    "6": "Killed NPC",
    "7": "On Spawn",
    "8": "On Despawn"
  },
  type: {
    "1": "Emote",
    "2": "Shout",
    "3": "Proximity Emote",
    "Other": "Say"
  }
}