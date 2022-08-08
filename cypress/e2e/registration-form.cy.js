import {
  assertButtonIsDisabled,
  assertElementIsVisible,
} from "../utils/form-helper";

const clickContinueButton = () => {
  cy.getByTestId("continueButton").click();
};

const clickBackButton = () => {
  cy.getByTestId("backButton").click();
};

const fillStep1 = () => {
  cy.getByTestId("firstName").type("Aitor");
  cy.getByTestId("lastName").type("Ruiz");
  cy.getByTestId("birthdate").type("18/03/2000");
  cy.getByTestId("email").type("aitorruizagra.es@pitang.com");
  cy.getByTestId("password").type("testingcypress");
  cy.getByTestId("confirmPassword").type("testingcypress");
};

const fillAndGoToStep2 = () => {
  fillStep1();
  clickContinueButton();
  cy.getByTestId("country").type("Brasil");
  cy.getByTestId("state").type("Pernambuco");
  cy.getByTestId("city").type("Recife");
  cy.getByTestId("neighborhood").type("Casa Forte");
  cy.getByTestId("street").type("Rua Teste do Cypress");
  cy.getByTestId("streetNumber").type("111");
};

const fillAndGoToStep3 = () => {
  fillAndGoToStep2();
  clickContinueButton();
  cy.getByTestId("cardNumber").type("1111 1111 1111 1111");
  cy.getByTestId("cardExpirationDate").type("11/26");
  cy.getByTestId("cvvCode").type("111");
  cy.getByTestId("cardHolderName").type("Aitor Ruiz Agra");
};

const fillAndGoToStep4 = () => {
  fillAndGoToStep3();
  clickContinueButton();
};

describe("Registration Form", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/");
  });

  describe("Registration Data (Step 1)", () => {
    it("Should render step 1 form correctly", () => {
      cy.getByTestId("continueButton").contains("Continuar");
      cy.getByTestId("registrationDataForm").should("be.visible");
    });

    it("Should disable back button on step 1", () => {
      cy.getByTestId("backButton").should("have.attr", "disabled");
    });
  });

  describe("Personal Data (Step 2)", () => {
    it("Should render step 2 form correctly", () => {
      fillStep1();
      clickContinueButton();
      cy.getByTestId("continueButton").contains("Continuar");
      assertElementIsVisible("personalDataForm");
    });

    it("Should enable back button on step 2", () => {
      fillStep1();
      clickContinueButton();
      assertButtonIsDisabled("backButton");
    });

    it("Should be able to go backward", () => {
      fillAndGoToStep2();
      clickBackButton();
      assertElementIsVisible("registrationDataForm");
    });

    it("Should be able to go forward", () => {
      fillAndGoToStep2();
      clickContinueButton();
      assertElementIsVisible("paymentMethodForm");
    });
  });

  describe("Payment Method (Step 3)", () => {
    it("Should render step 3 form correctly", () => {
      fillAndGoToStep2();
      clickContinueButton();
      cy.getByTestId("continueButton").contains("Continuar");
      assertElementIsVisible("paymentMethodForm");
    });

    it("Should enable back button on step 3", () => {
      fillAndGoToStep3();
      clickContinueButton();
      assertButtonIsDisabled("backButton");
    });

    it("Should be able to go backward", () => {
      fillAndGoToStep3();
      assertButtonIsDisabled("backButton");
      clickBackButton();
      assertElementIsVisible("personalDataForm");
    });

    it("Should be able to go forward", () => {
      fillAndGoToStep3();
      clickContinueButton();
      assertElementIsVisible("reviewStep");
    });
  });

  describe("Review your data (Step 4)", () => {
    it("Should render step 4 form correctly", () => {
      fillAndGoToStep4();
      clickContinueButton();
      cy.getByTestId("continueButton").contains("Finalizar");
      assertElementIsVisible("successMessage");
    });

    it("Should disable back button on step 4", () => {
      fillAndGoToStep4();
      clickContinueButton();
      cy.getByTestId("backButton").should("have.attr", "disabled");
    });

    it("Should disable continue button on step 4", () => {
      fillAndGoToStep4();
      clickContinueButton();
      cy.getByTestId("continueButton").should("have.attr", "disabled");
    });
  });
});
