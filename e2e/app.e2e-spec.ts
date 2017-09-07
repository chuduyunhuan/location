import { LocationPage } from './app.po';

describe('location App', () => {
  let page: LocationPage;

  beforeEach(() => {
    page = new LocationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
