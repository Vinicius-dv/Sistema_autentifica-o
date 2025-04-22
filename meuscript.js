const enviar_cad = document.getElementById('enviar_cad')
const form_cadastro = document.getElementById('form_cadastro')

enviar_cad.addEventListener('click',()=>{
   let valid = true
   const inputs = document.querySelectorAll('body input')

   inputs.forEach(input=>{
    input.classList.remove('error')
   })

   inputs.forEach(input=>{
    if(input.value===''){
        input.classList.add('error')
        valid = false
    }
   })

   if(valid){
    console.log('Dados preenchido com sucesso')
   }
})



form_cadastro.addEventListener('submit',(e)=>{
    e.preventDefault()

    const primeiro_nome = document.getElementById('primeiro_nome').value;
    const ultimo_nome = document.getElementById('ultimo_nome').value;
    const email_id = document.getElementById('email_id').value;
    const senha_id = document.getElementById('senha_id').value;
    const senha_id_confirm = document.getElementById('senha_id_confirm').value;

    if(senha_id!==senha_id_confirm){
        alert('As senhas não conferem')
    }

    fetch('http://localhost:5000/auth/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            name:`${primeiro_nome} ${ultimo_nome}`,
            email:email_id,
            password:senha_id
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(data => {
                alert(data.message || 'Erro ao cadastrar');
            });
        }
    })
    .then(data => {
        if (data && data.message === 'Usuário registrado com sucesso!') {
            const nomeCompleto = `${primeiro_nome} ${ultimo_nome}`;
            window.location.href = `http://localhost:5000/register/success?name=${encodeURIComponent(nomeCompleto)}&email=${encodeURIComponent(email_id)}`
        }
    })
    .catch((error) => {
        console.log('Erro ao cadastrar:', error);
    });
});



