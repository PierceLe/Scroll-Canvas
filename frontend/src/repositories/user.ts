export class User {
  public id?: number;
  public email?: string;
  public firstName?: string;
  public lastName?: string;
  public username?: string;
  public phone?: string;
  public role?: string;

  public static buildUser(user: any): User {
    console.log({user})
    return {
      id: user?.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phone: user.phone,
      role: user.role
    };
  }
}
