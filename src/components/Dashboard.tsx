import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Coin } from '../types/crypto';
import CoinCard from './CoinCard';
import SkeletonCard from './SkeletonCard';

const fetchCryptoData = async (): Promise<Coin[]> => {
    const { data } = await axios.get<Coin[]>(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
            params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 50, page: 1 },
        }
    );
    return data;
};

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [favorites, setFavorites] = useState<string[]>([]);

    const { data: coins, isLoading, isError } = useQuery<Coin[]>({
        queryKey: ['cryptos'],
        queryFn: fetchCryptoData,
        refetchInterval: 60000,
    });

    const handleToggleFavorite = useCallback((id: string) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
        );
    }, []);

    const filteredCoins = useMemo(() => {
        if (!coins) return [];
        return coins.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, coins]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
            <header className="max-w-6xl mx-auto mb-10">
                <h1 className="text-4xl font-black mb-6 bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Crypto Pulse
                </h1>
                <input
                    type="text"
                    placeholder="Filter by name..."
                    className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-hidden transition-all placeholder:text-gray-600"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
            </header>

            <main className="max-w-6xl mx-auto">
                {isError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl">
                        Loading error. Try again later.
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {isLoading ? (
                        Array.from({ length: 12 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    ) : (
                        filteredCoins.map((coin) => (
                            <CoinCard
                                key={coin.id}
                                coin={coin}
                                isFavorite={favorites.includes(coin.id)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))
                    )}
                </div>

                {!isLoading && filteredCoins.length === 0 && (
                    <p className="text-center text-gray-500 mt-20 text-xl">Nothing found...</p>
                )}
            </main>
        </div>
    );
}

export default Dashboard;