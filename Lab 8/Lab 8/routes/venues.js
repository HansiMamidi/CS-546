//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import {Router} from 'express';
const router = Router();
import {getVenues,getVenueByID} from '../helpers.js';

router.route('/').get(async (req, res) => {
  //code here for GET
  try{
    res.render('homepage', {title: 'Venue Finder'});
  } catch (e) {
    res.status(404).json({error: "Page Not Found"})
  }  
    
});

router.route('/searchvenues').post(async (req, res) => {
  //code here for POST
  const venueData = req.body.searchVenueTerm;
  if(venueData.trim().length===0){
    return res.status(400).render('error', {title: 'Venue Finder', message: 'You must enter a venue to search'});
  }
  try{
    const venueList = await getVenues(venueData);
    let venueResults=venueList._embedded.venues
    let venues=[]
    if(venueResults.length>10){
      for(let i=0;i<10;i++){
        venues.push(venueResults[i])
      }
    }
    else{
      for(let i=0;i<venueResults.length;i++){
        venues.push(venueResults[i])
      }
    }
    
    res.render('venueSearchResults', {title: 'Venues Found', searchVenueTerm: venueData, venues})
  }  catch (e) {
    res.render('venueNotFound', {title: 'Venues Found', searchVenueTerm: venueData})
  }  
});

router.route('/venuedetails/:id').get(async (req, res) => {
  //code here for GET
  const id=req.params.id;
  try{
    const singleVenue = await getVenueByID(id);
    res.render('venueByID', {title: 'Venue Details', singleVenue})
  }  catch (e) {
    res.status(404).render('error', {title: "Venue Details", message: "a venue with that id doesn't exist"});
  } 
  
});

router.route('*').get(async (req, res) => {
  //code here for GET
  res.status(404).json({error: "Page Not Found"});
});

export default router