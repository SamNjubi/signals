import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Countries } from './countries.interface';

@Injectable()
export class AppService {

    countryName = [ "United States", "United Kingdom","Germany", "Italy", "Spain", "Portugal", "Netherlands", "Switzerland", "Russia", "South Africa", "Egypt", "Nigeria", "Kenya" ];
    regions = ["North America", "South America", "Europe", "Asia", "Africa", "Oceania"];
    codes = ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB"];

    private readonly countrySubject: BehaviorSubject<Countries[]> = new BehaviorSubject<Countries[]>([]);
    readonly countries$ = this.countrySubject.asObservable();

    constructor(private http: HttpClient) { }

    getData(): Observable<Countries[]> {
        // return this.http.get<any>('assets/countrySet.json')
        return of(this.generateCountries(5)).pipe(delay(500));
    }

    getSignalData(): Countries[] {
        return this.generateCountries(5)
    }

    private generateCountries(noOfCountries: number): Countries[] {
        let countries = [];

        for (let i = 0; i < noOfCountries; i++) {
            const codeIndex = Math.floor(Math.random() * this.codes.length);
            const nameIndex = Math.floor(Math.random() * this.countryName.length);
            const regionIndex = Math.floor(Math.random() * this.regions.length);

            const country = {
                code: this.codes[codeIndex],
                name: this.countryName[nameIndex],
                region: this.regions[regionIndex],
                population: Math.floor(Math.random() * 1000)
            };

            countries.push(country);
        }
        return countries;
        // this.countrySubject.next(countries);
    }
}