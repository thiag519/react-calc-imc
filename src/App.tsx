import styles from './App.module.css';
import logoIMC from './assets/logoIMC.jpg';
import leftArrowImage from './assets/left-arrow.png';

import { useState } from 'react';
import { levels, calculateImc, Level } from './helpers/imc';
import {GridItem } from './components/GridIntens/GridItem'

const  App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField && !toShow) {
      setToShow(calculateImc(heightField, weightField));

    }else {
      heightField && weightField ?
      alert('Clique na seta abaixo para voutar')
        :
      alert('Preencha todo os campos corretamente.')
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={logoIMC} alt="" width={150} height={75} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>
            IMC é a sigla de Índice de Massa Corporal, um parâmetro
            que é utilizado para avaliar se 
            o peso está dentro do valor ideal para a altura.
          </p>
 
          <input 
            type="number" 
            placeholder="Digite sua altura .Ex: 1.75 (em metros)"
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow  ? true : false}
          />
          <input 
            type="number" 
            placeholder="Digite seu peso .Ex: 77.3 (em kg)"
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow  ? true : false}
          />

          <button 
            onClick={handleCalculateButton}
            disabled={toShow  ? true : false}
          >Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map( (level, index) => 
                <GridItem 
                  key={index}
                  item={level}
                />
              )}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt='' width={40}/>
              </div>
              <GridItem item={toShow}/>
            </div>
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
