import { AngularWebpackPage } from './app.po';

describe('angular-webpack App', () => {
  let page: AngularWebpackPage;

  beforeEach(() => {
    page = new AngularWebpackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
