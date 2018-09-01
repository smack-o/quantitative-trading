import * as React from 'react';
// import * as style from './style.css';
import { Header, Footer } from '@/components';
import { Router } from '@/router';
import '@/assets/global.less';

export class App extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <Header/>
                <Router/>
                <Footer/>
            </div>
        );
    }
}
