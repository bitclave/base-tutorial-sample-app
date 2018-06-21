import { Component, OnInit } from '@angular/core';
import { BaseAuthService } from './../../services/base-auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor( private baseAuthService: BaseAuthService) { }

  ngOnInit() {
  }

}
