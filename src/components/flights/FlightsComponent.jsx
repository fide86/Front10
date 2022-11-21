import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Row, Select, DatePicker, Alert } from 'antd';
import dayjs from 'dayjs';
import './FlightsComponent.scss';
import states from "../../util/States";
import PassengersComponent from "../passengers/PassengersComponent";
import { useFligths } from '../../context/FligthsContext';

const FlightsComponent = () => {    
    const flightsProv = useFligths();

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [initDate, setInitDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [data, setData] = useState('');
    // Seteando datos que vienen de los componentes PassengersComponent y PassengersTypeComponent
    // para conbinarlo con los de este componente y enviarlo al flightsProv y de este al server
    const childToParent2 = (childData) => {
        setData(childData)  
    }
    console.log('data3', data);

    // Cuando detecta que los datos de los componentes hijos llegaron los combina con los de este componente 
    // y los manda al provider
    useEffect(() => {
        let dataToSend = {sites: {'to':to,'from':from,'initDate':initDate,'endDate':endDate},'ticket': data}
        flightsProv.findFligths(dataToSend)
    }, [data])
    

    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const [disableFrom, setDisableFrom] = useState(false)
    const [disableTo, setDisableTo] = useState(false)
    const [visible, setVisible] = useState(false);

    // Maneja los datos de los aeropuertos de orígen
    const handleChangeFrom = (value) => {
        if (value.length >= 3) {
            value.pop();
            setDisableFrom(true);
            setVisible(true); // Hace visible alerta de 'max 3 airports'
            setTimeout(() => {
                setVisible(false)
            }, 3000);
        } else {
            setFrom(value)
            setDisableFrom(false)
        };
    };

    // Maneja los datos de los aeropuertos de destino
    const handleChangeTo = (value) => {
        if (value.length >= 3) {
            value.pop();
            setDisableTo(true);
            setVisible(true); // Hace visible alerta de 'max 3 airports'
            setTimeout(() => {
                setVisible(false)
            }, 3000);
        } else {
            setTo(value)
            setDisableTo(false)
        };
    };
    
    // Maneja los datos del rango de fechas
    const onRangeChange = (dates) => {
        if (dates) {
            setInitDate(dates[0]['$d']);
            setEndDate(dates[1]['$d']);
        } else {
            console.log('Clear');
        }
    };

    //Rangos de fechas preestablecidos
    const rangePresets = [
        {
            label: 'Last 7 Days',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Last 14 Days',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Last 30 Days',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Last 90 Days',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];

    const dateFormat = "ddd MM/DD";

    return (
        <>
        
            <PassengersComponent childToParent2={childToParent2}/> {/* PassengersComponent */}

            <Divider orientation="left" />
            {visible && (<Alert message="Max. 3 airports!" type="warning"
                style={{ width: 200, textAlign: 'center', position: 'absolute', top: 10 }} showIcon closable />)
            }

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                <Col className="gutter-row" span={8}>

                    <Select
                        mode="multiple"
                        style={{
                            width: '100%',
                        }}
                        defaultValue={'Habana'}
                        placeholder="Select the countries"
                        onChange={handleChangeFrom}
                        optionLabelProp="label"
                        allowClear={true}
                    >

                        {states.map((state, index) => {
                            if (!disableFrom)
                                return <Option key={index} value={state}></Option>
                            else return ''
                        })}

                    </Select>
                </Col>

                <Col className="gutter-row" span={8}>

                    <Select
                        mode="multiple"
                        style={{ width: '100%', }}
                        defaultValue={'United States'}
                        placeholder="Select the countries"
                        onChange={handleChangeTo}
                        optionLabelProp="label"
                        allowClear={true}
                    >

                        {states.map((state, index) => {
                            if (!disableTo)
                                return <Option key={index} value={state}></Option>
                            else return ''
                        })}
                    </Select>
                </Col>

                <Col className="gutter-row" span={6}>
                    <RangePicker
                        style={{
                            width: '100%',
                        }}
                        presets={rangePresets}
                        showTime
                        format={dateFormat}
                        defaultValue={[dayjs('2022-11-21', 'YYYY-MM-DD'), dayjs('2022-11-28', 'YYYY-MM-DD')]}
                        onChange={onRangeChange}
                    />
                </Col>

            </Row>

        </>
    );
}

export default FlightsComponent;