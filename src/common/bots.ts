// Detección de crawlers — fuente única.
//
// Por qué existe: los bots eran el 80% de tracking_events (187k de 216k filas, 172 MB).
// El caso extremo: TODOS los crawleos de Google caían en UN mismo guest_id
// (g_e60lxa8, 173k eventos), porque el renderizador de Google hace Math.random()
// determinístico y el guest_id salía de ahí. Eso hacía que /admin/contactos tardara
// 7,5 s en listar 20 visitantes y se colgara.
//
// Ahora los eventos de bots NO se guardan crudos: se cuentan agregados por día en
// bot_traffic_daily (así no perdemos la señal de cuánto nos crawlean, que importa
// por el consumo de Vercel) y tracking_events queda solo con gente real.

// Ojo con el regex: el filtro viejo era /(bot|crawl|spider|...)/ y se le escapaban
// 84.588 filas de "GoogleOther" — no contiene "bot" por ningún lado.
const BOT_UA =
  /googlebot|googleother|google-extended|apis-google|mediapartners|adsbot|bingbot|bingpreview|msnbot|yandex|baiduspider|duckduckbot|slurp|sogou|exabot|applebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot|pinterest|redditbot|gptbot|chatgpt|oai-searchbot|claudebot|anthropic|perplexity|ccbot|bytespider|amazonbot|meta-externalagent|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|dataforseo|screaming frog|serpstat|blexbot|seekport|zoominfobot|crawler|crawling|spider|headless|lighthouse|pagespeed|phantomjs|puppeteer|playwright|python-requests|scrapy|curl\/|wget|go-http-client|node-fetch|axios\/|okhttp|java\/|libwww|httpunit|bot\/|bot$|[^a-z]bot[^a-z]/;

export function isBotUa(ua?: string | null): boolean {
  return BOT_UA.test((ua ?? '').toLowerCase());
}

// UA → nombre corto y estable del bot, para agrupar en bot_traffic_daily.
// El orden importa: 'googleother' antes que 'googlebot' porque el UA de GoogleOther
// también dice "Google", y los específicos de IA antes que los genéricos.
const NAMES: [RegExp, string][] = [
  [/googleother/, 'googleother'],
  [/google-extended/, 'google-extended'],
  [/googlebot/, 'googlebot'],
  [/adsbot|mediapartners|apis-google/, 'google-ads'],
  [/bingbot|bingpreview|msnbot/, 'bingbot'],
  [/gptbot/, 'gptbot'],
  [/oai-searchbot/, 'oai-searchbot'],
  [/chatgpt/, 'chatgpt-user'],
  [/claudebot|anthropic/, 'claudebot'],
  [/perplexity/, 'perplexitybot'],
  [/ccbot/, 'ccbot'],
  [/bytespider/, 'bytespider'],
  [/amazonbot/, 'amazonbot'],
  [/meta-externalagent|facebookexternalhit/, 'meta'],
  [/applebot/, 'applebot'],
  [/yandex/, 'yandexbot'],
  [/semrushbot|ahrefsbot|mj12bot|dotbot|dataforseo|blexbot|serpstat|screaming frog/, 'seo-tools'],
  [/petalbot/, 'petalbot'],
  [/headless|puppeteer|playwright|phantomjs|lighthouse|pagespeed/, 'headless'],
  [/python-requests|scrapy|curl\/|wget|go-http-client|node-fetch|axios\/|okhttp|java\/|libwww/, 'script'],
];

export function botName(ua?: string | null): string {
  const u = (ua ?? '').toLowerCase();
  if (!u) return 'sin-ua';
  for (const [re, name] of NAMES) if (re.test(u)) return name;
  return 'otro';
}
