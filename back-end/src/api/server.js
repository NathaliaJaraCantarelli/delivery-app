// const port = process.env.PORT || 3001;
// const app = require('./app');

// app.listen(port);
// console.log(`Api rodando na porta ${port}`);

const port = process.env.PORT || 3001;
const App = require('./app');

const app = new App();

app.server.listen(port);
console.log(`Api rodando na porta ${port}`);
