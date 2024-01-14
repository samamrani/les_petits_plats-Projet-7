export class Api {
  constructor(url) {
    this._url = url;
  }

  async fetch() {
    try {
      const response = await this.fetch(this._url);
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
