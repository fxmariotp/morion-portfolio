import './style.css';

// --- ESTADO GLOBAL ---
let currentLang = 'es';
let activeObjection = null;

// --- DICCIONARIO DE TRADUCCIONES ---
const typewriterWords = {
  es: ['Cerrador de Ventas', 'Trader Cuantitativo', 'Especialista en Llamada Fría'],
  en: ['Cold Calling Salesman', 'Quantitative Trader', 'B2B Sales Specialist']
};

const userObjections = {
  es: {
    'no-tiempo': '"No tengo tiempo para esto ahora."',
    'ya-tengo': '"Ya tengo contratado un servicio similar."',
    'es-caro': '"En este momento es un gasto muy alto."',
    'mandame-mail': '"Mándame un email y lo leo luego."'
  },
  en: {
    'no-tiempo': '"I don\'t have time for this right now."',
    'ya-tengo': '"I already have a similar service hired."',
    'es-caro': '"At the moment it\'s too high an expense."',
    'mandame-mail': '"Send me an email and I\'ll read it later."'
  }
};

const simulatorResponses = {
  es: {
    'no-tiempo': `"Entiendo perfectamente lo ocupado/a que está. Si le llamo es justamente porque sé que su tiempo vale oro. Solo necesito 60 segundos para decirle cómo Renosur Energías SL ayudó a reducir los costes de energía en un 22% a empresas del mismo sector este mes.\n\nSi tras esos 60 segundos ve que no tiene sentido para usted, colgamos. ¿Le parece bien comenzar el cronómetro?"`,
    'ya-tengo': `"¡Excelente! Eso significa que ya ve la importancia de optimizar el consumo eléctrico. La mayoría de las corporaciones con las que trabajamos ya tenían contratos de energía antes de llamarlos.\n\nLo que valoraron fue nuestra auditoría de facturación oculta, que suele detectar optimizaciones del 15% al 20% que los brókers estándar no muestran. ¿Tiene a mano su última factura para comprobar si hay costes inflados?"`,
    'es-caro': `"Le entiendo perfectamente. De hecho, no quiero que gaste un solo euro de presupuesto adicional. Nuestra propuesta comercial con Renosur se autofinancia con el propio ahorro generado.\n\nEl verdadero gasto está ocurriendo ahora mismo al no tener las tarifas ajustadas al mercado. ¿Prefiere que analicemos su consumo real sin ningún coste para ver cuánto dinero se está perdiendo?"`,
    'mandame-mail': `"Con gusto se lo envío, pero para que sea información 100% útil y no spam genérico de tres páginas, ¿cuál es el aspecto que más le preocupa optimizar en este momento: el término fijo de potencia o el consumo variable?\n\nPregunto porque así le adjunto una comparativa real de 3 líneas directa al grano."`
  },
  en: {
    'no-tiempo': `"I completely understand how busy you are. The reason I'm calling is precisely because I know your time is gold. I only need 60 seconds to tell you how Renosur Energías SL reduced energy costs by 22% for similar companies this month.\n\nIf after 60 seconds you feel this doesn't make sense for you, we hang up. Shall we start the timer?"`,
    'ya-tengo': `"Excellent! That means you already see the strategic importance of optimizing electricity consumption. Most of the corporations we work with already had energy providers before we called them.\n\nWhat they valued was our hidden billing audit, which usually uncovers 15% to 20% additional savings that standard brokers do not show. Do you have your latest bill handy to check for inflated costs?"`,
    'es-caro': `"I understand completely. In fact, I don't want you to spend a single extra euro. Our commercial proposal with Renosur is self-funded through the savings generated.\n\nThe real expense is happening right now by not having your tariffs adjusted to the market. Would you prefer us to analyze your actual consumption at no cost to see how much money you might be losing?"`,
    'mandame-mail': `"I'd be happy to send it, but to make sure it's 100% useful information and not three pages of generic spam, what is the main aspect you are looking to optimize right now: the fixed power term or the variable consumption?\n\nI ask so I can attach a 3-line real comparison straight to the point."`
  }
};

