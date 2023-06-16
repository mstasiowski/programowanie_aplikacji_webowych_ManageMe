import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalityAddComponent } from './functionality-add.component';

describe('FunctionalityAddComponent', () => {
  let component: FunctionalityAddComponent;
  let fixture: ComponentFixture<FunctionalityAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionalityAddComponent]
    });
    fixture = TestBed.createComponent(FunctionalityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
