import { Injectable, Pipe, PipeTransform } from '@angular/core';

declare var Date: any;
@Pipe({ name: 'datepipe' })
@Injectable({
  providedIn: 'root'
})
export class DatePipe implements PipeTransform {
    transform(value, args ? : string[]): any {
        let now = new Date().getTime();
        let time = new Date(value.replace(/\s/, 'T')).getTime();
        let seconds = Math.floor((now - time) / 1000);
        if (seconds < 60) {
            return 'just now';
        } else if (seconds < 120) { // sent in last minute
            return Math.floor(seconds / 60) + ' minute ago';
        } else if (seconds < 3600) { // sent in last minute
            return Math.floor(seconds / 60) + ' minutes ago';
        } else if (seconds < 7200) { // sent in last hour
            return Math.floor(seconds / 3600) + ' hour ago';
        } else if (seconds < 86400) { // sent in last hour
            return Math.floor(seconds / 3600) + ' hours ago';
        } else if (seconds < 172800) { // sent more than one day ago
            return Math.floor(seconds / 86400) + ' day ago';
        } else if (seconds < 2592000) { // sent more than one day ago
            return Math.floor(seconds / 86400) + ' days ago';
        } else if (seconds < 5184000) { // sent more than one day ago
            return Math.floor(seconds / 2592000) + ' month ago';
        } else if (seconds < 31104000) { // sent more than one day ago
            return Math.floor(seconds / 2592000) + ' months ago';
        } else if (seconds < 62208000) { // sent more than one day ago
            return Math.floor(seconds / 31104000) + ' year ago';
        } else return Math.floor(seconds / 31104000) + ' years ago';
    }
} 
