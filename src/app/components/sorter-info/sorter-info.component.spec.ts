import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SorterInfoComponent} from './sorter-info.component';

describe('SorterInfoComponent', () => {
  let component: SorterInfoComponent;
  let fixture: ComponentFixture<SorterInfoComponent>;

  beforeEach(waitForAsync(() => {
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

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
