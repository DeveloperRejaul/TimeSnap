const screenshot = require('screenshot-desktop')

screenshot().then((img) => {
  console.log(img);
  
}).catch((err) => {
  console.log(err);
  
})