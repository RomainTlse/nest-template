# Utiliser l'image officielle Node.js
FROM node:latest

# Créer un répertoire pour l'application
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste des fichiers de l'application
COPY . .

# Compiler l'application TypeScript
RUN npm run build

# Exposer le port utilisé par l'application
EXPOSE 3000

# Démarrer l'application en mode production
CMD ["npm", "run", "start:prod"]
