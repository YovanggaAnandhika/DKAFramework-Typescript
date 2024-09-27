import React from "react";
import "../Assets/css/style.css"
import "../Assets/main.sass"


class Hello extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <div className="body-wrap">
                <main>
                    <section className="hero">
                        <div className="container">
                            <div className="hero-copy" style={{width: "100%"}}>
                                <h3 className="hero-title mt-0">Welcome To DKA React</h3>
                                <p className="hero-paragraph" style={{fontSize: 14, color: "white"}}>
                                    Anda Telah Berhasil Melakukan Instalasi
                                    Silahkan Memodifikasi Pointing
                                </p>
                                <pre>{`
    import {Options, Server} from "@dkaframework/server";
    
    await Server({
        state : Options.Server.State.SERVER_STATE_DEVELOPMENT,
        engine : OPTIONS.,
        entry : ....<your pointing location>
        port : 213
    })`}</pre>

                            </div>
                            <div className="hero-inner"/>
                        </div>
                    </section>
                </main>

                <footer className="site-footer">
                    <div className="container">
                        <div className="site-footer-inner">
                            <div className="brand footer-brand">
                                DKA Framework React
                            </div>
                            <ul className="footer-links list-reset"/>
                            <ul className="footer-social-links list-reset"/>
                            <div className="footer-copyright">&copy; 2022 DKA Research Center, By Yovangga Anandhika
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Hello;