global.Olm = require('olm');
global.crypto = require('crypto').webcrypto;
var LocalStorage = require("node-localstorage").LocalStorage;

const rootFilePath = "./motionDetect/"
const fs = require('fs');
const axios = require('axios');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Matrix Set up
const { MemoryCryptoStore } = require("matrix-js-sdk");
var sdk = require("matrix-js-sdk");
const { error } = require('console');
global.localStorage = new LocalStorage("./session");
BASE_URL = "https://matrix.pdxinfosec.org";
PASSWORD = "G3Vsnzvr";
USERNAME = "@test003:pdxinfosec.org";
ROOM_ID = "!bdQMmkTBTMqUPAOvms:pdxinfosec.org";
const client = sdk.createClient(BASE_URL);

// Add messages when sockets open and close connections
io.on('connection', (socket) => {
  console.log(`[${socket.id}] socket connected`);

  

  socket.on('login', (username, password, server) => {

    if(server != BASE_URL || server == null){
      socket.emit("wrongServer", "Wrong");
    }else{
      socket.emit("wrongServer", "Right");
    }
    
    client.login("m.login.password", {"user": username, "password": password})
    .then((respond) => socket.emit("result", "success"))
    
    .catch((error) => socket.emit("result", "fail"))
    
  });

  socket.on('logout', (isLogout) => {
    if(isLogout){
      client.logout();
    }
  });
  
  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});



run = async () => {

  const info = await client.login("m.login.password", {
      user: USERNAME,
      password: PASSWORD,
  });
  console.log("***********************");
  console.log(info);
  console.log("***********************");

  client.sessionStore = new sdk.WebStorageSessionStore(global.localStorage);
  client.cryptoStore = new MemoryCryptoStore();
  client.deviceId = info.device_id;

  await client.initCrypto();
  client.setGlobalErrorOnUnknownDevices(false);
  
  client.on("Event.decrypted", async (e) => {
      const { room_id, content } = e.clearEvent;

      if (content !== undefined) {
        if (typeof content.file !== 'undefined') {
          const fileExtension = (content.body.slice((Math.max(0, content.body.lastIndexOf(".")) || Infinity) + 1));
          const fileName = String(content.file.url).split("org/")[1] + "." + fileExtension
          const filePath = String("./" + rootFilePath + String(content.file.url).split("org/")[1] + "." + fileExtension)
          

            const response = await axios.get(
                client.mxcUrlToHttp(content.file.url),
                { responseType: 'arraybuffer' }
            );
            const decryptData = await decryptAttachment(
                response.data,
                content.file
            );
            
            fs.writeFile(
                filePath,
                Buffer.from(decryptData),
                (err) => {
                    if (err) {
                        console.error(err);
                    }
                }
            );
            content.fileName = fileName
            io.sockets.emit("motion-detect", content);
        }
    }

  });

  await client.startClient();
};

run();

// Broadcast the current server time as global message, every 1s
setInterval(() => {
  io.sockets.emit('time-msg', { time: new Date().toISOString() });
}, 1000);

// Show the index.html by default
app.get('/', (req, res) => res.sendFile('index.html'));

// Start the express server
http.listen(3000, function(){
  console.log('listening on *:3000');
});


function decryptAttachment(data, info) {
  if (
      info === undefined ||
      info.key === undefined ||
      info.iv === undefined ||
      info.hashes === undefined ||
      info.hashes.sha256 === undefined
  ) {
      throw new Error('error');
  }

  return global.crypto.subtle
      .importKey('jwk', info.key, { name: 'AES-CTR' }, false, [
          'encrypt',
          'decrypt',
      ])
      .then((key) => {
          return global.crypto.subtle
              .decrypt(
                  {
                      name: 'AES-CTR',
                      counter: decodeBase64(info.iv), //The same counter you used to encrypt
                      length: 64, //The same length you used to encrypt
                  },
                  key, //from generateKey or importKey above
                  data //ArrayBuffer of the data
              )
              .then(function (decrypted) {
                  return decrypted;
              })
              .catch(function (err) {
                  console.error(err);
              });
      });
}

function decodeBase64(base64) {
  // Pad the base64 up to the next multiple of 4.
  var paddedBase64 = base64 + '==='.slice(0, (4 - (base64.length % 4)) % 4);
  // Decode the base64 as a misinterpreted Latin-1 string.
  // window.atob returns a unicode string with codeines in the range 0-255.
  var latin1String = global.atob(paddedBase64);
  // Encode the string as a Uint8Array as Latin-1.
  var uint8Array = new Uint8Array(latin1String.length);
  for (var i = 0; i < latin1String.length; i++) {
      uint8Array[i] = latin1String.charCodeAt(i);
  }
  return uint8Array;
}

try {
  exports.encryptAttachment = encryptAttachment;
  exports.decryptAttachment = decryptAttachment;
} catch (e) {}