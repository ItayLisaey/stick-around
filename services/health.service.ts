import { backendAxiosInstance } from './utils/backend.service';
import { TMDBInstance } from './utils/tmdb.service';

class HealthService {
  async backend() {
    try {
      const res = await backendAxiosInstance.get('health');
      return res.status;
    } catch {
      throw new Error('Server Unavailable');
    }
  }

  async tmdb() {
    try {
      const res = await (await TMDBInstance()).get('movie' + '/' + 24428);
      return res.status;
    } catch {
      console.error('TMDB unreachable');
    }
  }
}

export const healthService = new HealthService();
