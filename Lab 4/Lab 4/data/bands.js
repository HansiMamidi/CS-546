// TODO: Export and implement the following functions in ES6 format

import {bands} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const exportedMethods = {
  async create( name, genre, website, recordCompany, groupMembers, yearBandWasFormed) {
    
  if (!name) throw 'You must provide a name for your band';
  if (typeof name !== 'string') throw 'Name must be a string';
  if (name.trim().length === 0) throw 'Name cannot be an empty string or string with just spaces';

  if (!genre || !Array.isArray(genre))
    throw 'You must provide an array of genre';
  if (genre.length === 0) throw 'You must supply at least one genre';
  for (let i in genre) {
    if (typeof genre[i] !== 'string' || genre[i].trim().length === 0) {
      throw 'One or more genres is not a string or is an empty string';
    }
    genre[i] = genre[i].trim();
  }

  if (!website) throw 'You must provide a website for your band';
  if (typeof website !== 'string') throw 'website must be a string';
  website=website.trim()
  if(!((website.startsWith('http://www.')) & (website.endsWith('.com')) & website.length>=20)){
    throw 'Website should start with http://www., end with .com & have atleast 5 characters between http.//www. and .com'
  }

  if (!recordCompany) throw 'You must provide a Record Company for your band';
  if (typeof recordCompany !== 'string') throw 'Record Company must be a string';
  recordCompany=recordCompany.trim()

  if (!groupMembers) throw 'You must provide Group Members for your band';
  if (!groupMembers || !Array.isArray(groupMembers))
    throw 'You must provide an array of group members';
  if (groupMembers.length === 0) throw 'You must supply at least one group member';
  for (let i in groupMembers) {
    if (typeof groupMembers[i] !== 'string' || groupMembers[i].trim().length === 0) {
      throw 'One or more group members is not a string or is an empty string';
    }
    groupMembers[i] = groupMembers[i].trim();
  }

  if (!yearBandWasFormed) throw 'You must provide an year for your band when its formed';
  if (typeof yearBandWasFormed !== 'number') throw 'Year Band Was Formed must be a number';
  if (yearBandWasFormed%1 !=0) throw 'Year must be a whole number'
  if (!(yearBandWasFormed>=1900 & yearBandWasFormed<=2023)) throw 'You must provide a valid value. Only years 1900-2023 are valid values'

  name = name.trim();

  let newBand = {
    name: name,
    genre: genre,
    website: website,
    recordCompany: recordCompany,
    groupMembers: groupMembers,
    yearBandWasFormed: yearBandWasFormed
  };
  const bandCollection = await bands();
  const insertInfo = await bandCollection.insertOne(newBand);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add band';

  const newId = insertInfo.insertedId.toString();

  const band = await this.get(newId);
  return band;
  },
  async get(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';

    if (id.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (id.toLowerCase()==="null" | id.toLowerCase()==="undefined" | id.toLowerCase()==="none" | id.toLowerCase()==="infinity" | id==="NaN"){
      throw 'Invalid input provided for id'
    }
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const bandCollection = await bands();
    const band = await bandCollection.findOne({_id: new ObjectId(id)});
    if (band === null) throw 'No band with that id';
    band._id = band._id.toString();
    return band
  },
  async getAll() {
    const bandCollection = await bands();
    let bandList = await bandCollection.find({}).toArray();
    if (!bandList) throw 'Could not get all bands';
    bandList = bandList.map((element) => {
      element._id = element._id.toString();
      return element;
    });
    return bandList;
  },

  async remove(id) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
    id = id.trim();
      if (id.toLowerCase()==="null" | id.toLowerCase()==="undefined" | id.toLowerCase()==="none" | id.toLowerCase()==="infinity" | id==="NaN"){
        throw 'Invalid input provided for id'
      }
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const bandCollection = await bands();
    const deletionInfo = await bandCollection.findOneAndDelete({
      _id: new ObjectId(id)
    });

    if (deletionInfo.lastErrorObject.n === 0) {
      throw `Could not delete band with id of ${id}`;
    }
    return `${deletionInfo.value.name} has been successfully deleted!`;
  },

  async rename(id, newName) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (id.toLowerCase()==="null" | id.toLowerCase()==="undefined" | id.toLowerCase()==="none" | id.toLowerCase()==="infinity" | id==="NaN"){
      throw 'Invalid input provided for id'
    }
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    if (!newName) throw 'You must provide a name for your band';
    if (typeof newName !== 'string') throw 'Name must be a string';
    if (newName.trim().length === 0)
      throw 'Name cannot be an empty string or string with just spaces';

    newName = newName.trim();

    const updatedBand = {
      name: newName,
    };
    const bandCollection = await bands();
    const updatedInfo = await bandCollection.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$set: updatedBand},
      {returnDocument: 'after'}
    );
    if (updatedInfo.lastErrorObject.n === 0) {
      throw 'could not update band successfully or no band with that id';
    }
    updatedInfo.value._id = updatedInfo.value._id.toString();
    return updatedInfo.value;
  }

};

export default exportedMethods;