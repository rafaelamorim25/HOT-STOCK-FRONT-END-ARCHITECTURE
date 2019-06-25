import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hot Stock';

  constructor(private router: Router) { }

  public naoEstouNoLogin(): boolean {
    console.log(this.router.url);
    if (this.router.url === '/login') {
      return false;
    }
    return true;
  }

}
