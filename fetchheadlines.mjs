import fetch from 'node-fetch';
import dotenv from "dotenv/config"
let API_KEY = process.env.API_KEY
export const fetchNews = async (country = "us") => {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }
    catch (err) {
        // console.log(err)
    }
}

