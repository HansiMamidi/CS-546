// This data file should export all functions using the ES6 standard as shown in the lecture code

import {ObjectId} from 'mongodb';
import validation from '../helpers.js';
import {bands} from '../config/mongoCollections.js';
let exportedMethods = {
  async get(albumId) {

    if (!albumId) throw [400,'You must provide an albumId to search for'];
    if (typeof albumId !== 'string') throw [400,'albumId must be a string'];
    if (albumId.trim().length === 0)
      throw [400,'albumId cannot be an empty string or just spaces'];
      albumId = albumId.trim();
      if (albumId.toLowerCase()==="null" | albumId.toLowerCase()==="undefined" | albumId.toLowerCase()==="none" | albumId.toLowerCase()==="infinity" | albumId==="NaN"){
        throw [400,'Invalid input provided for albumId'];
      }
    if (!ObjectId.isValid(albumId)) throw [400,'invalid object albumId'];

    albumId = validation.checkId(albumId);
    let album=false
    const bandCollection = await bands();
    let bandList = await bandCollection.find({}).toArray();
    for(let i=0;i<bandList.length;i++)
    {
      let single_band=bandList[i]
      for(let [key,value] of Object.entries(single_band)){
        if(key==="albums"){
          let albumList=value
          for(let j=0;j<albumList.length;j++){
            for(let [key2,value2] of Object.entries(albumList[j])){
              if(new ObjectId(albumId).equals(value2)){
                return albumList[j]
              }
            }
          }
        }
      }   
    }
    
    if (!album) throw [404,'Album not found'];
    return album;
  },

  async getAll(bandId) {

    if (!bandId) throw [400,'You must provide an bandId to search for'];
    if (typeof bandId !== 'string') throw [400,'bandId must be a string'];
    if (bandId.trim().length === 0)
      throw [400,'bandId cannot be an empty string or just spaces'];
      bandId = bandId.trim();
      if (bandId.toLowerCase()==="null" | bandId.toLowerCase()==="undefined" | bandId.toLowerCase()==="none" | bandId.toLowerCase()==="infinity" | bandId==="NaN"){
        throw [400,'Invalid input provided for bandId'];
      }
    if (!ObjectId.isValid(bandId)) throw [400,'invalid object albumId'];

    bandId = validation.checkId(bandId);
    const bandCollection = await bands();
    const band = await bandCollection.findOne({_id: new ObjectId(bandId)});

    if (!band) throw [404,'Band not found'];
    
    if(!band.albums) throw [404,'Albums not found for this band'];
    return band.albums;
  },  
  async create(bandId, title, releaseDate, tracks, rating) {

    if (!bandId) throw [400,'You must provide an id to search for'];
    if (typeof bandId !== 'string') throw [400,'Id must be a string'];

    if (bandId.trim().length === 0) throw [400,'Id cannot be an empty string or just spaces'];
    bandId = bandId.trim();
    if (bandId.toLowerCase()==="null" | bandId.toLowerCase()==="undefined" | bandId.toLowerCase()==="none" | bandId.toLowerCase()==="infinity" | bandId==="NaN"){
      throw [400,'Invalid input provided for bandId'];
    }
    if (!ObjectId.isValid(bandId)) throw [400,'invalid object bandId'];

    if (!title) throw [400,'You must provide a title for the album'];
    if (typeof title !== 'string') throw [400,'Name must be a string'];
    if (title.trim().length === 0) throw [400,'Name cannot be an empty string or string with just spaces'];
    title = title.trim();
    const bandCollection = await bands();
    const oldData = await bandCollection.findOne({_id: new ObjectId(bandId)});

    //checking for duplicate albums
    for(let i=0;i<oldData.albums.length;i++){
      if(title===oldData.albums[i].title){
        throw [400, `Album already present in the ${bandId}`];
      }
    }

    if (!releaseDate) throw [400,'You must provide a release date for the album'];
    if (typeof releaseDate !== 'string') throw [400,'Release date must be a string'];
    if (releaseDate.trim().length === 0) throw [400,'Release date cannot be an empty string or string with just spaces'];
    releaseDate = releaseDate.trim();
    let dateformat=releaseDate.split("/")
    if(dateformat[0].length!==2) throw [400,'Append 0 in front if the month is less than 10'];
    if(dateformat[1].length!==2) throw [400,'Append 0 in front if the day is less than 10'];
    if(dateformat[2].length!==4) throw [400,'Invalid year'];
    if(dateformat.length!==3) throw [400,'Release date should be of the format(DD/MM/YYYY)'];
    if((parseInt(dateformat[0])<1) || (parseInt(dateformat[0])>12) || (parseInt(dateformat[1])<1) || (parseInt(dateformat[1])>31) || (parseInt(dateformat[2])<1900) || (parseInt(dateformat[2])>2023))
    throw [400,'Invalid Release date'];

    if (!tracks || !Array.isArray(tracks))
      throw [400,'You must provide an array of tracks'];
    if (tracks.length === 0) throw [400,'You must supply at least 3 tracks'];
    if (tracks.length <3) throw [400,'You must supply at least 3 tracks'];
    for (let i in tracks) {
      if (typeof tracks[i] !== 'string' || tracks[i].trim().length === 0) {
        throw [400,'One or more tracks is not a string or is an empty string'];
      }
      tracks[i] = tracks[i].trim();
    }

    if (!rating) throw [400,'You must provide a rating for the album'];
    if (typeof rating !== 'number') throw [400,'Rating must be a number'];
    if((rating>=1 && rating<=5)===false) throw [400,'Rating must be a number between 1 to 5'];
    rating=Math.round(rating*10)/10

    bandId = validation.checkId(bandId, 'Band ID');
    title = validation.checkString(title, 'Title');
    releaseDate = validation.checkString(releaseDate, 'Release Date');
    tracks = validation.checkStringArray(tracks, 'Tracks');
    rating = validation.checkNumber(rating, 'Rating');
    let oldAlbums=[]
    let newAlbum = {
      _id: new ObjectId(),
      title: title,
      releaseDate: releaseDate,
      tracks: tracks,
      rating: rating
    };

    const bandAlbums= await this.getAll(bandId);
    oldAlbums=bandAlbums
    oldAlbums.push(newAlbum)

    let sum=0
    for(let i=0;i<oldAlbums.length;i++){
      sum+=oldAlbums[i].rating
    }
    let Rating_avg= Math.round((sum/oldAlbums.length)*10)/10

    let updatedBandData = {
      name: oldData.name,
      genre: oldData.genre,
      website: oldData.website,
      recordCompany: oldData.recordCompany,
      groupMembers: oldData.groupMembers,
      yearBandWasFormed: oldData.yearBandWasFormed, 
      albums: oldAlbums,
      overallRating: Rating_avg    
    };

    const updateInfo = await bandCollection.findOneAndReplace(
      {_id: new ObjectId(bandId)},
      updatedBandData,
      {returnDocument: 'after'}
    );
    if (updateInfo.lastErrorObject.n === 0)
      throw [404, `Update failed! Could not update post with id ${bandId}`];

    const resultband = await bandCollection.findOne({_id: new ObjectId(bandId)});
    return resultband;
  },
  async remove(albumId) {

    if (!albumId) throw [400,'You must provide an albumId to search for'];
    if (typeof albumId !== 'string') throw [400,'albumId must be a string'];
    if (albumId.trim().length === 0)
      throw [400,'albumId cannot be an empty string or just spaces'];
      albumId = albumId.trim();
      if (albumId.toLowerCase()==="null" | albumId.toLowerCase()==="undefined" | albumId.toLowerCase()==="none" | albumId.toLowerCase()==="infinity" | albumId==="NaN"){
        throw [400,'Invalid input provided for albumId'];
      }
    if (!ObjectId.isValid(albumId)) throw [400,'invalid object albumId'];

    albumId = validation.checkId(albumId);
    const bandCollection = await bands();
    let bandList = await bandCollection.find({}).toArray();
    let flag=false
    for(let i=0;i<bandList.length;i++)
    {
      let single_band=bandList[i]
      for(let [key,value] of Object.entries(single_band)){
        if(key==="albums"){
          let albumList=value
          for(let j=0;j<albumList.length;j++){
            for(let [key2,value2] of Object.entries(albumList[j])){
              if(new ObjectId(albumId).equals(value2)){
                albumList.splice(j,1)

                let sum=0
                for(let a=0;a<albumList.length;a++){
                  sum+=albumList[a].rating
                }
                let Rating_avg= Math.floor((sum/albumList.length)*10)/10

                let updatedBandData = {
                  name: single_band.name,
                  genre: single_band.genre,
                  website: single_band.website,
                  recordCompany: single_band.recordCompany,
                  groupMembers: single_band.groupMembers,
                  yearBandWasFormed: single_band.yearBandWasFormed, 
                  albums: albumList,
                  overallRating: Rating_avg  
                };
                flag =true
                const updateInfo = await bandCollection.findOneAndReplace(
                  {_id: single_band._id},
                  updatedBandData,
                  {returnDocument: 'after'}
                );
                if (updateInfo.lastErrorObject.n === 0)
                  throw [404, `No album found with id ${albumId}`];

                return {"albumId":value2, "deleted": true};

              }
            }
          }
        }
      }   
    }

    if (flag===false)
      throw [404, `Could not find Album with id of ${albumId}`];
 }
};

export default exportedMethods;