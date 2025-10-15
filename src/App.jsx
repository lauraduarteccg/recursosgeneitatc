import React, { useState } from 'react';
import './App.css';
import InfoModal from './components/InfoModal';
import empresas from './data/empresas.json';
import { normalizeCompanyName } from './data/normalizeCompanyName';

// ✅ Import logos
import logoCCG from './assets/img/logo_ccg.webp';
import logo3cx from './assets/img/3cxlogo.svg';
import logoCorreos from './assets/img/correos.svg';
import logoCorreosexpress from './assets/img/correosexpress.svg';
import logoCtt from './assets/img/ctt.svg';
import logoDhl from './assets/img/dhl.svg';
import logoDsv from './assets/img/dsv.svg';
import logoFedex from './assets/img/fedex.svg';
import logoGenei from './assets/img/genei.svg';
import logoGeneiadmin from './assets/img/geneiadmin.svg';
import logoGls from './assets/img/gls.svg';
import logoLastminute from './assets/img/lastminute.svg';
import logoMondial from './assets/img/mondial.svg';
import logoNacex from './assets/img/nacex.svg';
import logoOntime from './assets/img/ontime.svg';
import logoPalletways from './assets/img/palletways.svg';
import logoPallex from './assets/img/pallex.svg';
import logoSendiroo from './assets/img/sendiroo.svg';
import logoSendirooadmin from './assets/img/sendirooadmin.svg';
import logoSeur from './assets/img/seur.svg';
import logoSkynet from './assets/img/skynet.svg';
import logoSlack from './assets/img/slack.svg';
import logoTdn from './assets/img/tdn.svg';
import logoTipsaplus from './assets/img/tipsaplus.svg';
import logoTnt from './assets/img/tnt.svg';
import logoTransaher from './assets/img/transaher.svg';
import logoUps from './assets/img/ups.svg';
import logoXpo from './assets/img/xpo.svg';
import logoZimbra from './assets/img/zimbra.svg';
import logoEnlaza from './assets/img/enlaza.svg';
import logoEnvialia from './assets/img/envialia.svg';
import logoZeleris from './assets/img/zeleris.svg';
import logoSaat from './assets/img/saat.svg';
import drive from './assets/img/drive.webp';
const logoMap = {
  '3cxlogo': logo3cx,
  'correos': logoCorreos,
  'correosexpress': logoCorreosexpress,
  'ctt': logoCtt,
  'dhl': logoDhl,
  'dsv': logoDsv,
  'fedex': logoFedex,
  'genei': logoGenei,
  'geneiadmin': logoGeneiadmin,
  'gls': logoGls,
  'lastminute': logoLastminute,
  'mondial': logoMondial,
  'nacex': logoNacex,
  'ontime': logoOntime,
  'palletways': logoPalletways,
  'pallex': logoPallex,
  'sendiroo': logoSendiroo,
  'sendirooadmin': logoSendirooadmin,
  'seur': logoSeur,
  'skynet': logoSkynet,
  'slack': logoSlack,
  'tdn': logoTdn,
  'tipsaplus': logoTipsaplus,
  'tnt': logoTnt,
  'transaher': logoTransaher,
  'ups': logoUps,
  'xpo': logoXpo,
  'zimbra': logoZimbra,
  'enlaza': logoEnlaza,
  'envialia': logoEnvialia,
  'zeleris': logoZeleris,
  'saat': logoSaat,
};

// Unifica y limpia el array de links para evitar duplicados
const links = [
  { name: 'Zendesk Genei', logo: 'genei' },
  { name: 'Slack', logo: 'slack' },
  { name: '3CX', logo: '3cxlogo' },
  { name: 'Admin Genei', logo: 'geneiadmin' },
  { name: 'Zimbra', logo: 'zimbra' },
  { name: 'Zendesk Sendiroo', logo: 'sendiroo' },
  { name: 'Admin Sendiroo', logo: 'sendirooadmin' },
  { name: 'Tipsa', logo: 'tipsaplus', key: 'TIPSA' },
  { name: 'Ontime Paletería', logo: 'ontime' },
  { name: 'GLS', logo: 'gls' },
  { name: 'Correos', logo: 'correos' },
  { name: 'CEX', logo: 'correosexpress' },
  { name: 'DHL', logo: 'dhl' },
  { name: 'Transaher', logo: 'transaher', key: 'TRANSAHER' }, // Unificado
  { name: 'Seur', logo: 'seur' },
  { name: 'XPO', logo: 'xpo' },
  { name: 'UPS', logo: 'ups' },
  { name: 'Skynet', logo: 'skynet' },
  { name: 'CTT', logo: 'ctt' },
  { name: 'TNT', logo: 'tnt' },
  { name: 'DSV', logo: 'dsv' },
  { name: 'Lastminute (DB Schenker)', logo: 'lastminute' },
  { name: 'TDN', logo: 'tdn' },
  { name: 'Fedex', logo: 'fedex' },
  { name: 'Inpost (Mondial Relay)', logo: 'mondial' },
  { name: 'Palletways', logo: 'palletways' },
  { name: 'Pallex', logo: 'pallex' },
  { name: 'Nacex', logo: 'nacex' },
  { name: 'Zeleris', logo: 'zeleris' },
  { name: 'Envialia', logo: 'envialia' },
  { name: 'Enlaza', logo: 'enlaza' },
  { name: 'DB Schenker', logo: 'lastminute', key: 'DB_SCHENKER' },
  { name: 'Saat', logo: 'saat' }
];

// Elimina duplicados por nombre normalizado
const uniqueLinks = [];
const seen = new Set();
for (const link of links) {
  const normalized = normalizeCompanyName(link.name);
  if (!seen.has(normalized)) {
    uniqueLinks.push(link);
    seen.add(normalized);
  }
}

export default function App() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Mapea los nombres de los links a las claves del JSON
  function getCompanyKey(linkName) {
    // Normaliza y busca coincidencia exacta
    const normalized = normalizeCompanyName(linkName);
    const keys = Object.keys(empresas);
    // Busca coincidencia exacta
    let found = keys.find(k => normalizeCompanyName(k) === normalized);
    if (!found) {
      // Busca por inclusión parcial si no hay exacta
      found = keys.find(k => normalizeCompanyName(linkName).includes(normalizeCompanyName(k)) || normalizeCompanyName(k).includes(normalizeCompanyName(linkName)));
    }
    return found;
  }

  const filteredLinks = uniqueLinks.filter(link =>
    link.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleOpenModal(link) {
    const key = link.key || getCompanyKey(link.name);
    let data = key ? empresas[key] : null;
    // Unifica info de subclaves si aplica
    if (key === 'TRANSAHER' && empresas['TRANSAHER_PALLETS']) {
      data = { ...data, ...empresas['TRANSAHER_PALLETS'] };
    }
    setSelectedCompany({
      key,
      data,
      logo: logoMap[link.logo],
    });
    setModalOpen(true);
  }

  return (
    <div className="app">
      <header>
        <img src={logoCCG} />
    
        <h1>🚚 Genei links ATC 🔗</h1>
         
      </header>
      <main>

        <input
          type="text"
          className="search-input"
          placeholder="Buscar enlace..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid">
           
          {filteredLinks.map((link, index) => (
            <button
              key={index}
              className="link-button"
              onClick={() => handleOpenModal(link)}
            >
              <img src={logoMap[link.logo]} alt={link.name} className="logo-img" />
              {link.name}
            </button>
          ))}
        </div>
        
        <InfoModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          companyKey={selectedCompany?.key}
          companyData={selectedCompany?.data}
          logo={selectedCompany?.logo}
        />
      </main >
    </div>

  );
}

