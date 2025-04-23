import React, { useState } from 'react';

import './home.css';

import { DynamicSelect } from '../../components/custom/dynamic-select';
import { DatePicker } from '../../components/custom/date-picker';


const Home = () => {
    const [selectedType, setSelectedType] = useState(null);

    const handleFirstSelectChange = (value) => {
        setSelectedType(value);
    }

    return (
        <>
            <div className='home-container'>
                <div className='input-container'>
                         <DynamicSelect 
                            options={[
                                { value: 'Data', label: 'Data' },
                                { value: 'Setor', label: 'Setor' },
                                { value: 'Produto', label: 'Produto' },
                            ]} 
                            description={"selecione o Tipo pesquisa"}
                            onChange={(value) => handleFirstSelectChange(value)}
                        />

                    {selectedType === 'Data' ? (
                        <DatePicker />
                    ) : (
                        <DynamicSelect
                        options={
                            selectedType === 'Setor'
                                ? [
                                    { value: 'Financeiro', label: 'Financeiro' },
                                    { value: 'RH', label: 'Recursos Humanos' },
                                    { value: 'TI', label: 'Tecnologia da Informação' },
                                ]
                                : selectedType === 'Produto'
                                ? [
                                    { value: 'Notebook', label: 'Notebook' },
                                    { value: 'Celular', label: 'Celular' },
                                    { value: 'Monitor', label: 'Monitor' },
                                ]
                                : []
                        }
                        description={`Selecione uma opção`}
                        /> 
                    )}
                    </div>
                <div className='list-container'>
                    <h1>Lista de Itens</h1>
                </div>
                

            </div>
        </>
    );
};

export default Home;