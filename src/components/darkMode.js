import styles from "./styles.module.scss";
import React from "react";

const DarkMode = () => {

    //Função para atribuir valor Dark ao body via dom
    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
    };

    //Função para atribuir valor light ao body via dom
    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light");
    };

    //funçao para selecionar o modo dark ou light
    const toggleTheme = (e) => {
        if (e.target.checked) setDarkMode();
        else setLightMode();
    }

    //O modo dark é atribuido no CSS no diretorio pages/Home/styles.module.scss através do estilo [data-theme="dark"]
    return (
        <div className={styles.darkMode}>
            <input
                className={styles.darkModeInput}
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
            />
            <label className={styles.darkModeLabel} for='darkmode-toggle' />
        </div>
    );
};

export default DarkMode;
