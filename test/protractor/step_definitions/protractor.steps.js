(() => {
    function ProtractorSteps() {
        const fs = require('fs-extra');
        const path = require('path');
        const mocksDirectory = path.join(process.cwd(), 'test', 'mocks', 'api');
        const responses = {
            list: fs.readJsonSync(path.join(mocksDirectory, 'some-api-list.json')).responses,
            update: fs.readJsonSync(path.join(mocksDirectory, 'some-api-post.json')).responses,
            download: fs.readJsonSync(path.join(mocksDirectory, 'some-api-download.json')).responses
        };

        const world = this;

        world.Given(/^a mock with name (.*) has marked (.*) as its default scenario$/, (name, scenario) =>
            expect(responses[name][scenario]['default']).to.be.true);

        world.Given(/^a mock with name (.*) has no scenario marked as default$/, (name) =>
            expect(Object.keys(responses[name])
                .filter(function (scenario) {
                    return responses[name][scenario].default || false;
                }).length).to.equal(0));

        world.When(/^I select (.*) for mock with name (.*)$/, (scenario, name) =>
            ngApimock.selectScenario(name, scenario));

        world.When(/^I reset the scenario's to defaults$/, () =>
            ngApimock.setAllScenariosToDefault());

        world.When(/^I reset the scenario's to passThroughs$/, () =>
            ngApimock.setAllScenariosToPassThrough());

        world.When(/^I add variable (.*) with value (.*)$/, (name, value) =>
            ngApimock.setGlobalVariable(name, value));

        world.When(/^I update variable (.*) with value (.*)$/, (name, value) =>
            ngApimock.setGlobalVariable(name, value));

        world.When(/^I delete variable (.*)$/, (name) =>
            ngApimock.deleteGlobalVariable(name));

        world.When(/^I (enable|disable) echo for mock with name (.*)/, (able, name) =>
            ngApimock.echoRequest(name, able === 'enable'));

        world.Then(/^echoing should be (enabled|disabled) for mock with name (.*)/, (able, name) => {
            // no idea how I can check the server log for now check manually
        });

        world.Then(/^I delay the response for mock with name (.*) for (\d+) milliseconds$/, (name, delay) => {
            browser.ignoreSynchronization = true;
            return ngApimock.delayResponse(name, parseInt(delay));
        });
    }

    module.exports = ProtractorSteps;
})();
