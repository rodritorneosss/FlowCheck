class FlowCheckModel {
    constructor() {
        this.apiUrl = 'https://flowcheck-backend.onrender.com'; // Cambia esto por tu URL del backend
        this.selectedFile = null;
        this.analysisResult = null;
    }

    setFile(file) {
        this.selectedFile = file;
    }

    getFile() {
        return this.selectedFile;
    }

    isValidImageFile(file) {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        return validTypes.includes(file.type);
    }

    async analyzeImage() {
        if (!this.selectedFile) {
            throw new Error('No se ha seleccionado ningún archivo');
        }

        const formData = new FormData();
        formData.append('file', this.selectedFile);

        const response = await fetch(`${this.apiUrl}/predict`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const result = await response.json();
        this.analysisResult = result;
        return result;
    }

    getAnalysisResult() {
        return this.analysisResult;
    }

    reset() {
        this.selectedFile = null;
        this.analysisResult = null;
    }
}