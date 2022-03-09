import { Component, OnDestroy } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private sidebarService: NbSidebarService) {}

  items: NbMenuItem[] = [
    {
      title: 'Patients',
      icon: 'person-outline',
      link: '/patients',
    },
    {
      title: 'Hospitals',
      icon: { icon: 'grid-outline', pack: 'eva' },
      link: '/hospitals',
    },
  ];

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
