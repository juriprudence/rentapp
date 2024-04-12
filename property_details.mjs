// Initialize Firebase
// Firebase configuration code goes here
import { firebaseConfig, auth, database } from './firebase.mjs';

import {createHeader} from "./Header.mjs"
import {Footer} from "./Footer.mjs"
import {getPropertyDetails,bookProperty} from "./api.mjs"
// Retrieve property ID from query parameter


const newHeader = createHeader();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/newHeader);
// Reference to Firebase Realtime Database
const newFooter=Footer()
const foot=ReactDOM.createRoot(document.getElementById('foot'));
foot.render(newFooter)
const queryParams = new URLSearchParams(window.location.search);
const propertyId = queryParams.get('id');


// Reference to elements in the HTML
const propertyImagesContainer = document.getElementById('propertyImages');
const propertyTitleElement = document.getElementById('propertyTitle');
const propertyDescriptionElement = document.getElementById('propertyDescription');

// Fetch property details from Firebase based on property ID

const property =  await getPropertyDetails(propertyId);
        // Display property title and description
propertyTitleElement.textContent = property.title;
propertyDescriptionElement.textContent = property.description;
        // Populate property images in the carousel
property.images.forEach((image, index) => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('carousel-item');
        if (index === 0) {
            imageElement.classList.add('active');
        }
        const imageSizeStyle = "width: 400px; height: 400px;";
        imageElement.innerHTML = `
            <img src="${image}" class="d-block w-100"  style="${imageSizeStyle}" alt="Property Image">
            `;
            propertyImagesContainer.appendChild(imageElement);

        });
if(property.location)
initMap(property.location);
    
// Initialize Google Map
function initMap(location) {
    // Check if property location exists
    if (location && location.latitude && location.longitude) {
        // Initialize Leaflet map
        var map = L.map('map').setView([location.latitude, location.longitude], 13); // Set property location and zoom level

        // Add tile layer (OSM)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker for the property location
        L.marker([location.latitude, location.longitude]).addTo(map)
            .bindPopup('Property Location')
            .openPopup();
    }
}

firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is logged in, enable book button
                bookButton.style.display = 'block';
            } else {
                // User is not logged in, hide book button
                bookButton.style.display = 'none';
            }
        });

  // Redirect to login page when login button is clicked
 
 // Handle book button click
document.getElementById('bookButton').addEventListener('click', () => {
            const userId = firebase.auth().currentUser.uid;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
           try{
            const res = bookProperty(propertyId, userId,startDate,endDate);
            $('#bookingSuccessModal').modal('show');
        }catch(errorMessage)
            {
                console.error('Booking failed:', error.message);
            }
        
    })



 