import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ArrayComponent} from './components/array/array.component';
import {BarComponent} from './components/bar/bar.component';
import {BarDirective} from './components/bar/bar-host.directive';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {HomeComponent, WarningDialog} from './components/home/home.component';
import {ControllerComponent} from './components/controller/controller.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {SorterInfoComponent} from './components/sorter-info/sorter-info.component';

@NgModule({
  entryComponents: [WarningDialog],
  declarations: [
    AppComponent,
    ArrayComponent,
    BarComponent,
    BarDirective,
    HomeComponent,
    ControllerComponent,
    SorterInfoComponent,
    WarningDialog,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faGithub);
  }
}
