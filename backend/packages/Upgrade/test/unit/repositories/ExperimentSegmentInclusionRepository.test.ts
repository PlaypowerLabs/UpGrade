import { DataSource } from 'typeorm';
import { ExperimentSegmentInclusionRepository } from '../../../src/api/repositories/ExperimentSegmentInclusionRepository';
import { UpgradeLogger } from '../../../src/lib/logger/UpgradeLogger';
import { Segment } from '../../../src/api/models/Segment';
import { Container } from '../../../src/typeorm-typedi-extensions';
import { initializeMocks } from '../mockdata/mockRepo';

let mock;
let manager;
let dataSource: DataSource;
let repo: ExperimentSegmentInclusionRepository;
const err = new Error('test error');
const logger = new UpgradeLogger();

const segment = new Segment();
segment.id = 'id1';

const result = {
  identifiers: [{ id: segment.id }],
  generatedMaps: [segment],
  raw: [segment],
};

beforeAll(() => {
  dataSource = new DataSource({
    type: 'postgres',
    database: 'postgres',
    entities: [ExperimentSegmentInclusionRepository],
    synchronize: true,
  });
  Container.setDataSource('default', dataSource);
});

beforeEach(() => {
  repo = Container.getCustomRepository(ExperimentSegmentInclusionRepository);
  const commonMockData = initializeMocks(result);
  repo.createQueryBuilder = commonMockData.createQueryBuilder;
  mock = commonMockData.mocks;

  manager = {
    createQueryBuilder: repo.createQueryBuilder,
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('ExperimentSegmentInclusionRepository Testing', () => {
  it('should insert a segment inclusion', async () => {
    const res = await repo.insertData(segment, logger, manager);

    expect(manager.createQueryBuilder).toHaveBeenCalledTimes(1);

    expect(mock.insert).toHaveBeenCalledTimes(1);
    expect(mock.into).toHaveBeenCalledTimes(1);
    expect(mock.values).toHaveBeenCalledTimes(1);
    expect(mock.values).toHaveBeenCalledWith(segment);
    expect(mock.orIgnore).toHaveBeenCalledTimes(1);
    expect(mock.returning).toHaveBeenCalledTimes(1);
    expect(mock.returning).toHaveBeenCalledWith('*');
    expect(mock.execute).toHaveBeenCalledTimes(1);

    expect(res).toEqual([segment]);
  });

  it('should throw an error when insert fails', async () => {
    mock.execute.mockRejectedValue(err);

    expect(async () => {
      await repo.insertData(segment, logger, manager);
    }).rejects.toThrow(err);

    expect(manager.createQueryBuilder).toHaveBeenCalledTimes(1);

    expect(mock.insert).toHaveBeenCalledTimes(1);
    expect(mock.into).toHaveBeenCalledTimes(1);
    expect(mock.values).toHaveBeenCalledTimes(1);
    expect(mock.values).toHaveBeenCalledWith(segment);
    expect(mock.orIgnore).toHaveBeenCalledTimes(1);
    expect(mock.returning).toHaveBeenCalledTimes(1);
    expect(mock.returning).toHaveBeenCalledWith('*');
    expect(mock.execute).toHaveBeenCalledTimes(1);
  });

  it('should delete a segment inclusion', async () => {
    const res = await repo.deleteData(segment.id, 'exp1', logger);

    expect(repo.createQueryBuilder).toHaveBeenCalledTimes(1);

    expect(mock.delete).toHaveBeenCalledTimes(1);
    expect(mock.from).toHaveBeenCalledTimes(1);
    expect(mock.where).toHaveBeenCalledTimes(1);
    expect(mock.returning).toHaveBeenCalledTimes(1);
    expect(mock.returning).toHaveBeenCalledWith('*');
    expect(mock.execute).toHaveBeenCalledTimes(1);

    expect(res).toEqual([segment]);
  });

  it('should throw an error when delete fails', async () => {
    mock.execute.mockRejectedValue(err);

    expect(async () => {
      await repo.deleteData(segment.id, 'exp1', logger);
    }).rejects.toThrow(err);

    expect(repo.createQueryBuilder).toHaveBeenCalledTimes(1);

    expect(mock.delete).toHaveBeenCalledTimes(1);
    expect(mock.from).toHaveBeenCalledTimes(1);
    expect(mock.where).toHaveBeenCalledTimes(1);
    expect(mock.returning).toHaveBeenCalledTimes(1);
    expect(mock.returning).toHaveBeenCalledWith('*');
    expect(mock.execute).toHaveBeenCalledTimes(1);
  });

  it('should get a segment inclusion', async () => {
    mock.getMany.mockResolvedValue(result.raw);
    const res = await repo.getExperimentSegmentInclusionData();

    expect(repo.createQueryBuilder).toHaveBeenCalledTimes(1);

    expect(mock.leftJoin).toHaveBeenCalledTimes(2);
    expect(mock.leftJoinAndSelect).toHaveBeenCalledTimes(1);
    expect(mock.addSelect).toHaveBeenCalledTimes(4);
    expect(mock.getMany).toHaveBeenCalledTimes(1);

    expect(res).toEqual([segment]);
  });

  it('should throw an error when get segment inclusion fails', async () => {
    mock.getMany.mockRejectedValue(err);

    expect(async () => {
      await repo.getExperimentSegmentInclusionData();
    }).rejects.toThrow(err);

    expect(repo.createQueryBuilder).toHaveBeenCalledTimes(1);

    expect(mock.leftJoin).toHaveBeenCalledTimes(2);
    expect(mock.leftJoinAndSelect).toHaveBeenCalledTimes(1);
    expect(mock.addSelect).toHaveBeenCalledTimes(4);
    expect(mock.getMany).toHaveBeenCalledTimes(1);
  });
});
