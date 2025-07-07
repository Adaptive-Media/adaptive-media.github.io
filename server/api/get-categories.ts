export default defineEventHandler(async (event) => {
    const host = getHeader(event, 'host') || ''
    const country = host.split('.')[0] || 'uk'
    
    const query = getQuery(event)
    
    const params = {
      country: country,
      limit: query.limit ? Number(query.limit) : 16,
      offset: query.offset ? Number(query.offset) : 0,
    }
    
    const config = useRuntimeConfig()
    const baseUrl = config.public.categoriesApiUrl;
    const apiUrl = `https://${country}.${baseUrl}/product-categories?${new URLSearchParams({
      country: params.country,
      limit: params.limit.toString(),
      offset: params.offset.toString()
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
        "https://i.imgur.com/SCeZlcr.jpeg",
        "https://i.imgur.com/oSkl4p2.jpeg", 
        "https://i.imgur.com/WlTu2Xe.jpeg"
      ]
      
      const categories = []
      for (let i = 0; i < params.limit; i++) {
        const categoryId = params.offset + i + 1
        categories.push({
          "id": categoryId.toString(),
          "name": `Category ${categoryId}`,
          "translatedName": `Category ${categoryId}`,
          "imageUrl": images[categoryId % images.length]
        })
      }

      return {
        "categories": categories
        }
      
    } catch (error) {
      console.error('API Error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch pagination data',
        data: {
          originalUrl: apiUrl,
          originalError: error instanceof Error ? error.message : error
        }
      })
    }
  }) 