const knex               = require(__basedir + '/db/db.js').knex,
      mysqlDump          = require(__basedir + '/db/mysqldump.js'),
      // AdmZip             = require("adm-zip"),
      // JSZip              = require("jszip"),
      archiver           = require('archiver'),
      fs                 = require('fs-extra'),
      moment             = require('moment'),
      path               = require('path'),
      DelimiterTransform = require(__basedir + '/lib/DelimiterTransform.js');


/******************************************************/

class EQLabFiles {

  

  createSpellsTxt(path) {
    return new Promise((resolve, reject) => {
      const db = knex.select('*').from('spells_new').stream({highWaterMark: 5});

      const transform = new DelimiterTransform({ delimiter: '^'});
  
      const file = fs.createWriteStream(path, {encoding: 'utf8'});
      file.on('pipe', (src) => {
        console.log('EQLab: Writing to spells_us.txt...');
      });
      file.on('error', (error) => {
        console.error('EQLab: Error writing to spells_us.txt');
        file.destroy();
        reject(error);
      });
      file.on('finish', () => {
        console.error('EQLab: Finished writing to spells_us.txt');
        resolve();
      });
      
      db.pipe(transform).pipe(file);
    });
  }

  createTempDatabaseDump(directory, timestamp, version = null) {
    console.log('EQLab: Dumping database...');
    return new Promise((resolve, reject) => {
      const filetag = version ? version.toString() : timestamp;

      mysqlDump({
        version: version,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_EQEMU_DATABASE,
        tables:['npc_types', 'spawn2', 'spawnentry', 'spawngroup', 'spells_new'],
        extendedInsert: true, // use one insert for many rows
        addDropTable: true,
        addLocks: true,
        disableKeys: true,//adds /*!40000 ALTER TABLE table DISABLE KEYS */; before insert
        dest: path.resolve(directory + `/build-${filetag}.sql`)
      }, (error) => {
        if (error) {
          console.log('EQLab: Error while dumping database...');
          reject(error);
        }
        console.log('EQLab: Database dump complete...');
        resolve();
      });
    });
  }

  createTempSpellsTxt(directory) {
    return new Promise((resolve, reject) => {
      console.log('EQLab: Creating spells_us.txt...');

      const db = knex.select('*').from('spells_new').stream({highWaterMark: 5});
      const transform = new DelimiterTransform({ delimiter: '^'});

      db
        .pipe(transform)
        .pipe(fs.createWriteStream(path.resolve(directory + '/spells_us.txt'), {encoding: 'utf8'})
          .on('pipe', (src) => {
            console.log('EQLab: Writing to spells_us.txt...');
          })
          .on('error', (error) => {
            console.error('EQLab: Error writing to spells_us.txt');
            file.destroy();
            reject(error);
          })
          .on('finish', () => {
            console.error('EQLab: Finished writing to spells_us.txt');
            resolve();
          })
        )

    });
  }

  createTempDbStrTxt(directory) {
    return new Promise((resolve, reject) => {
      console.log('EQLab: Copying current dbstr_us.txt...');
      fs.copyFile(path.resolve(__basedir + '/../files/dbstr_us.txt'), path.resolve(directory + '/dbstr_us.txt'))
        .then((error) => {
          if (error) {
            console.log('EQLab: Error while copying dbstr_us.txt...');
            reject(error);
          }
          console.log('EQLab: Finished copying dbstr_us.txt');
          resolve();
        });
    });
  }

  compressTempFiles(directory, timestamp, version = null) {
    return new Promise((resolve, reject) => {
      console.log('EQLab: Compressing files...'); 
      const filetag = version ? version.toString() + `-${timestamp}` : timestamp;

      var output = fs.createWriteStream(__basedir + `/../files/builds/build-${filetag}.zip`);
      output.on('close', () => {
        console.log('EQLab: Finished compressing files: ' + archive.pointer() + ' total bytes');
        resolve(__basedir + `/../files/builds/build-${filetag}.zip`);
      });
      output.on('end', () => {
        console.log('Data has been drained');
      });


      var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });
      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          // log warning
        } else {
          // throw error
          reject(err);
        }
      });
      archive.on('error', (err) => {
        reject(err);
      });

      archive.pipe(output);
      archive.directory(directory + '/', false);
      archive.finalize();
    });
  }

  createBuild(version = null) {
    return new Promise((resolve, reject) => {

      const timestamp = moment().format("YYYY-MM-DD-HH_mm_ss");
      const tempDirectory = `/temp/build-${timestamp}`
      const directory = path.resolve(__basedir + tempDirectory);

      console.log('EQLab: Creating new build...');
      fs.mkdir(directory)
        .then(error =>{
          if (error) reject(error);
          return this.createTempDatabaseDump(directory, timestamp, version)
        })
        .then(() => {
          return this.createTempSpellsTxt(directory);
        })
        .then(() => {
          return this.createTempDbStrTxt(directory);
        })
        .then(() => {
          return this.compressTempFiles(directory, timestamp, version);
        })
        .then(newDirectory => {
          console.log('EQLab: Removing temporary folder...');
          fs.remove(directory)
            .then(() => {
              console.log('EQLab: Temporary folder deleted successfully'); 
              resolve(path.normalize(newDirectory));
            })
            .catch(err => {
              reject(err);
            });    
        })
        .catch(error => { reject(error); })
    });
  }

}

module.exports = EQLabFiles;