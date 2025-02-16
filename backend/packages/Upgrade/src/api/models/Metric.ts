import { BaseModel } from './base/BaseModel';
import { Entity, PrimaryColumn, ManyToMany, JoinTable, Column, OneToMany, ManyToOne } from 'typeorm';
import { Log } from './Log';
import { IMetricMetaData } from 'upgrade_types';
import { Query } from './Query';
import { Organization } from './Organization';

@Entity()
export class Metric extends BaseModel {
  @PrimaryColumn()
  public key: string;

  @Column({
    type: 'enum',
    enum: IMetricMetaData,
    default: IMetricMetaData.CONTINUOUS,
  })
  public type: IMetricMetaData;

  @Column({ type: 'simple-array', nullable: true })
  public allowedData: string[];

  @Column('text', { array: true, nullable: true })
  public context: string[];

  @ManyToMany(() => Log, (log) => log.metrics, {
    cascade: true,
  })
  @JoinTable({
    name: 'metric_log',
  })
  public logs: Log[];

  @OneToMany(() => Query, (query) => query.metric)
  public queries: Query[];

  @ManyToOne(() => Organization, (organization) => organization.metric)
  public organization: Organization;
}
