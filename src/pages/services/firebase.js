import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
  apiKey: "AIzaSyCr50cbIipm1QgXdd-aSi5e6EQwKMIaRXs",
  authDomain: "application-service-provider.firebaseapp.com",
  databaseURL: "https://application-service-provider-default-rtdb.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
