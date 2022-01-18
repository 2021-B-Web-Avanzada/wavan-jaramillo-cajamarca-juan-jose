import { Component, Input, OnInit } from '@angular/core';
import { Store } from '../home/home.component';

@Component({
  selector: 'app-stores-card',
  templateUrl: './stores-card.component.html',
  styleUrls: ['./stores-card.component.scss'],
})
export class StoresCardComponent implements OnInit {
  @Input() store?: Store;

  constructor() {}

  ngOnInit(): void {}
}
