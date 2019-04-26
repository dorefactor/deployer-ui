import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationConfigurationFormComponent } from './application-configuration-form.component';

describe('ApplicationConfigurationFormComponent', () => {
  let component: ApplicationConfigurationFormComponent;
  let fixture: ComponentFixture<ApplicationConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationConfigurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
