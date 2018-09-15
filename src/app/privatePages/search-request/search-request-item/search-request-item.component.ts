import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-request-item',
  templateUrl: './search-request-item.component.html',
  styleUrls: ['./search-request-item.component.css']
})
export class SearchRequestItemComponent implements OnInit {

  @Input() request;
  constructor() { }

  ngOnInit() {
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

}
