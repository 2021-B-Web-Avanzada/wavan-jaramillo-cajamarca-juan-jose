import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  categories,
  Category,
  Store,
  stores,
} from 'src/app/home/components/home/home.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  public store?: Store;

  public products = [1, 2, 3, 4, 5];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const foundStore = stores.find((store) => store.id === +params['id']);
      if (!foundStore) {
        this.router.navigate(['/home']);
        return;
      }
      this.store = foundStore;
    });
  }
}
