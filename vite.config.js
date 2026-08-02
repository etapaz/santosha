import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        contact: 'contact.html',
        formation: 'formation.html',
        formationProfesseurs: 'formation-professeurs.html',
        horaires: 'horaires.html',
        inscriptionFormation: 'inscription-formation.html',
        locationSalles: 'location-salles.html',
        pensee: 'pensee.html',
        pilates: 'pilates.html',
        professeurs: 'professeurs.html',
        retraites: 'retraites.html',
        seance: 'seance.html',
        tarifs: 'tarifs.html',
      },
    },
  },
});
