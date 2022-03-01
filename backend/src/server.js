import express from 'express';
import * as _ from 'lodash';

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

// Sample get request
app.get('/foo:id', (req, res) => {
    const ID = parseInt(req.params.id.replace(':', ''));
});

app.post('/tsv', (req, res) => {
    const data = req.body.data;
});

app.listen(4201, () => {
    console.log('App listening on 4201');
});