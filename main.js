'use strict';

const limparForm = (endereco) => {
    document.getElementById('cidade').value = '';
    document.getElementById('endereco').value ='';
    document.getElementById('bairro').value = '';
}

const completarForm = (endereco) => {
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
}

const validaNum = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && validaNum(cep);

const buscarCep = async () => {
    limparForm();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados =  await fetch(url);
        const endereco = await dados.json()
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        } else {
            completarForm(endereco);
        }

    } else {
        document.getElementById('endereco').value = 'CEP inválido!';
    }
    
    
    
}

document.getElementById('cep').addEventListener('focusout' ,buscarCep);

