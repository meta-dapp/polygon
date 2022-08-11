const path = require('path')
const store = new (require('node-storage'))(path.join(__dirname, 'polygon.json'))
const config = store.get('config')

module.exports = {
    config
}