export const findMatchingCartVariant = (variants, newVariables) =>
  variants.find((variant) => {
    let variabelsAreEqual = true;

    variant.variables.forEach((existingVariable) => {
      if (!variabelsAreEqual) return;
      const newVariable = newVariables.find(
        (variable) => variable.name === existingVariable.name
      );
      variabelsAreEqual = newVariable.value === existingVariable.value;
    });

    return variabelsAreEqual;
  });
