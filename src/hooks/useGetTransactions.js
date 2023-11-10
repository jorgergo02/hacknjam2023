import { useEffect, useState } from 'react';
import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });

  const transactionCollectionRef = collection(db, 'transactions');
  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where('userID', '==', userID),
        orderBy('createdAt', 'desc')
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          docs.push({ id, ...data });

          if (data.transactionType === 'expense') {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }
        });

        let balance = totalIncome - totalExpenses;

        setTransactions(docs);

        setTransactionTotals({
          balance: balance.toFixed(2),
          income: totalIncome.toFixed(2),
          expenses: totalExpenses.toFixed(2),
        });
      });
    } catch (error) {
      console.error(error);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return { transactions, transactionTotals };
};
