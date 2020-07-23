import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BarComponent} from "../bar/bar.component";

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements OnInit, AfterViewInit {
  @ViewChildren(BarComponent)
  barList: QueryList<BarComponent>;

  barArray: BarComponent[] = [];


  constructor() { }

  ngOnInit(): void {
    /*this.array.push(120);
    this.array.push(50);
    this.array.push(250);
    this.bars = document.getElementsByTagName('app-bar');*/
  }

  ngAfterViewInit(): void {
    console.log("after view");
    console.log(this.barList.length);
    this.barArray = this.barList.toArray();
  }

  sort() {
    this.barArray[2].color();
    /*this.bars[0].children[0];
    setTimeout(() => {
      document.getElementById("1").style.order = '120';
      document.getElementById("2").style.order = '50';
      document.getElementById("3").style.order = '250';
    }, 500);*/
  }

  order() {
    this.barArray[1].last();
    this.barArray[1].color();
  }

  range(number) {
    return Array(number);
  }

}
