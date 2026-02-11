// import { globalTheme } from '@/model/global-css';
// import { router } from 'expo-router';
// import React, { useEffect, useRef, useState } from 'react';
// import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { WebView } from 'react-native-webview';

// export default function MapView({ initialRegion, children, onRefreshRequest }: any) {
//   const webViewRef = useRef<WebView>(null);
//   const [showRefreshButton, setShowRefreshButton] = useState(false);
//   const [currentCenter, setCurrentCenter] = useState(initialRegion);

//   // Prepare markers for injection
//   const markers = React.Children.map(children, (child) => ({
//     latitude: child.props.coordinate.latitude,
//     longitude: child.props.coordinate.longitude,
//     title: child.props.title,
//     uuid: child.props.uuid,
//     mainType: child.props.mainType,
//     // @ts-ignore
//     color: globalTheme[ getTypeKey(child.props.mainType) ]?.color || '#007AFF',
//     icon: getIconClass(child.props.mainType)
//   }));

//   useEffect(() => {
//   if (markers && webViewRef.current) {
//     const jsonMarkers = JSON.stringify(markers);
//     // This JS runs inside the ALREADY loaded map
//     const injectJS = `
//       if (window.updateMarkers) {
//         window.updateMarkers(${jsonMarkers});
//       }
//     `;
//     webViewRef.current.injectJavaScript(injectJS);
//   }
// }, [children]); // Only run when markers/children change

//   const mapHtml = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
//       <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
//       <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
//       <style>
//         body { margin: 0; padding: 0; }
//         #map { height: 100vh; width: 100vw; }
//         .marker-container {
//           width: 36px; height: 36px; border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           color: white; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//         }
//         .popup-details-btn { 
//           background: #007AFF; color: white; border: none; 
//           padding: 8px 12px; border-radius: 20px; cursor: pointer; margin-top: 8px;
//           font-family: sans-serif; font-weight: bold;
//         }
//       </style>
//     </head>
//     <body>
//       <div id="map"></div>
//       <script>
// var map = L.map('map').setView([${initialRegion.latitude}, ${initialRegion.longitude}], 15);
//         var markerLayer = L.layerGroup().addTo(map);
//         var lastFetchedPos = map.getCenter();

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//         // Define the update function globally inside the WebView
//         window.updateMarkers = function(data) {
//           markerLayer.clearLayers(); // Remove old pins
//           data.forEach(m => {
//             const icon = L.divIcon({
//               className: 'custom-icon',
//               html: '<div class="marker-container" style="background-color:'+m.color+'"><i class="'+m.icon+'"></i></div>',
//               iconSize: [36, 36], iconAnchor: [18, 36]
//             });
//             const marker = L.marker([m.latitude, m.longitude], { icon }).addTo(markerLayer);
//             marker.bindPopup('<b>'+m.title+'</b><br/><button class="popup-details-btn" onclick="openDetails(\\''+m.uuid+'\\')">View Details</button>');
//           });
//         };

//         // Initial load
//         window.updateMarkers(${JSON.stringify(markers)});

//         function openDetails(uuid) {
//           window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'NAVIGATE', uuid }));
//         }

//         // Distance Check logic
//         map.on('moveend', function() {
//           var newCenter = map.getCenter();
//           var distance = newCenter.distanceTo(lastFetchedPos); // Returns meters
          
//           window.ReactNativeWebView.postMessage(JSON.stringify({ 
//             type: 'MOVE', 
//             lat: newCenter.lat, 
//             lng: newCenter.lng,
//             shouldRefresh: distance > 5000 
//           }));
//         });

//         // Function to reset the "last position" when user clicks refresh
//         window.addEventListener('message', function(event) {
//           const data = JSON.parse(event.data);
//           if (data.type === 'RESET_CENTER') {
//             lastFetchedPos = map.getCenter();
//           }
//         });
//       </script>
//     </body>
//     </html>
//   `;

//   const handleMessage = (event: any) => {
//     const data = JSON.parse(event.nativeEvent.data);
    
//     if (data.type === 'NAVIGATE') {
//       router.push(`/product-details?uuid=${data.uuid}`);
//     } 
    
//     if (data.type === 'MOVE') {
//       setCurrentCenter({ latitude: data.lat, longitude: data.lng });
//       setShowRefreshButton(data.shouldRefresh);
//     }
//   };

//   const onManualRefresh = () => {
//     onRefreshRequest(currentCenter);
//     setShowRefreshButton(false);
//     // Tell the WebView to update its "lastFetchedPos"
//     webViewRef.current?.postMessage(JSON.stringify({ type: 'RESET_CENTER' }));
//   };

//   return (
//     <View style={styles.container}>
//       <WebView 
//         ref={webViewRef}
//         originWhitelist={['*']}
//         source={{ html: mapHtml }}
//         onMessage={handleMessage}
//         style={{ flex: 1 }}
//         startInLoadingState={true}
//       />
      
//       {showRefreshButton && (
//         <TouchableOpacity style={styles.refreshBtn} onPress={onManualRefresh}>
//           <Text style={styles.refreshText}>🔄 Search this area</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// // Helper functions (keep these outside)
// function getTypeKey(type: string) : string{
//   const map: any = { 
//     RentalAccommodation: 'rental', FoodEstablishment: 'food', 
//     EntertainmentAndEvent: 'events', PointOfInterest: 'poi', Tour: 'tours' 
//   };
//   return map[type] ;
// }

