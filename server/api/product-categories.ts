export default defineEventHandler(async (event) => {
    const host = getHeader(event, 'host') || ''
    const country = host.split('.')[0] || 'uk'
    
    const query = getQuery(event)
    
    const params = {
      limit: query.limit ? String(query.limit) : '8',
      offset: query.offset ? String(query.offset) : '0', 
      ...(query.type && { type: String(query.type) })
    }
    
    const config = useRuntimeConfig()
    const apiUrl = `https://${country}.${config.public.categoriesApiUrl}/product-categories?${new URLSearchParams(params)}`
    console.log('API URL:', apiUrl)
    try {
    //   return await $fetch(apiUrl, {
    //     headers: {
    //       'Accept': 'application/json',
    //       'User-Agent': 'PickBest-App/1.0'
    //     }
    //   })

    // Temp mock data:
    return {
        "categories": [
        {
            "id": "1",
            "name": "CategoryTest",
            "translatedName": "Category 1",
            "imageUrl": "https://i.imgur.com/WlTu2Xe.jpeg"
        },
        {
            "id": "2",
            "name": "Category 2",
            "translatedName": "Category 2",
            "imageUrl": "https://i.imgur.com/WlTu2Xe.jpeg"
        },
        {
            "id": "3",
            "name": "Category 3",
            "translatedName": "Category 3",
            "imageUrl": "https://i.imgur.com/oSkl4p2.jpeg"
        },
        {
            "id": "4",
            "name": "Category 4",
            "translatedName": "Category 4",
            "imageUrl": "https://i.imgur.com/SCeZlcr.jpeg"
        },
        {
            "id": "5",
            "name": "Category 5",
            "translatedName": "Category 5",
            "imageUrl": "https://i.imgur.com/oSkl4p2.jpeg"
        },
        {
            "id": "6",
            "name": "Category 6",
            "translatedName": "Category 6",
            "imageUrl": "https://i.imgur.com/SCeZlcr.jpeg"
        },
        {
            "id": "7",
            "name": "Category 7",
            "translatedName": "Category 7",
            "imageUrl": "https://i.imgur.com/WlTu2Xe.jpeg"
        },
        {
            "id": "8",
            "name": "Category 8",
            "translatedName": "Category 8",
            "imageUrl": "https://i.imgur.com/oSkl4p2.jpeg"
        }
        ]
        }
           
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