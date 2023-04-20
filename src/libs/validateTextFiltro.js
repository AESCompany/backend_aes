/**
 * !TODO: funcion para limpiar cualquier tipo de etiquetas html
 * @param {*} textFilter
 * @returns
 */

const clearText = (textFilter) => {
  return textFilter.replace(/<[^>]+>/g, "");
};

module.exports = { clearText };
