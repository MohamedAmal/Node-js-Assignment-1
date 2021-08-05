const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    let body = ''
    const pathname = req.url
    if (pathname === '/add' && req.method === 'POST') {

        req.on('data', (data) => {
            body += JSON.parse(data).data
            console.log(body, 1)
        })
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(body, () => {
                res.end()
            })
            console.log(body, 2)
            // const content = body.data
            // console.log(content)
            fs.writeFileSync('input.txt',body , err => {
                if (err) {
                    console.error(err)
                    return
                }
                console.error('file written successfully')
            })
        })
    }
    else if (pathname === '/read') {
        fs.readFile('input.txt', (err, data) => {
            res.write(data.toString())
            res.end()
        })
    }

})
server.listen(9000)