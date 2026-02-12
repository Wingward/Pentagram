import { useState } from 'react';
import './App.css';
import logoImg from './logo.png';

function App() {
  const [lang, setLang] = useState('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const translations = {
    tr: {
      // Navigasyona "İletişim" eklendi
      nav_home: "Ana Sayfa", nav_services: "Hizmetler", nav_industries: "Sektörler", nav_about: "Kurumsal", nav_comm: "İletişim", nav_contact: "Teklif Al",

      hero_title: 'Lojistikte Sınırları <br/><span class="highlight">Pentagram</span> ile Aşın',
      hero_desc: "İstanbul ve Roma ofislerimizle, global ticaretteki en güçlü çözüm ortağınızız. Dünyayı ayağınıza getiriyoruz.",
      hero_cta: "Hemen Teklif Alın",

      stat_countries: "Hizmet Verilen Ülke", stat_clients: "Mutlu Müşteri", stat_tonnage: "Yıllık Tonaj (MT)", stat_exp: "Yıllık Tecrübe",

      serv_title: "Hizmetlerimiz", serv_subtitle: "Tedarik zincirinizin her halkası için optimize edilmiş çözümler.",

      // GÜNCELLENEN UZUN METİNLER
      serv_air_title: "Hava Kargo",
      serv_air_desc: "Acil ve değerli gönderileriniz için IATA lisanslı geniş acente ağımızla hizmetinizdeyiz. Tarifeli uçuşlarda yer garantisi, konsolide yüklemeler ve özel 'Charter' kiralama seçenekleriyle, dünyanın her havalimanına kapıdan kapıya (Door-to-Door) ekspres teslimat sağlıyoruz.",

      serv_sea_title: "Deniz Yolu",
      serv_sea_desc: "Tüm dünya limanlarında güçlü armatör anlaşmalarımızla FCL (Komple) ve LCL (Parsiyel) konteyner taşımacılığı yapıyoruz. Open Top, Flat Rack gibi özel ekipman ihtiyaçlarınızdan, limanlar arası çapraz ticarete (Cross-trade) kadar en maliyet etkin rotaları sizin için planlıyoruz.",

      serv_road_title: "Kara Yolu",
      serv_road_desc: "Avrupa, Orta Doğu ve Türki Cumhuriyetler hattında, Euro 6 standartlarına sahip özmal ve tedarikçi filomuzla hizmet veriyoruz. Düzenli parsiyel çıkışlar, komple tır yüklemeleri (FTL) ve gabari dışı proje taşımacılığı ile yükünüzü güvenle ve tam zamanında teslim ediyoruz.",

      serv_store_title: "Kontrat Lojistiği",
      serv_store_desc: "Sadece taşıma değil, depolama sürecinizi de yönetiyoruz. Gümrüklü ve serbest antrepolarımızda stok takibi, sipariş hazırlama, etiketleme ve katma değerli hizmetler (VAS) sunuyoruz. ERP entegrasyonumuz sayesinde stoklarınızı anlık olarak web üzerinden izleyebilirsiniz.",

      proc_title: "Operasyonel Süreç", proc_sub: "Yükünüzü teslim aldığımız andan itibaren şeffaf bir yolculuk.",
      proc_step1: "Planlama & Analiz", proc_desc1: "Yükünüze en uygun rota ve maliyet analizi yapılır.",
      proc_step2: "Paketleme & Alım", proc_desc2: "Uzman ekiplerimizce yükleme ve lashing işlemleri.",
      proc_step3: "Global Transfer", proc_desc3: "Dijital takip sistemi ile anlık konum bilgilendirmesi.",
      proc_step4: "Teslimat", proc_desc4: "Varış noktasında gümrükleme ve kapı teslimi.",

      ind_title: "Sektörel Uzmanlık",
      ind_ship_title: "Gemi Ekipmanları", ind_ship_desc: "Gemilerin yolda kalmaması için 'Zaman Kritik' teslimat. 7/24 parça transferi.",
      ind_steel_title: "Demir & Çelik", ind_steel_desc: "Ağır tonajlı rulolar ve borular için özel lashing ve 'Heavy Lift' çözümleri.",
      ind_auto_title: "Otomotiv", ind_auto_desc: "Üretim bantlarının durmaması için JIT ve JIS teslimat modelleri.",
      ind_pharma_title: "Sağlık & İlaç", ind_pharma_desc: "GDP standartlarına uygun, sıcaklık kontrollü araçlarla güvenli teslimat.",

      sus_title: "Gelecek İçin Yeşil Lojistik",
      sus_text: "Pentagram Logistics olarak sadece bugünü değil, yarını da taşıyoruz. Karbon ayak izimizi minimize etmek için Euro 6 standartlarında araç filosu kullanıyor, intermodal taşımacılığı teşvik ediyor ve 'Kağıtsız Ofis' politikamızla dijitalleşiyoruz. Doğa ile uyumlu ticaret için varız.",
      sus_badge: "Sürdürülebilirlik Hedefi 2030",

      about_title: "Pentagram Hakkında",
      about_text: "Pentagram Logistics, lojistik sektöründe standartları yeniden belirlemek üzere yola çıkmış, teknoloji odaklı ve çözüm merkezli bir global oyuncudur. İstanbul genel merkezimiz ve stratejik öneme sahip <strong>2026'da açılan Roma ofisimizle</strong>, Avrupa ve Türkiye arasındaki ticaret köprüsünü güçlendiriyoruz. DSV ve Geodis gibi dünya devlerinin hizmet kalitesini, butik ve ulaşılabilir bir hizmet anlayışıyla harmanlayarak sunuyoruz.",

      // İLETİŞİM KISMI
      contact_hq_title: "Genel Merkez (HQ)",
      contact_hq_addr: "Soğanlık Yeni Mah. Pegagaz Sok. No:12 A Blok, Kartal / İstanbul",
      contact_hq_phone: "+90 (216) 555 00 00",
      contact_branch_title: "Avrupa Ofisi",
      contact_branch_addr: "Via Nazionale 184, 00184 Roma RM, Italia",
      contact_branch_phone: "+39 06 1234 5678",

      form_heading: "Navlun Teklifi İste",
      form_sub: "Detayları girin, operasyon ekibimiz en geç 2 saat içinde size dönüş yapsın.",
      lbl_company: "Firma Adı", lbl_email: "E-posta", lbl_phone: "Telefon", lbl_origin: "Çıkış Noktası", lbl_dest: "Varış Noktası",
      lbl_mode: "Taşıma Modu", lbl_cargo_type: "Yük Cinsi", lbl_vehicle: "Araç Tipi",
      lbl_dims: "Ölçüler (En x Boy x Yük.)", lbl_weight: "Tonaj (kg)", lbl_stack: "İstiflenebilir?",
      lbl_note: "Sipariş Notları / Özel İstekler",
      opt_air: "Hava Yolu", opt_sea: "Deniz Yolu", opt_road: "Kara Yolu",
      opt_yes: "Evet", opt_no: "Hayır",
      btn_submit: "Teklifi Gönder",

      footer_links: "Hızlı Bağlantılar", footer_legal: "Yasal & Gizlilik",
    },
    en: {
      nav_home: "Home", nav_services: "Services", nav_industries: "Industries", nav_about: "About", nav_comm: "Contact", nav_contact: "Get Quote",
      hero_title: 'Cross Borders with <br/><span class="highlight">Pentagram</span>',
      hero_desc: "Your strongest partner in global trade with our Istanbul and Rome offices.",
      hero_cta: "Get a Quote Now",

      stat_countries: "Countries Served", stat_clients: "Happy Clients", stat_tonnage: "Annual Tonnage", stat_exp: "Years Experience",

      serv_title: "Our Services", serv_subtitle: "Optimized solutions for every link of your supply chain.",

      // UPDATED LONG TEXTS EN
      serv_air_title: "Air Freight",
      serv_air_desc: "We serve your urgent and valuable shipments with our IATA licensed global agency network. We provide express Door-to-Door delivery to all airports worldwide with space guarantee on scheduled flights, consolidated shipments, and private 'Charter' options.",

      serv_sea_title: "Sea Freight",
      serv_sea_desc: "We provide FCL (Full) and LCL (Partial) container transport with strong shipowner agreements in all world ports. We plan the most cost-effective routes for you, from special equipment needs like Open Top, Flat Rack to Cross-trade operations.",

      serv_road_title: "Road Freight",
      serv_road_desc: "We operate on the Europe, Middle East, and Turkic Republics line with our Euro 6 standard fleet. We deliver your cargo safely and on time with regular partial departures, full truckloads (FTL), and out-of-gauge project transportation.",

      serv_store_title: "Contract Logistics",
      serv_store_desc: "We manage not only your transport but also your warehousing process. We offer inventory tracking, order preparation, labeling, and value-added services (VAS) in our bonded and free warehouses. You can monitor your stocks instantly via the web.",

      proc_title: "Operational Process", proc_sub: "A transparent journey from pick-up to delivery.",
      proc_step1: "Planning & Analysis", proc_desc1: "Route optimization and cost analysis for your cargo.",
      proc_step2: "Packing & Pick-up", proc_desc2: "Professional loading and lashing by our experts.",
      proc_step3: "Global Transit", proc_desc3: "Instant location tracking with digital systems.",
      proc_step4: "Final Delivery", proc_desc4: "Customs clearance and door delivery at destination.",

      ind_title: "Industry Expertise",
      ind_ship_title: "Ship Spares", ind_ship_desc: "Time-critical delivery to keep vessels moving.",
      ind_steel_title: "Iron & Steel", ind_steel_desc: "Special lashing and Heavy Lift solutions.",
      ind_auto_title: "Automotive", ind_auto_desc: "Just-in-Time solutions for production lines.",
      ind_pharma_title: "Healthcare", ind_pharma_desc: "GDP compliant temperature controlled transport.",

      sus_title: "Green Logistics for Future",
      sus_text: "At Pentagram Logistics, we carry not just for today but for tomorrow. We minimize our carbon footprint using Euro 6 fleet standards, promoting intermodal transport, and digitizing with our 'Paperless Office' policy.",
      sus_badge: "Sustainability Goal 2030",

      about_title: "About Pentagram",
      about_text: "Pentagram Logistics is a technology-driven global player. With our Istanbul HQ and strategic <strong>Rome office opened in 2026</strong>, we strengthen the trade bridge between Europe and Turkey. We offer world-class service quality with a boutique approach.",

      contact_hq_title: "Headquarters (HQ)",
      contact_hq_addr: "Soğanlık Yeni Mah. Pegagaz Sok. No:12 Block A, Kartal / Istanbul",
      contact_hq_phone: "+90 (216) 555 00 00",
      contact_branch_title: "Europe Office",
      contact_branch_addr: "Via Nazionale 184, 00184 Roma RM, Italy",
      contact_branch_phone: "+39 06 1234 5678",

      form_heading: "Request Freight Quote", form_sub: "Enter details, our team will reply within 2 hours.",
      lbl_company: "Company", lbl_email: "Email", lbl_phone: "Phone", lbl_origin: "Origin", lbl_dest: "Destination",
      lbl_mode: "Transport Mode", lbl_cargo_type: "Cargo Nature", lbl_vehicle: "Vehicle Type",
      lbl_dims: "Dims (L x W x H)", lbl_weight: "Weight (kg)", lbl_stack: "Stackable?",
      lbl_note: "Order Notes / Special Requests",
      opt_air: "Air Freight", opt_sea: "Sea Freight", opt_road: "Road Freight", opt_yes: "Yes", opt_no: "No",
      btn_submit: "Send Request",
      footer_links: "Quick Links", footer_legal: "Legal"
    },
    it: {
      nav_home: "Home", nav_services: "Servizi", nav_industries: "Settori", nav_about: "Chi Siamo", nav_comm: "Contatto", nav_contact: "Preventivo",
      hero_title: 'Oltrepassa i Confini con <br/><span class="highlight">Pentagram</span>',
      hero_desc: "Il tuo partner più forte nel commercio globale con i nostri uffici di Istanbul e Roma.",
      hero_cta: "Richiedi Ora",

      stat_countries: "Paesi Serviti", stat_clients: "Clienti Felici", stat_tonnage: "Tonnellaggio Annuo", stat_exp: "Anni di Esperienza",

      serv_title: "I Nostri Servizi", serv_subtitle: "Soluzioni ottimizzate per ogni anello della tua supply chain.",

      // UPDATED LONG TEXTS IT
      serv_air_title: "Trasporto Aereo",
      serv_air_desc: "Serviamo le vostre spedizioni urgenti con la nostra rete di agenzie globali con licenza IATA. Forniamo consegne espresse Door-to-Door a tutti gli aeroporti del mondo con garanzia di spazio su voli di linea e opzioni 'Charter' private.",

      serv_sea_title: "Trasporto Marittimo",
      serv_sea_desc: "Forniamo trasporto container FCL e LCL con forti accordi armatoriali. Pianifichiamo le rotte più convenienti per voi, dalle esigenze di attrezzature speciali come Open Top, Flat Rack alle operazioni Cross-trade.",

      serv_road_title: "Trasporto Stradale",
      serv_road_desc: "Operiamo sulla linea Europa, Medio Oriente e Repubbliche Turche con la nostra flotta standard Euro 6. Consegniamo il vostro carico in sicurezza e puntualità con partenze parziali regolari e carichi completi (FTL).",

      serv_store_title: "Logistica",
      serv_store_desc: "Gestiamo non solo il trasporto ma anche il processo di magazzinaggio. Offriamo tracciamento dell'inventario, preparazione degli ordini e servizi a valore aggiunto (VAS) nei nostri magazzini doganali e liberi.",

      proc_title: "Processo Operativo", proc_sub: "Un viaggio trasparente dal ritiro alla consegna.",
      proc_step1: "Pianificazione", proc_desc1: "Ottimizzazione del percorso e analisi dei costi.",
      proc_step2: "Imballaggio e Ritiro", proc_desc2: "Carico professionale e fissaggio dai nostri esperti.",
      proc_step3: "Transito Globale", proc_desc3: "Tracciamento della posizione istantaneo con sistemi digitali.",
      proc_step4: "Consegna Finale", proc_desc4: "Sdoganamento e consegna a domicilio a destinazione.",

      ind_title: "Competenza Settoriale",
      ind_ship_title: "Ricambi Navali", ind_ship_desc: "Consegna critica per mantenere le navi in movimento.",
      ind_steel_title: "Ferro e Acciaio", ind_steel_desc: "Soluzioni speciali di lashing e Heavy Lift.",
      ind_auto_title: "Automotive", ind_auto_desc: "Soluzioni Just-in-Time per le linee di produzione.",
      ind_pharma_title: "Salute", ind_pharma_desc: "Trasporto a temperatura controllata conforme al GDP.",

      sus_title: "Logistica Verde",
      sus_text: "In Pentagram Logistics, non trasportiamo solo per oggi ma per domani. Riduciamo la nostra impronta di carbonio utilizzando flotte Euro 6.",
      sus_badge: "Obiettivo Sostenibilità 2030",

      about_title: "Su Pentagram",
      about_text: "Pentagram Logistics è un attore globale guidato dalla tecnologia. Con la nostra sede a Istanbul e l'ufficio strategico di <strong>Roma aperto nel 2026</strong>, rafforziamo il ponte commerciale tra Europa e Turchia.",

      contact_hq_title: "Sede Centrale (HQ)",
      contact_hq_addr: "Soğanlık Yeni Mah. Pegagaz Sok. No:12 Blocco A, Kartal / Istanbul",
      contact_hq_phone: "+90 (216) 555 00 00",
      contact_branch_title: "Ufficio Europa",
      contact_branch_addr: "Via Nazionale 184, 00184 Roma RM, Italia",
      contact_branch_phone: "+39 06 1234 5678",

      form_heading: "Richiedi Preventivo", form_sub: "Inserisci i dettagli, il nostro team risponderà entro 2 ore.",
      lbl_company: "Azienda", lbl_email: "Email", lbl_phone: "Telefono", lbl_origin: "Origine", lbl_dest: "Destinazione",
      lbl_mode: "Modo di Trasporto", lbl_cargo_type: "Natura Merce", lbl_vehicle: "Tipo Veicolo",
      lbl_dims: "Dimensioni", lbl_weight: "Peso (kg)", lbl_stack: "Impilabile?",
      lbl_note: "Note sull'ordine / Richieste speciali",
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
            <li><a href="#about">{t.nav_comm}</a></li> {/* İletişim eklendi */}
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

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">120+</span>
              <span className="stat-label">{t.stat_countries}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">{t.stat_clients}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25K</span>
              <span className="stat-label">{t.stat_tonnage}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15</span>
              <span className="stat-label">{t.stat_exp}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
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

      {/* Operational Process */}
      <section className="process-section section-padding dark-bg">
        <div className="container">
          <div className="section-header">
            <h2>{t.proc_title}</h2>
            <p>{t.proc_sub}</p>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-icon glass-panel">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <h4>{t.proc_step1}</h4>
              <p>{t.proc_desc1}</p>
            </div>
            <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-icon glass-panel">
                <i className="fas fa-box-open"></i>
              </div>
              <h4>{t.proc_step2}</h4>
              <p>{t.proc_desc2}</p>
            </div>
            <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-icon glass-panel">
                <i className="fas fa-globe-americas"></i>
              </div>
              <h4>{t.proc_step3}</h4>
              <p>{t.proc_desc3}</p>
            </div>
            <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-icon glass-panel">
                <i className="fas fa-flag-checkered"></i>
              </div>
              <h4>{t.proc_step4}</h4>
              <p>{t.proc_desc4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="section-padding">
        <div className="container">
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

      {/* Sustainability */}
      <section className="sustainability-section">
        <div className="container">
          <div className="sustain-wrapper glass-panel">
            <div className="sustain-content">
              <div className="sustain-badge">{t.sus_badge}</div>
              <h2>{t.sus_title}</h2>
              <p>{t.sus_text}</p>
            </div>
            <div className="sustain-icon">
              <i className="fas fa-leaf"></i>
            </div>
          </div>
        </div>
      </section>

      {/* About & Map (YENİ İLETİŞİM KISMI EKLENDİ) */}
      <section id="about" className="section-padding">
        <div className="container about-layout">
          {/* Sol taraf: Hakkında + Adresler */}
          <div className="about-left-col">
            <div className="about-text glass-panel">
              <h3>{t.about_title}</h3>
              <p dangerouslySetInnerHTML={{ __html: t.about_text }}></p>
            </div>

            {/* Yeni İletişim Kutusu */}
            <div className="contact-details-box glass-panel mt-4">
              <div className="contact-row">
                <div className="icon-box"><i className="fas fa-building"></i></div>
                <div>
                  <h5>{t.contact_hq_title}</h5>
                  <p>{t.contact_hq_addr}</p>
                  <p className="contact-phone">{t.contact_hq_phone}</p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="contact-row">
                <div className="icon-box"><i className="fas fa-globe-europe"></i></div>
                <div>
                  <h5>{t.contact_branch_title}</h5>
                  <p>{t.contact_branch_addr}</p>
                  <p className="contact-phone">{t.contact_branch_phone}</p>
                </div>
              </div>
            </div>
          </div>

          <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x14caa3b2660a53a1:0xe8000ecfba8225a9?sa=X&ved=1t:8290&ictx=111" target="_blank" rel="noopener noreferrer" className="map-link-wrapper">
            <div className="about-visual glass-panel">
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

      {/* Quote Form */}
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
                <div className="input-group">
                  <label>{t.lbl_phone}</label>
                  <input type="tel" required />
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

              {/* YENİ TEXTAREA KISMI */}
              <div className="form-row-full">
                <div className="input-group">
                  <label>{t.lbl_note}</label>
                  <textarea rows="4" placeholder="..."></textarea>
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
              <p>HQ: İSTMarina, Kartal / İstanbul</p>
              <p>Branch: Via Nazionale, Roma / Italia</p>
              <p>Email: sales@pentagramlogistics.com</p>
            </div>
            <div className="footer-col">
              <h4>{t.footer_links}</h4>
              <ul>
                <li><a href="#services">{t.nav_services}</a></li>
                <li><a href="#industries">{t.nav_industries}</a></li>
                <li><a href="#about">{t.nav_about}</a></li>
                <li><a href="#quote">{t.nav_contact}</a></li>
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