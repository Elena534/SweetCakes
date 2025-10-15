import React from 'react';
import Footer from './Footer';

const LayoutWithFooter = ({ children }) => {
    return (
        <>
            {/* Основной контент без лишних отступов */}
            <div style={{ minHeight: 'calc(100vh - 50px)' }}>
                {children}
            </div>

            {/* Фиксированный футер */}
            <Footer />
        </>
    );
};

export default LayoutWithFooter;