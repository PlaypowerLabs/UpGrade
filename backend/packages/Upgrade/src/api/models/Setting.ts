import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { BaseModel } from './base/BaseModel';
import { Organization } from './Organization';

@Entity()
export class Setting extends BaseModel {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public toCheckAuth: boolean;

  @Column()
  public toFilterMetric: boolean;

  @OneToOne(() => Organization, (organization) => organization.setting)
  public organization: Organization;
}
