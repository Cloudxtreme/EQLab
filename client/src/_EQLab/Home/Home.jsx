import React from 'react';

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <h4>Welcome to the EQLab Alpha!</h4>
        <h5>To Do:</h5>
        <ul>
          <li>Finish up validation</li>
          <li>Files - Create dbstr_us.txt, Create spells_us.txt, Create Build (db, spells, textures, compressed)</li>
          <li>Merchant List Templates (for adding spell sets ie Wizard 1-8, Necro 40-49, etc)</li>
          <li>Authentication - Login/Logout, Admin Tools (Invites, Privileges)</li>
          <li>Zones - Mapper, Rules</li>
          <li>React Routes + React Helmet</li>
          <li>Re-style SpawnEditor</li>
          <li>CSS/Styling Improvements (Ongoing)</li>
        </ul>
      </div>
    );
  }
}

export default Home;