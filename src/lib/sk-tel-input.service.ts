import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkTelInputService {

  // Local and global variables
  tracelog = '0'; // Checks if we console.log or not

  constructor() {
  }

  // This method is console log handler
  consoleHandler(data: any, data2?: any){
    if (this.tracelog !== '0'){
      console.log(data);
      if (data2 !== undefined){
        console.log(data2);
      }
    }
  }

  // This method checks if the input parameter is null or undefined
  checkUndefinedNull(inputGiven: any){
    if (inputGiven === undefined || inputGiven === null){
      return false;
    }

    return true;
  }

  // This method checks if the input parameter is null or undefined or empty
  checkNecessaryCases(inputGiven: any){
    if (inputGiven === undefined || inputGiven === null || inputGiven === ''){
      return false;
    }

    return true;
  }

  // This method applies Merge Sort in order to sort the countries list
  mergeSort(arrayCountryNames: string[]): string[] {

    // Start with base case
    if (arrayCountryNames.length <= 1){
      return arrayCountryNames;
    }

    // Find middle index of the array
    let middleIndex = Math.floor(arrayCountryNames.length / 2);

    // Start the recursive calls
    let leftPartArray = this.mergeSort(arrayCountryNames.slice(0, middleIndex));
    let rightPartArray = this.mergeSort(arrayCountryNames.slice(middleIndex));

    // Return the merged array
    return this.merge(leftPartArray, rightPartArray);
  }

  // This method implements the merge sort comparisons
  merge(leftPartArray: string[], rightPartArray: string[]): string[] {

    // Result sorted items
    let resultSortedArray: string[] = [];

    // Initiate and compare elements
    while (leftPartArray.length && rightPartArray.length){
      // Insert the smallest element into the resultSortedArray
      if (leftPartArray[0] < rightPartArray[0]){
        resultSortedArray.push(leftPartArray.shift());
      } else {
        resultSortedArray.push(rightPartArray.shift());
      }
    }

    // Create the new array by merging and combining the two parts
    return [...resultSortedArray, ...leftPartArray, ...rightPartArray];
  }
}
