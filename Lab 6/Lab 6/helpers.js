// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is

import {ObjectId} from 'mongodb';

const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw `You must provide a ${varName}`;
    if (typeof id !== 'string') throw `${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `${varName} cannot be an empty string or string with just spaces`;
    // if (!isNaN(strVal))
    //   throw `${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }
    return arr;
  },

  checkNumber(inp, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (typeof(inp)!=='number')
      throw `You must provide a number for ${varName}`;

    // if (inp%1 !=0) throw `${varName} must be a whole number`;



    // for (let i in arr) {
    //   if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
    //     throw `One or more elements in ${varName} array is not a string or is an empty string`;
    //   }
    //   arr[i] = arr[i].trim();
    // }
    return inp;
  }

};

export default exportedMethods;