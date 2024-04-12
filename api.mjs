import { database } from './firebase.mjs'; 

// Function to fetch property details
export async function getPropertyDetails(propertyId) {
  try {
    const propertyRef = database.ref('properties/' + propertyId);
    const snapshot = await propertyRef.once('value');
    return snapshot.val(); 
  } catch (error) {
    console.error('Error fetching property details:', error.message);
    throw error; // Re-throw to allow handling in the calling component
  }
}

// Function to book a property
export async function bookProperty(propertyId, userId, startDate, endDate) {
  try {
    const bookingsRef = database.ref('bookings');
    const newBookingRef = bookingsRef.push();
    await newBookingRef.set({
      propertyId: propertyId,
      userId: userId,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      startDate: startDate,
      endDate: endDate
    });
    console.log('Property booked successfully');
    return true; // Indicate success
  } catch (error) {
    console.error('Booking failed:', error.message);
    throw error; // Re-throw to allow handling in the calling component
  }
}
export async function getPropertyList() {
    try {
      const propertiesRef = database.ref('properties');
      const snapshot = await propertiesRef.once('value');
      const propertyList = [];
  
      snapshot.forEach(childSnapshot => {
        const propertyId = childSnapshot.key;
        const propertyData = childSnapshot.val();
        propertyList.push({
          id: propertyId,
          ...propertyData
        });
      });
  
      return propertyList;
    } catch (error) {
      console.error('Error fetching property list:', error.message);
      throw error; // Re-throw for handling in the component
    }
  }