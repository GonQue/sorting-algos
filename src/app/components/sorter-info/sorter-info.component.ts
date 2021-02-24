import {Component, Input} from '@angular/core';
import {Sorter} from "../../sorters/Sorter";

@Component({
  selector: 'app-sorter-info',
  templateUrl: './sorter-info.component.html',
  styleUrls: ['./sorter-info.component.scss']
})
export class SorterInfoComponent {
  @Input()
  _sorter: Sorter;

  constructor() {}
}
