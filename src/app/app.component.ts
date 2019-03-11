import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { FunctionsService } from './functions.service';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MatSnackBar, MatSidenavContainer } from '@angular/material';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
// import { environment } from '../environments/environment';
import * as $ from 'jquery';
import { FunctionsService } from './functions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  staticLinks = [
    {
      path: 'about',
      title: 'About'
    },
    {
      path: '',
      title: 'Home'
    }
  ];

  activeRoute = '';
  sideNavContainer = null;
  appRoutes = [
    // {
    //   name: 'Home', path: ''
    // },
    {
      name: 'Dashboard', path: 'dashboard', icon: 'dashboard'
    },
    {
      name: 'Settings', path: 'settings', icon: 'settings'
    }
  ];

  constructor(private router: Router, private funct: FunctionsService) { }

  getComponentName(path: string) {
    const route = path.split('/')[1];
    if (route === '') {
      $(document.getElementById('logout-button')).addClass('d-none');
      $('.staticLinks').removeClass('d-none');
      return 'Home';
    } else {
      this.activeRoute = route;
      $('.sidenav-item').removeClass('active');
      $(document.getElementById(route)).addClass('active');
      $('.staticLinks').addClass('d-none');
      $(document.getElementById('logout-button')).removeClass('d-none');
      return route;
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.getComponentName(event.url).toLowerCase() !== 'home') {
          $(document.getElementById('side-nav-button')).removeClass('d-none');
        } else {
          $(document.getElementById('side-nav-button')).addClass('d-none');
        }
      }
    });
    // this.router.events
    //   .filter((event) => event instanceof NavigationEnd)
    //   .subscribe((event: Event) => {
    //     this.componentRoute = this.getComponentName(event.url);
    //   });
    this.setElements();
  }

  ngAfterViewInit() {
    $('body').addClass('active');
  }

  setElements() {
    $('body').addClass('backed');
    this.sideNavContainer = document.getElementById('sideNavContainer');
  }

  toggleSideNav() {
    const useMSN = $(this.sideNavContainer);
    if (useMSN.hasClass('active')) {
      useMSN.removeClass('active');
    } else {
      useMSN.addClass('active');
    }
  }

  dismissSideNav() {
    $(this.sideNavContainer).removeClass('active');
  }

  logout() {
    $(this.sideNavContainer).removeClass('active');
    this.router.navigate(['']);
  }

  navigateTo(path) {
    this.router.navigate([path]);
    this.dismissSideNav();
  }
}
