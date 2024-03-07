const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

const { AllRoutes } = require('./routes/Allroutes');

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", AllRoutes)



app.listen(process.env.port, () => {
    console.log(`Server is running on port ${process.env.port}`);
})