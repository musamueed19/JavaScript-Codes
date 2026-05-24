import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Client } from 'pg';
import { UsersModule } from './users/users.module';

const databaseName = 'nest-demo-pro';

async function ensureDatabaseExists() {
  const adminClient = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'postgres',
  });

  await adminClient.connect();

  try {
    const result = await adminClient.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [databaseName],
    );

    if (result.rowCount === 0) {
      await adminClient.query(`CREATE DATABASE "${databaseName}"`);
      Logger.log(`Created database "${databaseName}"`, 'DATABASE');
    }
  } finally {
    await adminClient.end();
  }
}

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await ensureDatabaseExists();
        return {
          type: 'postgres',
          host: 'localhost',
          // port: 3306,
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: databaseName,
          entities: [__dirname + '/**/*.model{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
    if (connection.isConnected)
      Logger.log('Database connection established successfully', 'DATABASE');
    else Logger.error('Failed to establish database connection', 'DATABASE');
  }
}
