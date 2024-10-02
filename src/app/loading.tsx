import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
        </div>
    );
};

export default Loading;
