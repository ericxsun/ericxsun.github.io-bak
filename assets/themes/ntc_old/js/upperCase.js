/**
 *format category string, uppercase the first alphabet of each word.
 *
 **/

function fixupText(attr) {
	$("." + attr).each(function() {
		var textNode = $(this);

		textNode.html(textNode.text().replace(/(?:^|\s)\w/g, function(match) {
			return match.toUpperCase();
		}).replace("Misc", "MISC").replace("Ai", "AI").replace("Mvc", "MVC").replace("Nosql", "NoSQL").replace("-side", "-Side").replace("Branch By Abstraction, Etc", "Branch by Abstraction, etc").replace("Ui ", "UI ").replace("Devops", "DevOPS").replace("[", "<span>").replace("]", "</span>"));

		textNode.removeClass(attr);
	});
}
