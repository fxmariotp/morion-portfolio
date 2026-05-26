import './style.css';

// --- CONFIGURACIÓN E INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initTypewriter();
  initMetricsCounter();
  initObjectionSimulator();
  initTradingChart();
  initScrollReveal();
  initAvatarTilt();
});

// --- CURSOR PERSONALIZADO ---
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('custom-cursor-dot');
  
  if (!cursor || !dot) return;

  // Seguimiento del mouse
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  });

  // Animación al hacer hover en elementos interactivos
  const interactives = document.querySelectorAll('a, button, select, input, textarea, .tab, .btn-obj');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // Efecto clic
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

// --- EFECTO TYPEWRITER (MAQUINA DE ESCRIBIR) ---
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const words = ['Cold Calling Salesman', 'Quantitative Trader', 'B2B & Retail Specialist'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentWord = words[wordIndex];
    
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
      // Pausa en el final de la palabra escrita
      typingDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingDelay = 500; // Breve pausa antes de escribir la siguiente
    }

    setTimeout(type, typingDelay);
  }

  // Iniciar
  setTimeout(type, 1000);
}

// --- CONTADORES NÚMERICOS ANIMADOS ---
function initMetricsCounter() {
  const metrics = document.querySelectorAll('.metric-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute('data-target'), 10);
        animateValue(target, 0, targetVal, 2000);
        observer.unobserve(target); // Animar solo una vez
      }
    });
  }, { threshold: 0.5 });

  metrics.forEach((metric) => observer.observe(metric));

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Función de aceleración easeOutQuad
      const easeProgress = progress * (2 - progress);
      const val = Math.floor(easeProgress * (end - start) + start);
      obj.innerHTML = val;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = end; // Garantizar valor exacto al final
      }
    };
    window.requestAnimationFrame(step);
  }
}

// --- SIMULADOR DE OBJECIONES DE VENTAS ---
function initObjectionSimulator() {
  const buttons = document.querySelectorAll('.btn-obj');
  const container = document.getElementById('sim-response-container');
  const textElement = document.getElementById('sim-response-text');

  if (!buttons.length || !textElement || !container) return;

  const responses = {
    'no-tiempo': `"Entiendo perfectamente lo ocupado/a que está. Si le llamo es justamente porque sé que su tiempo vale oro. Solo necesito 60 segundos para decirle cómo Renosur Energías SL ayudó a reducir los costes de energía en un 22% a empresas del mismo sector este mes.\n\nSi tras esos 60 segundos ve que no tiene sentido para usted, colgamos. ¿Le parece bien comenzar el cronómetro?"`,
    'ya-tengo': `"¡Excelente! Eso significa que ya ve la importancia estratégica de optimizar el consumo eléctrico. La mayoría de las corporaciones con las que trabajamos ya tenían contratos de energía antes de llamarlos.\n\nLo que valoraron fue nuestra auditoría de facturación oculta, que suele detectar optimizaciones del 15% al 20% que los brókers estándar no muestran. ¿Tiene a mano su última factura para comprobar si hay costes inflados?"`,
    'es-caro': `"Le entiendo perfectamente. De hecho, no quiero que gaste un solo euro de presupuesto adicional. Nuestra propuesta comercial con Renosur se autofinancia con el propio ahorro generado.\n\nEl verdadero gasto está ocurriendo ahora mismo al no tener las tarifas ajustadas al mercado. ¿Prefiere que analicemos su consumo real sin ningún coste para ver cuánto dinero se está perdiendo?"`,
    'mandame-mail': `"Con gusto se lo envío, pero para que sea información 100% útil y no spam genérico de tres páginas, ¿cuál es el aspecto que más le preocupa optimizar en este momento: el término fijo de potencia o el consumo variable?\n\nPregunto porque así le adjunto una comparativa real de 3 líneas directa al grano."`
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Activar botón seleccionado
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Animación de entrada de la caja de respuesta
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        const key = btn.getAttribute('data-objection');
        textElement.textContent = responses[key];
        container.style.transition = 'all 0.3s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 150);
    });
  });
}

