// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const { saleProductRouter } = require('../routes');

// const app = express();

// app.use(cors());

// app.use(express.static(path.join(__dirname, '../../public')));
// app.use(express.json());

// app.use('/customer/products', saleProductRouter);

// app.get('/coffee', (_req, res) => res.status(418).end());

// module.exports = app;

const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const errorMiddleware = require('../middlewares/error.middleware');
const routes = require('../routes');
// const { saleProductRouter } = require('../routes');

class App {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  config() {
    const accessControl = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, '../../public')));
    this.app.use(express.json());
    this.app.use(accessControl);
  }

  routes() {
    this.app.use(routes);
    this.app.use(errorMiddleware);
  }
}

module.exports = App;
