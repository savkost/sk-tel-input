// INTERFACE FOR THE SK TEL INPUT OUTPUT

import { CountryCodeSelectOption } from "./country-select-option";

// 1. selectedCountryCode: All the data of the selected country code option.
// 2. telInputContents: The input contents of the sk tel input
export interface SKTelInputOutput {
  selectedCountryCode: CountryCodeSelectOption;
  telInputContents: string;
}
