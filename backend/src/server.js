const _listings = require('./listings.js');
const express = require('express');
const serverless = require("serverless-http");
const _ = require('lodash')


// Initialize expess
const app = express();
const router = express.Router();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');

    if('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.method}: ${req.path}`);
        next();
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let users = [ ];
let listings = _listings.listings;
let minID = 0;

function addUser(user) {
    const prev = _.find(users, u => u.username === user.username && u.password === user.password);
    
    if(!prev) {
        users.push({...user, id: minID});
    }

    console.log("Current Users: ");
    console.log(users);

    return prev || user;
}

router.get('/user', (req, res) => {
    const data = JSON.parse(req.query.data);
    const un = data.username;
    const pw = data.password;

    const entry = _.find(users, u => u.username === un && u.password === pw)

    if(entry) {
        res.send({
            user: entry,
            success: true
        });
    } else {
        res.send({
            success: false
        });
    }
});

router.post('/user', (req, res) => {
    const user = req.body.data;
    const result = addUser(user);

    res.send({
        user: result,
        success: true,
        id: minID++
    });
});

router.put('/user', (req, res) => {
    const oldUser = req.body.old;
    const newUser = req.body.new;

    users = users.filter(u => !_.isEqual(u.username, oldUser.username) && !_.isEqual(u.password, oldUser.password));
    const result = addUser(newUser)

    res.send({
        user: result
    });
});

router.delete('/user', (req, res) => {
    const user = req.body.user;
    const len = users.len;

    users = users.filter(u => !_.isEqual(u.username, oldUser.username) && !_.isEqual(u.password, oldUser.password));

    console.log('Current users:');
    console.log(users);

    res.send({
        success: users.len !== len
    });
});

router.get('/listing', (req, res) => {
    res.send(listings);
});

router.post('/listing', (req, res) => {
    const listing = req.body.data;
    const id = _.max(listings.map(l => l.id)) + 1;

    // Can't have two listings with the same name description and skills
    const prev = _.find(listings, l => {
        return _.isEqual(l.name, listing.name) && _.isEqual(l.skills, listing.skills) && _.isEqual(l.desc, listing.desc)
    });
    
    if(!prev) {
        listings.push({...listing, id});
    }

    console.log("Current Listings: ");
    console.log(listings);

    res.send({
        listing,
        success: true
    });
});

router.post('/like', (req, res) => {
    const id = req.body.data.id;
    const user = req.body.data.user;

    listings = listings.map(listing => {
        if(_.isEqual(listing.id, id)) {
            listing.likes.push(user.id)
            listing.likes = _.uniq(listing.likes);
            console.log(listing.likes);
            return listing;
        }
        return listing;
    });
});

router.post('/dislike', (req, res) => {
    const id = req.body.data.id;
    const user = req.body.data.user;

    listings = listings.map(listing => {
        if(_.isEqual(listing.id, id)) {
            listing.likes = listing.likes.filter(likeid => likeid !== user.id);
            console.log(listing.likes);
            return listing;
        }
        return listing;
    });
});


app.listen(4201, () => {
    console.log('App listening on 4201');
});

app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);