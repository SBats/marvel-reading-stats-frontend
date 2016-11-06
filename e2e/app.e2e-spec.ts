import { MrsPage } from './app.po';

describe('mrs App', function() {
  let page: MrsPage;

  beforeEach(() => {
    page = new MrsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
