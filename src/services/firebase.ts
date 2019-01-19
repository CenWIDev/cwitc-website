import Rebase from 're-base';
import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyDtQKM8PfvrWoDH3BATaNV9ERyHdAOYNZw",
    authDomain: "central-wi-it-conference.firebaseapp.com",
    databaseURL: "https://central-wi-it-conference.firebaseio.com",
    projectId: "central-wi-it-conference",
    storageBucket: "central-wi-it-conference.appspot.com",
    messagingSenderId: "850583225961"
};

const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;