// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!

import {Router} from 'express';
const router = Router();
import {bandData} from '../data/index.js';
import validation from '../helpers.js';

router
  .route('/')
  .get(async (req, res) => {
    try {
      const bandList = await bandData.getAll();
      res.status(200).json(bandList);
    } catch (e) {
      res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    const reqBandData = req.body;
    if (!reqBandData || Object.keys(reqBandData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    try {
      reqBandData.name = validation.checkString(reqBandData.name, 'Name');
      reqBandData.genre = validation.checkStringArray(reqBandData.genre, 'Genre');
      reqBandData.website = validation.checkString(reqBandData.website, 'Website');
      reqBandData.recordCompany = validation.checkString(reqBandData.recordCompany, 'Record Company');
      reqBandData.groupMembers = validation.checkStringArray(reqBandData.groupMembers, 'Group Members');
      reqBandData.yearBandWasFormed = validation.checkNumber(reqBandData.yearBandWasFormed, 'Year Band Was Formed');
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const {name, genre, website, recordCompany, groupMembers, yearBandWasFormed} = reqBandData;
      const newBand = await bandData.create(name, genre, website, recordCompany, groupMembers, yearBandWasFormed);
      res.status(200).json(newBand);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).json({error: message});
    } 
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const band = await bandData.get(req.params.id);
      res.status(200).json(band);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).json({error: message});
    }
  })
  .put(async (req, res) => {
    const updatedData = req.body;
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try {
      req.params.id = validation.checkId(req.params.id, 'ID url param');
      updatedData.name = validation.checkString(updatedData.name, 'Name');
      updatedData.genre = validation.checkStringArray(updatedData.genre, 'Genre');
      updatedData.website = validation.checkString(updatedData.website, 'Website');
      updatedData.recordCompany = validation.checkString(updatedData.recordCompany, 'Record Company');
      updatedData.groupMembers = validation.checkStringArray(updatedData.groupMembers, 'Group Members');
      updatedData.yearBandWasFormed = validation.checkNumber(updatedData.yearBandWasFormed, 'Year Band Was Formed');
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const {name, genre, website, recordCompany, groupMembers, yearBandWasFormed} = updatedData;
      const newBand = await bandData.update(
        req.params.id,
        name, genre, website, recordCompany, groupMembers, yearBandWasFormed
      );
      res.status(200).json(newBand);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).json({error: message});
    }
  })

  .delete(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      let deletedBand = await bandData.remove(req.params.id);
      res.status(200).json(deletedBand);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : 'Internal Server Error';
      res.status(status).json({error: message});
    }
  });

export default router;