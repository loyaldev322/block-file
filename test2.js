const StoryblokClient = require("storyblok-js-client");
const fs = require("fs");
const axios = require("axios");
const Storyblok = new StoryblokClient({
	oauthToken: "",
});

Storyblok.get("spaces/id/assets/" + "id" + "/finish_upload")
	.then((response) => {
		console.log(response);
		// console.log(
		//     "https://a.storyblok.com/" +
		//         signed_response_object.fields.key +
		//         " uploaded!",
		// );
	})
	.catch((error) => {
		throw error;
	});
