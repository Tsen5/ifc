# IFC (International Fixed Calendar) 📅

## Description
IFC est une application web qui implémente le calendrier fixe international, un calendrier lunisolaire se présentant comme une alternative au calendrier grégorien traditionnel. Ce calendrier se caractérise par : 
- 13 mois de 28 jours chacun
- Un jour épagomène "Jour de l'année" à la fin de l'année
- Un jour épagomène "Jour Bissextile" après le 28 juin lors des années bissextiles

L'application permet de :
- 🗓️ Visualiser et naviguer dans le calendrier fixe
- 🎯 Sélectionner des dates
- 📚 Consulter les événements historiques associés à chaque date (via l'API Wikipedia)

## Technologies principales 🛠️

### Frontend ⚛️
- **React 19**
- **TypeScript** - Typage statique
- **Emotion** - CSS-in-JS
- **Radix UI** - Composants UI

### État et Données 💾
- **TanStack Query** - Gestion des requêtes API + mise en cache
- **Zustand** - État global
- **i18next** - Internationalisation

### Routing 🔄
- **TanStack Router**
