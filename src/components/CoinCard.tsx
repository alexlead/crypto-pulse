import React from 'react';
import type { Coin } from '../types/crypto';
import { Link } from 'react-router-dom';

interface CoinCardProps {
    coin: Coin;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
}

const CoinCard = React.memo(({ coin, isFavorite, onToggleFavorite }: CoinCardProps) => {

    return (
        <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-2xl hover:border-blue-500/50 transition-all shadow-lg group">
            <div className="flex items-center justify-between mb-4">
                <Link to={`/coin/${coin.id}`} className="flex-1">
                    <div className="flex items-center gap-3">
                        <img src={coin.image} alt={coin.name} className="w-10 h-10 object-contain" />
                        <div>
                            <h3 className="font-bold text-gray-100 leading-tight">{coin.name}</h3>
                            <span className="text-xs text-gray-500 uppercase">{coin.symbol}</span>
                        </div>
                    </div>
                </Link>

                <button
                    onClick={() => onToggleFavorite(coin.id)}
                    className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-500 hover:bg-gray-700'
                        }`}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>

            <div className="flex justify-between items-end">
                <div className="text-xl font-mono font-bold text-blue-400">
                    ${coin.current_price.toLocaleString()}
                </div>
                <div className={`text-sm ${coin.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                </div>
            </div>
        </div>
    );
});

CoinCard.displayName = 'CoinCard';

export default CoinCard;