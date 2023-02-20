import { join } from 'path';
import { DataSource } from 'typeorm';

import { Environment } from '@shared/variables/environment';

const dataSource = new DataSource({
  type: 'postgres',

  host: Environment.DATABASE_HOST,
  port: Environment.DATABASE_PORT,
  username: Environment.DATABASE_USER,
  password: Environment.DATABASE_PASSWORD,
  database: Environment.DATABASE_NAME,

  synchronize: false,

  subscribers: [join(__dirname, '/src/**/subscribers/*{.ts,.js}')],
  entities: [join(__dirname, '/src/**/entities/*{.ts,.js}')],
  migrations: [join(__dirname, '/src/**/migrations/*{.ts,.js}')],
});

export default dataSource;
