export class ControleurApi {
  constructor(url) {
    this._url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this._url);
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
