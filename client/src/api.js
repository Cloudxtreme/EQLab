import superagent from 'superagent';


const API_ROOT = '/eqlab/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `JWT ${token}`);
  }
}

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  delete: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
};

const auth = {
  logIn: (username, password) =>
    requests.post('/auth/login', { user: { username, password } }),
  register: (username, email, password) =>
    requests.post('/auth/register', { user: { username, email, password } })
};

const global = {
  getGlobalVariables: () =>
    requests.get('/global/variables')
}

const zone = {
  getZoneList: () =>
    requests.get('/zone/zonelist'),
  getSpawnTreeData: zoneName => 
    requests.get(`/zone/spawntree/${zoneName}`),
  getSingleSpawnTreeData: spawn2ID => 
    requests.get(`/zone/singlespawn2tree/${spawn2ID}`),

  getSpawnData: spawn2ID => 
    requests.get(`/zone/spawn/${spawn2ID}`),
  postSpawn2: zone => 
    requests.post(`/zone/spawn/spawn2/${zone}`),
  putSpawn2: (id, body) => 
    requests.put(`/zone/spawn/spawn2/${id}`, body),
  deleteSpawn2: id => 
    requests.delete(`/zone/spawn/spawn2/${id}`),
        
  searchSpawngroups: searchTerm =>
    requests.get(`/zone/spawn/spawngroup/search/${searchTerm}`),
  selectSpawngroup: id =>
    requests.get(`/zone/spawn/spawngroup/${id}`),
  postSpawngroup: (spawn2ID, zone) => 
    requests.post(`/zone/spawn/spawngroup/${spawn2ID}`, { zone }),
  putSpawngroup: (id, body) => 
    requests.put(`/zone/spawn/spawngroup/${id}`, body),
  deleteSpawngroup: id => 
    requests.delete(`/zone/spawn/spawngroup/${id}`),

  postSpawnentry: (spawngroupID, npcID) => 
    requests.post(`/zone/spawn/spawngroup/spawnentry/${spawngroupID}/${npcID}`),
  updateSpawnentry: (spawngroupID, npcID, values) => 
    requests.put(`/zone/spawn/spawngroup/spawnentry/${spawngroupID}/${npcID}`),
  deleteSpawnentry: (spawngroupID, npcID) => 
    requests.delete(`/zone/spawn/spawngroup/spawnentry/${spawngroupID}/${npcID}`)
};

const npc = { 
  getNPCData: npcID =>
    requests.get(`/npc/${npcID}`),
  putNPC: (npcID, body) => 
    requests.put(`/npc/${npcID}`, body),
  searchNPCs: searchTerm =>
    requests.get(`/npc/search/${searchTerm}`),
  searchSpellSets: searchTerm =>
    requests.get(`/npc/spellset/search/${searchTerm}`),
  searchEffectSets: searchTerm =>
    requests.get(`/npc/effectset/search/${searchTerm}`),
  getSpellList: () =>
    requests.get(`/npc/spelllist`),
  getPassiveList: () =>
    requests.get(`/npc/passivelist`),
  getRaceList: () =>
    requests.get(`/npc/racelist`),
  getFactionList: () =>
    requests.get(`/npc/factionlist`),
  getAltCurrencyList: () =>
    requests.get(`/npc/altcurrencylist`),
  getTintList: () =>
    requests.get(`/npc/tintlist`)

};

const item = {
  searchLootTables: searchTerm =>
    requests.get(`/item/loottable/search/${searchTerm}`)
}

export default {
  auth,
  global,
  zone,
  npc,
  item,
  setToken: (_token) => { token = _token; }
};