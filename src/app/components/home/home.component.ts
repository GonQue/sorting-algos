import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ArrayComponent} from "../array/array.component";
import {MatSliderChange} from "@angular/material/slider";
import {ControllerComponent} from "../controller/controller.component";
import {MatSelectChange} from "@angular/material/select";
import {SelectionSort} from "../../sorters/SelectionSort";
import {InsertionSort} from "../../sorters/InsertionSort";
import {BubbleSort} from "../../sorters/BubbleSort";
import {ShellSort} from "../../sorters/ShellSort";
import {QuickSort} from "../../sorters/QuickSort";
import {MergeSort} from "../../sorters/MergeSort";
import {HeapSort} from "../../sorters/HeapSort";
import {Sorter} from "../../sorters/Sorter";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

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

  onSpeedSliderChange(event: MatSliderChange): void {
    this._speed = event.value;
  }

  onDisableButtons(): void {
    this._disableButtons = true;
  }

  onEnableButtons(): void {
    this._disableButtons = false;
  }

  onSelectChange(event: MatSelectChange): void {
    let sorter;
    if (event.value === "Selection Sort")
      sorter = new SelectionSort();
    else if (event.value === "Insertion Sort")
      sorter = new InsertionSort();
    else if (event.value === "Bubble Sort")
      sorter = new BubbleSort();
    else if (event.value === "Shell Sort")
      sorter = new ShellSort();
    else if (event.value === "Quick Sort")
      sorter = new QuickSort();
    else if (event.value === "Merge Sort")
      sorter = new MergeSort();
    else if (event.value === "Heap Sort")
      sorter = new HeapSort();
    else
      window.alert("ERROR");

    this._controllerComponent.changeSorter(sorter);
  }

  onToggleChange(event: MatSlideToggleChange): void {
    this._controllerComponent.changeStepMode(event.checked);
  }

}
