const express = require("express");
const { expressMiddleware } = require( "@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require('cors');
const {createAppoloGraphqlServer} = require("./src/graphql");
const { authContext } = require('./src/middlewares/auth');
const { errorHandler } = require('./src/middlewares/errorHandler');
const { responseHandler } = require('./src/middlewares/responseHandler');

async function init() {
  const app = express();
  const PORT = 8000;

  app.use(bodyParser.json());
  app.use(responseHandler);
  app.use(cors());

  // GraphQL Server
  app.use('/graphql', expressMiddleware((await createAppoloGraphqlServer()), {
    context: async ({ req }) => {
        const user = await authContext({ req });
        return user;
    }
  }));
  
  app.use(errorHandler);
  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

init();
