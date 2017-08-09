import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { routesHome } from './home.routing';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesHome)
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})

export class HomeModule {}
