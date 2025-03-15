type AppError = 'service unavailable';
interface IAppConfig {
  minCheck: number;
  showcaseItemsCount: number;
  errorProbabilities: Record<AppError, number>;
  retryCounts: number;
}

export const AppConfig: IAppConfig = {
  minCheck: 100000,
  retryCounts: 3,
  showcaseItemsCount: 1000,
  errorProbabilities: {
    'service unavailable': 0.9,
  },
};
