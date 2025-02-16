import app from '../../utils/expressApp';
import request from 'supertest';
import { configureLogger } from '../../utils/logger';
import { useContainer as routingUseContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { v4 as uuid } from 'uuid';
import ExperimentServiceMock from './mocks/ExperimentServiceMock';
import { ExperimentService } from '../../../src/api/services/ExperimentService';
import { useContainer as classValidatorUseContainer } from 'class-validator';
import { ExperimentAssignmentService } from '../../../src/api/services/ExperimentAssignmentService';
import ExperimentAssignmentServiceMock from './mocks/ExperimentAssignmentServiceMock';

describe('Experiment Controller Testing', () => {
  beforeAll(() => {
    configureLogger();
    routingUseContainer(Container);
    classValidatorUseContainer(Container);

    // set mock container
    Container.set(ExperimentService, new ExperimentServiceMock());
    Container.set(ExperimentAssignmentService, new ExperimentAssignmentServiceMock());
  });

  afterAll(() => {
    Container.reset();
  });

  const experimentData = {
    id: uuid(),
    name: 'string',
    description: 'string',
    context: ['home'],
    state: 'inactive',
    startOn: '2021-08-11T05:41:51.655Z',
    consistencyRule: 'individual',
    assignmentUnit: 'individual',
    postExperimentRule: 'continue',
    assignmentAlgorithm: 'random',
    enrollmentCompleteCondition: {
      userCount: 0,
      groupCount: 0,
    },
    endOn: '2021-08-11T05:41:51.655Z',
    revertTo: 'string',
    tags: ['string'],
    group: 'string',
    filterMode: 'includeAll',
    type: 'Simple',
    conditions: [
      {
        id: 'string',
        name: 'string',
        conditionCode: 'string',
        assignmentWeight: 0,
        description: 'string',
        order: 0,
      },
    ],
    partitions: [
      {
        site: 'string',
        target: 'string',
        id: 'string',
        description: 'string',
        excludeIfReached: false,
        order: 0,
      },
    ],
    experimentSegmentInclusion: {
      segment: {
        individualForSegment: [],
        groupForSegment: [],
        subSegments: [],
        type: 'private',
      },
    },
    experimentSegmentExclusion: {
      segment: {
        individualForSegment: [],
        groupForSegment: [],
        subSegments: [],
        type: 'private',
      },
    },
  };

  //for future use where user will be mocked for all testcases

  // const mockUser: User = {
  //   email: 'test@user.com',
  //   firstName: 'test',
  //   lastName: 'user',
  //   role: UserRole.READER,
  //   versionNumber: 5,
  //   imageUrl: '',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // };

  test('Get request for /api/experiments', () => {
    return request(app).get('/api/experiments').expect('Content-Type', /json/).expect(200);
  });

  test('Post request for /api/experiments', () => {
    return request(app).post('/api/experiments').send(experimentData).expect('Content-Type', /json/).expect(200);
  });

  test('Get request for /api/experiments/names', () => {
    return request(app).get('/api/experiments/names').expect('Content-Type', /json/).expect(200);
  });

  test('Get request for /api/experiments/contextMetaData', () => {
    return request(app).get('/api/experiments/contextMetaData').expect('Content-Type', /json/).expect(200);
  });

  test('Post request for /api/experiments/paginated', () => {
    return request(app)
      .post('/api/experiments/paginated')
      .send({
        skip: 0,
        take: 20,
        sortParams: { key: 'name', sortAs: 'ASC' },
      })
      .set('Accept', 'application/json')
      .expect(200);
  });

  test('Get request for /api/experiments/partitions', () => {
    return request(app).get('/api/experiments/partitions').expect('Content-Type', /json/).expect(200);
  });

  test('Get request for /api/experiments/single/:id', () => {
    return request(app).get(`/api/experiments/single/${uuid()}`).expect('Content-Type', /json/).expect(200);
  });

  const expIdNotTypeUUID = 'abc';
  test('Get request for /api/experiments/single/:id with no uuid', () => {
    return request(app).get(`/api/experiments/single/${expIdNotTypeUUID}`).expect(500);
  });

  test('Get request for /api/experiments/conditions/:id', () => {
    return request(app).get(`/api/experiments/conditions/${uuid()}`).expect('Content-Type', /json/).expect(200);
  });

  test('Get request for /api/experiments/conditions/:id with no uuid', () => {
    return request(app).get(`/api/experiments/conditions/${expIdNotTypeUUID}`).expect(500);
  });

  test('Post request for /api/experiments/batch', () => {
    return request(app)
      .post('/api/experiments/batch')
      .send([experimentData])
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('Delete request for /api/experiments/:id', () => {
    return request(app).delete(`/api/experiments/${uuid()}`).expect('Content-Type', /json/).expect(200);
  });

  test('Delete request for /api/experiments/:id with no uuid', () => {
    return request(app).delete(`/api/experiments/${expIdNotTypeUUID}`).expect(500);
  });

  test('Put request for /api/experiments/:id', () => {
    return request(app)
      .put(`/api/experiments/${experimentData.id}`)
      .send(experimentData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('Put request for /api/experiments/:id', () => {
    return request(app).put(`/api/experiments/${expIdNotTypeUUID}`).expect(500);
  });

  test('Post request for /api/experiments/state', () => {
    return request(app)
      .post('/api/experiments/state')
      .send({ experimentId: experimentData.id, state: 'enrolling' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('Post request for /api/experiments/import', () => {
    return request(app)
      .post('/api/experiments/import')
      .send([experimentData])
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  test('Get request for /api/experiments/export', () => {
    return request(app)
      .get('/api/experiments/export')
      .query({
        ids: [uuid()],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
