import superagent from 'superagent';


const API_ROOT = '/eqlab/api';

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `JWT ${token}`);
  }
}

const requests = {
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .on('error', error => error)
      .then(res => res.body),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .on('error', error => error)
      .then(res => res.body),
  patch: (url, body) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .on('error', error => error)
      .then(res => res.body),
  delete: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .on('error', error => error)
      .then(res => res.body)
}

const auth = {
  logIn: (username, password) =>
    requests.post('/auth/login', { user: { username, password } }),
  register: (username, email, password) =>
    requests.post('/auth/register', { user: { username, email, password } })
}

const eqlab = {
  getGlobalVariables: () =>
    requests.get('/global/variables')
}

const zone = {
  getZoneList: () =>
    requests.get('/zones/list'),

  getZoneMap: (zoneName) =>
    requests.get(`/zones/${zoneName}/map`),

  getFullSpawnTree: zoneName => 
    requests.get(`/zones/spawn/tree/${zoneName}`),
  getSingleSpawn2Tree: spawn2ID => 
    requests.get(`/zones/spawn2/tree/${spawn2ID}`),
  getSingleSpawngroupTree: spawngroupID => 
    requests.get(`/zones/spawngroup/tree/${spawngroupID}`),

  getSpawn2: id => 
    requests.get(`/zones/spawn/${id}`),
  postSpawn2: zone => 
    requests.post(`/zones/${zone}/spawn/spawn2`),
  patchSpawn2: (id, values) => 
    requests.patch(`/zones/spawn/spawn2/${id}`, values),
  deleteSpawn2: id => 
    requests.delete(`/zones/spawn/spawn2/${id}`),
        
  searchSpawngroupOptions: searchTerm =>
    requests.get(`/zones/spawn/spawngroup/options/search/${searchTerm}`),
  getSpawngroup: id =>
    requests.get(`/zones/spawn/spawngroup/${id}`),
  postSpawngroup: (spawn2ID, zone) => 
    requests.post(`/zones/spawn/${spawn2ID}/spawngroup`, { zone }),
  patchSpawngroup: (id, values) => 
    requests.patch(`/zones/spawn/spawngroup/${id}`, values),
  deleteSpawngroup: id => 
    requests.delete(`/zones/spawn/spawngroup/${id}`),

  postSpawnentry: (spawngroupID, npcID) => 
    requests.post(`/zones/spawn/spawngroup/${spawngroupID}/spawnentry/${npcID}`),
  patchSpawnentry: (spawngroupID, npcID, values) => 
    requests.patch(`/zones/spawn/spawngroup/${spawngroupID}/spawnentry/${npcID}`),
  deleteSpawnentry: (spawngroupID, npcID) => 
    requests.delete(`/zones/spawn/spawngroup/${spawngroupID}/spawnentry/${npcID}`)
}

const npc = { 
  searchNPCs: values =>
    requests.post(`/npcs/search`, values),
  getNPC: npcID =>
    requests.get(`/npcs/${npcID}`),
  postNPC: values =>
    requests.post(`/npcs`, values),
  copyNPC: npcID =>
    requests.post(`/npcs/copy/${npcID}`),
  patchNPC: (npcID, values) => 
    requests.patch(`/npcs/${npcID}`, values),
  deleteNPC: npcID => 
    requests.delete(`/npcs/${npcID}`),

  getTemplates: () =>
    requests.get(`/npcs/templates`),
  getNPCTemplate: templateID =>
    requests.get(`/npcs/templates/${templateID}`),
  postNPCTemplate: () =>
    requests.post(`/npcs/templates`),
  copyNPCTemplate: templateID =>
    requests.post(`/npcs/templates/${templateID}`),
  patchNPCTemplate: (templateID, values) =>
    requests.patch(`/npcs/templates/${templateID}`, values),
  deleteNPCTemplate: (templateID) =>
    requests.delete(`/npcs/templates/${templateID}`),

  searchNPCOptions: searchTerm =>
    requests.get(`/npcs/options/search/${searchTerm}`),
  searchFactionOptions: searchTerm =>
    requests.get(`/npcs/faction/options/search/${searchTerm}`),
  searchTintOptions: searchTerm =>
    requests.get(`/npcs/tint/options/search/${searchTerm}`),
  searchSpellSetOptions: searchTerm =>
    requests.get(`/npcs/spellset/options/search/${searchTerm}`),
  searchEffectSetOptions: searchTerm =>
    requests.get(`/npcs/effectset/options/search/${searchTerm}`),
    
  getSpellList: () =>
    requests.get(`/npcs/spellset/list`),
  getPassiveList: () =>
    requests.get(`/npcs/effectset/list`),
  getRaceList: () =>
    requests.get(`/npcs/race/list`),
  getFactionList: () =>
    requests.get(`/npcs/faction/list`),
  getAltCurrencyList: () =>
    requests.get(`/npcs/altcurrency/list`),
  getTintList: () =>
    requests.get(`/npcs/tint/list`)
}

const spell = {
  searchSpells: values =>
    requests.post(`/spells/search`, values),
  getSpell: spellID =>
    requests.get(`/spells/${spellID}`),
  postSpell: values =>
    requests.post(`/spells`, values),
  copySpell: spellID =>
    requests.post(`/spells/copy/${spellID}`),
  patchSpell: (spellID, values) => 
    requests.patch(`/spells/${spellID}`, values),
  deleteSpell: spellID => 
    requests.delete(`/spells/${spellID}`),

  getTemplates: () =>
    requests.get(`/spells/templates`),
  getSpellTemplate: templateID =>
    requests.get(`/spells/templates/${templateID}`),
  postSpellTemplate: () =>
    requests.post(`/spells/templates`),
  copySpellTemplate: templateID =>
    requests.post(`/spells/templates/${templateID}`),
  patchSpellTemplate: (templateID, values) =>
    requests.patch(`/spells/templates/${templateID}`, values),
  deleteSpellTemplate: (templateID) =>
    requests.delete(`/spells/templates/${templateID}`),
}

const item = {
  searchLootTableOptions: searchTerm =>
    requests.get(`/items/loottable/options/search/${searchTerm}`)
}

export default {
  auth,
  eqlab,
  zone,
  npc,
  spell,
  item,
  setToken: (_token) => { token = _token; }
};