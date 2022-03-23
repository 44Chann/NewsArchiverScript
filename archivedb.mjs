import { db } from "./firebase.mjs";
import { collection, addDoc } from "firebase/firestore";
import { fetchNews } from "./fetchheadlines.mjs";
import { getArchives } from "./getArchives.mjs";
export const archiveInDb = async (country) => {
    const articlesRef = collection(db, 'articles')
    let archivedNews = []
    archivedNews = await getArchives();
    const headlines = await fetchNews(country);
    console.log(headlines)
    headlines.articles.map((headline) => {
        let strDate = new Date(headline.publishedAt).toISOString();
        let pubDate = strDate.substring(0, 10);
        let imgUrl = headline.urlToImage;
        const found = archivedNews.some(news => news.title === headline.title);
        if (!found) {
            addDoc(articlesRef, {
                author: headline.author,
                content: headline.content,
                imgUrl: imgUrl,
                publishedAt: pubDate,
                source: headline.source.name,
                title: headline.title,
                url: headline.url
            })
                .then(() => console.log("doc has been added "))
        }
        else {
            console.log("doc  exits")
        }
    })
}
