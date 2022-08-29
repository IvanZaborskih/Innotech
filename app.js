const deposit = {
	controlled: {
		name: 'Управляемый',
		term: '91 день',
		interestRate: 'до 5,02%',
		minimumDepositAmount: '50 000 ₽'
	},
	first: {
		name: 'Первый',
		term: '91 день',
		interestRate: 'до 6,03%',
		minimumDepositAmount: '1 000 ₽'
	}
}

const translate = new Map([
	['управляемый', 'controlled'],
	['первый', 'first']
]);

function findDepositName(request) {
	let depositName = '';
	const requestWords = request.split(' ');

	for (let i = 0; i < requestWords.length; i++) {
		if (requestWords[i] === 'вклад' && requestWords[i + 1]) {
			depositName = requestWords[i + 1].toLowerCase();
		}
	}

	depositName = translate.get(depositName);
	return depositName;
}

function printDepositInfo(depositName) {
	return `Название вклада: ${deposit[depositName].name}\nСрок вклада: ${deposit[depositName].term}\nПроцентная ставка: ${deposit[depositName].interestRate}\nМинимальная сумма вклада: ${deposit[depositName].minimumDepositAmount}`;
}

function serverResponse(request) {
	switch (request.toLowerCase()) {
		case 'да':
		case 'согласен':
			return 'Отлично! Вклад открыт!';
		case 'нет':
		case 'не согласен':
			return 'Жаль, что условия вам не подошли. Приходите еще';
		default:
			throw new Error;
	}
}


let request = 'Хочу открыть вклад первый';

try {
	let depositName = findDepositName(request);
	if (!depositName)
		throw new Error;

	let depositInfo = printDepositInfo(depositName);
	console.log(depositInfo);
	console.log();
	console.log('Вы согласны открыть вклад?');
	console.log();

	request = 'Согласен';
	console.log(request);
	console.log();

	let serverRes = serverResponse(request);
	console.log(serverRes);
} catch (error) {
	console.log('Я не понял ваш запрос');
}