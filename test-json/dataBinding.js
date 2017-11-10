$.getJSON("data.json", function (json) {
	var dataLength = json.length;

	var benefitSection = document.getElementById("benefit-list");

	for (var i = 0; i < dataLength; ++i) {
		if (json[i].type === "benefits") {
			var benefitLength = json[i].content.length;

			for (var j = 0; j < benefitLength; ++j) {
				var item = document.createElement("li");
				item.appendChild(document.createTextNode(json[i].content[j]));
				benefitSection.appendChild(item);
			}
		}
	}
});