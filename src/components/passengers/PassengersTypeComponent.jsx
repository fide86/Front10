import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, InputNumber, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './PassengersComponent.scss';
import { Tooltip, Collapse } from 'antd';
const { Panel } = Collapse;

const PassengersTypeComponent = ({childToParent}) => {

    // Datos de pasajeros
    const adults = useRef(1)
    const students = useRef(0);
    const seniors = useRef(0);
    const youths = useRef(0);
    const childrens = useRef(0);
    const toddlers = useRef(0);
    const infants = useRef(0);

    const [sumTotal, setSumTotal] = useState(0);

    // Límites máximos
    const [adultsLimit, setAdultsLimit] = useState(9);
    const [studentsLimit, setStudentsLimit] = useState(9);
    const [seniorsLimit, setSeniorsLimit] = useState(9);
    const [youthsLimit, setYouthsLimit] = useState(7);
    const [childrensLimit, setChildrensLimit] = useState(7);
    const [toddlersLimit, setToddlersLimit] = useState(7);
    const [infantsLimit, setInfantsLimit] = useState(1);


    // Límites mínimos
    const [adultsMinimum, setAdultsMinimum] = useState(1);
    const [studentsMinimum, setStudentsMinimum] = useState(0);
    const [seniorsMinimum, setSeniorsMinimum] = useState(0);

    useEffect(() => {
        updateTotal();
    });

    // Actualizar total de viajeros y validaciones
    const updateTotal = () => {
        setSumTotal(adults.current + students.current + seniors.current + youths.current + childrens.current + toddlers.current + infants.current);
        if (sumTotal === 16) {
            setAdultsLimit(adults.current)
            setStudentsLimit(students.current);
            setSeniorsLimit(seniors.current);
            setYouthsLimit(youths.current);
            setChildrensLimit(childrens.current);
            setToddlersLimit(toddlers.current);
            setInfantsLimit(infants.current);
        } else {
            let adultsTotal = sumAdults()
            let childrensTotal = sumChildrens()
            setAdultsLimit(adults.current + (9 - adultsTotal))
            setStudentsLimit(students.current + (9 - adultsTotal));
            setSeniorsLimit(seniors.current + (9 - adultsTotal));
            setYouthsLimit(youths.current + (7 - childrensTotal));
            setChildrensLimit(childrens.current + (7 - childrensTotal));
            setToddlersLimit(toddlers.current + (7 - childrensTotal));
            childrensTotal < 7 ? setInfantsLimit(1) : setInfantsLimit(0);
        }
    }

    const sumAdults = () => {
        return adults.current + students.current + seniors.current;
    }

    const sumChildrens = () => {
        return youths.current + childrens.current + toddlers.current + infants.current;
    }

    // Verificaciones de datos de Adultos
    const verifyAdults = (value) => {
        if (value === 1) {
            if (students.current === 0 && seniors.current === 0) {
                setAdultsMinimum(1);
            }
        } else if (value === 0) {
            if (students.current === 0 && seniors.current === 1)
                setSeniorsMinimum(1)
            if (students.current === 1 && seniors.current === 0)
                setStudentsMinimum(1)
        }
    }

    // Verificaciones de datos de Estudiantes
    const verifyStudents = (value) => {
        if (value === 1) {
            if (adults.current === 0 && seniors.current === 0) {
                setStudentsMinimum(1);
            }
        } else if (value === 0) {
            if (adults.current === 0 && seniors.current === 1)
                setSeniorsMinimum(1)
            if (adults.current === 1 && seniors.current === 0)
                setAdultsMinimum(1)
        }
    }

    // Verificaciones de datos de Ancianos
    const verifySeniors = (value) => {
        if (value === 1) {
            if (adults.current === 0 && students.current === 0) {
                setSeniorsMinimum(1);
            }
        } else if (value === 0) {
            if (adults.current === 0 && students.current === 1)
                setStudentsMinimum(1)
            if (adults.current === 1 && students.current === 0)
                setAdultsMinimum(1)
        }
    }

    // Manejadores de entrada de datos 
    const resetMinimum = () => {
        setAdultsMinimum(0)
        setStudentsMinimum(0)
        setSeniorsMinimum(0)
    }

    const updateAdult = (value) => {
        adults.current = value;
        resetMinimum();
        updateTotal();
    }
    const updateStudent = (value) => {
        students.current = value;
        resetMinimum();
        updateTotal();
    }

    const updateSenior = (value) => {
        seniors.current = value;
        resetMinimum();
        updateTotal();
    }
    const updateYouth = (value) => {
        youths.current = value;
        updateTotal();
    }
    const updateChildren = (value) => {
        childrens.current = value;
        updateTotal();
    }
    const updateToddlers = (value) => {
        toddlers.current = value;
        updateTotal();
    }
    const updateInfant = (value) => {
        infants.current = value;
        updateTotal();
    }
    return (

        <>
            <Row>
                <Col span={15}>
                    <Collapse>
                        <Panel header={'Passengers: ' + sumTotal + (sumTotal === 1 ? ' Adult' : ' Travelers')}>

                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                                <Tooltip placement={'bottom'} title={'18-64'}>
                                    <Col className="gutter-row" span={3}>
                                        Adults
                                        <InputNumber
                                            max={adultsLimit}
                                            className='number'
                                            defaultValue={adults.current}
                                            min={adultsMinimum}
                                            onStep={verifyAdults}
                                            onChange={updateAdult} />

                                    </Col>
                                </Tooltip>

                                <Tooltip placement={'bottom'} title={'over 18'}>
                                    <Col className="gutter-row" span={3}>
                                        Students
                                        <InputNumber
                                            max={studentsLimit}
                                            className='number'
                                            defaultValue={0}
                                            min={studentsMinimum}
                                            onStep={verifyStudents}
                                            onChange={updateStudent} />

                                    </Col>
                                </Tooltip>

                                <Tooltip placement={'bottom'} title={'65+'}>
                                    <Col className="gutter-row" span={3}>
                                        Seniors
                                        <InputNumber
                                            max={seniorsLimit}
                                            className='number'
                                            defaultValue={0}
                                            min={seniorsMinimum}
                                            onStep={verifySeniors}
                                            onChange={updateSenior} />

                                    </Col>
                                </Tooltip>

                                <Tooltip placement={'bottom'} title={'12-17'}>
                                    <Col className="gutter-row" span={3}>
                                        Youths
                                        <InputNumber
                                            max={youthsLimit}
                                            className='number'
                                            defaultValue={0}
                                            min={0}
                                            onChange={updateYouth} />

                                    </Col>
                                </Tooltip>

                                <Tooltip placement={'bottom'} title={'2-11'}>
                                    <Col className="gutter-row" span={3}>
                                        Childrens
                                        <InputNumber
                                            max={childrensLimit}
                                            className='number'
                                            defaultValue={0}
                                            min={0}
                                            onChange={updateChildren} />

                                    </Col>
                                </Tooltip>

                                <Tooltip placement={'bottom'} title={'under 2'}>
                                    <Col className="gutter-row" span={3}>
                                        Toddlers
                                        <InputNumber
                                            max={toddlersLimit}
                                            className='number'
                                            defaultValue={0}
                                            min={0}
                                            onChange={updateToddlers} />

                                    </Col>
                                </Tooltip>

                                <Tooltip placement={'bottom'} title={'under 2'}>
                                    <Col className="gutter-row" span={3}>
                                        Infants
                                        <InputNumber
                                            max={infantsLimit}
                                            className='number'
                                            defaultValue={0}
                                            min={0}
                                            onChange={updateInfant} />

                                    </Col>
                                </Tooltip>
                            </Row>
                        </Panel>
                    </Collapse>
                </Col>
                <Col span={7}></Col>
                <Col span={2}>
                    <Button
                        style={{ backgroundColor: "orange", position: 'float-right', width: 100, height: 100 }}
                        icon={<SearchOutlined style={{ marginTop: 25, fontSize: 50 }}/>} 
                        onClick={() => childToParent({
                            'adults':adults.current,
                            'students':students.current,
                            'seniors':seniors.current,
                            'youths':youths.current,
                            'childrens':childrens.current,
                            'toddlers':toddlers.current,
                            'infants':infants.current
                        })}
                    />
                </Col>
            </Row>

        </>
    )
}
export default PassengersTypeComponent