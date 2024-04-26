# SkTelInput

SK Telephone Input (sk-tel-input) is a JavaScript plugin for entering and validating international telephone numbers. It takes a regular input field, adds a searchable country dropdown, displays a relevant placeholder number, formats the number as you type, and provides comprehensive validation methods. Furthermore, the styling is super easy as this plugin supports various inputs and as a result with the use
of inputs you can make the telephone input as per your requirements.

If you find the plugin helpful, please consider [Supporting the project](https://github.com/sponsors/savkost).

<img src="https://github.com/savkost/sk-tel-input/blob/main/screenshots/sk-tel-input-1.jpg" alt="Screenshot" width="238px" style="max-width: 100%" />

## Table of Contents

- [Features](#features)
- [Browser Compatibility](#browser-compatibility)
- [Getting Started](#getting-started)
- [Internal Interfaces](#internal-interfaces)
- [Initialisation Options](#initialisation-options)
- [Further Help, Links, LinkedIn](#links)

## Features

- Navigate the country dropdown by typing a country's name, or using up/down keys
- Set preferred countries as a list
- Set initial selected country
- Optionally only allow numeric characters and cap the number at the maximum valid length
- The user types their national number and the plugin gives you the full standardised international number
- Number validation, including specific error types
- High-resolution flag images
- Typescript type definitions included
- Easily customise styles by providing component inputs.
- Translations for country names (etc) provided in many different languages
- Lots of initialisation options for customisation, as well as public methods/events for interaction

## Browser Compatibility

| Chrome | Firefox | Safari | Edge |

| :----: | :-------: | :----: | :--: |

| ✓ | ✓ | ✓ | ✓ |

## Getting Started

1. Install with npm: `npm i sk-tel-input`

2. Declare the module at the imports array in app.module or any other module of your project. Example in a page module:

```ts
import { SKTelInputModule } from "sk-tel-input";
...
...
...
imports: [...SKTelInputModule],
```

3. Use the sk-tel-input inside a page or any other component as follows:

```ts
<sk-tel-input
  [totalBackgroundHexColor]="'#FFF'" [selectorBackgroundHexColor]="'#F1F7FE'"
  [inputBackgroundHexColor]="'#FFF'" [borderHexColor]="'#F1F7FE'"
  [arrowIconHexColor]="'#7904FF'" [checkedCountryIconHexColor]="'#7904FF'"
  [dividerPreferredCountriesColor]="'#F1F7FE'" [dividerSearchInputCountriesColor]="'#F1F7FE'"
  [inputContents]="getFormControlValue('phone')"
  [placeholderInput]="'placeholder.text' | translate"
  [textInputHexColor]="'#212121'" [caseCodeSelectorTriggerID]="'register_page_mob_phone'"
  [initialSelectedCountryISO]="'gr'" [selectedCountryByPhoneCode]="getFormControlValue('prefix')"
  [preferredCountriesISOList]="['gr']"
  [placeholderSearchCountriesInput]="'search.placeholder' | translate"
  [presentSearchBarCountries]="true"
  (emitInputContentEvent)="handleSkTelInputContents($event)">
</sk-tel-input>
```

4. In the corresponding .ts component or page file, handle the selected country as follows

```ts
// This method returns the value of a selected control of the form
getFormControlValue(givenControlTag: string): any {
  return this.testForm.get(givenControlTag).value;
}

// This method is handling the output of the sk tel input
handleSkTelInputContents(skTelOutput: SKTelInputOutput){
  this.helper.consoleHandler('SK Tel Input Output: ', skTelOutput);

  // Proper setup the content and the form fields
  this.testForm.get('prefix').setValue(`+${skTelOutput.selectedCountryCode.dialCode}`);
  this.testForm.get('phone').setValue(`${skTelOutput.telInputContents}`);
}
```

## Internal Interfaces

The sk-tel-input uses two interfaces internally in order to handle all the data in a delicate and respectful manner. These interfaces are:

1. SKTelInputOutput Interface

```ts
// INTERFACE FOR THE SK TEL INPUT OUTPUT

import { CountryCodeSelectOption } from "./country-select-option";

// 1. selectedCountryCode: All the data of the selected country code option.
// 2. telInputContents: The input contents of the sk tel input
export interface SKTelInputOutput {
  selectedCountryCode: CountryCodeSelectOption;
  telInputContents: string;
}
```

2. CountryCodeSelectOption interface

```ts
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
```

## Initialisation Options

When you initialise the sk-tel-input component you can provide any initialisation options you want, which are detailed below. Note: any options that take country codes should be [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) codes.

**totalBackgroundHexColor**

Type: `String` Default: `'#FFF'`

The background of the total sk-tel-input component. The default color is '#FFF' but you can change it at any time per your requirements.

**inputBackgroundHexColor**

Type: `String` Default: `'#FFF'`

The background of the ion-input for the phone number of the sk-tel-input. The default color is '#FFF' but you can change it at any time per your requirements.

**selectorBackgroundHexColor**

Type: `String` Default: `'#F1F7FE'`

The background of the entire country selector of the sk-tel-input. The default color is '#F1F7FE' but you can change it at any time per your requirements.

**borderHexColor**

Type: `String` Default: `'#F1F7FE'`

The border color of the the entire sk-tel-input component. The border is 2px solid and the selected color. The default color is '#F1F7FE' but you can change it at any time per your requirements.

**arrowIconHexColor**

Type: `String` Default: `'#7904FF'`

The color of the up-down arrow icon of the country code selector. The default color of the icon is '#7904FF' but you can change it at any time per your requirements.

**checkedCountryIconHexColor**

Type: `String` Default: `'#7904FF'`

The color of selected country check icon of the country code selector. The default color of the icon is '#7904FF' but you can change it at any time per your requirements.

**dividerPreferredCountriesColor**

Type: `String` Default: `'#F1F7FE'`

The color of divider line between the preferred countries list and the entire countries list. The default color of the icon is '#F1F7FE' but you can change it at any time per your requirements.

**dividerSearchInputCountriesColor**

Type: `String` Default: `'#F1F7FE'`

The color of divider line between the preferred countries list and the search bar. The default color of the icon is '#F1F7FE' but you can change it at any time per your requirements.

**inputContents**

Type: `String` Default: `''`

Any initial contents for the input of the sk-tel-input.

**readOnlyInput**

Type: `Boolean` Default: `false`

A boolean input that indicates if the ion-input is in read-only mode. If true, then the value of the input cannot be changed.

**placeholderInput**

Type: `String` Default: `''`

The placeholder of the phone ion-input.

**textInputHexColor**

Type: `String` Default: `'#212121'`

The color of the writing text in the input. The default color of the icon is '#212121' but you can change it at any time per your requirements.

**caseCodeSelectorTriggerID**

Type: `String` Default: `Random Text ID`

The id for the internal popover of the sk-tel-input. This value is required. Although, if not provided then the component will auto
generate a random id in order for the popover to work properly.

**placeholderSearchCountriesInput**

Type: `String` Default: `''`

The placeholder of the ion-input of the search bar for the countries list.

**caretColorInput**

Type: `String` Default: `'#212121'`

The color of caret of the ion-input. The default color of the icon is '#212121' but you can change it at any time per your requirements.

**totalSkTelInputBorderRadius**

Type: `Number` Default: `12`

The number of border-radius px of the entire sk-tel-input. This means that any number value will be placed in all corners of the component equally. The default border-radius is 12px but you can change it at any time per your requirements.

**initialSelectedCountryISO**

Type: `String` Default: `'gr'`

The initial selected country for the sk-tel-input. If not provided, then Greece ('gr') is automatically selected.

**preferredCountriesISOList**

Type: `Array[string]` Default: `Empty`

An array in order to provide all the preferred countries by iso code at the top of the popover component. If not provided then, no preferred languages are set on the top of the popover.

**presentSearchBarCountries**

Type: `Boolean` Default: `true`

A boolean input that indicates if the search bar for the countries list is presented. By default this is set to true but you can change it any given time.

**presentSearchBarCountries**

Type: `Boolean` Default: `true`

A boolean input that indicates if the search bar for the countries list is presented. By default this is set to true but you can change it any given time.

**selectedCountryByPhoneCode**

Type: `String` Default: `'+30'`

A string phone code that sets the initial selected country. This is optional. If not provided then the initialSelectedCountryISO will be set initially.

**patternMobile**

Type: `String` Default: `''`

A Regex pattern to apply to the phone input contents. This is optional. If it is provided then the input contents are tested against the
provided pattern and as a result the input is highlighted with a red border in case of not following the pattern. The color of the error border is the provided at borderWrongPatternHexColor input.

**borderWrongPatternHexColor**

Type: `String` Default: `'#932222'`

The color of the border error at ion-input in case of provided a pattern. The default color of the error border color is '#932222' but you can change it at any time per your requirements.

## Further Help, Links, LinkedIn

To get more help on the sk-tel-input, feel free to send me any questions at: [Savvas Kostoudas](mailto:savkostoudas@gmail.com)

Let's connect on LinkedIn: [LinkedIn](https://www.linkedin.com/in/savvas-kostoudas-6897491b1/)

If you find the plugin helpful, please consider [Supporting the project](https://github.com/sponsors/savkost).
