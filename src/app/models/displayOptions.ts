export class DisplayOptions {
  wallet: Boolean;
  rewards: Boolean;
  kyc: Boolean;

  constructor(obj) {
    this.wallet = obj && !!obj.display_wallet || false;
    this.rewards = obj && !!obj.display_rewards || false;
    this.kyc = obj && !!obj.display_kyc || false;
  }
  static get key(): string {
    return 'vault_preferences';
  }
  get value(): string {
    return JSON.stringify({
      display_wallet: this.wallet ? 1 : 0,
      display_rewards: this.rewards ? 1 : 0,
      display_kyc: this.kyc ? 1 : 0,
    });
  }
  updateValue(obj) {
    this.wallet = obj && !!obj.display_wallet || false;
    this.rewards = obj && !!obj.display_rewards || false;
    this.kyc = obj && !!obj.display_kyc || false;
  }
}
