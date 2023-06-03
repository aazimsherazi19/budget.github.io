let monthlyBudget = 0;
let expenses = [];

function showBudgetPopup() {
  document.getElementById('popup').style.display = 'block';
}

function hidePopup() {
  document.getElementById('popup').style.display = 'none';
}

function saveBudget() {
  const budgetAmount = document.getElementById('budgetAmount').value;
  if (budgetAmount !== '') {
    monthlyBudget = parseInt(budgetAmount);
    document.getElementById('monthlyBudget').textContent = 'Monthly Budget: ' + monthlyBudget + " PKR";
    hidePopup();
    console.log('Budget saved:', monthlyBudget);
    updateRemainingBudget();
  }
}

function addExpense() {
  const expenseDescription = document.getElementById('expenseDescription').value;
  const expenseAmount = document.getElementById('expenseAmount').value;
  const expenseDate = document.getElementById('expenseDate').value;

  if (expenseDescription !== '' && expenseAmount !== '' && expenseDate !== '') {
    const expense = {
      description: expenseDescription,
      amount: parseFloat(expenseAmount),
      date: expenseDate
    };

    expenses.push(expense);
    console.log('Expense added:', expense);
    displayExpenses();
    updateRemainingBudget();

    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDate').value = '';
  }
}

function displayExpenses() {
  const table = document.getElementById('expenseTable');
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  expenses.forEach(expense => {
    const row = table.insertRow();
    const descriptionCell = row.insertCell();
    const amountCell = row.insertCell();
    const dateCell = row.insertCell();

    descriptionCell.textContent = expense.description;
    amountCell.textContent =  expense.amount;
    dateCell.textContent = expense.date;
  });
}

function updateRemainingBudget() {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = monthlyBudget - totalExpenses;
  document.getElementById('remainingBudget').textContent = remainingBudget;
}