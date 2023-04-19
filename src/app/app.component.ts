import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppService } from './app.service';
import { Countries } from './countries.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AppService]
})
export class AppComponent {
  title = 'signals';

  // Approach one
  countries$: Observable<Countries[]> = this.appService.getData();

  // Approach two
    // private readonly countrySubject: BehaviorSubject<Countries[]> = new BehaviorSubject<Countries[]>([]);
    // readonly countries$ = this.countrySubject.asObservable();

  // Approach three - signals
  countries = signal<Countries[]>([]);
  totalPopulation = computed(() => this.countries().map((country: Countries) => country.population).reduce((acc, curr) => { return acc + curr  }, 0));

  countryForm = new FormGroup({
    code: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    region: new FormControl<string>('', [Validators.required]),
    population: new FormControl<number>(0, [Validators.required]),
    addToList: new FormControl<boolean>(true)
  });

  constructor(private appService: AppService) { 

    effect(() => console.log(this.totalPopulation))
  }
 

  ngOnInit(): void {
    // Approach two
      // this.getCountries();
    
    // Approach three - // Replace the value
      this.countries.set(this.getSignalCountries());
  }
  // Approach two
    // private getCountries(): Observable<Countries[]> {
    //   return this.appService.getData();
    // }

  // Approach three
    private getSignalCountries(): Countries[] {
      return this.appService.getSignalData()
    }

  onSubmit(): void {
    // Assumption: The data has been processed/ added to the BE and a success response has been received: either with the added data or just a success message
    // On submit we need to refresh our data 
      // Approach one
        // create a behaviorSubject/Subject(refresh$) and use some rxjs operator like combineLatest to trigger the service to refetch the whole data
    // Approach two
        // we can simply call getCountries() and it calls the service to refetch the data, but the caveat is if the service has an rxjs operator like shareReplay() or share() 
        // we'll need to create a subject there and trigger refetching of data
        const { code, name, region, population} = this.countryForm.value as Countries;
    // Approach three
      this.countries.mutate((countries: Countries[]) => countries.push({ code, name, region, population}));
      // this.countries.set([{code, name, region}]);
      // const exmaple = effect(() => console.log('The countries present are:', this.countries()));
      // console.log(exmaple)
  }
}
