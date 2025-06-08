import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const entities = ['./src/data-access-layer/**/*.entity.ts'];

const SeedDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'root',
  password: 'admin',
  database: 'postgres',
  namingStrategy: new SnakeNamingStrategy(),
  entities: entities,
});

SeedDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default SeedDataSource;
