import { Service } from 'typedi';
import { InjectRepository } from '../../typeorm-typedi-extensions';
import { SettingRepository } from '../repositories/SettingRepository';
import { Setting } from '../models/Setting';
import { UpgradeLogger } from '../../lib/logger/UpgradeLogger';

@Service()
export class SettingService {
  constructor(@InjectRepository() private settingRepository: SettingRepository) {}

  public async setClientCheck(
    checkAuth: boolean | null,
    filterMetric: boolean | null,
    logger: UpgradeLogger
  ): Promise<Setting> {
    logger.info({ message: `Update project setting: checkAuth ${checkAuth}, filterMetric ${filterMetric}` });
    const [settingDoc] = await this.settingRepository.find();
    const newDoc = {
      ...settingDoc,
      toCheckAuth: checkAuth === undefined ? (settingDoc && settingDoc.toCheckAuth) || false : checkAuth,
      toFilterMetric: filterMetric === undefined ? (settingDoc && settingDoc.toFilterMetric) || false : filterMetric,
    };
    return this.settingRepository.save(newDoc);
  }

  public async getClientCheck(logger?: UpgradeLogger): Promise<Setting> {
    if (logger) {
      logger.info({ message: 'Get project setting' });
    }
    const setting = await this.settingRepository.find();
    if (setting.length === 0) {
      const defaultSetting = new Setting();
      defaultSetting.toCheckAuth = false;
      defaultSetting.toFilterMetric = false;
      return defaultSetting;
    }
    return setting[0];
  }
}
