import { NgModule } from '@angular/core';
import { ConfigService } from './services/config.service';
import { ValidationPatternsService } from './services/validation-patterns.service';
import { HeaderComponent } from "./components/header/header";
import { FooterComponent } from "./components/footer/footer";

@NgModule({
    imports: [
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ],
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        ValidationPatternsService,
        ConfigService
    ],
})
export class SharedModule { }
