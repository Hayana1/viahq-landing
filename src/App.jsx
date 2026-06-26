import './App.css'
import { createElement, useState, useRef, useEffect, useLayoutEffect } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import {
  UsersThree, Eye, Flask, TrendUp, Stack,
  ChartBar, Globe, Monitor, TreeStructure, Database,
  ShieldCheck, Funnel, ShareNetwork, Star, DotsThree,
  CaretDown, Check, ArrowRight, Lock, ListChecks, Fingerprint,
} from '@phosphor-icons/react'
import { ROUTES } from './pages.jsx'

const FR_ROUTE_TO_ROUTE = {
  ventes: 'sales',
  marges: 'margin',
  inventaire: 'inventory',
  clients: 'customers',
  'securite/on-premise': 'security/on-prem',
  'securite/saas': 'security/saas',
  demo: 'contact',
  contact: 'contact',
}

const ROUTE_TO_FR_ROUTE = Object.fromEntries(
  Object.entries(FR_ROUTE_TO_ROUTE).map(([fr, route]) => [route, fr])
)

function localizePath(route = 'home', lang = 'en') {
  if (lang !== 'fr') return route === 'home' ? '#/' : `#/${route}`
  return route === 'home' ? '#/fr' : `#/fr/${ROUTE_TO_FR_ROUTE[route] || route}`
}

function localizeHref(href, lang) {
  if (lang !== 'fr' || !href?.startsWith('#/')) return href
  const route = href.slice(2).replace(/\/$/, '') || 'home'
  return localizePath(route, lang)
}

