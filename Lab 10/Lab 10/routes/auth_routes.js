//import express, express router as shown in lecture code
import {Router} from 'express';
const router = Router();
import userData from '../data/users.js'
import {users} from '../config/mongoCollections.js';

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    res.render('register',{title:"Registration"})
    
    //code here for GET
  })
  .post(async (req, res) => {
    //code here for POST
    // console.log("register post")
    
    try{
      let reg_details=req.body
      let firstName=reg_details.firstNameInput;
    let lastName=reg_details.lastNameInput;
    let emailAddress=reg_details.emailAddressInput;
    let password=reg_details.passwordInput;
    let confirmPassword=reg_details.confirmPasswordInput;
    let role=reg_details.roleInput;
    // console.log(firstName, lastName, emailAddress, password, confirmPassword, role)

    if(!firstName) throw 'Provide First Name'
    if(!lastName) throw 'Provide Last Name'
    if(!emailAddress) throw 'Please enter Email Address'
    if(!password) throw 'Please enter a password'
    if(!role) throw 'Please enter a role'

    if(firstName.trim().length===0) throw 'First Name should not be a string of empty spaces'
    if(!firstName.match(/^[a-z ,.'-]+$/gi)){
      throw "First Name shouldn't contain numbers"
    }
    if(!(firstName.length>1 | firstName.length<26)) throw ' First Name should contain atleast 2 characters and less than 26 characters'

    if(lastName.trim().length===0) throw 'Last Name should not be a string of empty spaces'
    if(!lastName.match(/^[a-z ,.'-]+$/gi)){
      throw "Last Name shouldn't contain numbers"
    }
    if(!(lastName.length>1 | lastName.length<26)) throw 'Last Name should contain atleast 2 characters and less than 26 characters'
    emailAddress=emailAddress.toLowerCase().trim()
    const userCollection = await users();
    let usersList = await userCollection.find({}).toArray();

    let emailList=[]
    for(let i=0;i<usersList.length;i++){
      let single_user=usersList[i]
      emailList.push(single_user.emailAddress)
    }

    emailAddress=emailAddress.toLowerCase().trim()
    if(emailAddress.length===0) throw 'email address should not be a string of empty spaces'
    if(!emailAddress.match(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/gi))
    throw 'Invalid email address'

    for(let i=0;i<emailList.length;i++){
      if(emailAddress===emailList[i]) 
      return res.status(400).render('error', {title: 'Registration', message: 'Email Address already exists'});
    }
    
    if(password.trim().length===0) throw 'Password is a string of empty spaces'
    if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))
    throw 'Invalid Password format. Password should contain a minimum of 8 characters, atleast 1 uppercase letter, atleast 1 lowercase letter, 1 number and 1 special character'

    if(confirmPassword.trim().length===0) throw 'Password is a string of empty spaces'
    if(!confirmPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))
    throw 'Invalid Password format. Confirm Password should contain a minimum of 8 characters, atleast 1 uppercase letter, atleast 1 lowercase letter, 1 number and 1 special character'

    // if(confirmPassword.trim().length===0) throw 'Password is a string of empty spaces'
    // if(confirmPassword.trim().length<8) throw 'Password should contain atleast 8 characters'
    // if(!confirmPassword.match(/\s/g).length===0) throw 'Password should not contain spaces'
    // if(!confirmPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)) 
    // throw 'Invalid Password format. Password should contain a minimum of 8 characters, atleast 1 uppercase letter, atleast 1 lowercase letter, 1 number and 1 special character'
    if(!(password===confirmPassword)) throw "passwords don't match"

    role=role.trim().toLowerCase()
    if(role.length===0) throw ' Role is a string of empty spaces'
    if(!(role==="admin" | role==="user")) throw 'Invalid role entered. Enter "admin" or "user" for role'

    let insertData =await userData.createUser(firstName, lastName, emailAddress, password, role)
    // console.log(insertData)
    if(insertData){
      res.redirect('/login')
    }
    else{
      res.status(500).message("Internal Server Error")
    }
    } catch(e){
      res.status(400).render('register', {error: e})
    }

  });

router
  .route('/login')
  .get(async (req, res) => {
    res.render('login',{title:"Login"})
    //code here for GET
  })
  .post(async (req, res) => {
    // console.log("login post")
    //code here for POST
    try{
      let login_details=req.body
      let emailAddress=login_details.emailAddressInput;
      let password=login_details.passwordInput;

      if(!emailAddress) throw 'Provide email Address'
      if(!password) throw 'Enter Password'

      emailAddress=emailAddress.toLowerCase().trim()
      if(emailAddress.length===0) throw 'email address should not be a string of empty spaces'
      if(!emailAddress.match(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/gi))
      throw 'Invalid email address'

      if(password.trim().length===0) throw 'Password is a string of empty spaces'
      if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))
      throw 'Invalid Password format. Password should contain a minimum of 8 characters, atleast 1 uppercase letter, atleast 1 lowercase letter, 1 number and 1 special character'  

      let loginData =await userData.checkUser(emailAddress, password)
      if(!loginData) res.status(400).render('login', {error: "Couldn't Login"}) 
      req.session.user= {firstName: loginData.firstName, lastName: loginData.lastName, emailAddress: loginData.emailAddress, role: loginData.role}

      if(loginData.role==="admin"){
        res.redirect("/admin")
      }
      else if(loginData.role==="user"){
        res.redirect("/protected")
      }

    } catch(e){
      // console.log(e)
      res.status(400).render('login', {error: e})
    }
  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  let firstName=req.session.user.firstName
  let role=req.session.user.role
  let currentTime=new Date().toUTCString()
  if(role==='admin'){
    let admin="admin"
    res.render('protected',{title:"Protected", firstName, currentTime, role, admin})
  }
  else if(role==='user'){
    let user="user"
    res.render('protected',{title:"Protected", firstName, currentTime, role, user})
  }
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
  let firstName=req.session.user.firstName
  let currentTime=new Date().toUTCString()
  res.render('admin',{title:"Admin", firstName, currentTime})
});

router.route('/error').get(async (req, res) => {
  //code here for GET  
  res.status(400).render('error',{title:"Error", message:"You don't have access to this page"})
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  res.render('logout', {title: "Logout"})
});

export default router
