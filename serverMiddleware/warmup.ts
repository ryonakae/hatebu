import { IncomingMessage, ServerResponse } from 'http'

export default (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200)
  res.end()
}
