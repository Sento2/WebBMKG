import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchBeranda, fetchProfil, fetchCuacaPenerbangan, fetchCuacaMaritim, fetchCitraSatelit } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [activeTab, setActiveTab] = useState('beranda'); // 'beranda', 'cuaca', 'penerbangan', 'maritim', 'satelit', 'peringatan', 'berita', 'ptsp', 'profil'
    const [profil, setProfil] = useState(null);
    const [berandaData, setBerandaData] = useState(null);
    const [cuacaPenerbangan, setCuacaPenerbangan] = useState([]);
    const [cuacaMaritim, setCuacaMaritim] = useState([]);
    const [citraSatelit, setCitraSatelit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adminToken, setAdminToken] = useState(() => localStorage.getItem('bmkg_admin_token') || '');
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [selectedBerita, setSelectedBerita] = useState(null);

    // Initial fetch of core data
    useEffect(() => {
        async function initData() {
            setLoading(true);
            try {
                const [pData, bData, penData, marData, satData] = await Promise.all([
                    fetchProfil(),
                    fetchBeranda(),
                    fetchCuacaPenerbangan(),
                    fetchCuacaMaritim(),
                    fetchCitraSatelit(),
                ]);

                setProfil(pData);
                setBerandaData(bData);
                setCuacaPenerbangan(penData);
                setCuacaMaritim(marData);
                setCitraSatelit(satData);
            } catch (err) {
                console.error('Error inisialisasi data aplikasi:', err);
            } finally {
                setLoading(false);
            }
        }

        initData();
    }, []);

    const navigateTo = (tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AppContext.Provider
            value={{
                activeTab,
                setActiveTab: navigateTo,
                profil,
                setProfil,
                berandaData,
                setBerandaData,
                cuacaPenerbangan,
                setCuacaPenerbangan,
                cuacaMaritim,
                setCuacaMaritim,
                citraSatelit,
                setCitraSatelit,
                loading,
                adminToken,
                setAdminToken,
                isAdminOpen,
                setIsAdminOpen,
                selectedBerita,
                setSelectedBerita,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
