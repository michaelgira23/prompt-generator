const sheetId = '1tE-A0v-G7A5ce_swWva4X2ZE5TlAd8V1wz1Fzsp8VJw';

let themes = [];
let mediums = [];
let tools = [];

// Start
gapi.load('client', start);

// On Google API load
function start() {
	gapi.client.init({
		// :^)
		apiKey: String.fromCharCode(65) + String.fromCharCode(73) + String.fromCharCode(122) + String.fromCharCode(97)
			+ String.fromCharCode(83) + String.fromCharCode(121) + String.fromCharCode(68) + String.fromCharCode(88)
			+ String.fromCharCode(72) + String.fromCharCode(69) + String.fromCharCode(56) + String.fromCharCode(73)
			+ String.fromCharCode(122) + String.fromCharCode(116) + String.fromCharCode(103) + String.fromCharCode(67)
			+ String.fromCharCode(99) + String.fromCharCode(122) + String.fromCharCode(99) + String.fromCharCode(114)
			+ String.fromCharCode(95) + String.fromCharCode(114) + String.fromCharCode(51) + String.fromCharCode(106)
			+ String.fromCharCode(73) + String.fromCharCode(120) + String.fromCharCode(50) + String.fromCharCode(98)
			+ String.fromCharCode(117) + String.fromCharCode(67) + String.fromCharCode(95) + String.fromCharCode(90)
			+ String.fromCharCode(118) + String.fromCharCode(118) + String.fromCharCode(68) + String.fromCharCode(66)
			+ String.fromCharCode(114) + String.fromCharCode(115) + String.fromCharCode(56),
		discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
	})
		.then(getData)
		.then(response => {
			const columns = response.result.values;
			themes = columns[0];
			mediums = columns[1];
			tools = columns[2];
			console.log('themes', themes);
			console.log('mediums', mediums);
			console.log('tools', tools);
		})
		.catch(err => {
			console.log('Uh oh!', err);
		});
}

// Get Sheets data
function getData() {
	return gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: sheetId,
		range: `D2:F`,
		majorDimension: 'COLUMNS'
	});
}
