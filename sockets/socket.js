const Usuario=require("../modelos/usuario");
function socket(io){
    io.on("connection",(socket)=>{
        //MOSTRAR USUARIOS
        mostrarUsuarios();
        async function mostrarUsuarios(){
            const usuarios=await Usuario.find();
            io.emit("servidorEnviarUsuarios", usuarios);
        }
        
        //GUARDAR USUARIO
        socket.on("clienteGuardarUsuario", async(usuario)=>{
            try{
                await new Usuario(usuario).save();
                io.emit("servidorUsuarioGuardado","Usuario guardado");
            }
            catch(err){
                console.log("Error al registrar al usuario "+err);
            }
        });

    });//FIN IO.ON
}
module.exports=socket;