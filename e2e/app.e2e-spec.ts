import { NewcliPage } from './app.po';

describe('codo-angular2 App', function() {
  let page: NewcliPage;

  beforeEach(() => {
    page = new NewcliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
