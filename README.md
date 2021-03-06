# deepface-react

[![NPM](https://img.shields.io/npm/v/deepface-react.svg)](https://www.npmjs.com/package/deepface-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save deepface-react
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'deepface-react'
import 'deepface-react/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## Manual use (without ReactJS)

Copy file from deepface-react/example directory.
package contains files and folders as showed below.

```bash
js
 - dcfaceid.min.js
 - deepscanworker.min.js
 - deeptinyfaceworker.min.js
models
 pass_uint8
  - group1-shard1of2.bin
  - group1-shard2of2.bin
  - model.json
wasm
 - tfjs-backend-wasm-simd.wasm
 - tfjs-backend-wasm-threaded-simd.wasm
 - tfjs-backend-wasm.wasm
```

include dcfaceid.min.js file

```html
<script src="/js/dcfaceid.min.js"></script>
```
and initialize class after page load
```javascript
window.onload = function() {
  let faceID = new DCFaceID({url:"http://host:8080/api/"});
  let ds = faceID.createDeepScan('container', {
                  width: width,
                  height: width-50,
                  mrzOptions: {server: true},
                  camera: {fillOnMobile: true, cutEdge: true},
                  scan_worker_path: 'js/deepscanworker.min.js',
                  face_worker_path: 'js/deeptinyfaceworker.min.js',
                  useServerSide: true,
                  visual: {
                    showArea: true,
                    showTitle: true
                  },
                  text: {
                    processing: "text of processing"
                  },
                  onInit: () => {
                  },
                  onCardDetected: (cards) => {
                  },
                  onCommand: (command) => {
                  },
                  onFinished: (result) => {
                  }
          });
  // Start Deep Scan
  ds.start();
}
```

## API Requests

API have 4 main requests

#### get Ready
request: /api/card/ready

```javascript
fetch("/api/card/ready", {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
```

response

```json
{"success": true}
```

#### start detecting session
request: /api/start

```javascript
fetch("/api/start", {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
```

response

```json
{"success": true, "tid": "12345375835"}
```

#### detect
request: /api/card/detect

```javascript
let fd = new FormData();
fd.append("image", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...");
fd.append("type", '0');
fd.append("tid", tid);

fetch(url, {
  method: 'POST',
  body: fd,
})
```

response

```json

```

#### get detection
request /api/detection/{tid}

```javascript
fetch("/api/detection/{tid}", {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
```

response
```json
{
  "data":
    {
      "copy":false,
      "items":[
        {"bbox":[23,152,738,429],"class":"id_front","classIndex":1,"copy":false,"face":{"annotation":null,"height":151,"landMarks":[],"width":151,"x":98,"y":204},"image":"/Users/rork/Documents/projects/deepcontrol/server/idscanner/media/11612768009645/1612768027.jpg","mrz":null,"score":1.0},
        {"bbox":[13,124,758,447],"class":"id_back","classIndex":2,"copy":false,"face":null,"image":"/Users/rork/Documents/projects/deepcontrol/server/idscanner/media/11612768009645/1612768039.jpg","mrz":{"Country":"ARM","DateOfBirth":"841022","Expiration_date":"231216","FirstName":"ASHOT","LastName":"GASPARYAN","Lines":["I<ARM0003855599<<<<<<<<<<<<<<<","8410227M2312167ARM<<<<<<<<<<<4","GASPARYAN<<ASHOT<<<<<<<<<<<<<<"],"MrzType":"TD1","Nationality":"ARM","SerialNumber":"000385559","Sex":"M","Type":"I<","Valid":true},"score":1.0}
      ],
      "list":[
        {"bbox":[207,143,435,287],"class":"id_front","classIndex":1,"copy":false,"face":{"annotation":null,"height":104,"landMarks":[],"width":104,"x":55,"y":131},"image":"/Users/rork/Documents/projects/deepcontrol/server/idscanner/media/11612768009645/1612768021.jpg","mrz":null,"score":0.99},
        {"bbox":[23,152,738,429],"class":"id_front","classIndex":1,"copy":false,"face":{"annotation":null,"height":151,"landMarks":[],"width":151,"x":98,"y":204},"image":"/Users/rork/Documents/projects/deepcontrol/server/idscanner/media/11612768009645/1612768027.jpg","mrz":null,"score":1.0},
        {"bbox":[13,124,758,447],"class":"id_back","classIndex":2,"copy":false,"face":null,"image":"/Users/rork/Documents/projects/deepcontrol/server/idscanner/media/11612768009645/1612768039.jpg","mrz":{"Country":"ARM","DateOfBirth":"841022","Expiration_date":"231216","FirstName":"ASHOT","LastName":"GASPARYAN","Lines":["I<ARM0003855599<<<<<<<<<<<<<<<","8410227M2312167ARM<<<<<<<<<<<4","GASPARYAN<<ASHOT<<<<<<<<<<<<<<"],"MrzType":"TD1","Nationality":"ARM","SerialNumber":"000385559","Sex":"M","Type":"I<","Valid":true},"score":1.0}
      ],
      "mrz":{"Country":"ARM","DateOfBirth":"841022","Expiration_date":"231216","FirstName":"ASHOT","LastName":"GASPARYAN","Lines":["I<ARM0003855599<<<<<<<<<<<<<<<","8410227M2312167ARM<<<<<<<<<<<4","GASPARYAN<<ASHOT<<<<<<<<<<<<<<"],"MrzType":"TD1","Nationality":"ARM","SerialNumber":"000385559","Sex":"M","Type":"I<","Valid":true}},
  "success":true
}
```

#### get image
request: /api/media/{tid}/{image name}

example
```text
http://localhost:8080/api/media/11612768009645/1612768027.jpg
```

#### verify
request: /api/verify

```javascript
fetch("/api/verify", {
  method: 'POST',
  headers: {"Content-Type": "application/json"},
  body: {
          "docType": "id",
          "scans":[
            {"docFace": "id_front", "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."},
            {"docFace": "id_back", "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."}
          ],
          "tid": "11612713545939"
        }
})
```

response

```json
{
    "data":
    {
        "copy": false,
        "docType": "id",
        "items": [
        {
            "bbox": [19, 140, 738, 436],
            "class": "id_front",
            "classIndex": 1,
            "copy": false,
            "face":
            {
                "annotation": null,
                "height": 148,
                "landMarks": [],
                "width": 148,
                "x": 84,
                "y": 208
            },
            "image": "/idscanner/media/11612713545939/1612713563.jpg",
            "mrz": null,
            "score": 1.0
        },
        {
            "bbox": [9, 96, 775, 469],
            "class": "id_back",
            "classIndex": 2,
            "copy": false,
            "face": null,
            "image": "/idscanner/media/11612713545939/1612713577.jpg",
            "mrz":
            {
                "Country": "USA",
                "DateOfBirth": "22.10.1984",
                "Expiration_date": "16.12.2023",
                "FirstName": "SMITH",
                "LastName": "JOHN",
                "Lines": ["I<USA0012345679<<<<<<<<<<<<<<<", "8410227M2312087USA<<<<<<<<<<<4", "JOHN<<SMITH<<<<<<<<<<<<<<"],
                "MrzType": "TD1",
                "Nationality": "USA",
                "SerialNumber": "0012345679",
                "Sex": "M",
                "Type": "I<",
                "Valid": true
            },
            "score": 0.82
        }],
        "list": [
        {
            "bbox": [-34, 131, 803, 450],
            "class": "id_front",
            "classIndex": 1,
            "copy": false,
            "face":
            {
                "annotation": null,
                "height": 161,
                "landMarks": [],
                "width": 161,
                "x": 78,
                "y": 208
            },
            "image": "/idscanner/media/11612713545939/1612713558.jpg",
            "mrz": null,
            "score": 0.92
        },
        {
            "bbox": [19, 140, 738, 436],
            "class": "id_front",
            "classIndex": 1,
            "copy": false,
            "face":
            {
                "annotation": null,
                "height": 148,
                "landMarks": [],
                "width": 148,
                "x": 84,
                "y": 208
            },
            "image": "/idscanner/media/11612713545939/1612713563.jpg",
            "mrz": null,
            "score": 1.0
        },
        {
            "bbox": [19, 117, 748, 450],
            "class": "id_back",
            "classIndex": 2,
            "copy": false,
            "face": null,
            "image": "/idscanner/media/11612713545939/1612713571.jpg",
            "mrz":
            {
                "Country": "USA",
                "DateOfBirth": "22.10.1984",
                "Expiration_date": "16.12.2023",
                "FirstName": "SMITH",
                "LastName": "JOHN",
                "Lines": ["I<USA0012345679<<<<<<<<<<<<<<<", "8410227M2512087USA<<<<<<<<<<<4", "JOHN<<SMITH<<<<<<<<<<<<<<"],
                "MrzType": "TD1",
                "Nationality": "USA",
                "SerialNumber": "0012345679",
                "Sex": "M",
                "Type": "I<",
                "Valid": false
            },
            "score": 1.0
        },
        {
            "bbox": [9, 96, 775, 469],
            "class": "id_back",
            "classIndex": 2,
            "copy": false,
            "face": null,
            "image": "/idscanner/media/11612713545939/1612713577.jpg",
            "mrz":
            {
                "Country": "USA",
                "DateOfBirth": "22.10.1984",
                "Expiration_date": "16.12.2023",
                "FirstName": "SMITH",
                "LastName": "JOHN",
                "Lines": ["I<USA0012345679<<<<<<<<<<<<<<<", "8410227M2512087USA<<<<<<<<<<<4", "JOHN<<SMITH<<<<<<<<<<<<<<"],
                "MrzType": "TD1",
                "Nationality": "USA",
                "SerialNumber": "0012345679",
                "Sex": "M",
                "Type": "I<",
                "Valid": true
            },
            "score": 0.82
        }],
        "mrz":
        {
            "Country": "USA",
            "DateOfBirth": "22.10.1984",
            "Expiration_date": "16.12.2023",
            "FirstName": "SMITH",
            "LastName": "JOHN",
            "Lines": ["I<USA0012345679<<<<<<<<<<<<<<<", "8410227M2512087USA<<<<<<<<<<<4", "JOHN<<SMITH<<<<<<<<<<<<<<"],
            "MrzType": "TD1",
            "Nationality": "USA",
            "SerialNumber": "0012345679",
            "Sex": "M",
            "Type": "I<",
            "Valid": true
        }
    },
    "success": true
}
```

## License
MIT © [Ashot Gasparyan](https://github.com/rorkflash)
