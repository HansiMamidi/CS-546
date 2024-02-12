// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import {Router} from 'express';
const router = Router();
import {albumData} from '../data/index.js';
import validation from '../helpers.js';

router
  .route('/:bandId')
  .get(async (req, res) => {
    //code here for GET
    try {
      
      req.params.bandId = validation.checkId(req.params.bandId, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      let album = await albumData.getAll(req.params.bandId);
      res.status(200).json(album);
    } catch (e) {
      res.status(404).json({error: `Albums not found for the ${req.params.bandId}`});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let albumInfo = req.body;
    if (!albumInfo || Object.keys(albumInfo).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    try {
      albumInfo.title = validation.checkString(
        albumInfo.title,
        'Title'
      );
      albumInfo.releaseDate = validation.checkString(
        albumInfo.releaseDate,
        'Release Date'
      );
      albumInfo.tracks = validation.checkStringArray(
        albumInfo.tracks,
        'Tracks'
      );
      albumInfo.rating = validation.checkNumber(
        albumInfo.rating,
        'Rating'
      )
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const newAlbum = await albumData.create(req.params.bandId,
        albumInfo.title,
        albumInfo.releaseDate,
        albumInfo.tracks,
        albumInfo.rating
      );
      res.status(200).json(newAlbum);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).json({error: message});
    }
  });

router
  .route('/album/:albumId')
  .get(async (req, res) => {
    //code here for GET
      try {
        req.params.bandId = validation.checkId(req.params.albumId, 'ID URL Param');
      } catch (e) {
        return res.status(400).json({error: e});
      }
      try {
        let album = await albumData.get(req.params.albumId);
        res.status(200).json(album);
      } catch (e) {
        res.status(404).json({error: 'Album not found'});
      }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.bandId = validation.checkId(req.params.albumId);
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      let deletedAlbum = await albumData.remove(req.params.albumId);
      res.status(200).json(deletedAlbum);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).send({error: message});
    }
  });

export default router;