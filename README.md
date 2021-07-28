# Projet 6 : Construisez une API sécurisée pour une application d'avis gastronomiques
Parcours Developpeur Web par OpenClassrooms

## Compétences évaluées
  <ul>Implémenter un modèle logique de données conformément à la règlementation</ul>
  <ul>Mettre en oeuvre des opérations CRUS de manière sécurisée</ul>
  <ul>Stocker des données de manière sécurisée</ul>
 
## Scénario
<p>Vous êtes développeur backend freelance et vous travaillez depuis quelques années sur des projets web pour des startups ou des grandes entreprises.<br />
La semaine dernière, vous avez reçu un mail vous proposant un nouveau projet.<br />
La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”.<br />
L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”.<br />
Même si l’application deviendra peut-être un magasin en ligne dans un futur proche, Sophie, la product owner de So Pekocko, a décidé que le MVP du projet sera une application web 
permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.<br />
Lors de votre premier jour, vous discutez avec elle sur la messagerie instantanée interne de l’entreprise.</p>

<blockquote>
Sophie : Bonjour et bienvenue parmi nous !<br /><br />
Vous : Merci !<br /><br />
Sophie : Voici quelques informations dont tu vas avoir besoin pour développer notre application. Le côté frontend de l'application a déjà été développé. Nous avons besoin de 
toi pour le backend et la création de l'API.<br /><br />
Vous : Ah super ! J'ai hâte de démarrer. Est-ce qu'il y a d'autres choses que je dois savoir ?<br /><br />
Sophie : Oui nous avons récemment eu quelques attaques sur notre site web. Je suis assez inquiète. Il faudra donc être vigilent losque tu crééeras ton API. Veille bien à ce
qu'elle utilise des pratiques de code sécurisées.<br />
Ah oui aussi, les données personnelles de nos utilisateurs doivent impérativement être protégées, que ce soit côté API ou côté base de données grâce
à des méthodes de masquage.<br /><br />
Vous : OK ! Quelles technos souhaites-tu que j'utilise ?<br /><br />
Sophie : L'API devra respecter les standards OWASP. Le projet devra être hébergé par un serveur Node.js. La base de données utilisée devra être MongoDB. Tu devras également
utiliser le framework Express. Pour finir, tu devras utiliser un plug-in Mongoose pour garantir que toutes les erreurs de la base de données soient signalées.<br /><br />
Vous : Merci, c'est très clair.<br /><br />
Sophie : Une dernière chose : ton API devra fonctionner parfaitement avec notre frontend. Cela implique qu'il ne devra pas y avoir de régressions côté front.
J'espère que tout est clair, n'hésite pas si tu as des questions !<br />
Bon courage !</blockquote>

<p>La deadline fixée pour la réalisation du projet étant raisonnable, vous décidez d’accepter la mission, sachant que vos connaissances de la stack Node.js, Express et Mongo, et 
d’OWASP, sont parfaitement adaptées.<br />
Quelques heures plus tard, vous trouvez un post-it de Marc, le développeur frontend, sur votre bureau.</p>
<blockquote>Je t'ai envoyé de la doc pour l'API avec les pincipales routes CRUD à implémenter par mail.<br />
Fais-moi signe si tu n'as rien reçu :)<br />
Marc</blockquote>

<p>Vous trouvez effectivement la <a href="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Guidelines+API.pdf">documentation</a> dans votre boîte mail 
ainsi que la <a href="https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/P6_Note%20de%20cadrage%20So%20Pekocko_V3.pdf>note de cadrage</a> et un lien vers 
le <a href="https://github.com/OpenClassrooms-Student-Center/dwj-projet6">repo GitHub</a>. Vous vous lancez immédiatement !</p>

### L'affichage nécessite diverses manipulations :
Effectuer la commande <code>ng serve</code> dans le dossier front.<br />
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
<code>npm install --save maskdata</code><br />