// function getIconClass(type: string) {
//   const map: any = {
//     RentalAccommodation: 'fas fa-home', FoodEstablishment: 'fas fa-utensils',
//     EntertainmentAndEvent: 'fas fa-calendar-alt', PointOfInterest: 'fas fa-map-marker-alt'
//   };
//   return map[type] || 'fas fa-circle';
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   refreshBtn: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 60 : 40,
//     alignSelf: 'center',
//     backgroundColor: 'white',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//   },
//   refreshText: { fontWeight: '600', color: '#333' }
// });

import { globalTheme } from '@/model/global-css';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

// 1. Types for TS Safety
type ThemeKey = 'onfekoi' | 'food' | 'events' | 'poi' | 'tours' | 'rental';

export default function MapView({ initialRegion, children, onRefreshRequest }: any) {
  const webViewRef = useRef<WebView>(null);
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [currentCenter, setCurrentCenter] = useState(initialRegion);

  // 2. Map Marker Data to a simple array for the WebView
  const markersData = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (!child?.props?.coordinate) return null;
      const typeKey = getTypeKey(child.props.mainType);
      return {
        latitude: child.props.coordinate.latitude,
        longitude: child.props.coordinate.longitude,
        title: child.props.title,
        uuid: child.props.uuid,
        color: globalTheme[typeKey]?.color || '#007AFF',
        icon: getIconClass(child.props.mainType)
      };
    })?.filter(Boolean) || [];
  }, [children]);

  // 3. The Stable HTML (Only defines the logic, doesn't handle updates)
  const mapHtml = useMemo(() => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; overflow: hidden; }
        #map { height: 100vh; width: 100vw; }
        .marker-container {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: white; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .popup-details-btn { 
          background: #007AFF; color: white; border: none; 
          padding: 8px 12px; border-radius: 20px; cursor: pointer; margin-top: 8px;
          font-family: sans-serif; font-weight: bold; width: 100%;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        // Initialize Map
        var map = L.map('map', { zoomControl: true }).setView([${initialRegion.latitude}, ${initialRegion.longitude}], 15);
        var markerLayer = L.layerGroup().addTo(map);
        var lastFetchedPos = L.latLng(${initialRegion.latitude}, ${initialRegion.longitude});

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        // Function to update markers without reloading page
        window.updateMarkers = function(data) {
          markerLayer.clearLayers();
          data.forEach(m => {
            const icon = L.divIcon({
              className: 'custom-div-icon',
              html: '<div class="marker-container" style="background-color:'+m.color+'"><i class="'+m.icon+'"></i></div>',
              iconSize: [36, 36], iconAnchor: [18, 36]
            });
            const marker = L.marker([m.latitude, m.longitude], { icon }).addTo(markerLayer);
            marker.bindPopup('<b>'+m.title+'</b><br/><button class="popup-details-btn" onclick="openDetails(\\''+m.uuid+'\\')">View Details</button>');
          });
        };

        function openDetails(uuid) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'NAVIGATE', uuid }));
        }

        map.on('moveend', function() {
          var newCenter = map.getCenter();
          var distance = newCenter.distanceTo(lastFetchedPos);
          window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'MOVE', 
            lat: newCenter.lat, 
            lng: newCenter.lng,
            shouldRefresh: distance > 5000 
          }));
        });

        // Listen for reset signal from Native
        window.addEventListener('message', function(event) {
          const data = JSON.parse(event.data);
          if (data.type === 'RESET_ANCHOR') {
            lastFetchedPos = map.getCenter();
          }
        });
      </script>
    </body>
    </html>
  `, []); // Empty deps means this string is created ONCE.

  // 4. Effect: Push new marker data into the WebView whenever it changes
  useEffect(() => {
    if (webViewRef.current && markersData.length > 0) {
      const js = `window.updateMarkers(${JSON.stringify(markersData)}); void(0);`;
      webViewRef.current.injectJavaScript(js);
    }
  }, [markersData]);

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'NAVIGATE') {
      router.push(`/product-details?uuid=${data.uuid}`);
    } 
    if (data.type === 'MOVE') {
      setCurrentCenter({ latitude: data.lat, longitude: data.lng });
      setShowRefreshButton(data.shouldRefresh);
    }
  };

  const handleRefresh = () => {
    onRefreshRequest(currentCenter);
    setShowRefreshButton(false);
    webViewRef.current?.postMessage(JSON.stringify({ type: 'RESET_ANCHOR' }));
  };

  return (
    <View style={styles.container}>
      <WebView 
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        onMessage={handleMessage}
        onLoadEnd={() => {
          // Initial push of markers once webview is ready
          const js = `window.updateMarkers(${JSON.stringify(markersData)}); void(0);`;
          webViewRef.current?.injectJavaScript(js);
        }}
      />
      {showRefreshButton && (
        <TouchableOpacity style={styles.refreshBtn} onPress={handleRefresh}>
          <Text style={styles.refreshText}>🔄 Search this area</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Helpers
function getTypeKey(type: string): ThemeKey {
  const map: Record<string, ThemeKey> = { 
    RentalAccommodation: 'rental', FoodEstablishment: 'food', 
    EntertainmentAndEvent: 'events', PointOfInterest: 'poi', Tour: 'tours' 
  };
  return map[type] || 'poi';
}

function getIconClass(type: string) {
  const map: any = {
    RentalAccommodation: 'fas fa-home', FoodEstablishment: 'fas fa-utensils',
    EntertainmentAndEvent: 'fas fa-calendar-alt', PointOfInterest: 'fas fa-map-marker-alt'
  };
  return map[type] || 'fas fa-circle';
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  refreshBtn: {
    position: 'absolute', top: Platform.OS === 'ios' ? 60 : 40, alignSelf: 'center',
    backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: 25, elevation: 5, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25,
  },
  refreshText: { fontWeight: '600', color: '#333' }
});