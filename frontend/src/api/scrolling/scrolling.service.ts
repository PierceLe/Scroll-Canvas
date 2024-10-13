import { AxiosRequestConfig } from 'axios';
import { BaseService } from '../base/base.service';

export class ScrollingService extends BaseService {
  private static instance: ScrollingService;

  public static getInstance(): ScrollingService {
    if (!ScrollingService.instance) {
      ScrollingService.instance = new ScrollingService();
    }

    return ScrollingService.instance;
  }

  
  public getScrollings(options: AxiosRequestConfig<any>) {
    return this.serverCommunicate.get('/v1/scrollings', options);
  }
}
