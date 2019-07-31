
function getTopicCount(topic) {
	const https = require('https');
    https.get(topic, (res) => {
        let rawData = '';
        res.on('data', (d) => {
            rawData += d;
        });
        res.on('end', () => {
            try {
                const parseData = JSON.parse(rawData);
              //  console.log(parseData)
               // console.log(parseData.parse
                //              .text['*']
                 //             .search(new RegExp(parseData.parse.title, 'i')));
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (err) => {
        console.log("Error:" + err.message);
    });
}


//let topic = 'https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=pizza';
let topic = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
getTopicCount(topic);


