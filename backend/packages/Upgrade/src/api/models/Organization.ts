import { MonitoredDecisionPoint } from './MonitoredDecisionPoint';
import { Entity, PrimaryColumn, OneToMany, Column, OneToOne } from 'typeorm';
import { BaseModel } from './base/BaseModel';
import { IsNotEmpty } from 'class-validator';
import { User } from './User';
import { Experiment } from './Experiment';
import { FeatureFlag } from './FeatureFlag';
import { Segment } from './Segment';
import { StratificationFactor } from './StratificationFactor';
import { Metric } from './Metric';
import { PreviewUser } from './PreviewUser';
import { ExperimentUser } from './ExperimentUser';
import { Setting } from './Setting';

@Entity()
export class Organization extends BaseModel {
  @PrimaryColumn()
  @IsNotEmpty()
  public id: string;

  @IsNotEmpty()
  @Column()
  public name: string;

  @IsNotEmpty()
  @Column()
  public secretKey: string;

  @Column({
    nullable: true,
  })
  public description: string;

  @OneToMany(() => User, (user) => user.organization)
  public user: User[];

  @OneToMany(() => Experiment, (experiment) => experiment.organization)
  public experiment: Experiment[];

  @OneToMany(() => FeatureFlag, (featureFlag) => featureFlag.organization)
  public featureFlag: FeatureFlag[];

  @OneToMany(() => Segment, (segment) => segment.organization)
  public segment: Segment[];

  @OneToMany(() => StratificationFactor, (stratificationFactor) => stratificationFactor.organization)
  public stratificationFactor: StratificationFactor[];

  @OneToMany(() => Metric, (metric) => metric.organization)
  public metric: Metric[];

  @OneToMany(() => PreviewUser, (previewUser) => previewUser.organization)
  public previewUser: PreviewUser[];

  @OneToMany(() => ExperimentUser, (experimentUser) => experimentUser.organization)
  public experimentUser: ExperimentUser[];

  @OneToMany(() => MonitoredDecisionPoint, (monitoredDecisionPoint) => monitoredDecisionPoint.organization)
  public monitoredDecisionPoint: MonitoredDecisionPoint[];

  @OneToOne(() => Setting, (setting) => setting.organization)
  public setting: Setting;
}
