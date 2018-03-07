const express = require('express');
const app = express();
const port = process.env.PORT || 4200;
app.use(express.static(__dirname + '/dist'));

app.get('*',(req,res)=>{
    res.sendFile(__dirname + '/dist/index.html');
});


app.listen(port, () => { console.log(`http://localhost:${port}`) });