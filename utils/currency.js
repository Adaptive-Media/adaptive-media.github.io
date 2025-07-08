export const getCurrencySymbol = (currencyCode) => {
  const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CAD': 'C$',
    'AUD': 'A$',
    'CHF': 'CHF',
    'CNY': '¥',
    'SEK': 'kr',
    'NOK': 'kr',
    'DKK': 'kr',
    'PLN': 'zł',
    'CZK': 'Kč',
    'HUF': 'Ft',
    'RUB': '₽',
    'UAH': '₴',
    'INR': '₹',
    'KRW': '₩',
    'BRL': 'R$',
    'MXN': '$',
    'SGD': 'S$',
    'HKD': 'HK$',
    'NZD': 'NZ$',
    'ZAR': 'R',
    'TRY': '₺',
    'ILS': '₪',
    'SAR': 'ر.س',
    'AED': 'د.إ'
  }
  
  return currencySymbols[currencyCode?.toUpperCase()] || currencyCode || '$'
}

export const formatPrice = (amount, currencyCode) => {
  if (!amount && amount !== 0) return ''
  
  const symbol = getCurrencySymbol(currencyCode)
  const formattedAmount = parseFloat(amount).toFixed(2)
  
  return `${symbol}${formattedAmount}`
}

export const formatPriceRange = (minPrice, maxPrice, currencyCode) => {
  const symbol = getCurrencySymbol(currencyCode)
  
  return {
    min: `${symbol}${parseFloat(minPrice).toFixed(2)}`,
    max: `${symbol}${parseFloat(maxPrice).toFixed(2)}`
  }
} 