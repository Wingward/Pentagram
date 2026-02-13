import { useState } from 'react';
import './App.css';
import logoImg from './logo.png';

function App() {
  const [lang, setLang] = useState('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- FORM STATE YÖNETİMİ ---
  const [cargoList, setCargoList] = useState([]);
  const [transportMode, setTransportMode] = useState('road');
  const [fileName, setFileName] = useState('');

  const [currentCargo, setCurrentCargo] = useState({
    dims: '',
    weight: '',
    count: '',
    stack: 'Evet'
  });

  const vehicleOptions = {
    road: ['opt_tilt', 'opt_frigo', 'opt_box', 'opt_mega', 'opt_lowbed'],
    sea: ['opt_20dc', 'opt_40dc', 'opt_40hc', 'opt_opentop', 'opt_flatrack'],
    air: ['opt_std_air', 'opt_charter', 'opt_express']
  };

  const addCargo = () => {
    if (currentCargo.dims && currentCargo.weight && currentCargo.count) {
      setCargoList([...cargoList, currentCargo]);
      setCurrentCargo({ ...currentCargo, dims: '', weight: '', count: '' });
    } else {
      alert("Lütfen ölçü, tonaj ve adet bilgilerini giriniz.");
    }
  };

  const removeCargo = (index) => {
    setCargoList(cargoList.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Dosya boyutu 5MB sınırını aşamaz!");
        e.target.value = "";
        setFileName('');
      } else {
        setFileName(file.name);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const company = e.target.company.value;
    const mode = e.target.mode.value;
    const vehicle = e.target.vehicle.value;

    let cargoText = cargoList.map((item, i) =>
      `${i + 1}. Palet: ${item.dims} cm | ${item.weight} kg | ${item.count} Adet | İstif: ${item.stack}`
    ).join('\n');

    if (cargoList.length === 0) cargoText = "Kargo detayları girilmedi.";

    const body = `Firma: ${company}\nTel: ${e.target.phone.value}\nMod: ${mode}\nAraç/Ekipman: ${vehicle}\n\nKargo Listesi:\n${cargoText}\n\nNot: ${e.target.note.value}`;

    window.location.href = `mailto:alp@pentagramlogistics.com?subject=Navlun Teklif - ${company}&body=${encodeURIComponent(body)}`;
  };

  const translations = {
    tr: {
      nav_home: "Ana Sayfa", nav_services: "Hizmetler", nav_industries: "Sektörler", nav_about: "Kurumsal", nav_comm: "İletişim", nav_contact: "Teklif Al",
      hero_title: 'Sınırların Ötesine <br/><span class="highlight">Pentagram Logistics</span> ile Ulaşın',
      hero_desc: "İstanbul ve Roma ofislerimizle, global ticaretteki en güçlü çözüm ortağınızız.",
      hero_cta: "Hemen Teklif Alın",
      marquee_title: "GLOBAL HİZMET AĞI",

      serv_title: "Hizmetlerimiz", serv_subtitle: "Tedarik zincirinizin her halkası için optimize edilmiş çözümler.",
      serv_air_title: "Hava Kargo",
      serv_air_desc: "Acil ve değerli gönderileriniz için IATA lisanslı geniş acente ağımızla hizmetinizdeyiz. Tarifeli uçuşlarda yer garantisi, konsolide yüklemeler ve özel 'Charter' seçenekleriyle dünyanın her noktasına en hızlı erişimi sağlıyoruz.",

      serv_sea_title: "Deniz Yolu",
      serv_sea_desc: "Tüm dünya limanlarında güçlü armatör kontratlarımızla FCL ve LCL konteyner taşımacılığı yapıyoruz. Gabari dışı yükleriniz ve Cross-Trade operasyonlarınız için en maliyet etkin rotaları planlıyoruz.",

      serv_road_title: "Kara Yolu",
      serv_road_desc: "Avrupa, Orta Doğu ve Türki Cumhuriyetler hattında, geniş acente ağımızla komple ve parsiyel taşımacılık hizmeti veriyoruz. Yanıcı ve tehlikeli maddelerin (ADR) güvenli sevkiyatından, ekspres minivan servisine kadar her yükü zamanında ulaştırıyoruz.",

      serv_store_title: "Proje & Antrepo",
      serv_store_desc: "Standart dışı, ağır ve gabari yükleriniz için mühendislik odaklı proje taşımacılığı sunuyoruz. Türkiye ve Avrupa'daki gümrüklü/serbest antrepolarımızda depolama ve dağıtım süreçlerinizi tek elden yönetiyoruz.",

      proc_title: "Operasyonel Süreç", proc_sub: "Yükünüzü teslim aldığımız andan itibaren şeffaf bir yolculuk.",
      proc_step1: "Planlama & Analiz", proc_desc1: "Yükünüze en uygun rota, mod ve maliyet analizi yapılır.",
      proc_step2: "Paketleme & Alım", proc_desc2: "Uzman ekiplerimizce yükleme ve lashing işlemleri gerçekleştirilir.",
      proc_step3: "Global Transfer", proc_desc3: "Dijital takip sistemi ile anlık konum ve durum bilgilendirmesi.",
      proc_step4: "Teslimat", proc_desc4: "Varış noktasında gümrükleme ve kapı teslimi tamamlanır.",

      ind_title: "Sektörel Uzmanlık",
      ind_ship_title: "Gemi Ekipmanları", ind_ship_desc: "Gemilerin yolda kalmaması hayati önem taşır. Dünyanın tüm limanlarına gemi yedek parçalarını 'On-Board' teslimat hassasiyetiyle ve 7/24 operasyon desteğiyle ulaştırıyoruz.",
      ind_steel_title: "Demir & Çelik", ind_steel_desc: "Ağır tonajlı rulolar, borular ve sac levhalar için özel dorseler ve 'Heavy Lift' ekipmanları kullanıyoruz. Yük güvenliği için sertifikalı lashing hizmeti sağlıyoruz.",
      ind_auto_title: "Yanıcı Maddeler", ind_auto_desc: "Kimya ve endüstriyel üretimde kullanılan yanıcı, parlayıcı ve tehlikeli maddelerin (IMO/ADR) uluslararası regülasyonlara tam uyumlu ve sertifikalı olarak taşınmasında uzmanız.",
      ind_pharma_title: "Yedek Parça", ind_pharma_desc: "Fabrikaların ve üretim hatlarının durmaması için hayati öneme sahip yedek parçaları, 'zaman kritik' hassasiyetle ve ekspres çözümlerle dünyanın her noktasına ulaştırıyoruz.",

      sus_title: "Sarsılmaz Güven ve Şeffaflık",
      sus_text: "Pentagram Logistics olarak işimizin merkezine 'Güven'i koyuyoruz. Şeffaf süreç yönetimimiz, ulaşılabilir uzman ekibimiz ve verdiğimiz sözleri tutma konusundaki hassasiyetimizle, yükünüzü değil işinizi sahipleniyoruz. Sürpriz maliyetler yok, sadece planlandığı gibi işleyen kusursuz bir süreç var.",
      sus_badge: "Güvenilir Çözüm Ortağı",

      about_title: "Pentagram Hakkında",
      about_text: "Pentagram Logistics, global ticarette hız ve güvenin yeni tanımı olmak üzere yola çıkmış, teknoloji odaklı bir çözüm ortağıdır. İstanbul'daki genel merkezimiz ve stratejik <strong>Roma Ofisimiz</strong> ile Avrupa ve Türkiye arasında güçlü bir lojistik köprüsü kuruyoruz. Butik hizmet anlayışımızla, her müşterimizin ihtiyacına özel, esnek ve şeffaf süreçler tasarlıyor; karmaşık lojistik operasyonlarını sizin için basitleştiriyoruz. Sadece yükünüzü değil, işinizi geleceğe taşıyoruz.",

      contact_hq_title: "Genel Merkez (HQ)", contact_hq_addr: "İstMarina - Kartal - İstanbul - Türkiye", contact_hq_phone: "+90 (216) 208 92 24",
      contact_branch_title: "Avrupa Ofisi", contact_branch_addr: "Via Nazionale 184, 00184 Roma RM, Italia", contact_branch_phone: "+39 06 1234 5678",

      form_heading: "Navlun Teklifi İste", form_sub: "Detayları girin, operasyon ekibimiz en geç 2 saat içinde size dönüş yapsın.",
      lbl_company: "Firma Adı", lbl_email: "E-posta", lbl_phone: "Telefon", lbl_origin: "Çıkış Noktası", lbl_dest: "Varış Noktası",
      lbl_mode: "Taşıma Modu", lbl_cargo_type: "Yük Cinsi", lbl_vehicle: "Araç / Ekipman Tipi",
      lbl_dims: "Ölçüler (En x Boy x Yük.)", lbl_weight: "Tonaj (kg)", lbl_stack: "İstiflenebilir?",
      lbl_palette: "Palet Sayısı", lbl_palette_ph: "Adet",
      lbl_note: "Sipariş Notları / Özel İstekler", lbl_file: "Yük Dokümanı / Görsel", btn_file_select: "Dosya Seç",
      btn_add: "+ Listeye Ekle", btn_submit: "Teklifi Gönder",
      opt_yes: "Evet", opt_no: "Hayır",

      opt_road: "Kara Yolu", opt_sea: "Deniz Yolu", opt_air: "Hava Yolu",
      opt_tilt: "Tenteli Tır", opt_frigo: "Frigo (Soğutuculu)", opt_box: "Kutu / Askılı", opt_mega: "Mega / Optima", opt_lowbed: "Lowbed (Gabari Dışı)",
      opt_20dc: "20' DC Konteyner", opt_40dc: "40' DC Konteyner", opt_40hc: "40' HC Konteyner", opt_opentop: "Open Top", opt_flatrack: "Flat Rack",
      opt_std_air: "Standart Hava Kargo", opt_charter: "Charter (Uçak Kiralama)", opt_express: "Express / Kurye",

      opt_general: "Genel Kargo", opt_imo: "Tehlikeli Madde (IMO)", opt_perishable: "Bozulabilir / Gıda", opt_bulk: "Dökme Yük",

      footer_links: "Hızlı Bağlantılar", footer_legal: "Yasal & Gizlilik", footer_social: "Bizi Takip Edin"
    },
    en: {
      nav_home: "Home", nav_services: "Services", nav_industries: "Industries", nav_about: "About", nav_comm: "Contact", nav_contact: "Get Quote",
      hero_title: 'Reach Beyond the Borders with <br/><span class="highlight">Pentagram Logistics</span>',
      hero_desc: "Your strongest partner in global trade with our Istanbul and Rome offices.",
      hero_cta: "Get a Quote Now",
      marquee_title: "GLOBAL NETWORK",

      serv_title: "Our Services", serv_subtitle: "End-to-end optimized solutions for every link of your supply chain.",
      serv_air_title: "Air Freight", serv_air_desc: "We provide 'Time-Critical' solutions with our wide IATA agency network. Speed up your business with priority space guarantees on scheduled flights, consolidated shipments, and private Charter options globally.",
      serv_sea_title: "Sea Freight", serv_sea_desc: "We perform FCL and LCL container transport with strong shipowner contracts worldwide. We plan the most cost-effective routes for standard cargoes as well as OOG loads requiring special equipment.",
      serv_road_title: "Road Freight", serv_road_desc: "We serve on Europe, Middle East, and Turkic Republics lines with our wide agency network. From ADR shipments to express minivan delivery, we deliver every load on time.",
      serv_store_title: "Project & Warehouse", serv_store_desc: "We offer engineering-focused project transport for OOG and heavy cargo. We manage your storage and distribution processes in our bonded/free warehouses in Turkey and Europe.",

      proc_title: "Operational Process", proc_sub: "A transparent journey from pick-up to delivery.",
      proc_step1: "Planning & Analysis", proc_desc1: "Route optimization and cost analysis for your cargo.",
      proc_step2: "Packing & Pick-up", proc_desc2: "Professional loading and lashing by our experts.",
      proc_step3: "Global Transit", proc_desc3: "Instant location tracking with digital systems.",
      proc_step4: "Final Delivery", proc_desc4: "Customs clearance and door delivery at destination.",

      ind_title: "Industry Expertise",
      ind_ship_title: "Ship Spares", ind_ship_desc: "Keeping vessels moving is vital. We deliver ship spares to all ports worldwide with 'On-Board' delivery precision and 24/7 operational support.",
      ind_steel_title: "Iron & Steel", ind_steel_desc: "We use special trailers and 'Heavy Lift' equipment for heavy coils, pipes, and sheets. We provide certified lashing services for cargo safety.",
      ind_auto_title: "Dangerous Goods", ind_auto_desc: "We are experts in the transport of flammable, combustible, and dangerous goods (IMO/ADR) used in chemical and industrial production, fully compliant with international regulations.",
      ind_pharma_title: "Spare Parts", ind_pharma_desc: "We deliver vital spare parts to prevent factory stoppages to any point in the world with 'time-critical' precision and express solutions.",

      sus_title: "Unshakable Trust", sus_text: "At Pentagram Logistics, we put 'Trust' at the center of our business. With our transparent process management and accessible expert team, we own your business, not just your cargo. No surprise costs, just a flawless process.", sus_badge: "Reliable Partner",

      about_title: "About Pentagram",
      about_text: "Pentagram Logistics is a technology-driven solution partner set out to be the new definition of speed and trust in global trade. With our HQ in Istanbul and our strategic <strong>Rome Office</strong>, we build a strong logistics bridge between Europe and Turkey. With our boutique service approach, we design flexible and transparent processes tailored to each customer; simplifying complex logistics operations for you. We carry your business to the future.",

      contact_hq_title: "Headquarters (HQ)", contact_hq_addr: "IstMarina - Kartal - Istanbul - Turkiye", contact_hq_phone: "+90 (216) 208 92 24",
      contact_branch_title: "Europe Office", contact_branch_addr: "Roma / Italy", contact_branch_phone: "+39 06 1234 5678",
      form_heading: "Request Freight Quote", form_sub: "Enter details, our team will reply within 2 hours.",
      lbl_company: "Company", lbl_email: "Email", lbl_phone: "Phone", lbl_origin: "Origin", lbl_dest: "Destination",
      lbl_mode: "Transport Mode", lbl_cargo_type: "Cargo Nature", lbl_vehicle: "Vehicle / Equipment",
      lbl_dims: "Dims (L x W x H)", lbl_weight: "Weight (kg)", lbl_stack: "Stackable?",
      lbl_palette: "Palette Count", lbl_palette_ph: "Count",
      lbl_note: "Order Notes", lbl_file: "Upload File (Max 5MB)", btn_file_select: "Choose File",
      btn_add: "+ Add to List", btn_submit: "Send Request",
      opt_yes: "Yes", opt_no: "No",

      opt_road: "Road Freight", opt_sea: "Sea Freight", opt_air: "Air Freight",
      opt_tilt: "Tilt Trailer", opt_frigo: "Reefer", opt_box: "Box / Hanging", opt_mega: "Mega / Optima", opt_lowbed: "Lowbed (OOG)",
      opt_20dc: "20' DC Container", opt_40dc: "40' DC Container", opt_40hc: "40' HC Container", opt_opentop: "Open Top", opt_flatrack: "Flat Rack",
      opt_std_air: "Standard Air", opt_charter: "Charter", opt_express: "Express / Courier",

      opt_general: "General Cargo", opt_imo: "Dangerous Goods (IMO)", opt_perishable: "Perishable / Food", opt_bulk: "Bulk Cargo",

      footer_links: "Quick Links", footer_legal: "Legal", footer_social: "Follow Us"
    },
    it: {
      nav_home: "Home", nav_services: "Servizi", nav_industries: "Settori", nav_about: "Chi Siamo", nav_comm: "Contatto", nav_contact: "Preventivo",
      hero_title: 'Oltrepassa i Confini con <br/><span class="highlight">Pentagram Logistics</span>',
      hero_desc: "Il tuo partner più forte nel commercio globale con i nostri uffici di Istanbul e Roma.",
      hero_cta: "Richiedi Ora",
      marquee_title: "RETE GLOBALE",

      serv_title: "I Nostri Servizi", serv_subtitle: "Soluzioni ottimizzate end-to-end per ogni anello della tua supply chain.",
      serv_air_title: "Trasporto Aereo", serv_air_desc: "Forniamo soluzioni 'Time-Critical' con la nostra vasta rete IATA. Acceleriamo il tuo business con garanzia di spazio, spedizioni consolidate e opzioni Charter private in tutto il mondo.",
      serv_sea_title: "Trasporto Marittimo", serv_sea_desc: "Effettuiamo trasporti FCL e LCL con forti contratti armatoriali. Pianifichiamo le rotte più convenienti per carichi standard e fuori sagoma (Open Top/Flat Rack).",
      serv_road_title: "Trasporto Stradale", serv_road_desc: "Serviamo le linee Europa e Medio Oriente con la nostra ampia rete di agenzie. Dalle spedizioni ADR alla consegna espressa minivan, consegniamo ogni carico in tempo.",
      serv_store_title: "Progetti e Magazzino", serv_store_desc: "Offriamo trasporto progetti ingegneristico per carichi pesanti e fuori sagoma. Gestiamo i tuoi processi di stoccaggio e distribuzione nei nostri magazzini in Turchia ed Europa.",

      proc_title: "Processo Operativo", proc_sub: "Un viaggio trasparente dal ritiro alla consegna.",
      proc_step1: "Pianificazione", proc_desc1: "Ottimizzazione del percorso e analisi dei costi.",
      proc_step2: "Imballaggio e Ritiro", proc_desc2: "Carico professionale e fissaggio dai nostri esperti.",
      proc_step3: "Transito Globale", proc_desc3: "Tracciamento della posizione istantaneo con sistemi digitali.",
      proc_step4: "Consegna Finale", proc_desc4: "Sdoganamento e consegna a domicilio a destinazione.",

      ind_title: "Competenza Settoriale",
      ind_ship_title: "Ricambi Navali", ind_ship_desc: "Mantenere le navi in movimento è vitale. Consegniamo ricambi in tutti i porti del mondo con precisione 'On-Board' e supporto 24/7.",
      ind_steel_title: "Ferro e Acciaio", ind_steel_desc: "Utilizziamo rimorchi speciali per bobine e attrezzature 'Heavy Lift'. Forniamo servizi di lashing certificati per la sicurezza del carico.",
      ind_auto_title: "Merci Pericolose", ind_auto_desc: "Siamo esperti nel trasporto di merci infiammabili e pericolose (IMO/ADR) utilizzate nella produzione chimica e industriale, in conformità con le normative internazionali.",
      ind_pharma_title: "Pezzi di Ricambio", ind_pharma_desc: "Consegniamo pezzi di ricambio vitali per macchinari in qualsiasi punto del mondo con precisione 'time-critical' e soluzioni espresse.",

      sus_title: "Fiducia Incrollabile", sus_text: "In Pentagram Logistics, mettiamo la 'Fiducia' al centro. Con la nostra gestione trasparente, facciamo nostro il tuo business. Nessun costo a sorpresa, solo un processo impeccabile.", sus_badge: "Partner Affidabile",

      about_title: "Su Pentagram",
      about_text: "Pentagram Logistics è un partner orientato alla tecnologia, nato per essere la nuova definizione di velocità e fiducia nel commercio globale. Con la nostra sede a Istanbul e l'ufficio strategico di <strong>Roma</strong>, costruiamo un forte ponte logistico tra Europa e Turchia. Con il nostro approccio boutique, semplifichiamo le operazioni complesse per te.",

      contact_hq_title: "Sede Centrale (HQ)", contact_hq_addr: "IstMarina - Kartal - Istanbul - Turchia", contact_hq_phone: "+90 (216) 208 92 24",
      contact_branch_title: "Ufficio Europa", contact_branch_addr: "Roma / Italia", contact_branch_phone: "+39 06 1234 5678",
      form_heading: "Richiedi Preventivo", form_sub: "Inserisci i dettagli, il nostro team risponderà entro 2 ore.",
      lbl_company: "Azienda", lbl_email: "Email", lbl_phone: "Telefono", lbl_origin: "Origine", lbl_dest: "Destinazione",
      lbl_mode: "Modo di Trasporto", lbl_cargo_type: "Natura Merce", lbl_vehicle: "Veicolo / Attrezzatura",
      lbl_dims: "Dimensioni", lbl_weight: "Peso (kg)", lbl_stack: "Impilabile?",
      lbl_palette: "Numero Pallet", lbl_palette_ph: "Quantità",
      lbl_note: "Note", lbl_file: "Carica Documenti (Max 5MB)", btn_file_select: "Scegli File",
      btn_add: "+ Aggiungi", btn_submit: "Invia Richiesta",
      opt_yes: "Sì", opt_no: "No",

      opt_road: "Strada", opt_sea: "Mare", opt_air: "Aereo",
      opt_tilt: "Telonato", opt_frigo: "Frigo", opt_box: "Box / Appeso", opt_mega: "Mega / Optima", opt_lowbed: "Lowbed (Eccezionale)",
      opt_20dc: "20' DC Container", opt_40dc: "40' DC Container", opt_40hc: "40' HC Container", opt_opentop: "Open Top", opt_flatrack: "Flat Rack",
      opt_std_air: "Aereo Standard", opt_charter: "Charter", opt_express: "Espresso",

      opt_general: "Carico Generale", opt_imo: "Merci Pericolose (IMO)", opt_perishable: "Deperibile / Cibo", opt_bulk: "Rinfusa",

      footer_links: "Link Rapidi", footer_legal: "Legale", footer_social: "Seguici"
    }
  };

  const t = translations[lang] || translations['tr'];

  return (
    <>
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
            <li><a href="#about">{t.nav_comm}</a></li>
            <li><a href="#quote">{t.nav_contact}</a></li>

            {/* MOBIL MENÜ DİL SEÇENEĞİ */}
            <li className="mobile-lang-wrapper">
              <div className="lang-switch-mobile">
                <button className={lang === 'tr' ? 'active' : ''} onClick={() => setLang('tr')}>TR</button>
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
                <button className={lang === 'it' ? 'active' : ''} onClick={() => setLang('it')}>IT</button>
              </div>
            </li>
          </ul>

          <div className="right-actions">
            {/* MASAÜSTÜ DİL SEÇENEĞİ */}
            <div className="lang-switch desktop-only">
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

      {/* MARQUEE */}
      <section className="marquee-section">
        <div className="marquee-label">{t.marquee_title}</div>
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {/* GRUP 1 */}
            <span>🇹🇷 Türkiye</span><span>🇮🇹 İtalya</span><span>🇸🇾 Suriye</span><span>🇮🇶 Irak</span><span>🇮🇷 İran</span><span>🇰🇼 Kuveyt</span><span>🇶🇦 Katar</span>
            <span>🇩🇪 Almanya</span><span>🇳🇱 Hollanda</span><span>🇫🇷 Fransa</span><span>🇬🇧 İngiltere</span><span>🇪🇸 İspanya</span><span>🇧🇪 Belçika</span>
            <span>🇦🇹 Avusturya</span><span>🇨🇭 İsviçre</span><span>🇵🇱 Polonya</span><span>🇨🇳 Çin</span><span>🇰🇷 G. Kore</span><span>🇺🇸 ABD</span><span>🇨🇦 Kanada</span>
            <span>🇯🇵 Japonya</span><span>🇮🇳 Hindistan</span><span>🇪🇬 Mısır</span>

            {/* GRUP 2 (TEKRAR) */}
            <span>🇹🇷 Türkiye</span><span>🇮🇹 İtalya</span><span>🇸🇾 Suriye</span><span>🇮🇶 Irak</span><span>🇮🇷 İran</span><span>🇰🇼 Kuveyt</span><span>🇶🇦 Katar</span>
            <span>🇩🇪 Almanya</span><span>🇳🇱 Hollanda</span><span>🇫🇷 Fransa</span><span>🇬🇧 İngiltere</span><span>🇪🇸 İspanya</span><span>🇧🇪 Belçika</span>
            <span>🇦🇹 Avusturya</span><span>🇨🇭 İsviçre</span><span>🇵🇱 Polonya</span><span>🇨🇳 Çin</span><span>🇰🇷 G. Kore</span><span>🇺🇸 ABD</span><span>🇨🇦 Kanada</span>
            <span>🇯🇵 Japonya</span><span>🇮🇳 Hindistan</span><span>🇪🇬 Mısır</span>
          </div>
        </div>
      </section>

      <section id="services" className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>{t.serv_title}</h2>
            <p>{t.serv_subtitle}</p>
          </div>
          <div className="grid-4">
            {/* YENİ SIRALAMA: KARA - DENİZ - HAVA - PROJE */}
            <div className="unified-card glass-panel"><i className="fas fa-truck-moving card-icon"></i><h3>{t.serv_road_title}</h3><p>{t.serv_road_desc}</p></div>
            <div className="unified-card glass-panel"><i className="fas fa-ship card-icon"></i><h3>{t.serv_sea_title}</h3><p>{t.serv_sea_desc}</p></div>
            <div className="unified-card glass-panel"><i className="fas fa-plane-departure card-icon"></i><h3>{t.serv_air_title}</h3><p>{t.serv_air_desc}</p></div>
            <div className="unified-card glass-panel"><i className="fas fa-warehouse card-icon"></i><h3>{t.serv_store_title}</h3><p>{t.serv_store_desc}</p></div>
          </div>
        </div>
      </section>

      <section className="process-section section-padding dark-bg">
        <div className="container">
          <div className="section-header">
            <h2>{t.proc_title}</h2>
            <p>{t.proc_sub}</p>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-icon square-icon"><i className="fas fa-clipboard-check"></i></div>
              <h4>{t.proc_step1}</h4>
              <p>{t.proc_desc1}</p>
            </div>
            <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-icon square-icon"><i className="fas fa-box-open"></i></div>
              <h4>{t.proc_step2}</h4>
              <p>{t.proc_desc2}</p>
            </div>
            <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-icon square-icon"><i className="fas fa-globe-americas"></i></div>
              <h4>{t.proc_step3}</h4>
              <p>{t.proc_desc3}</p>
            </div>
            <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-icon square-icon"><i className="fas fa-flag-checkered"></i></div>
              <h4>{t.proc_step4}</h4>
              <p>{t.proc_desc4}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="section-padding">
        <div className="container">
          <div className="header-spacer"><h2 className="section-title-left">{t.ind_title}</h2></div>
          <div className="grid-4">
            <div className="unified-card glass-panel"><i className="fas fa-anchor card-icon"></i><h3>{t.ind_ship_title}</h3><p>{t.ind_ship_desc}</p></div>
            <div className="unified-card glass-panel"><i className="fas fa-hard-hat card-icon"></i><h3>{t.ind_steel_title}</h3><p>{t.ind_steel_desc}</p></div>
            <div className="unified-card glass-panel"><i className="fas fa-burn card-icon"></i><h3>{t.ind_auto_title}</h3><p>{t.ind_auto_desc}</p></div>
            <div className="unified-card glass-panel"><i className="fas fa-cogs card-icon"></i><h3>{t.ind_pharma_title}</h3><p>{t.ind_pharma_desc}</p></div>
          </div>
        </div>
      </section>

      <section className="sustainability-section">
        <div className="container">
          <div className="sustain-wrapper glass-panel">
            <div className="sustain-content">
              <div className="sustain-badge">{t.sus_badge}</div>
              <h2>{t.sus_title}</h2>
              <p>{t.sus_text}</p>
            </div>
            <div className="sustain-icon"><i className="fas fa-handshake"></i></div>
          </div>
        </div>
      </section>

      <section id="about" className="section-padding">
        <div className="container about-layout">
          <div className="about-left-col">
            <div className="about-text glass-panel">
              <h3>{t.about_title}</h3>
              <p dangerouslySetInnerHTML={{ __html: t.about_text }}></p>
            </div>
            <div className="contact-details-box glass-panel mt-4">
              <div className="contact-row">
                <div className="icon-box"><i className="fas fa-building"></i></div>
                <div><h5>{t.contact_hq_title}</h5><p>{t.contact_hq_addr}</p><p className="contact-phone">{t.contact_hq_phone}</p></div>
              </div>
              <div className="divider"></div>
              <div className="contact-row">
                <div className="icon-box"><i className="fas fa-globe-europe"></i></div>
                <div><h5>{t.contact_branch_title}</h5><p>{t.contact_branch_addr}</p><p className="contact-phone">{t.contact_branch_phone}</p></div>
              </div>
            </div>
          </div>
          <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x14caa3b2660a53a1:0xe8000ecfba8225a9?sa=X&ved=1t:8290&ictx=111" target="_blank" rel="noopener noreferrer" className="map-link-wrapper">
            <div className="about-visual glass-panel">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3016.307574864766!2d29.1894443156546!3d40.88944447931296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac504067888c7%3A0x1247076922485636!2sIstmarina%20AVM!5e0!3m2!1str!2str!4v1675123456789!5m2!1str!2str" width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} allowFullScreen="" loading="lazy" title="Pentagram Location"></iframe>
              <div className="map-overlay-label"><i className="fas fa-map-marker-alt"></i> <span>HQ: Kartal / İstanbul</span></div>
            </div>
          </a>
        </div>
      </section>

      <section id="quote" className="quote-section">
        <div className="container">
          <div className="quote-wrapper glass-panel">
            <div className="quote-header"><h2>{t.form_heading}</h2><p>{t.form_sub}</p></div>
            <form className="big-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-group"><label>{t.lbl_company}</label><input type="text" name="company" required /></div>
                <div className="input-group"><label>{t.lbl_email}</label><input type="email" name="email" required /></div>
                <div className="input-group"><label>{t.lbl_phone}</label><input type="tel" name="phone" required /></div>
              </div>
              <div className="form-row">
                <div className="input-group"><label>{t.lbl_origin}</label><input type="text" name="origin" required /></div>
                <div className="input-group"><label>{t.lbl_dest}</label><input type="text" name="dest" required /></div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>{t.lbl_mode}</label>
                  <select name="mode" value={transportMode} onChange={(e) => setTransportMode(e.target.value)}>
                    <option value="road">{t.opt_road}</option>
                    <option value="sea">{t.opt_sea}</option>
                    <option value="air">{t.opt_air}</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>{t.lbl_vehicle}</label>
                  <select name="vehicle">
                    {vehicleOptions[transportMode].map((optKey) => (
                      <option key={optKey} value={t[optKey]}>{t[optKey]}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>{t.lbl_cargo_type}</label>
                  <select name="cargoType">
                    <option value={t.opt_general}>{t.opt_general}</option>
                    <option value={t.opt_imo}>{t.opt_imo}</option>
                    <option value={t.opt_perishable}>{t.opt_perishable}</option>
                    <option value={t.opt_bulk}>{t.opt_bulk}</option>
                  </select>
                </div>
              </div>

              <div className="cargo-builder">
                <div className="form-row four-col">
                  <div className="input-group"><label>{t.lbl_dims}</label><input type="text" placeholder="120x80x100" value={currentCargo.dims} onChange={(e) => setCurrentCargo({ ...currentCargo, dims: e.target.value })} /></div>
                  <div className="input-group"><label>{t.lbl_weight}</label><input type="number" placeholder="kg" value={currentCargo.weight} onChange={(e) => setCurrentCargo({ ...currentCargo, weight: e.target.value })} /></div>
                  <div className="input-group"><label>{t.lbl_palette}</label><input type="number" placeholder={t.lbl_palette_ph} value={currentCargo.count} onChange={(e) => setCurrentCargo({ ...currentCargo, count: e.target.value })} /></div>
                  <div className="input-group"><label>{t.lbl_stack}</label><select value={currentCargo.stack} onChange={(e) => setCurrentCargo({ ...currentCargo, stack: e.target.value })}><option>{t.opt_yes}</option><option>{t.opt_no}</option></select></div>
                </div>
                <button type="button" className="add-btn" onClick={addCargo}>{t.btn_add}</button>
              </div>

              {cargoList.length > 0 && (
                <div className="cargo-list-display">
                  {cargoList.map((item, index) => (
                    <div key={index} className="cargo-item">
                      <span>{index + 1}. Palet: {item.dims} cm - {item.weight} kg - {item.count} Adet - İstif: {item.stack}</span>
                      <span className="remove-item" onClick={() => removeCargo(index)}>✖</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="form-row-full"><div className="input-group"><label>{t.lbl_note}</label><textarea name="note" rows="4"></textarea></div></div>

              <div className="form-row-full">
                <div className="input-group">
                  <label>{t.lbl_file}</label>
                  <div className="custom-file-wrapper">
                    <label htmlFor="file-upload" className="custom-file-button">
                      {fileName || t.btn_file_select} <i className="fas fa-upload" style={{ marginLeft: '10px' }}></i>
                    </label>
                    <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-btn-large">{t.btn_submit}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>PENTAGRAM</h4>
              <p>HQ: İstMarina - Kartal - İstanbul - Türkiye</p>
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
                <li><a href="#">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Pentagram Logistics. All rights reserved.</p>
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