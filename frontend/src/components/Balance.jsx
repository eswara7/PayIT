export const Balance = ({ amount }) => {
    return (
        <div className="flex items-center  pl-2 mt-3 ">
            <div className="font-bold text-lg text-gray-800 dark:text-gray-200 ">Account balance</div>
            <div className="font-semibold ml-4 text-lg text-blue-500 dark:text-blue-400">{amount}₹</div>
        </div>
    );
};
