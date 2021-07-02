import fs from "fs";
import path, {dirname, join} from "path";
import {fileURLToPath} from "url";

const _fileName = fileURLToPath(import.meta.url);
const _dirname = dirname(_fileName);
const mediaFilePath = join(_dirname, "../mediaRouter/media.json");

// function to get all the medias;
function getmedia() {
  console.log(mediaFilePath);
  const fileAsBuffer = fs.readFileSync(mediaFilePath);
  const fileAsString = fileAsBuffer.toString();
  const fileAsJSON = JSON.parse(fileAsString);
  console.log(fileAsJSON);
  return fileAsJSON;
}

// function to put all the medias;
function putmedia(file) {
  fs.writeFileSync(mediaFilePath, JSON.stringify(file));
}

// function to filter the medias;
function filtermedia(id) {
  const file = getmedia();
  const new_file = file.find((media) => media.imdbID === id);
  if (new_file) {
    return new_file;
  } else {
    return "File is not there";
  }
}

// funcition to delete the medias;
function deletemedia(id) {
  try {
    const files = getmedia();
    const file = files.filter((media) => media.imdbID !== id);
    putmedia(file);
    return "File Deleted !";
  } catch (error) {
    console.log("Error in the delete media function fs-tools: ", error);
    return "Error in File Delete !";
  }
}
export {getmedia, filtermedia, deletemedia, putmedia};
