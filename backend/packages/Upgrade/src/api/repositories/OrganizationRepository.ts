import { Repository } from 'typeorm';
import { EntityRepository } from '../../typeorm-typedi-extensions';
import { Organization } from '../models/Organization';
import repositoryError from './utils/repositoryError';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
  public async insertOrganization(organization: Partial<Organization>): Promise<Organization> {
    const result = await this.createQueryBuilder()
      .insert()
      .into(Organization)
      .values(organization)
      .returning('*')
      .execute()
      .catch((errorMsg: any) => {
        const errorMsgString = repositoryError(
          'OrganizationRepository',
          'insertOrganization',
          { organization },
          errorMsg
        );
        throw errorMsgString;
      });

    return result.raw[0];
  }

  public async getOrganizationById(id: string): Promise<Organization> {
    return this.createQueryBuilder('organization')
      .where('id=:id', { id })
      .getOne()
      .catch((errorMsg: any) => {
        const errorMsgString = repositoryError('OrganizationRepository', 'getOrganizationById', { id }, errorMsg);
        throw errorMsgString;
      });
  }
}
