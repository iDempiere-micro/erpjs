import { Injectable } from '@nestjs/common';
import { CountryModel, CountrySaveArgsModel, CountryService } from '@erpjs/model';
import { Country } from '../entities/country';
import { ModelModule } from '@erpjs/data';

@Injectable()
export class CountryServiceImplementation extends CountryService {
  async createEntity(): Promise<Country> {
    return new Country();
  }

  async loadEntity(id: number): Promise<Country> {
    return await ModelModule.getEntityManager().getRepository(Country).findOne(id);
  }

  async save(args: CountrySaveArgsModel): Promise<CountryModel> {
    return await ModelModule.getEntityManager().save(await super.save(args));
  }
}
