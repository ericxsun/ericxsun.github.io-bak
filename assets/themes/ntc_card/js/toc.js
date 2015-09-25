/**
 *Add table of contents!
 *
 *call add*Toc(contentElement, tocLocElement, after/before, tocClass), where
 *
 *contentElement is an element that contains the document or blog post for which you want a table of contents, and
 *
 *tocLocElement is an element that the toc will be inserted after its child.
 *
 *after/before is an immediate child of tocLocElement;
 *
 *tocClass is the CSS class of the table-of-contents.
 *
 * ref: http://loyc.net/2014/javascript-toc.html
 **/

function $get(selector) {
	return document.querySelector(selector);
}

function $all(selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector));
}

function buildTOC_ul(selector) {
	var ul = document.createElement("ul");
	ul.className = "nav nav-list";

	var levels = [ul, null, null];
	levels[0].style
	var lvl = 0, c = 0;

	if (!selector)
		selector = "h2, h3, h4";

	$all(selector).forEach(function(el) {
		if (!el.id)
			el.id = 'section_' + ++c;
		var newLvl = (el.tagName == "H2" ? 0 : el.tagName == "H3" ? 1 : 2);
		for (; lvl < newLvl; lvl++) {
			var lvl_ul = document.createElement("ul");
			lvl_ul.className = "nav nav-list";
			levels[lvl].appendChild(levels[lvl + 1] = lvl_ul);
		}

		lvl = newLvl;

		var li = document.createElement('li');
		li.innerHTML = "<a href='#" + el.id + "'></a>";
		li.firstChild.innerHTML = el.innerHTML;
		levels[lvl].appendChild(li);
	});

	return levels[0];
}

/** */
function addSpan4Toc(contentElement, tocLocElement, after, tocClass) {
	if(after === undefined)
		after = tocLocElement.lastChild;

	var prefix = "", clsName = contentElement.className;

	if(clsName)
		prefix = "." + (clsName.indexOf(" ") == -1 ? clsName : clsName.substr(0, clsName.indexOf(" "))) + " ";

	var selector = prefix + "h2, " + prefix + "h3, " + prefix + "h4";

	after.parentNode.insertBefore(buildTOC_ul(selector), after.nextSibling);
}

/** */
function addInnerToc(contentElement, tocLocElement, before, tocClass) {
	if(before === undefined)
		before = tocLocElement.firstChild;

	var prefix = "", clsName = contentElement.className;

	if(clsName)
		prefix = "." + (clsName.indexOf(" ") == -1 ? clsName : clsName.substr(0, clsName.indexOf(" "))) + " ";

	var selector = prefix + "h2, " + prefix + "h3, " + prefix + "h4";

	var toc = document.createElement("div");
	toc.className = tocClass ||"nav nav-list series-links";
	toc.idName = "toc-list";
	toc.appendChild(document.createTextNode("TABLE OF CONTENTS"));
	toc.appendChild(buildTOC_ul(selector));

	tocLocElement.insertBefore(toc, before);
}
