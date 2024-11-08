export const Balance = ({ amount }) => {
    return (
        <div className="flex pl-2 pt-2">
            <div className="font-bold text-lg">Your balance</div>
            <div className="font-semibold ml-4 text-lg">{amount}₹</div>
        </div>
    );
};
