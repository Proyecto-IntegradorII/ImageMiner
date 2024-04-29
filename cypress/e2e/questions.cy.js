describe("Pruebas del componente Preguntas", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/questions"); // Reemplaza con la ruta correcta
	});

	it("Debería cambiar la respuesta al escribir en el campo de entrada", () => {
		const respuesta = "Mi respuesta";
		cy.get('input[type="text"]').first().type(respuesta).should("have.value", respuesta);
	});

	it("debería permitir escribir y cambiar a la siguiente pregunta", () => {
		// PRIMERA PREGUNTA
		cy.contains("¿Tiene alguna condición médica especial para consumir alimentos?").should(
			"be.visible"
		);

		//Escribir una respuesta
		cy.get(".mb-4 > .border").type("prueba1");

		// Clic en el botón de siguiente pregunta
		cy.get(":nth-child(2) > img").click();

		// SEGUNDA PREGUNTA
		cy.contains("¿Cuáles son sus objetivos alimenticios?").should("be.visible");

		//Escribir una respuesta
		cy.get(".mb-4 > .border").type("prueba2");

		// Clic en el botón de siguiente pregunta
		cy.get(":nth-child(2) > img").click();

		// TERCERA PREGUNTA
		cy.contains("¿Cómo describiría su estilo de vida?").should("be.visible");

		//Escribir una respuesta
		cy.get(".mb-4 > .border").type("prueba3");
	});
});
