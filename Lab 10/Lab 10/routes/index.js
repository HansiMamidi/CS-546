//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.

import authRoutes from './auth_routes.js';
// import privateRoutes from './private.js';

const constructorMethod = (app) => {
  app.use('/', authRoutes);
//   app.use('/posts', postRoutes);
//   app.use('/private', privateRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;