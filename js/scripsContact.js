document.addEventListener('DOMContentLoaded', ()=>{
    const datosForm = {
        name: '',
        email: '',
        message: '',
    };
    
    const inputName = document.querySelector('#name');
    const inputEmail = document.querySelector('#email');
    const inputMessage = document.querySelector('#message');
    const btnEnviar = document.querySelector('form button[type="submit"]');
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');

    formulario.addEventListener('submit', enviarFormulario);
    inputName.addEventListener('input',validar);
    inputEmail.addEventListener('input',validar);
    inputMessage.addEventListener('input',validar);

    function enviarFormulario(e){
        e.preventDefault();
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.add('hidden');
            resetearDatos();

            const alertaExito = document.createElement('P');
            alertaExito.textContent = 'Mensaje enviado exitosamente';
            alertaExito.classList.add('enviadoExito');
            e.target.parentElement.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 2000);
            
        }, 3000);


        
    };


    function validar(e){
        if(e.target.value.trim() === ""){
            mostrarAlerta('*Campo Obligatorio',e.target.parentElement);
            datosForm[e.target.name] = "";
            comprobarDatos();
            return;
        };
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('*Email no valido',e.target.parentElement);
            datosForm[e.target.name]="";
            comprobarDatos();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        datosForm[e.target.name]= e.target.value.trim().toLowerCase();

        comprobarDatos();

    };

    function mostrarAlerta(mensaje,referencia){
        limpiarAlerta(referencia);

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('form-alert');
        referencia.insertBefore(error,referencia.children[1]);
    };

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.form-alert');
        if(alerta){
            alerta.remove();
        };
    };

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const res = regex.test(email);
        return res;
    }

    function comprobarDatos(){
        if(Object.values(datosForm).includes("")){
            btnEnviar.classList.add('disabled');
            btnEnviar.disabled = true;
            return;
        };

        btnEnviar.classList.remove('disabled');
        btnEnviar.disabled = false;
    };

    function resetearDatos(){
        datosForm.name = '';
        datosForm.email = '';
        datosForm.message='';
        formulario.reset();
        comprobarDatos();
    };


});