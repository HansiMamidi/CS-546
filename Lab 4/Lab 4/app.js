/*

1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws errors.
12. Try to remove a band that does not exist to make sure it throws errors.
13. Try to rename a band that does not exist to make sure it throws errors.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a band by ID that does not exist to make sure it throws errors.

*/

import bands from './data/bands.js';
import {dbConnection, closeConnection} from './config/mongoConnection.js';

//drops the database each time this is run
const db = await dbConnection();
await db.dropDatabase();

async function main() {

    try {
        const createBand = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinks.com   ", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
        console.log(createBand);
      } catch (e) {
        console.log(e);
      }

      try {
        const createBand = await bands.create("BTS", ["Rap", "Solo", "Love", "Motivational", "Self love", "Love"], "http://www.bts777.com", "Bighit", ["RM", "Jin", "Jimin", "JHope", "V", "Suga", "Jungkook",], 2012);
        console.log(createBand);
      } catch (e) {
        console.log(e);
      }

      try {
        const allBands = await bands.getAll();
        console.log(allBands);;
      } catch (e) {
        console.log(e);
      }

      try {
        const createBand = await bands.create("Black Pink", ["Girls", "Solo", "Love"], "http://www.blackpink.com", "Bighit", ["Rose", "Lisa", "Jennie", "Jisso"], 2014);
        console.log(createBand);
      } catch (e) {
        console.log(e);
      }

      try {
        const renamedBand = await bands.rename("63fec9a9ed7c17cac296cba1", "Lennon's Boys"); 
        console.log(renamedBand);
      } catch (e) {
        console.log(e);
      }     

      try {
        const removeBand = await bands.remove("63fecb38f24d9c789d8549e3"); 
        console.log(removeBand);
      } catch (e) {
        console.log(e);
      }

    try {
        const createBand = await bands.create("BTS", [], "http://www.bts.com", "Bighit", ["RM", "Jin", "Jimin", "JHope", "V", "Suga", "Jungkook",], 2012);
        console.log(createBand);
      } catch (e) {
        console.log(e);
      }

    try {
        const removeBand = await bands.remove([]); 
        console.log(removeBand);
      } catch (e) {
        console.log(e);
      }

    try {
        const renamedBand = await bands.rename("63fec10ecb5d5d1c89c6a590", []); 
        console.log(renamedBand);
        } catch (e) {
        console.log(e);
        } 
    
    try {
        const renamedBand = await bands.rename("63fecb38f24d9c789d8549e5", "Lennon's Boys"); 
        console.log(renamedBand);
        } catch (e) {
        console.log(e);
        } 

    try {
        const getBand = await bands.get(null); 
        console.log(getBand);
      } catch (e) {
        console.log(e);
      }
    await closeConnection();
}

main();