import express from 'express'

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('get');
    res.render('index');
})

app.listen(3000, () => console.log('listening on port 3000'));