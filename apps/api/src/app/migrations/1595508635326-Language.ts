import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  getService,
  getTechnicalUser,
  LanguagesService,
  LanguagesServiceKey,
} from '../../model';

export class Language1595508635326 implements MigrationInterface {
  name = 'Language1595508635326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const technicalUser = await getTechnicalUser(entityManager);
    const languageService: LanguagesService = getService(LanguagesServiceKey);
    const CZ_ISO_CODE = 'cz';
    const EN_ISO_CODE = 'en';
    const CZ_DE_ISO_CODE = 'cz-de';
    const languages = [
      { displayName: 'Czech', isoCode: CZ_ISO_CODE },
      { displayName: 'English', isoCode: EN_ISO_CODE },
      { displayName: 'Czech-German', isoCode: CZ_DE_ISO_CODE },
    ];
    for (const language of languages) {
      await languageService.save(entityManager, language, technicalUser);
    }
  }

  public async down(): Promise<void> {
    // left empty
  }
}
