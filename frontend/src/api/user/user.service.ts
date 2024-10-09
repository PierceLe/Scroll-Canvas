import { AxiosRequestConfig } from 'axios';
import { BaseService } from '../base/base.service';

export class UserService extends BaseService {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  public getCurrentUser(options: AxiosRequestConfig<any>) {
    return this.serverCommunicate.get('/v1/auth/info', options);
  }

  public getUsers(options: AxiosRequestConfig<any>) {
    return this.serverCommunicate.get('/v1/auth/users', options);
  }

  public updateUser(username: string, options: AxiosRequestConfig<any>) {
    return this.serverCommunicate.put(`/v1/auth/user/${username}`, options);
  }

  public updatePassword(id: string, options: AxiosRequestConfig<any>) {
    return this.serverCommunicate.put(`/v1/auth/change_password/${id}`, options);
  }
}
