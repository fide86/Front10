import React from 'react';
import { Layout } from 'antd';
import HeaderPage from './HeaderPage'
import FlightsPage from '../FlightsPage';
import { FligthsProvider } from '../../context/FligthsContext';
const { Header, Footer, Content } = Layout;

const TemplatePage = () => {
    return (

        <Layout>
            <Header style={{ textAlign: 'center' }}>
                <HeaderPage />
            </Header>

            <Content style={{ paddingLeft: 20, marginBottom: 50 }}>
                <FligthsProvider> {/* FligthsProvider envolviendo FlightsPage para que los */}
                    <FlightsPage /> {/* datos estén disponibles en todos sus componentes hijos */}
                </FligthsProvider>
            </Content>
        </Layout>

    );
}
export default TemplatePage;