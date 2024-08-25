**Overview**
social post (Mini Réseau Social) est une application full-stack construite avec Angular pour le front-end et Node.js avec Express.js pour le back-end. 
L'application permet aux utilisateurs de créer, aimer et commenter des publications, avec des fonctionnalités pour gérer l'authentification des utilisateurs et manipuler les données des publications.

**Technologies Utilisées**

**Frontend**
Angular : Framework pour la construction du front-end.
Tailwind CSS : Framework CSS utilitaire pour le style.
RxJS : Bibliothèque pour la programmation réactive utilisant les Observables.

**Backend**
Node.js : Environnement d'exécution JavaScript pour la programmation côté serveur.
Express.js : Framework d'application web pour Node.js.
MongoDB : Base de données NoSQL pour stocker les publications et les données des utilisateurs.
JWT : JSON Web Tokens pour l'authentification des utilisateurs.

**API Endpoints**

**Authentification**
POST /auth/signup : Enregistrer un nouvel utilisateur.
POST /auth/login : Connecter un utilisateur existant.

**Publications**
GET /post/getAllPost : Récupérer toutes les publications.
POST /post/createPost : Créer une nouvelle publication.
DELETE /post/deletePost/:id : Supprimer une publication.
PUT /post/updatePost/:id : Mettre à jour une publication.
POST /post/toggleLike/
: Aimer ou ne plus aimer une publication.

**Commentaires**
POST /post/comment/:id
: Ajouter un commentaire.
PUT /post/comment/:id
: Mettre à jour un commentaire.
DELETE /post/comment/:id
: Supprimer un commentaire.