const translations = {
  es: {
    // Nav
    'nav-about': 'Sobre Mí',
    'nav-sales': 'Ventas',
    'nav-trading': 'Trading',
    'nav-skills': 'Habilidades',
    'nav-education': 'Educación',
    'nav-contact': 'Contacto',
    'nav-cta': 'Negociar Ahora',
    
    // Hero
    'hero-badge': 'Disponible para nuevos desafíos',
    'hero-pitch': 'Apasionado por los mercados financieros y experto en el desarrollo de relaciones comerciales de alto valor. Conecto de forma instantánea a través de llamada en frío e implemento algoritmos cuantitativos con gestión de riesgo estricta.',
    'hero-cta-view': 'Ver Trayectoria',
    'hero-cta-contact': 'Contáctame',
    
    // Metrics
    'metric-sales-label': 'Años en Ventas',
    'metric-sales-desc': 'Especialidad en Cold Calling',
    'metric-clients-label': 'Clientes Particulares',
    'metric-clients-desc': 'Cartera activa y fidelizada',
    'metric-funding-label': 'Cuentas de Fondeo',
    'metric-funding-desc': 'Consistencia de más de 1 año',
    'metric-risk-label': 'Gestión de Riesgo',
    'metric-risk-desc': 'Consistencia matemática estricta',
    
    // Sales
    'sales-tag': 'Ventas de Alto Impacto',
    'sales-title': 'El Arte de la Conversión Directa',
    'sales-description': 'La llamada en frío es el canal definitivo para generar negocios rápidos y de gran volumen. Con <strong>3 años de experiencia comercial</strong>, he dominado la oratoria comercial y el cierre directo, desarrollando estrategias que superan la barrera del "no" de inmediato.',
    'sales-exp1-date': 'Desde hace 2 años',
    'sales-exp1-text': 'Generación de nuevas cuentas comerciales e incremento sostenido de la facturación en el sector energético, liderando la prospección telefónica activa.',
    'sales-exp2-title': 'Gestor de Cuentas Particulares',
    'sales-exp2-date': '3 años de trayectoria acumulada',
    'sales-exp2-text': 'Captación y fidelización de una cartera de <strong>más de 400 clientes particulares</strong> a nivel nacional mediante venta telefónica y consultiva.',
    
    // Simulator Objections
    'sim-instruction': 'Pon a prueba mis habilidades de Cold Calling. Selecciona la objeción del cliente:',
    'sim-obj-1': '"No tengo tiempo para esto ahora."',
    'sim-obj-2': '"Ya tengo contratado un servicio similar."',
    'sim-obj-3': '"En este momento es un gasto muy alto."',
    'sim-obj-4': '"Mándame un email y lo leo luego."',
    'sim-role': 'Especialista en Llamada Fría',
    'sim-response-placeholder': 'Selecciona una objeción de arriba para ver cómo reabro la llamada de inmediato...',
    
    // Trading
    'chart-title': 'Evolución de Equity ($200k Fondeados)',
    'chart-legend': 'Cuenta Fondeada Consistente',
    'chart-btn': 'Simular Historial',
    'trading-tag': 'Análisis Quant & Trading',
    'trading-title': 'Algoritmos, Forex y Consistencia',
    'trading-description': 'En los mercados financieros, la gestión de riesgo lo es todo. Opero de manera híbrida (manual y automatizada con Python/PineScript) en los mercados de <strong>Forex y Criptomonedas</strong>. Mi enfoque cuantitativo me permite mantener la calma estadística bajo cualquier circunstancia de mercado.',
    'trading-feat1-title': 'Consistencia de $200,000 USD',
    'trading-feat1-text': 'Gestión activa y exitosa de cuentas de fondeo institucionales de $200k con consistencia demostrada durante más de un año.',
    'trading-feat2-title': 'Trading Algorítmico & Scripts',
    'trading-feat2-text': 'Desarrollo de estrategias automatizadas de intradía y swing en PineScript (TradingView) y bots de control en Python.',
    'trading-feat3-title': 'Gestión de Riesgo Rigurosa',
    'trading-feat3-text': 'Reglas inquebrantables de drawdown máximo diario e integral, adaptándome dinámicamente a las condiciones del mercado sin depender de ratios rígidos.',
    
    // Skills
    'skills-tag': 'Habilidades Clave',
    'skills-title': 'El Mix Comercial y Analítico',
    'skills-subtitle': 'Fusión estratégica de habilidades duras y blandas orientadas al rendimiento.',
    'skills-col1-title': 'Ventas & Negociación',
    'skill-name-cierre': 'Cierre de Ventas',
    'skill-name-oratoria': 'Oratoria & Comunicación',
    'skill-name-contratos': 'Negociación de Contratos',
    'skill-name-objeciones': 'Manejo de Objeciones',
    'skill-name-psicologia': 'Psicología de Mercado/Cliente',
    'skills-col2-title': 'Trading & Tecnología',
    'skill-name-tecnico': 'Análisis Técnico y Macro',
    'skill-name-riesgo': 'Gestión de Riesgo (Risk Management)',
    'skill-name-python': 'Python & PineScript',
    'skill-name-crm': 'CRM (Salesforce, HubSpot)',
    'skill-name-excel': 'Excel Avanzado & Datos',
    
    // Languages Box
    'lang-box-title': 'Idiomas',
    'lang-es-name': 'Español',
    'lang-es-level': 'Nativo',
    'lang-en-name': 'Inglés',
    'lang-en-level': 'B2 (Conversación fluida)',
    
    // Education
    'edu-tag': 'Formación',
    'edu-title': 'Estudios & Logros Académicos',
    'edu-badge1': 'Especialización Financiera',
    'edu-sub1': 'HustlersUniversity | Nivel Brown Belt',
    'edu-desc1': 'Estudios de nivel avanzado en análisis técnico, gestión de colateral y trading intradía con validación práctica y consistencia de mercado demostrada.',
    'edu-badge2': 'Educación Secundaria',
    'edu-title2': 'Bachillerato Tecnológico',
    'edu-desc2': 'Formación orientada a ciencias aplicadas, matemáticas avanzadas y fundamentos informáticos, base de mi perfil analítico-cuantitativo actual.',
    
    // Contact
    'contact-tag': '¿Hablamos?',
    'contact-title': 'Establezcamos una Relación Comercial',
    'contact-pitch': 'Tanto si buscas un cerrador de ventas telefónicas imparable como si quieres hablar sobre algoritmos de trading, sistemas de fondeo o gestión de capital, ponte en contacto conmigo.',
    'contact-method1-label': 'Email Directo',
    'contact-method2-label': 'Teléfono',
    'form-label-name': 'Nombre Completo',
    'form-placeholder-name': 'Ej. John Doe',
    'form-label-email': 'Email corporativo / particular',
    'form-placeholder-email': 'Ej. tu@empresa.com',
    'form-label-subject': 'Asunto',
    'form-placeholder-subject': 'Ej. Oportunidad comercial / Trading',
    'form-label-msg': 'Mensaje',
    'form-placeholder-msg': 'Cuéntame brevemente tu proyecto o propuesta...',
    'form-btn': 'Enviar Mensaje',
    
    // Footer
    'footer-copy': '&copy; 2026 Mario Tiburcio. Todos los derechos reservados. Diseñado bajo el estándar de tecnología minimalista.',
    'alert-success': 'Mensaje enviado con éxito. Mario se pondrá en contacto contigo a la brevedad.'
  },
  en: {
    // Nav
    'nav-about': 'About Me',
    'nav-sales': 'Sales',
    'nav-trading': 'Trading',
    'nav-skills': 'Skills',
    'nav-education': 'Education',
    'nav-contact': 'Contact',
    'nav-cta': 'Negotiate Now',
    
    // Hero
    'hero-badge': 'Available for new challenges',
    'hero-pitch': 'Passionate about financial markets and expert in high-value business development. I connect instantly through cold calling and deploy quantitative algorithms with strict risk management.',
    'hero-cta-view': 'View Track Record',
    'hero-cta-contact': 'Contact Me',
    
    // Metrics
    'metric-sales-label': 'Years in Sales',
    'metric-sales-desc': 'Specializing in Cold Calling',
    'metric-clients-label': 'Private Clients',
    'metric-clients-desc': 'Active & loyal portfolio',
    'metric-funding-label': 'Funded Accounts',
    'metric-funding-desc': 'Consistent for over 1 year',
    'metric-risk-label': 'Risk Management',
    'metric-risk-desc': 'Strict mathematical consistency',
    
    // Sales
    'sales-tag': 'High-Impact Sales',
    'sales-title': 'The Art of Direct Conversion',
    'sales-description': 'Cold calling is the definitive channel for rapid, high-volume business generation. With <strong>3 years of sales experience</strong>, I have mastered commercial speech and direct closing, developing strategies that bypass the "no" instantly.',
    'sales-exp1-date': 'For the past 2 years',
    'sales-exp1-text': 'Commercial client acquisition and sustained revenue growth in the energy sector, leading active telephone prospecting.',
    'sales-exp2-title': 'Private Accounts Manager',
    'sales-exp2-date': '3 years of cumulative track record',
    'sales-exp2-text': 'Acquisition and retention of a portfolio of <strong>over 400 private clients</strong> nationwide via telephone and consultative sales.',
    
    // Simulator Objections
    'sim-instruction': 'Test my Cold Calling skills. Select a client objection:',
    'sim-obj-1': '"I don\'t have time for this right now."',
    'sim-obj-2': '"I already have a similar service hired."',
    'sim-obj-3': '"At the moment it\'s too high an expense."',
    'sim-obj-4': '"Send me an email and I\'ll read it later."',
    'sim-role': 'Cold Caller Specialist',
    'sim-response-placeholder': 'Select an objection above to see how I reopen the call immediately...',
    
    // Trading
    'chart-title': 'Equity Curve ($200k Funded)',
    'chart-legend': 'Consistent Funded Account',
    'chart-btn': 'Simulate Curve',
    'trading-tag': 'Quant & Trading Analysis',
    'trading-title': 'Algorithms, Forex & Consistency',
    'trading-description': 'In financial markets, risk management is everything. I operate in a hybrid manner (manual and automated with Python/PineScript) across <strong>Forex and Cryptocurrencies</strong>. My quantitative approach allows me to maintain statistical calm under any market condition.',
    'trading-feat1-title': 'Consistency of $200,000 USD',
    'trading-feat1-text': 'Active and successful management of institutional $200k funded accounts with demonstrated consistency for over a year.',
    'trading-feat2-title': 'Algorithmic Trading & Scripts',
    'trading-feat2-text': 'Development of automated intraday and swing strategies in PineScript (TradingView) and control bots in Python.',
    'trading-feat3-title': 'Rigorous Risk Management',
    'trading-feat3-text': 'Unbreakable rules of daily and overall drawdown, adapting dynamically to market conditions without relying on rigid ratios.',
    
    // Skills
    'skills-tag': 'Key Skills',
    'skills-title': 'The Sales & Analytical Mix',
    'skills-subtitle': 'Strategic fusion of hard and soft skills geared towards performance.',
    'skills-col1-title': 'Sales & Negotiation',
    'skill-name-cierre': 'Sales Closing',
    'skill-name-oratoria': 'Public Speaking & Comm.',
    'skill-name-contratos': 'Contract Negotiation',
    'skill-name-objeciones': 'Objection Handling',
    'skill-name-psicologia': 'Market & Client Psychology',
    'skills-col2-title': 'Trading & Technology',
    'skill-name-tecnico': 'Technical & Macro Analysis',
    'skill-name-riesgo': 'Risk Management',
    'skill-name-python': 'Python & PineScript',
    'skill-name-crm': 'CRM (Salesforce, HubSpot)',
    'skill-name-excel': 'Advanced Excel & Data',
    
    // Languages Box
    'lang-box-title': 'Languages',
    'lang-es-name': 'Spanish',
    'lang-es-level': 'Native',
    'lang-en-name': 'English',
    'lang-en-level': 'B2 (Fluent Conversation)',
    
    // Education
    'edu-tag': 'Education',
    'edu-title': 'Studies & Academic Achievements',
    'edu-badge1': 'Financial Specialization',
    'edu-sub1': 'HustlersUniversity | Brown Belt Level',
    'edu-desc1': 'Advanced level studies in technical analysis, collateral management, and intraday trading with practical validation and demonstrated market consistency.',
    'edu-badge2': 'Secondary Education',
    'edu-title2': 'Technological High School',
    'edu-desc2': 'Education focused on applied sciences, advanced mathematics, and computer science fundamentals, forming the basis of my current analytical-quantitative profile.',
    
    // Contact
    'contact-tag': 'Let\'s Talk',
    'contact-title': 'Let\'s Build a Commercial Relationship',
    'contact-pitch': 'Whether you are looking for an unstoppable telephone sales closer or want to talk about trading algorithms, funding systems, or capital management, get in touch with me.',
    'contact-method1-label': 'Direct Email',
    'contact-method2-label': 'Phone',
    'form-label-name': 'Full Name',
    'form-placeholder-name': 'e.g. John Doe',
    'form-label-email': 'Corporate / Personal Email',
    'form-placeholder-email': 'e.g. you@company.com',
    'form-label-subject': 'Subject',
    'form-placeholder-subject': 'e.g. Business Opportunity / Trading',
    'form-label-msg': 'Message',
    'form-placeholder-msg': 'Tell me briefly about your project or proposal...',
    'form-btn': 'Send Message',
    
    // Footer
    'footer-copy': '&copy; 2026 Mario Tiburcio. All rights reserved. Designed under the tech minimalist standard.',
    'alert-success': 'Message sent successfully. Mario will get back to you shortly.'
  }
};

