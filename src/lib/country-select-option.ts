// INTERFACE FOR THE COUNTRY SELECT OPTION

// 1. id: The id of the country code option.
// 2. dialCode: The dial code of the country code option.
// 3. iso2: The ISO code of the country code option.
// 4. name: The name of the country code option.
// 5. srcIcon: The path to the icon of the country code option.
// 6. isSelected: A boolean indicating whether the country code option is selected.
// 7. isPreferred: A boolean indicating whether the country code option is preferred in order to be presented on the top of the list.
export interface CountryCodeSelectOption {
  id: number;
  dialCode: string;
  iso2: string;
  name: string;
  srcIcon: string;
  isSelected: boolean;
  isPreferred: boolean;
}
