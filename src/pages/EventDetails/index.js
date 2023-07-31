import { Header } from '../../components/Header'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { CaretLeft } from 'phosphor-react'
import './styles.css'

export function EventDetails() {
    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if(!state) {
            navigate('/')
        }
    }, [])

    if(!state) {
        return <></>
    }

    return (
        <>
        <Header />
            <h1 className="titulo-detalhes-evento">Detalhes do evento</h1>

            <NavLink className="voltar" to="/">
                <CaretLeft size={24} />
                Voltar para o início
            </NavLink>

            <div className="container-detalhes-evento">
                <img src={state.img} />

                <div>
                    <h2>{state.nome}</h2>
                    <p className="data-evento">Início: {state.dataInicio}</p>
                    <p className="data-evento">Final: {state.dataFinal}</p>

                    <p>{state.descricao}</p>
                    <button>Editar evento</button>
                </div>
            </div>
        </>
    )
}