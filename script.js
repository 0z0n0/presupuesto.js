console.log("funciona");

function addRow() {
  var table = document.getElementById("productTable");
  var row = table.insertRow();
  var productCell = row.insertCell(0);
  var quantityCell = row.insertCell(1);
  var priceCell = row.insertCell(2);
  var totalCell = row.insertCell(3);

  productCell.innerHTML = '<input type="text" name="producto[]">';
  quantityCell.innerHTML =
    '<input type="number" name="cantidad[]" oninput="calculateTotal(this)">';
  priceCell.innerHTML =
    '<input type="number" name="precio[]" oninput="calculateTotal(this)">';
  totalCell.innerHTML = '<input type="number" name="total[]" readonly>';

  var inputs = row.querySelectorAll("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
      calculateTotal(this);
    });
  }
}

function calculateTotal(input) {
    var row = input.parentNode.parentNode;
    var quantity = parseFloat(row.querySelector('input[name="cantidad[]"]').value.replace(',', '.'));
    var price = parseFloat(row.querySelector('input[name="precio[]"]').value.replace(',', '.'));
    var total = row.querySelector('input[name="total[]"]');
    var totalPrice = quantity * price;
  
    if (!isNaN(totalPrice)) {
      total.value =totalPrice.toFixed(2);
    } else {
      total.value = "";
    }
  
    calculateGrandTotal();
  }
  
  

  function calculateGrandTotal() {
    var totalCells = document.querySelectorAll('input[name="total[]"]');
    var grandTotal = 0;
  
    for (var i = 0; i < totalCells.length; i++) {
      var value = parseFloat(totalCells[i].value);
  
      if (!isNaN(value)) {
        grandTotal += value;
      }
    }
  
    var totalElement = document.getElementById("total");
    totalElement.textContent = "$" + grandTotal.toFixed(2);
  }
   
    
function saveAsPDF() {
  // Seleccionar la tabla de productos y el elemento que muestra el total general
  var productTable = document.getElementById("presupuesto");
  var totalElement = document.querySelector(".total");

  // Crear un nuevo elemento div para contener la tabla y el total general
  var container = document.createElement("div");
  container.appendChild(productTable.cloneNode(true));
  /* container.appendChild(totalElement.cloneNode(true)); */

  // Generar PDF con html2pdf.js
  html2pdf()
    .from(container)
    .set({
      margin: [10, 10, 10, 10], // Margen para el PDF generado
      filename: "documento.pdf", // Nombre del archivo PDF
      html2canvas: {
        // Configuración de html2canvas para capturar la pantalla
        scale: 2, // Escala de captura
        logging: true, // Habilitar registro de console.log
        dpi: 300, // Resolución DPI
        letterRendering: true, // Mejora la calidad de las fuentes
        useCORS: true, // Habilitar CORS para capturar imágenes de otros dominios
      },
      jsPDF: {
        unit: "pt", // Unidad de medida del PDF (puntos)
        format: "a4", // Formato del PDF
      },
    })
    .toPdf()
    .output("datauristring") // Salida del PDF en formato de cadena de datos
    .then(function (pdfData) {
      // Abrir nueva ventana con el PDF generado
      var newWindow = window.open();
      newWindow.document.write(
        "<iframe src='" + pdfData + "' width='100%' height='100%'></iframe>"
      );
    });
}
