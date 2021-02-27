import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {HomeComponent, WarningDialog} from './home.component';
import {ControllerComponent} from "../controller/controller.component";
import {SorterInfoComponent} from "../sorter-info/sorter-info.component";
import {ArrayComponent} from "../array/array.component";
import {BarDirective} from "../bar/bar-host.directive";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material/dialog";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, MatDialogModule],
      declarations: [ HomeComponent, ControllerComponent, SorterInfoComponent, ArrayComponent, BarDirective, WarningDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
