/**
 * Fits text within a given HTML element's width, reducing font size by 0.5px down to minFotSizePx to all elements matching the given selector or elements
 * TIP: set width & height in rem. DIV, P, ... set width & height (or max-), overflow: hidden, text-overflow: ellipsis; SPAN add display: inline-block;white-space: nowrap;
 *
 * @param {string|HTMLElement|NodeList|Array|jQuery} selector - CSS selector, NodeList, Array of elements, or jQuery object to fit its text to its width
 * @param {number} [minFontSizePx=10] - The minimum font size in pixels. Defaults to 8px.
 */
function fitText(selector, minFontSizePx = 10) {
    if(isNaN(minFontSizePx) || minFontSizePx < 1)
        minFontSizePx = 10;
    try {
        var elements = [];
        if(typeof selector === 'string')
            elements = Array.from(document.querySelectorAll(selector));
        else if(selector instanceof NodeList)
            elements = Array.from(selector);
        else if(Array.isArray(selector))
            elements = selector;
        else if(typeof jQuery === 'function' && selector instanceof jQuery)
            elements = selector.toArray();
        else if(selector && typeof selector === 'object' && selector.nodeType === 1)
            elements = [selector];
        else {
            console.error('Invalid selector or elements provided to itFitTextAll');
            return;
        }
        for(var i = 0, len = elements.length; i < len; ++i)
            _calculateFontSize2Element(elements[i]);

        function _calculateFontSize2Element(el) {
            try {
                console.log(el);
                if(typeof el.dataset.rauljose_fontsize !== 'undefined')
                    el.style.fontSize = el.dataset.rauljose_fontsize;
                var computedFontSize = getComputedStyle(el, null).getPropertyValue('font-size');
                if (computedFontSize === null || typeof computedFontSize !== 'string' || computedFontSize === '')
                    return;
                if(typeof el.dataset.rauljose_fontsize === 'undefined')
                    el.dataset.rauljose_fontsize = computedFontSize;

                var fontSize = parseFloat(computedFontSize.replace('px', ''));
                if(fontSize <= minFontSizePx)
                    return;
                if(el.scrollWidth < el.clientWidth || el.clientWidth <=0 || el.scrollWidth <= 0)
                    return;
                var newFontSize = fontSize * el.clientWidth/el.scrollWidth;
                if(newFontSize > minFontSizePx)
                    el.style.fontSize = newFontSize + 'px';
                else if(newFontSize < minFontSizePx)
                    el.style.fontSize = minFontSizePx + 'px';
            } catch (err) {
                if (typeof js_errores_a_dime === 'function')
                    js_errores_a_dime(err);
                else
                    console.log("ERROR: html.fitText._calculateFontSize2Element", err);
                el.style.fontSize = el.dataset.rauljose_fontsize;
            }
        }
    } catch (e) {
        if(typeof js_errores_a_dime === 'function')
            js_errores_a_dime(e);
        else
            console.log("ERROR: html.fitText", e);
    }
}