// --- CONFIGURACIÓN E INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initTypewriter();
  initMetricsCounter();
  initObjectionSimulator();
  initTradingChart();
  initScrollReveal();
  initAvatarTilt();
  initContactForm();
});

// --- GESTIÓN DE IDIOMA (I18N) ---
function initLanguageSwitcher() {
  const btnEs = document.getElementById('btn-lang-es');
  const btnEn = document.getElementById('btn-lang-en');
  
  if (!btnEs || !btnEn) return;

  const savedLang = localStorage.getItem('lang') || 'es';
  setLanguage(savedLang);

  btnEs.addEventListener('click', () => setLanguage('es'));
  btnEn.addEventListener('click', () => setLanguage('en'));
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  const btnEs = document.getElementById('btn-lang-es');
  const btnEn = document.getElementById('btn-lang-en');
  if (btnEs && btnEn) {
    if (lang === 'es') {
      btnEs.classList.add('active');
      btnEn.classList.remove('active');
    } else {
      btnEn.classList.add('active');
      btnEs.classList.remove('active');
    }
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Traducir respuestas activas del simulador
  const textElement = document.getElementById('sim-response-text');
  const userTextElement = document.getElementById('sim-user-text');
  if (textElement && activeObjection) {
    textElement.textContent = simulatorResponses[lang][activeObjection];
  }
  if (userTextElement && activeObjection) {
    userTextElement.textContent = userObjections[lang][activeObjection];
  }
}

// --- EFECTO TYPEWRITER ---
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const words = typewriterWords[currentLang] || typewriterWords['es'];
    const currentWord = words[wordIndex % words.length];
    
    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingDelay = 500;
    }

    setTimeout(type, typingDelay);
  }

  setTimeout(type, 1000);
}

