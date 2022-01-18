import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../home/home.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input()
  public categories: Category[] = [];

  constructor() {}

  ngOnInit(): void {}
}
