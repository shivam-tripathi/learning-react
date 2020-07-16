export default class URL {
  static construct(...urls: string[]) {
    return (urls || []).join('/').replace(/\/+/g, '/');
  }
}
