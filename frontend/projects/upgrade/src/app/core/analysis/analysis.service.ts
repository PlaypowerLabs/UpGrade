import { Inject, Injectable } from '@angular/core';
import { AppState } from '../core.module';
import { Store, select } from '@ngrx/store';
import {
  selectMetrics,
  selectIsMetricsLoading,
  selectQueryResult,
  selectIsQueryExecuting,
  selectQueryResultById,
} from './store/analysis.selectors';
import * as AnalysisActions from './store/analysis.actions';
import { UpsertMetrics } from './store/analysis.models';
import { selectExperimentQueries } from '../experiments/store/experiments.selectors';
import { ENV, Environment } from '../../../environments/environment-types';

@Injectable()
export class AnalysisService {
  constructor(private store$: Store<AppState>, @Inject(ENV) private environment: Environment) {}

  isMetricsLoading$ = this.store$.pipe(select(selectIsMetricsLoading));
  isQueryExecuting$ = this.store$.pipe(select(selectIsQueryExecuting));
  allMetrics$ = this.store$.pipe(select(selectMetrics));
  queryResult$ = this.store$.pipe(select(selectQueryResult));
  queryResultById$ = (queryId) => this.store$.pipe(select(selectQueryResultById, { queryId }));

  setMetricsFilterValue(filterString: string) {
    this.store$.dispatch(AnalysisActions.actionSetMetricsFilterValue({ filterString }));
  }

  upsertMetrics(metrics: UpsertMetrics) {
    this.store$.dispatch(AnalysisActions.actionUpsertMetrics({ metrics }));
  }

  deleteMetric(key: string) {
    this.store$.dispatch(AnalysisActions.actionDeleteMetric({ key }));
  }

  executeQuery(queryIds: string[]) {
    if (this.environment.metricAnalyticsExperimentDisplayToggle) {
      this.store$.dispatch(AnalysisActions.actionExecuteQuery({ queryIds }));
    } else {
      console.warn(
        'executeQuery is currently disabled via metricAnalyticsExperimentDisplayToggle:',
        this.environment.metricAnalyticsExperimentDisplayToggle
      );
    }
  }

  experimentQueryResult$(experimentId: string) {
    return this.store$.pipe(select(selectExperimentQueries, { experimentId }));
  }

  setQueryResult(queryResult: any) {
    this.store$.dispatch(AnalysisActions.actionSetQueryResult({ queryResult }));
  }

  // Used to get path from root to leaf node
  findParents(node, searchForKey) {
    // If current node name matches the search name, return
    // empty array which is the beginning of our parent result
    if (node.id === searchForKey) {
      return [];
    }

    // Otherwise, if this node has a tree field/value, recursively
    // process the nodes in this tree array
    if (Array.isArray(node.children)) {
      for (const treeNode of node.children) {
        // Recursively process treeNode. If an array result is
        // returned, then add the treeNode.key to that result
        // and return recursively
        const childResult = this.findParents(treeNode, searchForKey);

        if (Array.isArray(childResult)) {
          return [treeNode.key].concat(childResult);
        }
      }
    }
  }
}
