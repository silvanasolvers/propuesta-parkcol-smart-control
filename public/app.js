const moduleButtons = document.querySelectorAll('[data-module]');
const detailTitle = document.querySelector('[data-detail-title]');
const detailBody = document.querySelector('[data-detail-body]');
const detailList = document.querySelector('[data-detail-list]');

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

moduleButtons.forEach((button) => {
  button.addEventListener('click', () => setModule(button.dataset.module));
});

setModule('placas');
