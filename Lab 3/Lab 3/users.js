//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//User data link: https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json

import {getUsers, getMovies} from './helpers.js';

  
const getUserById = async (id) => {

    //checking if id parameter exists and is of proper type (string)
    if(id===undefined){
        throw 'id missing in input'
    }

    if(typeof id!='string'){
        if(isNaN(id)){
            throw 'NaN provided for input'
        }
        if(id===Infinity){
            throw 'Infinity provided for input'
        }
        throw 'id must be of type string'
    }

    if(id.trim()==='NaN'){
        throw ' NaN provided for input'
    }

    if(id.trim()==='Infinity'){
        throw 'Infinity provided for input'
    }
    
    if(id.trim()==='NULL' | id.trim()==='null' | id.trim()==='Null'){
        throw 'Null value provided'
    } 

    //checking if id is a string of empty spaces
    if(id.trim().length===0){
        throw 'id is a string of empty spaces'
    }


    let user_data=await getUsers()
    // console.log(user_data)
    for(let i=0;i<user_data.length;i++){
        if(user_data[i].id===id){
            return user_data[i]
        }
    }
    throw 'user not found'
};

const sameGenre = async (genre) => {

    //checking if genre parameter exists and is of proper type (string)
    if(genre===undefined){
        throw 'genre missing in input'
    }

    if(typeof genre!='string'){
        if(isNaN(genre)){
        throw ' NaN provided for input'
    }
        throw 'genre must be of type string'
    }

    if(genre.trim()==='NaN'){
        throw ' NaN provided for input'
    }

    if(genre.trim()==='Infinity'){
        throw 'Infinity provided for input'
    }
        
    if(genre.trim()==='NULL' | genre.trim()==='null' | genre.trim()==='Null'){
        throw 'Null value provided'
    }

    // if(isNaN(genre)){
    //     throw 'NaN provided for input'
    // }
    if(genre===Infinity){
        throw 'Infinity provided for input'
    }

    //checking if genre is a string of empty spaces
    if(genre.trim().length===0){
        
        throw 'genre is a string of empty spaces'
    }

    let user_data = await getUsers()
    let result=[]
    for(let i=0;i<user_data.length;i++){
        if((user_data[i].favorite_genre).toLowerCase()===genre.toLowerCase()){
            result.push([[user_data[i].first_name],[user_data[i].last_name]])
        }
    }

    result.sort((a,b)=>{
        if(a[1]<b[1]){
          return -1
        }
        else if(a[1]>b[1]){
          return 1
        }
        else{
          return 0
        }
      })

      if(result.length<2){
        throw 'No 2 users like the same genre'
      }

      let list=[]
      for(let i=0;i<result.length;i++){
        list.push(result[i][0]+" "+result[i][1])
      }

      return list.slice(0,50)
};

const moviesReviewed = async (id) => {

    //checking if id parameter exists and is of proper type (string)
    if(id===undefined){
        throw 'id missing in input'
    }


    if(typeof id!='string'){
        if(isNaN(id)){
            throw 'NaN provided for input'
        }
        if(id===Infinity){
            throw 'Infinity provided for input'
        }
        throw 'id must be of type string'
    }

    if(id.trim()==='NaN'){
        throw ' NaN provided for input'
    }

    if(id.trim()==='Infinity'){
        throw 'Infinity provided for input'
    }
        
    if(id.trim()==='NULL' | id.trim()==='null' | id.trim()==='Null'){
        throw 'Null value provided'
    } 

    //checking if id is a string of empty spaces
    if(id.trim().length===0){
        throw 'id is a string of empty spaces'
    }

    let user_data = await getUsers()
    let movie_data = await getMovies()
    let user_list=""
    for(let i=0;i<user_data.length;i++){
        if(user_data[i].id===id){
            user_list=user_data[i].username
        }   
    }

    let common=[]
    for(let j=0;j<movie_data.length;j++){
        let review_list=movie_data[j].reviews
        let result={},data={}
        for(let k=0;k<review_list.length;k++){
            if(user_list===review_list[k].username){
                data['username']=review_list[k].username
                data['rating']=review_list[k].rating
                data['review']=review_list[k].review
                result[movie_data[j].title]=data
                common.push(result)
            }
        }
    }

    if(common.length==0){
        throw 'user not found'
    }
    
    return common
};

const referMovies = async (id) => {

    //checking if id parameter exists and is of proper type (string)
    if(id===undefined){
        throw 'id missing in input'
    }

    if(typeof id!='string'){
        if(isNaN(id)){
            throw 'NaN provided for input'
        }
        if(id===Infinity){
            throw 'Infinity provided for input'
        }
        throw 'id must be of type string'
    }
    
    if(id.trim()==='NULL' | id.trim()==='null' | id.trim()==='Null'){
        throw 'Null value provided'
    }   
    
    if(id.trim()==='NaN'){
        throw ' NaN provided for input'
    }

    if(id.trim()==='Infinity'){
        throw 'Infinity provided for input'
    }

    //checking if id is a string of empty spaces
    if(id.trim().length===0){
        throw 'id is a string of empty spaces'
    }

    let user_data = await getUsers()
    let movie_data = await getMovies()
    let user_genre="",user_list=""

    for(let i=0;i<user_data.length;i++){
        if(user_data[i].id===id){
            user_list=user_data[i].username
            user_genre=user_data[i].favorite_genre
        }   
    } 

    let common=[]
    for(let j=0;j<movie_data.length;j++){
        let review_list=movie_data[j].reviews
        for(let k=0;k<review_list.length;k++){
            if(user_list===review_list[k].username){
                common.push(movie_data[j].title)
            }
        }
    }
    let allmovies=[]
    
    for(let i=0;i<movie_data.length;i++){
        let genre_list=movie_data[i].genre.split("|")
        for(let j=0;j<genre_list.length;j++){
            if(user_genre===genre_list[j]){
                allmovies.push(movie_data[i].title)
            }
        }
    }

    let refer=[]
    for(let i=0;i<allmovies.length;i++){
        let flag=0
        for(let j=0;j<common.length;j++){
            if(allmovies[i]==common[j]){
                flag=1
            }
        }
        if(flag==0){
            refer.push(allmovies[i])
        }
    }

    return refer
};

export {getUserById, sameGenre, moviesReviewed, referMovies}
