// This data file should export all functions using the ES6 standard as shown in the lecture code

import {bands} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import validation from '../helpers.js';

const exportedMethods = {
  async create( name, genre, website, recordCompany, groupMembers, yearBandWasFormed) {
    if (!name) throw [400,'You must provide a name for your band'];
    if (typeof name !== 'string') throw [400,'Name must be a string'];
    if (name.trim().length === 0) throw [400,'Name cannot be an empty string or string with just spaces'];
    name = name.trim();
  
    if (!genre || !Array.isArray(genre))
      throw [400,'You must provide an array of genre'];
    if (genre.length === 0) throw [400,'You must supply at least one genre'];
    for (let i in genre) {
      if (typeof genre[i] !== 'string' || genre[i].trim().length === 0) {
        throw [400,'One or more genres is not a string or is an empty string'];
      }
      genre[i] = genre[i].trim();
    }
  
    if (!website) throw [400,'You must provide a website for your band'];
    if (typeof website !== 'string') throw [400,'website must be a string'];
    website=website.trim()
    if(!((website.startsWith('http://www.')) & (website.endsWith('.com')) & website.length>=20)) throw [400,'Website should start with http://www., end with .com & have atleast 5 characters between http.//www. and .com'];
 
    if (!recordCompany) throw [400,'You must provide a Record Company for your band'];
    if (typeof recordCompany !== 'string') throw [400,'Record Company must be a string'];
    recordCompany=recordCompany.trim()
    if(recordCompany.length===0) throw [400,'Passed empty string for Record Company'];
  
    if (!groupMembers) throw [400,'You must provide Group Members for your band'];
    if (!groupMembers || !Array.isArray(groupMembers))
      throw [400,'You must provide an array of group members'];
    if (groupMembers.length === 0) throw [400,'You must supply at least one group member'];
    for (let i in groupMembers) {
      if (typeof groupMembers[i] !== 'string' || groupMembers[i].trim().length === 0) {
        throw [400,'One or more group members is not a string or is an empty string'];
      }
      groupMembers[i] = groupMembers[i].trim();
    }
  
    if (!yearBandWasFormed) throw [400,'You must provide an year for your band when its formed'];
    // if (typeof yearBandWasFormed !== 'number') throw [400,'Year Band Was Formed must be a number'];
    if (!(yearBandWasFormed%1 ===0)) throw [400, `Year must be a whole number`];
    if (!(yearBandWasFormed>=1900 & yearBandWasFormed<=2024)) throw [400,'You must provide a valid value. Only years 1900-2024 are valid values'];
  
  name = validation.checkString(name, 'Name');
  genre = validation.checkStringArray(genre, 'Genre');
  website = validation.checkString(website, 'Website');
  recordCompany = validation.checkString(recordCompany, 'Record Company');
  groupMembers = validation.checkStringArray(groupMembers, 'Group Members');
  yearBandWasFormed = validation.checkNumber(yearBandWasFormed, 'Year Band Was Formed');
  
  const newBand = {
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed  
  };
  let albums=[],overallRating= 0
  newBand["albums"]=albums
  newBand["overallRating"]=overallRating
  const bandCollection = await bands();
  const insertInfo = await bandCollection.insertOne(newBand);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw [400,'Could not add band'];

  const newId = insertInfo.insertedId;
  return await this.get(newId.toString());
  },
  
  async get(id) {
    if (!id) throw [400,'You must provide an id to search for'];
    if (typeof id !== 'string') throw [400,'Id must be a string'];
    if (id.trim().length === 0)
      throw [400,'id cannot be an empty string or just spaces'];
    id = id.trim();
      if (id.toLowerCase()==="null" | id.toLowerCase()==="undefined" | id.toLowerCase()==="none" | id.toLowerCase()==="infinity" | id==="NaN"){
        throw [400,'Invalid input provided for id'];
      }
    if (!ObjectId.isValid(id)) throw [400,'invalid object ID'];

    const bandCollection = await bands();
    const band = await bandCollection.findOne({_id: new ObjectId(id)});
    if (band === null) throw [404,'No band with that id'];
    band._id = band._id.toString();
    return band
  },
  async getAll() {
    const bandCollection = await bands();
    let bandList = await bandCollection.find({}).toArray();
    if (!bandList) throw [400,'Could not get all bands'];
    bandList = bandList.map((element) => {
      element._id = element._id.toString();
      return {"_id":element._id.toString(), "name":element.name};
    });
    return bandList;
  },

  async remove(id) {
    if (!id) throw [400,'You must provide an id to search for'];
    if (typeof id !== 'string') throw [400,'Id must be a string'];
    if (id.trim().length === 0)
      throw [400,'id cannot be an empty string or just spaces'];
    id = id.trim();
      if (id.toLowerCase()==="null" | id.toLowerCase()==="undefined" | id.toLowerCase()==="none" | id.toLowerCase()==="infinity" | id==="NaN"){
        throw [400,'Invalid input provided for id'];
      }
    if (!ObjectId.isValid(id)) throw [400,'invalid object ID'];

    const bandCollection = await bands();
    const deletionInfo = await bandCollection.findOneAndDelete({
      _id: new ObjectId(id)
    });

    if (deletionInfo.lastErrorObject.n === 0) {
      throw [404,`Could not delete band with id of ${id}`];
    }
    let result={"bandId": id, "deleted": true}
    return result;
  },

  async update(id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed) {

    if (!id) throw [400,'You must provide an id to search for'];
    if (typeof id !== 'string') throw [400,'Id must be a string'];
    if (id.trim().length === 0)
      throw [400,'id cannot be an empty string or just spaces'];
    id = id.trim();
      if (id.toLowerCase()==="null" | id.toLowerCase()==="undefined" | id.toLowerCase()==="none" | id.toLowerCase()==="infinity" | id==="NaN"){
        throw [400,'Invalid input provided for id'];
      }
    if (!ObjectId.isValid(id)) throw [400,'invalid object ID'];

    if (!name) throw [400,'You must provide a name for your band'];
    if (typeof name !== 'string') throw [400,'Name must be a string'];
    if (name.trim().length === 0) throw [400,'Name cannot be an empty string or string with just spaces'];
    name = name.trim();
  
    if (!genre || !Array.isArray(genre))
      throw [400,'You must provide an array of genre'];
    if (genre.length === 0) throw [400,'You must supply at least one genre'];
    for (let i in genre) {
      if (typeof genre[i] !== 'string' || genre[i].trim().length === 0) {
        throw [400,'One or more genres is not a string or is an empty string'];
      }
      genre[i] = genre[i].trim();
    }
  
    if (!website) throw [400,'You must provide a website for your band'];
    if (typeof website !== 'string') throw [400,'website must be a string'];
    website=website.trim()
    if(!((website.startsWith('http://www.')) & (website.endsWith('.com')) & website.length>=20)){
      throw [400,'Website should start with http://www., end with .com & have atleast 5 characters between http.//www. and .com'];
    }
  
    if (!recordCompany) throw [400,'You must provide a Record Company for your band'];
    if (typeof recordCompany !== 'string') throw [400,'Record Company must be a string'];
    recordCompany=recordCompany.trim()
    if(recordCompany.length===0) throw [400,'Passed empty string for Record Company'];
  
    if (!groupMembers) throw [400,'You must provide Group Members for your band'];
    if (!groupMembers || !Array.isArray(groupMembers))
      throw [400,'You must provide an array of group members'];
    if (groupMembers.length === 0) throw [400,'You must supply at least one group member'];
    for (let i in groupMembers) {
      if (typeof groupMembers[i] !== 'string' || groupMembers[i].trim().length === 0) {
        throw [400,'One or more group members is not a string or is an empty string'];
      }
      groupMembers[i] = groupMembers[i].trim();
    }
  
    if (!yearBandWasFormed) throw [400,'You must provide an year for your band when its formed'];
    // if (typeof yearBandWasFormed !== 'number') throw [400,'Year Band Was Formed must be a number'];
    if (!(yearBandWasFormed%1 ===0)) throw [400, `Year must be a whole number`];
    if (!(yearBandWasFormed>=1900 & yearBandWasFormed<=2024)) throw [400,'You must provide a valid value. Only years 1900-2024 are valid values'];

    id = validation.checkId(id);
    name = validation.checkString(name, 'Name');
    genre = validation.checkStringArray(genre, 'Genre');
    website = validation.checkString(website, 'Website');
    recordCompany = validation.checkString(recordCompany, 'Record Company');
    groupMembers = validation.checkStringArray(groupMembers, 'Group Members');
    yearBandWasFormed = validation.checkNumber(yearBandWasFormed, 'Year Band Was Formed');

    const oldData = await this.get(id);
    let new_flag=false
    if(name!==oldData.name) new_flag=true
    if(genre.length!==oldData.genre.length) new_flag=true
    for(let i=0;i<genre.length;i++){
      if(genre[i]!==oldData.genre[i]) new_flag=true
    }

    if(website!==oldData.website) new_flag=true
    if(recordCompany!==oldData.recordCompany) new_flag=true
    if(groupMembers.length!==oldData.groupMembers.length) new_flag=true
    for(let i=0;i<groupMembers.length;i++){
      if(groupMembers[i]!==oldData.groupMembers[i]) new_flag=true
    }
    if(yearBandWasFormed!==oldData.yearBandWasFormed) new_flag=true
    if(new_flag===false) throw [400,'No new values to update'];
    let updatedBandData = {
      name: name,
      genre: genre,
      website: website,
      recordCompany: recordCompany,
      groupMembers: groupMembers,
      yearBandWasFormed: yearBandWasFormed, 
      albums: oldData.albums,
      overallRating: oldData.overallRating   
    };
    const bandCollection = await bands();
    const updateInfo = await bandCollection.findOneAndReplace(
      {_id: new ObjectId(id)},
      updatedBandData,
      {returnDocument: 'after'}
    );
    if (updateInfo.lastErrorObject.n === 0)
      throw [404, `Update failed! Could not update post with id ${id}`];

    const resultband = await bandCollection.findOne({_id: new ObjectId(id)});
    return resultband;
  }

};

export default exportedMethods;