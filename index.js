const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const userRoutes = require('./routes/users');
mongoose.connect('mongodb://localhost:27017/ITI_MEARN');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);
app.use('*',(req,res,next)=>{
    res.status(404).json({error:'NOT_FOUND'});
});
app.use((err,req,res,next)=>{
    res.json(err);
})
app.listen(3000, () => {
    console.log('App is running');
});
