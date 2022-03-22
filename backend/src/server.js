import express, { response } from 'express';
import _ from 'lodash';

// Initialize expess
const app = express();
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

// Stores an array of users as a mock DB
// id: number
// linked: url
// git: url
// pfp: image link
// user: string
// password: string
let users = [ ];
let listings = [ ];
let minID = 0;

// Sample get request
app.get('/user', (req, res) => {
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

function addUser(user) {
    const prev = _.find(users, u => _.isEqual(u, user));
    
    if(!prev) {
        users.push(user);
    }

    console.log("Current Users: ");
    console.log(users);

    return prev || user;
}

app.post('/user', (req, res) => {
    const user = req.body.data;
    const result = addUser(user);

    res.send({
        user: result,
        success: true,
        id: minID++
    });
});

app.put('/user', (req, res) => {
    const oldUser = req.body.old;
    const newUser = req.body.new;

    users = users.filter(u => !_.isEqual(u, oldUser));
    const result = addUser(newUser)

    res.send({
        user: result
    });
});

app.delete('/user', (req, res) => {
    console.log(req);
    const user = req.body.user;
    const len = users.len;
    console.log(user);

    users = users.filter(u => !_.isEqual(u, user));

    console.log(users);

    res.send({
        success: users.len !== len
    });
});

app.post('/listing', (req, res) => {
    const listing = req.body.data;
    const prev = _.find(listings, l => _.isEqual(l, listing));
    
    if(!prev) {
        listings.push(listing);
    }

    console.log("Current Listings: ");
    console.log(listings);

    res.send({
        listing,
        success: true
    });
});


app.listen(4201, () => {
    console.log('App listening on 4201');
});