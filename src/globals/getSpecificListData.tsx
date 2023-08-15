import { get, ref } from "firebase/database";
import { db } from "./firebase";

export default function getSpecificListData(username: string, listId: string){
    return get(ref(db, `users/${username}/listVals/${listId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return null;
        }
    }
    ).catch((error) => {
        console.error(error);
        return null;
    }
    );
}