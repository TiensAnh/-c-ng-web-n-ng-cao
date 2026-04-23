export const BANK_TRANSFER_CONFIG = {
  bankName: import.meta.env.VITE_BANK_NAME || 'MB Bank',
  bankCode: import.meta.env.VITE_BANK_CODE || 'MB',
  accountName: import.meta.env.VITE_BANK_ACCOUNT_NAME || 'ADN TRAVEL',
  accountNumber: import.meta.env.VITE_BANK_ACCOUNT_NUMBER || '123456789',
};

export function buildBookingTransferReference(bookingId) {
  return `BK-${bookingId}`;
}

export function buildTransferQrUrl({ bookingId, amount }) {
  const normalizedAmount = Number(amount || 0);
  const addInfo = encodeURIComponent(buildBookingTransferReference(bookingId));
  const accountName = encodeURIComponent(BANK_TRANSFER_CONFIG.accountName);

  return `https://img.vietqr.io/image/${BANK_TRANSFER_CONFIG.bankCode}-${BANK_TRANSFER_CONFIG.accountNumber}-compact2.png?amount=${normalizedAmount}&addInfo=${addInfo}&accountName=${accountName}`;
}
