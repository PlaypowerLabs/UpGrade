import { Organization } from './../models/Organization';
import { Service } from 'typedi';
import { InjectRepository } from '../../typeorm-typedi-extensions';
import { OrganizationRepository } from '../repositories/OrganizationRepository';
import { UpgradeLogger } from 'src/lib/logger/UpgradeLogger';
import { v4 as uuid } from 'uuid';

@Service()
export class OrganizationService {
  constructor(@InjectRepository() private organizationRepository: OrganizationRepository) {}

  public async addOrganization(name: string, logger: UpgradeLogger): Promise<Organization> {
    const isOrganizationExists = await this.organizationRepository.find({ where: { name: name } });

    if (isOrganizationExists?.length > 0) {
      return isOrganizationExists[0];
    } else {
      const organization = new Organization();
      organization.id = uuid();
      organization.name = name;
      organization.secretKey = name;

      logger.info({ message: `Upsert a new organization => ${JSON.stringify(organization, undefined, 2)}` });

      const response = await this.organizationRepository.insertOrganization(organization);
      return response;
    }
  }

  public async getOrganizationById(id: string, logger: UpgradeLogger): Promise<Organization> {
    logger.info({ message: `Get organization by id => ${id}` });
    return this.organizationRepository.getOrganizationById(id);
  }
}
