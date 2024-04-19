//getting userdata form cookie
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase_config";

export function getUserData(args) {
    try {
        return JSON.parse(localStorage.getItem(args));
    } catch (ex) {
        console.error(ex);
    }

}
//get feedback expiration
// export const getFbExpirationDate = (event_id) =>{
//     (async function() {
//         try {
//             const collection_ref =doc(db, 'Events', event_id )
//             const getEventsSnapshot = await getDoc(collection_ref);
//             if (getEventsSnapshot.exists()) {
//                 console.log("Document data:", getEventsSnapshot.data());
//                 return getEventsSnapshot
//             } else {
//                 // docSnap.data() will be undefined in this case
//                 console.log("No such document!");
//             }
//         } catch (e) {
//             console.error(e);
//         }
//     })();
//
//     return getEventsSnapshot
//
// }

//returns a promise for the feedback date
export async function getFbExpirationDate(event_id) {
    const collection_ref =doc(db, 'Events', event_id )
    const getEventsSnapshot = await getDoc(collection_ref);
    if (getEventsSnapshot.exists()) {
        //console.log("Document data:", getEventsSnapshot.data());
        return getEventsSnapshot.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

//usage
// let fbExpDate = ''
// getFbExpirationDate('7V1jvufeuuOExEtKDctd').then((data)=> {
//     console.log(data)
//
// })
