const Path = require('path')

module.exports = (App) => {
    App.get('/', (Req, Res) =>
        Res.sendFile(Path.join(__dirname, '../Client/Dist/Index.html'))
    )
};