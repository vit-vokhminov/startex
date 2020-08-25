import React from 'react';
import './App.css';


function App(props) {

    const ws = new WebSocket('ws://localhost:3001');
    ws.onmessage = response => alert(response.data);

    const [cargoPackage, setCargoPackage] = React.useState(
        [{cargoLength: "", cargoWidth: "", cargoHeight: "", cargoWeight: ""}]
    );

    const addCargo = () => {
        setCargoPackage([...cargoPackage, {cargoLength: "", cargoWidth: "", cargoHeight: "", cargoWeight: ""}])
    };

    const inputChange = (i, e) => {
        const {name, value} = e.target;
        let newCargoPackage = [...cargoPackage];
        newCargoPackage[i] = {...newCargoPackage[i], [name]: value};
        setCargoPackage(newCargoPackage);
    };

    const removeCargoPackage = (i) => {
        let newCargoPackage = [...cargoPackage];
        newCargoPackage.splice(i, 1);
        setCargoPackage(newCargoPackage);
    };

    const submitForm = (event) => {
        event.preventDefault();
        let txtEmpty = '---';
        let txtCargo = '';

        cargoPackage.map((el, i) => {
            return txtCargo += `${i}: Длина: ${el.cargoLength || txtEmpty}, Шириина: ${el.cargoWidth || txtEmpty}, Высота: ${el.cargoHeight || txtEmpty}, Вес: ${el.cargoWeight || txtEmpty}\n`
        });

        ws.send('Грузовые места: \n' + txtCargo);
    };


    return (
        <form onSubmit={submitForm}>
            {
                cargoPackage.map((el, i) => (
                    <div key={i} className='form-control'>
                        <input placeholder="Длина" name="cargoLength" value={el.cargoLength}
                               onChange={inputChange.bind(this, i)} type='text'/>
                        <input placeholder="Ширина" name="cargoWidth" value={el.cargoWidth}
                               onChange={inputChange.bind(this, i)} type='text'/>
                        <input placeholder="Высота" name="cargoHeight" value={el.cargoHeight}
                               onChange={inputChange.bind(this, i)} type='text'/>
                        <input placeholder="Вес" name="cargoWeight" value={el.cargoWeight}
                               onChange={inputChange.bind(this, i)} type='text'/>
                        <input type='button' defaultValue='&#10006;' onClick={removeCargoPackage.bind(this, i)} className='button-danger'/>
                    </div>
                ))
            }
            <input type='button' value='Добавить грузовое место' onClick={addCargo} className='button-primary-outlined'/>
            <input type="submit" value="Отправить" className='button-primary'/>
        </form>
    );

}

export default App;
