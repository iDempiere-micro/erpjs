import { EntityBase, findOneById } from './EntityBase';
import { Repository } from 'typeorm';
import { CommonQueryArgs } from '../../args/CommonQueryArgs';
import { WithId } from './with.id';

export abstract class BaseEntityService<T extends EntityBase, R extends WithId> {
    protected readonly repo: Repository<T>;

    protected constructor(
        private TCtor: new (...args: any[]) => T,
        repo: Repository<T>,
    ) {
        this.repo = repo;
    }

    async findAll(args: CommonQueryArgs): Promise<T[]> {
        return await this.repo.find({ skip: args.skip, take: args.take });
    }

    async findOneById(id: number): Promise<T> {
        return findOneById(this.repo, id);
    }

    async save(args: R): Promise<T> {
        const entity = args.id ? await this.repo.findOneOrFail(args.id) : new this.TCtor();
        return this.repo.save(entity as any);
    }

}
