//Here you will import route files and export them as used in previous labs

import venueRoutes from './venues.js';
// import path from 'path';

const constructorMethod = (app) => {
  app.use('/', venueRoutes);
//   app.get('/about', (req, res) => {
//     res.sendFile(path.resolve('static/about.html'));
//   });
  app.use('*', (req, res) => {
    res.status(404).json({error: "Page Not Found"});
  });
};

export default constructorMethod;