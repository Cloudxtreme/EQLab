# EQLab

### Installation
1. Install latest version of Node.js
1. Clone this repo
1. Navigate to */EQLab/server* in command prompt and type **npm install**
1. Copy config file **default-env.txt** from */EQLab/server/config* to */EQLab/server* and rename to **.env**
1. Create new MySQL user if desired and give all privileges
1. Adjust config settings
1. Enable MySQL bin-logging if using WebSockets
1. Copy client files (dbstr_us.txt, ...) to */EQLab/files*
1. To start server, navigate to */EQLab/server* in command prompt and type **node eqlab**