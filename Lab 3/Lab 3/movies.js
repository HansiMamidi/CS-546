//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Movie data link: https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json

import {getMovies} from './helpers.js';


const findMoviesByDirector = async (directorName) => {

    //checking if directorName parameter exists and is of proper type (string)
    if(directorName===undefined){
        throw 'directorName missing in input'
    }

    if(typeof directorName!='string'){
        if(isNaN(directorName)){
            throw 'NaN provided for input'
        }
        if(directorName===Infinity){
            throw 'Infinity provided for input'
        }
        throw 'id must be of type string'
    }

    if(directorName.trim()==='NaN'){
        throw ' NaN provided for input'
    }

    if(directorName.trim()==='Infinity'){
        throw 'Infinity provided for input'
    }

    if(directorName.trim()==='NULL' | directorName.trim()==='null' | directorName.trim()==='Null'){
        throw 'Null value provided'
    } 

    //checking if directorName is a string of empty spaces
    if(directorName.trim().length===0){
        throw 'directorName is a string of empty spaces'
    }

    let movie_data = await getMovies()
    let directed=[]
    for(let i=0;i<movie_data.length;i++){
        if((movie_data[i].director).toLowerCase()===directorName.toLowerCase()){
            directed.push(movie_data[i])
        }
    }

    if(directed.length===0){
        throw 'No movies found'
    }
    return directed
};

const findMoviesByCastMember = async (castMemberName) => {

    //checking if castMemberName parameter exists and is of proper type (string)
    if(castMemberName===undefined){
        throw 'castMemberName missing in input'
    }

    if(typeof castMemberName!='string'){
        if(isNaN(castMemberName)){
            throw 'NaN provided for input'
        }
        if(castMemberName===Infinity){
            throw 'Infinity provided for input'
        }
        throw 'castMemberName must be of type string'
    }

    if(castMemberName.trim()==='NaN'){
        throw ' NaN provided for input'
    }

    if(castMemberName.trim()==='Infinity'){
        throw 'Infinity provided for input'
    }

    if(castMemberName.trim()==='NULL' | castMemberName.trim()==='null' | castMemberName.trim()==='Null'){
        throw 'Null value provided'
    } 

    //checking if castMemberName is a string of empty spaces
    if(castMemberName.trim().length===0){
        throw 'castMemberName is a string of empty spaces'
    }

    let movie_data = await getMovies()
    let movies=[]
    for(let i=0;i<movie_data.length;i++){
        let cast=movie_data[i].cast
        for(let j=0;j<cast.length;j++){
            if(cast[j].toLowerCase()===castMemberName.toLowerCase()){
                movies.push(movie_data[i])
            }
        }
    }

    if(movies.length===0){
        throw 'No movies found'
    }
    return movies
    
};

const getOverallRating = async (title) => {

    //checking if title parameter exists and is of proper type (string)
    if(title===undefined){
        throw 'title missing in input'
    }

    if(typeof title!='string'){
        if(isNaN(title)){
            throw 'NaN provided for input'
        }
        if(title===Infinity){
            throw 'Infinity provided for input'
        }
        throw 'title must be of type string'
    }

    if(title.trim()==='NaN'){
        throw ' NaN provided for input'
    }

    if(title.trim()==='Infinity'){
        throw 'Infinity provided for input'
    }

    if(title.trim()==='NULL' | title.trim()==='null' | title.trim()==='Null'){
        throw 'Null value provided'
    } 

    //checking if title is a string of empty spaces
    if(title.trim().length===0){
        throw 'title is a string of empty spaces'
    }

    let movie_data = await getMovies()
    let sum=0,count=0
    for(let i=0;i<movie_data.length;i++){
        if((movie_data[i].title).toLowerCase()===title.toLowerCase()){
            let reviews=movie_data[i].reviews
            for(let j=0;j<reviews.length;j++){
                sum+=reviews[j].rating
                count+=1
            }
        }
    }

    if(sum===0){
        throw 'No movies found'
    }
    return Math.floor((sum/count)*10)/10
};

const getMovieById = async (id) => {
    
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
    let movie_data = await getMovies()
    let result=[]
    for(let i=0;i<movie_data.length;i++){
        if(movie_data[i].id==id){
            result.push(movie_data[i])
        }        
    }

    if(result.length===0){
        throw 'No movies found'
    }
    return result
};

export {findMoviesByDirector, findMoviesByCastMember, getOverallRating, getMovieById}
