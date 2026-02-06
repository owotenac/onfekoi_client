export interface MapViewProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
  };
  children?: any;
  style?: any;
}