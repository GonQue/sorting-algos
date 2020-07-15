import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent implements OnInit {
  array: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.array.push(120);
    this.array.push(50);
    this.array.push(250);
  }

}
