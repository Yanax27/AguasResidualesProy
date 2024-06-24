import React, { useEffect, useState } from 'react';
import TablaCostosCritH from '../TablaCostosCritH';
import TablaCriteriosCostos from '../TablaCriteriosCostos';
const h1 = "H.1. Costos de construcción";
const h2 = "H.2. Costos de operación y mantenimiento";

const CriterioH = ({onSaveCriterios}) => {
    const [lineasTabla4_2, setLineasTabla4_2] = useState([]);
    const [criteriosSeleccionados, setCriteriosSeleccionados] = useState([]);
    const [selectedRowsTabla4_6, setSelectedRowsTabla4_6] = useState([]);
    const [poblacion_horizonte, setPoblacion_horizonte] = useState(localStorage.getItem('poblacion_horizonte'))
    const [dataFromCostos, setDataFromCostos] = useState([]);

    const handleDataUpdate = (data) => {
        setDataFromCostos(data);
    };

    useEffect(() => {
        const storageCriteriosTabla4_2 = JSON.parse(localStorage.getItem('selectedRowsTabla4_2'));
        const storageCriteriosSeleccionados = JSON.parse(localStorage.getItem('criterioS'));
        const storageSelectedRows4_6 = JSON.parse(localStorage.getItem('selectedRowsTabla4_6'));

        setLineasTabla4_2(storageCriteriosTabla4_2);
        setCriteriosSeleccionados(storageCriteriosSeleccionados);
        setSelectedRowsTabla4_6(storageSelectedRows4_6);


    }, [])

    const handleSaveCriterios = (datos) => {
       // console.log("datos",datos)
        if (Array.isArray(datos)) {
            onSaveCriterios(datos);
        } else {
            console.error('Error: datosH no es un array', datos);
        }
    };

    return (
        <div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mb-10">
                <span className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                        COSTOS DE CONSTRUCCIÓN Y DE OPERACIÓN Y MANTENIMIENTO
                    </h3>
                    <span className="h-px flex-1 bg-black"></span>
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                    COSTO DE CONSTRUCCIÓN. Se debe valorar cada alternativa en comparación con las demás, en relación al costo de construcción. En la tabla de la derecha se estiman los costos de Implantación de cada alternativa, considerando los costos en el apartado 12.2.3.8. La valoración se considera de acuerdo al costo medio de las alternativas y criterios en el mismo apartado.
                </p>
                <div className="flex mb-4">
                    <div className="w-3/4 pr-2">
                       <TablaCriteriosCostos
                        lineas={lineasTabla4_2}
                        subcriterios={h1}
                        criteriosSeleccionados={criteriosSeleccionados}
                        tipoCosto={"Costo medio de construcción (Bs/hab)"}
                        onSave={handleSaveCriterios}
                    />
                     {/*dataFromCostos={dataFromCostos}*/}
                    </div>
                    <div className="w-1/4 pl-2">
                    <TablaCostosCritH
                        selectedRowsTabla4_6={selectedRowsTabla4_6}
                        poblacion_horizonte={poblacion_horizonte}
                        tipoCosto={"Costo medio de construcción (Bs/hab)"}
                       
                    />

                    </div>
                     {/*onDataUpdate={handleDataUpdate}*/}
                </div>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mb-10">
                <span className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-6">
                        COSTO DE OPERACIÓN Y MANTENIMIENTO
                    </h3>
                    <span className="h-px flex-1 bg-black"></span>
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-justify mb-2">
                    Se debe valorar cada alternativa en comparación con las demás, en relación al Costo de Operación y Mantenimiento. En la tabla de la derecha se estiman los costos de O&M de cada alternativa, considerando los costos establecidos en el apartado 12.2.3.8. La valoración se considera de acuerdo al costo medio de O&M de las alternativas y criterios del mismo apartado.
                </p>
                <div className="flex mb-4">
                    <div className="w-3/4 pr-2">
                        <TablaCriteriosCostos
                            lineas={lineasTabla4_2}
                            subcriterios={h2}
                            criteriosSeleccionados={criteriosSeleccionados}
                            tipoCosto={"Costo medio de O&M (Bs/hab/año)"}
                            onSave={handleSaveCriterios}
                        />
                    </div>
                    <div className="w-1/4 pl-2">
                        <TablaCostosCritH
                            selectedRowsTabla4_6={selectedRowsTabla4_6}
                            poblacion_horizonte={poblacion_horizonte}
                            tipoCosto={"Costo medio de O&M (Bs/hab/año)"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CriterioH;