const frText = {
  'Air-gapped': 'Isolé du réseau',
  'ViteLink is now VIA.': 'ViteLink devient VIA.',
  Product: 'Produit',
  Security: 'Sécurité',
  Demo: 'Démo',
  Contact: 'Contact',
  'Book a Demo': 'Réserver une démo',
  'Book a demo': 'Réserver une démo',
  'Primary navigation': 'Navigation principale',
  'VIA home': 'Accueil VIA',
  'Open menu': 'Ouvrir le menu',
  'Close menu': 'Fermer le menu',
  'Analyses': 'Analyses',
  'Why VIA?': 'Pourquoi VIA ?',
  'Deployment models': 'Modes de déploiement',
  "Why it's safe": 'Pourquoi c’est sécurisé',
  'Inventory & Overstock': 'Inventaire et surstock',
  'Find the cash trapped in stock': 'Repérez le capital immobilisé en stock',
  'Margin Analysis': 'Analyse des marges',
  'Protect profit at SKU level': 'Protégez la marge au niveau SKU',
  'Sales Analysis': 'Analyse des ventes',
  'Spot demand before it shifts stock': 'Repérez la demande avant qu’elle ne déplace le stock',
  'Customer Performance': 'Performance clients',
  'See margin by account': 'Analysez la marge par compte',
  'Built for distributors': 'Conçu pour les distributeurs',
  'Made for industrial SMEs & distribution': 'Pensé pour les PME industrielles et la distribution',
  'From your existing data': 'À partir de vos données existantes',
  'No complex integration to start': 'Pas d’intégration complexe pour démarrer',
  'Answers in seconds': 'Des réponses en quelques secondes',
  'No data team, no BI project': 'Pas d’équipe data ni de projet BI',
  'Tailored to your rules': 'Adapté à vos règles',
  'Thresholds adapt to your business': 'Les seuils s’adaptent à votre métier',
  'Optimize stock. Maximize margins.': 'Optimisez le stock. Maximisez les marges.',
  'On-premise · Air-gapped': 'Sur site · isolé du réseau',
  'Installed at your site. No way out.': 'Installé chez vous. Aucune sortie.',
  'SaaS · Managed': 'SaaS · géré',
  'We host it, encrypted & access-controlled.': 'Nous l’hébergeons, chiffré et avec contrôle des accès.',
  'Air-gapped architecture': 'Architecture isolée',
  'No API, no outbound traffic': 'Aucune API, aucun trafic sortant',
  'What we verify': 'Ce que nous vérifions',
  'Confirmed in the source code': 'Confirmé dans le code source',
  'Verify it yourself': 'Vérifiez vous-même',
  'Audit, sandbox, pen-test': 'Audit, bac à sable, test d’intrusion',
  'Data ownership': 'Propriété des données',
  'Your data, your machines': 'Vos données, vos machines',
  'Security dossier': 'Dossier sécurité',
  'Get the full air-gap dossier for your IT team.': 'Recevez le dossier complet pour votre équipe IT.',
  'Request it': 'Le demander',
  'Reduce excess stock': 'Réduire le surstock',
  'Find cash trapped in inventory': 'Repérer le capital immobilisé',
  'Protect margins': 'Protéger les marges',
  'See where profit is leaking': 'Voir où la marge se dégrade',
  'Recover missed sales': 'Récupérer les ventes manquées',
  'Spot expected demand gaps': 'Repérer les écarts de demande',
  'Know customer value': 'Comprendre la valeur client',
  'Read revenue, mix and margin': 'Lire chiffre d’affaires, mix et marge',
  'Link related products': 'Relier les produits associés',
  'Find complements and substitutes': 'Trouver compléments et substituts',
  'Action center': 'Centre d’action',
  '$312k tied up in slow-moving stock. Act here first.': '312 k$ immobilisés dans du stock lent. Agissez ici en premier.',
  'Show dead-stock list': 'Afficher la liste du stock dormant',
  'Top references by capital at risk:': 'Références prioritaires par capital à risque :',
  'Filter by family, margin, months of stock…': 'Filtrer par famille, marge, mois de stock...',
  Filter: 'Filtrer',
  Export: 'Exporter',
  'Runs offline': 'Fonctionne hors ligne',
  Dashboard: 'Tableau de bord',
  'Stock health': 'Santé du stock',
  '962 SKUs · last 12 months · 13% dead stock': '962 SKU · 12 derniers mois · 13 % stock dormant',
  'All SKUs': 'Tous les SKU',
  'In stock': 'En stock',
  'Slow movers': 'Rotation lente',
  'Dead stock': 'Stock dormant',
  'Neg. margin': 'Marge nég.',
  'Sell-through by family': 'Écoulement par famille',
  'Margin trend': 'Tendance marge',
  'This year vs. last': 'Cette année vs précédente',
  'This year': 'Cette année',
  'Last year': 'Année précédente',
  'Capital at risk': 'Capital à risque',
  'By category': 'Par catégorie',
  'You own this copy': 'Cette copie vous appartient',
  'One-time licence': 'Licence unique',
  Deployment: 'Déploiement',
  'On your machines': 'Sur vos machines',
  '100% local': '100 % local',
  'Optimize your stock.': 'Optimisez votre stock.',
  'Maximize your margins.': 'Maximisez vos marges.',
  'VIA helps distributors measure the impact of price and stock decisions before money and space are lost.': 'VIA aide les distributeurs à mesurer l’impact des décisions de prix et de stock avant de perdre de l’argent et de l’espace.',
  'Built for distributors managing thousands of SKUs.': 'Conçu pour les distributeurs qui gèrent des milliers de SKU.',
  'See How VIA Works': 'Voir comment VIA fonctionne',
  'Works from your existing data. Runs entirely on your infrastructure.': 'Fonctionne avec vos données existantes. Tourne entièrement sur votre infrastructure.',
  'Auto parts': 'Pièces auto',
  HVAC: 'CVC',
  'Industrial supply': 'Fournitures industrielles',
  Wholesale: 'Distribution B2B',
  'Spare parts': 'Pièces de rechange',
  'Building materials': 'Matériaux de construction',
  'Multi-site networks': 'Réseaux multi-sites',
  'Built for distribution and industrial SMEs': 'Conçu pour la distribution et les PME industrielles',
  'Dead Stock': 'Stock dormant',
  'Find cash trapped in slow-moving SKUs and decide what to push, freeze or liquidate.': 'Repérez le capital immobilisé dans les SKU lents et décidez quoi pousser, bloquer ou liquider.',
  'See dead-stock scoring': 'Voir le scoring stock dormant',
  'Replenishment Opportunities': 'Opportunités de réapprovisionnement',
  'Know what to order, when to order, and what should wait.': 'Sachez quoi commander, quand commander et ce qui peut attendre.',
  'See replenishment alerts': 'Voir les alertes de réapprovisionnement',
  'Margin Erosion': 'Érosion des marges',
  'Find where profit is leaking and which price moves protect margin.': 'Trouvez où la marge fuit et quelles actions prix la protègent.',
  'See margin analysis': 'Voir l’analyse des marges',
  'Year-over-Year Sales': 'Ventes année sur année',
  'Spot demand shifts before they hurt stock and margin.': 'Repérez les changements de demande avant qu’ils n’affectent stock et marge.',
  'See sales comparison': 'Voir la comparaison des ventes',
  'Client Performance': 'Performance client',
  'See which customers protect margin and which ones drain it.': 'Voyez quels clients protègent la marge et lesquels la dégradent.',
  'See client analysis': 'Voir l’analyse clients',
  'Substitutes & Cross-Analysis': 'Substituts et analyses croisées',
  'See how product links affect stock, pricing and basket margin.': 'Voyez comment les liens produits affectent le stock, les prix et la marge panier.',
  'See the full picture': 'Voir la vue complète',
  'How it works': 'Comment ça marche',
  'Less excess stock.': 'Moins de surstock.',
  'More margin.': 'Plus de marge.',
  'VIA shows which stock and pricing decisions protect space, cash and margin.': 'VIA montre quelles décisions de stock et de prix protègent l’espace, la trésorerie et la marge.',
  'Explore the analyses': 'Explorer les analyses',
  'Why distributors choose VIA': 'Pourquoi les distributeurs choisissent VIA',
  'Measure the full impact before changing stock or prices.': 'Mesurez l’impact complet avant de changer le stock ou les prix.',
  'Margin & sales by family': 'Marge et ventes par famille',
  'This year compared to the previous one': 'Cette année comparée à la précédente',
  Family: 'Famille',
  'Revenue ($)': 'CA ($)',
  YoY: 'A/A',
  'Margin %': 'Marge %',
  'Margin Δ': 'Variation marge',
  Compressors: 'Compresseurs',
  'Air filters': 'Filtres à air',
  Refrigerant: 'Réfrigérant',
  'Fan motors': 'Moteurs ventilateurs',
  Thermostats: 'Thermostats',
  Valves: 'Vannes',
  Ducting: 'Conduits',
  Overall: 'Total',
  'Made for large catalogs, complex prices and thousands of SKU decisions.': 'Pensé pour les grands catalogues, les prix complexes et des milliers de décisions SKU.',
  'Yours, outright': 'À vous, entièrement',
  'Install it on your machines and keep control of your data.': 'Installez-le sur vos machines et gardez le contrôle de vos données.',
  'Runs fully offline': 'Fonctionne entièrement hors ligne',
  'No API, no network calls, no telemetry.': 'Aucune API, aucun appel réseau, aucune télémétrie.',
  'Built around your rules': 'Construit autour de vos règles',
  'Thresholds and analyses fit your catalog and pricing logic.': 'Les seuils et analyses s’adaptent à votre catalogue et à votre logique tarifaire.',
  'Sealed shut by design.': 'Verrouillé par conception.',
  'Air-gapped by default.': 'Isolé du réseau par défaut.',
  'No API. No outbound calls. No data leaving your network.': 'Aucune API. Aucun appel sortant. Aucune donnée ne quitte votre réseau.',
  'Read the security dossier': 'Lire le dossier sécurité',
  'No way out': 'Aucune sortie',
  'No API, no outbound network calls, no telemetry. The software simply has no channel to send your data anywhere.': 'Aucune API, aucun appel réseau sortant, aucune télémétrie. Le logiciel n’a tout simplement aucun canal pour envoyer vos données.',
  'You own it': 'Vous le possédez',
  'Bought once, installed on your machines, fully yours. No cloud, no remote access — not even from us.': 'Acheté une fois, installé sur vos machines, entièrement à vous. Pas de cloud, pas d’accès distant, même pas de notre part.',
  'Verified in the code': 'Vérifié dans le code',
  'Zero API keys, all file reads local, no analytics libraries. Confirmed line by line — and auditable by your own IT.': 'Zéro clé API, lectures de fichiers locales, aucune librairie analytics. Confirmé ligne par ligne et auditable par votre IT.',
  'Your perimeter': 'Votre périmètre',
  'VIA fits inside your existing security perimeter without widening it. Nothing new is exposed to the network.': 'VIA reste dans votre périmètre de sécurité existant sans l’élargir. Rien de nouveau n’est exposé au réseau.',
  'VIA helps AutoDistribution France track stock, customer growth and margin from business data.': 'VIA aide AutoDistribution France à suivre le stock, la croissance client et la marge à partir des données métier.',
  'Auto parts distribution': 'Distribution de pièces auto',
  Stock: 'Stock',
  'at risk': 'à risque',
  Margin: 'Marge',
  'by SKU': 'par SKU',
  'data leaving the network': 'donnée ne quitte le réseau',
  'Talk to us': 'Nous contacter',
  'Support, the way an': 'Un support adapté à un',
  'offline product needs it': 'produit hors ligne',
  'Offline software needs direct support. Here is how it works.': 'Un logiciel hors ligne demande un support direct. Voici comment cela fonctionne.',
  'A year of hyper-care': 'Un an d’hyper-care',
  'Fixes and adjustments included after go-live.': 'Corrections et ajustements inclus après la mise en production.',
  'See how support works': 'Voir le support',
  'You report, we fix': 'Vous signalez, nous corrigeons',
  'No telemetry. You call us, we patch it.': 'Pas de télémétrie. Vous nous contactez, nous corrigeons.',
  'Tailored to your rules': 'Adapté à vos règles',
  'Thresholds and scoring match your business.': 'Les seuils et le scoring correspondent à votre métier.',
  'See deployment options': 'Voir les options de déploiement',
  'Find hidden losses.': 'Trouvez les pertes cachées.',
  'Act faster.': 'Agissez plus vite.',
  'See the security model': 'Voir le modèle sécurité',
  'Book a VIA demo': 'Réserver une démo VIA',
  'Hi there!': 'Bonjour !',
  'Want to see VIA on your own data?': 'Vous voulez voir VIA sur vos propres données ?',
  Thanks: 'Merci !',
  "We'll be in touch shortly to set up your demo.": 'Nous vous recontacterons rapidement pour organiser votre démo.',
  'Your name': 'Votre nom',
  'Work email': 'Email professionnel',
  Sending: 'Envoi',
  'Sending…': 'Envoi...',
  'Oops — try again or email contact@viahq.ai': 'Oups, réessayez ou écrivez à contact@viahq.ai',
  'Book a demo': 'Réserver une démo',
  'Back to overview': 'Retour à la vue d’ensemble',
  '‹ Back to overview': '‹ Retour à la vue d’ensemble',
  'Product · Sales Analysis': 'Produit · Analyse des ventes',
  'See what sold —': 'Voyez ce qui s’est vendu —',
  'and what should have sold': 'et ce qui aurait dû se vendre',
  'Find missing sales, declining categories and hidden demand gaps.': 'Identifiez les ventes manquées, les catégories en baisse et les écarts de demande cachés.',
  'Revenue YoY': 'CA année sur année',
  Live: 'Live',
  'What it does': 'Ce que ça fait',
  'Sales explained clearly': 'Les ventes expliquées clairement',
  'VIA compares actual performance with expected demand.': 'VIA compare la performance réelle à la demande attendue.',
  'Year over year': 'Année sur année',
  'Volume and revenue, side by side': 'Volume et chiffre d’affaires, côte à côte',
  'Compare every SKU and family in units and revenue.': 'Comparez chaque SKU et famille en unités et en chiffre d’affaires.',
  'Risers and fallers': 'Hausses et baisses',
  'Missing-sales signals': 'Signaux de ventes manquées',
  'Monthly trends': 'Tendances mensuelles',
  'Top families by revenue': 'Top familles par chiffre d’affaires',
  'Filtered view · 962 SKUs': 'Vue filtrée · 962 SKU',
  Sortable: 'Triable',
  'Strategic view': 'Vue stratégique',
  'The four-quadrant map of your catalog': 'La matrice à quatre quadrants de votre catalogue',
  'See which SKUs to push, protect, reprice or retire.': 'Voyez quels SKU pousser, protéger, repricer ou retirer.',
  'Volume × Margin': 'Volume × marge',
  'Each dot is a reference': 'Chaque point est une référence',
  '4 quadrants': '4 quadrants',
  Volume: 'Volume',
  'Early warning': 'Alerte précoce',
  'Spot declines before they become dead stock': 'Repérez les baisses avant qu’elles ne deviennent du stock dormant',
  'Catch weak demand before it becomes overstock.': 'Détectez la demande faible avant qu’elle ne devienne du surstock.',
  Sparkline: 'Tendance',
  'Monthly revenue': 'CA mensuel',
  'The gain': 'Le gain',
  'Find the missed sale.': 'Trouvez la vente manquée.',
  'See where expected demand did not happen, and what it may cost.': 'Voyez où la demande attendue n’a pas eu lieu et ce que cela peut coûter.',
  'Expected vs actual': 'Attendu vs réel',
  'find hidden gaps': 'trouver les écarts cachés',
  'ranked fast': 'classés rapidement',
  'Action first': 'Action d’abord',
  'push, protect, reprice or retire': 'pousser, protéger, repricer ou retirer',
  'Everything, your way': 'Tout, à votre façon',
  'Tuned to your business, in real time': 'Adapté à votre métier, en temps réel',
  "Every threshold, filter and export reflects exactly what's on your screen — and recalculates the instant you move a slider.": 'Chaque seuil, filtre et export reflète exactement ce qui est à l’écran et se recalcule dès que vous bougez un curseur.',
  'Tunable thresholds': 'Seuils ajustables',
  'Set what counts as overstock, urgent or eroding. Every KPI and table updates live.': 'Définissez ce qui compte comme surstock, urgent ou en érosion. Chaque KPI et tableau se met à jour en direct.',
  'Cascading filters': 'Filtres en cascade',
  'Drill Category → Family → Brand, with live counts at every level.': 'Descendez Catégorie → Famille → Marque, avec les volumes en direct à chaque niveau.',
  Category: 'Catégorie',
  Brand: 'Marque',
  'One-click Excel export': 'Export Excel en un clic',
  'Export the exact filtered view — thresholds, filters and all — back to .xlsx.': 'Exportez la vue filtrée exacte, seuils et filtres inclus, vers .xlsx.',
  'Export current view': 'Exporter la vue actuelle',
  'Product · Margin Analysis': 'Produit · Analyse des marges',
  'Protect margin': 'Protégez la marge',
  'with the full picture': 'avec la vue complète',
  'Find margin leaks and price decisions that improve total profit.': 'Identifiez les fuites de marge et les décisions prix qui améliorent le profit total.',
  'Margin at risk this year': 'Marge à risque cette année',
  'Know where profit is leaking': 'Sachez où le profit fuit',
  'VIA shows the margin drift and its financial impact.': 'VIA montre la dérive de marge et son impact financier.',
  'SKU level': 'Niveau SKU',
  'Margin drift, reference by reference': 'Dérive de marge, référence par référence',
  'Rank every SKU by margin change and financial impact.': 'Classez chaque SKU par variation de marge et impact financier.',
  'Euro impact': 'Impact financier',
  'Risk buckets': 'Niveaux de risque',
  'Product and family drilldown': 'Drilldown produit et famille',
  'Biggest margin movers': 'Plus fortes variations de marge',
  'Worst first': 'Les pires en premier',
  Diagnosis: 'Diagnostic',
  'Gradual, sudden, or seasonal?': 'Progressif, soudain ou saisonnier ?',
  'See if the issue is gradual, sudden or seasonal.': 'Voyez si le problème est progressif, soudain ou saisonnier.',
  'Monthly margin %': 'Marge mensuelle %',
  'Product · Inventory': 'Produit · Inventaire',
  'Reduce excess stock': 'Réduire le surstock',
  'without cutting blindly': 'sans couper à l’aveugle',
  'Find slow-moving stock, capital at risk and the inventory actions that free space safely.': 'Identifiez le stock lent, le capital à risque et les actions inventaire qui libèrent de l’espace.',
  'Product · Customer Performance': 'Produit · Performance client',
  'Know which customers': 'Sachez quels clients',
  'protect your margin': 'protègent votre marge',
  'Understand revenue, mix and margin by customer before changing price or stock.': 'Comprenez le CA, le mix et la marge par client avant de changer prix ou stock.',
  'Security · On-premise': 'Sécurité · Sur site',
  'Installed on your machines.': 'Installé sur vos machines.',
  'No data leaves.': 'Aucune donnée ne sort.',
  'VIA can run fully inside your perimeter: no API, no outbound calls, no telemetry and no remote access.': 'VIA peut fonctionner entièrement dans votre périmètre : aucune API, aucun appel sortant, aucune télémétrie et aucun accès distant.',
  'Security · SaaS option': 'Sécurité · Option SaaS',
  'VIA, hosted for you.': 'VIA, hébergé pour vous.',
  'Secure by default.': 'Sécurisé par défaut.',
  'Prefer zero maintenance? VIA can run as a managed service — the same seven analyses, with hosting, updates and security handled for you.': 'Vous préférez zéro maintenance ? VIA peut fonctionner en service géré : les mêmes sept analyses, avec hébergement, mises à jour et sécurité pris en charge.',
  Pricing: 'Tarifs',
  'Pricing depends': 'Le tarif dépend',
  'on your setup.': 'de votre configuration.',
  'Tell us what you need through the form. We will come back with the right model and a clear quote.': 'Expliquez vos besoins via le formulaire. Nous reviendrons avec le bon modèle et une proposition claire.',
  'Contact us': 'Contactez-nous',
  'quote based on your setup': 'proposition basée sur votre contexte',
  'Book a demo': 'Réserver une démo',
  'See VIA on': 'Voyez VIA sur',
  'your own data': 'vos propres données',
  'Tell us about your stock, margins and priorities. We will prepare the right demo and quote.': 'Parlez-nous de votre stock, de vos marges et de vos priorités. Nous préparerons la bonne démo et la bonne proposition.',
  'A demo focused on your stock and margins': 'Une démo centrée sur votre stock et vos marges',
  "On-premise or SaaS — we'll advise": 'Sur site ou SaaS : nous vous conseillerons',
  'A clear quote after the form': 'Une proposition claire après le formulaire',
  Name: 'Nom',
  Company: 'Entreprise',
  Role: 'Rôle',
  'Interested in': 'Solution recherchée',
  'Choose a model…': 'Choisissez un modèle...',
  'On-premise (air-gapped)': 'Sur site (isolé du réseau)',
  'SaaS (managed)': 'SaaS (géré)',
  'Not sure yet': 'Pas encore sûr',
  'Anything we should know?': 'Quelque chose à savoir ?',
  'Request a demo': 'Demander une démo',
  'Something went wrong — please email contact@viahq.ai instead.': 'Une erreur est survenue. Écrivez plutôt à contact@viahq.ai.',
  'Or email us directly at': 'Ou écrivez-nous directement à',
  'Thanks — message sent.': 'Merci, message envoyé.',
  'Send another': 'Envoyer un autre message',
}

