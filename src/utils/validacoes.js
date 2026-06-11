export function validarRetirada(estoque, quantidade) {
  const valor = Number(quantidade);
  if (!Number.isInteger(valor) || valor <= 0) {
    return false;
  }
  return valor <= estoque;
}
