import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserPermission } from '../../../../../core/auth/store/auth.models';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/auth/auth.service';
import { filter } from 'rxjs/operators';
import { SegmentsService } from '../../../../../core/segments/segments.service';
import { NewSegmentComponent } from '../../components/modal/new-segment/new-segment.component';
import * as clonedeep from 'lodash.clonedeep';
import { DuplicateSegmentComponent } from '../../components/modal/duplicate-segment/duplicate-segment.component';
import { MemberTypes, Segment } from '../../../../../core/segments/store/segments.model';
import { SEGMENT_TYPE } from 'upgrade_types';
import { DeleteComponent } from '../../../../../shared/components/delete/delete.component';
import { SegmentExperimentListComponent } from '../../components/modal/segment-experiment-list/segment-experiment-list.component';
import { SEGMENT_STATUS } from 'upgrade_types';
import { SegmentStatusPipeType } from '../../../../../shared/pipes/segment-status.pipe';
import { ExportSegmentComponent } from '../../components/modal/export-segment/export-segment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SEGMENT_SEARCH_KEY } from '../../../../../../../../../../types/src/Experiment/enums';
@Component({
  selector: 'view-segment',
  templateUrl: './view-segment.component.html',
  styleUrls: ['./view-segment.component.scss'],
})
export class ViewSegmentComponent implements OnInit, OnDestroy {
  permissions: UserPermission;
  segmentIdSub: Subscription;
  permissionsSub: Subscription;
  segment: Segment;
  segmentSub: Subscription;
  members: { type: string; id: string }[] = [];
  segmentUsed: boolean;

  displayedVariationColumns: string[] = ['value', 'name'];

  constructor(
    private segmentsService: SegmentsService,
    private dialog: MatDialog,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  get SegmentStatus() {
    return SEGMENT_STATUS;
  }

  get SegmentType() {
    return SEGMENT_TYPE;
  }

  get SegmentStatusPipeTypes() {
    return SegmentStatusPipeType;
  }

  ngOnInit() {
    this.permissionsSub = this.authService.userPermissions$.subscribe((permission) => {
      this.permissions = permission;
    });

    this.segmentIdSub = this.activatedRoute.paramMap.subscribe((params) => {
      const segmentIdFromParams = params.get('segmentId');
      this.segmentsService.fetchSegmentById(segmentIdFromParams);
    });

    this.segmentSub = this.segmentsService.selectedSegment$
      .pipe(filter((segment) => !!segment))
      .subscribe((segment) => {
        this.segment = { ...segment, status: segment.status || SEGMENT_STATUS.UNUSED };

        this.members = [];
        this.segment.individualForSegment?.forEach((user) => {
          this.members.push({ type: MemberTypes.INDIVIDUAL, id: user.userId });
        });
        this.segment.groupForSegment?.forEach((group) => {
          this.members.push({ type: group.type, id: group.groupId });
        });
        this.segment.subSegments?.forEach((subSegment) => {
          this.members.push({ type: MemberTypes.SEGMENT, id: subSegment.name });
        });
      });

    this.segmentUsed = this.segment?.status === SEGMENT_STATUS.USED;
  }

  openEditSegmentDialog() {
    this.dialog.open(NewSegmentComponent as any, {
      panelClass: 'new-segment-modal',
      data: { segmentInfo: clonedeep(this.segment) },
    });
  }

  searchSegment(type: SEGMENT_SEARCH_KEY, value: string) {
    this.segmentsService.setSearchKey(type);
    this.segmentsService.setSearchString(value);
    this.router.navigate(['/segments']);
  }

  deleteSegment() {
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'delete-modal',
    });

    dialogRef.afterClosed().subscribe((isDeleteButtonClicked) => {
      if (isDeleteButtonClicked) {
        this.segmentsService.deleteSegment(this.segment.id);
        // Add code of further actions after deleting experiment
      }
    });
  }

  duplicateSegmentDialog() {
    const dialogRef = this.dialog.open(DuplicateSegmentComponent, {
      panelClass: 'duplicate-segment-modal',
      data: { segment: this.segment },
    });
    dialogRef.afterClosed().subscribe(() => {
      // Add code of further actions after deleting feature segment
    });
  }

  openExperimentSegmentList() {
    const dialogRef = this.dialog.open(SegmentExperimentListComponent, {
      panelClass: 'segment-experiment-list-modal',
      data: { segment: this.segment },
    });
    dialogRef.afterClosed().subscribe(() => {
      // Add code of further actions after deleting feature segment
    });
  }

  exportSegment() {
    this.dialog.open(ExportSegmentComponent, {
      panelClass: 'export-modal',
      data: { segment: [clonedeep(this.segment)] },
    });
  }

  ngOnDestroy() {
    this.segmentSub.unsubscribe();
    this.permissionsSub.unsubscribe();
    this.segmentIdSub.unsubscribe();
  }

  get SegmentSearchKey() {
    return SEGMENT_SEARCH_KEY;
  }
}
