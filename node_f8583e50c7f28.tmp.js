const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('localhost:3000')
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));



  const porta = process.env.PORT || 3000
  app.listen(porta,()=>{
    console.log('servidor rodando')
  })