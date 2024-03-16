const path = require('path');
const fs = require('fs');

const swaggerPath = path.resolve(__dirname, 'docs', 'swagger.json');
const swaggerDocument = YAML.parse(fs.readFileSync(swaggerPath, 'utf8'));

module.exports = app => {
    app.use('/api-docs', (req, res) => {
        res.send(swaggerDocument);
    });
};
