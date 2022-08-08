export const assertButtonIsDisabled = (dataTestId) => {
  cy.getByTestId(dataTestId).should("not.have.attr", "disabled");
};

export const assertElementIsVisible = (dataTestId) => {
  cy.getByTestId(dataTestId).should("be.visible");
};
