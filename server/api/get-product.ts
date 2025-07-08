export default defineEventHandler(async (event) => {
    const host = getHeader(event, 'host') || ''
    const country = host.split('.')[0] || 'uk'
    
    const query = getQuery(event)
    
    const params = {
      country: country,
      productId: query.productId ? String(query.productId) : ''
    }
    
    const config = useRuntimeConfig()
    const baseUrl = config.public.categoriesApiUrl;
    const apiUrl = `https://${country}.${baseUrl}/product-data?${new URLSearchParams({
      country: params.country,
      productId: params.productId
    })}`
    
    try {
      // const response = await $fetch(apiUrl, {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'User-Agent': 'PickBest-App/1.0'
      //   }
      // })
      
      const productId = parseInt(params.productId) || 1
      
      const brands = ["VARTA", "Duracell", "Energizer", "Samsung", "Sony", "Panasonic", "Philips", "LG"]
      const categories = [
        { text: "Electronics", name: "Electronics" },
        { text: "Home & Garden", name: "Home Garder" }, 
        { text: "Sports & Outdoors", name: "Sports & Outdoors" },
        { text: "Tools & Hardware", name: "Tools & Hardware" },
        { text: "Automotive", name: "Automotive" }
      ]
      const colors = ["Blue Silver", "Black", "White", "Red", "Green", "Silver", "Gold", "Blue"]
      
      const images = [
        "https://m.media-amazon.com/images/I/418vwpeNe6L._SL500_.jpg",
        "https://m.media-amazon.com/images/I/41zvHUoONvL._SL500_.jpg",
        "https://m.media-amazon.com/images/I/412jwkbvcPL._SL500_.jpg",
        "https://m.media-amazon.com/images/I/51mJySr84UL._SL500_.jpg",
        "https://m.media-amazon.com/images/I/31h1YgxkwuL._SL500_.jpg"
      ]

      const titles = [
        "Alkaline Battery Pack - Long-Lasting Power Solution",
        "Premium Electronic Device - High Quality Performance", 
        "Professional Grade Equipment - Industry Standard",
        "Advanced Technology Product - Next Generation Design",
        "Reliable Power Source - Dependable Performance"
      ]

      const priceBaseAmount = Math.floor(Math.random() * 500) + 20
      const discountPercentage = Math.floor(Math.random() * 60) + 10
      const priceAmount = parseFloat((priceBaseAmount * (100 - discountPercentage) / 100).toFixed(2))
      const discountAmount = parseFloat((priceBaseAmount - priceAmount).toFixed(2))
      
      // Данные для слайдера цен
      const minPrice = parseFloat((priceAmount * 0.7).toFixed(2))
      const maxPrice = parseFloat((priceAmount * 1.8).toFixed(2))
      
      const selectedBrand = brands[productId % brands.length]
      const selectedCategory = categories[productId % categories.length]
      const selectedColor = colors[productId % colors.length]
      const selectedImage = images[productId % images.length]
      const selectedTitle = titles[productId % titles.length]

      return {
        "id": productId,
        "merchantId": 10000000 + (productId % 100),
        "offerAt": "2025-05-08T21:48:55Z",
        "syncSuccessAt": "2025-05-16T12:22:50.537541Z",
        "refMerchant": `B0${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        "refGtin": `${Math.floor(Math.random() * 9000000000000) + 1000000000000}`,
        "refMpn": `${selectedBrand.substr(0, 3).toUpperCase()}${Math.floor(Math.random() * 1000)}`,
        "productUrl": `https://www.amazon.co.uk/dp/B0${Math.random().toString(36).substr(2, 8).toUpperCase()}?tag=testhut-21&linkCode=ogi&th=1&psc=1`,
        "title": `${selectedBrand} ${selectedTitle} - Product ${productId}`,
        "description": `High-quality ${selectedTitle.toLowerCase()} from ${selectedBrand}. Professional grade product with premium materials and advanced technology. Perfect for everyday use with guaranteed reliability and long-lasting performance. Suitable for various applications and backed by manufacturer warranty. Professional grade product with premium materials and advanced technology. Perfect for everyday use with guaranteed reliability and long-lasting performance. Suitable for various applications and backed by manufacturer warranty. Professional grade product with premium materials and advanced technology. Perfect for everyday use with guaranteed reliability and long-lasting performance. Suitable for various applications and backed by manufacturer warranty.`,
        "imagePrimaryUrl": selectedImage,
        "imageVariantUrls": [
          selectedImage,
          images[(productId + 1) % images.length],
          images[(productId + 1) % images.length],
          images[(productId + 2) % images.length]
        ],
        "comparePrices": [
          {
            "provider": "Amazon",
            "title": titles[productId % titles.length],
            "price": parseFloat((priceAmount * (0.9 + Math.random() * 0.2)).toFixed(2)),
            "condition": "New",
            "currency": "GBP",
            "basePrice": parseFloat((priceBaseAmount * (1.0 + Math.random() * 0.3)).toFixed(2)),
            "isFreeShipping": Math.random() > 0.5 ? true : '5',
            "productUrl": `https://www.amazon.co.uk/dp/B0${Math.random().toString(36).substr(2, 8).toUpperCase()}?tag=testhut-21&linkCode=ogi&th=1&psc=1`,
          },
          {
            "provider": "ebay",
            "title": titles[productId % titles.length],
            "price": parseFloat((priceAmount * (0.8 + Math.random() * 0.4)).toFixed(2)),
            "condition": "New",
            "currency": "GBP",
            "basePrice": parseFloat((priceBaseAmount * (1.1 + Math.random() * 0.2)).toFixed(2)),
            "isFreeShipping": '3.99',
            "productUrl": `https://www.ebay.co.uk/dp/B0${Math.random().toString(36).substr(2, 8).toUpperCase()}?tag=testhut-21&linkCode=ogi&th=1&psc=1`,
          },
          {
            "provider": "Amazon",
            "title": titles[productId % titles.length],
            "price": parseFloat((priceAmount * (0.95 + Math.random() * 0.15)).toFixed(2)),
            "condition": "New",
            "currency": "GBP",
            "basePrice": parseFloat((priceBaseAmount * (1.05 + Math.random() * 0.25)).toFixed(2)),
            "isFreeShipping": Math.random() > 0.5 ? true : '5',
            "productUrl": `https://www.amazon.co.uk/dp/B0${Math.random().toString(36).substr(2, 8).toUpperCase()}?tag=testhut-21&linkCode=ogi&th=1&psc=1`,
          },
          {
            "provider": "ebay",
            "title": titles[productId % titles.length],
            "price": parseFloat((priceAmount * (0.85 + Math.random() * 0.3)).toFixed(2)),
            "condition": "New",
            "currency": "GBP",
            "basePrice": parseFloat((priceBaseAmount * (1.0 + Math.random() * 0.4)).toFixed(2)),
            "isFreeShipping": Math.random() > 0.5 ? true : '5',
            "productUrl": `https://www.ebay.co.uk/dp/B0${Math.random().toString(36).substr(2, 8).toUpperCase()}?tag=testhut-21&linkCode=ogi&th=1&psc=1`,
          },
        ],
        "priceCurrency": "GBP",
        "priceAmount": priceAmount,
        "priceBaseAmount": priceBaseAmount,
        "discountAmount": discountAmount,
        "discountPercentage": discountPercentage,
        "isDiscount": discountPercentage > 0,
        "conditionCode": "new_",
        "conditionText": "New",
        "availabilityCode": "in_stock",
        "availabilityText": "In stock",
        "isAvailable": true,
        "shippingIsFree": Math.random() > 0.3,
        "shippingCostText": null,
        "brand": selectedBrand,
        "categoryCode": Math.random() > 0.5 ? 1 : 2,
        "categoryText": selectedCategory.text,
        "categoryName": selectedCategory.name,
        "provider": Math.random() > 0.5 ? "Amazon" : "Ebay",
        "priceRange": {
          "minPrice": minPrice,
          "maxPrice": maxPrice
        },
        "isAdult": false,
        "colorCode": null,
        "colorText": selectedColor,
        "reviewCount": Math.floor(Math.random() * 500) + 10,
        "rating": parseFloat((Math.random() * 2 + 3).toFixed(1)),
        "extraDataJson": {
          "Size": {
            "Label": "Size",
            "Locale": "en_GB",
            "DisplayValue": `${Math.floor(Math.random() * 10) + 1} Units`
          },
          "Color": {
            "Label": "Color",
            "Locale": "en_GB",
            "DisplayValue": selectedColor
          },
          "UnitCount": {
            "Label": "NumberOfItems",
            "Locale": "en_US",
            "DisplayValue": Math.floor(Math.random() * 5) + 1
          },
          "ReleaseDate": {
            "Label": "ReleaseDate",
            "Locale": "en_US",
            "DisplayValue": `${2015 + Math.floor(Math.random() * 10)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}T00:00:01Z`
          },
          "IsAdultProduct": {
            "Label": "IsAdultProduct",
            "Locale": "en_US",
            "DisplayValue": false
          },
          "ItemDimensions": {
            "Width": {
              "Unit": "Inches",
              "Label": "Width",
              "Locale": "en_GB",
              "DisplayValue": parseFloat((Math.random() * 10 + 1).toFixed(1))
            },
            "Height": {
              "Unit": "Inches",
              "Label": "Height",
              "Locale": "en_GB",
              "DisplayValue": parseFloat((Math.random() * 10 + 1).toFixed(1))
            },
            "Length": {
              "Unit": "Inches",
              "Label": "Length",
              "Locale": "en_GB",
              "DisplayValue": parseFloat((Math.random() * 10 + 1).toFixed(1))
            },
            "Weight": {
              "Unit": "Pounds",
              "Label": "Weight",
              "Locale": "en_GB",
              "DisplayValue": parseFloat((Math.random() * 5).toFixed(8))
            }
          }
        }
      }
      
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
