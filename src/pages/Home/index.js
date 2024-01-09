import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [clima, setClima] = useState();
    const [cidade, setCidade] = useState('');

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
            } catch (error) {
                console.error('Erro ao carregar o clima:', error);
            }
        }

        if (name || city) {
            loadClima();
        }
    }, [city, name]);

    function buscarCidade(e) {
        e.preventDefault();

        setName(cidade);
        setCidade('');
    }

    return (
        <div className={styles.container}>
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
                {clima && (
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
                )}
            </div>
        </div>
    );
}

export default Home;