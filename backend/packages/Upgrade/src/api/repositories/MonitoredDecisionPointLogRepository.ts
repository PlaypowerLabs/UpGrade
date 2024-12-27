import { MonitoredDecisionPointLog } from '../models/MonitoredDecisionPointLog';
import { Repository } from 'typeorm';
import { EntityRepository } from '../../typeorm-typedi-extensions';
import repositoryError from './utils/repositoryError';
import { UpgradeLogger } from 'src/lib/logger/UpgradeLogger';

@EntityRepository(MonitoredDecisionPointLog)
export class MonitoredDecisionPointLogRepository extends Repository<MonitoredDecisionPointLog> {
  public async getAllMonitoredDecisionPointLog(
    userId: string,
    site: string[],
    target: string[],
    organizationId: string,
    logger: UpgradeLogger
  ): Promise<any> {
    const result = await this.createQueryBuilder('mdpLog')
      .select(['mdp.userId as userId', 'mdp.site as site', 'mdp.target as target'])
      .addSelect('COUNT(*) as count')
      .leftJoin('mdpLog.monitoredDecisionPoint', 'mdp')
      .where('mdp.userId = :userId', { userId })
      .andWhere('mdp.site IN (:...site)', { site })
      .andWhere('mdp.target IN (:...target)', { target })
      .andWhere('mdp.organizationId = :organizationId', { organizationId })
      .groupBy('mdp.userId , mdp.site , mdp.target, mdp.id')
      .getRawMany()
      .catch((errorMsg: any) => {
        const errorMsgString = repositoryError(
          'monitoredDecisionPointLogRepository',
          'getAllmonitoredDecisionPointLog',
          {},
          errorMsg
        );
        logger.error(errorMsg);
        throw errorMsgString;
      });
    return result;
  }
}
