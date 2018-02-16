import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsModalModule } from 'ng2-bs3-modal';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

// Modules
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

// Pages
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { TestingComponent } from './pages/testing/testing.component';

// Services
import { DictionaryService } from './services';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    DictionaryComponent,
    TestingComponent
  ],
  imports: [
    RoutingModule,
    SharedModule,
    NgxPaginationModule,
    BsModalModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    DictionaryService,
    StorageService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
