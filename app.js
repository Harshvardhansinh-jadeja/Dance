const express = require("express");
const path = require("path");
const app = express();
const bodyparser =require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    number: String,
    address: String,
  });

const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})


app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})


app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("Your item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item has not been saved to the database")
    })
    // res.status(200).render('contact.pug',);
})

// app.get('/', (req, res)=>{
//     const params = {}
//     res.status(200).render('index.pug', params);
// })
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

//start the server
app.listen(port , ()=>{
    console.log(`   The application is started successfully on port ${port}`);
})