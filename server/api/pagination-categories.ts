export default defineEventHandler(async (event) => {
    const host = getHeader(event, 'host') || ''
    const country = host.split('.')[0] || 'uk'
    
    const query = getQuery(event)
    
    const params = {
      country: country,
      type: 'categories',
    }
    
    const config = useRuntimeConfig()
    const baseUrl = config.public.categoriesApiUrl;
    const apiUrl = `https://${country}.${baseUrl}/pagination-data?${new URLSearchParams(params)}`
    
    try {
      // const response = await $fetch(apiUrl, {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'User-Agent': 'PickBest-App/1.0'
      //   }
      // })
      
      return {
          "totalCategoryCount": 100
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