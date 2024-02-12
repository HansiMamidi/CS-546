import axios from 'axios'

async function getVenues(venueData){
    let {data} = await axios.get('https://app.ticketmaster.com/discovery/v2/venues?keyword='+venueData+'&apikey=y2SRtdoVKKa4TJzGUiU1PJghINDlRv8l&countryCode=US');
    return data // this will be the array of user objects
}

async function getVenueByID(id){
    let {data} = await axios.get('https://app.ticketmaster.com/discovery/v2/venues/'+id+'?&apikey=y2SRtdoVKKa4TJzGUiU1PJghINDlRv8l&countryCode=US');
    return data // this will be the array of user objects
}

  export {getVenues,getVenueByID}