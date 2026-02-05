import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface MapViewProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  children?: any;
  style?: any;
}

export default function MapView({ initialRegion, children, style }: MapViewProps) {
  const markers = Array.isArray(children) ? children : children ? [children] : [];
  
  const markerData = markers
    .filter((child: any) => child?.props?.coordinate)
    .map((child: any) => ({
      lat: child.props.coordinate.latitude,
      lng: child.props.coordinate.longitude,
      title: child.props.title || '',
    }));

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
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
          
        map.panTo({lat: ${initialRegion.latitude}, lng: ${initialRegion.longitude}})

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
          }).addTo(map);
          
          const markers = ${JSON.stringify(markerData)};
          markers.forEach(m => {
            const marker = L.marker([m.lat, m.lng]).addTo(map);
            if (m.title) marker.bindPopup(m.title);
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
    />
  );
}

export function Marker({ coordinate, title }: any) {
  return null;
}

const styles = StyleSheet.create({
  webview: { flex: 1 },
});