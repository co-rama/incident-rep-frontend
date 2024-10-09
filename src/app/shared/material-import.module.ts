import { Component, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
})
export class MaterialImportModule{}
