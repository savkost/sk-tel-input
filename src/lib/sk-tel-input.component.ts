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
  @Input() totalBackgroundHexColor: string;
  @Input() inputBackgroundHexColor: string;
  @Input() selectorBackgroundHexColor: string;
  @Input() borderHexColor: string;
  @Input() arrowIconHexColor: string;
  @Input() checkedCountryIconHexColor: string;
  @Input() dividerPreferredCountriesColor: string;
  @Input() inputContents: string;
  @Input() readOnlyInput: boolean;
  @Input() placeholderInput: string;
  @Input() textInputHexColor: string;
  @Input() caseCodeSelectorTriggerID: string;
  @Input() placeholderSearchCountriesInput: string;
  @Input() dividerSearchInputCountriesColor: string;
  @Input() caretColorInput: string = '#212121';
  @Input() totalSkTelInputBorderRadius: number = 12;

  // COUNTRY SELECTOR INPUTS
  @Input() initialSelectedCountryISO: string;
  @Input() preferredCountriesISOList: string[];
  @Input() presentSearchBarCountries: boolean;
  @Input() selectedCountryByPhoneCode: string;
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
}
