import express from "express";
import "../lib/fs-tools.js"; // all the functional tools
import {
  deletemedia,
  filtermedia,
  getmedia,
  putmedia,
} from "../lib/fs-tools-reveiw.js";
import uniqid from "uniqid";

const reviewRouter = express.Router();

// API KEY: aec1efea

// GET
reviewRouter.get("/", async (req, res, next) => {
  try {
    console.log("Let's see");
    const medias = getmedia();
    console.log(medias);
    res.send(medias);
  } catch (error) {
    next(error);
  }
});

// GET /:id
reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const new_id = req.params.id;
    const file = filtermedia(new_id);
    res.send(file);
  } catch (error) {
    next(error);
  }
});

// DELETE /:id

reviewRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteUpdate = deletemedia(id);
    res.send(deleteUpdate);
  } catch (error) {
    next(error);
  }
});

// POSTING the media;
reviewRouter.post("/", async (req, res, next) => {
  try {
    const medias = getmedia();
    const extra_medias = {
      ...req.body,
      id: uniqid(),
    };
    medias.push(extra_medias);
    console.log(extra_medias);
    putmedia(medias);
    res.send(send(extra_medias));
  } catch (error) {
    res.send(error);
    next(error);
  }
});

// Editing the media
reviewRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const medias = getmedia();
    const media = filtermedia(id);
    const rem_media = medias.filter((m) => m.id !== id);
    const new_media = {
      ...media,
      ...req.body,
    };
    rem_media.push(new_media);
    putmedia(rem_media);
    res.send("Edited!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default reviewRouter;
