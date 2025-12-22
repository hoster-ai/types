/**
 * list of all countries that are geographically in Europe
 * includes EU members, EEA, microstates, and other European countries
 */
export const GEOGRAPHIC_EUROPEAN_COUNTRIES = new Set([
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
    'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
    'SI', 'ES', 'SE',

    'AL', 'AD', 'BA', 'BY', 'FO', 'GI', 'GG', 'IS', 'IM', 'JE', 'XK', 'LI',
    'MD', 'MC', 'ME', 'MK', 'NO', 'RU', 'SM', 'RS', 'CH', 'UA', 'VA', 'UK', 'GB'
]);

/**
 * list of EU/EEA member countries 
 */
export const EU_EEA_COUNTRIES = new Set([
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
    'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
    'SI', 'ES', 'SE',
    'XI',
    // EEA, EU + Norway, Iceland, Liechtenstein
    // 'IS', 'LI', 'NO',
    // special cases
    //'CH' // Switzerland has bilateral agreements, it is special case
]);
