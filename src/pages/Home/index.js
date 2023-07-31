import './styles.css';
import { Header } from '../../components/Header';
import { EventCard } from '../../components/EventCard';
import { useState, useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';
import { EventTypeDisplay } from '../../components/EventTypeDisplay';
import { eventsTypes } from "../../data/events-type"

/* não pode modificar a variavel em tempo rodando */
const eventosEstaticos = [
  {
    id: 1,
    nome: "Protesto pelas férias de três meses",
    dataInicio: "SEX, 31/12/12",
    img: "https://www.prefeitura.sp.gov.br/cidade/secretarias/upload/desenvolvimento/foto%20divulga%C3%A7%C3%A3o%20lollapalooza.jpg"
  },
  {
    id: 2,
    nome: "Reforço em API Javascript",
    dataInicio: "QUI, 06/07/2023",
    img: "https://media.starlightcms.io/workspaces/pague-menos/portal-sempre-bem/optimized/istock-1227545308-ya8rnoqcq7.jpeg"
  },
  {
    id: 3,
    nome: "São Jõao",
    dataInicio: "SEX, 23/06/2023",
    img: "https://media.starlightcms.io/workspaces/pague-menos/portal-sempre-bem/optimized/istock-1227545308-ya8rnoqcq7.jpeg"
  },
]

export function Home() {
  const state = JSON.parse(localStorage.getItem('eventos:1.0')) //json

  const [eventos, setEventos] = useState(state ?? eventosEstaticos)
  const [nome, setNome] = useState("")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFinal, setDataFinal] = useState("")
  const [descricao, setDescricao] = useState("")
  const [img, setImg] = useState("")

  function handleUploadIMG(e) {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setImg(reader.result)
  }

  function criarNovoEvento(e) {
    e.preventDefault()

    const id = eventos.length > 0 ? eventos[eventos.length - 1].id + 1 : 1

    const novoEvento = {
      id,
      nome, 
      dataInicio: formatDate(dataInicio), 
      dataFinal: formatDate(dataFinal), 
      img,
      descricao
    }

    setEventos([...eventos, novoEvento])    

    setImg('')
    e.target.reset() //limpar os campos do  formulário
  }

  function deletarEvento(id) {
    let confirmar = window.confirm("Tem certeza de que deseja excluir o evento?")

    if(confirmar) {
      const eventosAtualizados = eventos.filter(evento => evento.id !== id)

      setEventos(eventosAtualizados)
    }

  }

  function apagarTudo() {
    if(window.confirm("Tem certeza disso?")) {
      if(window.confirm("Meu pivete, isso vai apagar tudo, tu ta ligado?")) {
        setEventos([])
      }
    }
  }

  useEffect(() => {
    localStorage.setItem('eventos:1.0', JSON.stringify(eventos))
  }, [eventos])

  return (
    <> {/* o fragmento serve para envolver meus elementos html para que eles 
    tenham um pai presente */}

      <Header />

      <h1 className='home-title'>Bem vindo ao site de eventos!</h1>
      <button onClick={apagarTudo}>Apagar tudo</button>

      <div className='events-types'>

        {eventsTypes.map(eventType => {
          return (
            <EventTypeDisplay 
              key={eventType.name}
              name={eventType.name}
              photo={eventType.photo}
            />
          )
        })}

      </div>

      <section className='container'>
        <form onSubmit={criarNovoEvento}>
          <div>
            <label htmlFor='nome'>Nome</label>
            <input 
              type='text' 
              id='nome' 
              onChange={(e) => setNome(e.target.value)} 
              />
          </div>
          <div>
            <label htmlFor='data'>Data Início</label>
            <input 
              type='datetime-local' 
              id='data_inicio' 
              onChange={(e) => { setDataInicio(e.target.value)}} 
              />
          </div>
          <div>
            <label htmlFor='data'>Data Final</label>
            <input 
              type='datetime-local' 
              id='data_final' 
              onChange={(e) => { setDataFinal(e.target.value)}} 
              />
          </div>
          <div>
            <label htmlFor='descricao'>Descrição</label>
            <input 
              type='text' 
              id='descricao' 
              onChange={(e) => { setDescricao(e.target.value)}} 
            />
          </div>
          <div className='label-imagem'>
            <label htmlFor='imagem'>Selecione a imagem do evento</label>
            <input onChange={handleUploadIMG} type='file' id='imagem' />
          </div>
          
          <div className='preview-imagem'>
            <img style={{display: img ? 'block' : 'none'}} src={img} alt='preview da imagem do evento' />
          </div>

          <button>Cadastrar evento</button>
        </form>

        <div className='container-eventos'>

          {eventos.map(evento => {
            return (
              <EventCard 
                key={evento.id}
                id={evento.id}
                nome={evento.nome}
                dataInicio={evento.dataInicio}
                dataFinal={evento.dataFinal}
                img={evento.img}
                descricao={evento.descricao} //mudei aqui
                deletarEvento={deletarEvento}
              />
            )
          })}

        </div>
      </section>
    </>
  );
}

/* export App; */
