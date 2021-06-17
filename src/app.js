const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const getWeather = require('../src/utils/weather');

const app = express();

const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Divyadeet'
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Divyadeet'
    });
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Divyadeet'
    });
})

app.get('/weather', (req, res) => {
    const location = req.query.address;
    if(!location){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(location,(error, data = {}) => {
        if(error){
            return res.send(error);
        }

        getWeather(data, (error, weather) => {
            if(error){
                return res.send(error);
            }
            res.send({
                location : weather.location,
                forecast: 'It will be '+weather.description+' throughout the day.',
                temperature: ' Currently it is ' + weather.temperature + ' deg.',
                feelsLike: ' But feels like ' + weather.feelsLike +' deg.'
            })
        });
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Divyadeet',
        errorMsg: 'Page not found !!'
    })
})

app.listen(3000, () => {
    console.log('Server listening on 3000');
})