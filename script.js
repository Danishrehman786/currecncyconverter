const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");


async function loadCurrencies() {
    const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json");
    const data = await res.json();

    for (const code in data) {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = option2.value = code;
        option1.text = option2.text = `${code.toUpperCase()} - ${data[code]}`;

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    }

    window.swapCurrencies = function swapCurrencies() {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
        setTimeout(() => convertCurrency(), 1000);
    };


    fromCurrency.value = "usd";
    toCurrency.value = "eur";
}

loadCurrencies();

window.convertCurrency = async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || isNaN(amount)) {
        result.innerText = "Please enter a valid amount.";
        return;
    }

    const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`);
    const data = await res.json();

    const rate = data[from][to];
    const converted = (amount * rate).toFixed(2);

    result.innerText = `${amount} ${from.toUpperCase()} = ${converted} ${to.toUpperCase()}`;
}
