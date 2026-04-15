import React, { useState } from 'react';
import './App.css';
import logoImg from './logo.png';

// Gelişmiş Türkçe Karakter Uyumlu Harf Büyütme
const capitalizeWords = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => {
    if (word.length === 0) return '';
    return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1);
  }).join(' ');
};

// Bugünün tarihi ve tam 08:35 saatini döndürür
const getDefaultReminder = () => {
  const today = new Date().toISOString().split('T')[0];
  return `${today}T08:35`;
};

function App() {
  const [lang, setLang] = useState('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // --- 1. MÜŞTERİ FORM STATE (LANDING PAGE) ---
  const [cargoList, setCargoList] = useState([]);
  const [transportMode, setTransportMode] = useState('road');
  const [fileName, setFileName] = useState('');
  const [currentCargo, setCurrentCargo] = useState({ dims: '', weight: '', count: '', stack: 'Evet' });

  const vehicleOptions = {
    road: ['opt_tilt', 'opt_frigo', 'opt_box', 'opt_mega', 'opt_lowbed'],
    sea: ['opt_20dc', 'opt_40dc', 'opt_40hc', 'opt_opentop', 'opt_flatrack'],
    air: ['opt_std_air', 'opt_charter', 'opt_express']
  };

  // --- 2. PORTAL (CRM) STATE ---
  const [isAuth, setIsAuth] = useState(false);
  const [portalPassword, setPortalPassword] = useState('');
  const [portalTab, setPortalTab] = useState('requests');

  // Arama ve Filtreleme
  const [filterText, setFilterText] = useState('');
  const [companyTypeFilter, setCompanyTypeFilter] = useState('Tümü');

  // Detay & Form Açılır/Kapanır State'leri
  const [expandedOpId, setExpandedOpId] = useState(null);
  const [expandedReqId, setExpandedReqId] = useState(null);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showAddRequest, setShowAddRequest] = useState(false);
  const [showAddInfo, setShowAddInfo] = useState(false);

  // Sürükle-Bırak State'leri
  const [draggedItem, setDraggedItem] = useState(null);

  // --- VERİTABANI STATE'LERİ ---
  const [companies, setCompanies] = useState([
    { id: 1, type: 'Tedarikçi/Lojistik', name: 'Arkas Lojistik', notes: 'Düzenli tedarikçi, ödemeleri zamanında yapar.', contacts: [{ name: 'Ahmet Yılmaz', title: 'Operasyon', phone: '05321234567', email: 'ahmet@arkas.com' }] },
    { id: 2, type: 'Müşteri', name: 'Koçtaş Yapı', notes: 'Kurumsal Müşteri', contacts: [{ name: 'Ayşe Kaya', title: 'Lojistik Müdürü', phone: '05559876543', email: 'ayse@koctas.com' }] }
  ]);
  const [requests, setRequests] = useState([]);
  const [operations, setOperations] = useState([]);
  const [opCounter, setOpCounter] = useState(150);

  // 4. Sekme: Bilgiler / Dokümanlar State
  const [infoList, setInfoList] = useState([
    { id: 1, title: 'Şirket Vergi Levhası', text: '', files: [{ name: 'vergi_levhasi_2026.pdf', type: 'PDF' }] },
    { id: 2, title: 'Operasyon Email Şifresi', text: 'Email: operasyon@pentagram.com\nŞifre: Pnt!2026_Ops', files: [] }
  ]);

  // Form State'leri
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [newCompany, setNewCompany] = useState({
    name: '', type: 'Müşteri', notes: '', contacts: [{ name: '', title: '', phone: '', email: '' }]
  });

  const [newReq, setNewReq] = useState({
    date: new Date().toISOString().split('T')[0],
    customer: '', mode: 'Karayolu', origin: '', dest: '', cargoType: '',
    vehicles: [{ type: '', count: 1 }],
    quotedCompanies: '', receivedQuote: '', receivedCurrency: 'USD', givenQuote: '', givenCurrency: 'USD',
    dailyReport: '',
    reminderActive: false, reminderDate: getDefaultReminder()
  });

  const [newInfo, setNewInfo] = useState({ title: '', text: '', files: [] });

  // --- NAVİGASYON ---
  const navigateTo = (page, sectionId = null) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 90, behavior: 'smooth' });
      }, 100);
    } else window.scrollTo(0, 0);
  };

  // --- LANDING PAGE FONKSİYONLARI ---
  const addCargo = () => {
    if (currentCargo.dims && currentCargo.weight && currentCargo.count) {
      setCargoList([...cargoList, currentCargo]);
      setCurrentCargo({ ...currentCargo, dims: '', weight: '', count: '' });
    } else alert("Lütfen ölçü, tonaj ve adet bilgilerini giriniz.");
  };
  const removeCargo = (index) => setCargoList(cargoList.filter((_, i) => i !== index));
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { alert("Dosya boyutu 5MB sınırını aşamaz!"); e.target.value = ""; setFileName(''); }
    else if (file) setFileName(file.name);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Firma: ${e.target.company.value}\nTel: ${e.target.phone.value}\nMod: ${e.target.mode.value}\nAraç: ${e.target.vehicle.value}\n\nKargo Listesi:\n${cargoList.map((item, i) => `${i + 1}. Palet: ${item.dims} | ${item.weight} kg | ${item.count} Adet`).join('\n') || "Girmedi"}\n\nNot: ${e.target.note.value}`;
    window.location.href = `mailto:alp@pentagramlogistics.com?subject=Navlun Teklif - ${e.target.company.value}&body=${encodeURIComponent(body)}`;
  };

  // --- PORTAL: FİRMA YÖNETİMİ ---
  const handleCompanyContactChange = (index, field, value) => {
    const updatedContacts = [...newCompany.contacts];
    updatedContacts[index][field] = (field === 'name' || field === 'title') ? capitalizeWords(value) : value;
    setNewCompany({ ...newCompany, contacts: updatedContacts });
  };
  const addCompanyContact = () => setNewCompany({ ...newCompany, contacts: [...newCompany.contacts, { name: '', title: '', phone: '', email: '' }] });
  const removeCompanyContact = (index) => setNewCompany({ ...newCompany, contacts: newCompany.contacts.filter((_, i) => i !== index) });

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (editingCompanyId) {
      setCompanies(companies.map(c => c.id === editingCompanyId ? { ...newCompany, id: editingCompanyId } : c));
      setEditingCompanyId(null);
      alert("Firma güncellendi!");
    } else {
      setCompanies([{ ...newCompany, id: Date.now() }, ...companies]);
      alert("Firma başarıyla eklendi!");
    }
    setNewCompany({ name: '', type: 'Müşteri', notes: '', contacts: [{ name: '', title: '', phone: '', email: '' }] });
    setShowAddCompany(false);
  };

  const editCompany = (comp) => {
    setNewCompany(comp);
    setEditingCompanyId(comp.id);
    setShowAddCompany(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteCompany = (id) => {
    if (window.confirm("Bu firmayı silmek istediğinize emin misiniz?")) setCompanies(companies.filter(c => c.id !== id));
  };

  // --- PORTAL: TALEP YÖNETİMİ ---
  const handleVehicleChange = (index, field, value) => {
    const updatedVehicles = [...newReq.vehicles];
    updatedVehicles[index][field] = field === 'type' ? capitalizeWords(value) : value;
    setNewReq({ ...newReq, vehicles: updatedVehicles });
  };
  const addVehicleField = () => setNewReq({ ...newReq, vehicles: [...newReq.vehicles, { type: '', count: 1 }] });
  const removeVehicleField = (index) => setNewReq({ ...newReq, vehicles: newReq.vehicles.filter((_, i) => i !== index) });

  const handleAddRequest = (e) => {
    e.preventDefault();
    setRequests([{ ...newReq, id: Date.now(), status: 'Bekliyor' }, ...requests]);
    setNewReq({
      ...newReq, customer: '', origin: '', dest: '', cargoType: '', vehicles: [{ type: '', count: 1 }],
      quotedCompanies: '', receivedQuote: '', givenQuote: '', dailyReport: '', reminderActive: false, reminderDate: getDefaultReminder()
    });
    setShowAddRequest(false);
    alert("Talep başarıyla kaydedildi.");
  };

  const deleteRequest = (id) => {
    if (window.confirm("Bu talebi tamamen silmek istediğinize emin misiniz?")) setRequests(requests.filter(r => r.id !== id));
  };

  const rejectRequest = (id) => {
    if (window.confirm("Bu talebi REDDETMEK istediğinize emin misiniz?")) setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status: 'Reddedildi' } : r));
  };

  // --- PORTAL: OPERASYON YÖNETİMİ ---
  const approveRequest = (req) => {
    const vehiclesText = (req.vehicles || []).map(v => `${v.count}x ${v.type}`).join(', ');
    const newOperation = {
      ...req,
      opId: `PNT-${String(opCounter).padStart(4, '0')}`,
      status: 'Devam Ediyor',
      vehicleSummary: vehiclesText,
      loadingDate: '', unloadingDate: '', supplier: '', buyer: '', destCustoms: '', referenceNo: '',
      salesFreight: req.givenQuote || '', salesCurrency: req.givenCurrency || 'USD', salesExtras: [],
      purchaseFreight: req.receivedQuote || '', purchaseCurrency: req.receivedCurrency || 'USD', purchaseExtras: [],
      supplierInv: '', pentaInv: '', documents: [],
      opNote: '', reminderActive: req.reminderActive, reminderDate: req.reminderDate
    };
    setOperations([newOperation, ...operations]);
    setOpCounter(prev => prev + 1);
    setRequests(requests.map(r => r.id === req.id ? { ...r, status: 'Onaylandı' } : r));
    alert(`${newOperation.opId} numaralı operasyon oluşturuldu.`);
  };

  const deleteOperation = (opId) => {
    if (window.confirm("Dikkat! Bu operasyonu tamamen silmek istediğinize emin misiniz?")) setOperations(operations.filter(o => o.opId !== opId));
  };

  const updateOpField = (opId, field, value) => setOperations(ops => ops.map(o => o.opId === opId ? { ...o, [field]: value } : o));
  const updateReqField = (reqId, field, value) => setRequests(reqs => reqs.map(r => r.id === reqId ? { ...r, [field]: value } : r));

  const toggleOpStatus = (opId, currentStatus) => {
    const newStatus = currentStatus === 'Tamamlandı' ? 'Devam Ediyor' : 'Tamamlandı';
    setOperations(ops => ops.map(o => o.opId === opId ? { ...o, status: newStatus } : o));
  };

  const sortedOperations = [...operations].sort((a, b) => {
    if (a.status === 'Tamamlandı' && b.status !== 'Tamamlandı') return 1;
    if (a.status !== 'Tamamlandı' && b.status === 'Tamamlandı') return -1;
    return 0;
  });

  const addExtraCost = (opId, type) => {
    setOperations(ops => ops.map(o => {
      if (o.opId === opId) {
        const newExtra = { desc: '', amount: '', currency: 'USD', id: Date.now() };
        return type === 'sales' ? { ...o, salesExtras: [...(o.salesExtras || []), newExtra] } : { ...o, purchaseExtras: [...(o.purchaseExtras || []), newExtra] };
      }
      return o;
    }));
  };

  const updateExtraCost = (opId, type, index, field, value) => {
    setOperations(ops => ops.map(o => {
      if (o.opId === opId) {
        const list = type === 'sales' ? [...(o.salesExtras || [])] : [...(o.purchaseExtras || [])];
        list[index][field] = value;
        return type === 'sales' ? { ...o, salesExtras: list } : { ...o, purchaseExtras: list };
      }
      return o;
    }));
  };

  const removeExtraCost = (opId, type, index) => {
    setOperations(ops => ops.map(o => {
      if (o.opId === opId) {
        const list = type === 'sales' ? [...(o.salesExtras || [])] : [...(o.purchaseExtras || [])];
        list.splice(index, 1);
        return type === 'sales' ? { ...o, salesExtras: list } : { ...o, purchaseExtras: list };
      }
      return o;
    }));
  };

  const addDocument = (e, opId) => {
    const file = e.target.files[0];
    const docType = document.getElementById(`docTypeSelect-${opId}`).value;
    if (file && docType) setOperations(ops => ops.map(o => o.opId === opId ? { ...o, documents: [...(o.documents || []), { type: docType, name: file.name }] } : o));
  };

  // --- PORTAL: BİLGİLER / DOKÜMANLAR ---
  const handleAddInfo = (e) => {
    e.preventDefault();
    setInfoList([{ ...newInfo, id: Date.now() }, ...infoList]);
    setNewInfo({ title: '', text: '', files: [] });
    setShowAddInfo(false);
    alert("Bilgi/Doküman eklendi.");
  };

  const deleteInfo = (id) => {
    if (window.confirm("Bu bilgiyi silmek istediğinize emin misiniz?")) setInfoList(infoList.filter(i => i.id !== id));
  };

  const addInfoFile = (e) => {
    const file = e.target.files[0];
    if (file) setNewInfo({ ...newInfo, files: [...newInfo.files, { name: file.name, type: file.name.split('.').pop().toUpperCase() }] });
  };

  // --- SÜRÜKLE BIRAK ---
  const handleDragStart = (e, index, listType) => { setDraggedItem({ index, listType }); e.dataTransfer.effectAllowed = "move"; };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, targetIndex, listType) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.listType !== listType) return;

    if (listType === 'requests') {
      const newItems = [...requests];
      const [draggedNode] = newItems.splice(draggedItem.index, 1);
      newItems.splice(targetIndex, 0, draggedNode);
      setRequests(newItems);
    } else if (listType === 'operations') {
      const newItems = [...operations];
      const [draggedNode] = newItems.splice(draggedItem.index, 1);
      newItems.splice(targetIndex, 0, draggedNode);
      setOperations(newItems);
    } else if (listType === 'info') {
      const newItems = [...infoList];
      const [draggedNode] = newItems.splice(draggedItem.index, 1);
      newItems.splice(targetIndex, 0, draggedNode);
      setInfoList(newItems);
    }
    setDraggedItem(null);
  };

  // --- ÇEVİRİLER ---
  const termsListTR = ["Taşımalarımız CMR konvansiyonu kapsamında olup...", "Fiyatlarımız standart tenteli TIR’lara yüklenebilecek yükler için geçerlidir."];
  const translations = {
    tr: {
      nav_home: "Ana Sayfa", nav_services: "Hizmetler", nav_industries: "Sektörler", nav_about: "Kurumsal", nav_comm: "İletişim", nav_terms: "Şartname", nav_contact: "Teklif Al",
      hero_title: 'Sınırların Ötesine <br/><span class="highlight">Pentagram Logistics</span> ile Ulaşın',
      hero_desc: "İstanbul ve Roma ofislerimizle, global ticaretteki en güçlü çözüm ortağınızız.",
      hero_cta: "Hemen Teklif Alın", marquee_title: "GLOBAL HİZMET AĞI",
      serv_title: "Hizmetlerimiz", serv_subtitle: "Tedarik zincirinizin her halkası için optimize edilmiş çözümler.",
      serv_air_title: "Hava Kargo", serv_air_desc: "Acil ve değerli gönderileriniz için...",
      serv_sea_title: "Deniz Yolu", serv_sea_desc: "Tüm dünya limanlarında güçlü armatör...",
      serv_road_title: "Kara Yolu", serv_road_desc: "Avrupa, Orta Doğu ve Türki Cumhuriyetler...",
      serv_store_title: "Proje & Antrepo", serv_store_desc: "Standart dışı, ağır ve gabari yükleriniz...",
      proc_title: "Operasyonel Süreç", proc_sub: "Yükünüzü teslim aldığımız andan itibaren şeffaf bir yolculuk.",
      proc_step1: "Planlama & Analiz", proc_desc1: "Yükünüze en uygun rota, mod ve maliyet analizi yapılır.",
      proc_step2: "Paketleme & Alım", proc_desc2: "Uzman ekiplerimizce yükleme ve lashing işlemleri gerçekleştirilir.",
      proc_step3: "Global Transfer", proc_desc3: "Dijital takip sistemi ile anlık konum ve durum bilgilendirmesi.",
      proc_step4: "Teslimat", proc_desc4: "Varış noktasında gümrükleme ve kapı teslimi tamamlanır.",
      ind_title: "Sektörel Uzmanlık", ind_ship_title: "Gemi Ekipmanları", ind_ship_desc: "Gemilerin yolda kalmaması hayati önem taşır...",
      ind_steel_title: "Demir & Çelik", ind_steel_desc: "Ağır tonajlı rulolar, borular ve sac levhalar...",
      ind_auto_title: "Yanıcı Maddeler", ind_auto_desc: "Kimya ve endüstriyel üretimde...",
      ind_pharma_title: "Yedek Parça", ind_pharma_desc: "Fabrikaların ve üretim hatlarının durmaması için...",
      sus_title: "Sarsılmaz Güven ve Şeffaflık", sus_text: "Pentagram Logistics olarak işimizin merkezine 'Güven'i koyuyoruz...", sus_badge: "Güvenilir Çözüm Ortağı",
      about_title: "Pentagram Hakkında", about_text: "Pentagram Logistics, global ticarette hız ve güvenin yeni tanımı...",
      contact_hq_title: "Genel Merkez (HQ)", contact_hq_addr: "İSTMarina - Kartal - İstanbul / Türkiye", contact_hq_phone: "+90 (216) 208 92 24",
      contact_branch_title: "Avrupa Ofisi", contact_branch_addr: "Via Nazionale 184, 00184 Roma RM, Italia", contact_branch_phone: "+39 06 1234 5678",
      form_heading: "Navlun Teklifi İste", form_sub: "Detayları girin, operasyon ekibimiz en geç 2 saat içinde size dönüş yapsın.",
      lbl_company: "Firma Adı", lbl_email: "E-posta", lbl_phone: "Telefon", lbl_origin: "Çıkış Noktası", lbl_dest: "Varış Noktası",
      lbl_mode: "Taşıma Modu", lbl_cargo_type: "Yük Cinsi", lbl_vehicle: "Araç / Ekipman Tipi",
      lbl_dims: "Ölçüler (En x Boy x Yük.)", lbl_weight: "Tonaj (kg)", lbl_stack: "İstiflenebilir?",
      lbl_palette: "Palet Sayısı", lbl_palette_ph: "Adet", lbl_note: "Sipariş Notları / Özel İstekler", lbl_file: "Yük Dokümanı / Görsel", btn_file_select: "Dosya Seç", btn_add: "+ Listeye Ekle", btn_submit: "Teklifi Gönder",
      opt_yes: "Evet", opt_no: "Hayır", opt_road: "Kara Yolu", opt_sea: "Deniz Yolu", opt_air: "Hava Yolu",
      opt_tilt: "Tenteli Tır", opt_frigo: "Frigo", opt_box: "Kutu / Askılı", opt_mega: "Mega", opt_lowbed: "Lowbed",
      opt_20dc: "20' DC", opt_40dc: "40' DC", opt_40hc: "40' HC", opt_opentop: "Open Top", opt_flatrack: "Flat Rack",
      opt_std_air: "Standart Hava", opt_charter: "Charter", opt_express: "Express",
      opt_general: "Genel Kargo", opt_imo: "Tehlikeli Madde (IMO)", opt_perishable: "Bozulabilir / Gıda", opt_bulk: "Dökme Yük",
      terms_title: "Taşımacılık Şartnamesi", terms_subtitle: "Kara Yolu Taşımacılığı", terms_intro: "Değerli müşterimiz...", terms_list: termsListTR,
      footer_links: "Hızlı Bağlantılar", footer_legal: "Yasal & Gizlilik", footer_social: "Bizi Takip Edin"
    }
  };
  const t = translations['tr'];

  return (
    <>
      <datalist id="customer-list">
        {companies.filter(c => c.type === 'Müşteri').map(c => <option key={c.id} value={c.name} />)}
      </datalist>
      <datalist id="supplier-list">
        {companies.filter(c => c.type === 'Tedarikçi/Lojistik').map(c => <option key={c.id} value={c.name} />)}
      </datalist>

      {/* --- NAVBAR --- */}
      <nav className="glass-nav">
        <div className="container nav-container">
          <div className="logo-area" onClick={() => navigateTo('home')}>
            <img src={logoImg} alt="Logo" className="nav-logo" style={{ cursor: 'pointer' }} />
            <div className="logo-text" style={{ cursor: 'pointer' }}>
              <span className="brand-main">PENTAGRAM</span>
              <span className="brand-sub">LOGISTICS</span>
            </div>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home', 'home'); }}>{t.nav_home}</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); navigateTo('home', 'services'); }}>{t.nav_services}</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('home', 'about'); }}>{t.nav_about}</a></li>
            <li><a href="#terms" onClick={(e) => { e.preventDefault(); navigateTo('terms'); }}>{t.nav_terms}</a></li>
            <li><a href="#quote" className="quote-nav-btn" onClick={(e) => { e.preventDefault(); navigateTo('home', 'quote'); }}>{t.nav_contact}</a></li>
            <li>
              <a href="#portal" className="portal-nav-btn" onClick={(e) => { e.preventDefault(); navigateTo('portal'); }}>
                <i className="fas fa-lock" style={{ marginRight: '5px' }}></i> PNT Portal
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* --- ANA SAYFA (LANDING PAGE) --- */}
      {currentPage === 'home' && (
        <>
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
              <a href="#quote" className="hero-btn-pulse" onClick={(e) => { e.preventDefault(); navigateTo('home', 'quote'); }}>{t.hero_cta}</a>
            </div>
          </header>

          <section className="marquee-section">
            <div className="marquee-label">{t.marquee_title}</div>
            <div className="marquee-wrapper">
              <div className="marquee-content">
                <span>🇹🇷 Türkiye</span><span>🇮🇹 İtalya</span><span>🇩🇪 Almanya</span><span>🇳🇱 Hollanda</span><span>🇫🇷 Fransa</span><span>🇬🇧 İngiltere</span><span>🇪🇸 İspanya</span><span>🇧🇪 Belçika</span><span>🇨🇭 İsviçre</span><span>🇵🇱 Polonya</span>
                <span>🇨🇳 Çin</span><span>🇺🇸 ABD</span><span>🇨🇦 Kanada</span><span>🇯🇵 Japonya</span>
                <span>🇹🇷 Türkiye</span><span>🇮🇹 İtalya</span><span>🇩🇪 Almanya</span><span>🇳🇱 Hollanda</span>
              </div>
            </div>
          </section>

          <section id="services" className="section-padding">
            <div className="container">
              <div className="section-header"><h2>{t.serv_title}</h2><p>{t.serv_subtitle}</p></div>
              <div className="grid-4">
                <div className="unified-card glass-panel"><i className="fas fa-truck-moving card-icon"></i><h3>{t.serv_road_title}</h3><p>{t.serv_road_desc}</p></div>
                <div className="unified-card glass-panel"><i className="fas fa-ship card-icon"></i><h3>{t.serv_sea_title}</h3><p>{t.serv_sea_desc}</p></div>
                <div className="unified-card glass-panel"><i className="fas fa-plane-departure card-icon"></i><h3>{t.serv_air_title}</h3><p>{t.serv_air_desc}</p></div>
                <div className="unified-card glass-panel"><i className="fas fa-warehouse card-icon"></i><h3>{t.serv_store_title}</h3><p>{t.serv_store_desc}</p></div>
              </div>
            </div>
          </section>

          <section className="process-section section-padding dark-bg">
            <div className="container">
              <div className="section-header"><h2>{t.proc_title}</h2><p>{t.proc_sub}</p></div>
              <div className="process-grid">
                <div className="process-step"><div className="step-number">01</div><div className="step-icon square-icon"><i className="fas fa-clipboard-check"></i></div><h4>{t.proc_step1}</h4><p>{t.proc_desc1}</p></div>
                <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
                <div className="process-step"><div className="step-number">02</div><div className="step-icon square-icon"><i className="fas fa-box-open"></i></div><h4>{t.proc_step2}</h4><p>{t.proc_desc2}</p></div>
                <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
                <div className="process-step"><div className="step-number">03</div><div className="step-icon square-icon"><i className="fas fa-globe-americas"></i></div><h4>{t.proc_step3}</h4><p>{t.proc_desc3}</p></div>
                <div className="step-arrow"><i className="fas fa-chevron-right"></i></div>
                <div className="process-step"><div className="step-number">04</div><div className="step-icon square-icon"><i className="fas fa-flag-checkered"></i></div><h4>{t.proc_step4}</h4><p>{t.proc_desc4}</p></div>
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
                    <div className="input-group"><label>{t.lbl_mode}</label><select name="mode" value={transportMode} onChange={(e) => setTransportMode(e.target.value)}><option value="road">{t.opt_road}</option><option value="sea">{t.opt_sea}</option><option value="air">{t.opt_air}</option></select></div>
                    <div className="input-group"><label>{t.lbl_vehicle}</label><select name="vehicle">{vehicleOptions[transportMode].map((optKey) => <option key={optKey} value={t[optKey]}>{t[optKey]}</option>)}</select></div>
                    <div className="input-group"><label>{t.lbl_cargo_type}</label><select name="cargoType"><option value={t.opt_general}>{t.opt_general}</option><option value={t.opt_imo}>{t.opt_imo}</option></select></div>
                  </div>
                  <button type="submit" className="submit-btn-large">{t.btn_submit}</button>
                </form>
              </div>
            </div>
          </section>
        </>
      )}

      {/* --- ŞARTNAME SAYFASI --- */}
      {currentPage === 'terms' && (
        <div className="terms-page section-padding">
          <div className="container">
            <div className="terms-content glass-panel">
              <h2>{t.terms_title}</h2><h3>{t.terms_subtitle}</h3><p>{t.terms_intro}</p>
              <ul className="terms-list">{t.terms_list.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      )}

      {/* --- PORTAL (CRM) EKRANI --- */}
      {currentPage === 'portal' && (
        <div className="portal-wrapper section-padding">
          <div className="container">
            {!isAuth ? (
              <div className="login-box glass-panel">
                <div className="login-icon-wrapper">
                  <i className="fas fa-lock"></i>
                </div>
                <h2>Güvenli Giriş</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '0.9rem' }}>Sadece yetkili personeller erişebilir.</p>
                <form onSubmit={(e) => { e.preventDefault(); if (portalPassword === 'PNT2026') setIsAuth(true); else alert("Hatalı Parola!"); }}>
                  <div className="input-group" style={{ marginBottom: '20px' }}>
                    <input type="password" placeholder="Parolayı Giriniz" value={portalPassword} onChange={(e) => setPortalPassword(e.target.value)} required className="auth-input" />
                  </div>
                  <button type="submit" className="submit-btn-large">Oturum Aç <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i></button>
                </form>
              </div>
            ) : (
              <div className="dashboard-container glass-panel">
                <div className="dashboard-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fas fa-server" style={{ color: 'var(--accent)', fontSize: '1.5rem' }}></i>
                    <h2 style={{ margin: 0 }}>Operasyon Merkezi</h2>
                  </div>
                  <div className="tab-buttons">
                    <button className={portalTab === 'requests' ? 'active' : ''} onClick={() => setPortalTab('requests')}>Talepler</button>
                    <button className={portalTab === 'operations' ? 'active' : ''} onClick={() => setPortalTab('operations')}>Operasyonlar</button>
                    <button className={portalTab === 'companies' ? 'active' : ''} onClick={() => setPortalTab('companies')}>Firma Yönetimi</button>
                    <button className={portalTab === 'info' ? 'active' : ''} onClick={() => setPortalTab('info')}>Bilgiler / Evrak</button>
                  </div>
                  <button className="logout-btn-fancy" onClick={() => setIsAuth(false)}>
                    <i className="fas fa-sign-out-alt"></i> Çıkış Yap
                  </button>
                </div>

                <div className="filter-bar">
                  <input type="text" placeholder="Kelime veya ID Ara..." value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                  {portalTab === 'companies' && (
                    <select className="filter-select" value={companyTypeFilter} onChange={(e) => setCompanyTypeFilter(e.target.value)}>
                      <option value="Tümü">Tümü (Tip Filtresi)</option>
                      <option value="Müşteri">Sadece Müşteriler</option>
                      <option value="Tedarikçi/Lojistik">Sadece Tedarikçi/Lojistik</option>
                    </select>
                  )}
                </div>

                {/* --- 1. FİRMA YÖNETİMİ --- */}
                {portalTab === 'companies' && (
                  <div className="portal-tab-content">

                    {!showAddCompany && !editingCompanyId && (
                      <button className="add-btn-large" onClick={() => setShowAddCompany(true)}>
                        <i className="fas fa-plus" style={{ marginRight: '8px' }}></i> Yeni Firma Ekle
                      </button>
                    )}

                    {(showAddCompany || editingCompanyId) && (
                      <div className="add-request-form form-spacing">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                          <h3 style={{ margin: 0 }}>{editingCompanyId ? 'Firmayı Düzenle' : 'Yeni Firma Ekle'}</h3>
                          <button className="remove-item" onClick={() => { setShowAddCompany(false); setEditingCompanyId(null); }} title="Kapat">✖</button>
                        </div>
                        <form onSubmit={handleAddCompany} className="grid-form pnt-grid-company">
                          <div className="input-group">
                            <label>Firma Tipi</label>
                            <select value={newCompany.type} onChange={e => setNewCompany({ ...newCompany, type: e.target.value })}>
                              <option>Müşteri</option><option>Tedarikçi/Lojistik</option>
                            </select>
                          </div>
                          <div className="input-group col-span-2">
                            <label>Firma İsmi</label>
                            <input type="text" placeholder="Firma İsmi" value={newCompany.name} onChange={e => setNewCompany({ ...newCompany, name: capitalizeWords(e.target.value) })} required />
                          </div>
                          <div className="input-group col-span-3">
                            <label>Firma Notları (Ödeme durumu, Vade vb.)</label>
                            <textarea rows="2" value={newCompany.notes} onChange={e => setNewCompany({ ...newCompany, notes: capitalizeWords(e.target.value) })}></textarea>
                          </div>

                          <div className="dynamic-list-container col-span-3">
                            <label>Firma Yetkilileri (İsim, Ünvan, İletişim)</label>
                            {newCompany.contacts.map((contact, idx) => (
                              <div key={idx} className="flex-row" style={{ marginBottom: '10px' }}>
                                <div className="input-group"><input type="text" placeholder="İsim Soyisim" value={contact.name} onChange={e => handleCompanyContactChange(idx, 'name', e.target.value)} /></div>
                                <div className="input-group"><input type="text" placeholder="Ünvan" value={contact.title} onChange={e => handleCompanyContactChange(idx, 'title', e.target.value)} /></div>
                                <div className="input-group"><input type="text" placeholder="Cep No" value={contact.phone} onChange={e => handleCompanyContactChange(idx, 'phone', e.target.value)} /></div>
                                <div className="input-group"><input type="email" placeholder="E-Posta" value={contact.email} onChange={e => handleCompanyContactChange(idx, 'email', e.target.value)} /></div>
                                {idx > 0 && <button type="button" className="remove-item" onClick={() => removeCompanyContact(idx)}>✖</button>}
                              </div>
                            ))}
                            <button type="button" className="add-mini-btn" onClick={addCompanyContact}>+ Yetkili Ekle</button>
                          </div>
                          <button type="submit" className="submit-btn-large col-span-3">{editingCompanyId ? 'Güncelle' : 'Firmayı Kaydet'}</button>
                        </form>
                      </div>
                    )}

                    <div className="table-responsive">
                      <table className="data-table">
                        <thead><tr><th>Firma Tipi</th><th>Firma Adı</th><th>Notlar</th><th>Yetkililer</th><th>İşlem</th></tr></thead>
                        <tbody>
                          {companies.filter(c =>
                            c.name.toLowerCase().includes(filterText.toLowerCase()) &&
                            (companyTypeFilter === 'Tümü' || c.type === companyTypeFilter)
                          ).map(c => (
                            <tr key={c.id}>
                              <td><span className={`status-badge ${c.type === 'Müşteri' ? 'success' : 'warning'}`}>{c.type}</span></td>
                              <td><strong>{c.name}</strong></td>
                              <td>{c.notes}</td>
                              <td>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem' }}>
                                  {(c.contacts || []).map((contact, i) => (
                                    <li key={i}><span style={{ color: 'var(--accent)' }}>{contact.name}</span> ({contact.title}) - {contact.phone}</li>
                                  ))}
                                </ul>
                              </td>
                              <td style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                                <button className="action-btn edit" onClick={() => editCompany(c)}>Düzenle</button>
                                <button className="action-btn reject" onClick={() => deleteCompany(c.id)}>Sil</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* --- 2. TALEPLER SEKMESİ --- */}
                {portalTab === 'requests' && (
                  <div className="portal-tab-content">

                    {!showAddRequest && (
                      <button className="add-btn-large" onClick={() => setShowAddRequest(true)}>
                        <i className="fas fa-plus" style={{ marginRight: '8px' }}></i> Yeni Talep Oluştur
                      </button>
                    )}

                    {showAddRequest && (
                      <div className="add-request-form form-spacing">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                          <h3 style={{ margin: 0 }}>Yeni Talep Oluştur</h3>
                          <button className="remove-item" onClick={() => setShowAddRequest(false)} title="Kapat">✖</button>
                        </div>
                        <form onSubmit={handleAddRequest} className="grid-form pnt-grid-request">
                          <div className="input-group"><label>Tarih</label><input type="date" value={newReq.date} onChange={e => setNewReq({ ...newReq, date: e.target.value })} required /></div>
                          <div className="input-group col-span-2"><label>Müşteri (Listeden Seç)</label><input type="text" list="customer-list" placeholder="Firma Adı" value={newReq.customer} onChange={e => setNewReq({ ...newReq, customer: capitalizeWords(e.target.value) })} required /></div>
                          <div className="input-group"><label>Hat</label><select value={newReq.mode} onChange={e => setNewReq({ ...newReq, mode: e.target.value })}><option>Karayolu</option><option>Havayolu</option><option>Denizyolu</option></select></div>

                          <div className="input-group"><label>Yükleme Yeri</label><input type="text" value={newReq.origin} onChange={e => setNewReq({ ...newReq, origin: capitalizeWords(e.target.value) })} /></div>
                          <div className="input-group"><label>Boşaltma Yeri</label><input type="text" value={newReq.dest} onChange={e => setNewReq({ ...newReq, dest: capitalizeWords(e.target.value) })} /></div>
                          <div className="input-group"><label>Yük Cinsi</label><input type="text" value={newReq.cargoType} onChange={e => setNewReq({ ...newReq, cargoType: capitalizeWords(e.target.value) })} /></div>
                          <div className="input-group"><label>Teklif Alınan Firmalar</label><input type="text" placeholder="Firma 1, Firma 2..." value={newReq.quotedCompanies} onChange={e => setNewReq({ ...newReq, quotedCompanies: capitalizeWords(e.target.value) })} /></div>

                          {/* YENİ TEK SATIR (Araçlar, Finans, Hatırlatıcı) */}
                          <div className="input-group col-span-4">
                            <div className="unified-row-group">
                              {/* Araç Bölümü */}
                              <div className="inner-group">
                                <label>Araç Cinsi ve Sayısı</label>
                                {newReq.vehicles.map((v, idx) => (
                                  <div key={idx} style={{ display: 'flex', gap: '5px', marginBottom: idx === newReq.vehicles.length - 1 ? '0' : '5px' }}>
                                    <input type="text" placeholder="Örn: 20' Kont." value={v.type} onChange={e => handleVehicleChange(idx, 'type', e.target.value)} style={{ flex: 2 }} />
                                    <input type="number" placeholder="Adet" value={v.count} onChange={e => handleVehicleChange(idx, 'count', e.target.value)} style={{ flex: 1 }} min="1" />
                                    {idx > 0 && <button type="button" className="remove-item" onClick={() => removeVehicleField(idx)} style={{ padding: '0 5px' }}>✖</button>}
                                  </div>
                                ))}
                                <button type="button" className="add-mini-btn" onClick={addVehicleField} style={{ marginTop: '5px', border: 'none', background: 'rgba(0,136,204,0.1)' }}>+ Araç Ekle</button>
                              </div>

                              <div className="inner-group">
                                <label>Gelen Teklif (Tedarikçi)</label>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                  <input type="number" placeholder="Tutar" value={newReq.receivedQuote} onChange={e => setNewReq({ ...newReq, receivedQuote: e.target.value })} />
                                  <select value={newReq.receivedCurrency} onChange={e => setNewReq({ ...newReq, receivedCurrency: e.target.value })} style={{ width: '80px' }}><option>USD</option><option>EUR</option><option>TL</option><option>GBP</option></select>
                                </div>
                              </div>

                              <div className="inner-group">
                                <label>Verilen Teklif (Müşteri)</label>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                  <input type="number" placeholder="Tutar" value={newReq.givenQuote} onChange={e => setNewReq({ ...newReq, givenQuote: e.target.value })} />
                                  <select value={newReq.givenCurrency} onChange={e => setNewReq({ ...newReq, givenCurrency: e.target.value })} style={{ width: '80px' }}><option>USD</option><option>EUR</option><option>TL</option><option>GBP</option></select>
                                </div>
                              </div>

                              <div className="inner-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '5px' }}>
                                  <label style={{ marginBottom: 0 }}>Hatırlatıcı (Aktif Et)</label>
                                  <label className="toggle-switch">
                                    <input type="checkbox" checked={newReq.reminderActive} onChange={e => setNewReq({ ...newReq, reminderActive: e.target.checked })} />
                                    <span className="slider"></span>
                                  </label>
                                </div>
                                <input type="datetime-local" value={newReq.reminderDate} onChange={e => setNewReq({ ...newReq, reminderDate: e.target.value })} disabled={!newReq.reminderActive} style={{ opacity: newReq.reminderActive ? 1 : 0.3 }} />
                              </div>
                            </div>
                          </div>

                          <div className="input-group col-span-4"><label>Günlük Rapor / Notlar</label><textarea rows="2" value={newReq.dailyReport} onChange={e => setNewReq({ ...newReq, dailyReport: capitalizeWords(e.target.value) })}></textarea></div>
                          <button type="submit" className="submit-btn-large col-span-4">Talebi Kaydet</button>
                        </form>
                      </div>
                    )}

                    <div className="table-responsive">
                      <table className="data-table">
                        <thead><tr><th>Tarih</th><th>Müşteri</th><th>Araçlar</th><th>Kar Oranı</th><th>Durum</th><th>İşlem</th></tr></thead>
                        <tbody>
                          {requests.filter(r => r.customer.toLowerCase().includes(filterText.toLowerCase())).map((req, index) => (
                            <React.Fragment key={req.id}>
                              <tr
                                draggable
                                onDragStart={(e) => handleDragStart(e, index, 'requests')}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, index, 'requests')}
                                className="draggable-row"
                              >
                                <td>{req.date}</td><td>{req.customer}</td>
                                <td>{(req.vehicles || []).map(v => `${v.count}x ${v.type}`).join(', ')}</td>
                                <td>
                                  <span style={{ color: '#ff4d4d' }}>{req.receivedQuote} {req.receivedCurrency}</span> ➔ <span style={{ color: '#4ade80' }}>{req.givenQuote} {req.givenCurrency}</span>
                                </td>
                                <td>
                                  <span className={`status-badge ${req.status === 'Onaylandı' ? 'success' : req.status === 'Reddedildi' ? 'danger' : 'warning'}`}>
                                    {req.status}
                                  </span>
                                </td>
                                <td>
                                  {req.status === 'Bekliyor' && (
                                    <>
                                      <button className="action-btn approve" onClick={() => approveRequest(req)} style={{ marginRight: '5px' }}>Onayla</button>
                                      <button className="action-btn reject" onClick={() => rejectRequest(req.id)} style={{ marginRight: '5px' }}>Reddet</button>
                                    </>
                                  )}
                                  <button className="action-btn edit" onClick={() => setExpandedReqId(expandedReqId === req.id ? null : req.id)} style={{ marginRight: '5px' }}>{expandedReqId === req.id ? 'Gizle' : 'Detay'}</button>
                                  <button className="action-btn remove-item" onClick={() => deleteRequest(req.id)} title="Tamamen Sil"><i className="fas fa-trash"></i></button>
                                </td>
                              </tr>

                              {/* Talep Detayları Inline Edit */}
                              {expandedReqId === req.id && (
                                <tr className="expanded-row">
                                  <td colSpan="6">
                                    <div className="inline-edit-box">

                                      <div className="modal-section border-info section-spacing">
                                        <h3>Lojistik Bilgileri</h3>
                                        <div className="grid-form pnt-grid-3">
                                          <div className="input-group"><label>Yükleme Yeri</label><input type="text" value={req.origin} onChange={e => updateReqField(req.id, 'origin', e.target.value)} /></div>
                                          <div className="input-group"><label>Boşaltma Yeri</label><input type="text" value={req.dest} onChange={e => updateReqField(req.id, 'dest', e.target.value)} /></div>
                                          <div className="input-group"><label>Yük Cinsi</label><input type="text" value={req.cargoType} onChange={e => updateReqField(req.id, 'cargoType', e.target.value)} /></div>
                                        </div>
                                      </div>

                                      <div className="modal-section border-accent section-spacing">
                                        <h3>Operasyon & Notlar</h3>
                                        <div className="grid-form pnt-grid-2">
                                          <div className="input-group"><label>Teklif Alınan Firmalar</label><input type="text" value={req.quotedCompanies} onChange={e => updateReqField(req.id, 'quotedCompanies', e.target.value)} /></div>
                                          <div className="input-group">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '5px' }}>
                                              <label style={{ marginBottom: 0 }}>Hatırlatıcı (Aktif Et)</label>
                                              <label className="toggle-switch">
                                                <input type="checkbox" checked={req.reminderActive} onChange={e => updateReqField(req.id, 'reminderActive', e.target.checked)} />
                                                <span className="slider"></span>
                                              </label>
                                            </div>
                                            <input type="datetime-local" value={req.reminderDate} onChange={e => updateReqField(req.id, 'reminderDate', e.target.value)} disabled={!req.reminderActive} style={{ opacity: req.reminderActive ? 1 : 0.3 }} />
                                          </div>
                                          <div className="input-group col-span-2"><label>Günlük Rapor</label><textarea rows="2" value={req.dailyReport} onChange={e => updateReqField(req.id, 'dailyReport', e.target.value)}></textarea></div>
                                        </div>
                                      </div>

                                      <div className="modal-section border-danger section-spacing">
                                        <h3>Finans (Ücretleri Düzenle)</h3>
                                        <div className="grid-form pnt-grid-2">
                                          <div className="input-group">
                                            <label>Gelen Teklif Ücreti</label>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '5px' }}>
                                              <input type="number" value={req.receivedQuote} onChange={e => updateReqField(req.id, 'receivedQuote', e.target.value)} />
                                              <select value={req.receivedCurrency} onChange={e => updateReqField(req.id, 'receivedCurrency', e.target.value)}><option>USD</option><option>EUR</option><option>TL</option><option>GBP</option></select>
                                            </div>
                                          </div>
                                          <div className="input-group">
                                            <label>Verilen Teklif Ücreti</label>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '5px' }}>
                                              <input type="number" value={req.givenQuote} onChange={e => updateReqField(req.id, 'givenQuote', e.target.value)} />
                                              <select value={req.givenCurrency} onChange={e => updateReqField(req.id, 'givenCurrency', e.target.value)}><option>USD</option><option>EUR</option><option>TL</option><option>GBP</option></select>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* --- 3. OPERASYONLAR SEKMESİ --- */}
                {portalTab === 'operations' && (
                  <div className="portal-tab-content">
                    <div className="table-responsive">
                      <table className="data-table">
                        <thead><tr><th>Op ID</th><th>Tarih</th><th>Müşteri</th><th>Araçlar</th><th>Durum</th><th>İşlem</th></tr></thead>
                        <tbody>
                          {sortedOperations.filter(o => o.opId.toLowerCase().includes(filterText.toLowerCase()) || o.customer.toLowerCase().includes(filterText.toLowerCase())).map((op, index) => (
                            <React.Fragment key={op.opId}>
                              <tr
                                draggable
                                onDragStart={(e) => handleDragStart(e, index, 'operations')}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, index, 'operations')}
                                className={`draggable-row ${op.status === 'Tamamlandı' ? 'row-completed' : ''}`}
                              >
                                <td><strong>{op.opId}</strong></td><td>{op.date}</td><td>{op.customer}</td>
                                <td>{op.vehicleSummary}</td>
                                <td>
                                  <button
                                    className={`status-btn ${op.status === 'Tamamlandı' ? 'status-done' : 'status-ongoing'}`}
                                    onClick={() => toggleOpStatus(op.opId, op.status)}
                                    title="Durumu değiştirmek için tıkla"
                                  >
                                    {op.status === 'Tamamlandı' ? '✔ Tamamlandı' : 'Devam Ediyor'}
                                  </button>
                                </td>
                                <td>
                                  <button className="action-btn edit" onClick={() => setExpandedOpId(expandedOpId === op.opId ? null : op.opId)} style={{ marginRight: '5px' }}>{expandedOpId === op.opId ? 'Gizle' : 'Detay/Düzenle'}</button>
                                  <button className="action-btn remove-item" onClick={() => deleteOperation(op.opId)} title="Tamamen Sil"><i className="fas fa-trash"></i></button>
                                </td>
                              </tr>

                              {/* Operasyon Detay Inline Edit */}
                              {expandedOpId === op.opId && (
                                <tr className="expanded-row">
                                  <td colSpan="6">
                                    <div className="inline-edit-box">

                                      <div className="modal-section border-warning section-spacing">
                                        <h3>Genel Bilgi & Notlar</h3>
                                        <div className="grid-form pnt-grid-2">
                                          <div className="input-group"><label>Op ID (Düzenlenebilir)</label><input type="text" value={op.opId} onChange={e => updateOpField(op.opId, 'opId', e.target.value)} /></div>
                                          <div className="input-group">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '5px' }}>
                                              <label style={{ marginBottom: 0 }}>Hatırlatıcı (Aktif Et)</label>
                                              <label className="toggle-switch">
                                                <input type="checkbox" checked={op.reminderActive} onChange={e => updateOpField(op.opId, 'reminderActive', e.target.checked)} />
                                                <span className="slider"></span>
                                              </label>
                                            </div>
                                            <input type="datetime-local" value={op.reminderDate} onChange={e => updateOpField(op.opId, 'reminderDate', e.target.value)} disabled={!op.reminderActive} style={{ opacity: op.reminderActive ? 1 : 0.3 }} />
                                          </div>
                                          <div className="input-group col-span-2"><label>Operasyon Notu / Güncel Durum</label><textarea rows="2" value={op.opNote} onChange={e => updateOpField(op.opId, 'opNote', capitalizeWords(e.target.value))} placeholder="Araç şurada, gümrük bekleniyor..."></textarea></div>
                                        </div>
                                      </div>

                                      <div className="modal-section border-info section-spacing">
                                        <h3>Lojistik & Gümrük</h3>
                                        <div className="grid-form pnt-grid-company">
                                          <div className="input-group"><label>Yükleme Tarihi</label><input type="date" value={op.loadingDate} onChange={e => updateOpField(op.opId, 'loadingDate', e.target.value)} /></div>
                                          <div className="input-group"><label>Boşaltma Tarihi</label><input type="date" value={op.unloadingDate} onChange={e => updateOpField(op.opId, 'unloadingDate', e.target.value)} /></div>
                                          <div className="input-group"><label>Plaka / AWB / Kont No</label><input type="text" value={op.referenceNo} onChange={e => updateOpField(op.opId, 'referenceNo', e.target.value)} /></div>
                                          <div className="input-group"><label>Tedarikçi Firma</label><input type="text" list="supplier-list" value={op.supplier} onChange={e => updateOpField(op.opId, 'supplier', capitalizeWords(e.target.value))} /></div>
                                          <div className="input-group"><label>Karşı Firma</label><input type="text" value={op.buyer} onChange={e => updateOpField(op.opId, 'buyer', capitalizeWords(e.target.value))} /></div>
                                          <div className="input-group"><label>Varış Gümrük</label><input type="text" value={op.destCustoms} onChange={e => updateOpField(op.opId, 'destCustoms', capitalizeWords(e.target.value))} /></div>
                                        </div>
                                      </div>

                                      {/* Satiş & Alış Yan Yana Tek Kartta */}
                                      <div className="modal-section border-accent section-spacing">
                                        <h3 style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Finans Yönetimi (Satış ve Alış)</h3>
                                        <div className="grid-form pnt-grid-2">

                                          <div className="finance-col">
                                            <h4 style={{ color: 'var(--accent)', marginBottom: '15px' }}>Satış (Müşteriye)</h4>
                                            <div className="input-group">
                                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '10px' }}>
                                                <input type="number" placeholder="Ana Navlun" value={op.salesFreight} onChange={e => updateOpField(op.opId, 'salesFreight', e.target.value)} />
                                                <select value={op.salesCurrency} onChange={e => updateOpField(op.opId, 'salesCurrency', e.target.value)}><option>USD</option><option>EUR</option><option>TL</option><option>GBP</option></select>
                                              </div>
                                            </div>
                                            <h4 className="mt-4" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ek Maliyetler</h4>
                                            {(op.salesExtras || []).map((ex, i) => (
                                              <div className="flex-row" key={ex.id || i}>
                                                <input type="text" placeholder="Açıklama" value={ex.desc} onChange={e => updateExtraCost(op.opId, 'sales', i, 'desc', capitalizeWords(e.target.value))} />
                                                <input type="number" placeholder="Tutar" value={ex.amount} onChange={e => updateExtraCost(op.opId, 'sales', i, 'amount', e.target.value)} style={{ maxWidth: '80px' }} />
                                                <select value={ex.currency} onChange={e => updateExtraCost(op.opId, 'sales', i, 'currency', e.target.value)} style={{ maxWidth: '70px' }}><option>USD</option><option>EUR</option><option>TL</option><option>GBP</option></select>
                                                <button type="button" className="remove-item" onClick={() => removeExtraCost(op.opId, 'sales', i)} title="Maliyeti Sil">✖</button>
                                              </div>
                                            ))}
                                            <button className="add-mini-btn" onClick={() => addExtraCost(op.opId, 'sales')}>+ Ek Maliyet Ekle</button>
                                            <div className="input-group mt-4"><label>Pentagram Fatura No</label><input type="text" value={op.pentaInv} onChange={e => updateOpField(op.opId, 'pentaInv', e.target.value)} /></div>
                                          </div>

                                          <div className="finance-col">
                                            <h4 style={{ color: '#ff4d4d', marginBottom: '15px' }}>Alış (Tedarikçiden)</h4>
                                            <div className="input-group">
                                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '10px' }}>
                                                <input type="number" placeholder="Ana Navlun" value={op.purchaseFreight} onChange={e => updateOpField(op.opId, 'purchaseFreight', e.target.value)} />
                                                <select value={op.purchaseCurrency} onChange={e => updateOpField(op.opId, 'purchaseCurrency', e.target.value)}><option>USD</option><option>EUR</option><option>TL</option><option>GBP</option></select>
                                              </div>
                                            </div>
                                            <h4 className="mt-4" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ek Maliyetler</h4>
                                            {(op.purchaseExtras || []).map((ex, i) => (
                                              <div className="flex-row" key={ex.id || i}>
                                                <input type="text" placeholder="Açıklama" value={ex.desc} onChange={e => updateExtraCost(op.opId, 'purchase', i, 'desc', capitalizeWords(e.target.value))} />
                                                <input type="number" placeholder="Tutar" value={ex.amount} onChange={e => updateExtraCost(op.opId, 'purchase', i, 'amount', e.target.value)} style={{ maxWidth: '80px' }} />
                                                <select value={ex.currency} onChange={e => updateExtraCost(op.opId, 'purchase', i, 'currency', e.target.value)} style={{ maxWidth: '70px' }}><option>USD</option><option>EUR</option><option>TL</option><option>GBP</option></select>
                                                <button type="button" className="remove-item" onClick={() => removeExtraCost(op.opId, 'purchase', i)} title="Maliyeti Sil">✖</button>
                                              </div>
                                            ))}
                                            <button className="add-mini-btn" onClick={() => addExtraCost(op.opId, 'purchase')}>+ Ek Maliyet Ekle</button>
                                            <div className="input-group mt-4"><label>Tedarikçi Fatura No</label><input type="text" value={op.supplierInv} onChange={e => updateOpField(op.opId, 'supplierInv', e.target.value)} /></div>
                                          </div>

                                        </div>
                                      </div>

                                      <div className="modal-section border-success section-spacing">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px', marginBottom: '20px' }}>
                                          <h3 style={{ margin: 0, border: 0, padding: 0 }}>Evrak Yönetimi</h3>
                                          <button className="action-btn" style={{ background: '#10b981', color: 'white' }} onClick={() => alert("Dosyalar İndiriliyor...")}>
                                            <i className="fas fa-download"></i> İndir
                                          </button>
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                                          <div className="input-group" style={{ flex: 1 }}>
                                            <label>Belge Tipi</label>
                                            <select id={`docTypeSelect-${op.opId}`}>
                                              <option value="T1">T1</option><option value="CMR">CMR</option><option value="Satış Faturası">Satış Faturası</option>
                                              <option value="Alış Faturası">Alış Faturası</option><option value="EX1">EX1</option><option value="ATR">ATR</option>
                                              <option value="AWB">AWB</option><option value="Konşimento">Konşimento</option><option value="Invoice">Invoice</option>
                                              <option value="Packing List">Packing List</option>
                                            </select>
                                          </div>
                                          <input type="file" id={`fileUploader-${op.opId}`} onChange={(e) => addDocument(e, op.opId)} style={{ display: 'none' }} />
                                          <button className="action-btn upload" onClick={() => document.getElementById(`fileUploader-${op.opId}`).click()} style={{ height: '45px', padding: '0 25px', marginBottom: '0' }}>Evrak Yükle</button>
                                        </div>
                                        <ul className="doc-list mt-4">
                                          {(op.documents || []).map((doc, idx) => (
                                            <li key={idx}><i className="fas fa-file-alt"></i> <strong>{doc.type}:</strong> {doc.name}</li>
                                          ))}
                                        </ul>
                                      </div>

                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* --- 4. BİLGİLER / DOKÜMANLAR SEKMESİ --- */}
                {portalTab === 'info' && (
                  <div className="portal-tab-content">

                    {!showAddInfo && (
                      <button className="add-btn-large" onClick={() => setShowAddInfo(true)}>
                        <i className="fas fa-plus" style={{ marginRight: '8px' }}></i> Yeni Bilgi / Dosya Ekle
                      </button>
                    )}

                    {showAddInfo && (
                      <div className="add-request-form form-spacing">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                          <h3 style={{ margin: 0 }}>Yeni Bilgi Ekle</h3>
                          <button className="remove-item" onClick={() => setShowAddInfo(false)} title="Kapat">✖</button>
                        </div>
                        <form onSubmit={handleAddInfo} className="grid-form pnt-grid-2">
                          <div className="input-group col-span-2"><label>Başlık (Vergi Levhası, PNR Şifresi vb.)</label><input type="text" value={newInfo.title} onChange={e => setNewInfo({ ...newInfo, title: capitalizeWords(e.target.value) })} required /></div>
                          <div className="input-group col-span-2"><label>Serbest Metin (İsteğe Bağlı)</label><textarea rows="3" value={newInfo.text} onChange={e => setNewInfo({ ...newInfo, text: e.target.value })}></textarea></div>

                          <div className="dynamic-list-container col-span-2">
                            <label>Dosya Ekle</label>
                            <input type="file" onChange={addInfoFile} className="custom-file-button" style={{ padding: '10px', background: 'transparent' }} />
                            {newInfo.files.length > 0 && (
                              <ul className="doc-list mt-4">
                                {newInfo.files.map((f, i) => <li key={i}><i className="fas fa-file"></i> {f.name}</li>)}
                              </ul>
                            )}
                          </div>
                          <button type="submit" className="submit-btn-large col-span-2">Kaydet</button>
                        </form>
                      </div>
                    )}

                    <div className="grid-form pnt-grid-1" style={{ marginTop: '20px' }}>
                      {infoList.filter(i => i.title.toLowerCase().includes(filterText.toLowerCase())).map((info, index) => (
                        <div
                          key={info.id}
                          className="unified-card glass-panel draggable-row"
                          draggable
                          onDragStart={(e) => handleDragStart(e, index, 'info')}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index, 'info')}
                          style={{ alignItems: 'flex-start', textAlign: 'left', padding: '25px', width: '100%' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px', marginBottom: '15px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--accent)' }}>{info.title}</h3>
                            <button className="remove-item" onClick={() => deleteInfo(info.id)} title="Sil"><i className="fas fa-trash"></i></button>
                          </div>
                          {info.text && <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', marginBottom: '15px', color: 'white' }}>{info.text}</p>}
                          {info.files && info.files.length > 0 && (
                            <ul className="doc-list" style={{ width: '100%' }}>
                              {info.files.map((f, i) => <li key={i} style={{ background: 'rgba(0,136,204,0.1)', cursor: 'pointer' }}><i className="fas fa-download"></i> {f.name}</li>)}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="footer-section">
        <div className="container footer-bottom">
          <p>© 2026 Pentagram Logistics. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;