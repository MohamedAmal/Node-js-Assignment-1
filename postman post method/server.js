const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    const pathname = req.url
    console.log(pathname, 'aaa')
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    if (pathname === '/') {
        res.write('hello world')
        res.end()

    } else if (pathname === '/input.txt') {
        fs.readFile('input.txt', (err, data) => {
            res.write(data.toString())
            res.end()
        })
    }
    fs.stat('input.txt', (err, stats) => {
        if (err) {
            console.error(err)
            console.error(stats, 'this is staaaaaaaats')
            return
        }
        console.log(stats.isFile())
        console.log(stats.isDirectory())
        console.log(stats.isSymbolicLink())
        console.log(stats.size)
    })

})
server.listen(5000)