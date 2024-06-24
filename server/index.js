const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config({path: '/Users/neog/Desktop/project-management-tool/server/enviro.env'})

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server running on port ${port}`))

const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
