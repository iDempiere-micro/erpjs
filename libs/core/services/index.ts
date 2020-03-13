import { LogService } from './log.service';
import { WindowService } from './window.service';
import { DataLoadingService } from './data.loading.service';

export const CORE_PROVIDERS: any[] = [LogService, WindowService, DataLoadingService];

export * from './log.service';
export * from './window.service';
export * from './tokens';
export * from './data.loading.service'
