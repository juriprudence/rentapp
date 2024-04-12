// Initialize Firebase
import { firebaseConfig, auth, database } from './firebase.mjs';
import {createHeader} from "./Header.mjs"
import {Footer} from "./Footer.mjs"
const newHeader = createHeader();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/newHeader);
const newFooter=Footer()
const foot=ReactDOM.createRoot(document.getElementById('foot'));
foot.render(newFooter)

document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User logged in successfully');
            window.location.href = 'index.html'; // Redirect to main page
        })
        .catch(error => {
            console.error('Login failed:', error.message);
            // Display error message to the user
            document.getElementById('errorMessage').textContent = error.message;
        });
});
