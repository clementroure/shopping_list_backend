const express = require("express")
const app = express();
require('dotenv').config();
var bodyParser = require('body-parser');
const admin = require("firebase-admin");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Policy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Credentials', '*');
  next();
});

// Firebase NoSQL DB Initialization //
var serviceAccount = require("./google.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `${process.env.FB_DATABASE_URL}`
});
const db = admin.firestore();

app.post('/update_list',(req,res) => {

  const data = {
    id: req.body.id,
    list: req.body.list
  };  
 
  db.collection('list').doc(req.body.id).set(data).catch(err => console.log(err));
});

app.post('/get_list',(req,res) => {
 
  db.collection('list').doc(req.body.id).get().then(function(doc) {
    console.log(doc.data().list);
    res.json({ list:  doc.data().list})
  });
});

app.listen(4000, () => {
  console.log("App is listening to port 4000")
});