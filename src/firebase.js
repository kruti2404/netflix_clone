import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyDq_59owPYnITuGSo7dTIOgfaKmS5liAoQ",
    authDomain: "netflix-clone-9c831.firebaseapp.com",
    projectId: "netflix-clone-9c831",
    storageBucket: "netflix-clone-9c831.appspot.com",
    messagingSenderId: "903415915045",
    appId: "1:903415915045:web:2ee2f3c509000f682555cc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    }
    catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        if (error.code === 'auth/wrong-password') {
            toast.error('The password is incorrect. Please try again.');
        } else if (error.code === 'auth/user-not-found') {
            toast.error('User not found. Please check your email.');
        } else {
            toast.error(`Authentication failed: ${error.message}`);
        }
    }
};


const logOut = () => {
    signOut(auth);
}

export { auth, db, login, signup, logOut }