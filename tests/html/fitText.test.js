//const expect = chai.expect;

describe('fitText', function() {
    let sandbox;

    beforeEach(function() {
        sandbox = sinon.createSandbox();
    });

    afterEach(function() {
        sandbox.restore();
    });

    it('should reduce font size for an element with overflowing text', function() {
        const element = document.getElementById('testElement');
        const originalFontSize = window.getComputedStyle(element).fontSize;

        fitText('#testElement');

        const newFontSize = window.getComputedStyle(element).fontSize;
        expect(parseFloat(newFontSize)).to.be.below(parseFloat(originalFontSize));
    });

    it('should not reduce font size below minFontSizePx', function() {
        const element = document.getElementById('testElement');
        const minFontSize = 12;

        fitText('#testElement', minFontSize);

        const newFontSize = parseFloat(window.getComputedStyle(element).fontSize);
        expect(newFontSize).to.be.at.least(minFontSize);
    });

    it('should handle multiple elements with a class selector', function() {
        const elements = document.querySelectorAll('.testClass');
        const originalFontSizes = Array.from(elements).map(el => window.getComputedStyle(el).fontSize);

        fitText('.testClass');

        const newFontSizes = Array.from(elements).map(el => window.getComputedStyle(el).fontSize);
        newFontSizes.forEach((newSize, index) => {
            expect(parseFloat(newSize)).to.be.at.most(parseFloat(originalFontSizes[index]));
        });
    });

    it('should handle NodeList input', function() {
        const nodeList = document.querySelectorAll('.testClass');
        const spy = sandbox.spy(window, 'getComputedStyle');

        fitText(nodeList);

        expect(spy.callCount).to.equal(nodeList.length);
    });

    it('should handle Array input', function() {
        const elements = Array.from(document.querySelectorAll('.testClass'));
        const spy = sandbox.spy(window, 'getComputedStyle');

        fitText(elements);

        expect(spy.callCount).to.equal(elements.length);
    });

    it('should handle single HTMLElement input', function() {
        const element = document.getElementById('testElement');
        const spy = sandbox.spy(window, 'getComputedStyle');

        fitText(element);

        expect(spy.calledWith(element)).to.be.true;
    });

    it('should log error for invalid input', function() {
        const consoleSpy = sandbox.spy(console, 'error');

        fitText(null);

        expect(consoleSpy.calledOnce).to.be.true;
        expect(consoleSpy.calledWith('Invalid selector or elements provided to itFitTextAll')).to.be.true;
    });

    it('should use default minFontSizePx when provided value is invalid', function() {
        const element = document.getElementById('testElement');
        const spy = sandbox.spy(window, 'getComputedStyle');

        fitText('#testElement', 'invalid');

        expect(spy.calledWith(element)).to.be.true;
    });
});