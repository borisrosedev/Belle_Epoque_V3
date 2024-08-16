const path = require("path")

const rootController = {

    get: (req, res) => { 
        res.sendFile(path.join(process.env.STATIC_DIR, 'index.html'))
        
    }

}

module.exports = rootController