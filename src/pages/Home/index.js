import React, { useEffect, useState } from 'react';

import './home.css';

import { DynamicSelect } from '../../components/custom/dynamic-select';
import { DatePicker } from '../../components/custom/date-picker';
import { columns } from '../../components/custom/columns';
import { DataTable } from '../../components/custom/data-table';
import { format } from 'date-fns';


const Home = () => {
    const [selectedType, setSelectedType] = useState(null);
    const [products, setProducts] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // Novo estado para os dados filtrados

    const fetchProduts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API}?action=Item`)
        const product = await response.json();
        setProducts(product.valuesItem.slice(1));
    }

    const fetchSector = async () => {
        const response = await fetch(`${process.env.REACT_APP_API}?action=Setor`)
        const sector = await response.json();
        setSectors(sector.valuesSetor.slice(1));
    }

    const fetchData = async () => {
        const response = await fetch(`${process.env.REACT_APP_API}?action=Historico`);
        const data = await response.json();
        const farmattedData = data.historicoData.map(item => ({
            ...item,
            date: format(new Date(item.date), "dd/MM/yyyy"), // Formata a data
        }))
        setData(farmattedData); // Atualiza o estado com o array de objetos
        setFilteredData(farmattedData); // Inicializa os dados filtrados com todos os dados
    };

    useEffect(() => {
        fetchProduts();
        fetchSector();
        fetchData();
    }, []);

    const handleFirstSelectChange = (value) => {
        setSelectedType(value);
    }

    const handleFilterChange = (value) => {
        
        //Filtra os dados com base no tipo e no valor selecionado
        if (selectedType === 'Setor') {
            setFilteredData(data.filter(item => item.sector === value ))
        } else if (selectedType === 'Produto') {
            setFilteredData(data.filter(item => item.product === value));
        } else if (selectedType === 'Data') {
            setFilteredData(data.filter(item => item.date=== value));
        } else {
            setFilteredData(data); // Caso nenhum tipo seja selecionado, mostra todos os dados
        }

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
                                { value: 'Todos', label: 'Todos' },
                            ]} 
                            description={"selecione o Tipo pesquisa"}
                            onChange={(value) => handleFirstSelectChange(value)}
                        />

                    {selectedType === 'Data' ? (
                        <DatePicker onChange={(value) => handleFilterChange(format(new Date(value), "dd/MM/yyyy"))}/>
                    ) : (
                        <DynamicSelect
                        options={
                            selectedType === 'Setor'
                                ? sectors.map((item) => ({
                                    value: item[1],
                                    label: item[1],
                                }))
                                : selectedType === 'Produto'
                                ? products.map((item) => ({
                                    value: item[1],
                                    label: item[1],
                                }))
                                :[]
                        }
                        description={`Selecione uma opção`}
                        onChange={(value) => handleFilterChange(value)}
                        /> 
                    )}
                    </div>
                <div className='list-container'>
                    <h1>Lista de Itens</h1>

                    <div className='table-container'>
                        <DataTable columns={columns} data={filteredData} />
                    </div>

                </div>
                

            </div>
        </>
    );
};

export default Home;