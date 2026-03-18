import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCoinDetails = async (id: string | undefined) => {
    if (!id) return null;
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    return data;
};

const CoinPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: coin, isLoading, isError } = useQuery({
        queryKey: ['coin', id], // Ключ зависит от id!
        queryFn: () => fetchCoinDetails(id),
        staleTime: 60000,
    });

    if (isLoading) return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="text-xl animate-pulse">Loading details...</div>
        </div>
    );
    if (isError || !coin) return (
        <div className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">
            <div className="text-xl">Error loading coin details.</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="text-blue-400 hover:underline mb-8 inline-block">← Back to Dashboard</Link>

                <div className="flex flex-col md:flex-row gap-10 items-start bg-gray-800/50 p-8 rounded-3xl border border-gray-700">
                    <img src={coin.image.large} alt={coin.name} className="w-32 h-32" />

                    <div className="flex-1">
                        <h1 className="text-5xl font-black mb-2">{coin.name} <span className="text-gray-500 uppercase">{coin.symbol}</span></h1>
                        <div className="text-3xl font-mono text-emerald-400 mb-6">
                            ${coin.market_data.current_price.usd.toLocaleString()}
                        </div>

                        <p className="text-gray-400 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ')[0] + '.' }}>
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-4 bg-gray-900/50 rounded-xl">
                                <div className="text-gray-500 text-xs uppercase mb-1">Market Cap Rank</div>
                                <div className="text-xl font-bold">#{coin.market_cap_rank}</div>
                            </div>
                            <div className="p-4 bg-gray-900/50 rounded-xl">
                                <div className="text-gray-500 text-xs uppercase mb-1">24h High</div>
                                <div className="text-xl font-bold text-emerald-400">
                                    ${coin.market_data.high_24h.usd.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoinPage;