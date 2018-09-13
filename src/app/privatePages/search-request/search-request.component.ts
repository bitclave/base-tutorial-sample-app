import { Component, OnInit } from '@angular/core';
import { BaseAuthService } from '../../services/base-auth.service';

@Component({
  selector: 'app-search-request',
  templateUrl: './search-request.component.html',
  styleUrls: ['./search-request.component.css']
})
export class SearchRequestComponent implements OnInit {

  searchRequests;
  createdSearchRequest;

  constructor(
    private baseAuthService: BaseAuthService
  ) { }

  ngOnInit() {
  }

  getAllRequests(flag) {
    if (flag && flag.checked) {
      this.baseAuthService.widget.getAllRequests().then( data => {
        this.searchRequests = data;
        console.log(data);
      });
    } else {
      this.searchRequests = undefined;
    }
  }
  createRequest(flag) {
    if (flag && flag.checked) {
      const request = {
        id: 0,
        owner: '0x0',
        tags: new Map([
          ['product', 'car'],
          ['color', 'red'],
          ['producer', 'mazda'],
          ['models', 'RX8']
        ])
      };
      this.baseAuthService.widget.createRequest(request).then( data => {
        this.createdSearchRequest = data;
        console.log(data);
      });
    } else {
      this.createdSearchRequest = undefined;
    }
  }
  updateRequest(flag) {
    const now = (new Date()).toISOString();
    this.createdSearchRequest.tags.set('time', now);
    this.baseAuthService.widget.createRequest(this.createdSearchRequest).then( data => {
      this.createdSearchRequest = data;
      console.log(data);
    });

  }
  deleteRequest() {
    this.baseAuthService.widget.deleteRequest(this.createdSearchRequest).then( data => {
      this.createdSearchRequest = undefined;
      console.log(data);
    });
  }


}
