import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorterInfoComponent } from './sorter-info.component';

describe('SorterInfoComponent', () => {
  let component: SorterInfoComponent;
  let fixture: ComponentFixture<SorterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
