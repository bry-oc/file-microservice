const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.port || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});