export interface MapViewProps {
  initialRegion: {
    latitude?: number;
    longitude?: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  children?: any;
  style?: any;
  onRefreshRequest: (center: { latitude: number; longitude: number }) => void;
}