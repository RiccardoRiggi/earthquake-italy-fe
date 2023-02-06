import React from 'react';

export default function Footer() {
    return (
        <>
            <footer className="sticky-footer bg-white shadow">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Progetto realizzato da <a className="font-weight-bold text-decoration-none"
                            href="https://www.linkedin.com/in/riccardoriggi/">Riccardo Riggi</a> - Vota il progetto su <a className="font-weight-bold text-decoration-none" href="https://github.com/RiccardoRiggi/earthquake-italy-fe">GitHub</a> </span>
                    </div>
                </div>
            </footer>
        </>
    );
}