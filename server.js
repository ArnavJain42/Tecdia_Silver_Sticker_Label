const express = require('express');
const app = express();
const port = 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const printRoutes = require('./routes/print');
app.use('/api/print', printRoutes);

const { renderTestPage } = require('./views/testPage');
app.get('/test', renderTestPage);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
