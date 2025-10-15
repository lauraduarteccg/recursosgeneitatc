// Utilidad para normalizar nombres y mapear claves del JSON
export function normalizeCompanyName(name) {
  // Quita espacios, mayúsculas, acentos y caracteres especiales
  return name
    .toUpperCase()
    .replace(/\s|\(|\)|\.|-|_/g, '')
    .replace(/[ÁÀÄÂ]/g, 'A')
    .replace(/[ÉÈËÊ]/g, 'E')
    .replace(/[ÍÌÏÎ]/g, 'I')
    .replace(/[ÓÒÖÔ]/g, 'O')
    .replace(/[ÚÙÜÛ]/g, 'U')
    .replace(/FRIO/g, '_FRIO') // para casos como "Seur Frio" => "SEUR_FRIO"
    .replace(/MONDIALRELAY/g, 'INPOST_MONDIAL_RELAY') // para "Mondial Relay"
    .replace(/ONTIMEPALETERIA/g, 'ONTIME_PALETERIA')
    .replace(/PALLETWAYS|PALLEX|NACEX|GLS|DHL|UPS|CTT|CEX|CORREOS|ENVIALIA|SEUR|FEDEX|TDN|XPO|TRANSAHER|DBSCHENKER|SAAT|SKYNET|ENLAZA/g, m => m);
}
