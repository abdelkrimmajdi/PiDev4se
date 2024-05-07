import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import * as L from 'leaflet';
import { PhysiotherapistService } from '../services/physiotherapist.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {

  private map!: L.Map;
  private centroid: L.LatLngExpression = [36.8065, 10.1815]; // Coordonnées de Tunis
  private physiotherapists: any[] = []; // Tableau pour stocker les physiothérapeutes

  constructor(private physiotherapistService: PhysiotherapistService) { }

  ngOnInit(): void {
    this.initMap();
    this.getPhysiotherapists(); // Appel à la fonction pour récupérer les physiothérapeutes
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // Ajoutez un gestionnaire d'événements de clic à la carte
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.onMapClick(event);
    });
  }

  private getPhysiotherapists(): void {
    this.physiotherapistService.getAllPhysiotherapists().subscribe((data: any) => {
      this.physiotherapists = data; // Stockez les données des physiothérapeutes dans le tableau
      this.addPhysiotherapistMarkers(); // Appel à la fonction pour ajouter les marqueurs des physiothérapeutes
    });
  }

 private addPhysiotherapistMarkers(): void {
  this.physiotherapists.forEach(physiotherapist => {
    const location: L.LatLngExpression = [parseFloat(physiotherapist.latitude), parseFloat(physiotherapist.longitude)];
    const popupContent = `
      <div style="font-size: 16px; color: #333;">
        <p style="font-weight: bold;">Id: ${physiotherapist.idPhy}</p>
        <p>Name: ${physiotherapist.phyname}</p>
        <p>City: ${physiotherapist.ville}</p>
        <p>Latitude: ${physiotherapist.latitude}</p>
        <p>Longitude: ${physiotherapist.longitude}</p>
      </div>
    `;
    L.marker(location).addTo(this.map).bindPopup(popupContent, {
      className: 'custom-popup-style' // Classe CSS pour personnaliser le style du popup
    });
  });
}


private onMapClick(event: L.LeafletMouseEvent): void {
  const latlng: L.LatLng = event.latlng;
  const popupContent = `
    <div>
      <p>Latitude: ${latlng.lat} <button class="copyButton" data-coordinates="${latlng.lat}, ${latlng.lng}" data-type="latitude">Copy The Latitude</button></p>
      <p>Longitude: ${latlng.lng} <button class="copyButton" data-coordinates="${latlng.lat}, ${latlng.lng}" data-type="longitude">Copy The Longitude</button></p>
    </div>
  `;
  const marker = L.marker(latlng).addTo(this.map).bindPopup(popupContent).openPopup();

  const copyButtons = document.querySelectorAll('.copyButton');
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const coordinates = button.getAttribute('data-coordinates');
      const type = button.getAttribute('data-type');
      if (coordinates && type) {
        const index = type === 'latitude' ? 0 : 1;
        const selectedCoordinate = coordinates.split(',')[index].trim();
        this.copyToClipboard(selectedCoordinate);
        button.textContent = "Copied";
        button.setAttribute('disabled', 'true');
      }
    });
  });
}
  private copyToClipboard(text: string): void {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  
}
