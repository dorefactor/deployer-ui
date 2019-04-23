import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostSetupComponent } from './host-setup.component';

describe('HostSetupComponent', () => {
  let component: HostSetupComponent;
  let fixture: ComponentFixture<HostSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
