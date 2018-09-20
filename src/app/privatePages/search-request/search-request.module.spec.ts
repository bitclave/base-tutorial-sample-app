import { SearchRequestModule } from './search-request.module';

describe('SearchRequestModule', () => {
  let searchRequestModule: SearchRequestModule;

  beforeEach(() => {
    searchRequestModule = new SearchRequestModule();
  });

  it('should create an instance', () => {
    expect(searchRequestModule).toBeTruthy();
  });
});