function translateText(value, lang) {
  if (lang !== 'fr' || !value) return value
  const direct = frText[value]
  if (direct) return direct
  const trimmed = value.trim()
  if (!trimmed || !frText[trimmed]) return value
  const leading = value.match(/^\s*/)?.[0] || ''
  const trailing = value.match(/\s*$/)?.[0] || ''
  return `${leading}${frText[trimmed]}${trailing}`
}

function useFrenchDomTranslation(lang, route) {
  useLayoutEffect(() => {
    if (lang !== 'fr') return
    const root = document.getElementById('root')
    if (!root) return

    const applyAll = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      const nodes = []
      while (walker.nextNode()) nodes.push(walker.currentNode)
      nodes.forEach((node) => {
        node.nodeValue = translateText(node.nodeValue, lang)
      })

      root.querySelectorAll('[placeholder], [aria-label], [title]').forEach((el) => {
        for (const attr of ['placeholder', 'aria-label', 'title']) {
          if (el.hasAttribute(attr)) el.setAttribute(attr, translateText(el.getAttribute(attr), lang))
        }
      })

      root.querySelectorAll('a[href^="#/"]').forEach((a) => {
        a.setAttribute('href', localizeHref(a.getAttribute('href'), lang))
      })
    }

    applyAll()
    const observer = new MutationObserver(applyAll)
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [lang, route])
}

