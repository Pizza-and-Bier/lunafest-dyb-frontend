import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionWrapperComponent } from './auction-wrapper.component';

describe('AuctionWrapperComponent', () => {
  let component: AuctionWrapperComponent;
  let fixture: ComponentFixture<AuctionWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
