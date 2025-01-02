import { Request } from 'express';
import { UpgradeLogger } from '../lib/logger/UpgradeLogger';
import { RequestedExperimentUser } from 'src/api/controllers/validators/ExperimentUserValidator';
import { User } from 'src/api/models/User';

export enum ASSIGNMENT_TYPE {
  MANUAL = 'manual',
  ALGORITHMIC = 'algorithmic',
}

export enum SORT_AS {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC',
}

export interface PaginationResponse {
  total: number;
  skip: number;
  take: number;
}

export interface AppRequest extends Request {
  user: User;
  logger: UpgradeLogger;
}

export interface ClientAppRequest extends Request {
  userDoc: RequestedExperimentUser;
  logger: UpgradeLogger;
}
