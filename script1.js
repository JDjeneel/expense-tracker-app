const balance = document.getElementById('balance');
const transactionsList = document.getElementById('transactions');
const desc = document.getElementById('desc');
const amount = document.getElementById('amount');

document.getElementById('add').addEventListener('click', addTransaction);

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction() {
    if (desc.value.trim() === '' || amount.value.trim() === '') return;

    const transaction = {
        id: Date.now(),
        desc: desc.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    updateUI();
    saveData();

    desc.value = '';
    amount.value = '';
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateUI();
    saveData();
}

function updateUI() {
    transactionsList.innerHTML = '';
    let total = 0;

    transactions.forEach(t => {
        const li = document.createElement('li');
        li.classList.add(t.amount > 0 ? 'income' : 'expense');
        li.innerHTML = `${t.desc} <span>₹${t.amount}</span>
            <button onclick="removeTransaction(${t.id})">❌</button>`;
        transactionsList.appendChild(li);

        total += t.amount;
    });

    balance.innerText = `₹${total}`;
}

function saveData() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

updateUI();
