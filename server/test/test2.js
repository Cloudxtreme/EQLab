const fs              = require('fs-extra'),
      readline        = require('readline'),
      es              = require('event-stream'),
      path            = require('path'),
      D3Node          = require('d3-node'),
      _               = require('lodash'),
      __mapsDirectory = path.resolve(__dirname + '/../../files/maps');


/********************************************************************************************/


function renderZoneMap(zoneName) {
  /*
  There are two types of entries in the map files; Lines (L) and points (P). 
  A line consists of two points (start and end) with each three coordinates (a 3D vector), followed by a color code. 
  A point consists of one point with three coordinates, followed by a color code, a font size and a label.

  A coordinate in the map is in the form of Y, X, Z, and is different from the in-game /loc coordinate. 
  First, the X and Y coordinates are swapped. 
  Second, they are multiplied by -1, meaning that 100 /loc translates into -100 in the map file.

  Color codes are in the form of R (red), G (green), B (blue), meaning that 0, 0, 0 is black, and 255, 255, 255 is white.
  Font sizes have three possible values: 1, 2 and 3, where 1 is the smallest (and borderline unreadable), and 3 is the largest.
  Labels are written with underscores instead of spaces.
  */

  // const d3n = new D3Node();
  const readStream = fs.createReadStream(path.resolve(__mapsDirectory + `/${zoneName}.txt`));
  const writeStream = fs.createWriteStream(path.resolve(__dirname + `/maps/${zoneName}.txt`));
  let xArr = [], yArr = [];
  let x_min, x_max;
  let y_min, y_max;
  let width, height;
  let dimensions;

  readStream
    .pipe(es.wait((err, body) => {
      x_min = _.min(xArr);
      x_max = _.max(xArr);
      y_min = _.min(yArr);
      y_max = _.max(yArr);

      width = Math.abs(x_min) + Math.abs(x_max);
      height = Math.abs(y_min) + Math.abs(y_max);

      dimensions = {
        width,
        height
      }
    }))
    .pipe(es.split()) //split stream to break on newlines
    .pipe(es.map((data, cb) => {
      const lRx = new RegExp('L\\s(.+)', 'g');
      const pRx = new RegExp('P\\s(.+),\\s(.+)', 'g');
      let type = data.charAt(0);
      let result, colorArr, color, line, point;
      let lData, lArr, p1Arr, p1, p2Arr, p2;
      let pData, pLabel, pArr, pCoordsArr, p, pFontSize;
  
      if (type === 'L') {
        
        result = lRx.exec(data);
        lData = result[1];
        lArr = lData.split(',').map(str => str.trim());
  
        p1Arr = lArr.slice(0, 3).map(coord => {
          if (coord == 0) return 0;
          return (coord * -1);
        });
        p1 = {x: p1Arr[1], y: p1Arr[0], z: p1Arr[2]};
        
        p2Arr = lArr.slice(3, 6).map(coord => {
          if (coord == 0) return 0;
          return (coord * -1);
        });
        p2 = {x: p2Arr[1], y: p2Arr[0], z: p2Arr[2]};
  
  
        colorArr = lArr.slice(6);
        color = {r: parseInt(colorArr[0], 10), g: parseInt(colorArr[1], 10), b: parseInt(colorArr[2], 10)}
  
        cb(null, { type: 'L', p1, p2, color });
  
      } else if (type === 'P') {
        
        result = pRx.exec(data);
        pData = result[1];
        pArr = pData.split(',').map(str => str.trim());
        
        pCoordsArr = pArr.slice(0, 3).map(coord => {
          if (coord == 0) return 0;
          return (coord * -1);
        });
        p = {x: pCoordsArr[1], y: pCoordsArr[0], z: pCoordsArr[2]};
  
        colorArr = pArr.slice(3, 6);
        color = {r: parseInt(colorArr[0], 10), g: parseInt(colorArr[1], 10), b: parseInt(colorArr[2], 10)}
  
        pFontSize = parseInt(pArr.slice(6)[0], 10);
        pLabel = result[2];
  
        cb(null, { type: 'P', p, color, fontsize: pFontSize, label: pLabel });
      }
    }))
    .pipe(es.map((data, cb) => {
      if (data.type === 'L') {
        xArr = xArr.concat([data.p1.x, data.p2.x]);
        yArr = yArr.concat([data.p1.y, data.p2.y]);
      } else if (data.type === 'P') {
        xArr = xArr.concat([data.p.x]);
        yArr = yArr.concat([data.p.y]);
      }
      cb(null, data);
    }))
    .pipe(es.stringify())
    .pipe(writeStream)

}

renderZoneMap('blackburrow');