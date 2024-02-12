//import mongo collections, bcrypt and implement the following data functions
// export const createUser = async (
//   firstName,
//   lastName,
//   emailAddress,
//   password,
//   role
// ) => {};

// export const checkUser = async (emailAddress, password) => {};

import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import bcrypt from 'bcrypt';
const saltRounds = 16;

const exportedMethods = {
  async createUser(firstName, lastName, emailAddress, password, role) {
    // console.log("entering create user")
    if(!firstName) throw 'Provide First Name'
    if(!lastName) throw 'Provide Last Name'
    if(!emailAddress) throw 'Please enter Email Address'
    if(!password) throw 'Please enter a password'
    if(!role) throw 'Please enter a role'

    // console.log(firstName.length, lastName, emailAddress, password, role)
    // console.log(firstName)
    if(firstName.trim().length===0) throw 'First Name should not be a string of empty spaces'
    if(!firstName.match(/^[a-z ,.'-]+$/gi)){
      throw "First Name shouldn't contain numbers"
    }
    if(!(firstName.length>2 | firstName.length<25)) throw ' First Name should contain atleast 2 characters and less than 26 characters'
    
    if(lastName.trim().length===0) throw 'Last Name should not be a string of empty spaces'
    if(!lastName.match(/^[a-z ,.'-]+$/gi)){
      throw "First Name shouldn't contain numbers"
    }
    if(!(lastName.length>2 | lastName.length<25)) throw 'Last Name should contain atleast 2 characters and less than 26 characters'
    
    emailAddress=emailAddress.toLowerCase().trim()
    if(emailAddress.length===0) throw 'email address should not be a string of empty spaces'
    if(!emailAddress.match(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/gi))
    throw 'Invalid email address'

    const userCollection = await users();
    let usersList = await userCollection.find({}).toArray();

    let emailList=[]
    for(let i=0;i<usersList.length;i++){
      for(let [key,value] in usersList[i]){
        if(key===emailAddress){
          emailList.push(usersList[i][key])
        }
      }
    }

    if(!emailList.indexOf(emailAddress)===-1) throw 'Email address already exists'
    if(password.trim().length===0) throw 'Password is a string of empty spaces'
    if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))
    throw 'Invalid Password format. Password should contain a minimum of 8 characters, atleast 1 uppercase letter, atleast 1 lowercase letter, 1 number and 1 special character'
    const hash = await bcrypt.hash(password, saltRounds);

    role=role.trim().toLowerCase()
    if(role.length===0) throw ' Role is a string of empty spaces'
    if(!(role==="admin" | role==="user")) throw 'Invalid role entered. Enter "admin" or "user" for role'

    let newUser = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      emailAddress: emailAddress.trim(),
      password: hash,
      role: role.trim()
    };
    const newInsertInformation = await userCollection.insertOne(newUser);
    if (!newInsertInformation.insertedId) throw 'Insert failed!';
    return {insertedUser: true}
  },
  async checkUser(emailAddress, password) {

    const userCollection = await users();
    let userList = await userCollection.find({}).toArray();

    let emailList=[]
    for(let i=0;i<userList.length;i++){
      let single_user=userList[i]
      emailList.push(single_user.emailAddress)
    }
    let flag=false
    for(let i=0;i<emailList.length;i++){
      if(emailAddress===emailList[i]) {
        flag=true
      }
    }
    if(flag===false){
      throw 'Invalid Email Address'
    }
    for(let i=0;i<userList.length;i++){
      let single_user=userList[i]
      if(single_user.emailAddress===emailAddress){
        let hash = single_user.password
        let compareToPassword = false;
        compareToPassword = await bcrypt.compare(password, hash);
          // console.log(compareToPassword)
        if (compareToPassword) {
          return single_user
        } else {
          throw 'Passwords donot match'
        }
        
      }
    }   

  
  }
};

export default exportedMethods;