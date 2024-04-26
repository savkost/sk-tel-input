import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CountryCodeSelectOption } from '../country-select-option';
import { SkTelInputService } from '../sk-tel-input.service';
import { HttpClient } from '@angular/common/http';
import * as countriesData from './data.json';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
})
export class CountrySelectorComponent  implements OnInit {

  // INPUTS
  @Input() selectorBackgroundHexColor: string;
  @Input() arrowIconHexColor: string;
  @Input() checkedCountryIconHexColor: string;
  @Input() dividerPreferredCountriesColor: string;
  @Input() dividerSearchInputCountriesColor: string;
  @Input() defaultSelectedCountryISO: string;
  @Input() preferredCountriesISOList: string[];
  @Input() presentSearchBarCountries: boolean;
  @Input() caseCodeSelectorTriggerID: string;
  @Input() placeholderSearchCountriesInput: string;
  @Input() textInputHexColor: string;
  @Input() selectedCountryByPhoneCode: string;
  @Input() readOnlyInput: boolean;

  // OUTPUTS
  @Output() selectedCountryCodeEmitter: EventEmitter<CountryCodeSelectOption> = new EventEmitter();

  // Local Fields
  countriesList: CountryCodeSelectOption[] = [];
  initialCountriesList: CountryCodeSelectOption[] = [];
  preferredCountriesList: CountryCodeSelectOption[] = [];
  selectedCountryCode: CountryCodeSelectOption;
  isOpened = false;
  searchCountriesText = '';
  loadedAllData = false;

  constructor(public helper: SkTelInputService, private http: HttpClient) { }

  async ngOnInit() {

    // Console all the initial inputs
    this.helper.consoleHandler('---------------- COUNTRY CODE SELECTOR INPUTS ----------------');
    this.helper.consoleHandler(`Initial Selected Country ISO: ${this.defaultSelectedCountryISO}`);
    this.helper.consoleHandler('Preferred Countries List ISO List: ', this.preferredCountriesISOList);
    this.helper.consoleHandler(`Present Search Bar Countries: ${this.presentSearchBarCountries}`);
    this.helper.consoleHandler(`Set Selected Country by Phone Code: ${this.selectedCountryByPhoneCode}`);
    this.helper.consoleHandler('---------------- COUNTRY CODE SELECTOR INPUTS ----------------');

    // Check and set the read-only input
    if (!this.helper.checkUndefinedNull(this.readOnlyInput)){
      this.readOnlyInput = false;
    }

    // Check the divider colors in order to set some default values
    if (!this.helper.checkUndefinedNull(this.dividerPreferredCountriesColor)){
      this.dividerPreferredCountriesColor = '#F1F7FE';
    }

    if (!this.helper.checkUndefinedNull(this.dividerSearchInputCountriesColor)){
      this.dividerSearchInputCountriesColor = '#F1F7FE';
    }

    // Setup the countries List
    await this.setupCountriesCodes();
  }

  // This method setups the countries codes list
  async setupCountriesCodes(){

    // Reset the countries codes list
    this.countriesList = [];
    this.initialCountriesList = [];

    // Load the initial countries list from the countries_data.json file
    this.countriesList = [...countriesData.countries_data];
    this.initialCountriesList = [...this.countriesList];

    // Sort the countries list
    this.sortCountriesList();
  }

  // This method sorts the countries list
  async sortCountriesList(){
    return new Promise(() => {
      let countryNames = this.countriesList.map((country) => {
        return country.name;
      });

      // Sort the countries names
      countryNames = this.helper.mergeSort(countryNames);

      // Place the country at the right spot
      let sortedCountriesList: CountryCodeSelectOption[] = countryNames.map((country) => {
        return this.countriesList.find(el => el.name === country);
      });

      // Console the sorted countries list
      this.helper.consoleHandler('Sorted Countries List: ', sortedCountriesList);
      this.countriesList = [...sortedCountriesList];
      this.initialCountriesList = [...this.countriesList];
      this.loadedAllData = true;

      // Finally continue the initial setup
      this.continueInitialSetup();
    });
  }

