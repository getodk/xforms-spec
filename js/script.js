document.addEventListener('DOMContentLoaded', function () {
    addNavMenu();
    setHeaderListeners();
    markXFormsReferences();
});

/**
 * Adds listeners to a NodeList.
 * 
 * @param {NodeList} elements list of HTML Elements
 * @param {String} event type
 */
function addListeners(elements, event, handler) {
    if (elements && elements.length) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener(event, handler);
        }
    }
}

/**
 * Adds Navigation Menu up to 2 levels deep
 */
function addNavMenu() {
    var navListEl = document.createElement('ul');
    var sectionHeadings = document.querySelectorAll('h2[id]');

    for (var i = 0; i < sectionHeadings.length; ++i) {
        var subHeadings = sectionHeadings[i].parentNode.querySelectorAll('h3[id]'),
            navSectionEl = navListEl.appendChild(getMenuElement(sectionHeadings[i]));

        if (subHeadings.length > 0) {
            var navSubSectionListEl = navSectionEl.appendChild(document.createElement('ul'));
            for (var j = 0; j < subHeadings.length; ++j) {
                navSubSectionListEl.appendChild(getMenuElement(subHeadings[j]));
            }
        }
    }

    document.querySelector('.sidenav').appendChild(navListEl);
}

/**
 * Add class to all links to URLs starting with "https://www.w3.org/TR/2003/REC-xforms-20031014"
 */
function markXFormsReferences() {
    var xformsLinks = document.querySelectorAll('a[href^="https://www.w3.org/TR/2003/REC-xforms-20031014"],a[href^="http://www.w3.org/TR/xforms/"] ');

    for (var i = 0; i < xformsLinks.length; ++i) {
        xformsLinks[i].classList.add('xforms');
    }
}

/**
 * Creates a menu element from a heading element
 * @param  {Element} headingEl a heading element
 */
function getMenuElement(headingEl) {
    var listItemEl = document.createElement('li'),
        linkEl = document.createElement('a');

    linkEl.setAttribute('href', '#' + headingEl.textContent.toLowerCase().replace(/\s/g, '-'));
    linkEl.appendChild(document.createTextNode(headingEl.textContent));

    listItemEl.appendChild(linkEl);

    return listItemEl;
}

/**
 * Add listeners for header clicks to update URL #hash
 */
function setHeaderListeners() {
    var headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    addClickableClass(headers);
    addListeners(headers, 'click', headerClickHandler);
}

/** 
 * Looks two levels up for an id element and changes URL hash if present.
 * 
 * @param  {Event]} event
 */
function headerClickHandler(event) {
    var target = event.currentTarget;
    if (target) {
        if (target.id) {
            setHash(target.id);
        }
    }
}

/**
 * Sets hash in URL without triggering scrolling. Adds state to history.
 * @param {string} hash [description]
 */
function setHash(hash) {
    hash = (hash && hash.indexOf('#') !== 0) ? '#' + hash : hash;
    history.pushState({}, '', hash);
}

/**
 * Adds class "clickable" to all elements in NodeList.
 * 
 * @param {NodeList} headers list of HTML Elements
 */
function addClickableClass(elements) {
    if (elements && elements.length) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add('clickable');
        }
    }
}