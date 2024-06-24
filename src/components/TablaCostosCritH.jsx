import React, { useEffect } from 'react';

function TablaCostosCritH({ selectedRowsTabla4_6, poblacion_horizonte, tipoCosto }) {
    const dataConstruccion = selectedRowsTabla4_6.map((item) => ({
        ...item,
        costoMedio: tipoCosto === 'Costo medio de construcción (Bs/hab)' ? item.costoPTAR / poblacion_horizonte : item.costoOMAnual / poblacion_horizonte,
    }));

    const promedioCostosMedios = dataConstruccion.reduce((sum, item) => sum + item.costoMedio, 0) / dataConstruccion.length;

    const dataConstruccionConDiferencia = dataConstruccion.map((item) => {
        const diferencia = Math.round(Math.abs(((item.costoMedio - promedioCostosMedios) / promedioCostosMedios) * 100));
        const comentario = diferencia > 5 ? diferencia + '% Por debajo de la media' : 'Por la media';
        let valoracion = 'Media';

        if (item.costoMedio < promedioCostosMedios) {
            if (diferencia > 20) valoracion = 'Muy alta';
            else if (diferencia > 5) valoracion = 'Alta';
        } else {
            if (diferencia > 20) valoracion = 'Muy baja';
            else if (diferencia > 5) valoracion = 'Baja';
        }

        return {
            ...item,
            diferencia,
            comentario,
            valoracion,
        };
    });

    useEffect(() => {
        const dataToStore = dataConstruccionConDiferencia.map(item => ({
            linea: item.linea,
            valoracion: item.valoracion,
        }));
        if(tipoCosto=="Costo medio de construcción (Bs/hab)")
        {
            localStorage.setItem('dataCostos1', JSON.stringify(dataToStore));
        }
        else{
            localStorage.setItem('dataCostos2', JSON.stringify(dataToStore));
        }
      
        
    }, [dataConstruccionConDiferencia]);

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full table-auto border-collapse border border-gray-200 bg-white">
                <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Línea</th>
                        <th className="border border-gray-200 px-4 py-2">{tipoCosto}</th>
                        <th className="border border-gray-200 px-4 py-2">Diferencia (%)</th>
                        <th className="border border-gray-200 px-4 py-2">Comentario</th>
                        <th className="border border-gray-200 px-4 py-2">Valoración</th>
                    </tr>
                </thead>
                <tbody>
                    {dataConstruccionConDiferencia.map((item, index) => (
                        <tr key={index}>
                            <td className="border border-gray-200 px-4 py-2">{item.linea}</td>
                            <td className="border border-gray-200 px-4 py-2 text-center">{item.costoMedio.toFixed(1)}</td>
                            <td className="border border-gray-200 px-4 py-2 text-center">{item.diferencia}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.comentario}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.valoracion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaCostosCritH;
