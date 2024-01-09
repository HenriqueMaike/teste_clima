import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import DarkMode from '../../components/darkMode';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Home() {
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [clima, setClima] = useState();
    const [cidade, setCidade] = useState('');
    const [loading, setLoading] = useState(true)

    //Ciclo de vida para busca a localização pelo IP pela api ipapi.com;
    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                setCity(data.city);
            } catch (error) {
                console.error('Erro ao obter localização:', error);
            }
        };

        getLocation();
    }, []);

    //Ciclo de vida para realizar a requisição na API de clima;
    //Passando parametros com nome da cidade para busca, linguagem e unidade de temperatura sendo celsius as selecionada através do params "metric"
    useEffect(() => {
        async function loadClima() {
            try {
                const response = await api.get("weather", {
                    params: {
                        q: name || city,
                        lang: "pt_br",
                        appid: "a38657a566695e3d288c8bad2a16b91c",
                        units: "metric"
                    }
                });
                setClima(response.data);
                setLoading(false);  //Variavel auxiliar para verificar ser os dados foram recebeido com sucesso, caso não a pagina fica com status loading 
            } catch (error) {
                console.error('Erro ao carregar o clima:', error);
            }
        }
        //condição para verifica se o params nome foi digitado para busca, caso não seja avança do mesmo jeito mas com o nome da cidade obtido pelo IP
        if (name || city) {
            loadClima();
        }
    }, [city, name]);

    //Função para controle do click do botão de busca, para realizar a busca somente se clicar
    function buscarCidade(e) {
        e.preventDefault();

        setName(cidade);
        setCidade('');
    }

    return (
        <div className={styles.container}>
            <DarkMode />
            <div className={styles.containerChild}>
                <form className={styles.form} onSubmit={buscarCidade}>
                    <Form.Control
                        className={styles.input}
                        type="text"
                        placeholder='Digite sua cidade'
                        onChange={(e) => setCidade(e.target.value)}
                        value={cidade}
                    />
                    <Button as="input" type="submit" value="Buscar" />
                </form>

                {/*Funçao para verificar se loading é true, se for os dados nao foram obtidos pela API, se loading for false dos dados são exibidos*/}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                        <CircularProgress />
                    </Box>
                ) : (
                    clima && (
                        <article className={styles.clima} key={clima.city}><br /><br />
                            <strong>{clima.name}</strong>
                            <div>
                                <p>Temperatura: {clima.main.temp} °C</p>
                                <p>Descrição: {clima.weather[0].description}</p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
                                    alt={clima.weather[0].description}
                                />
                                <p>Principal: {clima.weather[0].main}</p>
                            </div>
                        </article>
                    )
                )}
            </div>
        </div>
    );
}

export default Home;