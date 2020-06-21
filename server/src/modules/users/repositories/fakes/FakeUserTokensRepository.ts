import { uuid } from 'uuidv4';

import IUserTokensRepository from '../IUserTokensRepository';

import UserTokens from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserTokens[] = [];

  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const user = this.userTokens.find(userToken => userToken.token === token);

    return user;
  }
}

export default FakeUserTokensRepository;
