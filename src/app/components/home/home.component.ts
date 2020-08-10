import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ArrayComponent} from "../array/array.component";
import {MatSliderChange} from "@angular/material/slider";
import {ControllerComponent} from "../controller/controller.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild(ArrayComponent)
  private _arrayComponent: ArrayComponent;

  @ViewChild(ControllerComponent)
  private _controllerComponent: ControllerComponent

  _size: number = 5;
  _speed: number = 10;
  _disableButtons: boolean = false;

  constructor() { }

  ngAfterViewInit(): void {
    // Done to avoid ExpressionChangedAfterItHasBeenCheckedError
    this._controllerComponent.arrayComponent = this._arrayComponent;
  }

  generateNewArray(): void {
    this._arrayComponent.loadBars();
  }

  restartArray(): void {
    this._arrayComponent.restartArray();
  }

  onSizeSliderChange(event: MatSliderChange): void {
    this._size = event.value;
    this._arrayComponent.changeSize(event.value);
  }

  onSpeedSliderChange(event: MatSliderChange): void {
    this._speed = event.value;
  }

  onDisableButtons(): void {
    this._disableButtons = true;
  }

  onEnableButtons(): void {
    this._disableButtons = false;
  }

}
