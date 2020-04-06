import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Settings } from './../../data/settings';
import { ApiService } from '../../api.service';

@Component({
    selector: 'page-map',
    templateUrl: 'map.page.html',
    styleUrls: ['./map.page.scss']
})
export class MapPage implements AfterViewInit {
    @ViewChild('mapCanvas') mapElement: ElementRef;
    mapData: any = [];
    constructor(public api: ApiService, public platform: Platform, public settings: Settings) {}
    async ngAfterViewInit() {
        await this.api.postItem('locations').subscribe(res => {
            this.processData(res);
            console.log(res);
        }, err => {
            console.log(err);
        });
    }
    async processData(data) {
        const googleMaps = await getGoogleMaps(data.mapApiKey);
        data.locations.map((item, index) => {
            this.mapData[index] = {};
            this.mapData[index].name = item.title;
            this.mapData[index].lat = parseFloat(item.description);
            this.mapData[index].lng = parseFloat(item.url);
            if (index == 0) this.mapData[index].center = true;
            console.log(this.mapData);
        });
        const mapEle = this.mapElement.nativeElement;
        const map = new googleMaps.Map(mapEle, {
            center: this.mapData.find((d: any) => d.center),
            zoom: data.mapZoom
        });
        this.mapData.forEach((markerData: any) => {
            const infoWindow = new googleMaps.InfoWindow({
                content: `<h5>${markerData.name}</h5>`
            });
            const marker = new googleMaps.Marker({
                position: markerData,
                map,
                title: markerData.name
            });
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        });
        googleMaps.event.addListenerOnce(map, 'idle', () => {
            mapEle.classList.add('show-map');
        });
    }
}

function getGoogleMaps(apiKey: string): Promise < any > {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
        return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => {
            const googleModule2 = win.google;
            if (googleModule2 && googleModule2.maps) {
                resolve(googleModule2.maps);
            } else {
                reject('google maps not available');
            }
        };
    });
}