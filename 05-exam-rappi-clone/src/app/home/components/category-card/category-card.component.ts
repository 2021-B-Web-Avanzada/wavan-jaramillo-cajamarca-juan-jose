import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../home/home.component';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input()
  public category?: Category;

  constructor() {}

  ngOnInit(): void {}
}
