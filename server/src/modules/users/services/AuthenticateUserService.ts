import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import authConfig, { IAuthConfig } from '@config/auth';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination.', 401);
    }

    const compareHash = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!compareHash) {
      throw new AppError('Incorrect e-mail/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