// --- CONTADORES NUMÉRICOS ANIMADOS ---
function initMetricsCounter() {
  const metrics = document.querySelectorAll('.metric-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute('data-target'), 10);
        animateValue(target, 0, targetVal, 2000);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  metrics.forEach((metric) => observer.observe(metric));

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress * (2 - progress);
      const val = Math.floor(easeProgress * (end - start) + start);
      obj.innerHTML = val;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = end;
      }
    };
    window.requestAnimationFrame(step);
  }
}

// --- SIMULADOR DE OBJECIONES DE VENTAS (TIPO CHAT APP) ---
function initObjectionSimulator() {
  const buttons = document.querySelectorAll('.btn-obj');
  const container = document.getElementById('sim-response-container');
  const userTextElement = document.getElementById('sim-user-text');
  const textElement = document.getElementById('sim-response-text');
  const marioBubble = document.getElementById('sim-mario-bubble-container');

  if (!buttons.length || !textElement || !userTextElement || !container) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Animación de entrada de los globos de texto
      container.style.opacity = '0.5';
      container.style.transform = 'translateY(5px)';
      marioBubble.style.opacity = '0';
      marioBubble.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        activeObjection = btn.getAttribute('data-objection');
        
        // Poner la objeción en el globo del cliente
        userTextElement.textContent = userObjections[currentLang][activeObjection];
        
        // Poner la respuesta en el globo de Mario
        textElement.textContent = simulatorResponses[currentLang][activeObjection];
        
        container.style.transition = 'all 0.3s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        
        // Retraso para la respuesta de Mario simulando "escribiendo..."
        setTimeout(() => {
          marioBubble.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
          marioBubble.style.opacity = '1';
          marioBubble.style.transform = 'translateY(0)';
        }, 300);

      }, 150);
    });
  });
}

