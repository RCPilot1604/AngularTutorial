import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Photo of {{housingLocation?.name}}">
      <section class="listing-description">
        <h2 class="listing-heading"> {{ housingLocation?.name }} </h2>
        <h2 class="listing-location"> {{ housingLocation?.city }}, {{ housingLocation?.state }} </h2>
      </section>
      <section class="listing-features">
        <h2 class="section-heading"> About this Housing Location </h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>WiFi: {{ housingLocation?.wifi ? 'Yes' : 'No' }}</li>
          <li>Laundry: {{ housingLocation?.laundry ? 'Yes' : 'No' }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading"> Apply To Live Here </h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" formControlName="firstName">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" formControlName="lastName">
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email">
          <button class="primary" type="submit">Apply Now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
    }
  )
  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }
  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingService.getHousingLocationById(housingLocationId).then(
      housingLocation => {
        this.housingLocation = housingLocation;
      }
    );
  }
}
