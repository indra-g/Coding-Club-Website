const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Home = require('./routes/api/HomeRouter');
const cors = require('cors')
require('dotenv').config();

//Initializing app
const app = express()

//Mongoose DB connect
const uri = require('./config/database').database_uri
mongoose.connect(uri,
    {useUnifiedTopology: true , useNewUrlParser:true});

//getting the connection object
//verifying if connection is set up successfully

const db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDb connected');
});

//Body Parser Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//Establishing Routes
app.use('/api',Home);

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{console.log('Server Connected')});
