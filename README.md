# Projet 6 : Construisez une API sécurisée pour une application d'avis gastronomiques
Parcours Developpeur Web par OpenClassrooms

## Compétences évaluées
  <ul>Implémenter un modèle logique de données conformément à la règlementation</ul>
  <ul>Mettre en oeuvre des opérations CRUS de manière sécurisée</ul>
  <ul>Stocker des données de manière sécurisée</ul>
 
## Scénario
<p>Vous avez passé la dernière année en tant que développeur back-end indépendant et vous avez travaillé sur plusieurs projets de tailles et de difficultés variées.<br />
La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide pour un nouveau projet. Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones » . C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes » .</p>
<p>Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.<br />

Le délai est raisonnable, vous décidez donc d'accepter le projet. Après avoir rencontré Paula, la cheffe de produit de Piiquante, elle vous envoie l’email suivant :</p>

<blockquote>
Bonjour,<br />
Nous sommes ravis que vous contribuiez à cette nouvelle application web ! Nous sommes une petite marque, donc ce projet aura un impact important sur notre croissance.<br />
Vous trouverez ci-joint les spécifications pour l'API. Vous pouvez également trouver un lien vers le <a href="https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6">repo du projet ici</a> où vous aurez accès à l'interface.<br />
Merci de faire particulièrement attention aux exigences en matière de sécurité. Nous avons récemment été victimes d'attaques sur notre site web et nous voulons être sûrs que l'API de cette application est construite selon des pratiques de code sécurisées. Tous les mots de passe des utilisateurs recueillis par l'application doivent être protégés !<br /><br />
Cordialement,<br/><br/>
Paula Z<br />
Cheffe de produit<br />
Piiquante<br /><br />
Pièce jointe :<br />
<a href="https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf">Requirements</a>
</blockquote>

### L'affichage nécessite diverses manipulations :
Effectuer la commande <code>npm start</code> dans le dossier front.<br />
Effectuer la commande <code>nodemon server</code> dans le dossier back.<br />

### Packages utilisés :
<code>npm install --save mongoose-unique-validator</code><br />
<code>npm install --save dotenv</code><br />
<code>npm install --save bcrypt</code><br />
<code>npm install --save jsonwebtoken</code><br />
<code>npm install --save multer</code><br />
<code>npm install --save helmet</code><br />
<code>npm install --save express-rate-limit</code><br />
<code>npm install --save password-validator</code><br />
<code>npm install --save email-validator</code><br />