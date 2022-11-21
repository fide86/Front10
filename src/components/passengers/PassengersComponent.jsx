import React, { useEffect, useState } from "react";
import { Col, Row, Select } from 'antd';
import './PassengersComponent.scss';
import PassengersTypeComponent from "./PassengersTypeComponent";

const PassengersComponent = ({childToParent2}) => {

    const [data, setData] = useState('');
    // Seteando datos que vienen del componentes PassengersTypeComponent
    const childToParent = (childData) => {
        setData(childData)
    }
    console.log('data1',data);

    const [flyType, setFlyType] = useState('')
    const [travelClass, setTravelClass] = useState('')

    // Cuando detecta que los datos del componente hijo llegó los combina con los de este componente 
    // y los manda al FlightsComponent
    useEffect(() => {
        childToParent2({'flyType': flyType, 'travelClass': travelClass, 'passengers': data})
    }, [data])

    // Maneja los datos del tipo de viaje (ida, ida y vuelta, etc.)
    const handleFlyType = (value) => {
        setFlyType(value);
    };

    // Maneja los datos de la 'clase' del vuelo
    const handleTravelClass = (value) => {
        setTravelClass(value);
    };

    return (
        <>
            <h1>Search hundreds of travel sites at once</h1>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                <Col className="gutter-row" span={4}>
                    <div style={{ padding: '8px 0' }}>

                        <Select
                            defaultValue="round-trip"
                            style={{ width: 200 }}
                            onChange={handleFlyType}
                            options={[
                                {
                                    value: 'one-way',
                                    label: 'One-way',
                                },
                                {
                                    value: 'round-trip',
                                    label: 'Round-trip',
                                },
                                {
                                    value: 'multi-city',
                                    label: 'Multi-city',
                                },
                                {
                                    value: 'trip-builder',
                                    label: 'Trip builder',
                                },
                            ]}
                        />
                    </div>
                </Col>

                <Col className="gutter-row" span={4}>
                    <div style={{ padding: '8px 0' }}>


                        <Select
                            defaultValue="economy"
                            style={{ width: 200 }}
                            onChange={handleTravelClass}
                            options={[
                                {
                                    value: 'economy',
                                    label: 'Economy',
                                },
                                {
                                    value: 'premium-economy',
                                    label: 'Premium Economy',
                                },
                                {
                                    value: 'business',
                                    label: 'Business',
                                },
                                {
                                    value: 'first',
                                    label: 'First',
                                },
                                {
                                    value: 'multiple',
                                    label: 'Multiple',
                                },
                            ]}
                        />
                    </div>
                </Col>



            </Row>
            <Row>
                <Col className="gutter-row" span={20}>
                    <PassengersTypeComponent childToParent={childToParent} /> {/* PassengersTypeComponent */}
                    </Col>
            </Row>

        </>
    );
}

export default PassengersComponent;