import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for poc', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be poc', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('poc');
    })
  });

  it('navbar-brand should be tutorial-network@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('tutorial-network@0.0.1');
  });

  
    it('ProductionLot component should be loadable',() => {
      page.navigateTo('/ProductionLot');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('ProductionLot');
    });

    it('ProductionLot table should have 12 columns',() => {
      page.navigateTo('/ProductionLot');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(12); // Addition of 1 for 'Action' column
      });
    });

  
    it('Contract component should be loadable',() => {
      page.navigateTo('/Contract');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Contract');
    });

    it('Contract table should have 11 columns',() => {
      page.navigateTo('/Contract');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });

  
    it('Batch component should be loadable',() => {
      page.navigateTo('/Batch');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Batch');
    });

    it('Batch table should have 6 columns',() => {
      page.navigateTo('/Batch');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('Products component should be loadable',() => {
      page.navigateTo('/Products');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Products');
    });

    it('Products table should have 5 columns',() => {
      page.navigateTo('/Products');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  

});
