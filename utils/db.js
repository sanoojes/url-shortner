import mongoose, { Schema, model } from 'mongoose';
import 'dotenv/config';

const urlShema = new Schema({
  longUrl: String,
  shortendUrl: String,
  clicks: Number,
  date: Date,
});

mongoose.connect(process.env.MONGODB_URL);

export const urlDB = model('UrlShortner', urlShema);

export const saveToDB = async (longUrl, shortendUrl, date, clicks = 0) => {
  try {
    const newUrl = await urlDB.create({
      longUrl,
      shortendUrl,
      date,
      clicks,
    });
    console.log('Added new url to db :', newUrl);
  } catch (error) {
    console.error(error);
  }
};
