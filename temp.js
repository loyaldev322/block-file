const StoryblokClient = require("storyblok-js-client");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const Storyblok = new StoryblokClient({
	oauthToken: "token",
});

Storyblok.post("spaces/id/assets/", {
	filename: "test.txt",
	asset_folder_id: "foler_id",
})
	.then((signed_response_object) => {
		// console.log(signed_response_object);
		const file = "test.txt";
		const fileUpload = (signed_response_object, success, failed) => {
			let form = new FormData();
			// apply all fields from the signed response object to the second request
			for (let key in signed_response_object.data.fields) {
				form.append(key, signed_response_object.data.fields[key]);
			}
			// also append the file read stream
			form.append("file", fs.createReadStream(file));
			// submit your form

			// console.log(form);
			console.log(signed_response_object.data.post_url);
			console.log(signed_response_object.data.fields);
			try {
				// axios
				// 	.post(
				// 		signed_response_object.data.post_url.toString(),
				// 		JSON.stringify(form),
				// 		{},
				// 	)
				// 	.then((res) => res.json())
				// 	.then((resp) => {
				// 		// console.log(resp.data);
				// 		console.log("test.sjon");
				// 		fs.writeFile(
				// 			"test1.txt",
				// 			JSON.stringify(resp),
				// 			(err) => {
				// 				if (err) {
				// 					console.log({ err });
				// 					return;
				// 				}
				// 			},
				// 		);
				// 		// 3. finalize the upload
				// 		Storyblok.get(
				// 			"spaces/195627/assets/" +
				// 				signed_response_object.data.id +
				// 				"/finish_upload",
				// 		)
				// 			.then((response) => {
				// 				// console.log(
				// 				// 	"https://a.storyblok.com/" +
				// 				// 		signed_response_object.data.fields.key +
				// 				// 		" uploaded!",
				// 				// );
				// 			})
				// 			.catch((error) => {
				// 				throw error;
				// 			});
				// 		// console.log(
				// 		// 	"https://a.storyblok.com/" +
				// 		// 		signed_response_object.data.fields.key +
				// 		// 		" uploaded!",
				// 		// );
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	});
			} catch (err) {
				console.log({ err });
			}
			form.submit(signed_response_object.data.post_url, (err, res) => {
				if (err) throw err;

				// 3. finalize the upload
				Storyblok.get(
					"spaces/195627/assets/" +
						signed_response_object.data.id +
						"/finish_upload",
				)
					.then((response) => {
						console.log(
							"https://a.storyblok.com/" +
								signed_response_object.data.fields.key +
								" uploaded!",
						);
					})
					.catch((error) => {
						throw error;
					});

				console.log(signed_response_object);
				// console.log(
				// 	"https://a.storyblok.com/" +
				// 		signed_response_object.data.fields.key +
				// 		" uploaded!",
				// );
			});
		};

		fileUpload(signed_response_object);
	})
	.catch((error) => {
		console.log(error);
		console.log("error");
	});

// use the universal js client to perform the request
// Storyblok.get("spaces/195627/assets/1041", {})
// 	.then((response) => {
// 		console.log(response);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// Storyblok.post("spaces/195627/assets/", {
// 	filename: "test.txt",
// 	size: "400x500",
// })
// 	.then((response) => {
// 		console.log(response);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});
