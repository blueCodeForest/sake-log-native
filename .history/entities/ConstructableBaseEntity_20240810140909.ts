import { BaseEntity } from 'typeorm';

export class ConstructableBaseEntity extends BaseEntity {
  static construct<T>(this: new () => T, params: Partial<T>): T {
    const instance = new this();
    Object.assign(instance as object, params);
    return instance;
  }
}
