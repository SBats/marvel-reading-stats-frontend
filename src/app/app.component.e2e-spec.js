describe('App', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toEqual('Marvel reading stats');
  });

  it('should have <header>', function () {
    expect(element(by.css('mrs-app header')).isPresent()).toEqual(true);
  });

  it('should have <main>', function () {
    expect(element(by.css('mrs-app main')).isPresent()).toEqual(true);
  });

  it('should have <footer>', function () {
    expect(element(by.css('mrs-app footer')).isPresent()).toEqual(true);
  });

});
