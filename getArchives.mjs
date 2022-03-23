import { db } from "./firebase.mjs";
import { collection, getDocs, query, where } from "firebase/firestore"

export const getArchives = async () => {
    let articles = []
    const querySnapshot = await getDocs(collection(db, "articles"));
    querySnapshot.forEach((doc) => {
        articles.push({ id: doc.id, ...doc.data() })
    });
    return articles

}