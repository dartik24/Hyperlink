import express from 'express';
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
const users = [ ];

// Sample get request
app.get('/foo:id', (req, res) => {
    const ID = parseInt(req.params.id.replace(':', ''));
});

// Sample get request
app.get('/test', (req, res) => {
    console.log(req, req.query);
    res.send({
        blah: 'get succeeded'
    });
});

app.post('/user', (req, res) => {
    const user = req.body.data;
    const prev = _.find(users, u => _.isEqual(u, user));
    
    if(!prev) {
        users.push(user);
    }

    console.log(users);

    res.send({
        user
    });
});

app.listen(4201, () => {
    console.log('App listening on 4201');
});