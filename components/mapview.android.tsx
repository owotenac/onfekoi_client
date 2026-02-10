import { globalTheme } from '@/model/global-css';
import { MapViewProps } from '@/model/mapviewprops';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapView({ initialRegion, children, style }: MapViewProps) {
  const markers = Array.isArray(children) ? children : children ? [children] : [];
  
  const markerData = markers
    .filter((child: any) => child?.props?.coordinate)
    .map((child: any) => ({
      lat: child.props.coordinate.latitude,
      lng: child.props.coordinate.longitude,
      title: child.props.title || '',
      uuid: child.props.uuid || '',
      mainType: child.props.mainType || 'default',
    }));

  // Function to get icon details based on type
  const getIconConfig = (type: string) => {
    switch (type) {
      case 'RentalAccommodation':
        return { icon: 'fas fa-home', color: globalTheme['rental']['color'] };
      case 'FoodEstablishment':
        return { icon: 'fas fa-utensils', color: globalTheme['food']['color'] };
      case 'EntertainmentAndEvent':
        return { icon: 'fas fa-calendar-alt', color: globalTheme['events']['color'] };
      case 'PointOfInterest':
        return { icon: 'fas fa-map-marker-alt', color: globalTheme['poi']['color'] };
      case 'Tour':
        return { icon: 'fas fa-map-marker-alt', color: globalTheme['tours']['color'] };
      default:
        return { icon: 'fas fa-circle', color: '#007AFF' };
    }
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/owotenac/onfekoi_client@main/assets/map_css/map.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100vw; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([${initialRegion.latitude}, ${initialRegion.longitude}], 15);
          
          map.panTo({lat: ${initialRegion.latitude}, lng: ${initialRegion.longitude}});

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
          }).addTo(map);
          
          // Function to create Font Awesome icons
          const createFAIcon = (iconClass, color) => {
            return L.divIcon({
              className: 'custom-fa-icon',
              html: \`
                <div class="marker-container" style="background-color: \${color};">
                  <i class="\${iconClass}"></i>
                </div>
              \`,
              iconSize: [36, 36],
              iconAnchor: [18, 36],
              popupAnchor: [0, -36]
            });
          };

          // Icon configuration mapping
          const iconConfig = ${JSON.stringify(
            markerData.reduce((acc: any, m: any) => {
              acc[m.uuid] = getIconConfig(m.mainType);
              return acc;
            }, {})
          )};

          const markers = ${JSON.stringify(markerData)};
          
          markers.forEach(m => {
            const config = iconConfig[m.uuid] || { icon: 'fas fa-circle', color: '#007AFF' };
            const markerIcon = createFAIcon(config.icon, config.color);
            
            const marker = L.marker([m.lat, m.lng], { icon: markerIcon }).addTo(map);
            
            if (m.title && m.uuid) {
              const popupContent = \`
                <div class="custom-popup">
                  <h3>\${m.title}</h3>
                  <button 
                    class="popup-details-btn" 
                    onclick="window.ReactNativeWebView.postMessage('\${m.uuid}')"
                  >
                    View Details
                  </button>
                </div>
              \`;
              marker.bindPopup(popupContent);
            }
          });
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      source={{ html }}
      style={[styles.webview, style]}
      originWhitelist={['*']}
      javaScriptEnabled={true}
      onMessage={(event) => {
        // Handle message from WebView (the UUID)
        const uuid = event.nativeEvent.data;
        if (uuid) {
          router.push(`/product-details?uuid=${uuid}`);
        }
      }}
    />
  );
}

export function Marker({ coordinate, title, uuid, mainType }: any) {
  return null;
}

const styles = StyleSheet.create({
  webview: { flex: 1 },
});