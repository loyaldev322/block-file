const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function uploadFile(filePath) {
	const form = new FormData();
	form.append("asset[file]", fs.createReadStream(filePath));
	form.append("asset[source]", "node.js");

	const response = await axios.get(
		"https://mapi.storyblok.com/v1/spaces/id/assets/0",
		{
			headers: {
				Authorization: "token",
				"Content-Type": "application/json",
			},
		},
	);

	return response.data;
}

uploadFile("./test.txt")
	.then((response) => {
		console.log(response);
	})
	.catch((error) => {
		console.log(error);
	});
