const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_first_db', {
    useNewUrlParser: true, useUnifiedTopology: true
});
const UserSchema = new mongoose.Schema({
    name: String,
    quote: String
})
// create an object to that contains methods for mongoose to interface with MongoDB
const User = mongoose.model('User', UserSchema);


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {  
    res.render('index')
});

app.post('/users', (req, res) => {
    User.create(req.body)
    .then(newUser => {
        res.redirect('/quotes')
    })
    .catch(console.log)
})

app.get('/quotes', (req, res) => {
    User.find()
    .then(quotes => res.render('quotes', {quotes}))
    .catch(err => res.json(err))
})


app.listen(3333, () => console.log('listening on 3333'));