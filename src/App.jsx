import { useState } from 'react';
import './App.css';

function App() {
  const [lang, setLang] = useState('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const translations = {
    tr: {
      nav_home: "Ana Sayfa",
      nav_services: "Hizmetler",
      nav_industries: "Sektörler",
      nav_about: "Kurumsal",
      nav_contact: "İletişim",
      track_placeholder: "Gönderi Takip No / Konşimento No",
      track_btn: "Sorgula",
      hero_title: 'Global Tedarik Zincirinde <br/><span class="highlight">Kusursuz Akış</span>',
      hero_desc: "İstanbul ve Roma ofislerimizle, uçtan uca entegre lojistik çözümleri sunuyoruz. Sınırları Pentagram ile aşın.",
      hero_cta: "Navlun Teklifi Al",
      stats_network: "Global Acenta Ağı",
      stats_shipment: "Yıllık Taşıma",
      stats_exp: "Yıllık Deneyim",
      serv_title: "Hizmetlerimiz",
      serv_subtitle: "İhtiyacınıza özel, esnek ve ölçeklenebilir lojistik modülleri.",
      ind_title: "Sektörel Çözümler",
      ind_auto: "Otomotiv",
      ind_pharma: "Sağlık & İlaç",
      ind_retail: "Perakende & Moda",
      ind_tech: "Teknoloji",
      about_title: "Pentagram Hakkında",
      about_text: "Pentagram Logistics, geleneksel taşımacılığın ötesine geçerek stratejik iş ortağınız olmayı hedefler. İstanbul (İSTMarina) genel merkezimiz ve <strong>2026'da faaliyete geçen Roma ofisimizle</strong>, Avrupa-Türkiye hattında pazar lideri olma yolunda ilerliyoruz. DSV ve Geodis gibi global standartlarda hizmet kalitesini, butik bir yaklaşımla sunuyoruz.",
      footer_links: "Hızlı Bağlantılar",
      footer_legal: "Yasal & Gizlilik",
      contact_btn: "Bize Ulaşın"
    },
    en: {
      nav_home: "Home",
      nav_services: "Services",
      nav_industries: "Industries",
      nav_about: "Company",
      nav_contact: "Contact",
      track_placeholder: "Shipment ID / Bill of Lading",
      track_btn: "Track",
      hero_title: 'Seamless Flow in <br/><span class="highlight">Global Supply Chain</span>',
      hero_desc: "End-to-end integrated logistics solutions with our Istanbul and Rome offices. Cross borders with Pentagram.",
      hero_cta: "Get a Quote",
      stats_network: "Global Network",
      stats_shipment: "Annual Shipments",
      stats_exp: "Years Experience",
      serv_title: "Our Services",
      serv_subtitle: "Flexible and scalable logistics modules tailored to your needs.",
      ind_title: "Industry Solutions",
      ind_auto: "Automotive",
      ind_pharma: "Healthcare & Pharma",
      ind_retail: "Retail & Fashion",
      ind_tech: "Technology",
      about_title: "About Pentagram",
      about_text: "Pentagram Logistics aims to be your strategic partner by going beyond traditional transportation. With our Istanbul (ISTMarina) HQ and our <strong>Rome office opened in 2026</strong>, we are on our way to becoming a market leader in the Europe-Turkey line.",
      footer_links: "Quick Links",
      footer_legal: "Legal & Privacy",
      contact_btn: "Contact Us"
    },
    it: {
      nav_home: "Home",
      nav_services: "Servizi",
      nav_industries: "Settori",
      nav_about: "Azienda",
      nav_contact: "Contatti",
      track_placeholder: "ID Spedizione / Polizza di Carico",
      track_btn: "Traccia",
      hero_title: 'Flusso Perfetto nella <br/><span class="highlight">Supply Chain Globale</span>',
      hero_desc: "Soluzioni logistiche integrate end-to-end con i nostri uffici di Istanbul e Roma. Oltrepassa i confini con Pentagram.",
      hero_cta: "Richiedi Preventivo",
      stats_network: "Rete Globale",
      stats_shipment: "Spedizioni Annue",
      stats_exp: "Anni di Esperienza",
      serv_title: "I Nostri Servizi",
      serv_subtitle: "Moduli logistici flessibili e scalabili su misura per le tue esigenze.",
      ind_title: "Soluzioni Industriali",
      ind_auto: "Automotive",
      ind_pharma: "Salute e Farmaceutica",
      ind_retail: "Retail e Moda",
      ind_tech: "Tecnologia",
      about_title: "Su Pentagram",
      about_text: "Pentagram Logistics mira ad essere il tuo partner strategico andando oltre il trasporto tradizionale. Con il nostro quartier generale a Istanbul (ISTMarina) e il nostro <strong>ufficio di Roma aperto nel 2026</strong>, stiamo diventando leader di mercato sulla linea Europa-Turchia.",
      footer_links: "Link Rapidi",
      footer_legal: "Legale e Privacy",
      contact_btn: "Contattaci"
    }
  };

  const t = translations[lang];

  return (
    <>
      <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Navbar */}
      <nav className="glass-nav">
        <div className="container nav-container">
          <div className="logo-area">
            {/* Beyaz Logo */}
            <img src="/logo-white.png" alt="Pentagram Logistics" className="nav-logo" />
            <div className="logo-text">
              <span className="brand-main">PENTAGRAM</span>
              <span className="brand-sub">LOGISTICS</span>
            </div>
          </div>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>{t.nav_home}</a></li>
            <li><a href="#services" onClick={() => setIsMenuOpen(false)}>{t.nav_services}</a></li>
            <li><a href="#industries" onClick={() => setIsMenuOpen(false)}>{t.nav_industries}</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>{t.nav_about}</a></li>
            <li><a href="#contact" className="nav-cta" onClick={() => setIsMenuOpen(false)}>{t.nav_contact}</a></li>
          </ul>

          <div className="right-actions">
            <div className="lang-switch">
              <button className={lang === 'tr' ? 'active' : ''} onClick={() => setLang('tr')}>TR</button>
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
              <button className={lang === 'it' ? 'active' : ''} onClick={() => setLang('it')}>IT</button>
            </div>
            <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 dangerouslySetInnerHTML={{ __html: t.hero_title }}></h1>
            <p className="hero-sub">{t.hero_desc}</p>

            {/* Tracking Bar */}
            <div className="tracking-bar">
              <i className="fas fa-search"></i>
              <input type="text" placeholder={t.track_placeholder} />
              <button>{t.track_btn}</button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <strong>120+</strong> <span>{t.stats_network}</span>
              </div>
              <div className="stat">
                <strong>50K+</strong> <span>{t.stats_shipment}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>{t.serv_title}</h2>
            <p>{t.serv_subtitle}</p>
          </div>

          <div className="grid-4">
            <div className="service-card glass-panel">
              <div className="icon-box"><i className="fas fa-plane-departure"></i></div>
              <h3>Air Freight</h3>
              <p>Premium, Express, Consolidated</p>
            </div>
            <div className="service-card glass-panel">
              <div className="icon-box"><i className="fas fa-ship"></i></div>
              <h3>Ocean Freight</h3>
              <p>FCL, LCL, Project Cargo</p>
            </div>
            <div className="service-card glass-panel">
              <div className="icon-box"><i className="fas fa-truck-moving"></i></div>
              <h3>Road Freight</h3>
              <p>FTL, LTL, Intermodal</p>
            </div>
            <div className="service-card glass-panel">
              <div className="icon-box"><i className="fas fa-boxes"></i></div>
              <h3>Contract Logistics</h3>
              <p>Warehousing, Distribution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="section-padding">
        <div className="container">
          <h2 className="section-title-left">{t.ind_title}</h2>
          <div className="grid-2">
            <div className="industry-item glass-panel">
              <i className="fas fa-car"></i>
              <div>
                <h4>{t.ind_auto}</h4>
                <p>Just-in-Time solutions for production lines.</p>
              </div>
            </div>
            <div className="industry-item glass-panel">
              <i className="fas fa-pills"></i>
              <div>
                <h4>{t.ind_pharma}</h4>
                <p>GDP compliant temperature controlled transport.</p>
              </div>
            </div>
            <div className="industry-item glass-panel">
              <i className="fas fa-tshirt"></i>
              <div>
                <h4>{t.ind_retail}</h4>
                <p>Fast fashion logistics from factory to shelf.</p>
              </div>
            </div>
            <div className="industry-item glass-panel">
              <i className="fas fa-microchip"></i>
              <div>
                <h4>{t.ind_tech}</h4>
                <p>High-security transport for high-value goods.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Corporate */}
      <section id="about" className="section-padding">
        <div className="container about-layout">
          <div className="about-text glass-panel">
            <h3>{t.about_title}</h3>
            <p dangerouslySetInnerHTML={{ __html: t.about_text }}></p>
            <a href="#contact" className="btn-outline">{t.hero_cta}</a>
          </div>

          {/* Harita ve Konum */}
          <div className="about-visual glass-panel">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.926795499252!2d29.22744837644336!3d40.92348607136195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cad19d55555555%3A0x6b77777777777777!2zSXN0bWFyaW5hIEFWTQ!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pentagram Logistics Location"
            ></iframe>

            <div className="map-overlay-label">
              <i className="fas fa-map-marker-alt"></i>
              <span>Pentagram HQ - İSTMarina</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>PENTAGRAM</h4>
              <p>Sales: sales@pentagramlogistics.com</p>
              <p>HQ: İSTMarina, Kartal / Istanbul</p>
              <p>Branch: Via Nazionale, Roma / Italia</p>
            </div>
            <div className="footer-col">
              <h4>{t.footer_links}</h4>
              <ul>
                <li><a href="#">Tracking</a></li>
                <li><a href="#">Get Quote</a></li>
                <li><a href="#">Locations</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.footer_legal}</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Pentagram Logistics. All rights reserved.</p>
            <div className="socials">
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;