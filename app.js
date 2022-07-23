require('dotenv').config()
const mongo = require('mongoose');
const express = require('express');


const app = express();
app.use(express.json())
app.use('/',require('./routers/user.js'))

async function main() {
    try{
        await await mongo.connect(process.env.URL_DB, {useNewUrlParser: true ,  useUnifiedTopology: true});
        app.listen(process.env.PORT, console.log(`server start on ${process.env.PORT}`));
    }catch (e) {
        console.log(e)
    }
    
}
main();
