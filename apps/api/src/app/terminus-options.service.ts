import { DNSHealthIndicator, TerminusEndpoint, TerminusModuleOptions, TerminusOptionsFactory, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly typeOrm: TypeOrmHealthIndicator,
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.dns.pingCheck('google', 'https://google.com'),
        async () => this.typeOrm.pingCheck('database', { timeout: 1500 }),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
