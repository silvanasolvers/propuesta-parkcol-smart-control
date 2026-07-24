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
    title: 'Dos sistemas, una sola caja por responder',
    body: 'Cuando placa, camara, pago, mensualidad y cierre viven separados, el equipo trabaja doble y la administracion ve tarde lo que paso.',
    proof: 'Palabra clave: visibilidad',
    metrics: ['Menos digitacion', 'Mas trazabilidad', 'Cierre mas confiable']
  },
  {
    kicker: 'Dinero',
    title: 'Cada cobro debe tener una historia verificable',
    body: 'El sistema amarra placa, cajero, turno, medio de pago, anulacion y cierre. Eso vuelve la caja auditable y reduce zonas grises.',
    proof: 'Palabra clave: control de recaudo',
    metrics: ['Caja conciliada', 'Alertas de diferencia', 'Comprobante diario']
  },
  {
    kicker: 'Cliente',
    title: 'El pago deja de ser una fila y se vuelve una accion rapida',
    body: 'Con QR o link, el cliente consulta su placa, paga y queda listo para salir. Parkcol se siente mas moderno sin perder control.',
    proof: 'Palabra clave: pago sin friccion',
    metrics: ['QR por placa', 'Pago validado', 'Salida autorizada']
  },
  {
    kicker: 'Mensualidades',
    title: 'Los clientes fijos dejan de depender de memoria y papeles',
    body: 'Vencimientos, placas autorizadas, consecutivos, cartera y regla de una placa activa quedan controlados desde la misma base.',
    proof: 'Palabra clave: cartera visible',
    metrics: ['Vencimientos claros', 'Placas controladas', 'Convenios ordenados']
  },
  {
    kicker: 'Decision',
    title: 'La propuesta compra tranquilidad operativa',
    body: 'El dueño puede ver ingresos, egresos, ocupacion, pagos, cierres y alertas sin estar sentado en caja ni persiguiendo reportes.',
    proof: 'Palabra clave: Parkcol bajo control',
    metrics: ['Vista movil', 'Operacion unica', 'Menos fuga silenciosa']
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
  if (salesProgress) {
    salesProgress.style.height = `${((index + 1) / salesNarrative.length) * 100}%`;
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
