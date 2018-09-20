import { OfferModule } from './offer.module';

describe('OfferModule', () => {
  let offerModule: OfferModule;

  beforeEach(() => {
    offerModule = new OfferModule();
  });

  it('should create an instance', () => {
    expect(offerModule).toBeTruthy();
  });
});
