import { useEffect, useRef } from 'react';

interface MapViewProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  children?: any;
  style?: any;
}

export default function MapView({ initialRegion, children, style }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const script1 = document.createElement('script');
    script1.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script1.async = true;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    script1.onload = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      const map = L.map(mapRef.current).setView(
        [initialRegion.latitude, initialRegion.longitude],
        15
      );

      map.panTo({lat: initialRegion.latitude, lng: initialRegion.longitude})
      //map.setZoom(10)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      //L.control.zoom({ zoomInText: '11' })

      // Add markers if children exist
      if (children) {
        const childArray = Array.isArray(children) ? children : [children];
        childArray.forEach((child: any) => {
          if (child?.props?.coordinate) {
            const marker = L.marker([
              child.props.coordinate.latitude,
              child.props.coordinate.longitude,
            ]).addTo(map);
            
            if (child.props.title) {
              marker.bindPopup(child.props.title);
            }
          }
        });
      }
    };

    document.head.appendChild(script1);

    return () => {
      script1.remove();
      link.remove();
    };
  }, [initialRegion, children]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', ...style }} />;
}

export function Marker({ coordinate, title }: any) {
  return null; // Rendered by parent MapView
}