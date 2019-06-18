const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    //  If url is '/' take input
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1 align="center">Hello User Enter a message</h1>');
        res.write('<form align="center" action="/message" method="POST"><input type="text" name="message"></input><br><button type="submit">Sybmit</button></form>');
        return res.end();
    }
    //  If data is being send to /message only by 'POST'
    if (url === '/message' && method === 'POST') {

        //  Using Buffer to take input, just for practice
        
        const body = [];
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // console.log(message);
            fs.writeFileSync('message.txt', message);
        });

        //  Message is added in meesage.txt file 
        //  Now redirect Page back to '/'
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    //  If user try to inter http://localhost:3000/SomethingHere 
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>You are not on "/"</h1>');
    return res.end();
};


//  4 Methods to export file to main file

//      1. For simple 1 export  
// modeule.exports = requestHandler;

//      2. For Multiple export 
// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded Text'
// };

//      3. Easy syntax
// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded Text';

//      4. Using Node easy syntax
exports.handler = requestHandler;
exports.someText = 'Some hard coded Text';
