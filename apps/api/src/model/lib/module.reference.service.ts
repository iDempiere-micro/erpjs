import { ModuleRef } from '@nestjs/core';

export function getService<TResult>(
  typeOrToken: string,
  options?: {
    strict: boolean;
  }
): TResult {
  return (global as any).moduleRef.get(typeOrToken);
}

export class ModuleReferenceService {
  constructor(moduleRef: ModuleRef) {
    (global as any).moduleRef = moduleRef;
  }
}
