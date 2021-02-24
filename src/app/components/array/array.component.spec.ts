import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ArrayComponent} from './array.component';
import {BarDirective} from '../bar/bar-host.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ArrayComponent', () => {
  let component: ArrayComponent;
  let fixture: ComponentFixture<ArrayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule],
      declarations: [ ArrayComponent, BarDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
