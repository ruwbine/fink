export const AppConfig: AppConfig = {
  jwt: {
    secrets: {
      jwt_access_secret: process.env.JWT_ACCESS_SECRET || '',
      jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || '',
    },
    duration: {
      jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
      jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
  },
  bcrypt: {
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  },
};

export type AppConfig = {
  jwt: {
    secrets: {
      jwt_access_secret: string;
      jwt_refresh_secret: string;
    };
    duration: {
      jwt_access_expires_in: string | number;
      jwt_refresh_expires_in: string | number;
    };
  };
  bcrypt: {
    saltRounds: number;
  };
};