/* ─── Hash router ─── */
function useRoute() {
  const parse = () => {
    const m = (window.location.hash || '').match(/^#\/(.+)$/)
    const raw = m ? m[1].replace(/\/$/, '') : 'home'
    if (raw === 'fr') return { lang: 'fr', route: 'home' }
    if (raw.startsWith('fr/')) {
      const frRoute = raw.slice(3) || 'home'
      return { lang: 'fr', route: FR_ROUTE_TO_ROUTE[frRoute] || frRoute }
    }
    return { lang: 'en', route: raw }
  }
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const on = () => {
      setRoute(parse())
      // Only jump to top for real page routes (#/…); leave in-page anchors (#how) to the browser.
      if ((window.location.hash || '').startsWith('#/')) window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}

/* ─── Data ─── */
const navItems = [
  { label: 'Product',  href: '#/sales',             menu: 'product'  },
  { label: 'Security', href: '#/security/on-prem',  menu: 'security' },
  { label: 'Demo',     href: '#/contact' },
]

const productTiles = [
  { Icon: Stack,      label: 'Reduce excess stock',      sub: 'Find cash trapped in inventory', color: '#ef4444', bg: 'rgba(239,68,68,0.10)'   },
  { Icon: TrendUp,    label: 'Protect margins',          sub: 'See where profit is leaking', color: '#f59e0b', bg: 'rgba(245,158,11,0.10)'  },
  { Icon: Eye,        label: 'Recover missed sales',     sub: 'Spot expected demand gaps', color: '#3b82f6', bg: 'rgba(59,130,246,0.10)'  },
  { Icon: UsersThree, label: 'Know customer value',      sub: 'Read revenue, mix and margin', color: '#10b981', bg: 'rgba(16,185,129,0.10)'  },
  { Icon: Flask,      label: 'Link related products',    sub: 'Find complements and substitutes', color: '#8b5cf6', bg: 'rgba(139,92,246,0.10)'  },
]

const logos = [
  'Auto parts', 'HVAC', 'Industrial supply', 'Wholesale',
  'Spare parts', 'Building materials', 'Multi-site networks',
]

const capabilities = [
  [ChartBar,      '#ff7e67', 'Dead Stock',
   'Find cash trapped in slow-moving SKUs and decide what to push, freeze or liquidate.',
   'See dead-stock scoring', '#/inventory'],
  [Globe,         '#5ab4ff', 'Replenishment Opportunities',
   'Know what to order, when to order, and what should wait.',
   'See replenishment alerts', '#/inventory'],
  [Monitor,       '#4ecab8', 'Margin Erosion',
   'Find where profit is leaking and which price moves protect margin.',
   'See margin analysis', '#/margin'],
  [Flask,         '#c4a8ff', 'Year-over-Year Sales',
   'Spot demand shifts before they hurt stock and margin.',
   'See sales comparison', '#/sales'],
  [TreeStructure, '#f5c842', 'Client Performance',
   'See which customers protect margin and which ones drain it.',
   'See client analysis', '#/customers'],
  [Database,      '#ff85c2', 'Substitutes & Cross-Analysis',
   'See how product links affect stock, pricing and basket margin.',
   'See the full picture', '#/sales'],
]

const aiTools = ['◎', '✳', '◆', '✦', 'N']

const reasons = [
  ['Built for distributors',
   'Made for large catalogs, complex prices and thousands of SKU decisions.'],
  ['Yours, outright',
   'Install it on your machines and keep control of your data.'],
  ['Runs fully offline',
   'No API, no network calls, no telemetry.'],
  ['Built around your rules',
   'Thresholds and analyses fit your catalog and pricing logic.'],
]

const securityItems = [
  ['No way out',           'No API, no outbound network calls, no telemetry. The software simply has no channel to send your data anywhere.'],
  ['You own it',           'Bought once, installed on your machines, fully yours. No cloud, no remote access — not even from us.'],
  ['Verified in the code', 'Zero API keys, all file reads local, no analytics libraries. Confirmed line by line — and auditable by your own IT.'],
  ['Your perimeter',       'VIA fits inside your existing security perimeter without widening it. Nothing new is exposed to the network.'],
]

const supportCards = [
  ['A year of hyper-care',   'Fixes and adjustments included after go-live.', 'See how support works',  'purple'],
  ['You report, we fix',     'No telemetry. You call us, we patch it.', 'Talk to us',             'blue'],
  ['Tailored to your rules', 'Thresholds and scoring match your business.', 'See deployment options', 'coral'],
]

/* ─── Product mega-menu data ─── */
const platformAnalytics = [
  { Icon: Stack,      color: '#7856ff', bg: 'rgba(120,86,255,.12)',  title: 'Inventory & Overstock', sub: 'Find the cash trapped in stock',        href: '#/inventory' },
  { Icon: ChartBar,   color: '#ff7e67', bg: 'rgba(255,126,103,.12)', title: 'Margin Analysis',       sub: 'Protect profit at SKU level',           href: '#/margin' },
  { Icon: TrendUp,    color: '#3b82f6', bg: 'rgba(59,130,246,.12)',  title: 'Sales Analysis',        sub: 'Spot demand before it shifts stock',   href: '#/sales' },
  { Icon: UsersThree, color: '#10b981', bg: 'rgba(16,185,129,.12)',  title: 'Customer Performance',  sub: 'See margin by account',                href: '#/customers' },
]

const platformReasons = [
  { Icon: Globe,    color: '#f59e0b', bg: 'rgba(245,158,11,.12)', title: 'Built for distributors', sub: 'Made for industrial SMEs & distribution', href: '#/sales' },
  { Icon: Database, color: '#3b82f6', bg: 'rgba(59,130,246,.12)', title: 'From your existing data', sub: 'No complex integration to start',         href: '#/inventory' },
  { Icon: Eye,      color: '#ff7557', bg: 'rgba(255,117,87,.12)', title: 'Answers in seconds',     sub: 'No data team, no BI project',             href: '#/margin' },
  { Icon: Monitor,  color: '#4ecab8', bg: 'rgba(78,202,184,.12)', title: 'Tailored to your rules', sub: 'Thresholds adapt to your business',       href: '#/customers' },
]

/* ─── Security mega-menu data ─── */
const securityModels = [
  { Icon: Lock,        color: '#7856ff', bg: 'rgba(120,86,255,.12)', title: 'On-premise · Air-gapped', sub: 'Installed at your site. No way out.',        href: '#/security/on-prem' },
  { Icon: Globe,       color: '#3b82f6', bg: 'rgba(59,130,246,.12)', title: 'SaaS · Managed',          sub: 'We host it, encrypted & access-controlled.', href: '#/security/saas' },
]

const securityAssurance = [
  { Icon: ShieldCheck, color: '#7856ff', bg: 'rgba(120,86,255,.12)', title: 'Air-gapped architecture', sub: 'No API, no outbound traffic', href: '#/security/on-prem' },
  { Icon: ListChecks,  color: '#10b981', bg: 'rgba(16,185,129,.12)', title: 'What we verify',          sub: 'Confirmed in the source code', href: '#/security/on-prem' },
  { Icon: Fingerprint, color: '#ff7557', bg: 'rgba(255,117,87,.12)', title: 'Verify it yourself',      sub: 'Audit, sandbox, pen-test',     href: '#/security/on-prem' },
  { Icon: Database,    color: '#3b82f6', bg: 'rgba(59,130,246,.12)', title: 'Data ownership',          sub: 'Your data, your machines',     href: '#/security/on-prem' },
]

const platformCardPills = [
  { Icon: TrendUp,    color: '#ff7e67', label: 'Sales' },
  { Icon: ChartBar,   color: '#10b981', label: 'Margins' },
  { Icon: Stack,      color: '#3b82f6', label: 'Inventory' },
  { Icon: UsersThree, color: '#8b5cf6', label: 'Customers' },
]

/* ─── Mega-menu column helper ─── */
function MegaColumn({ label, items }) {
  return (
    <div className="pmm-col">
      <span className="pmm-col-label">{label}</span>
      {items.map(({ Icon, color, bg, title, sub, href }) => (
        <a href={href} key={title} className="pmm-item">
          <span className="pmm-icon" style={{ color, background: bg }}>
            {createElement(Icon, { size: 18, weight: 'duotone' })}
          </span>
          <span className="pmm-item-body">
            <span className="pmm-item-title">{title}</span>
            {sub && <span className="pmm-item-sub">{sub}</span>}
          </span>
        </a>
      ))}
    </div>
  )
}

/* ─── Product mega-menu ─── */
function ProductMegaMenu({ onMouseEnter, onMouseLeave }) {
  return (
    <div className="platform-mega-menu" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <MegaColumn label="Analyses" items={platformAnalytics} />
      <div className="pmm-divider" />
      <MegaColumn label="Why VIA?" items={platformReasons} />
      <a href="#/sales" className="pmm-card">
        <div className="pmm-card-visual">
          <img src="/plateform-nav-image.png" alt="" />
        </div>
        <div className="pmm-card-body">
          <span className="pmm-card-title">VIA Intelligence</span>
          <p className="pmm-card-desc">Optimize stock. Maximize margins.</p>
          <div className="pmm-card-pills">
            {platformCardPills.map(({ Icon, color, label }) => (
              <span key={label} className="pmm-card-pill">
                {createElement(Icon, { size: 13, weight: 'duotone', color })}
                {label}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  )
}

/* ─── Security mega-menu ─── */
function SecurityMegaMenu({ onMouseEnter, onMouseLeave }) {
  return (
    <div className="platform-mega-menu" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <MegaColumn label="Deployment models" items={securityModels} />
      <div className="pmm-divider" />
      <MegaColumn label="Why it's safe" items={securityAssurance} />
      <a href="#/contact" className="pmm-card pmm-card-sec">
        <div className="pmm-card-icon"><ShieldCheck size={30} weight="fill" /></div>
        <div className="pmm-card-body">
          <span className="pmm-card-title">Security dossier</span>
          <p className="pmm-card-desc">Get the full air-gap dossier for your IT team.</p>
          <span className="pmm-card-link">Request it <ArrowRight size={13} /></span>
        </div>
      </a>
    </div>
  )
}

/* ─── Animation presets ─── */
const ease = [0.21, 0.47, 0.32, 0.98]
const vp   = { once: true, margin: '-60px' }
const Motion = motion

const fadeUp  = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   vp,
  transition: { duration: 0.55, ease, delay },
})

const fadeIn  = (delay = 0) => ({
  initial:    { opacity: 0 },
  whileInView:{ opacity: 1 },
  viewport:   vp,
  transition: { duration: 0.5, ease: 'easeOut', delay },
})

const slideLeft = (delay = 0) => ({
  initial:    { opacity: 0, x: -32 },
  whileInView:{ opacity: 1, x: 0 },
  viewport:   vp,
  transition: { duration: 0.6, ease, delay },
})

const slideRight = (delay = 0) => ({
  initial:    { opacity: 0, x: 32 },
  whileInView:{ opacity: 1, x: 0 },
  viewport:   vp,
  transition: { duration: 0.6, ease, delay },
})

/* Scroll-driven pull — tied to live scroll position, not a one-shot trigger */
function ScrollPull({ as: Tag = 'div', children, fromScale = 0.84, className, style, ...rest }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  const scale   = useTransform(scrollYProgress, [0, 1], [fromScale, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1])
  const y       = useTransform(scrollYProgress, [0, 1], [28, 0])
  const MotionTag = motion[Tag] || motion.div
  return (
    <MotionTag ref={ref} style={{ scale, opacity, y, ...style }} className={className} {...rest}>
      {children}
    </MotionTag>
  )
}

/* On-load (no scroll trigger) */
const heroLoad = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
})

/* ─── Announcement Bar ─── */
function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <span className="ann-badge">Air-gapped</span>
      <span className="ann-text">ViteLink is now VIA.</span>
    </div>
  )
}

