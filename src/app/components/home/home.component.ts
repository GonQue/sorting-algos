import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {ArrayComponent} from "../array/array.component";
import {MatSliderChange} from "@angular/material/slider";
import {ControllerComponent} from "../controller/controller.component";
import {MatSelectChange} from "@angular/material/select";
import {MatDialog} from "@angular/material/dialog";
import {SelectionSort} from "../../sorters/SelectionSort";
import {InsertionSort} from "../../sorters/InsertionSort";
import {BubbleSort} from "../../sorters/BubbleSort";
import {ShellSort} from "../../sorters/ShellSort";
import {QuickSort} from "../../sorters/QuickSort";
import {MergeSort} from "../../sorters/MergeSort";
import {HeapSort} from "../../sorters/HeapSort";
import {Sorter} from "../../sorters/Sorter";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {EventManager} from "@angular/platform-browser";

@Component({
  selector: 'warning-dialog',
  templateUrl: 'warning-dialog.html'
})
export class WarningDialog {}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit{

  @ViewChild(ArrayComponent)
  private _arrayComponent: ArrayComponent;

  @ViewChild(ControllerComponent)
  private _controllerComponent: ControllerComponent

  // maxBarHeight for 1920x1080 is 500px and maxSize is 100
  _maxBarHeight: number = Math.round(window.innerHeight * 500 / 921);
  _maxSize: number = Math.round((window.innerWidth * 100) / 1920);
  _size: number;
  _speed: number = 70;
  _disableButtons: boolean = false;
  _sorter: Sorter = new SelectionSort();
  _warningSeen: boolean = localStorage.getItem('warningSeen') !== null;

  constructor(private eventManager : EventManager, public dialog: MatDialog) {
    this._size = this._maxSize / 2 > 50 ? 50 : Math.round(this._maxSize / 2);
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
  }

  ngAfterViewInit(): void {
    // Done to avoid ExpressionChangedAfterItHasBeenCheckedError
    this._controllerComponent.arrayComponent = this._arrayComponent;
    this._controllerComponent.changeSorter(this._sorter);
  }

  onResize(event: any) {
    const currentUsedPixels = this._size * 16;
    console.log(currentUsedPixels);
    const arrayComponentWidth = event.target.innerWidth * 0.9;
    const newMaxBarHeight = Math.round(event.target.innerHeight * 500 / 921);
    const factor = newMaxBarHeight / this._maxBarHeight;
    console.log("factor: " + factor);

    this._maxSize = Math.round((window.innerWidth * 100) / 1920);

    if (currentUsedPixels >= arrayComponentWidth) {
      this._size = this._maxSize;
      this._arrayComponent.changeSize(this._size);
      this._controllerComponent.resetAnimation();
    }

    console.log("height: " + event.target.innerHeight);
    console.log(Math.round(event.target.innerHeight * 500 / 921));

    this._arrayComponent.resizeBars(factor);
    this._maxBarHeight = newMaxBarHeight;
  }


  generateNewArray(): void {
    this._arrayComponent.loadBars();
    this._controllerComponent.resetAnimation();
  }

  restartArray(): void {
    this._arrayComponent.restartArray();
    this._controllerComponent.resetAnimation();
  }

  onSizeSliderChange(event: MatSliderChange): void {
    this._size = event.value;
    this._arrayComponent.changeSize(event.value);
    this._controllerComponent.resetAnimation();
  }

  onSpeedSliderInput(event: MatSliderChange): void {
    this._speed = event.value;
  }

  onSpeedSliderChange(event: MatSliderChange): void {
    if (event.value > 70 && !this._warningSeen) {
      this.dialog.open(WarningDialog);
      localStorage.setItem('warningSeen', 'true');
      this._warningSeen = true;
    }
    this._speed = event.value;
  }

  onDisableButtons(): void {
    this._disableButtons = true;
  }

  onEnableButtons(): void {
    this._disableButtons = false;
  }

  onSelectChange(event: MatSelectChange): void {
    if (event.value === "Selection Sort")
      this._sorter = new SelectionSort();
    else if (event.value === "Insertion Sort")
      this._sorter = new InsertionSort();
    else if (event.value === "Bubble Sort")
      this._sorter = new BubbleSort();
    else if (event.value === "Shell Sort")
      this._sorter = new ShellSort();
    else if (event.value === "Quick Sort")
      this._sorter = new QuickSort();
    else if (event.value === "Merge Sort")
      this._sorter = new MergeSort();
    else if (event.value === "Heap Sort")
      this._sorter = new HeapSort();
    else
      window.alert("ERROR");

    this._controllerComponent.changeSorter(this._sorter);
  }

  onToggleChange(event: MatSlideToggleChange): void {
    this._controllerComponent.changeStepMode(event.checked);
  }

}
