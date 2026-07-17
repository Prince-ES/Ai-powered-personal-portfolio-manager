export function formatTransactionAmount(amount) {
    const formattedAmount = amount.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });
    return formattedAmount;
}