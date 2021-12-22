import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'
import { convertableToString, parseString } from 'xml2js'

function getJson(xml: convertableToString): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(
      xml,
      {
        trim: true,
        explicitArray: false
      },
      (err, data): void => {
        if (err) {
          return reject(err)
        }
        resolve(data['rdf:RDF'])
      }
    )
  })
}

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const params = event.queryStringParameters as unknown as GetEntryOptions
  const baseUrl = 'https://b.hatena.ne.jp'
  let getUrl!: string

  if (params.mode === 'hotentry') {
    getUrl =
      params.category === 'all'
        ? '/hotentry?mode=rss'
        : '/hotentry/' + params.category + '.rss'
  } else if (params.mode === 'entrylist') {
    getUrl =
      params.category === 'all'
        ? '/entrylist?mode=rss'
        : '/entrylist/' + params.category + '.rss'
  }

  try {
    // console.log(event, context)
    const res = await axios.get(getUrl, {
      baseURL: baseUrl,
      params: {
        timestamp: Date.now()
      }
    })
    const xml = res.data
    const json = await getJson(xml)

    return {
      statusCode: 200,
      body: JSON.stringify({
        params,
        content: json
      })
    }
  } catch (error) {
    return {
      statusCode: 500
    }
  }
}
