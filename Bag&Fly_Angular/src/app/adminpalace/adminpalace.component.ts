import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/Modeles/Hotel';
import { ApiService } from 'src/Services/api-service.service';

@Component({
  selector: 'app-adminpalace',
  templateUrl: './adminpalace.component.html',
  styleUrls: ['./adminpalace.component.css'],
})
export class AdminpalaceComponent {
  tablenb: number = 1;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  changetable(nb: number) {
    this.tablenb = nb;
    console.log(this.tablenb);
  }
}
