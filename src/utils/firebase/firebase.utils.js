import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB3LSdBaO2dP_-mOoO2IT7mjGdSU__r2ec",
    authDomain: "crown-clothing-db-e67d2.firebaseapp.com",
    projectId: "crown-clothing-db-e67d2",
    storageBucket: "crown-clothing-db-e67d2.appspot.com",
    messagingSenderId: "172967418566",
    appId: "1:172967418566:web:be9c1bcdc2fe3dd45f15c7"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();
 
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)   // in database, user collecntion, user with unique id
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt
      });
    } catch (error) {
      console.log('Error creating the user', error.message)
    }
  } 

  return userDocRef;
  //  if user data does not exist
  // Create / Set the document with the data from userAuth in my collection

  // if user data exists
  // return 
}