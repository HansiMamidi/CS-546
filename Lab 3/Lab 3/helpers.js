//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.

import axios from 'axios'

  async function getUsers(){
    let {data} = await axios.get('https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json');
    return data // this will be the array of user objects
  }

  async function getMovies(){
    let {data} = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json');
    return data // this will be the array of user objects
  }

  export {getUsers,getMovies}