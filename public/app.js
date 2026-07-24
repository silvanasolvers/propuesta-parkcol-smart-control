const moduleButtons = document.querySelectorAll('[data-module]');
const detailTitle = document.querySelector('[data-detail-title]');
const detailBody = document.querySelector('[data-detail-body]');
const detailList = document.querySelector('[data-detail-list]');
const salesSteps = document.querySelectorAll('[data-sales-step]');
const salesKicker = document.querySelector('[data-scroll-kicker]');
const salesTitle = document.querySelector('[data-scroll-title]');
const salesBody = document.querySelector('[data-scroll-body]');
const salesProof = document.querySelector('[data-scroll-proof]');
const salesMetricOne = document.querySelector('[data-scroll-metric-one]');
const salesMetricTwo = document.querySelector('[data-scroll-metric-two]');
const salesMetricThree = document.querySelector('[data-scroll-metric-three]');
const salesProgress = document.querySelector('[data-scroll-progress]');
const salesKeyword = document.querySelector('[data-scroll-keyword]');
const salesIndex = document.querySelector('[data-scroll-index]');

const modules = {
  placas: {
    title: 'Ingreso y salida por placa',
    body: 'Lectura de placas con camaras compatibles, registro automatico de hora, tipo de vehiculo, estado de pago y autorizacion de salida. Cuando la lectura tenga baja confianza, el sistema pide confirmacion en vez de inventar datos.',
    points: ['Camara ingreso y camara salida', 'Validacion visitante, mensualidad, convenio o valet', 'Historial por placa y evidencia visual']
  },
  pagos: {
    title: 'Canal de pago digital',
    body: 'Flujo de QR o link para que el cliente consulte su placa, vea el valor y pague por el canal digital definido. El pago queda conciliado contra la salida y contra el cierre del turno.',
    points: ['QR por ticket o placa', 'PSE, tarjeta o billeteras segun pasarela aprobada', 'Estado pagado, pendiente, anulado o vencido']
  },
  caja: {
    title: 'Caja, cierres y contabilidad',
    body: 'Control diario de ingresos, egresos, recaudo por turno, efectivo versus digital, cierres, comprobantes y reportes exportables para administracion y contabilidad.',
    points: ['Turno 01, 02 y 03', 'Conciliacion de medios de pago', 'Egresos, notas, anulaciones y auditoria']
  },
  clientes: {
    title: 'Clientes fijos y mensualidades',
    body: 'Administracion de clientes recurrentes, convenios y mensualidades con reglas reales de Parkcol: dos placas registradas por cliente, pero solo una activa dentro del parqueadero al mismo tiempo.',
    points: ['Vencimientos y cartera', 'Consecutivo de pagos mensuales', 'Pico y placa, excepciones y permisos']
  }
};

const salesNarrative = [
  {
    kicker: 'Hoy',
    keyword: 'Visibilidad',
    title: 'Hoy la operacion funciona, pero obliga a revisar demasiado.',
    body: 'Cada pantalla separada crea una zona donde la administracion ve tarde lo que paso.',
    proof: 'De perseguir datos',
    metrics: ['Conciliable', 'Rastreable', 'Defendible']
  },
  {
    kicker: 'Dinero',
    keyword: 'Caja clara',
    title: 'Cada peso debe tener una historia verificable.',
    body: 'Placa, cajero, turno, medio de pago, anulacion y cierre quedan conectados para reducir zonas grises.',
    proof: 'De confianza ciega',
    metrics: ['Conciliada', 'Alertas', 'Auditable']
  },
  {
    kicker: 'Cliente',
    keyword: 'Sin fila',
    title: 'El pago deja de ser fila y se vuelve una accion rapida.',
    body: 'El cliente consulta, paga y sale con validacion automatica. Parkcol se siente moderno sin perder control.',
    proof: 'De pago manual',
    metrics: ['QR placa', 'Validado', 'Autorizada']
  },
  {
    kicker: 'Mensualidades',
    keyword: 'Cartera viva',
    title: 'Los clientes fijos dejan de depender de memoria y papeles.',
    body: 'Vencimientos, placas autorizadas, consecutivos y regla de una placa activa viven en la misma base.',
    proof: 'De listas sueltas',
    metrics: ['Vencidos', 'Placas', 'Convenios']
  },
  {
    kicker: 'Decision',
    keyword: 'Control total',
    title: 'La inversion compra tranquilidad operativa.',
    body: 'El dueño puede ver ingresos, egresos, ocupacion, pagos, cierres y alertas sin estar sentado en caja.',
    proof: 'De operar a ciegas',
    metrics: ['Movil', 'Unico', 'Menos fuga']
  }
];

function setModule(key) {
  const selected = modules[key];
  if (!selected) return;
  moduleButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.module === key);
  });
  detailTitle.textContent = selected.title;
  detailBody.textContent = selected.body;
  detailList.innerHTML = selected.points.map((point) => `<li>${point}</li>`).join('');
}

function setSalesStep(index) {
  const selected = salesNarrative[index];
  if (!selected) return;
  salesSteps.forEach((step) => {
    step.classList.toggle('active', Number(step.dataset.salesStep) === index);
  });
  salesKicker.textContent = selected.kicker;
  salesTitle.textContent = selected.title;
  salesBody.textContent = selected.body;
  salesProof.textContent = selected.proof;
  salesMetricOne.textContent = selected.metrics[0];
  salesMetricTwo.textContent = selected.metrics[1];
  salesMetricThree.textContent = selected.metrics[2];
  if (salesKeyword) {
    salesKeyword.textContent = selected.keyword;
  }
  if (salesIndex) {
    salesIndex.textContent = `${String(index + 1).padStart(2, '0')}/${String(salesNarrative.length).padStart(2, '0')}`;
  }
  if (salesProgress) {
    salesProgress.style.width = `${((index + 1) / salesNarrative.length) * 100}%`;
  }
}

moduleButtons.forEach((button) => {
  button.addEventListener('click', () => setModule(button.dataset.module));
});

if ('IntersectionObserver' in window && salesSteps.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setSalesStep(Number(entry.target.dataset.salesStep));
      }
    });
  }, { rootMargin: '-35% 0px -45% 0px', threshold: 0.1 });

  salesSteps.forEach((step) => observer.observe(step));
}

setModule('placas');
setSalesStep(0);
