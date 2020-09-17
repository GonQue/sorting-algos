import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {ControllerComponent} from "../controller/controller.component";
import {SorterInfoComponent} from "../sorter-info/sorter-info.component";
import {ArrayComponent} from "../array/array.component";
import {BarDirective} from "../bar/bar-host.directive";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule],
      declarations: [ HomeComponent, ControllerComponent, SorterInfoComponent, ArrayComponent, BarDirective ]
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
