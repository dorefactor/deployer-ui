import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuplaThreeComponent } from './tupla-three.component';

describe('TuplaThreeComponent', () => {
  let component: TuplaThreeComponent;
  let fixture: ComponentFixture<TuplaThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuplaThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuplaThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
