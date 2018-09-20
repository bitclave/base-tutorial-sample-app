import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRequestItemComponent } from './search-request-item.component';

describe('SearchRequestItemComponent', () => {
  let component: SearchRequestItemComponent;
  let fixture: ComponentFixture<SearchRequestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRequestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
