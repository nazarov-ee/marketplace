type AppError = 'service unavailable';
interface IAppConfig {
  minCheck: number;
  showcaseItemsCount: number;
  showcaseLoadingTime: number;
  errorProbabilities: Record<AppError, number>;
  retryCounts: number;
  minPrice: number;
  maxPrice: number;
}

export const AppConfig: IAppConfig = {
  minCheck: 100000,
  showcaseLoadingTime: 2000,
  retryCounts: 3,
  minPrice: 1000,
  maxPrice: 100000,
  showcaseItemsCount: 1000,
  errorProbabilities: {
    'service unavailable': 0.9,
  },
};
