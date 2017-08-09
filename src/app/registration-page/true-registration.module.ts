import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TrueRegistrationComponent } from './true-registration.component';
import { routesTrueRegistration } from './true-registration.routing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesTrueRegistration),
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        TrueRegistrationComponent
    ],
    exports: [
        TrueRegistrationComponent
    ]
})

export class TrueRegistrationModule {}
