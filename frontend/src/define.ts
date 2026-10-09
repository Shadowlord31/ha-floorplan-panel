/**
 * Registriert ein Custom Element nur, wenn der Name noch frei ist.
 *
 * Nach einem Update der Integration kann HA das neue Panel-Modul in eine Seite laden, in der
 * die alte Version schon läuft. `customElements.define` würde dann mit „name has already been
 * used“ abbrechen; so bleibt die alte Version bis zum Neuladen der Seite aktiv, ohne Fehler.
 */
export function defineElement(name: string) {
  return (ctor: CustomElementConstructor): void => {
    if (!customElements.get(name)) customElements.define(name, ctor);
  };
}
