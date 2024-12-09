import { BaseModel } from './base/BaseModel';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { LOG_TYPE } from 'upgrade_types';
import { User } from './User';
import { FeatureFlag } from './FeatureFlag';
import { Experiment } from './Experiment';

@Entity()
export class ExperimentAuditLog extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: LOG_TYPE,
  })
  public type: LOG_TYPE;

  @ManyToOne(() => Experiment, (experiment) => experiment.auditLogs, { onDelete: 'CASCADE' })
  public experiment: Experiment;

  @ManyToOne(() => FeatureFlag, (featureFlag) => featureFlag.auditLogs, { onDelete: 'CASCADE' })
  public featureFlag: FeatureFlag;

  @ManyToOne(() => User, (user) => user.auditLogs, { onDelete: 'CASCADE' })
  public user: User;

  @Column({ type: 'json' })
  public data: object;
}
