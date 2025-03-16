type AppError = 'service unavailable' | 'showcase get items error';
interface IAppConfig {
  minCheck: number;
  showcaseItemsCount: number;
  showcaseLoadingTime: number;

  //0 = 0%, 0.5 = 50%, 1 = 100%
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
    'showcase get items error': 0.5,
  },
};
