import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestoDangerAction, fetchTestoSuccessAction, fetchTestoWarnAction } from '../modules/feedback/actions';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: any) {
    const dispatch = useDispatch();
    const feedback = useSelector((state: any) => state.feedback);



    document.getElementsByTagName("body")[0].classList.remove("bg-gradient-danger");

   return (
        <>
            <div id="wrapper">

                <Sidebar />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <Header />

                        <div className="container-fluid">
                            {feedback.testoDanger && <div className="alert alert-danger" role="alert">{feedback.testoDanger}<button onClick={() => dispatch(fetchTestoDangerAction(""))} type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button></div>}
                            {feedback.testoWarn && <div className="alert alert-warning" role="alert">{feedback.testoWarn}<button onClick={() => dispatch(fetchTestoWarnAction(""))} type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button></div>}
                            {feedback.testoSuccess && <div className="alert alert-success" role="alert">{feedback.testoSuccess}<button onClick={() => dispatch(fetchTestoSuccessAction(""))} type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button></div>}
                            {!feedback.isLoading && children}
                            {feedback.isLoading && <div className='text-center'><i className="fa-3x fa-solid fa-spinner text-primary fa-spin" ></i></div>}
                        </div>

                    </div>

                    <Footer />

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

          
        </>
    );

}