(function() {
    module.exports = function () {
        this.Given(/^I open the test page$/, function (callback) {
            browser.get('/index.html').then(callback);
        });

        this.When(/^I select scenario (.*) for getAllTodos$/, function (scenario, callback) {
            var scenarioName = scenario === 'null' ? 'passThrough' : scenario;
            ngApimock.selectScenario('getAllTodos', scenarioName).then(callback)
        });

        this.When(/^I refresh the data$/, function (callback) {
            element(by.buttonText('refresh')).click().then(callback);
        });

        this.Then(/^the data from the get response should be (.*)$/, function (data, callback) {
            expect(element(by.binding('ctrl.data')).getText()).to.eventually.equal(data).and.notify(callback);
        });

        this.Then(/^the error from the get response should be (.*)/, function (error, callback) {
            var expected = (error === 'undefined') ? '' : error;
            expect(element(by.binding('ctrl.error')).getText()).to.eventually.equal(expected).and.notify(callback)
        });

        this.When(/^I select scenario (.*) for updateTodo$/, function (scenario, callback) {
            var scenarioName = scenario === 'null' ? 'passThrough' : scenario;
            ngApimock.selectScenario('updateTodo', scenarioName).then(callback);
        });

        this.When(/^I post the data$/, function (callback) {
            element(by.buttonText('post me')).click().then(callback);
        });

        this.Then(/^the data from the post response should be (.*)$/, function (data, callback) {
            expect(element(by.binding('ctrl.postedData')).getText()).to.eventually.equal(data).and.notify(callback);
        });

        this.Then(/^the error from the post response should be (.*)/, function (error, callback) {
            var expected = (error === 'undefined') ? '' : error;
            expect(element(by.binding('ctrl.postedError')).getText()).to.eventually.equal(expected).and.notify(callback)
        });

        this.When(/^I set all scenarios to default$/, function (callback) {
            ngApimock.setAllScenariosToDefault().then(callback);
        });

        this.When(/^I set all scenarios to passThrough$/, function (callback) {
            ngApimock.setAllScenariosToPassThrough().then(callback);
        });

        this.When(/^I set the global variable replaceMe with x$/, function (callback) {
            ngApimock.setGlobalVariable('replaceMe', 'x').then(callback);
        });

        this.When(/^I delete the global variable replaceMe$/, function (callback) {
            ngApimock.deleteGlobalVariable('replaceMe').then(callback);
        });

        this.When(/^I switch to the mocking page/, function (callback) {
            browser.get('/mocking').then(callback);
        });

        this.When(/^I switch back to the mocking page$/, function (callback) {
            browser.get('/mocking').then(callback);
        });
    };
})();