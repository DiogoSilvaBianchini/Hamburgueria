import './style.css'
import { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import useRequest from '../../hooks/useRequest';

const RegisterNewUser = ({setActiveForm, createCheckOut}) => {
    const [stage, setStage] = useState(0)
    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState()
    const [body, setBody] = useState({
        name: "", 
        email: "", 
        phone: "", 
        cep: "",
        numberHouse: ""
    })

    const [address, setAddres] = useState({
        address: "", 
        state: "", 
        city: "", 
        district: "", 
    })

    const { httpRequest } = useRequest()

    const updateBody = (key, value) => {
        let newData = body
        newData[key] = value
        setBody({...newData})
    }
    
    const registerNewUser = async () => {
        const token = await httpRequest("user", "post", body)

        if(token){
            localStorage.setItem("CLIENT_TOKEN", token)
            setActiveForm(false)
            createCheckOut()
        }else{
            console.log(token)
        }
    }

    useEffect(() => {
        const checkCep = async () => {
            const cep = body.cep
            const req = await fetch(`https://viacep.com.br/ws/${cep}/json`)
            const {bairro, estado, localidade, logradouro} = await req.json()
            let newBody = body
            newBody["address"] = bairro
            newBody["state"] = estado
            newBody["city"] = localidade
            newBody["district"] = logradouro
            setAddres({...newBody})  
        }

        body.cep.length >= 8 && checkCep()
    },[body])

    const searchUser = async () => {
        try {
            const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/searchEmail`, {
                headers: {"Content-Type":"application/json"},
                method: "POST",
                body: JSON.stringify({email})
            })

            const res = await req.json()
            if(res.status == 200){
                localStorage.setItem("CLIENT_TOKEN", res.results.token)
                setActiveForm(false)
            }else{
                setErrorEmail(res.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='register-container'>
        {
            stage == 0 ? (
                <div className="wellcome-container">
                    <img src="./burguerMan.png" alt="Hambruguer feliz" />
                    <div className="text">
                        <span>Seja bem-vindo</span>
                        <p>Para continuar precisamos de algumas informações.</p>
                    </div>
                    <button className='darkBtn'>Ainda não possuo registro</button>
                    <button className='outLineBtn' onClick={() => setStage(1)}>Já possuo registro</button>
                </div>
            ): stage == 1 ? (
                <form className='find-mail' onSubmit={(e) => e.preventDefault()}>
                    <img src="./burguerTriste.png" alt="Hambruguer feliz" />
                    <div className="text">
                        <span>Lamentamos pelo ocorrido!</span>
                        <p>Poderia nos dizer o seu endereço de e-mail para identificarmos</p>
                    </div>
                    <label htmlFor="recoverEmail">
                        <span>E-mail</span>
                        <input type="text" id='recoverEmail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <span className='textError'>{errorEmail}</span>
                    </label>
                    <button className='darkBtn' onClick={() => searchUser()}>Buscar</button>
                    <button className='outLineBtn' onClick={() => setStage(1)}>Registrar-se</button>
                </form>
            ):(
                <form onSubmit={(e) => e.preventDefault()} className='register-form'>
                    <h3><PersonIcon/> Identificação</h3>
                    <div className="user-info">
                        <label htmlFor="">
                            <span>Name:</span>
                            <input type="text" value={body.name} onChange={(e) => updateBody("name", e.target.value)}/>
                        </label>
                        <label htmlFor="">
                            <span>E-mail:</span>
                            <input type="text" value={body.email} onChange={(e) => updateBody("email", e.target.value)}/>
                        </label>
                        <label htmlFor="">
                            <span>Celular:</span>
                            <input type="text" value={body.phone} onChange={(e) => updateBody("phone", e.target.value)}/>
                        </label>
                    </div>
                    <h3><HomeIcon /> Informações para a entrega:</h3>
                    <div className="user-info">
                        <label htmlFor="">
                            <span>CEP:</span>
                            <input type="text" value={body.cep} onChange={(e) => updateBody("cep", e.target.value)}/>
                        </label>
                        <label htmlFor="">
                            <span>Rua:</span>
                            <input type="text" value={address.address} onChange={(e) => updateBody("address", e.target.value)}/>
                        </label>
                        <label htmlFor="">
                            <span>N°:</span>
                            <input type="text" value={body.numberHouse} onChange={(e) => updateBody("numberHouse", e.target.value)}/>
                        </label>
                        <label htmlFor="">
                            <span>Bairro:</span>
                            <input type="text" value={address.district} onChange={(e) => updateBody("district", e.target.value)}/>
                        </label>
                        <label htmlFor="">
                            <span>Cidade:</span>
                            <input type="text" value={address.city} onChange={(e) => updateBody("city", e.target.value)}/>
                        </label>
                        <label htmlFor="">
                            <span>Estado:</span>
                            <input type="text" value={address.state} onChange={(e) => updateBody("state", e.target.value)}/>
                        </label>
                    </div>
                    <button className='darkBtn' onClick={registerNewUser}>Registrar</button>
                </form>
            )
        }
    </div>
  )
}

export default RegisterNewUser