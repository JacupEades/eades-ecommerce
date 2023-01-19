// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD5LACq9Qhr35krLl4QD-X8Ip7kkpyg66U",
	authDomain: "ryan-ecommerce-d568d.firebaseapp.com",
	projectId: "ryan-ecommerce-d568d",
	storageBucket: "ryan-ecommerce-d568d.appspot.com",
	messagingSenderId: "303851941367",
	appId: "1:303851941367:web:38d353ec1a1894f609d2f2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();

//! not a constuctor error may use this later
// export const googleAuthProvider = new firebase.auth.googleAuthProvider();
