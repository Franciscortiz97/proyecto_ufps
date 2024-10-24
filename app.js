let bitacora = [];  // Lista para almacenar las fotos y comentarios

// Función para agregar una entrada (foto + comentario)
function addEntry() {
    const photoInput = document.getElementById('photo');
    const commentInput = document.getElementById('comment');

    if (photoInput.files.length === 0 || commentInput.value === '') {
        alert('Por favor, sube una foto y añade un comentario.');
        return;
    }

    const file = photoInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const photoData = event.target.result;
        const entry = {
            photo: photoData,
            comment: commentInput.value
        };

        bitacora.push(entry);
        displayEntries();
        photoInput.value = '';
        commentInput.value = '';
    };

    reader.readAsDataURL(file);
}

// Función para mostrar las entradas en la bitácora
function displayEntries() {
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';

    bitacora.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.innerHTML = `
            <div>
                <strong>Entrada ${index + 1}</strong><br>
                <img src="${entry.photo}" alt="Foto" width="200"><br>
                <p>${entry.comment}</p>
            </div>
            <hr>
        `;
        entriesDiv.appendChild(entryDiv);
    });
}

// Función para generar el PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;  // Importar jsPDF desde el objeto global
    const doc = new jsPDF();  // Crear un nuevo documento PDF

    doc.setFontSize(16);
    doc.text("Bitácora de Obra", 10, 10);

    bitacora.forEach((entry, index) => {
        doc.setFontSize(12);
        doc.text(`Comentario ${index + 1}: ${entry.comment}`, 10, 20 + (index * 50));
        doc.addImage(entry.photo, 'JPEG', 10, 30 + (index * 50), 50, 50);
    });

    doc.save('bitacora_obra.pdf');
}
