const express = require('express');
const app = express();
const { init } = require('./helpers/video');

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/video', (req, res) => {

    const range = req.headers.range;

    const getVideoData = init(range);

    res.writeHead(206, getVideoData['headers']);

    getVideoData['stream'].pipe(res);

});

app.listen(3000, () => console.log('Server listening in 3000 port'));

