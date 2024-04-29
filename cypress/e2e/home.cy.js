describe("Prueba de texto de bienvenida", () => {
	it("Verifica la existencia del texto de bienvenida", () => {
		cy.visit("http://localhost:3000/"); // Cambia "/"" por la URL de tu aplicación si es diferente
		cy.contains("¡Bienvenido a NutriScan!").should("exist");
	});
});

describe("Verificación del botón 'Empezar'", () => {
	it("Verifica que el botón 'Empezar' existe", () => {
		// Visita la página que contiene el botón "Empezar"
		cy.visit("http://localhost:3000/");

		// Verifica que el botón "Empezar" existe en el DOM
		cy.get("button").contains("Empezar").should("exist");
	});
});

describe("Pruebas de navegación", () => {
	it('Debería navegar a /questions al hacer clic en el botón "Empezar"', () => {
		// Cargar la aplicación
		cy.visit("http://localhost:3000/");

		// Hacer clic en el botón "Empezar"
		cy.contains("Empezar").click();

		// Verificar que la URL cambie a /questions
		cy.url().should("include", "/questions");
	});
});
