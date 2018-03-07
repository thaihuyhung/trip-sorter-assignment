import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTripResultComponent } from './search-trip-result.component';

describe('SearchTripResultComponent', () => {
  let component: SearchTripResultComponent;
  let fixture: ComponentFixture<SearchTripResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTripResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTripResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