// --- GRÁFICO CANVAS DE TRADING (ESTILO DUB.CO / VERCEL) ---
function initTradingChart() {
  const canvas = document.getElementById('trading-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const btnReset = document.getElementById('btn-reset-chart');

  let animationFrameId = null;
  let progress = 0;

  const equityData = [
    200000, 201200, 200800, 203500, 202800, 206000, 
    205100, 209500, 208700, 214000, 212500, 218200, 
    217000, 224000, 222500, 229800, 234500
  ];

  function resizeCanvas() {
    const width = canvas.parentElement.clientWidth;
    canvas.width = width;
    canvas.height = 250; // Algo más compacto para SaaS
    draw();
  }

  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 100);

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      progress = 0;
      animate();
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 30;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    drawGrid(padding, chartWidth, chartHeight);
    drawEquityCurve(padding, chartWidth, chartHeight);
  }

  function drawGrid(padding, w, h) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    
    const cols = 6;
    for (let i = 0; i <= cols; i++) {
      const x = padding + (w / cols) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + h);
      ctx.stroke();
    }

    const rows = 4;
    for (let i = 0; i <= rows; i++) {
      const y = padding + (h / rows) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + w, y);
      ctx.stroke();
    }
  }

  function drawEquityCurve(padding, w, h) {
    const minVal = 195000;
    const maxVal = 240000;
    const pointsCount = equityData.length;

    const pointsToShow = Math.ceil(pointsCount * progress);
    if (pointsToShow === 0) return;

    const coords = [];
    for (let i = 0; i < pointsToShow; i++) {
      const val = equityData[i];
      const x = padding + (w / (pointsCount - 1)) * i;
      const y = padding + h - ((val - minVal) / (maxVal - minVal)) * h;
      coords.push({ x, y, val });
    }

    // Línea azul eléctrica (SaaS style)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }
    ctx.stroke();

    // Relleno degradado azul semitransparente
    if (coords.length > 1) {
      const grad = ctx.createLinearGradient(0, padding, 0, padding + h);
      grad.addColorStop(0, 'rgba(59, 130, 246, 0.12)');
      grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(coords[0].x, padding + h);
      for (let i = 0; i < coords.length; i++) {
        ctx.lineTo(coords[i].x, coords[i].y);
      }
      ctx.lineTo(coords[coords.length - 1].x, padding + h);
      ctx.closePath();
      ctx.fill();
    }

    // Punto del precio actual con sombra azul
    const last = coords[coords.length - 1];
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#3b82f6';
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;

    // Etiqueta de balance
    ctx.fillStyle = '#fafafa';
    ctx.font = 'bold 11px "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`$${last.val.toLocaleString()}`, last.x, last.y - 12);
  }

  function animate() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    const step = () => {
      progress += 0.015;
      if (progress >= 1) {
        progress = 1;
        draw();
      } else {
        draw();
        animationFrameId = requestAnimationFrame(step);
      }
    };
    animationFrameId = requestAnimationFrame(step);
  }

  setTimeout(() => {
    progress = 0;
    animate();
  }, 1000);
}

