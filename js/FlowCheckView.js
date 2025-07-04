class FlowCheckView {
    constructor() {
        this.elements = {
            uploadArea: document.getElementById('upload-area'),
            fileInput: document.getElementById('file-input'),
            previewSection: document.getElementById('preview-section'),
            previewImage: document.getElementById('preview-image'),
            analyzeBtn: document.getElementById('analyze-btn'),
            resetBtn: document.getElementById('reset-btn'),
            loading: document.getElementById('loading'),
            resultsSection: document.getElementById('results-section'),
            scoreCard: document.getElementById('score-card'),
            scoreNumber: document.getElementById('score-number'),
            symbolsList: document.getElementById('symbols-list'),
            errorsList: document.getElementById('errors-list'),
            feedbackText: document.getElementById('feedback-text'),
            mainContent: document.querySelector('.main-content')
        };
    }

    showPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.elements.previewImage.src = e.target.result;
            this.elements.previewSection.style.display = 'block';
            this.hideResults();
        };
        reader.readAsDataURL(file);
    }

    showLoading() {
        this.elements.loading.style.display = 'block';
        this.elements.analyzeBtn.disabled = true;
    }

    hideLoading() {
        this.elements.loading.style.display = 'none';
        this.elements.analyzeBtn.disabled = false;
    }

    showResults() {
        this.elements.resultsSection.style.display = 'block';
    }

    hideResults() {
        this.elements.resultsSection.style.display = 'none';
    }

    displayAnalysisResults(data) {
        // Mostrar puntuación
        this.elements.scoreNumber.textContent = data.score || 0;
        
        // Actualizar color de la tarjeta de puntuación
        const score = data.score || 0;
        if (score >= 80) {
            this.elements.scoreCard.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
        } else if (score >= 60) {
            this.elements.scoreCard.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        } else {
            this.elements.scoreCard.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
        }

        // Mostrar símbolos
        this.elements.symbolsList.innerHTML = '';
        if (data.symbols && data.symbols.length > 0) {
            data.symbols.forEach(symbol => {
                const li = document.createElement('li');
                li.className = 'symbol-item';
                li.textContent = `${symbol.type} (Confianza: ${symbol.confidence}%)`;
                this.elements.symbolsList.appendChild(li);
            });
        } else {
            this.elements.symbolsList.innerHTML = '<li class="symbol-item">No se detectaron símbolos</li>';
        }

        // Mostrar errores
        this.elements.errorsList.innerHTML = '';
        if (data.errors && data.errors.length > 0) {
            data.errors.forEach(error => {
                const li = document.createElement('li');
                li.className = 'error-item';
                li.textContent = error;
                this.elements.errorsList.appendChild(li);
            });
        } else {
            this.elements.errorsList.innerHTML = '<li class="symbol-item">¡No se encontraron errores!</li>';
        }

        // Mostrar feedback
        this.elements.feedbackText.textContent = data.feedback || 'Sin comentarios adicionales.';

        // Mostrar sección de resultados
        this.showResults();
    }

    showError(message) {
        this.removeMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.elements.mainContent.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    showSuccess(message) {
        this.removeMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        this.elements.mainContent.appendChild(successDiv);
        setTimeout(() => successDiv.remove(), 3000);
    }

    removeMessages() {
        const messages = document.querySelectorAll('.error-message, .success-message');
        messages.forEach(msg => msg.remove());
    }

    addDragOverClass() {
        this.elements.uploadArea.classList.add('dragover');
    }

    removeDragOverClass() {
        this.elements.uploadArea.classList.remove('dragover');
    }

    reset() {
        this.elements.fileInput.value = '';
        this.elements.previewSection.style.display = 'none';
        this.hideResults();
        this.removeMessages();
    }

    // Métodos para obtener elementos del DOM
    getUploadArea() {
        return this.elements.uploadArea;
    }

    getFileInput() {
        return this.elements.fileInput;
    }

    getAnalyzeBtn() {
        return this.elements.analyzeBtn;
    }

    getResetBtn() {
        return this.elements.resetBtn;
    }
}