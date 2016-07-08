describe('Home', function () {

  beforeEach(function () {
    browser.get('/');
  });

  beforeAll(function () {
    browser.executeScript('window.localStorage.clear();');
  });

  afterAll(function() {
    browser.executeScript('window.localStorage.clear();');
  });

  it('should have <mrs-home>', function () {
    var home = element(by.css('mrs-app mrs-home'));
    expect(home.isPresent()).toEqual(true);
  });

  describe('- If user does not have a collection', function () {
    it('should display a single link', function () {
      var LinksCount = element(by.css('mrs-home .greetings-links'))
        .all(by.css('a'))
        .count();
      expect(LinksCount).toBe(1);
    });

    it('should display a link to library', function () {
      var link = element(by.css('mrs-home .greetings-links'))
        .all(by.css('a'))
        .get(0);
      link.getAttribute('href')
        .then(function(href) {
          expect(href).toContain('/library');
        });
    });
  });

  describe('- If user has a collection', function () {
    beforeAll(function() {
      browser.executeScript('return window.localStorage.setItem(\'marvel-reading-stats\', \'{"comics": [ [12, {"id": 12}] ]}\');');
    });

    it('should display two link', function () {
      var LinksCount = element(by.css('mrs-home .greetings-links'))
        .all(by.css('a'))
        .count();
      expect(LinksCount).toBe(2);
    });

    it('should display a link to collection', function () {
      var link = element(by.css('mrs-home .greetings-links'))
        .all(by.css('a'))
        .get(0);
      link.getAttribute('href')
        .then(function(href) {
          expect(href).toContain('/collection');
        });
    });

    it('should display a link to library', function () {
      var link = element(by.css('mrs-home .greetings-links'))
      .all(by.css('a'))
      .get(1);
      link.getAttribute('href')
      .then(function(href) {
        expect(href).toContain('/library');
      });
    });
  });


});
