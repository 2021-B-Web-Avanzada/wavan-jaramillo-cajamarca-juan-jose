import { Component, Input, OnInit } from '@angular/core';
import { Store } from '../home/home.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit {
  @Input() stores: Store[] = [];

  constructor() {}

  ngOnInit(): void {}
}
