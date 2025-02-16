import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SegmentsService } from '../../../../../../core/segments/segments.service';
import { Segment } from '../../../../../../core/segments/store/segments.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-duplicate-segment',
  templateUrl: './duplicate-segment.component.html',
  styleUrls: ['./duplicate-segment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuplicateSegmentComponent {
  segmentName: string;
  segmentDescription: string;
  allSegments: Segment[];
  allSegmentsSub: Subscription;
  isSegmentNameValid = true;

  constructor(
    public dialogRef: MatDialogRef<DuplicateSegmentComponent>,
    private segmentsService: SegmentsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.allSegmentsSub = this.segmentsService.allSegments$.subscribe((allSegments) => {
      this.allSegments = allSegments;
    });

    this.segmentName = this.data.segment.name + ' 2';
    this.segmentDescription = '(Copy) ' + this.data.segment.description;
  }

  SegmentNameValidation(name: string, context: string) {
    let allSegmentNameContextArray = [];
    this.isSegmentNameValid = true;
    allSegmentNameContextArray = this.allSegments.map((segment) => segment.name.trim() + '_' + segment.context);
    const segmentNameContextString = name.trim() + '_' + context;
    if (allSegmentNameContextArray.includes(segmentNameContextString)) {
      this.isSegmentNameValid = false;
    }
  }

  onDuplicateClick(segmentName: string, segmentDescription: string) {
    this.SegmentNameValidation(segmentName, this.data.segment.context);
    if (this.isSegmentNameValid) {
      const duplicateSegmentData = {
        ...this.data.segment,
        name: segmentName.trim(),
        description: segmentDescription,
        id: null,
      };

      duplicateSegmentData.userIds = duplicateSegmentData.individualForSegment.map((individual) => individual.userId);
      duplicateSegmentData.subSegmentIds = duplicateSegmentData.subSegments.map((subSegment) => subSegment.id);
      duplicateSegmentData.groups = duplicateSegmentData.groupForSegment.map((group) => ({
        type: group.type,
        groupId: group.groupId,
      }));

      this.segmentsService.createNewSegment(duplicateSegmentData);
      this.onCancelClick();
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.allSegmentsSub.unsubscribe();
  }
}
