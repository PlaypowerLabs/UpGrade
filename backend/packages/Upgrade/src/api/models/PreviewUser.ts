import { Entity, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { BaseModel } from './base/BaseModel';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ExplicitIndividualAssignment } from './ExplicitIndividualAssignment';
import { Type } from 'class-transformer';
import { Organization } from './Organization';

@Entity()
export class PreviewUser extends BaseModel {
  @PrimaryColumn()
  @IsNotEmpty()
  public id: string;

  @OneToMany(() => ExplicitIndividualAssignment, (condition) => condition.previewUser)
  @ValidateNested()
  @Type(() => ExplicitIndividualAssignment)
  public assignments?: ExplicitIndividualAssignment[];

  @ManyToOne(() => Organization, (organization) => organization.previewUser)
  public organization: Organization;
}