// --- GRÁFICO CANVAS DE TRADING ---
function initTradingChart() {
  const canvas = document.getElementById('trading-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const tabs = document.querySelectorAll('.chart-header .tab');
  const btnReset = document.getElementById('btn-reset-chart');

  let activeTab = 'equity'; // 'equity' o 'pinescript' (R:R Ratio)
  let animationFrameId = null;
  let progress = 0; // Para animación de trazo

  // Datos de la curva de Equity ($200k Funded)
  const equityData = [
    200000, 201200, 200800, 203500, 202800, 206000, 
    205100, 209500, 208700, 214000, 212500, 218200, 
    217000, 224000, 222500, 229800, 234500
  ];

  // Ajuste de DPI para Canvas nítido
  function resizeCanvas() {
    const width = canvas.parentElement.clientWidth;
    canvas.width = width;
    canvas.height = 300;
    draw();
  }

  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 100);

  // Cambio de pestañas
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.id === 'tab-pinescript' ? 'pinescript' : 'equity';
      
      // Reiniciar animación
      progress = 0;
      animate();
    });
  });

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      progress = 0;
      animate();
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configuración estética
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Dibujar cuadrícula de fondo
    drawGrid(padding, chartWidth, chartHeight);

    if (activeTab === 'equity') {
      drawEquityCurve(padding, chartWidth, chartHeight);
    } else {
      drawRiskReward(padding, chartWidth, chartHeight);
    }
  }

  function drawGrid(padding, w, h) {
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.04)';
    ctx.lineWidth = 1;
    
    // Líneas verticales
    const cols = 6;
    for (let i = 0; i <= cols; i++) {
      const x = padding + (w / cols) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + h);
      ctx.stroke();
    }

    // Líneas horizontales
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

    // Dibujar los puntos del gráfico hasta el progreso actual
    const pointsToShow = Math.ceil(pointsCount * progress);
    if (pointsToShow === 0) return;

    ctx.beginPath();
    
    // Obtener coordenadas
    const coords = [];
    for (let i = 0; i < pointsToShow; i++) {
      const val = equityData[i];
      const x = padding + (w / (pointsCount - 1)) * i;
      // Invertir Y porque el origen 0,0 del canvas está en la esquina superior izquierda
      const y = padding + h - ((val - minVal) / (maxVal - minVal)) * h;
      coords.push({ x, y, val });
    }

    // Dibujar línea principal (Oro brillante)
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }
    ctx.stroke();

    // Dibujar degradado debajo de la línea
    if (coords.length > 1) {
      const grad = ctx.createLinearGradient(0, padding, 0, padding + h);
      grad.addColorStop(0, 'rgba(212, 175, 55, 0.18)');
      grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(coords[0].x, padding + h);
      for (let i = 0; i < coords.length; i++) {
        ctx.lineTo(coords[i].x, coords[coords.length - 1].y > coords[i].y ? coords[i].y : coords[i].y); // Sigue la curva
      }
      ctx.lineTo(coords[coords.length - 1].x, padding + h);
      ctx.closePath();
      ctx.fill();
    }

    // Dibujar punto final con resplandor
    const last = coords[coords.length - 1];
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#d4af37';
    ctx.fillStyle = '#f5d77f';
    ctx.beginPath();
    ctx.arc(last.x, last.y, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Quitar sombras para otros elementos
    ctx.shadowBlur = 0;

    // Dibujar texto del capital en la esquina superior
    ctx.fillStyle = '#fdfcfb';
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`$${last.val.toLocaleString()}`, last.x, last.y - 12);
  }

  function drawRiskReward(padding, w, h) {
    const entryY = padding + h / 2;
    const targetY = padding + h * 0.15; // Take profit a 3R
    const stopY = padding + h * 0.73;   // Stop loss a 1R

    // 1. Dibujar Zona de Take Profit (Verde esmeralda semi-transparente)
    ctx.fillStyle = 'rgba(91, 212, 134, 0.08)';
    ctx.fillRect(padding, targetY, w, entryY - targetY);
    ctx.strokeStyle = 'rgba(91, 212, 134, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, targetY);
    ctx.lineTo(padding + w, targetY);
    ctx.stroke();

    // 2. Dibujar Zona de Stop Loss (Rojo rubí semi-transparente)
    ctx.fillStyle = 'rgba(212, 91, 91, 0.08)';
    ctx.fillRect(padding, entryY, w, stopY - entryY);
    ctx.strokeStyle = 'rgba(212, 91, 91, 0.2)';
    ctx.beginPath();
    ctx.moveTo(padding, stopY);
    ctx.lineTo(padding + w, stopY);
    ctx.stroke();

    // 3. Dibujar Línea de Entrada (Oro punteada)
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding, entryY);
    ctx.lineTo(padding + w, entryY);
    ctx.stroke();
    ctx.setLineDash([]); // Quitar punteado

    // Textos de niveles
    ctx.fillStyle = '#aba59a';
    ctx.font = '10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('ENTRY LIMIT', padding + 10, entryY - 6);
    ctx.fillStyle = '#5bd486';
    ctx.fillText('TAKE PROFIT (+3.0R)', padding + 10, targetY + 14);
    ctx.fillStyle = '#d45b5b';
    ctx.fillText('STOP LOSS (-1.0R)', padding + 10, stopY - 8);

    // 4. Dibujar precio fluctuante en el trade simulado
    const pricePoints = [
      entryY, entryY + 10, entryY - 5, entryY + 15, entryY + 5,
      entryY - 20, entryY - 10, entryY - 35, entryY - 25, targetY
    ];

    const visiblePoints = Math.ceil(pricePoints.length * progress);
    if (visiblePoints === 0) return;

    ctx.beginPath();
    ctx.strokeStyle = '#fdfcfb';
    ctx.lineWidth = 2;
    
    const xStep = w / (pricePoints.length - 1);
    ctx.moveTo(padding, pricePoints[0]);
    for (let i = 1; i < visiblePoints; i++) {
      ctx.lineTo(padding + xStep * i, pricePoints[i]);
    }
    ctx.stroke();

    // Punto del precio actual
    if (visiblePoints > 0) {
      const idx = visiblePoints - 1;
      const curX = padding + xStep * idx;
      const curY = pricePoints[idx];
      
      ctx.fillStyle = idx === pricePoints.length - 1 ? '#5bd486' : '#d4af37';
      ctx.beginPath();
      ctx.arc(curX, curY, 4, 0, Math.PI * 2);
      ctx.fill();

      if (idx === pricePoints.length - 1) {
        ctx.fillStyle = '#5bd486';
        ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('¡TP ALCANZADO! (+$6,000)', curX - 110, curY - 10);
      }
    }
  }

  function animate() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    const step = () => {
      progress += 0.015; // Velocidad de la animación
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

  // Ejecutar animación inicial
  setTimeout(() => {
    progress = 0;
    animate();
  }, 1000);
}

