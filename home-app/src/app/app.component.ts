import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HomeComponent, RouterModule],
  /* Template is where the user interface is defined.
     Templates are in HTML
  */
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="assets/logo.svg" alt="logo" aria-hidden="true">
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,  
  styleUrls: ['./app.component.css'],
})
/* Class is where the logic of the component is defined. 
*/
export class AppComponent {
  title = 'homes';
}

/* The last part of a component is the style. 
Angular supports CSS, SCSS, and SASS.
*/