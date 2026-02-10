import { MapViewProps } from '@/model/mapviewprops';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';

import { globalTheme } from '@/model/global-css';
import '../assets/map_css/map.css';



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

    const link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link2);

    script1.onload = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;
      const createFAIcon = (iconClass: string, color: string) => {
        return L.divIcon({
          className: 'custom-fa-icon',
          html: `
      <div class="marker-container" style="background-color: ${color};">
        <i class="${iconClass}"></i>
      </div>
    `,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36]
        });
      };

      const getIconByType = (type: string) => {
        switch (type) {
          case 'RentalAccommodation':
            return createFAIcon('fas fa-home', globalTheme['rental']['color']);
          case 'FoodEstablishment':
            return createFAIcon('fas fa-utensils', globalTheme['food']['color']);
          case 'EntertainmentAndEvent':
            return createFAIcon('fas fa-calendar-alt', globalTheme['events']['color']);
          case 'PointOfInterest':
            return createFAIcon('fas fa-map-marker-alt', globalTheme['poi']['color']);
          case 'Tour':
            return createFAIcon('fas fa-map-marker-alt', globalTheme['tours']['color']);
          default:
            return createFAIcon('fas fa-circle', '#007AFF');
        }
      };
      const map = L.map(mapRef.current).setView(
        [initialRegion.latitude, initialRegion.longitude],
        15
      );

      map.panTo({ lat: initialRegion.latitude, lng: initialRegion.longitude })
      //map.setZoom(10)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      //L.control.zoom({ zoomInText: '11' })
      //var myIcon = L.divIcon({ className: 'circle-container' })
      //var rentalIcon = getIconByType('food')

      // Add markers if children exist
      if (children) {
        const childArray = Array.isArray(children) ? children : [children];
        childArray.forEach((child: any) => {
          if (child?.props?.coordinate) {
            const marker = L.marker([
              child.props.coordinate.latitude,
              child.props.coordinate.longitude,
            ],
              { icon: getIconByType(child.props.mainType) }
            ).addTo(map);

            if (child.props.title && child.props.uuid) {
              // Create clickable popup content with HTML
              const popupContent = `
                <div class="custom-popup">
                  <h3>${child.props.title}</h3>
                  <button 
                    class="popup-details-btn" 
                    data-uuid="${child.props.uuid}"
                  >
                    View Details
                  </button>
                </div>
              `;

              marker.bindPopup(popupContent);

              // Listen for popup open event
              marker.on('popupopen', () => {
                // Add click handler to the button inside the popup
                const btn = document.querySelector(`[data-uuid="${child.props.uuid}"]`);
                if (btn) {
                  btn.addEventListener('click', () => {
                    router.push(`/product-details?uuid=${child.props.uuid}`);
                  });
                }
              });
            }
          }
        });
      }
    };

    document.head.appendChild(script1);

    return () => {
      script1.remove();
      link.remove();
      link2.remove();
    };
  }, [initialRegion, children]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', ...style }} />;
}

export function Marker({ coordinate, title, uuid, mainType }: any) {
  return null; // Rendered by parent MapView
}