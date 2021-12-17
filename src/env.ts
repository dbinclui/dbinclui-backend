import dotenv from 'dotenv';

if(process.env.NODE_ENV === 'development'){

    dotenv.config()
    
} else if(process.env.NODE_ENV === 'production'){

    dotenv.config()

} else {
    console.log('Variável de ambiente NODE_ENV não está definida corretamente.')
}