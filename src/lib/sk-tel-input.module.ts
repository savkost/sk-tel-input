import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SkTelInputComponent } from './sk-tel-input.component';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SkTelInputComponent,
    CountrySelectorComponent
  ],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  exports: [
    SkTelInputComponent,
    CountrySelectorComponent
  ]
})
export class SKTelInputModule {}