// --- ANIMACIONES DE ENTRADA EN SCROLL ---
function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
  const skillFills = document.querySelectorAll('.skill-bar-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        
        // Si el contenedor revelado es la sección de habilidades, cargamos sus progress bars
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
      // Para activar la transición nativa de CSS, primero reseteamos y luego aplicamos en un tick
      if (fill.getAttribute('data-animated') !== 'true') {
        fill.style.width = '0';
        setTimeout(() => {
          fill.style.width = styleWidth;
          fill.setAttribute('data-animated', 'true');
        }, 100);
      }
    });
  }
  
  // Registrar observador específico para las columnas de habilidades por si acaso
  const skillsCols = document.querySelectorAll('.skills-column');
  skillsCols.forEach((col) => observer.observe(col));
}

// --- AVATAR 3D TILT EFFECT ---
function initAvatarTilt() {
  const wrapper = document.getElementById('avatar-interactive-wrapper');
  if (!wrapper) return;

  const image = wrapper.querySelector('.avatar-img');

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2; // Distancia X al centro
    const y = e.clientY - rect.top - rect.height / 2;  // Distancia Y al centro
    
    // Dividimos por un factor para suavizar e inclinar levemente
    const rotX = (-y / rect.height) * 20; // max 10 grados
    const rotY = (x / rect.width) * 20;

    image.style.transform = `scale(1.05) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    image.style.transform = 'scale(1) rotateX(0) rotateY(0) translateZ(0)';
  });
}
