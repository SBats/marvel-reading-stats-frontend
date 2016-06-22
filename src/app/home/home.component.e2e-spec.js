describe('Home', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <mrs-home>', function () {
    var home = element(by.css('mrs-app mrs-home'));
    expect(home.isPresent()).toEqual(true);
  });

});
