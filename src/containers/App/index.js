import React from 'react';
// import * as style from './style.css';
import Components from '@/components';
import Router from '@/router';
import { isMobile } from '@/utils/uaParser';
import 'assets/global.less';

const { Header, Footer } = Components;

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Router/>
                <Footer/>
            </div>
        );
    }
}
