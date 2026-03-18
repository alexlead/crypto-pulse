import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="p-5 bg-gray-800/30 border border-gray-700/50 rounded-2xl shadow-lg animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                    <div className="space-y-2">\
                        <div className="h-4 w-24 bg-gray-700 rounded-sm"></div>
                        <div className="h-3 w-12 bg-gray-700 rounded-sm"></div>
                    </div>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            </div>

            <div className="flex justify-between items-end mt-6">
                <div className="h-6 w-20 bg-gray-700 rounded-sm"></div>
                <div className="h-4 w-12 bg-gray-700 rounded-sm"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;