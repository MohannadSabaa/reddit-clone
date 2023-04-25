const express = require('express');
const app = express();
const {config} = require('dotenv');
config();
const cookieParser = require('cookie-parser');
const rootRouter = require('../routes/routers/root');
const apiRouter = require('../routes/routers/api');
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1', apiRouter);
app.use('/',rootRouter);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})