import 'dotenv/config';

interface IJWTConfig {
  secret: string;
  expiresIn: string;
}

export interface IAuthConfig {
  jwt: IJWTConfig;
}

const AuthConfig: IAuthConfig = {
  jwt: {
    secret: process.env.APP_SECRET || '',
    expiresIn: '1d',
  },
};

export default AuthConfig;
