import L from "leaflet";

const redXIcon = new L.DivIcon({
  html: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="white" stroke="red" stroke-width="4"/>
    <line x1="14" y1="14" x2="34" y2="34" stroke="red" stroke-width="6" stroke-linecap="round"/>
    <line x1="34" y1="14" x2="14" y2="34" stroke="red" stroke-width="6" stroke-linecap="round"/>
  </svg>` ,
  className: '',
  iconSize: [48, 48],
  iconAnchor: [24, 48],
});

export default redXIcon;
