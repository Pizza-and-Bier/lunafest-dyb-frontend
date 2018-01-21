import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlToolbarComponent } from './control-toolbar.component';

describe('ControlToolbarComponent', () => {
  let component: ControlToolbarComponent;
  let fixture: ComponentFixture<ControlToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
