/**
 * !TODO: La funcion te brinda la fecha en formato de mongobd usalo para cuando actualizes
 * @returns
 */
const updateDate = () => {
  const fecha_hora_actual = new Date();
  const fecha_hora_iso8601 = fecha_hora_actual.toISOString();

  return fecha_hora_iso8601;
};
