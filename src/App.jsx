import { useState } from 'react';
import './App.css';
import logoImg from './logo.png';

function App() {
  const [lang, setLang] = useState('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const translations = {
    tr: {
      nav_home: "Ana Sayfa", nav_services: "Hizmetler", nav_industries: "Sektörler", nav_about: "Kurumsal", nav_contact: "Teklif Al",

      hero_title: 'Lojistikte Sınırları <br/><span class="highlight">Pentagram</span> ile Aşın',
      hero_desc: "İstanbul ve Roma ofislerimizle, global ticaretteki en güçlü çözüm ortağınızız. Dünyayı ayağınıza getiriyoruz.",
      hero_cta: "Hemen Teklif Alın",

      serv_title: "Hizmetlerimiz", serv_subtitle: "Tedarik zincirinizin her halkası için optimize edilmiş çözümler.",
      serv_air_title: "Hava Kargo", serv_air_desc: "Zamanla yarışan yükleriniz için global havayolu anlaşmalarımızla öncelikli yer garantisi.",
      serv_sea_title: "Deniz Yolu", serv_sea_desc: "Dünyanın tüm limanlarına FCL ve LCL servisler. Düzenli haftalık çıkışlarla maliyet avantajı.",
      serv_road_title: "Kara Yolu", serv_road_desc: "Avrupa ve Orta Doğu'ya geniş araç filomuzla komple ve parsiyel taşımacılık.",
      serv_store_title: "Kontrat Lojistiği", serv_store_desc: "Gümrüklü ve serbest depolama alanlarımızda stok yönetimi ve size özel entegre çözümler.",

      ind_title: "Sektörel Uzmanlık",
      ind_ship_title: "Gemi Ekipmanları", ind_ship_desc: "Gemilerin yolda kalmaması için 'Zaman Kritik' teslimat. 7/24 parça transferi.",
      ind_steel_title: "Demir & Çelik", ind_steel_desc: "Ağır tonajlı rulolar ve borular için özel lashing ve 'Heavy Lift' çözümleri.",
      ind_auto_title: "Otomotiv", ind_auto_desc: "Üretim bantlarının durmaması için JIT ve JIS teslimat modelleri.",
      ind_pharma_title: "Sağlık & İlaç", ind_pharma_desc: "GDP standartlarına uygun, sıcaklık kontrollü araçlarla güvenli teslimat.",

      about_title: "Pentagram Hakkında",
      about_text: "Pentagram Logistics, lojistik sektöründe standartları yeniden belirlemek üzere yola çıkmış, teknoloji odaklı ve çözüm merkezli bir global oyuncudur. İstanbul (İSTMarina) genel merkezimiz ve stratejik öneme sahip <strong>2026'da açılan Roma ofisimizle</strong>, Avrupa ve Türkiye arasındaki ticaret köprüsünü güçlendiriyoruz. Sadece yükünüzü taşımıyor; tedarik zincirinizi optimize ederek işinize değer katıyoruz. DSV ve Geodis gibi dünya devlerinin hizmet kalitesini, butik ve ulaşılabilir bir hizmet anlayışıyla harmanlayarak sunuyoruz.",

      form_heading: "Navlun Teklifi İste",
      form_sub: "Detayları girin, operasyon ekibimiz en geç 2 saat içinde size dönüş yapsın.",
      lbl_company: "Firma Adı", lbl_email: "E-posta", lbl_phone: "Telefon", lbl_origin: "Çıkış Noktası", lbl_dest: "Varış Noktası",
      lbl_mode: "Taşıma Modu", lbl_cargo_type: "Yük Cinsi", lbl_vehicle: "Araç Tipi",
      lbl_dims: "Ölçüler (En x Boy x Yük.)", lbl_weight: "Tonaj (kg)", lbl_stack: "İstiflenebilir?",
      opt_air: "Hava Yolu", opt_sea: "Deniz Yolu", opt_road: "Kara Yolu",
      opt_yes: "Evet", opt_no: "Hayır",
      btn_submit: "Teklifi Gönder",

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
      about_title: "About Pentagram",
      about_text: "Pentagram Logistics is a technology-driven global player. With our Istanbul HQ and strategic <strong>Rome office opened in 2026</strong>, we strengthen the trade bridge between Europe and Turkey. We offer world-class service quality with a boutique approach.",
      form_heading: "Request Freight Quote", form_sub: "Enter details, our team will reply within 2 hours.",
      lbl_company: "Company", lbl_email: "Email", lbl_phone: "Phone", lbl_origin: "Origin", lbl_dest: "Destination",
      lbl_mode: "Transport Mode", lbl_cargo_type: "Cargo Nature", lbl_vehicle: "Vehicle Type",
      lbl_dims: "Dims (L x W x H)", lbl_weight: "Weight (kg)", lbl_stack: "Stackable?",
      opt_air: "Air Freight", opt_sea: "Sea Freight", opt_road: "Road Freight", opt_yes: "Yes", opt_no: "No",
      btn_submit: "Send Request",
      footer_links: "Quick Links", footer_legal: "Legal"
    },
    it: {
      nav_home: "Home", nav_services: "Servizi", nav_industries: "Settori", nav_about: "Chi Siamo", nav_contact: "Preventivo",
      hero_title: 'Oltrepassa i Confini con <br/><span class="highlight">Pentagram</span>',
      hero_desc: "Il tuo partner più forte nel commercio globale con i nostri uffici di Istanbul e Roma.",
      hero_cta: "Richiedi Ora",
      serv_title: "I Nostri Servizi", serv_subtitle: "Soluzioni ottimizzate per ogni anello della tua supply chain.",
      serv_air_title: "Trasporto Aereo", serv_air_desc: "Garanzia di spazio prioritario con accordi aerei globali.",
      serv_sea_title: "Trasporto Marittimo", serv_sea_desc: "Servizi FCL e LCL verso tutti i porti del mondo.",
      serv_road_title: "Trasporto Stradale", serv_road_desc: "Trasporto completo e parziale in Europa e Medio Oriente.",
      serv_store_title: "Logistica", serv_store_desc: "Soluzioni di magazzino integrate su misura per te.",
      ind_title: "Competenza Settoriale",
      ind_ship_title: "Ricambi Navali", ind_ship_desc: "Consegna critica per mantenere le navi in movimento.",
      ind_steel_title: "Ferro e Acciaio", ind_steel_desc: "Soluzioni speciali di lashing e Heavy Lift.",
      ind_auto_title: "Automotive", ind_auto_desc: "Soluzioni Just-in-Time per le linee di produzione.",
      ind_pharma_title: "Salute", ind_pharma_desc: "Trasporto a temperatura controllata conforme al GDP.",
      about_title: "Su Pentagram",
      about_text: "Pentagram Logistics è un attore globale guidato dalla tecnologia. Con la nostra sede a Istanbul e l'ufficio strategico di <strong>Roma aperto nel 2026</strong>, rafforziamo il ponte commerciale tra Europa e Turchia.",
      form_heading: "Richiedi Preventivo", form_sub: "Inserisci i dettagli, il nostro team risponderà entro 2 ore.",
      lbl_company: "Azienda", lbl_email: "Email", lbl_phone: "Telefono", lbl_origin: "Origine", lbl_dest: "Destinazione",
      lbl_mode: "Modo di Trasporto", lbl_cargo_type: "Natura Merce", lbl_vehicle: "Tipo Veicolo",
      lbl_dims: "Dimensioni", lbl_weight: "Peso (kg)", lbl_stack: "Impilabile?",
      opt_air: "Aereo", opt_sea: "Mare", opt_road: "Strada", opt_yes: "Sì", opt_no: "No",
      btn_submit: "Invia Richiesta",
      footer_links: "Link Rapidi", footer_legal: "Legale"
    }
  };

  const t = translations[lang] || translations['tr'];

  return (
    <>
      {/* Navbar */}
      <nav className="glass-nav">
        <div className="container nav-container">
          <div className="logo-area">
            {/* LÜTFEN DİKKAT: public klasöründeki dosya adının tam olarak 'logo-white.jpg' olduğundan emin olun */}
            <img src={logoImg} alt="Logo" className="nav-logo" />
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
            <li><a href="#quote">{t.nav_contact}</a></li>
          </ul>
          <div className="right-actions">
            <div className="lang-switch">
              <button className={lang === 'tr' ? 'active' : ''} onClick={() => setLang('tr')}>TR</button>
              <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
              <button className={lang === 'it' ? 'active' : ''} onClick={() => setLang('it')}>IT</button>
            </div>
            <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero-section">
        <div className="logistics-animation">
          <div className="world-map-bg"></div>
          <div className="moving-icon plane"><i className="fas fa-plane"></i></div>
          <div className="moving-icon ship"><i className="fas fa-ship"></i></div>
          <div className="moving-icon truck"><i className="fas fa-truck"></i></div>
        </div>

        <div className="container hero-content-center">
          <h1 dangerouslySetInnerHTML={{ __html: t.hero_title }}></h1>
          <p>{t.hero_desc}</p>
          <a href="#quote" className="hero-btn-pulse">{t.hero_cta}</a>
        </div>
      </header>

      {/* Services (UNIFIED CARD STYLE) */}
      <section id="services" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>{t.serv_title}</h2>
            <p>{t.serv_subtitle}</p>
          </div>
          <div className="grid-4">
            <div className="unified-card glass-panel">
              <i className="fas fa-plane-departure card-icon"></i>
              <h3>{t.serv_air_title}</h3>
              <p>{t.serv_air_desc}</p>
            </div>
            <div className="unified-card glass-panel">
              <i className="fas fa-ship card-icon"></i>
              <h3>{t.serv_sea_title}</h3>
              <p>{t.serv_sea_desc}</p>
            </div>
            <div className="unified-card glass-panel">
              <i className="fas fa-truck-moving card-icon"></i>
              <h3>{t.serv_road_title}</h3>
              <p>{t.serv_road_desc}</p>
            </div>
            <div className="unified-card glass-panel">
              <i className="fas fa-warehouse card-icon"></i>
              <h3>{t.serv_store_title}</h3>
              <p>{t.serv_store_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries (UNIFIED CARD STYLE) */}
      <section id="industries" className="section-padding dark-bg">
        <div className="container">
          {/* Başlık padding */}
          <div className="header-spacer">
            <h2 className="section-title-left">{t.ind_title}</h2>
          </div>

          <div className="grid-4">
            <div className="unified-card glass-panel">
              <i className="fas fa-anchor card-icon"></i>
              <h3>{t.ind_ship_title}</h3>
              <p>{t.ind_ship_desc}</p>
            </div>
            <div className="unified-card glass-panel">
              <i className="fas fa-hard-hat card-icon"></i>
              <h3>{t.ind_steel_title}</h3>
              <p>{t.ind_steel_desc}</p>
            </div>
            <div className="unified-card glass-panel">
              <i className="fas fa-car card-icon"></i>
              <h3>{t.ind_auto_title}</h3>
              <p>{t.ind_auto_desc}</p>
            </div>
            <div className="unified-card glass-panel">
              <i className="fas fa-pills card-icon"></i>
              <h3>{t.ind_pharma_title}</h3>
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

          <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x14caa3b2660a53a1:0xe8000ecfba8225a9?sa=X&ved=1t:8290&ictx=111" target="_blank" rel="noopener noreferrer" className="map-link-wrapper">
            <div className="about-visual glass-panel">
              {/* Canlı Google Harita */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3016.307574864766!2d29.1894443156546!3d40.88944447931296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac504067888c7%3A0x1247076922485636!2sIstmarina%20AVM!5e0!3m2!1str!2str!4v1675123456789!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pentagram Logistics Location"
              ></iframe>
              <div className="map-overlay-label">
                <i className="fas fa-map-marker-alt"></i> <span>HQ: İSTMarina / İstanbul</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* DETAYLI FORM BÖLÜMÜ */}
      <section id="quote" className="quote-section">
        <div className="container">
          <div className="quote-wrapper glass-panel">
            <div className="quote-header">
              <h2>{t.form_heading}</h2>
              <p>{t.form_sub}</p>
            </div>
            <form className="big-form" onSubmit={(e) => e.preventDefault()}>
              {/* 1. Sıra: İletişim */}
              <div className="form-row">
                <div className="input-group">
                  <label>{t.lbl_company}</label>
                  <input type="text" required />
                </div>
                <div className="input-group">
                  <label>{t.lbl_email}</label>
                  <input type="email" required />
                </div>
                <div className="input-group">
                  <label>{t.lbl_phone}</label>
                  <input type="tel" required />
                </div>
              </div>

              {/* 2. Sıra: Rota */}
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

              {/* 3. Sıra: Yük Detayları (YENİ) */}
              <div className="form-row">
                <div className="input-group">
                  <label>{t.lbl_mode}</label>
                  <select>
                    <option>{t.opt_sea}</option>
                    <option>{t.opt_air}</option>
                    <option>{t.opt_road}</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>{t.lbl_vehicle}</label>
                  <select>
                    <option>Tenteli / Tilt</option>
                    <option>Frigo / Reefer</option>
                    <option>Kutu / Box</option>
                    <option>Mega</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>{t.lbl_cargo_type}</label>
                  <select>
                    <option>Genel Kargo</option>
                    <option>Tehlikeli Madde (IMO)</option>
                    <option>Bozulabilir (Perishable)</option>
                    <option>Dökme (Bulk)</option>
                  </select>
                </div>
              </div>

              {/* 4. Sıra: Ölçüler */}
              <div className="form-row">
                <div className="input-group">
                  <label>{t.lbl_dims}</label>
                  <input type="text" placeholder="120x80x100 cm" />
                </div>
                <div className="input-group">
                  <label>{t.lbl_weight}</label>
                  <input type="number" placeholder="1500" />
                </div>
                <div className="input-group">
                  <label>{t.lbl_stack}</label>
                  <select>
                    <option>{t.opt_yes}</option>
                    <option>{t.opt_no}</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="submit-btn-large">{t.btn_submit}</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER - CLASSIC GRID STYLE (İlk Beğendiğin Tarz) */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-grid">

            {/* Sol Kolon: Firma Bilgileri */}
            <div className="footer-col">
              <h4>PENTAGRAM</h4>
              <p>HQ: İSTMarina, Kartal / İstanbul</p>
              <p>Branch: Via Nazionale, Roma / Italia</p>
              <p>Email: sales@pentagramlogistics.com</p>
            </div>

            {/* Orta Kolon: Linkler */}
            <div className="footer-col">
              <h4>{t.footer_links}</h4>
              <ul>
                <li><a href="#services">{t.nav_services}</a></li>
                <li><a href="#industries">{t.nav_industries}</a></li>
                <li><a href="#about">{t.nav_about}</a></li>
                <li><a href="#quote">{t.nav_contact}</a></li>
              </ul>
            </div>

            {/* Sağ Kolon: Yasal */}
            <div className="footer-col">
              <h4>{t.footer_legal}</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Compliance</a></li>
              </ul>
            </div>
          </div>

          {/* Alt Bar: Telif ve Sosyal Medya */}
          <div className="footer-bottom">
            <p>© 2026 Pentagram Logistics. All rights reserved.</p>
            <div className="socials">
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-facebook"></i>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;