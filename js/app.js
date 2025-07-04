// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear una instancia del controlador que manejará toda la aplicación
    const flowCheckApp = new FlowCheckController();
    
    // Opcional: Exponer la instancia globalmente para debugging
    window.flowCheckApp = flowCheckApp;
    
    console.log('FlowCheck App initialized successfully');
});