/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/

const rootMiddleware = async (req, res, next) => { 
    if (req.session.user) {
      console.log('['+new Date().toUTCString()+']:'+req.method+" "+req.originalUrl+' (Authenticated User)');
      if(req.params.role === "user"){
        res.redirect('/protected')
      }
      else if(req.params.role === "admin"){
      res.redirect('/admin')
    }
  }
    else if(!req.session.user){
      console.log('['+new Date().toUTCString()+']:'+req.method+" "+req.originalUrl+' (Non-Authenticated User)');
      res.redirect('/login')
    }
    next();
  };
  
  const protectedMiddleware = async (req, res, next) => {
    if(!req.session.user){
      res.redirect('/login')
    }
    else if(req.session.user){
      next();
    }
  };
  
  const adminMiddleware = async (req, res, next) => {
    console.log('middleware fired');
    if (req.session.user) {
      if(!(req.params.role === "user" | req.params.role === "admin")){
        res.status(403).redirect('/error')
      }
      else if(req.params.role === "admin"){
        next();
      }
    }
  };
  
  const logoutMiddleware = async (req, res, next) => {
    if(!req.session.user){
      res.redirect('/login')
    }
    if (req.session.user) {
      next();
    }
  };
  
export {rootMiddleware, protectedMiddleware, adminMiddleware, logoutMiddleware}