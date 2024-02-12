//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

/*
import the router and create the follow routes using the GET http method

'/aboutme';
'/mystory';
'/educationhistory'




export the router */


import {Router} from 'express';
const router = Router();

router
  .route('/aboutme')
  .get(async (req, res) => {
    try {
      const aboutmeList = {
        "firstName": "Sri Naga Hansi",
        "lastName": "Mamidi",      
        "biography": "I am an international student from India. Studying MSCS in Stevens Institute of Technology. \n I have worked as a Software Analyst in Ford Motors Company for 2 years with the best team ever. Everyone in the team taught me from scratch coonsidering me to be a fresher. Glad to have landed up with them on my first step into the IT industry.",
        "favoriteMovies": ["Air Force One", "Speed", "Wednesday", "Home Alone"],
        "hobbies": ["Listening Music", "Watching Series", "Singing"],
        "fondestMemory": "My first ever visit to Waterpark in the last week of February. Its located in Poconos Mountains and called Kalahari. Has alot of exciting rides with amazing accomodation and arcade games. "
      }
      return res.json(aboutmeList);
    } catch (e) {
      res.status(404).json(e);
    }
  })

router
.route('/mystory')
.get(async (req, res) => {
  try {
    const mystoryList = {
      "storyTitle": "Falling into your Smile",
      "storyGenre": "E-sports",
      "story": "An amatuer female gamer joins a professional e-sports team. Strives her way into the gaming world to be a top-notch game player in the OPL. Achieved her goal but when faced an unknown opponent, her courage shattered on losing the game. Took her sometime to stand back again. She was brave enough to practice hard and compete with the same opponent to her victory.\n She was keen at observing and studying other teams strategies so as to come up with counter attacks during her competition. \n Never underestimates her game rivals. \n Won the league finally."
    }
    return res.json(mystoryList);
  } catch (e) {
    res.status(404).json(e);
  }
})

router
.route('/educationhistory')
.get(async (req, res) => {
  try {
    const educationhistoryList = [
      {
        "schoolName": "Stevens Institute of Technology",
        "degreeEarned": "Masters",
        "numberOfYearsAttended": 1,
        "favoriteClasses": ["CS 546", "CS 501", "BIA 660", "CS 556"],
        "favoriteSchoolMemory": "Fall Festival 2022. Tasted amazing cookies for the first time in US"
      },
      {
        "schoolName": "G. Narayanamma Institute of Technology and Science",
        "degreeEarned": "Bachelors",
        "numberOfYearsAttended": 4,
        "favoriteClasses": ["Data Mining", "Python Programming", "Engineering Graphics", "Engineering Workshop"],
        "favoriteSchoolMemory": "An open air auditorium event where I first tried Monster Energy drink"
      },
      {
        "schoolName": "Sri Chaitanya Junior College",
        "degreeEarned": "H.S. Diploma",
        "numberOfYearsAttended": 2,
        "favoriteClasses": ["Sanskrit", "Mathematics", "Chemistry", "English"],
        "favoriteSchoolMemory": "I had scored excellent marks in all the subjects"
      }
  ]
    return res.json(educationhistoryList);
  } catch (e) {
    res.status(404).json(e);
  }
})
export default router;