// --- FORMULARIO DE CONTACTO ---
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const successMsg = translations[currentLang]['alert-success'] || 'Message sent!';
    alert(successMsg);
    form.reset();
  });
}

// --- ANIMACIONES DE ENTRADA EN SCROLL ---
function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  const skillFills = document.querySelectorAll('.skill-bar-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        if (entry.target.classList.contains('skills-column') || entry.target.id === 'skills') {
          animateSkills();
        }
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el) => observer.observe(el));

  function animateSkills() {
    skillFills.forEach((fill) => {
      const styleWidth = fill.style.width;
      if (fill.getAttribute('data-animated') !== 'true') {
        fill.style.width = '0';
        setTimeout(() => {
          fill.style.width = styleWidth;
          fill.setAttribute('data-animated', 'true');
        }, 100);
      }
    });
  }
  
  const skillsCols = document.querySelectorAll('.skills-column');
  skillsCols.forEach((col) => observer.observe(col));
}

// --- AVATAR TILT EFFECT ---
function initAvatarTilt() {
  const wrapper = document.getElementById('avatar-interactive-wrapper');
  if (!wrapper) return;

  const card = wrapper.querySelector('.avatar-card');

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotX = (-y / rect.height) * 15;
    const rotY = (x / rect.width) * 15;

    card.style.transform = `translateY(-5px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
}
