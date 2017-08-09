import { NgModule } from '@angular/core';
import { trueLoginRoutes } from './true-login.routing';
import { TrueLoginComponent } from './true-login.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(trueLoginRoutes),
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [TrueLoginComponent],
    exports: [TrueLoginComponent]
})

export class TrueLoginModule {}
