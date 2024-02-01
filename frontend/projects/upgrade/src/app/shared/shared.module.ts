import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatTableModule } from '@angular/material/table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { DevToolsModule } from '../../dev-tools/dev-tools.module';

import { SharedIconsComponent } from './components/shared-icons/shared-icons.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ExperimentStatePipe } from './pipes/experiment-state.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { ScrollDirective } from './directives/scroll.directive';
import { OperationPipe } from './pipes/operation.pipe';
import { SegmentStatusPipe } from './pipes/segment-status.pipe';
import { QueryResultComponent } from './components/query-result/query-result.component';
import { DeleteComponent } from './components/delete/delete.component';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatStepperModule,
    MatRadioModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatTreeModule,
    environment.production ? [] : DevToolsModule,
  ],
  declarations: [
    SharedIconsComponent,
    TruncatePipe,
    ExperimentStatePipe,
    ScrollDirective,
    FormatDatePipe,
    OperationPipe,
    QueryResultComponent,
    DeleteComponent,
    SegmentStatusPipe,
    MatConfirmDialogComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatStepperModule,
    MatRadioModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatTreeModule,
    SharedIconsComponent,
    TruncatePipe,
    ExperimentStatePipe,
    FormatDatePipe,
    ScrollDirective,
    OperationPipe,
    QueryResultComponent,
    DeleteComponent,
    SegmentStatusPipe,
    MatConfirmDialogComponent,
    environment.production ? [] : DevToolsModule,
  ],
})
export class SharedModule {}
