const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const weatherApp = require('./utils/weather')

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templets/views')
const partialPath = path.join(__dirname, '../templets/partial')
const publicDirPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs');                          //Setup hbs templet engine
app.set('views', viewsPath)                              //set location of views
hbs.registerPartials(partialPath)
console.log(path.join(__dirname, '/templets'))                      // Used to join path

app.use(express.static(publicDirPath));                                       //  this is to print static web page

app.get('/api', (req, res) => {
    if(!req.query.address){
        return res.send({error:'provide Address '})
    }
    geoCode(req.query.address, (error,{long, lat, location}={}) => { 
        if (error) {
            return res.send({ error:'This is an error'  })  
        }
        weatherApp(long, lat, (error,forcastData) => {
            if (error) {
                return res.send({ error })
            }
            console.log(forcastData)
            res.send({
                location,
                weather: forcastData,
                address: req.query.address
            })
        })
    })
    // res.render('/home',{
    //     'title' : 'Weather ',
    //     'name' : 'Weather API',

    // })
})


app.get('/', (req, res) => {
    res.render('home', {
        'title': 'This is home page ',
        'name': 'Weather',
        'source': 'API'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'This is About page ',
        'name': 'John',
        'source': 'Src'
    })
})
app.get('/index', (req, res) => {
    res.render('index', {
        'title': 'This is Help page ',
        'name': 'John',
        'source': 'Src'
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            'error': 'you need to provide some location'
        })
    }
    console.log(req.query);
    const value = req.query.search
    res.send({
        'source': value
    })
})
app.get('/other', (req, res) => {
    res.render('other', {
        'title': 'This is Other page ',
        'name': 'John',
        'source': 'Src'
    })
})
app.get('/about/*', (req, res) => {
    res.render('error', {
        'place': 'about'
    })
})
app.get('/index/*', (req, res) => {
    res.render('error', {
        'place': 'index'
    })
})
app.get('/other/*', (req, res) => {
    res.render('error', {
        'place': 'other'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        'place': 'NoWhere'
    })
})


app.get('/welcome', (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.listen(port, () => {
    console.log("Running at port "+ port);
});