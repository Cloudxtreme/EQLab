export const SPELL_EFFECTS = {
0: {
    effect: "SE_CurrentHP",
    description: "Direct Damage/Healing, duration allows for HoT/DoT",
    se_base: "Amt (-)DD(+)Heal",
    se_limit: " Target Restrictions",
    se_max: "Max Amt"
},
1: {
  effect: "SE_ArmorClass",
  description: "+/- AC",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
2: {
  effect: "SE_ATK",
  description: "+/- ATK",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
3: {
  effect: "SE_MovementSpeed",
  description: "+/- Movement Speed",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
4: {
  effect: "SE_STR",
  description: "+/- STR",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
5: {
  effect: "SE_DEX",
  description: "+/- DEX",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
6: {
  effect: "SE_AGI",
  description: "+/- AGI",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
7: {
  effect: "SE_STA",
  description: "+/- STA",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
8: {
  effect: "SE_INT",
  description: "+/- INT",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
9: {
  effect: "SE_WIS",
  description: "+/- WIS",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
10: {
  effect: "SE_CHA",
  description: "+/- CHA (BLANK SPACER if 0 in spell effect)",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
11: {
  effect: "SE_AttackSpeed",
  description: ">100/<100 Attack Speed (standard 'haste or 'slow'')",
  se_base: " Attack Speed",
  se_limit: "none",
  se_max: "Max Amt"
},
12: {
  effect: "SE_Invisibility",
  description: "Invisibility (Unstable) Invisible Level corresponds to what type of see invisible will detect.",
  se_base: "Invisible Level",
  se_limit: "none",
  se_max: "none"
},
13: {
  effect: "SE_SeeInvis",
  description: "See Invisibility Invisible Lv (1) = Standard invsibile ",
  se_base: "Invisible Level",
  se_limit: "none",
  se_max: "none"
},
14: {
  effect: "SE_WaterBreathing",
  description: "Immune to drowning",
  se_base: "? (Seen from 1 - 3)",
  se_limit: "none",
  se_max: "none"
},
15: {
  effect: "SE_CurrentMana",
  description: "Direct +/- mana, duration allows for mana over time",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
16: {
  effect: "SE_NPCFrenzy",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
17: {
  effect: "SE_NPCAwareness",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
18: {
  effect: "SE_Lull",
  description: "Seen in conjunction with SE_ChangeFrenzyRad and SE_Harmony, this effect does nothing alone.",
  se_base: "0",
  se_limit: "none",
  se_max: "none"
},
19: {
  effect: "SE_AddFaction",
  description: "Adjusts NPC 'con' (Alliance spell line)",
  se_base: "Faction Amt",
  se_limit: "none",
  se_max: "none"
},
20: {
  effect: "SE_Blind",
  description: "Turn PC screen blank, causes NPC to flee if NOT in melee range",
  se_base: "? (Usually -1/1)",
  se_limit: "none",
  se_max: "none"
},
21: {
  effect: "SE_Stun",
  description: "Stun for a duration",
  se_base: "Stun Time",
  se_limit: "? (Always <= Base)",
  se_max: "Max Level"
},
22: {
  effect: "SE_Charm",
  description: "Control an NPC/Player for a duration.   ",
  se_base: "?",
  se_limit: "none",
  se_max: "Max Level"
},
23: {
  effect: "SE_Fear",
  description: "Cause your target to flee.",
  se_base: "?",
  se_limit: "none",
  se_max: "Max Level"
},
24: {
  effect: "SE_Stamina",
  description: "Increased stamina (yellow bar) 'Invigor'Current Effect (Does not raise endurance on live)",
  se_base: "? (Always Negative)",
  se_limit: "none",
  se_max: "none"
},
25: {
  effect: "SE_BindAffinity",
  description: "Sets Bind point. Bind Point ID (1=Primary, 2=Secondary 3=Tertiary) ",
  se_base: "Bind Point ID",
  se_limit: "none",
  se_max: "none"
},
26: {
  effect: "SE_Gate",
  description: "Transport to Bind point. Bind Point ID (1=Primary, 2=Secondary 3=Tertiary) ",
  se_base: "Success Chance",
  se_limit: "Bind Point ID",
  se_max: "none"
},
27: {
  effect: "SE_CancelMagic",
  description: "Chance to remove any buff effect.",
  se_base: "Level Modifier",
  se_limit: "none",
  se_max: "none"
},
28: {
  effect: "SE_InvisVsUndead",
  description: "Invisiblity vs Undead (Unstable)(Only Invisiblity Level (1) exists)",
  se_base: "Invisible Level",
  se_limit: "none",
  se_max: "none"
},
29: {
  effect: "SE_InvisVsAnimals",
  description: "Invisiblity vs Animal (Unstable)(Only Invisiblity Level (1) exists)",
  se_base: "Invisible Level",
  se_limit: "none",
  se_max: "none"
},
30: {
  effect: "SE_ChangeFrenzyRad",
  description: "Sets NPC Aggro Radius to the value of the spell effect",
  se_base: "Aggro Radius",
  se_limit: "none",
  se_max: "Max Level"
},
31: {
  effect: "SE_Mez",
  description: "Stuns target till duration ends or broken (melee/spell dmg)   ",
  se_base: "Stacking Value",
  se_limit: "none",
  se_max: "Max Level"
},
32: {
  effect: "SE_SummonItem",
  description: "Summon an item.",
  se_base: "Item ID",
  se_limit: "none",
  se_max: "none"
},
33: {
  effect: "SE_SummonPet",
  description: "Summon Pet                  ('Teleport Zone' Field in spells_new table contains name of pet)",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
34: {
  effect: "SE_Confuse",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
35: {
  effect: "SE_DiseaseCounter",
  description: "Determines potency of determental disease spells (+) or potency of cures (-)",
  se_base: "Counter Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
36: {
  effect: "SE_PoisonCounter",
  description: "Determines potency of determental poision spells (+) or potency of cures (-)",
  se_base: "Counter Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
37: {
  effect: "SE_DetectHostile",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
38: {
  effect: "SE_DetectMagic",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
39: {
  effect: "SE_DetectPoison",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
40: {
  effect: "SE_DivineAura",
  description: "Invulnerable to spells and melee, you can not cast or melee while under this effect.",
  se_base: "? (Usually 1)",
  se_limit: "none",
  se_max: "none"
},
41: {
  effect: "SE_Destroy",
  description: "Instantly kill target",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
42: {
  effect: "SE_ShadowStep",
  description: "Warps player a short distance in a random direction",
  se_base: "? (Usually 1)",
  se_limit: "none",
  se_max: "none"
},
43: {
  effect: "SE_Berserk",
  description: "Sets client as 'Berserk' allowing for chance to crippling blow. [Custom] [NOT USED ON LIVE]",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
44: {
  effect: "SE_Lycanthropy",
  description: "Used as a place holder effect for preventing certain buffs from stacking",
  se_base: "Stacking Value",
  se_limit: "none",
  se_max: "none"
},
45: {
  effect: "SE_Vampirism",
  description: "Heals you for a percent of your melee damage done to target.  [Custom] [NOT USED ON LIVE]",
  se_base: "Amt % (+/-)",
  se_limit: "none",
  se_max: "none"
},
46: {
  effect: "SE_ResistFire",
  description: "+/- Fire Resist",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
47: {
  effect: "SE_ResistCold",
  description: "+/- Cold Resist",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
48: {
  effect: "SE_ResistPoison",
  description: "+/- Poison Resist",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
49: {
  effect: "SE_ResistDisease",
  description: "+/- Disease Resist",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
50: {
  effect: "SE_ResistMagic",
  description: "+/- Magic Resist",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
51: {
  effect: "SE_DetectTraps",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
52: {
  effect: "SE_SenseDead",
  description: "Point player in direction of nearest Undead NPC",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "?"
},
53: {
  effect: "SE_SenseSummoned",
  description: "Point player in direction of nearest Summoned NPC",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
54: {
  effect: "SE_SenseAnimals",
  description: "Point player in direction of nearest Animal NPC",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
55: {
  effect: "SE_Rune",
  description: "Absorb melee damage until a maxium amount then fades",
  se_base: "Rune Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
56: {
  effect: "SE_TrueNorth",
  description: "Point player in North direction.",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
57: {
  effect: "SE_Levitate",
  description: "Levitation (Take no fall damage)",
  se_base: "? (Usually 1)",
  se_limit: "none",
  se_max: "none"
},
58: {
  effect: "SE_Illusion",
  description: "Changes visual race of target",
  se_base: "Race ID (-1=Gender)",
  se_limit: "Texture ID",
  se_max: "Helm ID"
},
59: {
  effect: "SE_DamageShield",
  description: "Damage taken upon successful melee hit",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
60: {
  effect: "SE_TransferItem",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
61: {
  effect: "SE_Identify",
  description: "Displays in text the 'lore' field from the items table",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
62: {
  effect: "SE_ItemID",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
63: {
  effect: "SE_WipeHateList",
  description: "Chance to wipe the NPC's hatelist",
  se_base: "Success Chance",
  se_limit: "none",
  se_max: "Max Chance"
},
64: {
  effect: "SE_SpinTarget",
  description: "Spins Target and stuns",
  se_base: "Spin Duration",
  se_limit: "? (Always <= base)",
  se_max: "Max Level"
},
65: {
  effect: "SE_InfraVision",
  description: "Improved night vision",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
66: {
  effect: "SE_UltraVision",
  description: "Better improved night vision",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
67: {
  effect: "SE_EyeOfZomm",
  description: "Transfers your vision and control to a temporary NPC",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
68: {
  effect: "SE_ReclaimPet",
  description: "Kills your pet in exchange for mana. (Returns 75% of pet spell actual mana cost)",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
69: {
  effect: "SE_TotalHP",
  description: "Increases Max HP (standard 'HP Buffs')",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
70: {
  effect: "SE_CorpseBomb",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
71: {
  effect: "SE_NecPet",
  description: "Summon Pet                  ('Teleport Zone' Field in spells_new table contains name of pet)",
  se_base: "",
  se_limit: "",
  se_max: ""
},
72: {
  effect: "SE_PreserveCorpse",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
73: {
  effect: "SE_BindSight",
  description: "See from the perspective of the target that this is cast on.",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
74: {
  effect: "SE_FeignDeath",
  description: "Fall to the ground and clear hate list",
  se_base: "Success Chance",
  se_limit: "? (usually 0)",
  se_max: "Max Chance"
},
75: {
  effect: "SE_VoiceGraft",
  description: "Speak through your pet",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
76: {
  effect: "SE_Sentinel",
  description: "Creates a proximity zone where cast that alerts caster if NPC's or Players enter it.",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
77: {
  effect: "SE_LocateCorpse",
  description: "Turn player in direction of targeted players corpse",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
78: {
  effect: "SE_AbsorbMagicAtt",
  description: "'Spell Rune' Absorb spell damage until a maxium amount then fades",
  se_base: "Rune Amt",
  se_limit: "none",
  se_max: "none"
},
79: {
  effect: "SE_CurrentHPOnce",
  description: "Direct Damage/Healing ",
  se_base: "Amt (-)DD(+)Heal",
  se_limit: " Target Restrictions",
  se_max: "Max Amt"
},
80: {
  effect: "SE_EnchantLight",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
81: {
  effect: "SE_Revive",
  description: "When cast on corpse restore experience and teleports player to corpse",
  se_base: "Exp Amt",
  se_limit: "none",
  se_max: "none"
},
82: {
  effect: "SE_SummonPC",
  description: "Summon a player to caster",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
83: {
  effect: "SE_Teleport",
  description: "Teleport Group to defined location.    (Corridinates base1=x base2=y base3=z base4=h)",
  se_base: "Coordinates",
  se_limit: "none",
  se_max: "none"
},
84: {
  effect: "SE_TossUp",
  description: "Shoots player into the air.",
  se_base: "Dist, (Always Neg)",
  se_limit: "none",
  se_max: "none"
},
85: {
  effect: "SE_WeaponProc",
  description: "Add melee proc",
  se_base: "Proc Spell ID",
  se_limit: "Rate Modifier",
  se_max: "none"
},
86: {
  effect: "SE_Harmony",
  description: "Set NPC assist radius to spells value.  ",
  se_base: "Assist Radius",
  se_limit: "none",
  se_max: "Max Level"
},
87: {
  effect: "SE_MagnifyVision",
  description: "Zoom players vision",
  se_base: "Magnify Amt",
  se_limit: "none",
  se_max: "none"
},
88: {
  effect: "SE_Succor",
  description: "Teleport Group/Self to defined location or to safe point in zone (2% fail rate)",
  se_base: "Coord. (-1 = Safe)",
  se_limit: "none",
  se_max: "none"
},
89: {
  effect: "SE_ModelSize",
  description: "Change size by percent (grow/shrink)",
  se_base: "Percent",
  se_limit: "?",
  se_max: "?"
},
90: {
  effect: "SE_Cloak",
  description: "Invisibility",
  se_base: "Invisibile Level",
  se_limit: "none",
  se_max: "none"
},
91: {
  effect: "SE_SummonCorpse",
  description: "Summon targets corpse to caster.",
  se_base: "Target Level Max",
  se_limit: "none",
  se_max: "none"
},
92: {
  effect: "SE_InstantHate",
  description: "Adds/Removes set amount of your 'hate' instantly from target",
  se_base: "Hate Amt",
  se_limit: "none",
  se_max: "?Always(+)"
},
93: {
  effect: "SE_StopRain",
  description: "Stops zone weather related rain",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
94: {
  effect: "SE_NegateIfCombat",
  description: "Removes buff if player casts or does any combat skill",
  se_base: "? (Usually 1)",
  se_limit: "none",
  se_max: "none"
},
95: {
  effect: "SE_Sacrifice",
  description: "Kills player and creates 'Essence Emerald', corpse can not be rezed",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
96: {
  effect: "SE_Silence",
  description: "Prevents spell casting",
  se_base: "? (Usually 1)",
  se_limit: "none",
  se_max: "none"
},
97: {
  effect: "SE_ManaPool",
  description: "Increase/Decrease max mana pool",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
98: {
  effect: "SE_AttackSpeed2",
  description: "Stackable Haste/Slow that does not go over haste cap",
  se_base: " Attack Speed",
  se_limit: "none",
  se_max: "Max Amt"
},
99: {
  effect: "SE_Root",
  description: "Immobilizes target.  ",
  se_base: "? (Usually -10000)",
  se_limit: "none",
  se_max: "none"
},
100: {
  effect: "SE_HealOverTime",
  description: "Heal over time (will stack with an HoT from SE_CurrentHP)",
  se_base: "Amt",
  se_limit: " Target Restrictions",
  se_max: "Max Amt"
},
101: {
  effect: "SE_CompleteHeal",
  description: "Heal for '7500' HP with a buff icon that blocks the same effect from taking hold.",
  se_base: "Heal Multiplier (?)",
  se_limit: "none",
  se_max: "?"
},
102: {
  effect: "SE_Fearless",
  description: "Immune to fear effect",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "?"
},
103: {
  effect: "SE_CallPet",
  description: "Summon pet to owner",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "?"
},
104: {
  effect: "SE_Translocate",
  description: "Creates a confirmation box to teleport player to location of bind point",
  se_base: "Corridinates/Bind ID",
  se_limit: "none",
  se_max: "none"
},
105: {
  effect: "SE_AntiGate",
  description: "Prevent the use of gate spells.  (Base is likely the # of Bind Point ID's it can block)",
  se_base: "? (Seen 1 - 3)",
  se_limit: "none",
  se_max: "none"
},
106: {
  effect: "SE_SummonBSTPet",
  description: "Summon Pet                  ('Teleport Zone' Field in spells_new table contains name of pet)",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
107: {
  effect: "SE_AlterNPCLevel",
  description: "+/- to NPC level, will revert to base line when effect fades. [Custom] [NOT USED ON LIVE]",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
108: {
  effect: "SE_Familiar",
  description: "Summon Pet                  ('Teleport Zone' Field in spells_new table contains name of pet)",
  se_base: "? (Usually 0)",
  se_limit: "none",
  se_max: "none"
},
109: {
  effect: "SE_SummonItemIntoBag",
  description: "If first effect is (SE_SummonItem) and item is bag, this will place items into bag",
  se_base: "Item ID",
  se_limit: "none",
  se_max: "none"
},
110: {
  effect: "SE_IncreaseArchery",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
111: {
  effect: "SE_ResistAll",
  description: "+/- all resist values",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
112: {
  effect: "SE_CastingLevel",
  description: "+/- 'Casting Level' which will determine fizzel rate",
  se_base: "Amt",
  se_limit: "none",
  se_max: "?(Usually 0)"
},
113: {
  effect: "SE_SummonHorse",
  description: "Summon a mount",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
114: {
  effect: "SE_ChangeAggro",
  description: "+/- Percent modifier to spell and melee hate",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
115: {
  effect: "SE_Hunger",
  description: "Prevents hunger/thirst checks (Ie. You shouldn't need food/drink with this effect)",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
116: {
  effect: "SE_CurseCounter",
  description: "Determines potency of determental curse spells (+) or potency of cures (-)",
  se_base: "Counter Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
117: {
  effect: "SE_MagicWeapon",
  description: "Allows non-magic weapons to be considered 'magical'",
  se_base: "? (Always 1)",
  se_limit: "none",
  se_max: "none"
},
118: {
  effect: "SE_Amplification",
  description: "Increase modifier from singing skill",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
119: {
  effect: "SE_AttackSpeed3",
  description: "Stackable Haste/Slow does go over haste cap.",
  se_base: " Attack Speed",
  se_limit: "none",
  se_max: "Max Amt"
},
120: {
  effect: "SE_HealRate",
  description: "+/- Modfies by % the casters base heal value for incomming spells.   Heal Modifiers",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
121: {
  effect: "SE_ReverseDS",
  description: "Damage/Heal on entity with effect every time entity does a melee hit.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
122: {
  effect: "SE_ReduceSkill",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
123: {
  effect: "SE_Screech",
  description: "Spell Blocker (If have buff with value of +1 will block any spell w/ Screech w/ -1 value)  Buff Stacking",
  se_base: "Value (usually 1/-1)",
  se_limit: "none",
  se_max: "none"
},
124: {
  effect: "SE_ImprovedDamage",
  description: "Modifies by % casters base spell damage value  Spell Damage Modifiers",
  se_base: "Min %",
  se_limit: "Max %",
  se_max: "none"
},
125: {
  effect: "SE_ImprovedHeal",
  description: "Modifies by % the casters base heal value  Heal Modifiers",
  se_base: "Min %",
  se_limit: "Max %",
  se_max: "none"
},
126: {
  effect: "SE_SpellResistReduction",
  description: "Modifies by % chance for casters spell resist rate.",
  se_base: "Min %",
  se_limit: "Max %",
  se_max: "none"
},
127: {
  effect: "SE_IncreaseSpellHaste",
  description: "Modifies by % spell casting time.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
128: {
  effect: "SE_IncreaseSpellDuration",
  description: "Modifies by % buff duration.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
129: {
  effect: "SE_IncreaseRange",
  description: "Modifies by % spell casting range.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
130: {
  effect: "SE_SpellHateMod",
  description: "Modifies by % hate from spells/abilities.",
  se_base: "Min %",
  se_limit: "Max %",
  se_max: "none"
},
131: {
  effect: "SE_ReduceReagentCost",
  description: "Modifies by % chance not use a reagent.",
  se_base: "Min %",
  se_limit: "Max %",
  se_max: "none"
},
132: {
  effect: "SE_ReduceManaCost",
  description: "Modifies by % spell mana cost.",
  se_base: "Min %",
  se_limit: "Max %",
  se_max: "none"
},
133: {
  effect: "SE_FcStunTimeMod",
  description: "Modifies by % stun duration. [Custom] [NOT USED ON LIVE]",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
134: {
  effect: "SE_LimitMaxLevel",
  description: "Limit to Max Level (% decrease is amount lost if over cap)",
  se_base: "Max Level",
  se_limit: "% Decrease",
  se_max: "none"
},
135: {
  effect: "SE_LimitResist",
  description: "Limit to Resist Types, (+) Include (-) Exclude",
  se_base: " Resist Types",
  se_limit: "none",
  se_max: "none"
},
136: {
  effect: "SE_LimitTarget",
  description: "Limit to Target Type. (+) Include (-) Exclude",
  se_base: " Target Types",
  se_limit: "none",
  se_max: "none"
},
137: {
  effect: "SE_LimitEffect",
  description: "Limit to Spell Effect. (+) Include (-) Exclude",
  se_base: "Spell Effect ID",
  se_limit: "none",
  se_max: "none"
},
138: {
  effect: "SE_LimitSpellType",
  description: "Limit to Beneficial(1) OR Determental(0) spells (goodEffect in  spells_new )",
  se_base: "1=Good 0=Bad",
  se_limit: "none",
  se_max: "none"
},
139: {
  effect: "SE_LimitSpell",
  description: "Limit to Spell ID (+) Include (-) Exclude",
  se_base: "Spell ID",
  se_limit: "none",
  se_max: "none"
},
140: {
  effect: "SE_LimitMinDur",
  description: "Limit to spells with a minium duration.",
  se_base: "Duration",
  se_limit: "none",
  se_max: "none"
},
141: {
  effect: "SE_LimitInstant",
  description: "Limit to spells that are instant cast. (1 = Instant Only) (0 = Exclude Instant)",
  se_base: "36526",
  se_limit: "none",
  se_max: "none"
},
142: {
  effect: "SE_LimitMinLevel",
  description: "Limit to spells above a specific level.",
  se_base: "Level",
  se_limit: "none",
  se_max: "none"
},
143: {
  effect: "SE_LimitCastTimeMin",
  description: "Limit to spells with a minium cast time.",
  se_base: "Cast Time",
  se_limit: "none",
  se_max: "none"
},
144: {
  effect: "SE_LimitCastTimeMax",
  description: "Limit to spells with a maximum cast time. [Custom] [NOT USED ON LIVE]",
  se_base: "Cast Time",
  se_limit: "none",
  se_max: "none"
},
145: {
  effect: "SE_Teleport2",
  description: "Teleport to defined location. Used by 'Banisher' npcs, AoE spells that are cast on players.",
  se_base: "Corridinates",
  se_limit: "none",
  se_max: "none"
},
146: {
  effect: "SE_ElectricityResist",
  description: "Electricity Resist? There is no resist type for this.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
147: {
  effect: "SE_PercentalHeal",
  description: "Heal/(Damage) for percent value based on targets max HP",
  se_base: "Amt(neg for dmg)",
  se_limit: "none",
  se_max: "Max Amt"
},
148: {
  effect: "SE_StackingCommand_Block",
  description: "Prevents buff from taking hold if criteria met. (SLOT = 'formula - 201')  Buff Stacking",
  se_base: "Spell Effect",
  se_limit: "none",
  se_max: "<  Amt"
},
149: {
  effect: "SE_StackingCommand_Overwrite",
  description: "Allows buff from taking hold if criteria met. (SLOT = 'formula - 201')  Buff Stacking",
  se_base: "Spell Effect",
  se_limit: "none",
  se_max: "<  Amt"
},
150: {
  effect: "SE_DeathSave",
  description: "If under 15% HP, this buff has chance to heal the owner.   ",
  se_base: "(1=Partial/2=Full)",
  se_limit: "Level Max",
  se_max: "Heal Amt"
},
151: {
  effect: "SE_SuspendPet",
  description: "Places a pet in temporary storage. ",
  se_base: "? (0/1)",
  se_limit: "none",
  se_max: "none"
},
152: {
  effect: "SE_TemporaryPets",
  description: "Creates a temporary pet that will fade after duration. (stacks with regular pets)",
  se_base: "Amount of Pets",
  se_limit: "none",
  se_max: "Duration"
},
153: {
  effect: "SE_BalanceHP",
  description: "Balances groups HP (Penalty modifies the damage amount being distributed).",
  se_base: "Penalty",
  se_limit: "Max HP taken/player",
  se_max: "none"
},
154: {
  effect: "SE_DispelDetrimental",
  description: "Dispels only detrimental effects.   ",
  se_base: "Level Modifer",
  se_limit: "none",
  se_max: "none"
},
155: {
  effect: "SE_SpellCritDmgIncrease",
  description: "Modifies by % critical spell damage amount.  Spell Damage Modifiers   [NOT USED ON LIVE] ",
  se_base: "Crit Damage Mod %",
  se_limit: "none",
  se_max: "none"
},
156: {
  effect: "SE_IllusionCopy",
  description: "Turns caster into mirror image of target.",
  se_base: "?(Seen as 0/1/30)",
  se_limit: "none",
  se_max: "?(usually 0)"
},
157: {
  effect: "SE_SpellDamageShield",
  description: "Casters will take damage from spell landing on target.",
  se_base: "Amt (negative)",
  se_limit: "none",
  se_max: "none"
},
158: {
  effect: "SE_Reflect",
  description: "Reflects the casters spell back at the cast.",
  se_base: "Reflect Chance %",
  se_limit: "? (usuallly 0)",
  se_max: "Max"
},
159: {
  effect: "SE_AllStats",
  description: "+/- (STR, DEX, STA, CHA, WIS, INT)",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
160: {
  effect: "SE_MakeDrunk",
  description: "Gives client drunk effect if below tolerance level  (Effect currently handled entirely client side)",
  se_base: "Tolerance",
  se_limit: "none",
  se_max: "none"
},
161: {
  effect: "SE_MitigateSpellDamage",
  description: "Reduces incomming spell damage by % up to a max value.",
  se_base: "Mitigation %",
  se_limit: "Max Amt reduced",
  se_max: "Rune Amt"
},
162: {
  effect: "SE_MitigateMeleeDamage",
  description: "Reduces incomming melee damage by % up to a max value.",
  se_base: "Mitigation %",
  se_limit: "Max Amt reduced",
  se_max: "Rune Amt"
},
163: {
  effect: "SE_NegateAttacks",
  description: "Complete or Partial block of melee / spell damage. (Max= Max Amt Dmg Blocked per hit)",
  se_base: "Number of Blocks",
  se_limit: "none",
  se_max: "Max Amt Blocked"
},
164: {
  effect: "SE_AppraiseLDonChest",
  description: "Gives message if LDON chest is trapped / safe.",
  se_base: "?",
  se_limit: "none",
  se_max: "App. Skill"
},
165: {
  effect: "SE_DisarmLDoNTrap",
  description: "Attempts to disarm an LDON trap.",
  se_base: "?",
  se_limit: "none",
  se_max: "Disarm Skill"
},
166: {
  effect: "SE_UnlockLDoNChest",
  description: "Attemp to unlock an LDON chest",
  se_base: "?",
  se_limit: "none",
  se_max: "Unlock Skill"
},
167: {
  effect: "SE_PetPowerIncrease",
  description: "Increases statistics and level of the player's pet.",
  se_base: "Power Level",
  se_limit: "none",
  se_max: "none"
},
168: {
  effect: "SE_MeleeMitigation",
  description: "Modifies melee damage by percent. (+)Take more DMG (-) Take less Damage",
  se_base: "Mitigation %",
  se_limit: "none",
  se_max: "none"
},
169: {
  effect: "SE_CriticalHitChance",
  description: "Modifies melee critical hit chance by percent. (+) Increase Chance (-) Decrease Chance",
  se_base: "Melee Crit Chance %",
  se_limit: " Skills  (-1=ALL)",
  se_max: "none"
},
170: {
  effect: "SE_SpellCritChance",
  description: "Modifies by % chance to critical direct damage spells.  Spell Damage Modifiers",
  se_base: "Crit Chance %",
  se_limit: "none",
  se_max: "none"
},
171: {
  effect: "SE_CrippBlowChance",
  description: "Modifies crippling blow chance by percent. (Must have a critical hit chance to Crip)",
  se_base: "Crip Blow Chance %",
  se_limit: "none",
  se_max: "none"
},
172: {
  effect: "SE_AvoidMeleeChance",
  description: "Modifies chance to avoid melee ('miss') (+) Increase Chance (-) Decrease Chance",
  se_base: "Avoidance Chance %",
  se_limit: "none",
  se_max: "none"
},
173: {
  effect: "SE_RiposteChance",
  description: "Modifies chance to riposte (+) Increase (-) Decrease",
  se_base: "Riposte Chance %",
  se_limit: "none",
  se_max: "none"
},
174: {
  effect: "SE_DodgeChance",
  description: "Modifies chance to dodge (+) Increase (-) Decrease",
  se_base: "Dodge Chance %",
  se_limit: "none",
  se_max: "none"
},
175: {
  effect: "SE_ParryChance",
  description: "Modifies chance to parry (+) Increase (-) Decrease",
  se_base: "Parry Chance %",
  se_limit: "none",
  se_max: "none"
},
176: {
  effect: "SE_DualWieldChance",
  description: "Modifies chance to dual wield (+) Increase (-) Decrease",
  se_base: "DW Chance %",
  se_limit: "none",
  se_max: "none"
},
177: {
  effect: "SE_DoubleAttackChance",
  description: "Modifies chance to double attack (+) Increase (-) Decrease",
  se_base: "Double Atk Chance %",
  se_limit: "none",
  se_max: "none"
},
178: {
  effect: "SE_MeleeLifetap",
  description: "(+) Heals you for a % of your melee damage done to target. (-) Dmgs you for %",
  se_base: "Amt % (+/-)",
  se_limit: "none",
  se_max: "none"
},
179: {
  effect: "SE_AllInstrumentMod",
  description: "+/- Bard (Singing, Brass, Percusion, Wind, String) modifiers by %.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
180: {
  effect: "SE_ResistSpellChance",
  description: "Chance to resist any spell.",
  se_base: "Resist Chance %",
  se_limit: "none",
  se_max: "Max"
},
181: {
  effect: "SE_ResistFearChance",
  description: "Chance to resist fear spells.",
  se_base: "Resist Chance",
  se_limit: "none",
  se_max: "none"
},
182: {
  effect: "SE_HundredHands",
  description: "Modifies weapon delay by percent. (stacks with other hastes)",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
183: {
  effect: "SE_MeleeSkillCheck",
  description: "Increases chance to hit (Unclear exactly how this works on live).",
  se_base: "Amt %",
  se_limit: " Skills (-1=ALL)",
  se_max: "none"
},
184: {
  effect: "SE_HitChance",
  description: "Modifies chance to hit with a specific skill.",
  se_base: "Chance %",
  se_limit: " Skills (-1=ALL)",
  se_max: "none"
},
185: {
  effect: "SE_DamageModifier",
  description: "Modifies damage amount by percent for a specific skill.",
  se_base: "Amt %",
  se_limit: " Skills (-1=ALL)",
  se_max: "none"
},
186: {
  effect: "SE_MinDamageModifier",
  description: "Modifies minimum damage amount by percent for a specific skill.",
  se_base: "Amt %",
  se_limit: " Skills (-1=ALL)",
  se_max: "none"
},
187: {
  effect: "SE_BalanceMana",
  description: "Balances groups mana. (Penalty modifies the mana amount being distributed).",
  se_base: "Penalty",
  se_limit: "Max mana taken/pl",
  se_max: "none"
},
188: {
  effect: "SE_IncreaseBlockChance",
  description: "Modifies chance to block (+) Increase (-) Decrease",
  se_base: "Block Chance %",
  se_limit: "none",
  se_max: "none"
},
189: {
  effect: "SE_CurrentEndurance",
  description: "+/- Instant endurance or over time (If duration is set)",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
190: {
  effect: "SE_EndurancePool",
  description: "+/- Total endurance pool.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max Amt"
},
191: {
  effect: "SE_Amnesia",
  description: "Silence verse melee abilities that use endurance / disciplines.",
  se_base: "Usually 1",
  se_limit: "none",
  se_max: "none"
},
192: {
  effect: "SE_Hate",
  description: "+/- Instant Hate or Hate over time if duration set.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
193: {
  effect: "SE_SkillAttack",
  description: "Melee/Skill damage (utilizing all melee modifiers/bonuses) where base value is as if you were swinging a weapon with that damage amount using a specific skill. (skill field in spells_new defines which  Skills is used).",
  se_base: "Weapon DMG Amt",
  se_limit: "Chance to Hit mod",
  se_max: "UNKNOWN"
},
194: {
  effect: "SE_FadingMemories",
  description: "To chance to be removeed from all hate lists and set to invisible.",
  se_base: "Fade Chance",
  se_limit: "? (Seen 0/75)",
  se_max: "none"
},
195: {
  effect: "SE_StunResist",
  description: "Chance to resist a stun from BASH/KICK.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
196: {
  effect: "SE_Strikethrough",
  description: "+/- Strikethrough chance (bypassing an opponent's special defenses, such as dodge, block, parry, and riposte.)",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
197: {
  effect: "SE_SkillDamageTaken",
  description: "Modifies damage taken by % from specific skills (+) More dmg taken (-) Less dmg taken",
  se_base: "Mitigation %",
  se_limit: " Skills  (-1=ALL)",
  se_max: "none"
},
198: {
  effect: "SE_CurrentEnduranceOnce",
  description: "+/- Instant endurance.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
199: {
  effect: "SE_Taunt",
  description: "Chance to taunt and instant hate",
  se_base: "Chance % Taunt",
  se_limit: "Amt Hate",
  se_max: "none"
},
200: {
  effect: "SE_ProcChance",
  description: "Increase chance to proc from weapons.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
201: {
  effect: "SE_RangedProc",
  description: "Add spell proc to a ranged attack.",
  se_base: "Proc Spell ID",
  se_limit: "Chance %",
  se_max: "none"
},
202: {
  effect: "SE_IllusionOther",
  description: "Allows next casted Illusion Buff (self-only) to be cast on a targeted player in group.",
  se_base: "none",
  se_limit: "none",
  se_max: "none"
},
203: {
  effect: "SE_MassGroupBuff",
  description: "Allows next casted Group Buff to hit all players and pets within a large radius from caster at 2x mana cost.",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
204: {
  effect: "SE_GroupFearImmunity",
  description: "Provides immunity to fear for group. (Base * 10 = Duration) [No buff icon]",
  se_base: "Duration",
  se_limit: "none",
  se_max: "none"
},
205: {
  effect: "SE_Rampage",
  description: "Does a single round of AE Melee attack (Set in EMU as distance 30 from caster).",
  se_base: "? (Always = 1)",
  se_limit: "none",
  se_max: "none"
},
206: {
  effect: "SE_AETaunt",
  description: "Area of Effect Taunt (Places caster top of hatelist +1 hate) Hardcoded 40 range",
  se_base: "Hate Add to taunt",
  se_limit: "none",
  se_max: "Range override"
},
207: {
  effect: "SE_FleshToBone",
  description: "Turns Meat / Body parts items into bone chips",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
208: {
  effect: "SE_PurgePoison",
  description: "UNKNOWN  [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
209: {
  effect: "SE_DispelBeneficial",
  description: "Dispels only beneficial effects.  ",
  se_base: "Level Modifier",
  se_limit: "none",
  se_max: "none"
},
210: {
  effect: "SE_PetShield",
  description: "Shield Effect (Share damage between pet and owner) for duration.",
  se_base: "Duration (value * 12)",
  se_limit: "none",
  se_max: "none"
},
211: {
  effect: "SE_AEMelee",
  description: "Do an area of effect melee attack (ie. AE Rampage). Not implemented for NPC's",
  se_base: "Duration (value * 12)",
  se_limit: "none",
  se_max: "none"
},
212: {
  effect: "SE_FrenziedDevastation",
  description: "Increase spell critical chance and mana cost 2x for DD spells.  Spell Damage Modifiers  [NOT USED ON LIVE]",
  se_base: "Critcal Chance",
  se_limit: "none",
  se_max: "none"
},
213: {
  effect: "SE_PetMaxHP",
  description: "+/- owner's pets Max HP by percent.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
214: {
  effect: "SE_MaxHPChange",
  description: "+/- Max HP by percent.",
  se_base: "Amt % (value / 100)",
  se_limit: "none",
  se_max: "none"
},
215: {
  effect: "SE_PetAvoidance",
  description: "+/- owner's pets chance to avoid melee.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
216: {
  effect: "SE_Accuracy",
  description: "Increase chance to hit by percent (15 Accuray = 1%) [Only AA uses Limit]",
  se_base: "Amt",
  se_limit: " Skills (-1=ALL)",
  se_max: "none"
},
217: {
  effect: "SE_HeadShot",
  description: "Damage done by 'HeadShot' ability when proced  (Humaniod target hit w/ arrow)",
  se_base: "? (0)",
  se_limit: "Amt Dmg",
  se_max: "none"
},
218: {
  effect: "SE_PetCriticalHit",
  description: "+/- owner's pet/swarm pet chance to critical hit.",
  se_base: "Amt ",
  se_limit: "none",
  se_max: "none"
},
219: {
  effect: "SE_SlayUndead",
  description: "Chance to do increased damage verse undead. (Chance = Value/1000)",
  se_base: "Dmg Mod %",
  se_limit: "Chance",
  se_max: "none"
},
220: {
  effect: "SE_SkillDamageAmount",
  description: "Add flat amount of damage when a specific melee skill is used.",
  se_base: "Amt",
  se_limit: " Skills (-1=ALL)",
  se_max: "none"
},
221: {
  effect: "SE_Packrat",
  description: "+/- item weight reduction by percent.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
222: {
  effect: "SE_BlockBehind",
  description: "Modifies chance to block from behind (+) Increase (-) Decrease",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
223: {
  effect: "SE_DoubleRiposte",
  description: "+/- Chance to do an additional riposte attack (after a successful riposte) [NOT USED ON LIVE]",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
224: {
  effect: "SE_GiveDoubleRiposte",
  description: "+/- Chance to do an additional riposte attack (after a successful riposte) [Only AA uses Limit]",
  se_base: "Chance %",
  se_limit: " Skills  ",
  se_max: "none"
},
225: {
  effect: "SE_GiveDoubleAttack",
  description: "Allows any class to double attack at a set % chance or +/- chance if can innately DA.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
226: {
  effect: "SE_TwoHandBash",
  description: "Bash with a two handed weapon. (This works entirely client side)",
  se_base: "? (1)",
  se_limit: "none",
  se_max: "none"
},
227: {
  effect: "SE_ReduceSkillTimer",
  description: "+/- Reuse time on skill abilities (ie. Kick, Bash, Frenzy)",
  se_base: "Time (seconds)",
  se_limit: " Skills  ",
  se_max: "none"
},
228: {
  effect: "SE_ReduceFallDamage",
  description: "Reduce the damage that you take from falling.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
229: {
  effect: "SE_PersistantCasting",
  description: "Chance to continue casting while stunned.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
230: {
  effect: "SE_ExtendedShielding",
  description: "Increase range of /shield ability.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
231: {
  effect: "SE_StunBashChance",
  description: "Modify chance to land a stun using BASH",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
232: {
  effect: "SE_DivineSave",
  description: "Chance to avoid death.   ",
  se_base: "Chance %",
  se_limit: "Spell ID",
  se_max: "none"
},
233: {
  effect: "SE_Metabolism",
  description: "Modifies food / drink consumption rates.",
  se_base: "Consumption Mod",
  se_limit: "none",
  se_max: "none"
},
234: {
  effect: "SE_ReduceApplyPoisonTime",
  description: "Reduces the time to apply poison",
  se_base: "",
  se_limit: "",
  se_max: ""
},
235: {
  effect: "SE_ChannelChanceSpells",
  description: "+/- Chance to channel a spell (avoid interupt).  [NOT USED ON LIVE]",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
236: {
  effect: "SE_FreePet",
  description: "UKNONW EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
237: {
  effect: "SE_GivePetGroupTarget",
  description: "Pet Affinity, allow owner's pet to receive group buffs.",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
238: {
  effect: "SE_IllusionPersistence",
  description: "Persistence to your illusionions, causing them to last until you die or the illusion is forcibly removed.",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
239: {
  effect: "SE_FeignedCastOnChance",
  description: "Ability gives you an increasing chance for your feigned deaths to not be revealed by spells cast upon you.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
240: {
  effect: "SE_StringUnbreakable",
  description: "Related to above.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
241: {
  effect: "SE_ImprovedReclaimEnergy",
  description: "Modifies amount of mana returned from from SE_ReclaimPet",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
242: {
  effect: "SE_IncreaseChanceMemwipe",
  description: "+/- Chance to successfully memblur target.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
243: {
  effect: "SE_CharmBreakChance",
  description: "Modifies charm break chance.  ",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
244: {
  effect: "SE_RootBreakChance",
  description: "Modifies chance of the casters root breaking.  ",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
245: {
  effect: "SE_TrapCircumvention",
  description: "Decreases the chance that you will set off a trap when opening a chest",
  se_base: "",
  se_limit: "",
  se_max: ""
},
246: {
  effect: "SE_SetBreathLevel",
  description: "Modifies lung capacity.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
247: {
  effect: "SE_RaiseSkillCap",
  description: "Adds skill over the skill cap.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
248: {
  effect: "SE_SecondaryForte",
  description: "Gives you a 2nd specialize skill that can go past 50 to 100.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
249: {
  effect: "SE_SecondaryDmgInc",
  description: "Allows off hand weapon to recieve a damage bonus.",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
250: {
  effect: "SE_SpellProcChance",
  description: "Modify chance to do a proc from a 'proc spell buff''",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
251: {
  effect: "SE_ConsumeProjectile",
  description: "Chance NOT to consume a projectile (archery/throwing).",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
252: {
  effect: "SE_FrontalBackstabChance",
  description: "Chance to perform a full backstab while in front of the target.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
253: {
  effect: "SE_FrontalBackstabMinDmg",
  description: "Allow a frontal backstab for mininum damage.",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
254: {
  effect: "SE_Blank",
  description: "Used as a spacer after last spell effect slot in spell file.",
  se_base: "0",
  se_limit: "none",
  se_max: "none"
},
255: {
  effect: "SE_ShieldDuration",
  description: "Increases duration of /shield",
  se_base: "",
  se_limit: "",
  se_max: ""
},
256: {
  effect: "SE_ShroudofStealth",
  description: "Rogue improved invsible",
  se_base: "",
  se_limit: "",
  se_max: ""
},
257: {
  effect: "SE_PetDiscipline",
  description: "Give owner's pet, et /hold",
  se_base: "",
  se_limit: "",
  se_max: ""
},
258: {
  effect: "SE_TripleBackstab",
  description: "Chance to perform a triple backstab.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
259: {
  effect: "SE_CombatStability",
  description: "+/- AC Soft caps",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
260: {
  effect: "SE_AddSingingMod",
  description: "Add modifiers to bard instruments or singing abilities. (ItemType = Wind, Brass ect).",
  se_base: "Amt",
  se_limit: "ItemType",
  se_max: "none"
},
261: {
  effect: "SE_SongModCap",
  description: "Raises cap of modifiers for bard instrument or singing abilities. [NOT USED ON LIVE]",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
262: {
  effect: "SE_RaiseStatCap",
  description: "+/- stat caps. (Base2=  STR: 0, STA: 1, AGI: 2, DEX: 3, WIS: 4, INT: 5, CHA: 6, MR: 7, CR: 8, FR: 9, PR: 10, DR: 11, COR: 12)",
  se_base: "Amt",
  se_limit: "Stat Type",
  se_max: "Max"
},
263: {
  effect: "SE_TradeSkillMastery",
  description: " Lets you raise more than one tradeskill above master.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
264: {
  effect: "SE_HastenedAASkill",
  description: "Reduces reuse time on AA skills  [Use redux field in aa_actions table for this effect]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
265: {
  effect: "SE_MasteryofPast",
  description: "Spell levels less than the base values level can not be fizzled.",
  se_base: "Level",
  se_limit: "none",
  se_max: "none"
},
266: {
  effect: "SE_ExtraAttackChance",
  description: "Chance to do an extra attack with 2 Handed weapons only.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
267: {
  effect: "SE_PetDiscipline2",
  description: "/pet focus, /pet no cast",
  se_base: "",
  se_limit: "",
  se_max: ""
},
268: {
  effect: "SE_ReduceTradeskillFail",
  description: "Reduces chance to fail with given tradeskill by a percent chance",
  se_base: "",
  se_limit: "",
  se_max: ""
},
269: {
  effect: "SE_MaxBindWound",
  description: "Increase max HP you can bind wound by percent",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
270: {
  effect: "SE_BardSongRange",
  description: "+/- Range of bard beneficial songs.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
271: {
  effect: "SE_BaseMovementSpeed",
  description: "Modifies basemove speed, doesn't stack with other move modfiers (Ie AA - Run 3)",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
272: {
  effect: "SE_CastingLevel2",
  description: "+/- Casting Level' which will determine fizzel rate. ",
  se_base: "Amt ",
  se_limit: "none",
  se_max: "none"
},
273: {
  effect: "SE_CriticalDoTChance",
  description: "Modifies by % chance to critical Damage over time spells  Spell Damage Modifiers",
  se_base: "Crit Chance %",
  se_limit: "none",
  se_max: "none"
},
274: {
  effect: "SE_CriticalHealChance",
  description: "Modifies by % chance to critical heal spell  Heal Modifiers",
  se_base: "Crit Chance %",
  se_limit: "none",
  se_max: "none"
},
275: {
  effect: "SE_CriticalMend",
  description: "Chance to peform a critical mend (Monk Mend ability).",
  se_base: "Crit Chance %",
  se_limit: "none",
  se_max: "none"
},
276: {
  effect: "SE_Ambidexterity",
  description: "Increase chance to duel weild by adding bonus 'duel weild skill' amount.",
  se_base: "Skill Amt",
  se_limit: "none",
  se_max: "none"
},
277: {
  effect: "SE_UnfailingDivinity",
  description: "Gives second chance for SE_DivineSave to fire and if successful gives a modified heal amt.   ",
  se_base: "Heal Modifier",
  se_limit: "none",
  se_max: "none"
},
278: {
  effect: "SE_FinishingBlow",
  description: "Damage done by 'Finishing Blow' ability when proced  (Target < 10% HP)",
  se_base: "Chance (500 = 5%)",
  se_limit: "Amt Dmg",
  se_max: "none"
},
279: {
  effect: "SE_Flurry",
  description: "Chance to do a melee flurry.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
280: {
  effect: "SE_PetFlurry",
  description: "Chance for owner's pet or swarm pet to flurry.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
281: {
  effect: "SE_FeignedMinion",
  description: "Ability allows you to instruct your pet to feign death via the '/pet feign' command. (value = succeed chance)",
  se_base: "Chance %",
  se_limit: "",
  se_max: ""
},
282: {
  effect: "SE_ImprovedBindWound",
  description: "Increase bind wound  healing amount by percent.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
283: {
  effect: "SE_DoubleSpecialAttack",
  description: "Chance to perform second special attack as monk. (ie Flying Kick, Tiger Claw)",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
284: {
  effect: "SE_LoHSetHeal",
  description: "UKNONW EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
285: {
  effect: "SE_NimbleEvasion",
  description: "UKNONW EFFECT",
  se_base: "",
  se_limit: "",
  se_max: ""
},
286: {
  effect: "SE_FcDamageAmt",
  description: "+/- spell damage to casters spell.  Spell Damage Modifiers",
  se_base: "Amt",
  se_limit: "none",
  se_max: "?"
},
287: {
  effect: "SE_SpellDurationIncByTic",
  description: "Increase spell duration by buff tick amount.",
  se_base: "Amt Ticks",
  se_limit: "none",
  se_max: "none"
},
288: {
  effect: "SE_SpecialAttackKBProc",
  description: "Chance to to do a knockback spell proc from special attacks [AA Dragon Punch] (Base Chance = 25%)",
  se_base: "Chance Mod %",
  se_limit: " Skills  ",
  se_max: "none"
},
289: {
  effect: "SE_CastOnFadeEffect",
  description: "Triggers a spell only if fades after the full duration. (Typically on spells that can be cured)",
  se_base: "Spell ID",
  se_limit: "none",
  se_max: "none"
},
290: {
  effect: "SE_IncreaseRunSpeedCap",
  description: "Increase run speed over the run speed cap.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
291: {
  effect: "SE_Purify",
  description: "Chance to dispel all determental effects.   ",
  se_base: "Level Modifier",
  se_limit: "none",
  se_max: "none"
},
292: {
  effect: "SE_StrikeThrough2",
  description: "+/- Strikethrough chance (bypassing an opponent's special defenses, such as dodge, block, parry, and riposte.)",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
293: {
  effect: "SE_FrontalStunResist",
  description: "Chance to resist a stun from BASH/KICK if facing target.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
294: {
  effect: "SE_CriticalSpellChance",
  description: "Mod % chance to critical DD spells AND mod crit spell damage.  Spell Damage Modifiers",
  se_base: "Crit Chance %",
  se_limit: "Crit Damage Mod %",
  se_max: "none"
},
295: {
  effect: "SE_ReduceTimerSpecial",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
296: {
  effect: "SE_FcSpellVulnerability",
  description: "(Debuff/Buff) Modifies spell damage by % on target. Spell Damage Modifiers",
  se_base: "Min %",
  se_limit: "Max %",
  se_max: "none"
},
297: {
  effect: "SE_FcDamageAmtIncoming",
  description: "(Debuff/Buff) Modifies spell/skill damage by flat amount on damage.  Spell Damage Modifiers",
  se_base: "Amt",
  se_limit: "none",
  se_max: "?(0 or=Amt)"
},
298: {
  effect: "SE_ChangeHeight",
  description: "Shrink by percent.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
299: {
  effect: "SE_WakeTheDead",
  description: "Creates swarm pet from corpse's for a set duration (seconds) (Base likely amt pets)",
  se_base: "? (Seen 1 and 3)",
  se_limit: "none",
  se_max: "Duration"
},
300: {
  effect: "SE_Doppelganger",
  description: "Creates swarm pet that is a mirror image of caster",
  se_base: "Amt Pets",
  se_limit: "none",
  se_max: "Duration"
},
301: {
  effect: "SE_ArcheryDamageModifier",
  description: "Modify archery damage by percent.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
302: {
  effect: "SE_FcDamagePctCrit",
  description: "Modifies by % casters base spell damage value (dmg can crit)  Spell Damage Modifiers",
  se_base: "Min %",
  se_limit: "Max %",
  se_max: "none"
},
303: {
  effect: "SE_FcDamageAmtCrit",
  description: "+/- spell damage to casters spell (dmg can crit).  Spell Damage Modifiers",
  se_base: "Amt",
  se_limit: "none",
  se_max: "?"
},
304: {
  effect: "SE_OffhandRiposteFail",
  description: "Chance for target not to riposte an an attack made from your off hand weapon.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
305: {
  effect: "SE_MitigateDamageShield",
  description: "Reduce incomming damage from damage shield using your off hand weapon.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "Max"
},
306: {
  effect: "SE_ArmyOfTheDead",
  description: "This ability calls up to five shades of nearby corpses back to life to serve the necromancer. ",
  se_base: "",
  se_limit: "",
  se_max: ""
},
307: {
  effect: "SE_Appraisal",
  description: "his ability allows you to estimate the selling price of an item you are holding on your cursor.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
308: {
  effect: "SE_SuspendMinion",
  description: "Store a backup pet that can be unsuspended.",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
309: {
  effect: "SE_GateCastersBindPoint",
  description: "Teleports group to casters bind point.          Bind Point ID (1=Primary, 2=Secondary 3=Tertiary)",
  se_base: "Bind Point ID",
  se_limit: "none",
  se_max: "none"
},
310: {
  effect: "SE_ReduceReuseTimer",
  description: "Reduce the reuse timer on disciplines by seconds. (Base value set in milliseconds)",
  se_base: "Amt Time",
  se_limit: "none",
  se_max: "none"
},
311: {
  effect: "SE_LimitCombatSkills",
  description: "Limit to exclude (discs and combat procs = 0) or (spells = 1)",
  se_base: "0/1",
  se_limit: "none",
  se_max: "none"
},
312: {
  effect: "SE_Sanctuary",
  description: "Places caster at bottom of all hate lists, effect fades if caster cast spell on targets other than self.",
  se_base: "? (1)",
  se_limit: "none",
  se_max: "none"
},
313: {
  effect: "SE_ForageAdditionalItems",
  description: "Chance to forage additional items using 'forage' ability.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
314: {
  effect: "SE_Invisibility2",
  description: "Invisibility (Stable) Invisible Level corresponds to what type of see invisible will detect.",
  se_base: "Invisible Level",
  se_limit: "none",
  se_max: "none"
},
315: {
  effect: "SE_InvisVsUndead2",
  description: "Invisibility vs Undead (Stable) Invisible Level corresponds to what type of see invisible will detect.",
  se_base: "Invisible Level",
  se_limit: "none",
  se_max: "none"
},
316: {
  effect: "SE_ImprovedInvisAnimals",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
317: {
  effect: "SE_ItemHPRegenCapIncrease",
  description: "Increase HP regen from items over cap.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
318: {
  effect: "SE_ItemManaRegenCapIncrease",
  description: "Increase Mana regen from items over cap.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
319: {
  effect: "SE_CriticalHealOverTime",
  description: "Modifies % chance to do a critical heal over time  Heal Modifiers",
  se_base: "Crit Chance %",
  se_limit: "none",
  se_max: "none"
},
320: {
  effect: "SE_ShieldBlock",
  description: "Chance to block an attack while shield is equiped.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
321: {
  effect: "SE_ReduceHate",
  description: "+/- Instant hate",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
322: {
  effect: "SE_GateToHomeCity",
  description: "Gate to original starting city.",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
323: {
  effect: "SE_DefensiveProc",
  description: "Add a chance to proc from any incoming melee swing.",
  se_base: "Spell ID",
  se_limit: "Proc Rate Mod",
  se_max: "?"
},
324: {
  effect: "SE_HPToMana",
  description: "Casted spells will use HP instead of Mana with a coversion penalty rate.",
  se_base: "Conversion Rate %",
  se_limit: "none",
  se_max: "none"
},
325: {
  effect: "SE_ChanceInvsBreakToAoE",
  description: "[AA Nerves of Steel] Increasing chance to remain hidden when they are an indirect target of an AoE spell.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
326: {
  effect: "SE_SpellSlotIncrease",
  description: "Increase physical amount of spell slots.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
327: {
  effect: "SE_MysticalAttune",
  description: "Increases max amount of buffs a player can have.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
328: {
  effect: "SE_DelayDeath",
  description: "Increase the amount of HP under zero that can be lost before actual death occurs.",
  se_base: "Amt HP",
  se_limit: "none",
  se_max: "none"
},
329: {
  effect: "SE_ManaAbsorbPercentDamage",
  description: "Reduces incoming damage by % and converts that amount to mana loss.",
  se_base: "Mitigation %",
  se_limit: "none",
  se_max: "none"
},
330: {
  effect: "SE_CriticalDamageMob",
  description: "Modifies damage done from a critical melee hit.",
  se_base: "Dmg Modifier %",
  se_limit: " Skills (-1=ALL)",
  se_max: "none"
},
331: {
  effect: "SE_Salvage",
  description: "Increase chance to salvage from tradeskills by percent.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
332: {
  effect: "SE_SummonToCorpse",
  description: "[AA Call of the Wild] Ressurect spell with no penalty or exp gain (Can still res after).",
  se_base: "?",
  se_limit: "none",
  se_max: "none"
},
333: {
  effect: "SE_CastOnRuneFadeEffect",
  description: "Triggers a spell when a spell with a rune amount is used up and fades.",
  se_base: "Spell ID",
  se_limit: "none",
  se_max: "none"
},
334: {
  effect: "SE_BardAEDot",
  description: "Area of effect damage over time song, damage only done if target is NOT moving.",
  se_base: "Amt +/-",
  se_limit: "none",
  se_max: "none"
},
335: {
  effect: "SE_BlockNextSpellFocus",
  description: "Chance to block next spell that meets the focus limits defined with this effect in it.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
336: {
  effect: "SE_IllusionaryTarget",
  description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
337: {
  effect: "SE_PercentXPIncrease",
  description: "Modify amount of experience gained.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
338: {
  effect: "SE_SummonAndResAllCorpses",
  description: "Summon and ressurect all corpses for 100% exp.",
  se_base: "? (Seen=70)",
  se_limit: "none",
  se_max: "none"
},
339: {
  effect: "SE_TriggerOnCast",
  description: "Cast an additional spell on spell use if the spell casted meets focus limits.",
  se_base: "Chance %",
  se_limit: "Spell ID",
  se_max: "none"
},
340: {
  effect: "SE_SpellTrigger",
  description: "Chance to add an additional spell to the target. (If multiple effects in same spell where % add up to 100, then one effect must fire)",
  se_base: "Chance %",
  se_limit: "Spell ID",
  se_max: "none"
},
341: {
  effect: "SE_ItemAttackCapIncrease",
  description: "Increase the cap to the amount of attack that can gained from items.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
342: {
  effect: "SE_ImmuneFleeing",
  description: "Prevent NPC from fleeing at low health.",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
343: {
  effect: "SE_InterruptCasting",
  description: "Chance to interrupt targets spell casting can be instant or per buff tick.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
344: {
  effect: "SE_ChannelChanceItems",
  description: "Modify chance to successfully channel from item click casts.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
345: {
  effect: "SE_AssassinationLevel",
  description: "Maximum level of target that 'Assassination' will proc on.",
  se_base: "Level",
  se_limit: "none",
  se_max: "none"
},
346: {
  effect: "SE_HeadShotLevel",
  description: "Maximum level of target that 'HeadShot' will proc on.",
  se_base: "Level",
  se_limit: "none",
  se_max: "none"
},
347: {
  effect: "SE_DoubleRangedAttack",
  description: "Chance to perform a double ranged attack (Throw/Archery) will consume projectile.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
348: {
  effect: "SE_LimitManaMin",
  description: "Limit to spells above a minium amount of mana.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
349: {
  effect: "SE_ShieldEquipHateMod",
  description: "Hate modifier to if shield equiped. (Shield Specialist AA) This may not be correct",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
350: {
  effect: "SE_ManaBurn",
  description: "Drains mana for damage/heal at a defined ratio up to a defined maximum amount of mana. Ratio (-)",
  se_base: "Max Mana",
  se_limit: "Mana/HP Ratio / 10",
  se_max: "none"
},
351: {
  effect: "SE_PersistentEffect",
  description: "Aura effects, grants a buff automatically to those within a radius of caster.",
  se_base: "?",
  se_limit: "none",
  se_max: "none"
},
352: {
  effect: "SE_IncreaseTrapCount",
  description: "UKNOWN EFFECT",
  se_base: "",
  se_limit: "",
  se_max: ""
},
353: {
  effect: "SE_AdditionalAura",
  description: "Increase number of aura slots.",
  se_base: "Amt Slots",
  se_limit: "none",
  se_max: "none"
},
354: {
  effect: "SE_DeactivateAllTraps",
  description: "UKNOWN EFFECT",
  se_base: "",
  se_limit: "",
  se_max: ""
},
355: {
  effect: "SE_LearnTrap",
  description: "UKNOWN EFFECT",
  se_base: "",
  se_limit: "",
  se_max: ""
},
356: {
  effect: "SE_ChangeTriggerType",
  description: "UKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
357: {
  effect: "SE_FcMute",
  description: "Chance to silence casting of spells that contain specific spell effects. (Effects determined by focus limits)",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
358: {
  effect: "SE_CurrentManaOnce",
  description: "+/- Instant mana",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
359: {
  effect: "SE_PassiveSenseTrap",
  description: "UKNOWN EFFECT",
  se_base: "",
  se_limit: "",
  se_max: ""
},
360: {
  effect: "SE_ProcOnKillShot",
  description: "Triggers a spell after a kill shot. (Max = Min Level of Target)",
  se_base: "Chance %",
  se_limit: "Spell ID",
  se_max: "Min Level"
},
361: {
  effect: "SE_SpellOnDeath",
  description: "Triggers when the owner of the buff is killed.",
  se_base: "Chance %",
  se_limit: "Spell ID",
  se_max: "none"
},
362: {
  effect: "SE_PotionBeltSlots",
  description: "'Quick Draw' expands the potion belt by one additional available item slot per rank.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
363: {
  effect: "SE_BandolierSlots",
  description: "'Battle Ready' expands the bandolier by one additional save slot per rank.",
  se_base: "",
  se_limit: "",
  se_max: ""
},
364: {
  effect: "SE_TripleAttackChance",
  description: "+/- chance to triple attack.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
365: {
  effect: "SE_ProcOnSpellKillShot",
  description: "Chance to trigger a spell on kill when the kill is caused by the specific spell with this effect in it.",
  se_base: "Chance %",
  se_limit: "Spell ID",
  se_max: "Min Level"
},
366: {
  effect: "SE_ShieldEquipDmgMod",
  description: "Damage modifier to melee if shield equiped. (Shield Specialist AA) This may not be correct",
  se_base: "Amt %",
  se_limit: "?",
  se_max: "none"
},
367: {
  effect: "SE_SetBodyType",
  description: "Change body type of target.",
  se_base: " Body_Types",
  se_limit: "none",
  se_max: "none"
},
368: {
  effect: "SE_FactionMod",
  description: "Increases faction with base1 (faction id, live won't match up w/ ours) by base2.",
  se_base: "Faction ID",
  se_limit: "Faction Mod",
  se_max: "none"
},
369: {
  effect: "SE_CorruptionCounter",
  description: "Determines potency of determental curse spells (+) or potency of cures (-)",
  se_base: "Counter Amt",
  se_limit: "none",
  se_max: "Max"
},
370: {
  effect: "SE_ResistCorruption",
  description: "+/- Corruption Resist",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
371: {
  effect: "SE_AttackSpeed4",
  description: "Stackable slow effect",
  se_base: " Attack Speed",
  se_limit: "none",
  se_max: "Amt Max"
},
372: {
  effect: "SE_ForageSkill",
  description: "",
  se_base: "",
  se_limit: "",
  se_max: ""
},
373: {
  effect: "SE_CastOnFadeEffectAlways",
  description: "Triggers a spell when buff fades after natural duration OR from rune/numhits fades.",
  se_base: "Spell ID",
  se_limit: "none",
  se_max: "none"
},
374: {
  effect: "SE_ApplyEffect",
  description: "Chance to add an additional spell to the target.",
  se_base: "Chance %",
  se_limit: "Spell ID",
  se_max: "none"
},
375: {
  effect: "SE_DotCritDmgIncrease",
  description: "Modifies by % critical dot damage.  Spell Damage Modifiers",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
376: {
  effect: "SE_Fling",
  description: "UNKNOWN EFFECT",
  se_base: "?",
  se_limit: "?",
  se_max: "none"
},
377: {
  effect: "SE_CastOnFadeEffectNPC",
  description: "Triggers a spell when buff fades after natural duration. (On live these are in player spells cast on NPCs)",
  se_base: "Spell ID",
  se_limit: "none",
  se_max: "none"
},
378: {
  effect: "SE_SpellEffectResistChance",
  description: "Chance to resist a specific spell effect type (Ie. 5% chance to Resist DD spells)",
  se_base: "% Chance",
  se_limit: "Spell Effect ID",
  se_max: "none"
},
379: {
  effect: "SE_ShadowStepDirectional",
  description: "Push forward for specific amount of units. (Handled client side)",
  se_base: "Distance Units",
  se_limit: "none",
  se_max: "none"
},
380: {
  effect: "SE_Knockdown",
  description: "Push back and up effect. (Handled client side)",
  se_base: "Push Back",
  se_limit: "Push Up",
  se_max: "none"
},
381: {
  effect: "SE_KnockTowardCaster",
  description: "Summon a player to caster at a set distance away from caster. (Uses a reverse knockback effect)",
  se_base: "Distance Units",
  se_limit: "none",
  se_max: "none"
},
382: {
  effect: "SE_NegateSpellEffect",
  description: "Completely remove a specified spell effect bonus. (Ie. Remove all Aggro bonus)",
  se_base: "?",
  se_limit: "Spell Effect ID",
  se_max: "none"
},
383: {
  effect: "SE_SympatheticProc",
  description: "Chance to proc a a spell off of a regularly casted spell. (Typically found as item focus)",
  se_base: "Chance Mod",
  se_limit: "Spell ID",
  se_max: "none "
},
384: {
  effect: "SE_Leap",
  description: "Jump toward your target.",
  se_base: "Distance",
  se_limit: "none",
  se_max: "none"
},
385: {
  effect: "SE_LimitSpellGroup",
  description: "Limit focus effects by spell group. (spellgroup field in spells_new) (+) Include (-) Exclude",
  se_base: "Spellgroup ID",
  se_limit: "none",
  se_max: "none"
},
386: {
  effect: "SE_CastOnCurer",
  description: "Trigger a spell on yourself when you cure a target.",
  se_base: "Spell ID",
  se_limit: "none",
  se_max: "none"
},
387: {
  effect: "SE_CastOnCure",
  description: "Trigger a spell on yourself when you are cured.",
  se_base: "Spell ID",
  se_limit: "none",
  se_max: "none"
},
388: {
  effect: "SE_SummonCorpseZone",
  description: "Summon a corpse from any zone.",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
389: {
  effect: "SE_FcTimerRefresh",
  description: "Reset recast timers (ungrey spell gems)",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
390: {
  effect: "SE_FcTimerLockout",
  description: "Increase time on reset timer.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
391: {
  effect: "SE_MeleeVulnerability",
  description: "+/- melee mitigation (+) weakness (-) mitigation (Live SPA defined SE_LimitManaMax is not correct)",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
392: {
  effect: "SE_FcHealAmt",
  description: "+/- flat amount to casters heal spells  Heal Modifiers",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
393: {
  effect: "SE_FcHealPctIncoming",
  description: "(Buff/Debuff) Modfies by % the casters base heal value for incomming spells.  Heal Modifiers",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
394: {
  effect: "SE_FcHealAmtIncoming",
  description: "(Buff/Debuff) +/- flat amount the casters base heal value for incomming spells. Heal Modifiers",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
395: {
  effect: "SE_FcHealPctCritIncoming",
  description: "(Buff/Debuff) Modifies by % chance to receive a critical heal on incomming spells.  Heal Modifiers",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
396: {
  effect: "SE_FcHealAmtCrit",
  description: "+/- flat amount to casters heal spells (amt can critical)  Heal Modifiers",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
397: {
  effect: "SE_PetMeleeMitigation",
  description: "+/- AC to owner's pet.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
398: {
  effect: "SE_SwarmPetDuration",
  description: "Increases duration of swarm pets by seconds. (Base value set in miliseconds)",
  se_base: "Time",
  se_limit: "none",
  se_max: "none"
},
399: {
  effect: "SE_FcTwincast",
  description: "Chance to cast the same spell 2x from a single cast.",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
400: {
  effect: "SE_HealGroupFromMana",
  description: "Group heal, drains mana from caster and coverts that to the amount of HP healed at a defined ratio.",
  se_base: "Max Mana Drain",
  se_limit: "Mana/HP Ratio / 10",
  se_max: "none"
},
401: {
  effect: "SE_ManaDrainWithDmg",
  description: "Drains targets mana and decreases hit points based on a defined ratio of hp/mana drained.",
  se_base: "Max Mana Drained",
  se_limit: "HP/Mana Ratio / 10",
  se_max: "Max ?"
},
402: {
  effect: "SE_EndDrainWithDmg",
  description: "Drains targets endurance and decreases hit points based on a defined ratio of hp/endur drained.",
  se_base: "Max Endur Drained",
  se_limit: "HP/Endur Ratio / 10",
  se_max: "none"
},
403: {
  effect: "SE_LimitSpellClass",
  description: "Limits to specific types of spell categories. (3=Cures,3=Offensive, 6=Lifetap) (+) Include (-) Exclude",
  se_base: "Category",
  se_limit: "none",
  se_max: "none"
},
404: {
  effect: "SE_LimitSpellSubclass",
  description: "Limits to specific types of spell categories. (UNDEFINED) (+) Include (-) Exclude",
  se_base: "Category",
  se_limit: "none",
  se_max: "none"
},
405: {
  effect: "SE_TwoHandBluntBlock",
  description: "Modifies chance to block if 2 Hand Blunt equiped (+) Increase (-) Decrease",
  se_base: "Chance %",
  se_limit: "none",
  se_max: "none"
},
406: {
  effect: "SE_CastonNumHitFade",
  description: "Triggers a spell when a spells numhit counter is depleted.",
  se_base: "Spell ID",
  se_limit: "none",
  se_max: "none"
},
407: {
  effect: "SE_CastonFocusEffect",
  description: "Triggers a spell if focus limits are met (ie Triggers when a focus effects is applied)",
  se_base: "Spell ID",
  se_limit: "none",
  se_max: "noen"
},
408: {
  effect: "SE_LimitHPPercent",
  description: "Caps maximum HP to % or a defined amount, which ever is lowest.",
  se_base: "Cap %",
  se_limit: "Cap Amt",
  se_max: "none"
},
409: {
  effect: "SE_LimitManaPercent",
  description: "Caps maximum Mana to % or a defined amount, which ever is lowest.",
  se_base: "Cap %",
  se_limit: "Cap Amt",
  se_max: "none"
},
410: {
  effect: "SE_LimitEndPercent",
  description: "Caps maximum Endurance to % or a defined amount, which ever is lowest.",
  se_base: "Cap %",
  se_limit: "Cap Amt",
  se_max: "none"
},
411: {
  effect: "SE_LimitClass",
  description: "Limits to spells of a certain player class (Uses Bitmask, the class value in spell dbase is 1 bitmask higher in relation to item class value)",
  se_base: "Class Bitmask",
  se_limit: "none",
  se_max: "none"
},
412: {
  effect: "SE_LimitRace",
  description: "Limits to spells cast by a certain race [NOT USED ON LIVE]",
  se_base: "Race ID",
  se_limit: "none",
  se_max: "none"
},
413: {
  effect: "SE_FcBaseEffects",
  description: "Modifies base values of certain spell effects.    Partially implemented",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
414: {
  effect: "SE_LimitCastingSkill",
  description: "Limit to spells that use a specific casting skill. (skill field in spells new) (+) Include (-) Exclude",
  se_base: " Skills",
  se_limit: "none",
  se_max: "none"
},
415: {
  effect: "SE_FFItemClass",
  description: "UKNOWN EFFECT [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
416: {
  effect: "SE_ACv2",
  description: "+/- AC (stacks with other AC buffs)",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max"
},
417: {
  effect: "SE_ManaRegen_v2",
  description: "+/- mana regen (stacks with other mana regen buffs)",
  se_base: "Amt",
  se_limit: "none",
  se_max: "Max"
},
418: {
  effect: "SE_SkillDamageAmount2",
  description: "Add flat amount of damage when a specific melee skill is used.",
  se_base: "Amt",
  se_limit: " Skills (-1=ALL)",
  se_max: "none"
},
419: {
  effect: "SE_AddMeleeProc",
  description: "Add melee proc",
  se_base: "Proc Spell ID",
  se_limit: "Rate Modifier",
  se_max: "none"
},
420: {
  effect: "SE_FcLimitUse",
  description: "Increase numhits count by percent. [Custom] [NOT USED ON LIVE]",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
421: {
  effect: "SE_FcIncreaseNumHits",
  description: "Increase numhits count by flat amount.",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
422: {
  effect: "SE_LimitUseMin",
  description: "Limit to spells with a minimum number of numhit counters.  [Custom] [NOT USED ON LIVE]",
  se_base: "Amt",
  se_limit: "none",
  se_max: "none"
},
423: {
  effect: "SE_LimitUseType",
  description: "Limit to spells by  Numhit_Types  [Custom] [NOT USED ON LIVE]",
  se_base: " Numhit_Types",
  se_limit: "none",
  se_max: "none"
},
424: {
  effect: "SE_GravityEffect",
  description: "Pulls target(s) toward caster at a set pace to a specific distance away from caster.",
  se_base: "Distance From Caster",
  se_limit: "Force of Pull",
  se_max: "none"
},
425: {
  effect: "SE_Display",
  description: "Gives illusion flying dragon (unclear how this works)",
  se_base: "1",
  se_limit: "none",
  se_max: "none"
},
426: {
  effect: "SE_IncreaseExtTargetWindow",
  description: "Increases the capacity of your extended target window",
  se_base: "",
  se_limit: "",
  se_max: ""
},
427: {
  effect: "SE_SkillProc",
  description: "Chance to proc a spell when using a specific skill (ie Proc from a Taunt or Kick).",
  se_base: "Spell ID",
  se_limit: "Rate Modifier",
  se_max: "none"
},
428: {
  effect: "SE_LimitToSkill",
  description: "Limits what skill will effect a SkillProc. (Always place as next effect after ID 427/429)",
  se_base: " Skills  ",
  se_limit: "none",
  se_max: "none"
},
429: {
  effect: "SE_SkillProcSuccess",
  description: "Chance to proc a spell when using a specific skill if it successfully hits the target.",
  se_base: "Spell ID",
  se_limit: "Rate Modifier",
  se_max: "none"
},
430: {
  effect: "SE_PostEffect",
  description: "Alter vision ? UNKNOWN EFFECT",
  se_base: "?",
  se_limit: "?",
  se_max: "?"
},
431: {
  effect: "SE_PostEffectData",
  description: "Tint vision ? UNKNOWN EFFECT",
  se_base: "RGB",
  se_limit: "?",
  se_max: "?"
},
432: {
  effect: "SE_ExpandMaxActiveTrophyBen",
  description: "UKNOWN EFFECTâ€‹ [NOT USED ON LIVE]",
  se_base: "",
  se_limit: "",
  se_max: ""
},
433: {
  effect: "SE_CriticalDotDecay",
  description: "Chance to critical DoT with effect depreciation.  Spell Damage Modifiers (Removed from live 7-14 ?)",
  se_base: "Chance %",
  se_limit: "Decay %",
  se_max: "Max Level"
},
434: {
  effect: "SE_CriticalHealDecay",
  description: "Chance to critical Heal with effect depreciation.  Heal Modifiers (Removed from live 7-14 ?)",
  se_base: "Chance %",
  se_limit: "Decay %",
  se_max: "Max Level"
},
435: {
  effect: "SE_CriticalRegenDecay",
  description: "Chance to critical Regen with effect depreciation.  Heal Modifiers (Removed from live 7-14 ?)",
  se_base: "Chance %",
  se_limit: "Decay %",
  se_max: "Max Level"
},
436: {
  effect: "SE_BeneficialCountDownHold",
  description: "UKNOWN EFFECTâ€‹",
  se_base: "",
  se_limit: "",
  se_max: ""
},
437: {
  effect: "SE_TeleporttoAnchor",
  description: "Teleport Guild Hall Anchor",
  se_base: "?",
  se_limit: "none",
  se_max: "none"
},
438: {
  effect: "SE_TranslocatetoAnchor",
  description: "Translocate Primary Anchor",
  se_base: "?",
  se_limit: "none",
  se_max: "none"
},
439: {
  effect: "SE_Assassination",
  description: "Damage done by 'Assassination' ability when proced  (Humaniod target hit w/ Backstab)",
  se_base: "? (0)",
  se_limit: "Amt Dmg",
  se_max: "none"
},
440: {
  effect: "SE_FinishingBlowLvl",
  description: "Maximum level of target that 'Finishing Blow' will proc on.",
  se_base: "Level",
  se_limit: "? (Seen 200)",
  se_max: "none"
},
441: {
  effect: "SE_DistanceRemoval",
  description: "Fades buff if owner of buff moves specified amount of distance from location where buff was applied.",
  se_base: "Distance",
  se_limit: "none",
  se_max: "none"
},
442: {
  effect: "SE_TriggerOnReqTarget",
  description: "Triggers a spell on target when a specific condition is met on that target. Buff fades after trigger.",
  se_base: "Spell ID",
  se_limit: " Target Condition",
  se_max: "none"
},
443: {
  effect: "SE_TriggerOnReqCaster",
  description: "Triggers a spell on target when a specific condition is met on that target. Buff fades after trigger. (All spells that use this are self only)",
  se_base: "Spell ID",
  se_limit: " Target Condition",
  se_max: "none"
},
444: {
  effect: "SE_ImprovedTaunt",
  description: "Locks aggro on caster and decreases other players aggro by % up to a specified level.",
  se_base: "Max level",
  se_limit: "Aggro Mod",
  se_max: "none"
},
445: {
  effect: "SE_AddMercSlot",
  description: "[AA Hero's Barracks] Allows you to conscript additional mercs.",
  se_base: "Amt ?",
  se_limit: "none",
  se_max: "none"
},
446: {
  effect: "SE_AStacker",
  description: "Buff stacking blocker  Buff Stacking",
  se_base: "Stacking Priority",
  se_limit: "none",
  se_max: "none"
},
447: {
  effect: "SE_BStacker",
  description: "Buff stacking blocker  Buff Stacking",
  se_base: "Stacking Priority",
  se_limit: "none",
  se_max: "none"
},
448: {
  effect: "SE_CStacker",
  description: "Buff stacking blocker  Buff Stacking",
  se_base: "Stacking Priority",
  se_limit: "none",
  se_max: "none"
},
449: {
  effect: "SE_DStacker",
  description: "Buff stacking blocker  Buff Stacking",
  se_base: "Stacking Priority",
  se_limit: "none",
  se_max: "none"
},
450: {
  effect: "SE_MitigateDotDamage",
  description: "Reduces incomming dotl damage by % up to a max value.",
  se_base: "Mitigation %",
  se_limit: "Max Amt Reduced",
  se_max: "Rune Amt"
},
451: {
  effect: "SE_MeleeThresholdGuard",
  description: "Partial Melee Rune that only is lowered if melee hits are over a defined amount (limit) of damage",
  se_base: "Mitigation %",
  se_limit: "Min Hit",
  se_max: "Rune Amt"
},
452: {
  effect: "SE_SpellThresholdGuard",
  description: "Partial Spell Rune that only is lowered if spell dmg is over a defined amount (limit) of damage",
  se_base: "Mitigation %",
  se_limit: "Min Hit",
  se_max: "Rune Amt"
},
453: {
  effect: "SE_TriggerMeleeThreshold",
  description: "Trigger spell when specified amount of melee damage is taken in a single hit, then fade buff.",
  se_base: "Spell ID",
  se_limit: "Damage Amt",
  se_max: "none"
},
454: {
  effect: "SE_TriggerSpellThreshold",
  description: "Trigger spell when specified amount of spell damage is taken in a single hit, then fade buff.",
  se_base: "Spell ID",
  se_limit: "Damage Amt",
  se_max: "none"
},
455: {
  effect: "SE_AddHatePct",
  description: "Modifies amount of hate you have on target by percent over instantly,",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
456: {
  effect: "SE_AddHateOverTimePct",
  description: "Modifies amount of hate you have on target by percent over time,",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
457: {
  effect: "SE_ResourceTap",
  description: "Coverts a percent of spell dmg from dmg spells (DD/DOT) to hp/mana/end.",
  se_base: "% Coversion",
  se_limit: "0=H/1=M/2=E",
  se_max: "Max Amt"
},
458: {
  effect: "SE_FactionModPct",
  description: "Modifies faction gains and losses by percent.",
  se_base: "Amt %",
  se_limit: "none",
  se_max: "none"
},
459: {
  effect: "SE_DamageModifier2",
  description: "Modifies damage amount by percent for a specific skill.",
  se_base: "Amt %",
  se_limit: " Skills (-1=ALL)",
  se_max: "none"
}}

export const SPELL_EFFECTS_ARRAY = [
  {
    value: 0,
    label: "SE_CurrentHP",
    description: "Direct Damage/Healing, duration allows for HoT/DoT",
    se_base: "Amt (-)DD(+)Heal",
    se_limit: " Target Restrictions",
    se_max: "Max Amt"
  },
  {
    value: 1,
    label: "SE_ArmorClass",
    description: "+/- AC",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 2,
    label: "SE_ATK",
    description: "+/- ATK",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 3,
    label: "SE_MovementSpeed",
    description: "+/- Movement Speed",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 4,
    label: "SE_STR",
    description: "+/- STR",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 5,
    label: "SE_DEX",
    description: "+/- DEX",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 6,
    label: "SE_AGI",
    description: "+/- AGI",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 7,
    label: "SE_STA",
    description: "+/- STA",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 8,
    label: "SE_INT",
    description: "+/- INT",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 9,
    label: "SE_WIS",
    description: "+/- WIS",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 10,
    label: "SE_CHA",
    description: "+/- CHA (BLANK SPACER if 0 in spell effect)",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 11,
    label: "SE_AttackSpeed",
    description: ">100/<100 Attack Speed (standard 'haste or 'slow'')",
    se_base: " Attack Speed",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 12,
    label: "SE_Invisibility",
    description: "Invisibility (Unstable) Invisible Level corresponds to what type of see invisible will detect.",
    se_base: "Invisible Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 13,
    label: "SE_SeeInvis",
    description: "See Invisibility Invisible Lv (1) = Standard invsibile ",
    se_base: "Invisible Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 14,
    label: "SE_WaterBreathing",
    description: "Immune to drowning",
    se_base: "? (Seen from 1 - 3)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 15,
    label: "SE_CurrentMana",
    description: "Direct +/- mana, duration allows for mana over time",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 16,
    label: "SE_NPCFrenzy",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 17,
    label: "SE_NPCAwareness",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 18,
    label: "SE_Lull",
    description: "Seen in conjunction with SE_ChangeFrenzyRad and SE_Harmony, this effect does nothing alone.",
    se_base: "0",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 19,
    label: "SE_AddFaction",
    description: "Adjusts NPC 'con' (Alliance spell line)",
    se_base: "Faction Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 20,
    label: "SE_Blind",
    description: "Turn PC screen blank, causes NPC to flee if NOT in melee range",
    se_base: "? (Usually -1/1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 21,
    label: "SE_Stun",
    description: "Stun for a duration",
    se_base: "Stun Time",
    se_limit: "? (Always <= Base)",
    se_max: "Max Level"
  },
  {
    value: 22,
    label: "SE_Charm",
    description: "Control an NPC/Player for a duration.",
    se_base: "?",
    se_limit: "none",
    se_max: "Max Level"
  },
  {
    value: 23,
    label: "SE_Fear",
    description: "Cause your target to flee.",
    se_base: "?",
    se_limit: "none",
    se_max: "Max Level"
  },
  {
    value: 24,
    label: "SE_Stamina",
    description: "Increased stamina (yellow bar) 'Invigor'  - ? Current Effect (Does not raise endurance on live)",
    se_base: "? (Always Negative)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 25,
    label: "SE_BindAffinity",
    description: "Sets Bind point. Bind Point ID (1=Primary, 2=Secondary 3=Tertiary) ",
    se_base: "Bind Point ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 26,
    label: "SE_Gate",
    description: "Transport to Bind point. Bind Point ID (1=Primary, 2=Secondary 3=Tertiary) ",
    se_base: "Success Chance",
    se_limit: "Bind Point ID",
    se_max: "none"
  },
  {
    value: 27,
    label: "SE_CancelMagic",
    description: "Chance to remove any buff effect.",
    se_base: "Level Modifier",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 28,
    label: "SE_InvisVsUndead",
    description: "Invisiblity vs Undead (Unstable) (Only Invisiblity Level (1) exists)",
    se_base: "Invisible Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 29,
    label: "SE_InvisVsAnimals",
    description: "Invisiblity vs Animal (Unstable) (Only Invisiblity Level (1) exists)",
    se_base: "Invisible Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 30,
    label: "SE_ChangeFrenzyRad",
    description: "Sets NPC Aggro Radius to the value of the spell effect",
    se_base: "Aggro Radius",
    se_limit: "none",
    se_max: "Max Level"
  },
  {
    value: 31,
    label: "SE_Mez",
    description: "Stuns target till duration ends or broken (melee/spell dmg)",
    se_base: "Stacking Value",
    se_limit: "none",
    se_max: "Max Level"
  },
  {
    value: 32,
    label: "SE_SummonItem",
    description: "Summon an item.",
    se_base: "Item ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 33,
    label: "SE_SummonPet",
    description: "Summon Pet ('Teleport Zone' Field in spells_new table contains name of pet)",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 34,
    label: "SE_Confuse",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 35,
    label: "SE_DiseaseCounter",
    description: "Determines potency of determental disease spells (+) or potency of cures (-)",
    se_base: "Counter Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 36,
    label: "SE_PoisonCounter",
    description: "Determines potency of determental poision spells (+) or potency of cures (-)",
    se_base: "Counter Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 37,
    label: "SE_DetectHostile",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 38,
    label: "SE_DetectMagic",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 39,
    label: "SE_DetectPoison",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 40,
    label: "SE_DivineAura",
    description: "Invulnerable to spells and melee, you can not cast or melee while under this effect.",
    se_base: "? (Usually 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 41,
    label: "SE_Destroy",
    description: "Instantly kill target",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 42,
    label: "SE_ShadowStep",
    description: "Warps player a short distance in a random direction",
    se_base: "? (Usually 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 43,
    label: "SE_Berserk",
    description: "Sets client as 'Berserk' allowing for chance to crippling blow. [Custom] [NOT USED ON LIVE]",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 44,
    label: "SE_Lycanthropy",
    description: "Used as a place holder effect for preventing certain buffs from stacking",
    se_base: "Stacking Value",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 45,
    label: "SE_Vampirism",
    description: "Heals you for a percent of your melee damage done to target. [Custom] [NOT USED ON LIVE]",
    se_base: "Amt % (+/-)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 46,
    label: "SE_ResistFire",
    description: "+/- Fire Resist",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 47,
    label: "SE_ResistCold",
    description: "+/- Cold Resist",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 48,
    label: "SE_ResistPoison",
    description: "+/- Poison Resist",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 49,
    label: "SE_ResistDisease",
    description: "+/- Disease Resist",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 50,
    label: "SE_ResistMagic",
    description: "+/- Magic Resist",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 51,
    label: "SE_DetectTraps",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 52,
    label: "SE_SenseDead",
    description: "Point player in direction of nearest Undead NPC",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "?"
  },
  {
    value: 53,
    label: "SE_SenseSummoned",
    description: "Point player in direction of nearest Summoned NPC",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 54,
    label: "SE_SenseAnimals",
    description: "Point player in direction of nearest Animal NPC",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 55,
    label: "SE_Rune",
    description: "Absorb melee damage until a maxium amount then fades",
    se_base: "Rune Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 56,
    label: "SE_TrueNorth",
    description: "Point player in North direction.",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 57,
    label: "SE_Levitate",
    description: "Levitation (Take no fall damage)",
    se_base: "? (Usually 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 58,
    label: "SE_Illusion",
    description: "Changes visual race of target",
    se_base: "Race ID (-1=Gender)",
    se_limit: "Texture ID",
    se_max: "Helm ID"
  },
  {
    value: 59,
    label: "SE_DamageShield",
    description: "Damage taken upon successful melee hit",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 60,
    label: "SE_TransferItem",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 61,
    label: "SE_Identify",
    description: "Displays in text the 'lore' field from the items table",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 62,
    label: "SE_ItemID",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 63,
    label: "SE_WipeHateList",
    description: "Chance to wipe the NPC's hatelist",
    se_base: "Success Chance",
    se_limit: "none",
    se_max: "Max Chance"
  },
  {
    value: 64,
    label: "SE_SpinTarget",
    description: "Spins Target and stuns",
    se_base: "Spin Duration",
    se_limit: "? (Always <= base)",
    se_max: "Max Level"
  },
  {
    value: 65,
    label: "SE_InfraVision",
    description: "Improved night vision",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 66,
    label: "SE_UltraVision",
    description: "Better improved night vision",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 67,
    label: "SE_EyeOfZomm",
    description: "Transfers your vision and control to a temporary NPC",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 68,
    label: "SE_ReclaimPet",
    description: "Kills your pet in exchange for mana. (Returns 75% of pet spell actual mana cost)",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 69,
    label: "SE_TotalHP",
    description: "Increases Max HP (standard 'HP Buffs')",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 70,
    label: "SE_CorpseBomb",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 71,
    label: "SE_NecPet",
    description: "Summon Pet ('Teleport Zone' Field in spells_new table contains name of pet)",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 72,
    label: "SE_PreserveCorpse",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 73,
    label: "SE_BindSight",
    description: "See from the perspective of the target that this is cast on.",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 74,
    label: "SE_FeignDeath",
    description: "Fall to the ground and clear hate list",
    se_base: "Success Chance",
    se_limit: "? (usually 0)",
    se_max: "Max Chance"
  },
  {
    value: 75,
    label: "SE_VoiceGraft",
    description: "Speak through your pet",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 76,
    label: "SE_Sentinel",
    description: "Creates a proximity zone where cast that alerts caster if NPC's or Players enter it.",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 77,
    label: "SE_LocateCorpse",
    description: "Turn player in direction of targeted players corpse",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 78,
    label: "SE_AbsorbMagicAtt",
    description: "'Spell Rune' Absorb spell damage until a maxium amount then fades",
    se_base: "Rune Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 79,
    label: "SE_CurrentHPOnce",
    description: "Direct Damage/Healing ",
    se_base: "Amt (-)DD(+)Heal",
    se_limit: " Target Restrictions",
    se_max: "Max Amt"
  },
  {
    value: 80,
    label: "SE_EnchantLight",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 81,
    label: "SE_Revive",
    description: "When cast on corpse restore experience and teleports player to corpse",
    se_base: "Exp Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 82,
    label: "SE_SummonPC",
    description: "Summon a player to caster",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 83,
    label: "SE_Teleport",
    description: "Teleport Group to defined location.    (Corridinates base1=x base2=y base3=z base4=h)",
    se_base: "Coordinates",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 84,
    label: "SE_TossUp",
    description: "Shoots player into the air.",
    se_base: "Dist, (Always Neg)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 85,
    label: "SE_WeaponProc",
    description: "Add melee proc",
    se_base: "Proc Spell ID",
    se_limit: "Rate Modifier",
    se_max: "none"
  },
  {
    value: 86,
    label: "SE_Harmony",
    description: "Set NPC assist radius to spells value.  Mechanics",
    se_base: "Assist Radius",
    se_limit: "none",
    se_max: "Max Level"
  },
  {
    value: 87,
    label: "SE_MagnifyVision",
    description: "Zoom players vision",
    se_base: "Magnify Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 88,
    label: "SE_Succor",
    description: "Teleport Group/Self to defined location or to safe point in zone (2% fail rate)",
    se_base: "Coord. (-1 = Safe)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 89,
    label: "SE_ModelSize",
    description: "Change size by percent (grow/shrink)",
    se_base: "Percent",
    se_limit: "?",
    se_max: "?"
  },
  {
    value: 90,
    label: "SE_Cloak",
    description: "Invisibility",
    se_base: "Invisibile Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 91,
    label: "SE_SummonCorpse",
    description: "Summon targets corpse to caster.",
    se_base: "Target Level Max",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 92,
    label: "SE_InstantHate",
    description: "Adds/Removes set amount of your 'hate' instantly from target",
    se_base: "Hate Amt",
    se_limit: "none",
    se_max: "?Always(+)"
  },
  {
    value: 93,
    label: "SE_StopRain",
    description: "Stops zone weather related rain",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 94,
    label: "SE_NegateIfCombat",
    description: "Removes buff if player casts or does any combat skill",
    se_base: "? (Usually 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 95,
    label: "SE_Sacrifice",
    description: "Kills player and creates 'Essence Emerald', corpse can not be rezed",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 96,
    label: "SE_Silence",
    description: "Prevents spell casting",
    se_base: "? (Usually 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 97,
    label: "SE_ManaPool",
    description: "Increase/Decrease max mana pool",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 98,
    label: "SE_AttackSpeed2",
    description: "Stackable Haste/Slow that does not go over haste cap",
    se_base: " Attack Speed",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 99,
    label: "SE_Root",
    description: "Immobilizes target.  Mechanics",
    se_base: "? (Usually -10000)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 100,
    label: "SE_HealOverTime",
    description: "Heal over time (will stack with an HoT from SE_CurrentHP)",
    se_base: "Amt",
    se_limit: " Target Restrictions",
    se_max: "Max Amt"
  },
  {
    value: 101,
    label: "SE_CompleteHeal",
    description: "Heal for '7500' HP with a buff icon that blocks the same effect from taking hold.",
    se_base: "Heal Multiplier (?)",
    se_limit: "none",
    se_max: "?"
  },
  {
    value: 102,
    label: "SE_Fearless",
    description: "Immune to fear effect",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "?"
  },
  {
    value: 103,
    label: "SE_CallPet",
    description: "Summon pet to owner",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "?"
  },
  {
    value: 104,
    label: "SE_Translocate",
    description: "Creates a confirmation box to teleport player to location of bind point",
    se_base: "Corridinates/Bind ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 105,
    label: "SE_AntiGate",
    description: "Prevent the use of gate spells.  (Base is likely the # of Bind Point ID's it can block)",
    se_base: "? (Seen 1 - 3)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 106,
    label: "SE_SummonBSTPet",
    description: "Summon Pet                  ('Teleport Zone' Field in spells_new table contains name of pet)",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 107,
    label: "SE_AlterNPCLevel",
    description: "+/- to NPC level, will revert to base line when effect fades. [Custom] [NOT USED ON LIVE]",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 108,
    label: "SE_Familiar",
    description: "Summon Pet                  ('Teleport Zone' Field in spells_new table contains name of pet)",
    se_base: "? (Usually 0)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 109,
    label: "SE_SummonItemIntoBag",
    description: "If first effect is (SE_SummonItem) and item is bag, this will place items into bag",
    se_base: "Item ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 110,
    label: "SE_IncreaseArchery",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 111,
    label: "SE_ResistAll",
    description: "+/- all resist values",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 112,
    label: "SE_CastingLevel",
    description: "+/- 'Casting Level' which will determine fizzel rate",
    se_base: "Amt",
    se_limit: "none",
    se_max: "?(Usually 0)"
  },
  {
    value: 113,
    label: "SE_SummonHorse",
    description: "Summon a mount",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 114,
    label: "SE_ChangeAggro",
    description: "+/- Percent modifier to spell and melee hate",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 115,
    label: "SE_Hunger",
    description: "Prevents hunger/thirst checks (Ie. You shouldn't need food/drink with this effect)",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 116,
    label: "SE_CurseCounter",
    description: "Determines potency of determental curse spells (+) or potency of cures (-)",
    se_base: "Counter Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 117,
    label: "SE_MagicWeapon",
    description: "Allows non-magic weapons to be considered 'magical'",
    se_base: "? (Always 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 118,
    label: "SE_Amplification",
    description: "Increase modifier from singing skill",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 119,
    label: "SE_AttackSpeed3",
    description: "Stackable Haste/Slow does go over haste cap.",
    se_base: " Attack Speed",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 120,
    label: "SE_HealRate",
    description: "+/- Modfies by % the casters base heal value for incomming spells.   Heal Modifiers",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 121,
    label: "SE_ReverseDS",
    description: "Damage/Heal on entity with effect every time entity does a melee hit.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 122,
    label: "SE_ReduceSkill",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 123,
    label: "SE_Screech",
    description: "Spell Blocker (If have buff with value of +1 will block any spell w/ Screech w/ -1 value)  Buff Stacking",
    se_base: "Value (usually 1/-1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 124,
    label: "SE_ImprovedDamage",
    description: "Modifies by % casters base spell damage value  Spell Damage Modifiers",
    se_base: "Min %",
    se_limit: "Max %",
    se_max: "none"
  },
  {
    value: 125,
    label: "SE_ImprovedHeal",
    description: "Modifies by % the casters base heal value  Heal Modifiers",
    se_base: "Min %",
    se_limit: "Max %",
    se_max: "none"
  },
  {
    value: 126,
    label: "SE_SpellResistReduction",
    description: "Modifies by % chance for casters spell resist rate.",
    se_base: "Min %",
    se_limit: "Max %",
    se_max: "none"
  },
  {
    value: 127,
    label: "SE_IncreaseSpellHaste",
    description: "Modifies by % spell casting time.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 128,
    label: "SE_IncreaseSpellDuration",
    description: "Modifies by % buff duration.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 129,
    label: "SE_IncreaseRange",
    description: "Modifies by % spell casting range.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 130,
    label: "SE_SpellHateMod",
    description: "Modifies by % hate from spells/abilities.",
    se_base: "Min %",
    se_limit: "Max %",
    se_max: "none"
  },
  {
    value: 131,
    label: "SE_ReduceReagentCost",
    description: "Modifies by % chance not use a reagent.",
    se_base: "Min %",
    se_limit: "Max %",
    se_max: "none"
  },
  {
    value: 132,
    label: "SE_ReduceManaCost",
    description: "Modifies by % spell mana cost.",
    se_base: "Min %",
    se_limit: "Max %",
    se_max: "none"
  },
  {
    value: 133,
    label: "SE_FcStunTimeMod",
    description: "Modifies by % stun duration. [Custom] [NOT USED ON LIVE]",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 134,
    label: "SE_LimitMaxLevel",
    description: "Limit to Max Level (% decrease is amount lost if over cap)",
    se_base: "Max Level",
    se_limit: "% Decrease",
    se_max: "none"
  },
  {
    value: 135,
    label: "SE_LimitResist",
    description: "Limit to Resist Types, (+) Include (-) Exclude",
    se_base: " Resist Types",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 136,
    label: "SE_LimitTarget",
    description: "Limit to Target Type. (+) Include (-) Exclude",
    se_base: " Target Types",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 137,
    label: "SE_LimitEffect",
    description: "Limit to Spell Effect. (+) Include (-) Exclude",
    se_base: "Spell Effect ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 138,
    label: "SE_LimitSpellType",
    description: "Limit to Beneficial(1) OR Determental(0) spells (goodEffect in  spells_new )",
    se_base: "1=Good 0=Bad",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 139,
    label: "SE_LimitSpell",
    description: "Limit to Spell ID (+) Include (-) Exclude",
    se_base: "Spell ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 140,
    label: "SE_LimitMinDur",
    description: "Limit to spells with a minium duration.",
    se_base: "Duration",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 141,
    label: "SE_LimitInstant",
    description: "Limit to spells that are instant cast. (1 = Instant Only) (0 = Exclude Instant)",
    se_base: "36526",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 142,
    label: "SE_LimitMinLevel",
    description: "Limit to spells above a specific level.",
    se_base: "Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 143,
    label: "SE_LimitCastTimeMin",
    description: "Limit to spells with a minium cast time.",
    se_base: "Cast Time",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 144,
    label: "SE_LimitCastTimeMax",
    description: "Limit to spells with a maximum cast time. [Custom] [NOT USED ON LIVE]",
    se_base: "Cast Time",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 145,
    label: "SE_Teleport2",
    description: "Teleport to defined location. Used by 'Banisher' npcs, AoE spells that are cast on players.",
    se_base: "Corridinates",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 146,
    label: "SE_ElectricityResist",
    description: "Electricity Resist? There is no resist type for this.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 147,
    label: "SE_PercentalHeal",
    description: "Heal/(Damage) for percent value based on targets max HP",
    se_base: "Amt(neg for dmg)",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 148,
    label: "SE_StackingCommand_Block",
    description: "Prevents buff from taking hold if criteria met. (SLOT = 'formula - 201')  Buff Stacking",
    se_base: "Spell Effect",
    se_limit: "none",
    se_max: "<  Amt"
  },
  {
    value: 149,
    label: "SE_StackingCommand_Overwrite",
    description: "Allows buff from taking hold if criteria met. (SLOT = 'formula - 201')  Buff Stacking",
    se_base: "Spell Effect",
    se_limit: "none",
    se_max: "<  Amt"
  },
  {
    value: 150,
    label: "SE_DeathSave",
    description: "If under 15% HP, this buff has chance to heal the owner.   Mechanics",
    se_base: "(1=Partial/2=Full)",
    se_limit: "Level Max",
    se_max: "Heal Amt"
  },
  {
    value: 151,
    label: "SE_SuspendPet",
    description: "Places a pet in temporary storage. ",
    se_base: "? (0/1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 152,
    label: "SE_TemporaryPets",
    description: "Creates a temporary pet that will fade after duration. (stacks with regular pets)",
    se_base: "Amount of Pets",
    se_limit: "none",
    se_max: "Duration"
  },
  {
    value: 153,
    label: "SE_BalanceHP",
    description: "Balances groups HP (Penalty modifies the damage amount being distributed).",
    se_base: "Penalty",
    se_limit: "Max HP taken/player",
    se_max: "none"
  },
  {
    value: 154,
    label: "SE_DispelDetrimental",
    description: "Dispels only detrimental effects.   Mechanics",
    se_base: "Level Modifer",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 155,
    label: "SE_SpellCritDmgIncrease",
    description: "Modifies by % critical spell damage amount.  Spell Damage Modifiers   [NOT USED ON LIVE] ",
    se_base: "Crit Damage Mod %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 156,
    label: "SE_IllusionCopy",
    description: "Turns caster into mirror image of target.",
    se_base: "?(Seen as 0/1/30)",
    se_limit: "none",
    se_max: "?(usually 0)"
  },
  {
    value: 157,
    label: "SE_SpellDamageShield",
    description: "Casters will take damage from spell landing on target.",
    se_base: "Amt (negative)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 158,
    label: "SE_Reflect",
    description: "Reflects the casters spell back at the cast.",
    se_base: "Reflect Chance %",
    se_limit: "? (usuallly 0)",
    se_max: "Max"
  },
  {
    value: 159,
    label: "SE_AllStats",
    description: "+/- (STR, DEX, STA, CHA, WIS, INT)",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 160,
    label: "SE_MakeDrunk",
    description: "Gives client drunk effect if below tolerance level  (Effect currently handled entirely client side)",
    se_base: "Tolerance",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 161,
    label: "SE_MitigateSpellDamage",
    description: "Reduces incomming spell damage by % up to a max value.",
    se_base: "Mitigation %",
    se_limit: "Max Amt reduced",
    se_max: "Rune Amt"
  },
  {
    value: 162,
    label: "SE_MitigateMeleeDamage",
    description: "Reduces incomming melee damage by % up to a max value.",
    se_base: "Mitigation %",
    se_limit: "Max Amt reduced",
    se_max: "Rune Amt"
  },
  {
    value: 163,
    label: "SE_NegateAttacks",
    description: "Complete or Partial block of melee / spell damage. (Max= Max Amt Dmg Blocked per hit)",
    se_base: "Number of Blocks",
    se_limit: "none",
    se_max: "Max Amt Blocked"
  },
  {
    value: 164,
    label: "SE_AppraiseLDonChest",
    description: "Gives message if LDON chest is trapped / safe.",
    se_base: "?",
    se_limit: "none",
    se_max: "App. Skill"
  },
  {
    value: 165,
    label: "SE_DisarmLDoNTrap",
    description: "Attempts to disarm an LDON trap.",
    se_base: "?",
    se_limit: "none",
    se_max: "Disarm Skill"
  },
  {
    value: 166,
    label: "SE_UnlockLDoNChest",
    description: "Attemp to unlock an LDON chest",
    se_base: "?",
    se_limit: "none",
    se_max: "Unlock Skill"
  },
  {
    value: 167,
    label: "SE_PetPowerIncrease",
    description: "Increases statistics and level of the player's pet.",
    se_base: "Power Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 168,
    label: "SE_MeleeMitigation",
    description: "Modifies melee damage by percent. (+)Take more DMG (-) Take less Damage",
    se_base: "Mitigation %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 169,
    label: "SE_CriticalHitChance",
    description: "Modifies melee critical hit chance by percent. (+) Increase Chance (-) Decrease Chance",
    se_base: "Melee Crit Chance %",
    se_limit: " Skills  (-1=ALL)",
    se_max: "none"
  },
  {
    value: 170,
    label: "SE_SpellCritChance",
    description: "Modifies by % chance to critical direct damage spells.  Spell Damage Modifiers",
    se_base: "Crit Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 171,
    label: "SE_CrippBlowChance",
    description: "Modifies crippling blow chance by percent. (Must have a critical hit chance to Crip)",
    se_base: "Crip Blow Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 172,
    label: "SE_AvoidMeleeChance",
    description: "Modifies chance to avoid melee ('miss') (+) Increase Chance (-) Decrease Chance",
    se_base: "Avoidance Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 173,
    label: "SE_RiposteChance",
    description: "Modifies chance to riposte (+) Increase (-) Decrease",
    se_base: "Riposte Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 174,
    label: "SE_DodgeChance",
    description: "Modifies chance to dodge (+) Increase (-) Decrease",
    se_base: "Dodge Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 175,
    label: "SE_ParryChance",
    description: "Modifies chance to parry (+) Increase (-) Decrease",
    se_base: "Parry Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 176,
    label: "SE_DualWieldChance",
    description: "Modifies chance to dual wield (+) Increase (-) Decrease",
    se_base: "DW Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 177,
    label: "SE_DoubleAttackChance",
    description: "Modifies chance to double attack (+) Increase (-) Decrease",
    se_base: "Double Atk Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 178,
    label: "SE_MeleeLifetap",
    description: "(+) Heals you for a % of your melee damage done to target. (-) Dmgs you for %",
    se_base: "Amt % (+/-)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 179,
    label: "SE_AllInstrumentMod",
    description: "+/- Bard (Singing, Brass, Percusion, Wind, String) modifiers by %.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 180,
    label: "SE_ResistSpellChance",
    description: "Chance to resist any spell.",
    se_base: "Resist Chance %",
    se_limit: "none",
    se_max: "Max"
  },
  {
    value: 181,
    label: "SE_ResistFearChance",
    description: "Chance to resist fear spells.",
    se_base: "Resist Chance",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 182,
    label: "SE_HundredHands",
    description: "Modifies weapon delay by percent. (stacks with other hastes)",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 183,
    label: "SE_MeleeSkillCheck",
    description: "Increases chance to hit (Unclear exactly how this works on live).",
    se_base: "Amt %",
    se_limit: " Skills (-1=ALL)",
    se_max: "none"
  },
  {
    value: 184,
    label: "SE_HitChance",
    description: "Modifies chance to hit with a specific skill.",
    se_base: "Chance %",
    se_limit: " Skills (-1=ALL)",
    se_max: "none"
  },
  {
    value: 185,
    label: "SE_DamageModifier",
    description: "Modifies damage amount by percent for a specific skill.",
    se_base: "Amt %",
    se_limit: " Skills (-1=ALL)",
    se_max: "none"
  },
  {
    value: 186,
    label: "SE_MinDamageModifier",
    description: "Modifies minimum damage amount by percent for a specific skill.",
    se_base: "Amt %",
    se_limit: " Skills (-1=ALL)",
    se_max: "none"
  },
  {
    value: 187,
    label: "SE_BalanceMana",
    description: "Balances groups mana. (Penalty modifies the mana amount being distributed).",
    se_base: "Penalty",
    se_limit: "Max mana taken/pl",
    se_max: "none"
  },
  {
    value: 188,
    label: "SE_IncreaseBlockChance",
    description: "Modifies chance to block (+) Increase (-) Decrease",
    se_base: "Block Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 189,
    label: "SE_CurrentEndurance",
    description: "+/- Instant endurance or over time (If duration is set)",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 190,
    label: "SE_EndurancePool",
    description: "+/- Total endurance pool.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max Amt"
  },
  {
    value: 191,
    label: "SE_Amnesia",
    description: "Silence verse melee abilities that use endurance / disciplines.",
    se_base: "Usually 1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 192,
    label: "SE_Hate",
    description: "+/- Instant Hate or Hate over time if duration set.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 193,
    label: "SE_SkillAttack",
    description: "Melee/Skill damage (utilizing all melee modifiers/bonuses) where base value is as if you were swinging a weapon with that damage amount using a specific skill. (skill field in spells_new defines which  Skills is used).",
    se_base: "Weapon DMG Amt",
    se_limit: "Chance to Hit mod",
    se_max: "UNKNOWN"
  },
  {
    value: 194,
    label: "SE_FadingMemories",
    description: "To chance to be removeed from all hate lists and set to invisible.",
    se_base: "Fade Chance",
    se_limit: "? (Seen 0/75)",
    se_max: "none"
  },
  {
    value: 195,
    label: "SE_StunResist",
    description: "Chance to resist a stun from BASH/KICK.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 196,
    label: "SE_Strikethrough",
    description: "+/- Strikethrough chance (bypassing an opponent's special defenses, such as dodge, block, parry, and riposte.)",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 197,
    label: "SE_SkillDamageTaken",
    description: "Modifies damage taken by % from specific skills (+) More dmg taken (-) Less dmg taken",
    se_base: "Mitigation %",
    se_limit: " Skills  (-1=ALL)",
    se_max: "none"
  },
  {
    value: 198,
    label: "SE_CurrentEnduranceOnce",
    description: "+/- Instant endurance.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 199,
    label: "SE_Taunt",
    description: "Chance to taunt and instant hate",
    se_base: "Chance % Taunt",
    se_limit: "Amt Hate",
    se_max: "none"
  },
  {
    value: 200,
    label: "SE_ProcChance",
    description: "Increase chance to proc from weapons.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 201,
    label: "SE_RangedProc",
    description: "Add spell proc to a ranged attack.",
    se_base: "Proc Spell ID",
    se_limit: "Chance %",
    se_max: "none"
  },
  {
    value: 202,
    label: "SE_IllusionOther",
    description: "Allows next casted Illusion Buff (self-only) to be cast on a targeted player in group.",
    se_base: "none",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 203,
    label: "SE_MassGroupBuff",
    description: "Allows next casted Group Buff to hit all players and pets within a large radius from caster at 2x mana cost.",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 204,
    label: "SE_GroupFearImmunity",
    description: "Provides immunity to fear for group. (Base * 10 = Duration) [No buff icon]",
    se_base: "Duration",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 205,
    label: "SE_Rampage",
    description: "Does a single round of AE Melee attack (Set in EMU as distance 30 from caster).",
    se_base: "? (Always = 1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 206,
    label: "SE_AETaunt",
    description: "Area of Effect Taunt (Places caster top of hatelist +1 hate) Hardcoded 40 range",
    se_base: "Hate Add to taunt",
    se_limit: "none",
    se_max: "Range override"
  },
  {
    value: 207,
    label: "SE_FleshToBone",
    description: "Turns Meat / Body parts items into bone chips",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 208,
    label: "SE_PurgePoison",
    description: "UNKNOWN  [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 209,
    label: "SE_DispelBeneficial",
    description: "Dispels only beneficial effects.  Mechanics",
    se_base: "Level Modifier",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 210,
    label: "SE_PetShield",
    description: "Shield Effect (Share damage between pet and owner) for duration.",
    se_base: "Duration (value * 12)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 211,
    label: "SE_AEMelee",
    description: "Do an area of effect melee attack (ie. AE Rampage). Not implemented for NPC's",
    se_base: "Duration (value * 12)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 212,
    label: "SE_FrenziedDevastation",
    description: "Increase spell critical chance and mana cost 2x for DD spells.  Spell Damage Modifiers  [NOT USED ON LIVE]",
    se_base: "Critcal Chance",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 213,
    label: "SE_PetMaxHP",
    description: "+/- owner's pets Max HP by percent.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 214,
    label: "SE_MaxHPChange",
    description: "+/- Max HP by percent.",
    se_base: "Amt % (value / 100)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 215,
    label: "SE_PetAvoidance",
    description: "+/- owner's pets chance to avoid melee.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 216,
    label: "SE_Accuracy",
    description: "Increase chance to hit by percent (15 Accuray = 1%) [Only AA uses Limit]",
    se_base: "Amt",
    se_limit: " Skills (-1=ALL)",
    se_max: "none"
  },
  {
    value: 217,
    label: "SE_HeadShot",
    description: "Damage done by 'HeadShot' ability when proced  (Humaniod target hit w/ arrow)",
    se_base: "? (0)",
    se_limit: "Amt Dmg",
    se_max: "none"
  },
  {
    value: 218,
    label: "SE_PetCriticalHit",
    description: "+/- owner's pet/swarm pet chance to critical hit.",
    se_base: "Amt ",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 219,
    label: "SE_SlayUndead",
    description: "Chance to do increased damage verse undead. (Chance = Value/1000)",
    se_base: "Dmg Mod %",
    se_limit: "Chance",
    se_max: "none"
  },
  {
    value: 220,
    label: "SE_SkillDamageAmount",
    description: "Add flat amount of damage when a specific melee skill is used.",
    se_base: "Amt",
    se_limit: " Skills (-1=ALL)",
    se_max: "none"
  },
  {
    value: 221,
    label: "SE_Packrat",
    description: "+/- item weight reduction by percent.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 222,
    label: "SE_BlockBehind",
    description: "Modifies chance to block from behind (+) Increase (-) Decrease",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 223,
    label: "SE_DoubleRiposte",
    description: "+/- Chance to do an additional riposte attack (after a successful riposte) [NOT USED ON LIVE]",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 224,
    label: "SE_GiveDoubleRiposte",
    description: "+/- Chance to do an additional riposte attack (after a successful riposte) [Only AA uses Limit]",
    se_base: "Chance %",
    se_limit: " Skills  ",
    se_max: "none"
  },
  {
    value: 225,
    label: "SE_GiveDoubleAttack",
    description: "Allows any class to double attack at a set % chance or +/- chance if can innately DA.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 226,
    label: "SE_TwoHandBash",
    description: "Bash with a two handed weapon. (This works entirely client side)",
    se_base: "? (1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 227,
    label: "SE_ReduceSkillTimer",
    description: "+/- Reuse time on skill abilities (ie. Kick, Bash, Frenzy)",
    se_base: "Time (seconds)",
    se_limit: " Skills  ",
    se_max: "none"
  },
  {
    value: 228,
    label: "SE_ReduceFallDamage",
    description: "Reduce the damage that you take from falling.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 229,
    label: "SE_PersistantCasting",
    description: "Chance to continue casting while stunned.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 230,
    label: "SE_ExtendedShielding",
    description: "Increase range of /shield ability.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 231,
    label: "SE_StunBashChance",
    description: "Modify chance to land a stun using BASH",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 232,
    label: "SE_DivineSave",
    description: "Chance to avoid death.   Mechanics",
    se_base: "Chance %",
    se_limit: "Spell ID",
    se_max: "none"
  },
  {
    value: 233,
    label: "SE_Metabolism",
    description: "Modifies food / drink consumption rates.",
    se_base: "Consumption Mod",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 234,
    label: "SE_ReduceApplyPoisonTime",
    description: "Reduces the time to apply poison",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 235,
    label: "SE_ChannelChanceSpells",
    description: "+/- Chance to channel a spell (avoid interupt).  [NOT USED ON LIVE]",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 236,
    label: "SE_FreePet",
    description: "UKNONW EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 237,
    label: "SE_GivePetGroupTarget",
    description: "Pet Affinity, allow owner's pet to receive group buffs.",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 238,
    label: "SE_IllusionPersistence",
    description: "Persistence to your illusionions, causing them to last until you die or the illusion is forcibly removed.",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 239,
    label: "SE_FeignedCastOnChance",
    description: "Ability gives you an increasing chance for your feigned deaths to not be revealed by spells cast upon you.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 240,
    label: "SE_StringUnbreakable",
    description: "Related to above.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 241,
    label: "SE_ImprovedReclaimEnergy",
    description: "Modifies amount of mana returned from from SE_ReclaimPet",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 242,
    label: "SE_IncreaseChanceMemwipe",
    description: "+/- Chance to successfully memblur target.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 243,
    label: "SE_CharmBreakChance",
    description: "Modifies charm break chance.  Mechanics",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 244,
    label: "SE_RootBreakChance",
    description: "Modifies chance of the casters root breaking.  Mechanics",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 245,
    label: "SE_TrapCircumvention",
    description: "Decreases the chance that you will set off a trap when opening a chest",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 246,
    label: "SE_SetBreathLevel",
    description: "Modifies lung capacity.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 247,
    label: "SE_RaiseSkillCap",
    description: "Adds skill over the skill cap.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 248,
    label: "SE_SecondaryForte",
    description: "Gives you a 2nd specialize skill that can go past 50 to 100.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 249,
    label: "SE_SecondaryDmgInc",
    description: "Allows off hand weapon to recieve a damage bonus.",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 250,
    label: "SE_SpellProcChance",
    description: "Modify chance to do a proc from a 'proc spell buff''",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 251,
    label: "SE_ConsumeProjectile",
    description: "Chance NOT to consume a projectile (archery/throwing).",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 252,
    label: "SE_FrontalBackstabChance",
    description: "Chance to perform a full backstab while in front of the target.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 253,
    label: "SE_FrontalBackstabMinDmg",
    description: "Allow a frontal backstab for mininum damage.",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 254,
    label: "SE_Blank",
    description: "Used as a spacer after last spell effect slot in spell file.",
    se_base: "0",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 255,
    label: "SE_ShieldDuration",
    description: "Increases duration of /shield",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 256,
    label: "SE_ShroudofStealth",
    description: "Rogue improved invsible",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 257,
    label: "SE_PetDiscipline",
    description: "Give owner's pet, et /hold",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 258,
    label: "SE_TripleBackstab",
    description: "Chance to perform a triple backstab.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 259,
    label: "SE_CombatStability",
    description: "+/- AC Soft caps",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 260,
    label: "SE_AddSingingMod",
    description: "Add modifiers to bard instruments or singing abilities. (ItemType = Wind, Brass ect).",
    se_base: "Amt",
    se_limit: "ItemType",
    se_max: "none"
  },
  {
    value: 261,
    label: "SE_SongModCap",
    description: "Raises cap of modifiers for bard instrument or singing abilities. [NOT USED ON LIVE]",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 262,
    label: "SE_RaiseStatCap",
    description: "+/- stat caps. (Base2=  STR: 0, STA: 1, AGI: 2, DEX: 3, WIS: 4, INT: 5, CHA: 6, MR: 7, CR: 8, FR: 9, PR: 10, DR: 11, COR: 12)",
    se_base: "Amt",
    se_limit: "Stat Type",
    se_max: "Max"
  },
  {
    value: 263,
    label: "SE_TradeSkillMastery",
    description: " Lets you raise more than one tradeskill above master.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 264,
    label: "SE_HastenedAASkill",
    description: "Reduces reuse time on AA skills  [Use redux field in aa_actions table for this effect]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 265,
    label: "SE_MasteryofPast",
    description: "Spell levels less than the base values level can not be fizzled.",
    se_base: "Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 266,
    label: "SE_ExtraAttackChance",
    description: "Chance to do an extra attack with 2 Handed weapons only.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 267,
    label: "SE_PetDiscipline2",
    description: "/pet focus, /pet no cast",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 268,
    label: "SE_ReduceTradeskillFail",
    description: "Reduces chance to fail with given tradeskill by a percent chance",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 269,
    label: "SE_MaxBindWound",
    description: "Increase max HP you can bind wound by percent",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 270,
    label: "SE_BardSongRange",
    description: "+/- Range of bard beneficial songs.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 271,
    label: "SE_BaseMovementSpeed",
    description: "Modifies basemove speed, doesn't stack with other move modfiers (Ie AA - Run 3)",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 272,
    label: "SE_CastingLevel2",
    description: "+/- Casting Level' which will determine fizzel rate. ",
    se_base: "Amt ",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 273,
    label: "SE_CriticalDoTChance",
    description: "Modifies by % chance to critical Damage over time spells  Spell Damage Modifiers",
    se_base: "Crit Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 274,
    label: "SE_CriticalHealChance",
    description: "Modifies by % chance to critical heal spell  Heal Modifiers",
    se_base: "Crit Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 275,
    label: "SE_CriticalMend",
    description: "Chance to peform a critical mend (Monk Mend ability).",
    se_base: "Crit Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 276,
    label: "SE_Ambidexterity",
    description: "Increase chance to duel weild by adding bonus 'duel weild skill' amount.",
    se_base: "Skill Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 277,
    label: "SE_UnfailingDivinity",
    description: "Gives second chance for SE_DivineSave to fire and if successful gives a modified heal amt.   Mechanics",
    se_base: "Heal Modifier",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 278,
    label: "SE_FinishingBlow",
    description: "Damage done by 'Finishing Blow' ability when proced  (Target < 10% HP)",
    se_base: "Chance (500 = 5%)",
    se_limit: "Amt Dmg",
    se_max: "none"
  },
  {
    value: 279,
    label: "SE_Flurry",
    description: "Chance to do a melee flurry.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 280,
    label: "SE_PetFlurry",
    description: "Chance for owner's pet or swarm pet to flurry.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 281,
    label: "SE_FeignedMinion",
    description: "Ability allows you to instruct your pet to feign death via the '/pet feign' command. (value = succeed chance)",
    se_base: "Chance %",
    se_limit: "",
    se_max: ""
  },
  {
    value: 282,
    label: "SE_ImprovedBindWound",
    description: "Increase bind wound  healing amount by percent.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 283,
    label: "SE_DoubleSpecialAttack",
    description: "Chance to perform second special attack as monk. (ie Flying Kick, Tiger Claw)",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 284,
    label: "SE_LoHSetHeal",
    description: "UKNONW EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 285,
    label: "SE_NimbleEvasion",
    description: "UKNONW EFFECT",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 286,
    label: "SE_FcDamageAmt",
    description: "+/- spell damage to casters spell.  Spell Damage Modifiers",
    se_base: "Amt",
    se_limit: "none",
    se_max: "?"
  },
  {
    value: 287,
    label: "SE_SpellDurationIncByTic",
    description: "Increase spell duration by buff tick amount.",
    se_base: "Amt Ticks",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 288,
    label: "SE_SpecialAttackKBProc",
    description: "Chance to to do a knockback spell proc from special attacks [AA Dragon Punch] (Base Chance = 25%)",
    se_base: "Chance Mod %",
    se_limit: " Skills  ",
    se_max: "none"
  },
  {
    value: 289,
    label: "SE_CastOnFadeEffect",
    description: "Triggers a spell only if fades after the full duration. (Typically on spells that can be cured)",
    se_base: "Spell ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 290,
    label: "SE_IncreaseRunSpeedCap",
    description: "Increase run speed over the run speed cap.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 291,
    label: "SE_Purify",
    description: "Chance to dispel all determental effects.   Mechanics",
    se_base: "Level Modifier",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 292,
    label: "SE_StrikeThrough2",
    description: "+/- Strikethrough chance (bypassing an opponent's special defenses, such as dodge, block, parry, and riposte.)",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 293,
    label: "SE_FrontalStunResist",
    description: "Chance to resist a stun from BASH/KICK if facing target.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 294,
    label: "SE_CriticalSpellChance",
    description: "Mod % chance to critical DD spells AND mod crit spell damage.  Spell Damage Modifiers",
    se_base: "Crit Chance %",
    se_limit: "Crit Damage Mod %",
    se_max: "none"
  },
  {
    value: 295,
    label: "SE_ReduceTimerSpecial",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 296,
    label: "SE_FcSpellVulnerability",
    description: "(Debuff/Buff) Modifies spell damage by % on target. Spell Damage Modifiers",
    se_base: "Min %",
    se_limit: "Max %",
    se_max: "none"
  },
  {
    value: 297,
    label: "SE_FcDamageAmtIncoming",
    description: "(Debuff/Buff) Modifies spell/skill damage by flat amount on damage.  Spell Damage Modifiers",
    se_base: "Amt",
    se_limit: "none",
    se_max: "?(0 or=Amt)"
  },
  {
    value: 298,
    label: "SE_ChangeHeight",
    description: "Shrink by percent.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 299,
    label: "SE_WakeTheDead",
    description: "Creates swarm pet from corpse's for a set duration (seconds) (Base likely amt pets)",
    se_base: "? (Seen 1 and 3)",
    se_limit: "none",
    se_max: "Duration"
  },
  {
    value: 300,
    label: "SE_Doppelganger",
    description: "Creates swarm pet that is a mirror image of caster",
    se_base: "Amt Pets",
    se_limit: "none",
    se_max: "Duration"
  },
  {
    value: 301,
    label: "SE_ArcheryDamageModifier",
    description: "Modify archery damage by percent.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 302,
    label: "SE_FcDamagePctCrit",
    description: "Modifies by % casters base spell damage value (dmg can crit)  Spell Damage Modifiers",
    se_base: "Min %",
    se_limit: "Max %",
    se_max: "none"
  },
  {
    value: 303,
    label: "SE_FcDamageAmtCrit",
    description: "+/- spell damage to casters spell (dmg can crit).  Spell Damage Modifiers",
    se_base: "Amt",
    se_limit: "none",
    se_max: "?"
  },
  {
    value: 304,
    label: "SE_OffhandRiposteFail",
    description: "Chance for target not to riposte an an attack made from your off hand weapon.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 305,
    label: "SE_MitigateDamageShield",
    description: "Reduce incomming damage from damage shield using your off hand weapon.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "Max"
  },
  {
    value: 306,
    label: "SE_ArmyOfTheDead",
    description: "This ability calls up to five shades of nearby corpses back to life to serve the necromancer. ",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 307,
    label: "SE_Appraisal",
    description: "his ability allows you to estimate the selling price of an item you are holding on your cursor.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 308,
    label: "SE_SuspendMinion",
    description: "Store a backup pet that can be unsuspended.",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 309,
    label: "SE_GateCastersBindPoint",
    description: "Teleports group to casters bind point.          Bind Point ID (1=Primary, 2=Secondary 3=Tertiary)",
    se_base: "Bind Point ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 310,
    label: "SE_ReduceReuseTimer",
    description: "Reduce the reuse timer on disciplines by seconds. (Base value set in milliseconds)",
    se_base: "Amt Time",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 311,
    label: "SE_LimitCombatSkills",
    description: "Limit to exclude (discs and combat procs = 0) or (spells = 1)",
    se_base: "0/1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 312,
    label: "SE_Sanctuary",
    description: "Places caster at bottom of all hate lists, effect fades if caster cast spell on targets other than self.",
    se_base: "? (1)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 313,
    label: "SE_ForageAdditionalItems",
    description: "Chance to forage additional items using 'forage' ability.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 314,
    label: "SE_Invisibility2",
    description: "Invisibility (Stable)      Invisible Level corresponds to what type of see invisible will detect.",
    se_base: "Invisible Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 315,
    label: "SE_InvisVsUndead2",
    description: "Invisibility vs Undead (Stable)      Invisible Level corresponds to what type of see invisible will detect.",
    se_base: "Invisible Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 316,
    label: "SE_ImprovedInvisAnimals",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 317,
    label: "SE_ItemHPRegenCapIncrease",
    description: "Increase HP regen from items over cap.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 318,
    label: "SE_ItemManaRegenCapIncrease",
    description: "Increase Mana regen from items over cap.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 319,
    label: "SE_CriticalHealOverTime",
    description: "Modifies % chance to do a critical heal over time  Heal Modifiers",
    se_base: "Crit Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 320,
    label: "SE_ShieldBlock",
    description: "Chance to block an attack while shield is equiped.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 321,
    label: "SE_ReduceHate",
    description: "+/- Instant hate",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 322,
    label: "SE_GateToHomeCity",
    description: "Gate to original starting city.",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 323,
    label: "SE_DefensiveProc",
    description: "Add a chance to proc from any incoming melee swing.",
    se_base: "Spell ID",
    se_limit: "Proc Rate Mod",
    se_max: "?"
  },
  {
    value: 324,
    label: "SE_HPToMana",
    description: "Casted spells will use HP instead of Mana with a coversion penalty rate.",
    se_base: "Conversion Rate %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 325,
    label: "SE_ChanceInvsBreakToAoE",
    description: "[AA Nerves of Steel] Increasing chance to remain hidden when they are an indirect target of an AoE spell.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 326,
    label: "SE_SpellSlotIncrease",
    description: "Increase physical amount of spell slots.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 327,
    label: "SE_MysticalAttune",
    description: "Increases max amount of buffs a player can have.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 328,
    label: "SE_DelayDeath",
    description: "Increase the amount of HP under zero that can be lost before actual death occurs.",
    se_base: "Amt HP",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 329,
    label: "SE_ManaAbsorbPercentDamage",
    description: "Reduces incoming damage by % and converts that amount to mana loss.",
    se_base: "Mitigation %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 330,
    label: "SE_CriticalDamageMob",
    description: "Modifies damage done from a critical melee hit.",
    se_base: "Dmg Modifier %",
    se_limit: " Skills (-1=ALL)",
    se_max: "none"
  },
  {
    value: 331,
    label: "SE_Salvage",
    description: "Increase chance to salvage from tradeskills by percent.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 332,
    label: "SE_SummonToCorpse",
    description: "[AA Call of the Wild] Ressurect spell with no penalty or exp gain (Can still res after).",
    se_base: "?",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 333,
    label: "SE_CastOnRuneFadeEffect",
    description: "Triggers a spell when a spell with a rune amount is used up and fades.",
    se_base: "Spell ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 334,
    label: "SE_BardAEDot",
    description: "Area of effect damage over time song, damage only done if target is NOT moving.",
    se_base: "Amt +/-",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 335,
    label: "SE_BlockNextSpellFocus",
    description: "Chance to block next spell that meets the focus limits defined with this effect in it.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 336,
    label: "SE_IllusionaryTarget",
    description: "UNKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 337,
    label: "SE_PercentXPIncrease",
    description: "Modify amount of experience gained.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 338,
    label: "SE_SummonAndResAllCorpses",
    description: "Summon and ressurect all corpses for 100% exp.",
    se_base: "? (Seen=70)",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 339,
    label: "SE_TriggerOnCast",
    description: "Cast an additional spell on spell use if the spell casted meets focus limits.",
    se_base: "Chance %",
    se_limit: "Spell ID",
    se_max: "none"
  },
  {
    value: 340,
    label: "SE_SpellTrigger",
    description: "Chance to add an additional spell to the target. (If multiple effects in same spell where % add up to 100, then one effect must fire)",
    se_base: "Chance %",
    se_limit: "Spell ID",
    se_max: "none"
  },
  {
    value: 341,
    label: "SE_ItemAttackCapIncrease",
    description: "Increase the cap to the amount of attack that can gained from items.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 342,
    label: "SE_ImmuneFleeing",
    description: "Prevent NPC from fleeing at low health.",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 343,
    label: "SE_InterruptCasting",
    description: "Chance to interrupt targets spell casting can be instant or per buff tick.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 344,
    label: "SE_ChannelChanceItems",
    description: "Modify chance to successfully channel from item click casts.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 345,
    label: "SE_AssassinationLevel",
    description: "Maximum level of target that 'Assassination' will proc on.",
    se_base: "Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 346,
    label: "SE_HeadShotLevel",
    description: "Maximum level of target that 'HeadShot' will proc on.",
    se_base: "Level",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 347,
    label: "SE_DoubleRangedAttack",
    description: "Chance to perform a double ranged attack (Throw/Archery) will consume projectile.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 348,
    label: "SE_LimitManaMin",
    description: "Limit to spells above a minium amount of mana.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 349,
    label: "SE_ShieldEquipHateMod",
    description: "Hate modifier to if shield equiped. (Shield Specialist AA) This may not be correct",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 350,
    label: "SE_ManaBurn",
    description: "Drains mana for damage/heal at a defined ratio up to a defined maximum amount of mana. Ratio (-)",
    se_base: "Max Mana",
    se_limit: "Mana/HP Ratio / 10",
    se_max: "none"
  },
  {
    value: 351,
    label: "SE_PersistentEffect",
    description: "Aura effects, grants a buff automatically to those within a radius of caster.",
    se_base: "?",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 352,
    label: "SE_IncreaseTrapCount",
    description: "UKNOWN EFFECT",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 353,
    label: "SE_AdditionalAura",
    description: "Increase number of aura slots.",
    se_base: "Amt Slots",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 354,
    label: "SE_DeactivateAllTraps",
    description: "UKNOWN EFFECT",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 355,
    label: "SE_LearnTrap",
    description: "UKNOWN EFFECT",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 356,
    label: "SE_ChangeTriggerType",
    description: "UKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 357,
    label: "SE_FcMute",
    description: "Chance to silence casting of spells that contain specific spell effects. (Effects determined by focus limits)",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 358,
    label: "SE_CurrentManaOnce",
    description: "+/- Instant mana",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 359,
    label: "SE_PassiveSenseTrap",
    description: "UKNOWN EFFECT",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 360,
    label: "SE_ProcOnKillShot",
    description: "Triggers a spell after a kill shot. (Max = Min Level of Target)",
    se_base: "Chance %",
    se_limit: "Spell ID",
    se_max: "Min Level"
  },
  {
    value: 361,
    label: "SE_SpellOnDeath",
    description: "Triggers when the owner of the buff is killed.",
    se_base: "Chance %",
    se_limit: "Spell ID",
    se_max: "none"
  },
  {
    value: 362,
    label: "SE_PotionBeltSlots",
    description: "'Quick Draw' expands the potion belt by one additional available item slot per rank.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 363,
    label: "SE_BandolierSlots",
    description: "'Battle Ready' expands the bandolier by one additional save slot per rank.",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 364,
    label: "SE_TripleAttackChance",
    description: "+/- chance to triple attack.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 365,
    label: "SE_ProcOnSpellKillShot",
    description: "Chance to trigger a spell on kill when the kill is caused by the specific spell with this effect in it.",
    se_base: "Chance %",
    se_limit: "Spell ID",
    se_max: "Min Level"
  },
  {
    value: 366,
    label: "SE_ShieldEquipDmgMod",
    description: "Damage modifier to melee if shield equiped. (Shield Specialist AA) This may not be correct",
    se_base: "Amt %",
    se_limit: "?",
    se_max: "none"
  },
  {
    value: 367,
    label: "SE_SetBodyType",
    description: "Change body type of target.",
    se_base: " Body_Types",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 368,
    label: "SE_FactionMod",
    description: "Increases faction with base1 (faction id, live won't match up w/ ours) by base2.",
    se_base: "Faction ID",
    se_limit: "Faction Mod",
    se_max: "none"
  },
  {
    value: 369,
    label: "SE_CorruptionCounter",
    description: "Determines potency of determental curse spells (+) or potency of cures (-)",
    se_base: "Counter Amt",
    se_limit: "none",
    se_max: "Max"
  },
  {
    value: 370,
    label: "SE_ResistCorruption",
    description: "+/- Corruption Resist",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 371,
    label: "SE_AttackSpeed4",
    description: "Stackable slow effect",
    se_base: " Attack Speed",
    se_limit: "none",
    se_max: "Amt Max"
  },
  {
    value: 372,
    label: "SE_ForageSkill",
    description: "",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 373,
    label: "SE_CastOnFadeEffectAlways",
    description: "Triggers a spell when buff fades after natural duration OR from rune/numhits fades.",
    se_base: "Spell ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 374,
    label: "SE_ApplyEffect",
    description: "Chance to add an additional spell to the target.",
    se_base: "Chance %",
    se_limit: "Spell ID",
    se_max: "none"
  },
  {
    value: 375,
    label: "SE_DotCritDmgIncrease",
    description: "Modifies by % critical dot damage.  Spell Damage Modifiers",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 376,
    label: "SE_Fling",
    description: "UNKNOWN EFFECT",
    se_base: "?",
    se_limit: "?",
    se_max: "none"
  },
  {
    value: 377,
    label: "SE_CastOnFadeEffectNPC",
    description: "Triggers a spell when buff fades after natural duration. (On live these are in player spells cast on NPCs)",
    se_base: "Spell ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 378,
    label: "SE_SpellEffectResistChance",
    description: "Chance to resist a specific spell effect type (Ie. 5% chance to Resist DD spells)",
    se_base: "% Chance",
    se_limit: "Spell Effect ID",
    se_max: "none"
  },
  {
    value: 379,
    label: "SE_ShadowStepDirectional",
    description: "Push forward for specific amount of units. (Handled client side)",
    se_base: "Distance Units",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 380,
    label: "SE_Knockdown",
    description: "Push back and up effect. (Handled client side)",
    se_base: "Push Back",
    se_limit: "Push Up",
    se_max: "none"
  },
  {
    value: 381,
    label: "SE_KnockTowardCaster",
    description: "Summon a player to caster at a set distance away from caster. (Uses a reverse knockback effect)",
    se_base: "Distance Units",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 382,
    label: "SE_NegateSpellEffect",
    description: "Completely remove a specified spell effect bonus. (Ie. Remove all Aggro bonus)",
    se_base: "?",
    se_limit: "Spell Effect ID",
    se_max: "none"
  },
  {
    value: 383,
    label: "SE_SympatheticProc",
    description: "Chance to proc a a spell off of a regularly casted spell. (Typically found as item focus)",
    se_base: "Chance Mod",
    se_limit: "Spell ID",
    se_max: "none "
  },
  {
    value: 384,
    label: "SE_Leap",
    description: "Jump toward your target.",
    se_base: "Distance",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 385,
    label: "SE_LimitSpellGroup",
    description: "Limit focus effects by spell group. (spellgroup field in spells_new) (+) Include (-) Exclude",
    se_base: "Spellgroup ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 386,
    label: "SE_CastOnCurer",
    description: "Trigger a spell on yourself when you cure a target.",
    se_base: "Spell ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 387,
    label: "SE_CastOnCure",
    description: "Trigger a spell on yourself when you are cured.",
    se_base: "Spell ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 388,
    label: "SE_SummonCorpseZone",
    description: "Summon a corpse from any zone.",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 389,
    label: "SE_FcTimerRefresh",
    description: "Reset recast timers (ungrey spell gems)",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 390,
    label: "SE_FcTimerLockout",
    description: "Increase time on reset timer.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 391,
    label: "SE_MeleeVulnerability",
    description: "+/- melee mitigation (+) weakness (-) mitigation (Live SPA defined SE_LimitManaMax is not correct)",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 392,
    label: "SE_FcHealAmt",
    description: "+/- flat amount to casters heal spells  Heal Modifiers",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 393,
    label: "SE_FcHealPctIncoming",
    description: "(Buff/Debuff) Modfies by % the casters base heal value for incomming spells.  Heal Modifiers",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 394,
    label: "SE_FcHealAmtIncoming",
    description: "(Buff/Debuff) +/- flat amount the casters base heal value for incomming spells. Heal Modifiers",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 395,
    label: "SE_FcHealPctCritIncoming",
    description: "(Buff/Debuff) Modifies by % chance to receive a critical heal on incomming spells.  Heal Modifiers",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 396,
    label: "SE_FcHealAmtCrit",
    description: "+/- flat amount to casters heal spells (amt can critical)  Heal Modifiers",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 397,
    label: "SE_PetMeleeMitigation",
    description: "+/- AC to owner's pet.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 398,
    label: "SE_SwarmPetDuration",
    description: "Increases duration of swarm pets by seconds. (Base value set in miliseconds)",
    se_base: "Time",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 399,
    label: "SE_FcTwincast",
    description: "Chance to cast the same spell 2x from a single cast.",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 400,
    label: "SE_HealGroupFromMana",
    description: "Group heal, drains mana from caster and coverts that to the amount of HP healed at a defined ratio.",
    se_base: "Max Mana Drain",
    se_limit: "Mana/HP Ratio / 10",
    se_max: "none"
  },
  {
    value: 401,
    label: "SE_ManaDrainWithDmg",
    description: "Drains targets mana and decreases hit points based on a defined ratio of hp/mana drained.",
    se_base: "Max Mana Drained",
    se_limit: "HP/Mana Ratio / 10",
    se_max: "Max ?"
  },
  {
    value: 402,
    label: "SE_EndDrainWithDmg",
    description: "Drains targets endurance and decreases hit points based on a defined ratio of hp/endur drained.",
    se_base: "Max Endur Drained",
    se_limit: "HP/Endur Ratio / 10",
    se_max: "none"
  },
  {
    value: 403,
    label: "SE_LimitSpellClass",
    description: "Limits to specific types of spell categories. (3=Cures,3=Offensive, 6=Lifetap) (+) Include (-) Exclude",
    se_base: "Category",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 404,
    label: "SE_LimitSpellSubclass",
    description: "Limits to specific types of spell categories. (UNDEFINED) (+) Include (-) Exclude",
    se_base: "Category",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 405,
    label: "SE_TwoHandBluntBlock",
    description: "Modifies chance to block if 2 Hand Blunt equiped (+) Increase (-) Decrease",
    se_base: "Chance %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 406,
    label: "SE_CastonNumHitFade",
    description: "Triggers a spell when a spells numhit counter is depleted.",
    se_base: "Spell ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 407,
    label: "SE_CastonFocusEffect",
    description: "Triggers a spell if focus limits are met (ie Triggers when a focus effects is applied)",
    se_base: "Spell ID",
    se_limit: "none",
    se_max: "noen"
  },
  {
    value: 408,
    label: "SE_LimitHPPercent",
    description: "Caps maximum HP to % or a defined amount, which ever is lowest.",
    se_base: "Cap %",
    se_limit: "Cap Amt",
    se_max: "none"
  },
  {
    value: 409,
    label: "SE_LimitManaPercent",
    description: "Caps maximum Mana to % or a defined amount, which ever is lowest.",
    se_base: "Cap %",
    se_limit: "Cap Amt",
    se_max: "none"
  },
  {
    value: 410,
    label: "SE_LimitEndPercent",
    description: "Caps maximum Endurance to % or a defined amount, which ever is lowest.",
    se_base: "Cap %",
    se_limit: "Cap Amt",
    se_max: "none"
  },
  {
    value: 411,
    label: "SE_LimitClass",
    description: "Limits to spells of a certain player class (Uses Bitmask, the class value in spell dbase is 1 bitmask higher in relation to item class value)",
    se_base: "Class Bitmask",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 412,
    label: "SE_LimitRace",
    description: "Limits to spells cast by a certain race [NOT USED ON LIVE]",
    se_base: "Race ID",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 413,
    label: "SE_FcBaseEffects",
    description: "Modifies base values of certain spell effects.  Mechanics  Partially implemented",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 414,
    label: "SE_LimitCastingSkill",
    description: "Limit to spells that use a specific casting skill. (skill field in spells new) (+) Include (-) Exclude",
    se_base: " Skills",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 415,
    label: "SE_FFItemClass",
    description: "UKNOWN EFFECT [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 416,
    label: "SE_ACv2",
    description: "+/- AC (stacks with other AC buffs)",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max"
  },
  {
    value: 417,
    label: "SE_ManaRegen_v2",
    description: "+/- mana regen (stacks with other mana regen buffs)",
    se_base: "Amt",
    se_limit: "none",
    se_max: "Max"
  },
  {
    value: 418,
    label: "SE_SkillDamageAmount2",
    description: "Add flat amount of damage when a specific melee skill is used.",
    se_base: "Amt",
    se_limit: " Skills (-1=ALL)",
    se_max: "none"
  },
  {
    value: 419,
    label: "SE_AddMeleeProc",
    description: "Add melee proc",
    se_base: "Proc Spell ID",
    se_limit: "Rate Modifier",
    se_max: "none"
  },
  {
    value: 420,
    label: "SE_FcLimitUse",
    description: "Increase numhits count by percent. [Custom] [NOT USED ON LIVE]",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 421,
    label: "SE_FcIncreaseNumHits",
    description: "Increase numhits count by flat amount.",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 422,
    label: "SE_LimitUseMin",
    description: "Limit to spells with a minimum number of numhit counters.  [Custom] [NOT USED ON LIVE]",
    se_base: "Amt",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 423,
    label: "SE_LimitUseType",
    description: "Limit to spells by  Numhit_Types  [Custom] [NOT USED ON LIVE]",
    se_base: " Numhit_Types",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 424,
    label: "SE_GravityEffect",
    description: "Pulls target(s) toward caster at a set pace to a specific distance away from caster.",
    se_base: "Distance From Caster",
    se_limit: "Force of Pull",
    se_max: "none"
  },
  {
    value: 425,
    label: "SE_Display",
    description: "Gives illusion flying dragon (unclear how this works)",
    se_base: "1",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 426,
    label: "SE_IncreaseExtTargetWindow",
    description: "Increases the capacity of your extended target window",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 427,
    label: "SE_SkillProc",
    description: "Chance to proc a spell when using a specific skill (ie Proc from a Taunt or Kick).",
    se_base: "Spell ID",
    se_limit: "Rate Modifier",
    se_max: "none"
  },
  {
    value: 428,
    label: "SE_LimitToSkill",
    description: "Limits what skill will effect a SkillProc. (Always place as next effect after ID 427/429)",
    se_base: " Skills  ",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 429,
    label: "SE_SkillProcSuccess",
    description: "Chance to proc a spell when using a specific skill if it successfully hits the target.",
    se_base: "Spell ID",
    se_limit: "Rate Modifier",
    se_max: "none"
  },
  {
    value: 430,
    label: "SE_PostEffect",
    description: "Alter vision ? UNKNOWN EFFECT",
    se_base: "?",
    se_limit: "?",
    se_max: "?"
  },
  {
    value: 431,
    label: "SE_PostEffectData",
    description: "Tint vision ? UNKNOWN EFFECT",
    se_base: "RGB",
    se_limit: "?",
    se_max: "?"
  },
  {
    value: 432,
    label: "SE_ExpandMaxActiveTrophyBen",
    description: "UKNOWN EFFECTâ€‹ [NOT USED ON LIVE]",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 433,
    label: "SE_CriticalDotDecay",
    description: "Chance to critical DoT with effect depreciation.  Spell Damage Modifiers (Removed from live 7-14 ?)",
    se_base: "Chance %",
    se_limit: "Decay %",
    se_max: "Max Level"
  },
  {
    value: 434,
    label: "SE_CriticalHealDecay",
    description: "Chance to critical Heal with effect depreciation.  Heal Modifiers (Removed from live 7-14 ?)",
    se_base: "Chance %",
    se_limit: "Decay %",
    se_max: "Max Level"
  },
  {
    value: 435,
    label: "SE_CriticalRegenDecay",
    description: "Chance to critical Regen with effect depreciation.  Heal Modifiers (Removed from live 7-14 ?)",
    se_base: "Chance %",
    se_limit: "Decay %",
    se_max: "Max Level"
  },
  {
    value: 436,
    label: "SE_BeneficialCountDownHold",
    description: "UKNOWN EFFECTâ€‹",
    se_base: "",
    se_limit: "",
    se_max: ""
  },
  {
    value: 437,
    label: "SE_TeleporttoAnchor",
    description: "Teleport Guild Hall Anchor",
    se_base: "?",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 438,
    label: "SE_TranslocatetoAnchor",
    description: "Translocate Primary Anchor",
    se_base: "?",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 439,
    label: "SE_Assassination",
    description: "Damage done by 'Assassination' ability when proced  (Humaniod target hit w/ Backstab)",
    se_base: "? (0)",
    se_limit: "Amt Dmg",
    se_max: "none"
  },
  {
    value: 440,
    label: "SE_FinishingBlowLvl",
    description: "Maximum level of target that 'Finishing Blow' will proc on.",
    se_base: "Level",
    se_limit: "? (Seen 200)",
    se_max: "none"
  },
  {
    value: 441,
    label: "SE_DistanceRemoval",
    description: "Fades buff if owner of buff moves specified amount of distance from location where buff was applied.",
    se_base: "Distance",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 442,
    label: "SE_TriggerOnReqTarget",
    description: "Triggers a spell on target when a specific condition is met on that target. Buff fades after trigger.",
    se_base: "Spell ID",
    se_limit: " Target Condition",
    se_max: "none"
  },
  {
    value: 443,
    label: "SE_TriggerOnReqCaster",
    description: "Triggers a spell on target when a specific condition is met on that target. Buff fades after trigger. (All spells that use this are self only)",
    se_base: "Spell ID",
    se_limit: " Target Condition",
    se_max: "none"
  },
  {
    value: 444,
    label: "SE_ImprovedTaunt",
    description: "Locks aggro on caster and decreases other players aggro by % up to a specified level.",
    se_base: "Max level",
    se_limit: "Aggro Mod",
    se_max: "none"
  },
  {
    value: 445,
    label: "SE_AddMercSlot",
    description: "[AA Hero's Barracks] Allows you to conscript additional mercs.",
    se_base: "Amt ?",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 446,
    label: "SE_AStacker",
    description: "Buff stacking blocker",
    se_base: "Stacking Priority",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 447,
    label: "SE_BStacker",
    description: "Buff stacking blocker",
    se_base: "Stacking Priority",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 448,
    label: "SE_CStacker",
    description: "Buff stacking blocker",
    se_base: "Stacking Priority",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 449,
    label: "SE_DStacker",
    description: "Buff stacking blocker",
    se_base: "Stacking Priority",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 450,
    label: "SE_MitigateDotDamage",
    description: "Reduces incomming dotl damage by % up to a max value.",
    se_base: "Mitigation %",
    se_limit: "Max Amt Reduced",
    se_max: "Rune Amt"
  },
  {
    value: 451,
    label: "SE_MeleeThresholdGuard",
    description: "Partial Melee Rune that only is lowered if melee hits are over a defined amount (limit) of damage",
    se_base: "Mitigation %",
    se_limit: "Min Hit",
    se_max: "Rune Amt"
  },
  {
    value: 452,
    label: "SE_SpellThresholdGuard",
    description: "Partial Spell Rune that only is lowered if spell dmg is over a defined amount (limit) of damage",
    se_base: "Mitigation %",
    se_limit: "Min Hit",
    se_max: "Rune Amt"
  },
  {
    value: 453,
    label: "SE_TriggerMeleeThreshold",
    description: "Trigger spell when specified amount of melee damage is taken in a single hit, then fade buff.",
    se_base: "Spell ID",
    se_limit: "Damage Amt",
    se_max: "none"
  },
  {
    value: 454,
    label: "SE_TriggerSpellThreshold",
    description: "Trigger spell when specified amount of spell damage is taken in a single hit, then fade buff.",
    se_base: "Spell ID",
    se_limit: "Damage Amt",
    se_max: "none"
  },
  {
    value: 455,
    label: "SE_AddHatePct",
    description: "Modifies amount of hate you have on target by percent over instantly,",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 456,
    label: "SE_AddHateOverTimePct",
    description: "Modifies amount of hate you have on target by percent over time,",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 457,
    label: "SE_ResourceTap",
    description: "Coverts a percent of spell dmg from dmg spells (DD/DOT) to hp/mana/end.",
    se_base: "% Coversion",
    se_limit: "0=H/1=M/2=E",
    se_max: "Max Amt"
  },
  {
    value: 458,
    label: "SE_FactionModPct",
    description: "Modifies faction gains and losses by percent.",
    se_base: "Amt %",
    se_limit: "none",
    se_max: "none"
  },
  {
    value: 459,
    label: "SE_DamageModifier2",
    description: "Modifies damage amount by percent for a specific skill.",
    se_base: "Amt %",
    se_limit: " Skills (-1=ALL)",
    se_max: "none"
  }
];