import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyValuePairComponent } from './key-value-pair.component';

describe('KeyValuePairComponent', () => {
  let component: KeyValuePairComponent;
  let fixture: ComponentFixture<KeyValuePairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyValuePairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyValuePairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
