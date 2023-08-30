const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const htmlPath = require('./routes/htmlroutes')
const apiPath = require('./routes/apiRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', htmlPath);
app.use('/api', apiPath); 

app.listen(PORT, () =>
    console.log(`http://localhost:${PORT}`)
);