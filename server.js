const express = require('express');
const hbs = require('hbs')
const fs = require('fs');

// creating an express app
let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// middleware to show how the server is working
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append file.')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// creating a new route with express
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the site',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send ({
        error: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});