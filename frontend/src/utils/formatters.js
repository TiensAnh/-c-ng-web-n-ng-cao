export function formatCurrencyVnd(value) {
  return new Intl.NumberFormat('vi-VN').format(value);
}

export function formatTourCount(count) {
  return new Intl.NumberFormat('vi-VN').format(count);
}
