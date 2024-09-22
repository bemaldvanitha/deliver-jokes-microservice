import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as process from "process";

dotenv.config();

@Injectable()
export class MicroserviceGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.headers['x-api-key'] === process.env.API_KEY;
  }
}
