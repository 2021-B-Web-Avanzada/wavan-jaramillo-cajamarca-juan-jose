import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  categories,
  Category,
} from 'src/app/home/components/home/home.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public category?: Category;

  public stores = [1, 2, , 3, 4, 5, 6, 7, 8];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      const foundCategory = categories.find(
        (category) => category.id === +params['id']
      );
      if (!foundCategory) {
        this.router.navigate(['/home']);
        return;
      }
      this.category = foundCategory;
    });
  }
}
