import {Container} from "inversify";
import {TYPES} from "src/app/app.types";
import {DictionaryDataStorage} from "src/stores/dictionary/dictionary.dataStorage";
import {DictionariesDataClient} from "src/stores/dictionary/dictionaries.dataClient";
import {DictionariesDataService} from "src/stores/dictionary/dictionaries.dataService";
import {DictionariesRepository} from "src/stores/dictionary/dictionaries.repository";

export class DictionariesContainer extends Container {
  constructor() {
    super({defaultScope: "Singleton"});

    this.bind(TYPES.DictionariesDataStorage).to(DictionaryDataStorage);
    this.bind(TYPES.DictionariesDataClient).to(DictionariesDataClient);
    this.bind(TYPES.DictionariesDataService).to(DictionariesDataService);
    this.bind(TYPES.DictionariesRepository).to(DictionariesRepository);
  }
}
