<li key={entry.npc_id}>
<a 
  onClick={this.handleNPC} 
  id={entry.npc_id}
>
  <tr>
    <td>{entry.chance}%</td>
    <td>{entry.npc_name}</td>
  </tr>
</a>
</li>