/* ─── Header ─── */
function Header({ route, lang }) {
  const [openMenu,   setOpenMenu]   = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef(null)

  const open  = (menu) => { clearTimeout(closeTimer.current); setOpenMenu(menu) }
  const close = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 150) }

  const isActive = (menu) => {
    if (menu === 'product')  return ['sales', 'margin', 'inventory', 'customers'].includes(route)
    if (menu === 'security') return route.startsWith('security/')
    return route === 'contact'
  }

  return (
    <header className="site-header" onMouseLeave={close}>
      <a className="brand" href={localizePath('home', lang)} aria-label="VIA home" onClick={() => setMobileOpen(false)}>
        <img className="brand-logo" src="/VIA-4.png" alt="VIA" />
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map(({ label, href, menu }) => (
          <a
            href={localizeHref(href, lang)} key={label}
            className={isActive(menu || label.toLowerCase()) ? 'active' : ''}
            onMouseEnter={() => (menu ? open(menu) : close())}
          >
            {label}
            {menu && (
              <CaretDown size={12} weight="bold" className={`chevron${openMenu === menu ? ' open' : ''}`} />
            )}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="lang-toggle" href={lang === 'fr' ? localizePath(route, 'en') : localizePath(route, 'fr')}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </a>
        <a className="pill subtle" href={localizePath('contact', lang)}>Contact <ArrowRight size={13} /></a>
        <a className="pill dark" href={localizePath('contact', lang)}>Book a Demo <ArrowRight size={13} /></a>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span className={`ham-icon${mobileOpen ? ' is-open' : ''}`}>
            <span /><span /><span />
          </span>
        </button>
      </div>
      {mobileOpen && (
        <div className="mobile-nav-panel">
          {navItems.map(({ label, href }) => (
            <a key={label} href={localizeHref(href, lang)} className="mnav-link" onClick={() => setMobileOpen(false)}>
              {label}
            </a>
          ))}
          <div className="mnav-ctas">
            <a className="pill dark" href={localizePath('contact', lang)} onClick={() => setMobileOpen(false)}>
              Book a Demo <ArrowRight size={14} />
            </a>
            <a className="pill subtle" href={lang === 'fr' ? localizePath(route, 'en') : localizePath(route, 'fr')} onClick={() => setMobileOpen(false)}>
              {lang === 'fr' ? 'English' : 'Français'}
            </a>
            <a className="pill subtle" href={localizePath('security/on-prem', lang)} onClick={() => setMobileOpen(false)}>
              Security
            </a>
          </div>
        </div>
      )}
      {openMenu === 'product'  && <ProductMegaMenu  onMouseEnter={() => open('product')}  onMouseLeave={close} />}
      {openMenu === 'security' && <SecurityMegaMenu onMouseEnter={() => open('security')} onMouseLeave={close} />}
    </header>
  )
}

/* ─── Hero Visual (Dashboard) ─── */
const funnelSteps = [
  { label: 'All SKUs',    val: '962', pct: 100 },
  { label: 'In stock',   val: '811', pct: 84  },
  { label: 'Slow movers',val: '433', pct: 45  },
  { label: 'Dead stock', val: '211', pct: 22  },
  { label: 'Neg. margin',val: '41',  pct: 12  },
]

const cohortData = [
  { label: 'Compr.',  vals: [100, 74, 61, 48, 42, 38] },
  { label: 'Filters', vals: [100, 70, 56, 44, 37, 32] },
  { label: 'Belts',   vals: [100, 77, 63, 51, 44, 39] },
  { label: 'Valves',  vals: [100, 66, 52, 40, 33]     },
  { label: 'Motors',  vals: [100, 71, 58, 45]          },
]

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="VIA ERP analysis dashboard preview">
      <div className="agent-window">
        <div className="agent-head">
          <span className="agent-brand">
            <img src="/VIA-4-Officiel.png" alt="VIA" />
            Action center
          </span>
          <span className="agent-controls"><span /><span /></span>
        </div>
        <p className="agent-msg">
          $312k tied up in slow-moving stock. Act here first.
        </p>
        <div className="agent-cta-row">
          <button className="agent-cta-btn">Show dead-stock list</button>
        </div>
        <p className="agent-result-label">Top references by capital at risk:</p>
        <ul className="agent-results">
          {['Compressor CX-200 · $48k','Filter kit FK-12 · $31k','Drive belt B-440 · $27k','Coolant R-32 · $22k','Fan motor FM-9 · $19k'].map(r => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <div className="agent-footer">
          <span className="agent-input-mock">Filter by family, margin, months of stock…</span>
          <span className="agent-hint">↵</span>
        </div>
      </div>

      <div className="dashboard-window">
        <div className="dash-toolbar">
          <span className="toolbar-item"><Funnel size={13} weight="fill" /> Filter</span>
          <span className="toolbar-item"><ShareNetwork size={13} /> Export</span>
          <span className="toolbar-item"><Star size={13} /></span>
          <span className="toolbar-item"><DotsThree size={15} weight="bold" /></span>
          <span className="toolbar-ai-pill">● Runs offline</span>
        </div>
        <div className="dash-content">
          <div className="dash-tabs">
            {['Dashboard','Analyses','Export'].map((t, i) => (
              <button key={t} className={`dash-tab${i === 0 ? ' active' : ''}`}>{t}</button>
            ))}
          </div>
          <div className="dash-grid">
            <div className="chart-card funnel-card">
              <div className="card-header">
                <span className="card-dot coral" />
                <div>
                  <strong>Stock health</strong>
                  <small>962 SKUs · last 12 months · 13% dead stock</small>
                </div>
              </div>
              <div className="funnel-v">
                {funnelSteps.map(({ label, val, pct }, i) => (
                  <div key={label} className="fv-col">
                    <div className="fv-bar-area">
                      <span className="fv-count">{val}</span>
                      <div className="fv-bar" style={{ '--pct': `${pct}%` }} />
                    </div>
                    <span className="fv-label">{label}</span>
                    {i > 0 && <span className="fv-conv">{pct}%</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card retention-card">
              <strong>Sell-through by family</strong>
              <div className="ret-heatmap">
                <div className="ret-hm-header">
                  <span className="ret-side-lbl" />
                  {['Jul','Aug','Sep','Oct','Nov','Dec'].map(w => (
                    <span key={w} className="ret-hm-th">{w}</span>
                  ))}
                </div>
                {cohortData.map(({ label, vals }) => (
                  <div key={label} className="ret-hm-row">
                    <span className="ret-side-lbl">{label}</span>
                    {vals.map((v, i) => (
                      <span key={i} className="ret-hm-cell" style={{ '--v': v / 100, '--vi': (100 - v) / 100 }}>
                        {v}%
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card area-card">
              <div className="area-header">
                <div>
                  <strong>Margin trend</strong>
                  <small>This year vs. last</small>
                </div>
                <div className="area-legend">
                  <span className="legend-dot purple" /><span>This year</span>
                  <span className="legend-dot coral"  /><span>Last year</span>
                </div>
              </div>
              <div className="area-chart">
                <svg viewBox="0 0 300 72" preserveAspectRatio="none" className="area-svg">
                  <defs>
                    <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff7557" stopOpacity="0.55"/>
                      <stop offset="100%" stopColor="#ff7557" stopOpacity="0.04"/>
                    </linearGradient>
                    <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7856ff" stopOpacity="0.50"/>
                      <stop offset="100%" stopColor="#7856ff" stopOpacity="0.04"/>
                    </linearGradient>
                  </defs>
                  <path d="M0 60 C25 54 50 44 75 48 C100 52 125 30 150 34 C175 38 200 18 225 24 C250 30 275 16 300 12 L300 72 L0 72 Z" fill="url(#ag1)"/>
                  <path d="M0 60 C25 54 50 44 75 48 C100 52 125 30 150 34 C175 38 200 18 225 24 C250 30 275 16 300 12" fill="none" stroke="#ff7557" strokeWidth="1.5"/>
                  <path d="M0 68 C25 62 50 56 75 58 C100 60 125 44 150 48 C175 52 200 38 225 42 C250 46 275 34 300 30 L300 72 L0 72 Z" fill="url(#ag2)"/>
                  <path d="M0 68 C25 62 50 56 75 58 C100 60 125 44 150 48 C175 52 200 38 225 42 C250 46 275 34 300 30" fill="none" stroke="#7856ff" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>

            <div className="chart-card small-card">
              <strong>Capital at risk</strong>
              <small>By category</small>
              <div className="small-bars">
                {[
                  { h: 75, c: '#7856ff' }, { h: 55, c: '#a080ff' },
                  { h: 90, c: '#7856ff' }, { h: 45, c: '#c4b0ff' },
                  { h: 85, c: '#7856ff' }, { h: 60, c: '#a080ff' },
                  { h: 70, c: '#7856ff' },
                ].map((bar, i) => (
                  <div key={i} className="small-bar" style={{ '--h': `${bar.h}%`, '--c': bar.c }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="float-panel">
        <div className="float-grid-bg">
          <div className="checkout-modal">
            <strong>You own this copy</strong>
            <span className="checkout-tag">One-time licence</span>
            <div className="checkout-field">Deployment</div>
            <div className="checkout-field">On your machines</div>
            <button className="checkout-btn">Air-gapped ✓</button>
          </div>
        </div>
        <div className="ai-summary-pill">● 100% local</div>
      </div>
    </div>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero-shell" id="top">

      {/* Floating gradient bars — animate y independently from the rest */}
      <Motion.div
        className="hero-bars"
        animate={{ y: [0, -55, -20, 0], x: [0, 12, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', times: [0, 0.44, 0.72, 1] }}
        aria-hidden="true"
      />

      <div className="hero-copy">
        <Motion.h1
          className="hero-title-reveal"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.10 } },
          }}
        >
          {['Optimize your stock.', 'Maximize your margins.'].map((line, i) => (
            <Motion.span
              className="hero-title-line"
              key={line}
              custom={i}
              variants={{
                hidden: (index) => ({
                  x: index === 0 ? -44 : 44,
                  opacity: 0,
                  scale: 0.98,
                }),
                show: () => ({
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.58, ease },
                }),
              }}
            >
              {line}
            </Motion.span>
          ))}
        </Motion.h1>
        <Motion.p {...heroLoad(0.18)}>
          VIA helps distributors measure the impact of price and stock decisions before money and space are lost.
        </Motion.p>
        <Motion.p className="hero-audience" {...heroLoad(0.24)}>
          Built for distributors managing thousands of SKUs.
        </Motion.p>
      </div>

      <Motion.div className="tile-row" role="list" {...heroLoad(0.32)}>
        {productTiles.map(({ Icon, label, sub, color, bg }) => (
          <button className="product-tile" role="listitem" key={label}>
            <div className="tile-icon-wrap" style={{ background: bg, color }}>
              {createElement(Icon, { size: 16, weight: 'duotone' })}
            </div>
            <div className="tile-body">
              <span className="tile-label">{label}</span>
              <span className="tile-sub">{sub}</span>
            </div>
            <span className="tile-arrow" aria-hidden="true">
              <ArrowRight size={13} />
            </span>
          </button>
        ))}
      </Motion.div>

      <Motion.div className="hero-actions" {...heroLoad(0.46)}>
        <a className="pill dark large" href="#/contact">Book a Demo <ArrowRight size={15} /></a>
        <a className="pill subtle large" href="#how">See How VIA Works <ArrowRight size={15} /></a>
      </Motion.div>
      <Motion.p className="hero-trust" {...heroLoad(0.52)}>
        Works from your existing data. Runs entirely on your infrastructure.
      </Motion.p>

      <Motion.div {...heroLoad(0.58)}>
        <HeroVisual />
      </Motion.div>
    </section>
  )
}

/* ─── Capabilities ─── */
function CapabilitySection() {
  return (
    <section className="capability-band" id="platform">
      <div className="logo-strip" aria-label="Built for distribution and industrial SMEs">
        {logos.map((logo, i) => (
          <Motion.span className="logo-item" key={logo} {...fadeIn(i * 0.06)}>
            {logo}
          </Motion.span>
        ))}
      </div>
      <div className="capability-grid">
        {capabilities.map(([Icon, color, title, text, cta, href]) => (
          <ScrollPull as="article" className="capability-card" key={title} fromScale={0.82}>
            <div className="cap-card-title">
              <span className="cap-icon" style={{ color, background: `${color}22` }}>
                {createElement(Icon, { size: 17, weight: 'duotone' })}
              </span>
              <h3>{title}</h3>
            </div>
            <p>{text}</p>
            <a href={href}>{cta} <ArrowRight size={13} /></a>
          </ScrollPull>
        ))}
      </div>
    </section>
  )
}

/* ─── How it works ─── */
function HowSection() {
  const iconCenters = [60,152,244,336,428].map(x => [x+39, 39])
  const hubCenter   = [430, 295]

  return (
    <section className="ai-card" id="how">
      <ScrollPull className="ai-copy">
        <span className="ai-badge">How it works</span>
        <h2>Less excess stock.<br />More margin.</h2>
        <Motion.p {...fadeUp(0.15)}>
          VIA shows which stock and pricing decisions protect space, cash and margin.
        </Motion.p>
        <Motion.a className="pill light" href="#platform" {...fadeUp(0.25)}>
          Explore the analyses <ArrowRight size={13} />
        </Motion.a>
      </ScrollPull>

      <ScrollPull className="ai-visual" aria-hidden="true">
        <svg className="ai-lines-svg" viewBox="0 0 560 360" preserveAspectRatio="xMidYMid meet">
          <defs>
            {iconCenters.map(([x,y],i) => (
              <linearGradient key={i} id={`lg${i}`} x1={x} y1={y} x2={hubCenter[0]} y2={hubCenter[1]} gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="rgba(255,255,255,0.40)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
              </linearGradient>
            ))}
          </defs>
          {iconCenters.map(([x,y],i) => (
            <line key={i} x1={x} y1={y} x2={hubCenter[0]} y2={hubCenter[1]}
              stroke={`url(#lg${i})`} strokeWidth="1.4" strokeDasharray="6 5"
              className={`ai-line ai-line-${i}`} />
          ))}
          {iconCenters.map(([x,y],i) => (
            <circle key={`dot-${i}`} cx={x} cy={y} r="3"
              fill="rgba(255,255,255,0.55)" className={`ai-dot ai-dot-${i}`} />
          ))}
        </svg>
        <div className="ai-tools-row">
          {aiTools.map((tool, i) => (
            <Motion.div className="ai-tool-icon" key={tool}
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.06 }}
            >
              {tool}
            </Motion.div>
          ))}
        </div>
        <div className="ai-hub">
          <div className="ai-hub-inner">
            <img src="/VIA-4-Officiel.png" alt="VIA" />
          </div>
        </div>
      </ScrollPull>
    </section>
  )
}

/* ─── Why Section ─── */
function WhySection() {
  return (
    <section className="why-section">
      <div className="why-header">
        <Motion.h2 {...fadeUp(0)}>Why distributors choose VIA</Motion.h2>
        <Motion.div className="why-header-right" {...fadeUp(0.1)}>
          <p>Measure the full impact before changing stock or prices.</p>
          <a className="pill dark" href="#/contact">Book a Demo <ArrowRight size={13} /></a>
        </Motion.div>
      </div>

      <div className="why-panel">
        <ScrollPull className="table-card" fromScale={0.91}>
          <div className="table-head">
            <div className="table-head-top">
              <span className="table-icon"><TrendUp size={14} weight="fill" color="#7856ff" /></span>
              <strong>Margin &amp; sales by family</strong>
            </div>
            <small>This year compared to the previous one</small>
          </div>
          <table>
            <thead>
              <tr>
                <th>Family</th><th>Revenue ($)</th><th>YoY</th>
                <th>Margin %</th><th>Margin Δ</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Compressors', '1,245k','+8%', '31%','-2%'],
                ['Air filters', '980k',  '+12%','27%','+1%'],
                ['Refrigerant', '870k',  '-4%', '22%','-5%'],
                ['Fan motors',  '760k',  '+6%', '34%','+2%'],
                ['Thermostats', '690k',  '-9%', '19%','-3%'],
                ['Valves',      '610k',  '+3%', '29%','-1%'],
                ['Ducting',     '540k',  '+15%','24%','+4%'],
                ['Overall',     '6,420k','+5%', '27%','-1%'],
              ].map(([fam,rev,yoy,margin,mDelta]) => (
                <tr key={fam}>
                  <td>{fam}</td><td>{rev}</td>
                  <td><span className={yoy.startsWith('+') ? 'badge good':'badge bad'}>{yoy}</span></td>
                  <td>{margin}</td>
                  <td><span className={mDelta.startsWith('-') ? 'badge bad':'badge good'}>{mDelta}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollPull>

        <div className="reason-list">
          {reasons.map(([title,text],i) => (
            <ScrollPull as="article"
              className={`reason-item${i===2?' active':''}`} key={title}
            >
              <span className="reason-check"><Check size={14} weight="bold" /></span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </ScrollPull>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Security + Partner ─── */
function SecurityPartnerBlock() {
  return (
    <section className="ec-block" id="security">
      <div className="ec-enterprise">
        <div className="ec-enterprise-glow" aria-hidden="true" />
        <ScrollPull className="enterprise-copy" fromScale={0.92}>
          <h2>Sealed shut by design.<br />Air-gapped by default.</h2>
          <p>No API. No outbound calls. No data leaving your network.</p>
          <a className="pill light" href="#/security/on-prem">Read the security dossier <ArrowRight size={13} /></a>
        </ScrollPull>
        <div className="enterprise-grid">
          {securityItems.map(([title, text]) => (
            <ScrollPull as="article" key={title} className="enterprise-item">
              <span className="ent-check"><ShieldCheck size={16} weight="fill" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </ScrollPull>
          ))}
        </div>
      </div>

      <div className="ec-case">
        <div className="ec-case-glow" aria-hidden="true" />
        <ScrollPull className="case-logo-col">
          <div className="case-logo-card">
            <img src="/logo-autodistribution.png" alt="AutoDistribution" />
          </div>
        </ScrollPull>
        <ScrollPull className="case-copy">
          <blockquote>
            VIA helps AutoDistribution France track stock, customer growth and margin from business data.
          </blockquote>
          <p className="case-author"><strong>AutoDistribution France</strong> · Auto parts distribution</p>
          <div className="case-stats">
            {[['Stock','at risk'],['Margin','by SKU'],['0','data leaving the network']].map(([n, label], i) => (
              <Motion.div
                className="case-stat" key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.45, ease, delay: 0.2 + i * 0.08 }}
              >
                <strong>{n}</strong>
                <span>{label}</span>
              </Motion.div>
            ))}
          </div>
          <a className="pill light" href="#/contact">Talk to us <ArrowRight size={13} /></a>
        </ScrollPull>
      </div>
    </section>
  )
}

/* ─── Support ─── */
function SupportSection() {
  return (
    <section className="support-section">
      <Motion.div className="section-head" {...fadeUp(0)}>
        <h2>Support, the way an<br />offline product needs it</h2>
        <p>Offline software needs direct support. Here is how it works.</p>
      </Motion.div>
      <div className="support-grid">
        {supportCards.map(([title,text,cta,color]) => (
          <ScrollPull as="article"
            className="support-card" key={title}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className={`support-visual color-${color}`} aria-hidden="true">
              <div className="support-visual-inner" />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#/contact">{cta} <ArrowRight size={13} /></a>
          </ScrollPull>
        ))}
      </div>
    </section>
  )
}

/* ─── Footer CTA + Mega Footer ─── */
function FooterCta() {
  return (
    <section className="footer-cta-section" id="demo">
      <div className="footer-cta-copy">
        <Motion.h2
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          Find hidden losses.<br />Act faster.
        </Motion.h2>
        <Motion.div className="footer-cta-actions" {...fadeUp(0.18)}>
          <a className="pill dark large" href="#/contact">Book a Demo <ArrowRight size={15} /></a>
          <a className="pill subtle large" href="#/security/on-prem">See the security model <ArrowRight size={15} /></a>
        </Motion.div>
      </div>
      <footer className="mega-footer">
        <Motion.div
          className="footer-wordmark"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, ease }}
          aria-label="VIA Technology"
        >
          VIA Technology
        </Motion.div>
      </footer>
    </section>
  )
}

/* ─── Contact Bubble ─── */
function AssistantBubble() {
  return (
    <a className="assistant-bubble" href="#/contact" aria-label="Book a VIA demo">
      <span className="assistant-avatar">
        <img src="/VIA-4-Officiel.png" alt="" aria-hidden="true" />
      </span>
      Book a demo
    </a>
  )
}

/* ─── Auto demo pop-up — expands from the "Book a demo" bubble (bottom-right) ─── */
function DemoPopup({ route, onOpen, onClose }) {
  const [visible, setVisible] = useState(false)
  const [status, setStatus]   = useState('idle')
  const shown = useRef(false)

  function show() { setVisible(true); onOpen?.() }
  function hide() { setVisible(false); onClose?.() }

  useEffect(() => {
    let timer
    const trigger = () => {
      if (shown.current) return
      shown.current = true
      show()
      cleanup()
    }
    function cleanup() { clearTimeout(timer) }
    timer = setTimeout(trigger, 5000)
    return cleanup
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    try {
      const res = await fetch('https://formspree.io/f/mwvwnalv', {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('ok'); form.reset() } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  if (!visible || route === 'contact') return null

  return (
    <Motion.div
      className="demo-popup" role="dialog" aria-label="Book a demo"
      initial={{ scale: 0.5, opacity: 0, y: 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{ transformOrigin: 'bottom right' }}
    >
      <button className="demo-popup-close" onClick={hide} aria-label="Close">×</button>
      {status === 'ok' ? (
        <div className="demo-popup-done">
          <span className="dp-wave" role="img" aria-label="thanks">🙌</span>
          <strong>Thanks!</strong>
          <p>We'll be in touch shortly to set up your demo.</p>
        </div>
      ) : (
        <>
          <div className="demo-popup-head">
            <span className="dp-wave" role="img" aria-label="hello">👋</span>
            <div>
              <strong>Hi there!</strong>
              <p>Want to see VIA on your own data?</p>
            </div>
          </div>
          <form className="demo-popup-form" onSubmit={handleSubmit}>
            <input name="name" required placeholder="Your name" />
            <input type="email" name="email" required placeholder="Work email" />
            <input type="hidden" name="source" defaultValue="auto demo popup" />
            <button className="pill dark" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : <>Book a demo <ArrowRight size={14} /></>}
            </button>
            {status === 'error' && <span className="dp-err">Oops — try again or email contact@viahq.ai</span>}
          </form>
        </>
      )}
    </Motion.div>
  )
}

/* ─── Home page ─── */
function HomePage() {
  return (
    <main>
      <Hero />
      <CapabilitySection />
      <HowSection />
      <WhySection />
      <SecurityPartnerBlock />
      <SupportSection />
      <FooterCta />
    </main>
  )
}

/* ─── App ─── */
function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.32, ease: 'easeOut' } }}
      aria-label="Loading VIA"
    >
      <motion.img
        src="/VIA-4-Officiel.png"
        alt="VIA"
        className="loading-logo"
        initial={{ opacity: 0, scale: 0.86, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.42, ease }}
      />
    </motion.div>
  )
}

export default function App() {
  const { route, lang } = useRoute()
  const [popupOpen, setPopupOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const Page = route === 'home' ? null : ROUTES[route]

  useFrenchDomTranslation(lang, route)

  useEffect(() => {
    if (route !== 'pricing') return
    window.location.replace(localizePath('contact', lang))
  }, [route, lang])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      <div className="top-chrome">
        <AnnouncementBar />
        <Header route={route} lang={lang} />
      </div>
      {Page ? (
        <main key={`${lang}-${route}`}>
          <Page />
          <FooterCta />
        </main>
      ) : (
        <HomePage key={lang} />
      )}
      {!popupOpen && <AssistantBubble />}
      <DemoPopup route={route} onOpen={() => setPopupOpen(true)} onClose={() => setPopupOpen(false)} />
    </>
  )
}
