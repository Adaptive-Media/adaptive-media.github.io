export default defineEventHandler(async (event) => {
    const host = getHeader(event, 'host') || ''
    const country = host.split('.')[0] || 'uk'
    
    const query = getQuery(event)
    
    const params = {
      country: country,
      categoryId: query.categoryId ? String(query.categoryId) : null,
      sortBy: query.sortBy ? String(query.sortBy) : 'popular',
      limit: query.limit ? Number(query.limit) : 8,
      offset: query.offset ? Number(query.offset) : 0,
      filter: query.filter ? JSON.parse(String(query.filter)) : {
        filter1: null,
        filter2: null
      }
    }
    
    const config = useRuntimeConfig()
    const baseUrl = config.public.categoriesApiUrl;
    const apiUrl = `https://${country}.${baseUrl}/products?${new URLSearchParams({
      country: params.country,
      categoryId: params.categoryId || '',
      sortBy: params.sortBy,
      limit: params.limit.toString(),
      offset: params.offset.toString(),
      filter: JSON.stringify(params.filter)
    })}`
    
    try {
      // const response = await $fetch(apiUrl, {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'User-Agent': 'PickBest-App/1.0'
      //   }
      // })
      
      const images = [
        "https://m.media-amazon.com/images/I/51mJySr84UL._SL500_.jpg",
        "https://m.media-amazon.com/images/I/31h1YgxkwuL._SL500_.jpg", 
        "https://m.media-amazon.com/images/I/41ABC123XYZ._SL500_.jpg"
      ]
      
      const brands = ["ALLMAX BATTERY", "Pure", "Samsung", "Sony", "Apple", "Philips", "LG", "Panasonic"]
      const productTitles = [
        "Allmax 9V (6LR61) Maximum Power Alkaline Batteries (4 Count) – Ultra Long-Lasting, Leakproof Design",
        "Classic Stereo HiFi Music System – Internet Radio, DAB+/FM, Bluetooth 5.2, CD Player, USB, Spotify Connect",
        "Wireless Bluetooth Headphones with Active Noise Cancellation, 30H Battery Life",
        "Smart TV 55 4K Ultra HD LED with HDR, Built-in WiFi, Smart Hub",
        "Portable Bluetooth Speaker with Deep Bass, 24H Battery, Waterproof IPX7"
      ]
      
      const products = []
      for (let i = 0; i < params.limit; i++) {
        const productId = params.offset + i + 1
        const priceBaseAmount = Math.floor(Math.random() * 500) + 50
        const discountPercentage = Math.floor(Math.random() * 50) + 10
        const priceAmount = Math.floor(priceBaseAmount * (100 - discountPercentage) / 100)
        const discountAmount = priceBaseAmount - priceAmount
        
        products.push({
          "id": productId + 4450000,
          "refMerchant": `B0${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          "productUrl": `https://www.amazon.co.uk/dp/B0${Math.random().toString(36).substr(2, 8).toUpperCase()}?tag=adaptivemedia-21&linkCode=ogi&th=1&psc=1&language=en_GB`,
          "title": productTitles[productId % productTitles.length] + ` - Product ${productId}`,
          "imagePrimaryUrl": images[productId % images.length],
          "priceCurrency": "GBP",
          "priceAmount": priceAmount,
          "priceBaseAmount": priceBaseAmount,
          "discountAmount": discountAmount,
          "discountPercentage": discountPercentage,
          "isDiscount": true,
          "shippingIsFree": Math.random() > 0.2, // 80% chance free shipping
          "brand": brands[productId % brands.length]
        })
      }

      return products
      
    } catch (error) {
      console.error('API Error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch product list',
        data: {
          originalUrl: apiUrl,
          originalError: error instanceof Error ? error.message : error
        }
      })
    }
  })
