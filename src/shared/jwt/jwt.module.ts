import { Global, Module } from '@nestjs/common';

import { JwtService } from './jwt.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
