import {Bar} from "../components/bar";
import {Sorter} from "./Sorter";
import {SelectionSort} from "./SelectionSort";
import {InsertionSort} from "./InsertionSort";
import {BubbleSort} from "./BubbleSort";

describe('Sorting Algorithms', () => {
  const iterations = 100, arrayElements = 100;
  let arrayList = [];

  function compare(sorter: Sorter): number {
    let sortedArrays = 0;

    for (let i = 0; i < iterations; i++) {
      let frames = sorter.sort(arrayList[i], 0, arrayElements - 1);
      let algoSorterArray = frames[frames.length - 1].array;
      let javaSortedArray = arrayList[i].sort((a: Bar, b: Bar) => a.height - b.height);

      if (equalArrays(algoSorterArray, javaSortedArray))
        sortedArrays++;
    }
    return  sortedArrays;
  }

  function equalArrays(algoSortedArray: Bar[], javaSortedArray: Bar[]): boolean {
    let equal = true;

    for (let i = 0; i < arrayElements; i++) {
      if (algoSortedArray[i].height != javaSortedArray[i].height)
        equal = false;
    }
    return equal;
  }

  beforeEach(() => {
    let max = 500, min = 5;

    for (let i = 0; i < iterations; i++) {
      let array = [];
      for (let j = 0; j < arrayElements; j++) {
        let height = Math.floor(Math.random() * (max - min + 1) ) + min;
        array.push(new Bar(height, 'initial'));
      }
      arrayList.push(array);
    }

  });

  it('Selection Sort', () => {
    let sorter = new SelectionSort();
    let sortedArrays = compare(sorter);
    expect(sortedArrays).toBe(iterations);
  });

  it('Insertion Sort', () => {
    let sorter = new InsertionSort();
    let sortedArrays = compare(sorter);
    expect(sortedArrays).toBe(iterations);
  });

  it('Bubble Sort', () => {
    let sorter = new BubbleSort();
    let sortedArrays = compare(sorter);
    expect(sortedArrays).toBe(iterations);
  });
});
