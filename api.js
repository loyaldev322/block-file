const FormData = require("form-data");
const fs = require("fs");

const file = "text.txt";
const fileUpload = (signed_response_object, success, failed) => {
	let form = new FormData();
	// apply all fields from the signed response object to the second request
	for (let key in signed_response_object.fields) {
		form.append(key, signed_response_object.fields[key]);
	}
	// also append the file read stream
	form.append("file", fs.createReadStream(file));
	// submit your form
	form.submit(signed_response_object.post_url, (err, res) => {
		if (err) throw err;

		// 3. finalize the upload
		Storyblok.get(
			"spaces/1004556/assets/" +
				signed_response_object.id +
				"/finish_upload",
		)
			.then((response) => {
				console.log(
					"https://a.storyblok.com/" +
						signed_response_object.fields.key +
						" uploaded!",
				);
			})
			.catch((error) => {
				throw error;
			});
		console.log(
			"https://a.storyblok.com/" +
				signed_response_object.fields.key +
				" uploaded!",
		);
	});
};
