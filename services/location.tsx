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

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return defaultLocation;

            // 1. Check if GPS is actually turned on
            const enabled = await Location.hasServicesEnabledAsync();
            if (!enabled) return defaultLocation;

            // 2. Try to get the last known location (instant)
            const lastKnown = await Location.getLastKnownPositionAsync({});
            if (lastKnown) return lastKnown;

            // 3. If no cache, request current position but with lower accuracy 
            // to ensure it actually returns something
            return await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Low, // Low is much faster/reliable for a quick fix
            });

        } catch (error) {
            console.error("Location error:", error);
            return defaultLocation;
        }
    };

}