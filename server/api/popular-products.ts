export default defineEventHandler(async (event) => {
    const host = getHeader(event, 'host') || ''
    const country = host.split('.')[0] || 'uk'
    
    const query = getQuery(event)
    
    const params = {
      limit: query.limit ? String(query.limit) : '8',
      offset: query.offset ? String(query.offset) : '0', 
      categoryId: query.categoryId ? String(query.categoryId) : '0', 
      filter: query.filter ? String(query.filter) : '0', 
      sortBy: query.sortBy ? String(query.sortBy) : 'popular', 
      ...(query.type && { type: String(query.type) })
    }
    
    const config = useRuntimeConfig()
    const apiUrl = `https://${country}.${config.public.categoriesApiUrl}/products?${new URLSearchParams(params)}`
    console.log('API URL:', apiUrl)
    try {
    //   return await $fetch(apiUrl, {
    //     headers: {
    //       'Accept': 'application/json',
    //       'User-Agent': 'PickBest-App/1.0'
    //     }
    //   })

    // Temp mock data:
    return [
        {
            "id": 4452163,
            "refMerchant": "B07TGV51ZG",
            "productUrl": "https://www.amazon.co.uk/dp/B07TGV51ZG?tag=adaptivemedia-21&linkCode=ogi&th=1&psc=1&language=en_GB",
            "title": "Allmax 9V (6LR61) Maximum Power Alkaline Batteries (4 Count) – Ultra Long-Lasting, Leakproof Design, 7-Year Shelf Life, Maximum Performance, Perfect for Smoke Detectors (9 Volt)",
            "imagePrimaryUrl":
            "https://m.media-amazon.com/images/I/51mJySr84UL._SL500_.jpg",
            "priceCurrency": "GBP",
            "priceAmount": 5.99,
            "priceBaseAmount": 9.99,
            "discountAmount": 4,
            "discountPercentage": 40,
            "isDiscount": true,
            "shippingIsFree": true,
            "brand": "ALLMAX BATTERY",
            "description": "Lorem ipsum lorem ipsum",
            "merchant": "amazon"

        },
        {
            "id": 4470439,
            "refMerchant": "B0D2Y19TLX",
            "productUrl":
            "https://www.amazon.co.uk/dp/B0D2Y19TLX?tag=adaptivemedia-21&linkCode=ogi&th=1&psc=1&language=en_GB",
            "title": "Classic Stereo HiFi Music System – Internet Radio, DAB+/FM, Bluetooth 5.2, CD Player, USB, Spotify Connect, AUX, Optical, Phono, Powerful 100W Stereo Sound, Versatile Connectivity – Cotton White/Oak",
            "imagePrimaryUrl":
            "https://m.media-amazon.com/images/I/31h1YgxkwuL._SL500_.jpg",
            "priceCurrency": "GBP",
            "priceAmount": 349,
            "priceBaseAmount": 449,
            "discountAmount": 100,
            "discountPercentage": 22,
            "isDiscount": true,
            "shippingIsFree": true,
            "brand": "Pure",
            "description": "Lorem ipsum lorem ipsum",
            "merchant": "amazon"

        },
        {
            "id": 4453046,
            "refMerchant": "B086JBRQC1",
            "productUrl": "https://www.amazon.co.uk/dp/B086JBRQC1?tag=adaptivemedia-21&linkCode=ogi&th=1&psc=1&language=en_GB",
            "title": "Bingfu 4G LTE Antenna SMA Aerial 7dBi Magnetic Base MIMO Antenna (2-Pack) for Vodafone O2 Three EE Huawei Netgear TP-Link 4G LTE Router Gateway Modem Hotspot Wireless Router Hub",
            "imagePrimaryUrl": "https://m.media-amazon.com/images/I/318fodQAmYS._SL500_.jpg",
            "priceCurrency": "GBP",
            "priceAmount": 14.99,
            "priceBaseAmount": 17.98,
            "discountAmount": 2.99,
            "discountPercentage": 17,
            "isDiscount": true,
            "shippingIsFree": true,
            "brand": "Bingfu",
            "description": "Lorem ipsum lorem ipsum",
            "merchant": "amazon"

        },
        {
            "id": 4453046,
            "refMerchant": "B086JBRQC1",
            "productUrl":
            "https://www.amazon.co.uk/dp/B086JBRQC1?tag=adaptivemedia-21&linkCode=ogi&th=1&psc=1&language=en_GB",
            "title": "Bingfu 4G LTE Antenna SMA Aerial 7dBi Magnetic Base MIMO Antenna (2-Pack) for Vodafone O2 Three EE Huawei Netgear TP-Link 4G LTE Router Gateway Modem Hotspot Wireless Router Hub",
            "imagePrimaryUrl": "https://m.media-amazon.com/images/I/318fodQAmYS._SL500_.jpg",
            "priceCurrency": "GBP",
            "priceAmount": 14.99,
            "priceBaseAmount": 17.98,
            "discountAmount": 2.99,
            "discountPercentage": 17,
            "isDiscount": true,
            "shippingIsFree": true,
            "brand": "Bingfu",
            "description": "Lorem ipsum lorem ipsum",
            "merchant": "ebay"

        },
        {
            "id": 4453046,
            "refMerchant": "B086JBRQC1",
            "productUrl":
            "https://www.amazon.co.uk/dp/B086JBRQC1?tag=adaptivemedia-21&linkCode=ogi&th=1&psc=1&language=en_GB",
            "title": "Bingfu 4G LTE Antenna SMA Aerial 7dBi Magnetic Base MIMO Antenna (2-Pack) for Vodafone O2 Three EE Huawei Netgear TP-Link 4G LTE Router Gateway Modem Hotspot Wireless Router Hub",
            "imagePrimaryUrl": "https://m.media-amazon.com/images/I/318fodQAmYS._SL500_.jpg",
            "priceCurrency": "GBP",
            "priceAmount": 14.99,
            "priceBaseAmount": 17.98,
            "discountAmount": 2.99,
            "discountPercentage": 17,
            "isDiscount": true,
            "shippingIsFree": true,
            "brand": "Bingfu",
            "description": "Lorem ipsum lorem ipsum",
            "merchant": "amazon"

        },
        {
            "id": 4453046,
            "refMerchant": "B086JBRQC1",
            "productUrl": "https://www.amazon.co.uk/dp/B086JBRQC1?tag=adaptivemedia-21&linkCode=ogi&th=1&psc=1&language=en_GB",
            "title": "Bingfu 4G LTE Antenna SMA Aerial 7dBi Magnetic Base MIMO Antenna (2-Pack) for Vodafone O2 Three EE Huawei Netgear TP-Link 4G LTE Router Gateway Modem Hotspot Wireless Router Hub",
            "imagePrimaryUrl": "https://m.media-amazon.com/images/I/318fodQAmYS._SL500_.jpg",
            "priceCurrency": "GBP",
            "priceAmount": 14.99,
            "priceBaseAmount": 17.98,
            "discountAmount": 2.99,
            "discountPercentage": 17,
            "isDiscount": true,
            "shippingIsFree": true,
            "brand": "Bingfu",
            "description": "Lorem ipsum lorem ipsum",
            "merchant": "ebay"

        }
]
           
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch product categories',
        data: {
          originalUrl: apiUrl,
          originalError: error instanceof Error ? error.message : error
        }
      })
    }
  })