import { useState } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import './styles.css';
import { auth } from '../../config/firebase-config';

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('expense');

  const { name, profilePhoto } = useGetUserInfo();

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    setDescription('');
    setTransactionAmount('');
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1> {name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expenses}</p>
            </div>
            <form className="add-transaction" action="" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Description"
                name="description"
                id="description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                id="amount"
                value={transactionAmount}
                required
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
              <input
                type="radio"
                name="expense"
                id="expense"
                value="expense"
                checked={transactionType === 'expense'}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="expense">Expense</label>
              <input
                type="radio"
                name="income"
                id="income"
                value="income"
                checked={transactionType === 'income'}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              <label htmlFor="income">Income</label>

              <button className="add-transaction-button" type="submit">
                Add Transaction
              </button>
            </form>
          </div>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img
              className="profile-photo"
              src={profilePhoto}
              alt="User's profile photo from their Google Account"
            />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul className="transaction-list">
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li className="transaction" key={transaction.id}>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} -{' '}
                  <label
                    style={{
                      color: transactionType === 'expense' ? 'red' : 'green',
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
