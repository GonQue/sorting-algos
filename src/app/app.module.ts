import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArrayComponent } from './array/array.component';
import { BarComponent } from './bar/bar.component';
import { BarDirective } from './bar-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    ArrayComponent,
    BarComponent,
    BarDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
