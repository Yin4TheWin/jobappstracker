import { Auth, User } from "firebase/auth";
import { Database } from "firebase/database";

export default interface MyListProps{
    auth: Auth,
    user: User | null,
    db: Database
}
