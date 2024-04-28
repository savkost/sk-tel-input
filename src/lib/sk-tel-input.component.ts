import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountryCodeSelectOption } from './country-select-option';
import { SKTelInputOutput } from './sk-tel-input-output';
import { SkTelInputService } from './sk-tel-input.service';

@Component({
  selector: 'sk-tel-input',
  templateUrl: './sk-tel-input.component.html',
  styleUrls: ['./sk-tel-input.component.scss'],
})
export class SkTelInputComponent {

  // GENERAL INPUTS
  @Input() totalBackgroundHexColor: string = '#FFF';
  @Input() inputBackgroundHexColor: string = '#FFF';
  @Input() selectorBackgroundHexColor: string = '#F1F7FE';
  @Input() borderHexColor: string = '#F1F7FE';
  @Input() arrowIconHexColor: string = '#7904FF';
  @Input() checkedCountryIconHexColor: string = '#7904FF';
  @Input() dividerPreferredCountriesColor: string = '#F1F7FE';
  @Input() inputContents: string = '';
  @Input() readOnlyInput: boolean = false;
  @Input() placeholderInput: string = '';
  @Input() textInputHexColor: string = '#212121';
  @Input() caseCodeSelectorTriggerID: string;
  @Input() placeholderSearchCountriesInput: string = '';
  @Input() dividerSearchInputCountriesColor: string = '#F1F7FE';
  @Input() caretColorInput: string = '#212121';
  @Input() totalSkTelInputBorderRadius: number = 12;

  // COUNTRY SELECTOR INPUTS
  @Input() initialSelectedCountryISO: string;
  @Input() preferredCountriesISOList: string[];
  @Input() presentSearchBarCountries: boolean = true;
  @Input() selectedCountryByPhoneCode: string = '';
  @Input() patternMobile: string;
  @Input() borderWrongPatternHexColor: string;

  // OUTPUTS
  @Output() emitInputContentEvent: EventEmitter<SKTelInputOutput> = new EventEmitter();
  @Output() emitEnterPressedEvent: EventEmitter<boolean> = new EventEmitter();

  // Local Fields
  selectedCountryCode: CountryCodeSelectOption;

  constructor(public helper: SkTelInputService) { }

  ngOnInit() {

    // Check and set the read-only input
    if (!this.helper.checkUndefinedNull(this.readOnlyInput)){
      this.readOnlyInput = false;
    }

    // Check and set the caseCodeSelectorTriggerID in a random way
    if (!this.helper.checkNecessaryCases(this.caseCodeSelectorTriggerID)){

      // Create a random string of 10 characters
      this.caseCodeSelectorTriggerID = this.createRandomString(10);
    }

    // Check the pattern and set default borderWrongPatternHexColor
    if (this.helper.checkNecessaryCases(this.patternMobile)){
      if (!this.helper.checkNecessaryCases(this.borderWrongPatternHexColor)){
        this.borderWrongPatternHexColor = '#932222';
      }
    }
  }

  // This method emits the boolean value indicating whether the enter key was pressed
  emitEnterPressed(){
    this.emitEnterPressedEvent.emit(true);
  }

  // This method allows only numbers to be typed [0,9]
  fixTypeNumbersOnly(e: any){
    if (e.which < 48 || e.which > 57){
      e.preventDefault();
    }
  }

  // This method emits the input contents on every change
  emitInputContent(){

    // Construct the proper data output object
    const emitSkTelInputContents: SKTelInputOutput = {
      selectedCountryCode: this.selectedCountryCode,
      telInputContents: this.inputContents
    }

    // Emit the input contents
    this.emitInputContentEvent.emit(emitSkTelInputContents);
  }

  // This method handles the selected country code
  handleSelectedCountryCode(selectedCountryCode: CountryCodeSelectOption){

    // Set the selected country code
    this.helper.consoleHandler('Selected Country Code: ', selectedCountryCode);
    this.selectedCountryCode = selectedCountryCode;

    // Emit SK Tel Inputs Contents
    this.emitInputContent();
  }

  // This method validates the input contents if existent pattern
  validateInputPattern(){
    if (this.helper.checkNecessaryCases(this.patternMobile)){

      // Test input contents against the provided pattern
      if (RegExp(this.patternMobile).test(this.inputContents)){
        return true;
      }

      // Input contents are not according to the provided pattern
      return false;
    }

    return true;
  }

  // This method creates a random string of the requested size
  createRandomString(requestedSize: number): string {

    // Initializations
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    let result = '';

    // Create a random string
    for (let i = 0; i < requestedSize; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    // Return the generated random string
    return result;
  }
}
