const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');
const cors = require('cors');
const mongoDBURL = 'mongodb://localhost:27017/banco_dados';
const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://127.0.0.1:5500', 
  methods: ['GET', 'POST'],
  credentials:true
};
app.use(cors(corsOptions));

app.use(express.static(__dirname + '/public'));





mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));


  app.post('/auth/register', (req, res) => {
    const { name, email, password } = req.body;
  
    User.findOne({ email })
      .then((userExists) => {
        if (userExists) {
          return res.status(400).json({ message: 'Usuário já registrado' });
        }
  
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.error('Erro ao gerar o salt:', err);
            return res.status(500).json({ message: 'Erro ao registrar o usuário' });
          }
          
          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
              console.error('Erro ao criar o hash:', err);
              return res.status(500).json({ message: 'Erro ao registrar o usuário' });
            }
  
            const newUser = new User({
              name,
              email,
              password: hashedPassword,
            });
  
            newUser.save()
              .then(() => {
                res.status(201).json({ message: 'Usuário registrado com sucesso!' });
              })
              .catch((error) => {
                console.error('Erro ao salvar o usuário:', error);
                res.status(500).json({ message: 'Erro ao registrar o usuário' });
              });
          });
        });
      })
      .catch((error) => {
        console.error('Erro ao verificar usuário existente:', error);
        res.status(500).json({ message: 'Erro ao verificar o usuário' });
      });
  });
  

app.post('/auth/login',(req,res)=>{
  const {password,email} =req.body

  User.findOne({email})
  .then((user)=>{
    if(!user){
      return res.status(400).json({message:'Usuario não encontrado'})
    }

    bcrypt.compare(password,user.password,(err,isMatch)=>{
        if(err){
          console.error('Erro ao comparar as senhas'+err)
          return res.status(500).json({message:'Erro no servidor'})
        }

        if(!isMatch){
          return res.status(400).json({message:'Senha incorreta!'})
        }
        return res.status(200).json({message:'Login bem-sucedido!',user})
    })
  })
  .catch((error)=>{
    console.error('Deu algo errado',error)
    res.status(500).json({message:'Erro no servidor'})
  })
})


app.get('/register/success', (req, res) => {
  res.sendFile(__dirname + '/public/success.html'); 
})

app.get('/register/success_login', (req, res) => {
  res.sendFile(__dirname + '/public/success_login.html'); 
})






const porta = process.env.PORT || 5000;
app.listen(porta, () => {
  console.log('Servidor rodando na porta', porta);
});
