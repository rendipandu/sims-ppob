import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionHistory } from '../../../services/apiService';
import { Hero } from '../../organisms/Hero';
import { RootState } from '../../../redux/store';
import moment from 'moment';

export const TransactionHistoryPage: React.FC = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);

    const transactionHistory = useSelector((state: RootState) => state.transactionHistory);
    console.log('transactionHistory: ', transactionHistory)

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            setLoading(true);
            try {
                await getTransactionHistory(dispatch, offset, limit);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transaction history:', error);
                setLoading(false);
            }
        };

        fetchTransactionHistory();
    }, [dispatch, offset]);

    const handleShowMore = () => {
        setOffset((prevOffset) => prevOffset + limit); // Increase offset to load more records
        setLimit((prevLimit) => prevLimit + 5);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <Hero />

            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Semua Transaksi</h2>
                <div className="space-y-4">
                    {transactionHistory.history.map((transaction, index: number) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                            <div>
                                <p className={`font-semibold ${transaction.transaction_type === 'TOPUP' ? 'text-green-500' : 'text-red-500'}`}>
                                    {transaction.transaction_type === 'TOPUP' ? `+ Rp${transaction.total_amount}` : `- Rp${transaction.total_amount}`}
                                </p>
                                <p className="text-sm text-gray-500">{moment(transaction.created_on).format('DD MMMM YYYY HH:mm')} WIB</p>
                            </div>
                            <div className="text-gray-600">{transaction.description}</div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="text-red-500"
                        onClick={handleShowMore}
                    >
                        Show More
                    </button>
                </div>
            </div>
        </div>
    );
};