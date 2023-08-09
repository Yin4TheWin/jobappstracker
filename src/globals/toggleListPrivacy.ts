import { firebase } from "./firebase"
import { ref, getDatabase, set } from "firebase/database"

export default function togglePrivacy(username: string, listId: string, value: boolean){
    const db = getDatabase(firebase)
    const listRef = ref(db, `users/${username}/listVals/${listId}/private`)
    return set(listRef, value)
}