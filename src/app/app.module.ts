import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { ImageListComponent } from './image-list/image-list.component';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';

import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { LogOutComponent } from './account/log-out/log-out.component';
import { LogInComponent } from './account/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    AccountComponent,
    SearchComponent,
    LogOutComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService,
        {dataEncapsulation : false}
    ),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
