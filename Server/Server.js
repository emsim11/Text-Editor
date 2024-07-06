const Express = require('express')

const App = Express()
const PORT = process.env.PORT || 3000

App.use(Express.static('../Client/Dist'));
App.use(Express.urlencoded({ extended: true }));
App.use(Express.json());

require('./Routes/HtmlRoutes')(App);

App.listen(PORT, () => console.log(`🌎 Now Listening On PORT: ${PORT}`));