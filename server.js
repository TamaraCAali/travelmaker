const express = require('express')

app.use(express.static('dist'));




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port} !`)
});