  // This method continues the initial setup
  continueInitialSetup(){
    // Setup the preferred countries list
    if (this.helper.checkUndefinedNull(this.preferredCountriesISOList) && Array.isArray(this.preferredCountriesISOList) && this.preferredCountriesISOList.length > 0){
      let findCountry: CountryCodeSelectOption;
      for (const iso2Code of this.preferredCountriesISOList){
        findCountry = this.countriesList.find(el => el.iso2 === iso2Code);

        if (this.helper.checkUndefinedNull(findCountry)){
          this.preferredCountriesList.push(findCountry);
        }
      }

      this.helper.consoleHandler('Preferred Countries Found: ', this.preferredCountriesList);
    }

    // Check the initial selected country ISO
    if (this.helper.checkNecessaryCases(this.selectedCountryByPhoneCode)){

      // Search for the given country phone code
      const findCountryByPhoneCode = this.countriesList.find(el => `+${el.dialCode}` === this.selectedCountryByPhoneCode);

      // Check existence
      if (this.helper.checkUndefinedNull(findCountryByPhoneCode)){
        this.selectedCountryCode = findCountryByPhoneCode;
        this.selectedCountryCode.isSelected = true;
        this.helper.consoleHandler('Initial Selected Country Code: ', this.selectedCountryCode);

        // Check the initial selected country and emit back
        if (this.helper.checkUndefinedNull(this.selectedCountryCode)){
          this.countriesList.find(el => el.id === this.selectedCountryCode.id).isSelected = true;
          this.selectedCountryCodeEmitter.emit(this.selectedCountryCode);
        }

      } else {
        this.setDefaultCountry();
      }
    } else {
      this.setDefaultCountry();
    }
  }

  // This method sets the default selected country
  setDefaultCountry(){
    if (this.helper.checkNecessaryCases(this.defaultSelectedCountryISO)){
      this.selectedCountryCode = this.countriesList.find(el => el.iso2 === this.defaultSelectedCountryISO);
      this.selectedCountryCode.isSelected = true;
      this.helper.consoleHandler('Initial Selected Country Code: ', this.selectedCountryCode);
    } else {
      // Set the initial as Greece
      this.selectedCountryCode = {
        id: 0,
        dialCode: '30',
        iso2: 'gr',
        name: 'Greece (Ελλάδα)',
        srcIcon: 'assets/images/country-images/png/191-greece.png',
        isSelected: true,
        isPreferred: false
      };
    }

    // Check the initial selected country and emit back
    if (this.helper.checkUndefinedNull(this.selectedCountryCode)){
      this.countriesList.find(el => el.id === this.selectedCountryCode.id).isSelected = true;
      this.selectedCountryCodeEmitter.emit(this.selectedCountryCode);
    }
  }

  // This emthod emits the selected country code
  selectCountryCode(clickedCountryCode: CountryCodeSelectOption){

    // Console the selected country code
    this.helper.consoleHandler('Clicked Country Code: ', clickedCountryCode);

    // Update the previous selected country code as NOT selected if found
    if (this.helper.checkUndefinedNull(this.countriesList) && this.countriesList.length > 0 && this.helper.checkUndefinedNull(this.selectedCountryCode)){
      const findPreviousSelectedCountry = this.countriesList.find(el => el.id === this.selectedCountryCode.id);
      if (this.helper.checkUndefinedNull(findPreviousSelectedCountry)){
        this.countriesList.find(el => el.id === this.selectedCountryCode.id).isSelected = false;
      }
    }

    // Update the selected country code now
    setTimeout(() => {
      this.selectedCountryCode = clickedCountryCode;
      if (this.helper.checkUndefinedNull(this.countriesList) && this.countriesList.length > 0 && this.helper.checkUndefinedNull(this.selectedCountryCode)){
        const findSelectedCountry = this.countriesList.find(el => el.id === this.selectedCountryCode.id);
        if (this.helper.checkUndefinedNull(findSelectedCountry)){
          this.countriesList.find(el => el.id === this.selectedCountryCode.id).isSelected = true;
        }
      }
    }, 100);

    // Close the ion popover
    let openedPopover: any = document.getElementById(`popover_countries_${this.caseCodeSelectorTriggerID}`);
    openedPopover.dismiss();

    // Emit the selected country code
    this.selectedCountryCodeEmitter.emit(clickedCountryCode);
  }

  // This method searches locally the countries list
  searchLocallyCountries(){
    if (this.helper.checkNecessaryCases(this.searchCountriesText.trim())){

      // Search and filter the countries list
      const copyData = [...this.initialCountriesList];
      const resultSearchData = [];

      // Iterate through the copy countries list
      for (let country of copyData){

        let pushToResult = false;

        // 1. DIAL CODE
        if (this.helper.checkNecessaryCases(country.dialCode) && country.dialCode.toLowerCase().includes(this.searchCountriesText.toLowerCase())){
          pushToResult = true;
        }

        // 2. NAME
        if (this.helper.checkUndefinedNull(country.name) && this.helper.checkNecessaryCases(country.name) && country.name.toLowerCase().includes(this.searchCountriesText.toLowerCase()) && !pushToResult){
          pushToResult = true;
        }

        // PUSH TO RESULTS IF pushToResult = TRUE
        if (pushToResult){
          resultSearchData.push(country);
        }
      }

      // Finally setup the countries list array
      this.countriesList = [...resultSearchData];

    } else {
      // Reset the countries list to the initial
      this.countriesList = [...this.initialCountriesList];
    }
  }
}
