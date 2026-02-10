import { useState } from 'react';
import './App.css';

function App() {
  const [lang, setLang] = useState('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const translations = {
    tr: {
      nav_home: "Ana Sayfa", nav_services: "Hizmetler", nav_industries: "Sektörler", nav_about: "Kurumsal", nav_contact: "Teklif Al",

      // Hero
      hero_title: 'Lojistikte Sınırları <br/><span class="highlight">Pentagram</span> ile Aşın',
      hero_desc: "İstanbul ve Roma ofislerimizle, global ticaretteki en güçlü çözüm ortağınızız. Dünyayı ayağınıza getiriyoruz.",
      hero_cta: "Hemen Teklif Alın",

      // Hizmetler
      serv_title: "Hizmetlerimiz", serv_subtitle: "Tedarik zincirinizin her halkası için optimize edilmiş çözümler.",
      serv_air_title: "Hava Kargo", serv_air_desc: "Zamanla yarışan yükleriniz için global havayolu anlaşmalarımızla öncelikli yer garantisi.",
      serv_sea_title: "Deniz Yolu", serv_sea_desc: "Dünyanın tüm limanlarına FCL ve LCL servisler. Düzenli haftalık çıkışlarla maliyet avantajı.",
      serv_road_title: "Kara Yolu", serv_road_desc: "Avrupa ve Orta Doğu'ya geniş araç filomuzla komple ve parsiyel taşımacılık.",
      serv_store_title: "Kontrat Lojistiği", serv_store_desc: "Gümrüklü ve serbest depolama alanlarımızda stok yönetimi ve size özel entegre çözümler.",

      // Sektörler
      ind_title: "Sektörel Uzmanlık",
      ind_ship_title: "Gemi Ekipmanları", ind_ship_desc: "Gemilerin yolda kalmaması için 'Zaman Kritik' teslimat. 7/24 parça transferi.",
      ind_steel_title: "Demir & Çelik", ind_steel_desc: "Ağır tonajlı rulolar ve borular için özel lashing ve 'Heavy Lift' çözümleri.",
      ind_auto_title: "Otomotiv", ind_auto_desc: "Üretim bantlarının durmaması için JIT ve JIS teslimat modelleri.",
      ind_pharma_title: "Sağlık & İlaç", ind_pharma_desc: "GDP standartlarına uygun, sıcaklık kontrollü araçlarla güvenli teslimat.",

      // Hakkında
      about_title: "Pentagram Hakkında", about_text: "Pentagram Logistics, İstanbul ve Roma ofisleriyle stratejik iş ortağınızdır. DSV ve Geodis standartlarında hizmet sunuyoruz.",

      // Form
      form_heading: "Navlun Teklifi İste",
      form_sub: "Detayları girin, operasyon ekibimiz en geç 2 saat içinde size dönüş yapsın.",
      lbl_company: "Firma Adı", lbl_email: "E-posta", lbl_phone: "Telefon", lbl_origin: "Çıkış Noktası", lbl_dest: "Varış Noktası", lbl_type: "Yük Tipi", btn_submit: "Teklifi Gönder",

      footer_links: "Hızlı Bağlantılar", footer_legal: "Yasal & Gizlilik",
    },
    en: {
      nav_home: "Home", nav_services: "Services", nav_industries: "Industries", nav_about: "About", nav_contact: "Get Quote",
      hero_title: 'Cross Borders with <br/><span class="highlight">Pentagram</span>',
      hero_desc: "Your strongest partner in global trade with our Istanbul and Rome offices.",
      hero_cta: "Get a Quote Now",
      serv_title: "Our Services", serv_subtitle: "Optimized solutions for every link of your supply chain.",
      serv_air_title: "Air Freight", serv_air_desc: "Priority space guarantee with global airline agreements.",
      serv_sea_title: "Sea Freight", serv_sea_desc: "FCL and LCL services to all ports worldwide.",
      serv_road_title: "Road Freight", serv_road_desc: "Complete and partial transportation to Europe and Middle East.",
      serv_store_title: "Contract Logistics", serv_store_desc: "Integrated warehouse solutions tailored for you.",
      ind_title: "Industry Expertise",
      ind_ship_title: "Ship Spares", ind_ship_desc: "Time-critical delivery to keep vessels moving.",
      ind_steel_title: "Iron & Steel", ind_steel_desc: "Special lashing and Heavy Lift solutions.",
      ind_auto_title: "Automotive", ind_auto_desc: "Just-in-Time solutions for production lines.",
      ind_pharma_title: "Healthcare", ind_pharma_desc: "GDP compliant temperature controlled transport.",
      about_title: "About Pentagram", about_text: "Pentagram Logistics is your strategic partner with Istanbul and Rome offices.",
      form_heading: "Request Freight Quote", form_sub: "Enter details, our team will reply within 2 hours.",
      lbl_company: "Company", lbl_email: "Email", lbl_phone: "Phone", lbl_origin: "Origin", lbl_dest: "Destination", lbl_type: "Cargo Type", btn_submit: "Send Request",
      footer_links: "Quick Links", footer_legal: "Legal"
    }
  };

  const t = translations[lang] || translations['tr'];

  return (
    <>
      {/* Navbar */}
      <nav className="glass-nav">
        <div className="container nav-container">
          <div className="logo-area">
            <img src="/logo-white.jpg" alt="Logo" className="nav-logo" />
            <div className="logo-text">
              <span className="brand-main">PENTAGRAM</span>
              <span className="brand-sub">LOGISTICS</span>
            </div>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home">{t.nav_home}</a></li>
            <li><a href="#services">{t.nav_services}</a></li>
            <li><a href="#industries">{t.nav_industries}</a></li>
            <li><a href="#about">{t.nav_about}</a></li>
            <li><a href="#quote" className="nav-cta-link">{t.nav_contact}</a></li>
          </ul>
          <div className="right-actions">
            <div className="lang-switch">
              <button onClick={() => setLang('tr')}>TR</button>
              <button onClick={() => setLang('en')}>EN</button>
            </div>
            <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - LOJİSTİK ANİMASYONLU */}
      <header id="home" className="hero-section">
        {/* Animasyon Katmanları */}
        <div className="logistics-animation">
          <div className="world-map-bg"></div>
          <div className="moving-icon plane"><i className="fas fa-plane"></i></div>
          <div className="moving-icon ship"><i className="fas fa-ship"></i></div>
          <div className="moving-icon truck"><i className="fas fa-truck"></i></div>
          <div className="connection-lines"></div>
        </div>

        <div className="container hero-content-center">
          <h1 dangerouslySetInnerHTML={{ __html: t.hero_title }}></h1>
          <p>{t.hero_desc}</p>
          <a href="#quote" className="hero-btn-pulse">{t.hero_cta}</a>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>{t.serv_title}</h2>
            <p>{t.serv_subtitle}</p>
          </div>
          <div className="grid-4">
            <div className="service-card glass-panel">
              <div className="icon-box"><i className="fas fa-plane-departure"></i></div>
              <h3>{t.serv_air_title}</h3>
              <p>{t.serv_air_desc}</p>
            </div>
            <div className="service-card glass-panel">
              <div className="icon-box"><i className="fas fa-ship"></i></div>
              <h3>{t.serv_sea_title}</h3>
              <p>{t.serv_sea_desc}</p>
            </div>
            <div className="service-card glass-panel">
              <div className="icon-box"><i className="fas fa-truck-moving"></i></div>
              <h3>{t.serv_road_title}</h3>
              <p>{t.serv_road_desc}</p>
            </div>
            <div className="service-card glass-panel">
              <div className="icon-box"><i className="fas fa-warehouse"></i></div>
              <h3>{t.serv_store_title}</h3>
              <p>{t.serv_store_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries - Kart Yapısı (Eski Stil) */}
      <section id="industries" className="section-padding dark-bg">
        <div className="container">
          <h2 className="section-title-left">{t.ind_title}</h2>
          <div className="grid-4">
            <div className="industry-card glass-panel">
              <i className="fas fa-anchor ind-icon"></i>
              <h4>{t.ind_ship_title}</h4>
              <p>{t.ind_ship_desc}</p>
            </div>
            <div className="industry-card glass-panel">
              <i className="fas fa-hard-hat ind-icon"></i>
              <h4>{t.ind_steel_title}</h4>
              <p>{t.ind_steel_desc}</p>
            </div>
            <div className="industry-card glass-panel">
              <i className="fas fa-car ind-icon"></i>
              <h4>{t.ind_auto_title}</h4>
              <p>{t.ind_auto_desc}</p>
            </div>
            <div className="industry-card glass-panel">
              <i className="fas fa-pills ind-icon"></i>
              <h4>{t.ind_pharma_title}</h4>
              <p>{t.ind_pharma_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About & Map */}
      <section id="about" className="section-padding">
        <div className="container about-layout">
          <div className="about-text glass-panel">
            <h3>{t.about_title}</h3>
            <p dangerouslySetInnerHTML={{ __html: t.about_text }}></p>
          </div>
          <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x14caa3b2660a53a1:0xe8000ecfba8225a9?sa=X&ved=1t:8290&ictx=111" target="_blank" className="map-link-wrapper">
            <div className="about-visual glass-panel map-hover">
              <div className="map-overlay-label">
                <i className="fas fa-map-marker-alt"></i> <span>HQ: İstanbul</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* FORM BÖLÜMÜ (EN ALTTA) */}
      <section id="quote" className="quote-section">
        <div className="container">
          <div className="quote-wrapper glass-panel">
            <div className="quote-header">
              <h2>{t.form_heading}</h2>
              <p>{t.form_sub}</p>
            </div>
            <form className="big-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="input-group">
                  <label>{t.lbl_company}</label>
                  <input type="text" required />
                </div>
                <div className="input-group">
                  <label>{t.lbl_email}</label>
                  <input type="email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>{t.lbl_phone}</label>
                  <input type="tel" required />
                </div>
                <div className="input-group">
                  <label>{t.lbl_type}</label>
                  <select>
                    <option>General Cargo</option>
                    <option>Temperature Controlled</option>
                    <option>Dangerous Goods</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>{t.lbl_origin}</label>
                  <input type="text" required />
                </div>
                <div className="input-group">
                  <label>{t.lbl_dest}</label>
                  <input type="text" required />
                </div>
              </div>
              <button type="submit" className="submit-btn-large">{t.btn_submit}</button>
            </form>
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
            </div>
            <div className="footer-col">
              <h4>{t.footer_links}</h4>
              <ul><li>Hizmetler</li><li>Teklif Al</li></ul>
            </div>
            <div className="footer-col">
              <h4>{t.footer_legal}</h4>
              <ul><li>Gizlilik Politikası</li></ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Pentagram Logistics.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;