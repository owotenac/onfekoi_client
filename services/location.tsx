import * as Location from 'expo-location';


export class UserLocation {

    static getUserLocation = async () => {
        // Default location 
        const defaultLocation: Location.LocationObject = {
            coords: {
                latitude: 43.619301,
                longitude: 3.872337,
                altitude: null,
                accuracy: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
            },
            timestamp: Date.now(),
        };

        let userLocation = defaultLocation
        try {
            // Try to get user's actual location
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                userLocation = await Promise.race([
                    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
                    new Promise<Location.LocationObject>((_, reject) =>
                        setTimeout(() => reject(new Error('Location timeout')), 5000)
                    )
                ]).catch(() => defaultLocation) as Location.LocationObject;;
            }
            else {
                console.warn("Using default location");
            }


        } catch (error) {
            console.error("Error initializing:", error);
            console.warn("Failed to get location, using default");

        } finally {
            // return location
            return userLocation
        }
    };

}