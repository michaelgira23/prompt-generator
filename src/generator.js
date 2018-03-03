const sheetId = '1tE-A0v-G7A5ce_swWva4X2ZE5TlAd8V1wz1Fzsp8VJw';

let themes = [];
let mediums = [];
let tools = [];

const $body = document.querySelector('body');

const $form = document.querySelector('.form');
const $amountInput = document.querySelector('#amount');
const $detailInput = document.querySelector('#detail');

const $promptList = document.querySelector('.prompts');

// Start
gapi.load('client', start);

// When "Generate" is clicked
function generate() {
	console.log('Generate', $amountInput.value, $detailInput.value)
	const amount = Number($amountInput.value);

	clearPrompts();

	for (let i = 0; i < amount; i++) {
		let theme = null;
		let medium = null;
		let tool = null;

		switch ($detailInput.value) {
			case 'elaborate':
				medium = randomItem(mediums);
				tool = randomItem(tools);
			case 'simple':
				theme = randomItem(themes);
		}

		addPrompt({ theme, medium, tool });
	}
	return false;
}

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

// Add a prompt to the results
function addPrompt({ theme, medium, tool }) {
	console.log('Add prompt', theme, medium, tool);

	const $prompt = document.createElement('div');
	$prompt.classList.add('prompt');
	if (theme) {
		$prompt.append(createDataElement('Theme', theme));
	}
	if (medium) {
		$prompt.append(createDataElement('Medium', medium));
	}
	if (tool) {
		$prompt.append(createDataElement('Tool', tool));
	}
	$promptList.append($prompt);
}

function createDataElement(label, value) {
	const $el = document.createElement('div');
	$el.classList.add(label);

	const $strong = document.createElement('strong');
	$strong.textContent = `${label}: `;
	$el.append($strong);

	const $span = document.createElement('span');
	$span.textContent = value;
	$el.append($span);

	return $el;
}

// Clear prompts
function clearPrompts() {
	while ($promptList.firstChild) {
		$promptList.removeChild($promptList.firstChild);
	}
}

// Pick random element from array
function randomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}
