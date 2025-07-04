class FlowCheckController {
    constructor() {
        this.model = new FlowCheckModel();
        this.view = new FlowCheckView();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const uploadArea = this.view.getUploadArea();
        const fileInput = this.view.getFileInput();
        const analyzeBtn = this.view.getAnalyzeBtn();
        const resetBtn = this.view.getResetBtn();

        // Drag and drop events
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        uploadArea.addEventListener('drop', this.handleDrop.bind(this));

        // File input change event
        fileInput.addEventListener('change', this.handleFileSelect.bind(this));

        // Button events
        analyzeBtn.addEventListener('click', this.handleAnalyze.bind(this));
        resetBtn.addEventListener('click', this.handleReset.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        this.view.addDragOverClass();
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.view.removeDragOverClass();
    }

    handleDrop(e) {
        e.preventDefault();
        this.view.removeDragOverClass();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        if (!this.model.isValidImageFile(file)) {
            this.view.showError('Por favor, selecciona un archivo de imagen válido (PNG, JPG, JPEG)');
            return;
        }

        this.model.setFile(file);
        this.view.showPreview(file);
    }

    async handleAnalyze() {
        if (!this.model.getFile()) {
            this.view.showError('Por favor, selecciona una imagen primero');
            return;
        }

        this.view.showLoading();

        try {
            const result = await this.model.analyzeImage();
            this.view.displayAnalysisResults(result);
            this.view.showSuccess('¡Análisis completado exitosamente!');
        } catch (error) {
            console.error('Error:', error);
            this.view.showError(`Error al analizar la imagen: ${error.message}`);
        } finally {
            this.view.hideLoading();
        }
    }

    handleReset() {
        this.model.reset();
        this.view.reset();
    }
}