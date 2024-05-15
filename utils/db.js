import mongoose, { Schema, model } from 'mongoose';

const urlShema = new Schema({
  longUrl: String,
  shortendUrl: String,
  clicks: Number,
  date: Date,
});

mongoose.connect('mongodb://localhost:27017/UrlShortner');

export const urlDB = model('UrlShortner', urlShema);

export const saveToDB = async (longUrl, shortendUrl, date, clicks = 0) => {
  try {
    const newUrl = await urlDB.create({
      longUrl,
      shortendUrl,
      date,
      clicks,
    });
    console.log('Added new url to db');
  } catch (error) {
    console.error(error);
  }
};
