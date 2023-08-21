import express from 'express';  //New version line of code we have to modify the packet.json file ["type":"module"];
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//Components
import connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();
const app = express();

app.use(cors());   //for handling cors error of the browser
app.use(bodyParser.json({extended:true})); 
app.use(bodyParser.urlencoded({extended:true}));   // for handling spaces or invalid characters in the url
app.use('/',Router);

const PORT = 8000;

connection();

app.listen(PORT,()=> console.log(`Server is Running on Port ${PORT}`));

