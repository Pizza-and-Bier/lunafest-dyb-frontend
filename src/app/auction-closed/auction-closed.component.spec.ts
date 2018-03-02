import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionClosedComponent } from './auction-closed.component';

describe('AuctionClosedComponent', () => {
  let component: AuctionClosedComponent;
  let fixture: ComponentFixture<AuctionClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
