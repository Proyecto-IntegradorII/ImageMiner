describe("Image Miner Tests", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000/"); // Adjust this to the correct path of your component
	});

	it("verifica que la imagen imageminer-blue aparece en la página", () => {
		cy.get('img[src="/static/media/imageminer-blue.6c1616baa32da09b2a1d.png"]', {
			timeout: 10000,
		}).should("be.visible");
	});

	it("verifies that the instructions text exists", () => {
		cy.contains(
			"p",
			"Ingresa el número de imágenes y el término de búsqueda para crear y descargar un dataset"
		).should("be.visible");
	});

	it("verifies that the number input accepts numbers", () => {
		cy.get('input[type="number"]').clear().type("123").should("have.value", "123");
	});

	it("verifies that the number input does not accept letters", () => {
		cy.get('input[type="number"]').clear().type("abc").should("have.value", "");
	});

	it("verifies that the search term input allows text input", () => {
		cy.get('input[type="text"]').first().clear().type("test").should("have.value", "test");
	});

	it("verifies that the submit button is present", () => {
		cy.get(".w-10 > img").should("exist");
	});
});
