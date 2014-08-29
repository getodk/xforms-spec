document.addEventListener('DOMContentLoaded', function() {
	addNavMenu();
	addBadges();
});

// adds Navigation Menu up to 2 levels deep
function addNavMenu() {
	var navListEl = document.createElement('ul'),
		sectionHeadings = document.querySelectorAll('h2[id]');

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

// creates a menu element from a heading element
function getMenuElement(headingEl) {
	var listItemEl = document.createElement('li'),
		linkEl = document.createElement('a');

	linkEl.setAttribute('href', '#' + headingEl.textContent.toLowerCase().replace(/\s/g, '-'));
	linkEl.appendChild(document.createTextNode(headingEl.textContent));

	listItemEl.appendChild(linkEl);

	return listItemEl;
}

// add badges from review and pending links
function addBadges() {
	var link, clss,
		links = document.querySelectorAll('a');

	for (var i = 0; i < links.length; ++i) {
		link = links[i];
		if (link.textContent === 'review' || link.textContent === 'pending') {
			link.classList.add('badge');
			link.classList.add(link.textContent);
			if (link.getAttribute('href') === '') {
				link.setAttribute('href', '#');
			}
		}
	}
}
