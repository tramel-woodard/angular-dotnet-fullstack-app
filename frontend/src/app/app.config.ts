import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { 
  ApplicationConfig, 
  importProvidersFrom, 
  provideBrowserGlobalErrorListeners, 
  provideZoneChangeDetection
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { productsReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    // @NgRx
    provideStore({ products: productsReducer }),
    provideEffects([ProductEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    provideAnimations()
  ]
};
