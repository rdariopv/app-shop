import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter} from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
//bootstrapApplication(AppComponent, appConfig)
 // .catch((err) => console.error(err));
