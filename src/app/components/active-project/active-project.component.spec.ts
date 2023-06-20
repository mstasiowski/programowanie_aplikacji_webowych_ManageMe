import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProjectComponent } from './active-project.component';

describe('ActiveProjectComponent', () => {
  let component: ActiveProjectComponent;
  let fixture: ComponentFixture<ActiveProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveProjectComponent]
    });
    fixture = TestBed.createComponent(ActiveProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
