import { db } from "./firebase"
import { ref, set } from "firebase/database"

export default function togglePrivacy(username: string, listId: string, value: boolean){
    const listRef = ref(db, `users/${username}/listVals/${listId}/private`)
    return set(listRef, value)
}