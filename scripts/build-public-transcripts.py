#!/usr/bin/env python3
"""Génère les transcripts publics Swing Digital depuis les sorties STT."""

from __future__ import annotations

import html
import re
import shutil
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TRANSCRIPTS_DIR = ROOT / "transcripts"
PUBLIC_DIR = ROOT / "docs" / "transcripts"
SRC_DIR = ROOT / "src"
CSS_VERSION = "20260920-t33-transcriptions"


@dataclass(frozen=True)
class TranscriptConfig:
    slug: str
    title: str
    source: str
    headings: tuple[str, ...]
    source_label: str = "transcript faster-whisper français"
    replacement_overrides: tuple[tuple[str, str], ...] = ()
    translated_text: str | None = None


COMMON_REPLACEMENTS: tuple[tuple[str, str], ...] = (
    ("Epinès-sur-Seine", "Épinay-sur-Seine"),
    ("moutés", "montés"),
    ("Le cat, c'est", "Le théâtre, c'est"),
    ("tu te montes devant", "tu te montres devant"),
    ("des envois", "des ennuis"),
    ("ne racont que", "ne racontent que"),
    ("la humilité", "l'humilité"),
    ("trésors en bouille", "trésors en vous"),
    ("La concert d'orientation", "La conseillère d'orientation"),
    ("Je m'instage chez elle.", "Je m'installe chez elle."),
    ("Il devient folle.", "Elle devient folle."),
    ("Hivre de bonheur.", "Ivre de bonheur."),
    ("le plus gros bus", "le plus gros buzz"),
    ("une liaison cumulueuse", "une liaison tumultueuse"),
    ("Marilyn, est-ce que je peux vous peser\nune question personnelle ?", "Marilyn, est-ce que je peux vous poser\nune question personnelle ?"),
    ("quand vous y apparissez", "quand vous y apparaissez"),
    ("plus d'écoles à dramatique", "plus d'écoles d'art dramatique"),
    ("plus d'arrosage de plouze", "plus d'arrosage de pelouse"),
    ("Milton Green", "Milton Greene"),
    ("Milti est mon mentor.", "Milton est mon mentor."),
    ("Milton Green-Mountain Road", "Milton Greene-Marilyn Monroe"),
    ("Milton Green,", "Milton Greene,"),
    ("Milton Green ", "Milton Greene "),
    ("vous êtes dans une blouse du mois d'août", "vous êtes dans un blues du mois d'août"),
    ("Norma Dugherty", "Norma Dougherty"),
    ("Monsieur Zanduc", "Monsieur Zanuck"),
    ("Les grands monitours des studios", "Les grands manitous des studios"),
    ("que le public s'emmène", "que le public s'en mêle"),
    ("en m'accusant moi de la similité", "en m'accusant, moi, de leur duplicité"),
)


AMY_GREENE_FR = """Quelle est la spécificité du travail photographique de Milton Greene avec Marilyn ?
Sur le plan humain comme sur le plan commercial : ils s'adoraient, ils se faisaient confiance. S'il lui avait demandé de faire la roue, elle l'aurait faite. Elle adorait être photographiée par lui, parce que les photographies étaient d'une beauté qu'elle n'avait jamais vue avant de découvrir le travail de Milton.
Elle n'avait jamais vu de photographies pareilles, aussi belles, aussi élégantes. Elle a regardé le portfolio et elle a demandé : qui est cette personne ?
Le rédacteur de Look, qui représentait le magazine à Los Angeles, lui a répondu : un type à New York, il s'appelle Milton Greene.
Elle a dit : eh bien, je veux qu'il me photographie. Et Steve a répondu : parfait, parce que lui aussi veut vous photographier. C'est comme ça que ça s'est fait. Nous sommes partis tous les deux en Californie ; nous étions en voyage de noces, nous venions de nous marier, aussi incroyable que cela paraisse.

En quoi le travail de Milton Greene différait-il de celui des autres photographes ?
Richard Avedon l'a dit en peu de mots : Milton photographie les femmes comme personne d'autre au monde n'en est capable, moi compris.
Il avait un rapport particulier aux femmes. Et puis c'était un artiste, un véritable artiste, avec un esprit hors du commun.

Qu'est-ce qui a poussé Milton Greene à se lancer dans la production ? Et pourquoi a-t-il pris tous ces risques ?
Il avait atteint ce niveau-là, mais il voulait monter plus haut encore. Il aimait le cinéma, bien sûr, il avait toujours aimé les films, il avait grandi dans un monde de fiction, et il voulait passer à l'étape suivante. Elle était enthousiaste à l'idée que cette société se crée autour d'elle.
On rencontre quelqu'un, on l'apprécie, on apprend à le connaître, et la confiance s'installe. C'était la force de Milton avec toutes les personnes qu'il photographiait : celle ou celui qu'il photographiait savait qu'il ne lui ferait jamais de mal. Le mot, c'est la confiance.

En 1954, Marilyn est partie de la Fox et s'est réfugiée chez vous, à Weston, dans le Connecticut. Quels souvenirs gardez-vous de cette période ? Avez-vous une anecdote à nous raconter ?
Elle ne m'aurait jamais fait de mal, d'aucune façon. Je savais donc qu'il n'y avait rien entre eux. Beaucoup de gens disent que je suis folle, et que...
Elle allait bien. C'était une jeune femme qui était une éponge : elle absorbait tout, de partout.

Pendant la période où Milton dirigeait la Marilyn Monroe Productions, Marilyn et vous avez passé beaucoup de temps ensemble. Qu'est-ce qui vous unissait alors ?
Nous sommes devenues amies. Je n'avais pas besoin de l'appeler pour lui proposer d'aller au Met : elle était dans la chambre à côté de la mienne.
C'était une atmosphère de famille, et elle adorait ça. Joshua était là, il avait deux ans ; elle l'aimait et il l'aimait.
C'était un bonheur partagé. Je déteste que cela sonne aussi mièvre, mais c'est vrai : elle ne m'a jamais posé le moindre problème. D'abord, je ne crois pas qu'elle aurait osé.
Et puis tout le monde venait chez nous, à la campagne. Chaque dimanche soir, nous étions quinze ou seize autour de la table. Marilyn était là, elle participait à la conversation et elle tenait sa place.
J'ai une histoire amusante à vous raconter. Un dimanche soir — Milton avait construit cette table lui-même, il se prenait pour un menuisier — tout le monde était assis autour, et un invité a dit qu'il revenait d'un enterrement. Nous avons commencé à parler de la mort.
J'ai dit : très bien, faisons le tour de table, que chacun nous dise ce qu'il en pense. Et c'est passé de l'un à l'autre. Des gens passionnants qui parlent.
Le tour est arrivé à Marilyn. Elle a dit : moi, je veux juste être enterrée sous une pierre tombale où il sera écrit 36, 22, 36. Vous savez ce que c'était ? Ses mensurations.
Voilà pourquoi elle avait cet humour formidable. Elle a eu droit à une ovation.

Il existe de belles photographies de Milton Greene où l'on voit Marilyn avec votre fils Joshua. Quel regard Marilyn portait-elle sur lui ?
Marilyn Monroe reste une icône mondiale, et beaucoup de gens se sont emparés de son image. Ce phénomène était-il prévisible à l'époque de la Marilyn Monroe Productions ?
C'était Le Prince et la Danseuse, et elle n'a jamais été aussi heureuse qu'à ce moment-là de sa vie.
D'ailleurs Joshua Logan, le grand metteur en scène, celui dont Joshua Greene porte le prénom, disait que c'était sa période dorée. C'est lui qui l'a dirigée dans Arrêt d'autobus.
Autre chose, très important : la Marilyn Monroe Productions lui donnait le droit de choisir son metteur en scène, ce qu'elle n'avait jamais eu auparavant. Là encore, c'était Lew Wasserman, Milton Greene, Jay Kanter. Tout cela s'est négocié au téléphone avec Zanuck.
Zanuck ne l'a jamais comprise. Zanuck ne l'a jamais aimée. Il l'appelait tête de paille. Mais peu importe.

Comment expliquez-vous que Marilyn soit devenue une icône ?
Cette génération — non, pas celle-ci, les deux dernières — semble ne plus avoir de héros comme nous en avions. Alors il leur en faut fabriquer un. Et Marilyn était là.
Elle était morte avant que cela n'arrive. Elle en aurait été aussi stupéfaite que nous tous. Personne n'a compris ce phénomène.
D'ailleurs, l'un de nos affreux amis, qui se prenait pour un comique, a dit à la mort de Marilyn que c'était un bon plan de carrière. Et ça l'a été. Si elle avait vécu, peut-être que rien de tout cela ne serait arrivé.
Mais elle dépasse aussi James Dean. Elle dépasse Steve McQueen. C'est à un niveau qu'on n'avait jamais vu. Peut-être un roi ou une reine. Peut-être la reine Victoria, à l'époque victorienne.
Mon fils Joshua dit toujours qu'elle est morte jeune. Elle est morte à trente-six ans. Et il a raison. C'est encore cette image de la jeunesse : Dean, Elvis, Jimi Hendrix, Janis Joplin. Si l'on veut tous les réunir : Mozart, trente-six ans. Modigliani, trente-six ans.
Il y a une raison pour que ceux-là deviennent des icônes, et je crois qu'il tient quelque chose : ils sont morts jeunes. Personne n'a pu voir leurs défauts.

Arthur était jaloux de Milton. Pas de Milton en tant qu'homme, mais du temps que Marilyn et Milton passaient à travailler ensemble. Arthur ne le supportait pas. C'était au-delà de ses forces. Il était possessif, et il estimait que c'était son temps à lui.
Enfin, ils faisaient un film, tout de même. Soyons charitables : Arthur a trois enfants, et je ne veux pas être méchante. Disons simplement qu'il n'était pas de taille. Il ne pouvait pas gérer ce que géraient Kanter, Greene et Wasserman. Il ne comprenait pas. Ce n'était pas son métier, ce n'étaient pas ses moyens.
S'il était allé s'asseoir dans un coin pour écrire, il n'aurait gêné personne. Nous priions pour ça : mon Dieu, faites qu'Arthur aille écrire une pièce. Mais non.
Il venait sur le plateau. Il venait dans la loge. Il passait la prendre, et elle n'en voulait pas. Elle n'en voulait vraiment pas, parce qu'elle travaillait. Quand c'est Laurence Olivier qui vous dirige, il faut être attentive, même quand on n'en a pas envie. Et Arthur, lui, était devenu impossible.
Voilà ce qui a eu raison de la Marilyn Monroe Productions.
J'avais un mari malheureux. J'avais un mari qui ne voulait pas vraiment faire ce qu'il faisait. Nous vivions très bien, nous vivions magnifiquement de son talent, nous étions habitués à une vie très agréable. Et tout à coup, il y avait un homme malheureux à la maison.

Des années plus tard, pendant le tournage des Désaxés, mon ami Eli Wallach, que j'adorais — un acteur très connu à New York — était sur le plateau : il jouait l'un des personnages.
À un moment, Marilyn s'est retournée contre Arthur. Ils se disputaient sans arrêt sur le tournage. Elle s'est retournée contre lui, elle s'est mise à crier, à lui reprocher ceci et cela. Et elle a dit, entre autres : tu m'as même pris la seule personne en qui j'aie eu confiance de toute ma vie. Tu me l'as enlevé.
Arthur a répondu : de quoi parles-tu ? Marilyn a dit : de Milton Greene. Pourquoi n'est-il pas là ? Pourquoi n'est-il pas sur ce plateau ?
C'est Eli qui me l'a raconté. Vous avez votre réponse.

Attendez, reprenons depuis le début. J'ai rêvé de Marilyn, et elle appelait à l'aide. Je réveille mon mari et je lui dis : prends un avion et va la voir.
Il m'a répondu : tu as perdu la tête, nous partons à Paris dans trois jours pour les collections, comment veux-tu ? C'est impossible, je fais mes valises, je pars.
J'ai dit : très bien. Si tu ne veux pas aller la voir, appelle-la.
Il a donc appelé Arthur Jacobs, qui était l'attaché de presse, et Arthur lui a aussitôt donné le numéro. Ils ont parlé trois heures. Pas une heure : trois heures, ce jour-là.
Puis elle l'a rappelé le lendemain, ils se sont de nouveau parlé et ils ont fixé un rendez-vous : à la fin des collections, il prendrait l'avion par le pôle et irait à Los Angeles, et moi je rentrerais à New York. C'était convenu. Et vous savez ce qui est arrivé.

Savez-vous ce qui s'est dit pendant ces conversations ?
Non, mon petit. Je quittais la pièce, cela ne me regardait pas. J'étais sûre de moi à ce point.
Exactement. Non. Ils étaient associés. De la même façon, je n'écoutais pas : je sortais de la pièce quand il parlait à des annonceurs. Je ne suis pas ce genre de femme, je ne l'ai jamais été. Je me sens très bien comme cela.
Elle était donc dans un cocon, et le papillon sortait du cocon, avec tous ceux qui l'entouraient. Et elle adorait ça. Elle n'avait aucun problème, sauf Arthur.
Bon, d'accord, je ne vais pas parler d'Arthur : la journée est trop belle.
Arthur n'a jamais pu comprendre la relation entre Milton et Marilyn. Jamais de la vie il n'aurait pu la comprendre.
Et la Marilyn Monroe Productions, c'était Marilyn à cinquante et un pour cent. C'est Milton qui a fait cela, avec Lew Wasserman et Jay Kanter, pour qu'elle ait la majorité de sa propre société de production.
Arthur ne comprenait pas pourquoi Milton Greene détenait quarante-neuf pour cent de la Marilyn Monroe Productions, parce qu'il n'a jamais su ce que Milton faisait au quotidien.

Un jour, Gene Kelly est venu à la maison et il a dit : je rentre de Paris, j'ai vu une pièce en français — Gene parlait français — Irma la Douce. J'ai pris une option dessus, et nous allons la monter à Broadway.
Milton a dit : absolument. Marilyn a été mise dans la confidence le soir même, et on lui a annoncé qu'elle allait jouer Irma la Douce à Broadway.
Qu'est-ce que c'est, Irma la Douce ? Elle a adoré. Une prostituée, ceci, cela, amoureuse d'un policier, et la musique. Elle était enchantée.
Voilà la protection que Milton Greene lui apportait, et qu'Arthur n'a jamais comprise. C'était une protection quotidienne, de chaque heure, constante.

En quoi était-elle une femme moderne ?
Elle est devenue féministe. Elle s'est mise tout à coup à poser des questions et à exiger des réponses, de Zanuck comme de tous ceux à qui elle parlait. Elle aimait Carl Sandburg, elle est allée le rencontrer à Chicago.
Une chose très importante : la première fois que Marilyn a décroché son téléphone pour dire à quelqu'un « j'exige que vous fassiez telle chose », c'est quand elle a appris que sa chanteuse préférée, Ella Fitzgerald, devait se produire au Crescendo et qu'on n'en voulait pas, parce qu'elle était afro-américaine.
Marilyn a décroché le téléphone et a dit : vous devez la laisser venir. Et si vous le faites, je serai là tous les soirs. Elle y était tous les soirs. Et Ella et elle sont devenues amies.
C'est là qu'elle a pris conscience de son pouvoir pour la première fois.

Un soir, nous sommes allés voir Sinatra au Copacabana. La salle était pleine à craquer, on n'aurait pas pu y glisser un cure-dent. Nous sortions d'une grande soirée de presse : elle portait une robe de satin blanc, des chaussures de satin blanc, un manteau de vison blanc, du vison rasé, des diamants. Elle ressemblait à une star de cinéma.
Et je lui dis : n'y compte pas, nous n'entrerons jamais. Ils connaissent Milton, et s'ils lui ont dit non au téléphone, nous n'entrerons pas.
Elle m'a demandé : tu tiens à entrer à quel point ? J'ai répondu : je suis amoureuse de cet homme, alors bien sûr que je veux entrer et le voir. Elle a dit : d'accord, suis-moi.
Nous quittons la soirée, nous entrons au Copacabana — pas par les cuisines, comme d'habitude : si vous vous souvenez de la scène des Affranchis, c'est comme cela que nous entrions. Mais cette fois, nous sommes descendus par l'escalier.
Il y avait un petit palier avant les trois dernières marches. Elle s'est arrêtée là, sans dire un mot. Moi derrière elle, Milton derrière moi. Elle est restée là.
Et tout le monde s'est tourné dans cette direction. Frank était de l'autre côté, et il s'aperçoit qu'il se passe quelque chose, parce que plus personne ne fait attention à lui. Il demande : quoi ? Qui est-ce ? Que se passe-t-il ? Il arrête le spectacle.
J'étais très impressionnée. J'ai dit : d'accord, je t'en dois une.

Une erreur. Rien qu'une erreur. Milton et moi... On nous a posé cette question depuis toujours.
Elle a simplement pris les deux comprimés de trop, ceux qu'elle n'aurait jamais dû prendre, parce qu'elle avait oublié qu'elle en avait déjà pris trois heures plus tôt. C'était une erreur.
Les Cubains n'étaient pas après elle. Les gangsters n'étaient pas après elle. Les Kennedy n'étaient pas après elle. C'était une erreur, un point c'est tout.
Seulement, une erreur, cela n'a rien de romanesque. Alors bien sûr, personne ne veut le croire. Elle s'est trompée. C'est aussi simple que cela. Elle s'est trompée. Ce n'était pas prémédité.
Parce qu'elle avait eu ces trois conversations avec Milton. Elle est morte pendant que nous étions à Paris, pour les collections. Il la croyait heureuse, il la croyait en sécurité, et ils avaient hâte de se retrouver.
Si elle n'était pas morte, je suis certaine que la Marilyn Monroe Productions serait repartie une fois de plus. Mais cela n'est jamais arrivé. Une erreur.

La liberté sexuelle : je crois que c'est cela, sa vraie contribution. Je ne crois pas qu'elle savait ce qu'elle faisait pendant qu'elle le faisait, mais cette liberté sexuelle qui est partout aujourd'hui — sauf au Moyen-Orient, mais n'entrons pas là-dedans.
Soyez heureuse de votre corps. Aimez votre corps. Prenez soin de votre corps. Soyez sexy.
Tout ce que nous voyons aujourd'hui, qui est excessif, déjà trop : il n'y a jamais de juste milieu, c'est toujours trop ou trop peu. Je crois donc que ce qu'elle a apporté au monde en général, c'est la liberté sexuelle.

Les cheveux blonds : plus de femmes se sont teint les cheveux en blond qu'à l'époque même de Jean Harlow. Elles ne l'avaient pas fait autant qu'avec Marilyn.
N'oublions pas que Betty Grable était blonde. Nous avons toujours aimé les blondes. Jean Harlow était magnifique, tout en elle était magnifique : si vous regardez un film de Jean Harlow, regardez ses pieds, ses chevilles, ses jambes. Ils sont magnifiques. Betty Grable, pareil.
Chaque femme a quelque chose à donner au cinéma. C'est leur métier, et c'est ce qu'elles doivent faire, parce que c'est pour cela qu'on les paie très cher.
Il y a donc eu Harlow, puis Grable, puis Marilyn. Dietrich, elle, était dans un monde à part : on n'a jamais dit de Dietrich qu'elle était une blonde, si vous voyez ce que je veux dire. Elle était blonde, mais c'était tout autre chose.
Qui d'autre me vient à l'esprit ? Eva Marie Saint, dans les années soixante. Mais là encore, elle n'était pas assez sensuelle pour cela.
Je crois donc que ce qu'elle a laissé, c'est qu'on a le droit de se teindre les cheveux et d'être blonde, si c'est ce qu'on veut. Elle a donné aux femmes leur liberté.
Les femmes sont formidables, mais nous ne le savons pas. Nous n'avons pas compris ce que nous valons, vraiment. Nous pouvons tout faire."""


ESTRADE_DESCRIPTION = """Vidéo musicale, sans parole.

Dans une salle d'exposition aux murs couverts de photographies, une estrade blanche à gradins porte en son centre une grille de soufflerie. Les visiteurs y montent à tour de rôle, seuls ou à deux. Portés par le souffle d'air et la musique, ils prennent la pose, dansent, retiennent un vêtement qui s'envole, rient. À côté de l'estrade, un écran vertical leur renvoie leur image.

Le montage alterne des plans larges de l'installation et des plans rapprochés sur les visages et les gestes : un homme en chemise qui esquisse un pas de danse, deux femmes qui rient ensemble, une jeune femme en grand écart, une autre, bras levés, qui tourne sur elle-même."""


THE_ARCHIVES_FR = """Milton Greene est photographe. Pendant des années, des millions d'entre nous ont vu ses images en couverture de Look, Life, Vogue et d'autres magazines.
Milton, trente-trois ans, sa femme et leur fils d'un an vivent dans cette maison de cent cinquante ans à Weston, dans le Connecticut.
C'est à environ une heure de route de son studio à Manhattan.

Milton Greene était mon mentor. C'était mon meilleur ami : grandir autour de lui, apprendre la photographie avec lui, apprendre à tirer les images avec lui.
Quand j'ai décidé de ranger mes appareils et d'entrer dans la restauration, c'était par amour pour mon père.
Il est mort le cœur brisé à l'idée que certains des meilleurs travaux qu'il ait jamais faits n'aient jamais été publiés, jamais vus, et ne puissent jamais être reproduits.
Quand j'ai découvert le numérique, j'ai vu l'occasion de ramener mon père à moi, et de ramener les photos au monde.

Je pense qu'il est important de capturer ces images aussi bien que la technologie le permet.
La technologie continue de changer, donc parfois nous recommençons encore et encore.
Il n'y a qu'un nombre limité de photographies : quatre mille dans toute la collaboration entre Milton Greene et Marilyn Monroe.
Travaillons sur toutes celles que nous pouvons.

Ce que nous faisons, c'est entrer dans l'image et capturer l'œil, les lèvres, en nous assurant de conserver les détails dans les hautes lumières et dans les ombres.
Nous exportons donc depuis FlexColor, le logiciel fourni avec le scanner, vers Photoshop.
Du début à la fin, cela représente en moyenne quarante à soixante heures, selon l'image.
La plus grande partie du nettoyage se fait pixel par pixel avec l'outil correcteur.
Cela peut prendre trente à quarante heures de travail.
Ce que les gens ne mesurent pas vraiment, c'est le niveau de détail de ce travail ; quand on manipule vraiment ces pixels, il faut faire attention à ne pas créer de cicatrice numérique.

Ici, on voit l'état du film.
C'est de la poussière incrustée à la surface du film.
Une rayure ici, des rayures là.
Ce sont de petites choses, mais voyez comme cela interfère avec les cheveux.
Tout est là.
Rav a tracé un détourage, puis il l'adoucit selon la douceur du film.
Une fois que j'ai le masque, cela me permet de choisir quels outils de calques de correction couleur je vais utiliser.
La plupart du temps, ce sera un choix entre teinte et saturation, courbes et correction sélective.
Parfois il y aura deux ou trois calques de réglage avec un masque.
D'autres fois, il peut y en avoir jusqu'à six.
Sur le visage et les cheveux, obtenir les bonnes couleurs demande davantage de contrôle avec les masques.

Nous tirerons probablement sept épreuves pour sentir comment l'image s'imprime et comment elle rend à l'écran, parce que l'écran donne beaucoup plus d'informations que ce que l'on peut vraiment obtenir sur papier.
Mais j'ai besoin de voir les tirages en grand pour vraiment voir les bords des masques, leur fusion, et s'il y a une erreur à corriger.
Quand j'avais onze ans, mon père m'a mis dans la chambre noire et m'a appris à tirer.
Sa manière d'aborder l'image, ce qu'il voulait renforcer, assombrir, retenir ou contrôler, permettait de tirer le meilleur de l'image.
Le tirage finissait donc par paraître différent du morceau de film original achevé.
C'est ce que fait un tireur d'art : il apporte une autre couche d'expertise pour que le tirage tienne par lui-même.

La commande originale de Look magazine qui a amené Milton à photographier Marilyn consistait en fait à photographier plusieurs jeunes talents prometteurs à Hollywood.
Les rédacteurs de Look ont présenté le portfolio de Milton à Marilyn.
Quand elle a vu ses photographies, elle a été très enthousiaste à l'idée de travailler avec lui.
Ils se sont rencontrés en Californie et ont fait la séance de la mandoline et du négligé le premier jour.
En voyant les films le lendemain matin, Marilyn a vu dans la photographie de Milton une part d'elle-même qui était réelle.
Il n'aurait jamais laissé qui que ce soit voir une mauvaise photo s'il en avait prise une, et elle pouvait croire qu'il était un protecteur.
C'est ainsi que leur relation de photographe et de muse s'est construite.
Dans les mois qui ont suivi, Milton est retourné en Californie pour photographier Marilyn.
Ils allaient au département costumes de la 20th Century Fox, enfilaient une tenue de fantaisie, puis partaient photographier sur les plateaux extérieurs.
Sur une courte période, on voit des photographies de Marilyn qui joue à se déguiser, qu'elle soit paysanne, gitane ou prostituée.
Il y a une part de fantaisie et de plaisir dans leur collaboration.
Ils s'amusaient. C'était du faire-semblant.
Tout ce que Milton voulait faire, c'était prouver qu'elle pouvait être l'actrice de composition qu'elle voulait être, et construire sa confiance."""


CONFIGS: tuple[TranscriptConfig, ...] = (
    TranscriptConfig(
        slug="galerie-joseph",
        title="Prolongation de L'Expérience Monroe",
        source="Prolongation de l'Expérience Monroe pour les fêtes, jusqu'au 14 janvier 2024 [Le2Ybd_X6A0].fr.txt",
        headings=("La Galerie Joseph", "Le parcours Monroe", "Dans la peau de Marilyn"),
    ),
    TranscriptConfig(
        slug="dessine-moi-le-vent",
        title="Dessine-moi le vent",
        source="DESSINE-MOI LE VENT (teaser) [250420667].fr.txt",
        headings=("Un livre augmenté", "L'imaginaire de Naël et Leïla", "Un spectacle mobile"),
    ),
    TranscriptConfig(
        slug="voyage-autour-de-moi",
        title="Voyage autour de moi",
        source="Voyage autour de moi [528291420].fr.txt",
        headings=("Première rencontre", "Questions d'adolescence", "Amour, peurs et famille", "Ateliers et théâtre", "Rêves et texte final"),
    ),
    TranscriptConfig(
        slug="roman-graphique",
        title="Marilyn Monroe - Confession inachevée",
        source="Marilyn Monroe - Confession inachevée - Roman Graphique. [782642139].fr.txt",
        headings=("Générique", "Entrée en scène"),
        replacement_overrides=(("Générique\nGénérique", "Générique"),),
    ),
    TranscriptConfig(
        slug="experience-monroe",
        title="L'Expérience Monroe",
        source="L'EXPERIENCE MONROE - UN RÉCIT TRANSMÉDIA [838300539].fr.txt",
        headings=("Le texte de Marilyn", "Les formes du parcours", "Forum des images", "VR et mémoire", "Le travail de création"),
    ),
    TranscriptConfig(
        slug="podcast-devenir-marilyn",
        title="Podcast - Devenir Marilyn",
        source="DEVENIR MARILYN - (Transforming into Marilyn)  Épisode 1 - Episode 2 [0YDIZeBbYL0].fr.txt",
        headings=("Norma Jeane et Gladys", "La maison puis l'orphelinat", "Construire Marilyn"),
    ),
    TranscriptConfig(
        slug="podcast-icone-coree",
        title="Podcast - Une icône en Corée",
        source="UNE ICÔNE EN CORÉE (An Icon in Korea) - Épisode 3 ⧸ UN SAGE M' OUVRE LES YEUX -  Épisode 4 [iJjEmnqXWzU].fr.txt",
        headings=("La scène en Corée", "La question du jeu", "Devenir artiste"),
    ),
    TranscriptConfig(
        slug="podcast-kennedy",
        title="Podcast - Kennedy et moi",
        source="KENNEDY ET MOI ( The President and I) EPISODE 4 [FD7Du_SD-QI].fr.txt",
        headings=("Happy birthday, Mr. President", "Une relation mondaine", "Rumeurs et politique"),
    ),
    TranscriptConfig(
        slug="podcast-ma-mort",
        title="Podcast - Ma mort et après...",
        source="MA MORT ET ÂPRES...( The After life)  ÉPISODE 5 et 6 [rx0VDLfEbLU].fr.txt",
        headings=("La Fox et les économies", "Le 4 août", "Après la mort"),
    ),
    TranscriptConfig(
        slug="la-piece",
        title="La Pièce - teaser",
        source="La Pièce - teaser théâtre [106406158].fr.txt",
        headings=("Un nouveau nom", "Les studios", "Jouer"),
        replacement_overrides=(
            ("Sous-titrage ST'501\n", ""),
            ("Rien que tu pensais.\nYes, the strongest more\nWhite mama made of...\n", "[Passage chanté en anglais.]\n"),
        ),
    ),
    TranscriptConfig(
        slug="installation-galerie-joseph",
        title="L'installation à la Galerie Joseph",
        source="L'Expérience Monroe à La Galerie Joseph [872268258].fr.txt",
        headings=("Le labyrinthe", "Mars 1954", "Les volets du parcours"),
        replacement_overrides=(("Sous-titres réalisés para la communauté d'Amara.org\n", ""),),
    ),
    TranscriptConfig(
        slug="estrade-marilyn",
        title="L'estrade Marilyn",
        source="La Pièce - teaser théâtre [106406158].fr.txt",
        headings=("Ce que montre la vidéo",),
        source_label="description rédigée : vidéo musicale, sans parole",
        translated_text=ESTRADE_DESCRIPTION,
    ),
    TranscriptConfig(
        slug="interview-gombeaud-montagner",
        title="Interview - Adrien Gombeaud et Christelle Montagner",
        source="Interview Gombeaud et Montagner [Q8IsqXjCXwc].fr.txt",
        headings=("Écrire une blonde à Manhattan", "Norma Jeane et Marilyn", "L'image et les photographes", "Le mythe et ses fans", "Le dernier mot"),
    ),
    TranscriptConfig(
        slug="interview-amy-greene",
        title="Interview - Amy Greene",
        source="Interview Amy Greene [c6ji1dscDqs].en.txt",
        headings=("Milton Greene et Marilyn", "Weston, Connecticut", "La Marilyn Monroe Productions", "Devenir une icône", "Arthur Miller", "Une femme moderne", "Ce qu'elle a laissé"),
        source_label="transcript faster-whisper anglais, traduction française",
        translated_text=AMY_GREENE_FR,
    ),
    TranscriptConfig(
        slug="podcast-the-archives",
        title="Podcast - The Archives",
        source="The archives - Joshua Greene [AB2Fb1wdHoo].en.txt",
        headings=("Milton Greene", "Restaurer les images", "Masques et tirages", "Marilyn devant l'objectif"),
        source_label="transcript faster-whisper anglais, traduction française",
        translated_text=THE_ARCHIVES_FR,
    ),
)


PAGE_TARGETS = {
    "src/index.html": ("galerie-joseph",),
    "src/dessine-moi-le-vent.html": ("dessine-moi-le-vent",),
    "src/voyage-autour-de-moi.html": ("voyage-autour-de-moi",),
    "src/monroe-roman-graphique.html": ("roman-graphique",),
    "src/experience-monroe.html": ("experience-monroe",),
    "src/monroe-piece.html": ("la-piece",),
    "src/monroe-installation.html": ("installation-galerie-joseph",),
    "src/monroe-experiences.html": ("estrade-marilyn",),
    "src/monroe-interviews.html": ("interview-gombeaud-montagner", "interview-amy-greene"),
    "src/monroe-podcasts.html": (
        "podcast-devenir-marilyn",
        "podcast-icone-coree",
        "podcast-kennedy",
        "podcast-ma-mort",
        "podcast-the-archives",
    ),
}


def slug_to_config() -> dict[str, TranscriptConfig]:
    return {config.slug: config for config in CONFIGS}


def normalize_text(text: str, config: TranscriptConfig) -> tuple[str, list[tuple[str, str, str]]]:
    replacements = list(COMMON_REPLACEMENTS) + list(config.replacement_overrides)
    changes: list[tuple[str, str, str]] = []
    for before, after in replacements:
        if before in text:
            text = text.replace(before, after)
            changes.append((before, after, "correction de forme ou graphie confirmee"))

    subtitle_credit_pattern = r"\s*(?:Crédit de sous-titrage|Sous-titrage) ST'501"
    if re.search(subtitle_credit_pattern, text):
        text = re.sub(subtitle_credit_pattern, "", text)
        changes.append((
            "mention technique de sous-titrage",
            "suppression",
            "suppression d'une mention technique de sous-titrage",
        ))

    text = re.sub(r"\n{3,}", "\n\n", text.strip())
    return text.strip() + "\n", changes


def backup_sources(timestamp: str) -> None:
    for config in CONFIGS:
        source = TRANSCRIPTS_DIR / config.source
        if not source.exists():
            raise FileNotFoundError(source)
        existing_backups = sorted(source.parent.glob(f"{source.name}.bak-*"))
        if existing_backups:
            continue
        backup = source.with_name(f"{source.name}.bak-{timestamp}")
        shutil.copy2(source, backup)


def words_count(text: str) -> int:
    return len(re.findall(r"[0-9A-Za-zÀ-ÖØ-öø-ÿ_'-]+", text))


def paragraphs_from_text(text: str, max_words: int = 70) -> list[str]:
    normalized = re.sub(r"\s+", " ", text.strip())
    sentences = [part.strip() for part in re.split(r"(?<=[.!?…])\s+", normalized) if part.strip()]
    paragraphs: list[str] = []
    current_sentences: list[str] = []
    current_words = 0

    for sentence in sentences:
        sentence_words = words_count(sentence)
        if current_sentences and current_words + sentence_words > max_words:
            paragraphs.append(" ".join(current_sentences))
            current_sentences = []
            current_words = 0

        current_sentences.append(sentence)
        current_words += sentence_words

    if current_sentences:
        paragraphs.append(" ".join(current_sentences))

    return paragraphs


def split_sections(paragraphs: list[str], headings: tuple[str, ...]) -> list[tuple[str, list[str]]]:
    if not paragraphs:
        return [(headings[0], [])]

    section_count = len(headings)
    result: list[tuple[str, list[str]]] = []
    for index, heading in enumerate(headings):
        start = round(index * len(paragraphs) / section_count)
        end = round((index + 1) * len(paragraphs) / section_count)
        result.append((heading, paragraphs[start:end]))
    return result


def render_transcript(config: TranscriptConfig, text: str, heading_level: int = 2) -> str:
    panel_id = f"transcript-{config.slug}"
    sections = split_sections(paragraphs_from_text(text), config.headings)

    lines = [
        f'<div class="media-transcript" data-transcript="{html.escape(config.slug)}">',
        (
            f'    <button class="media-transcript__button" type="button" '
            f'aria-expanded="false" aria-controls="{panel_id}" '
            f'data-label-show="Lire la transcription : {html.escape(config.title)}" '
            f'data-label-hide="Masquer la transcription : {html.escape(config.title)}">'
            f'<span class="js-disclosure-label">Lire la transcription : {html.escape(config.title)}</span></button>'
        ),
        f'    <div id="{panel_id}" class="media-transcript__panel" hidden>',
        f'        <h{heading_level} class="media-transcript__title">Transcription - {html.escape(config.title)}</h{heading_level}>',
    ]

    for heading, section_paragraphs in sections:
        if not section_paragraphs:
            continue
        lines.append('        <section class="media-transcript__section">')
        lines.append(f'            <h{heading_level + 1}>{html.escape(heading)}</h{heading_level + 1}>')
        for paragraph in section_paragraphs:
            lines.append(f'            <p>{html.escape(paragraph)}</p>')
        lines.append("        </section>")

    lines.extend(["    </div>", "</div>"])
    return "\n".join(lines)


def write_public_files(timestamp: str) -> dict[str, str]:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    rendered: dict[str, str] = {}

    for config in CONFIGS:
        source = TRANSCRIPTS_DIR / config.source
        source_text = source.read_text(encoding="utf-8")
        if config.translated_text is not None:
            corrected_text = config.translated_text.strip() + "\n"
            changes = [("transcript anglais source", "traduction française publiée", "traduction")]
        else:
            corrected_text, changes = normalize_text(source_text, config)

        corrected_path = PUBLIC_DIR / f"{config.slug}.fr.corrected.txt"
        report_path = PUBLIC_DIR / f"rapport-corrections-{config.slug}.md"
        html_path = PUBLIC_DIR / f"{config.slug}.html"

        corrected_path.write_text(corrected_text, encoding="utf-8")
        # Les transcriptions de podcasts vivent sous un h2 englobant : leur titre descend d'un niveau.
        niveau = 3 if config.slug.startswith('podcast-') else 2
        rendered_html = render_transcript(config, corrected_text, niveau)
        html_path.write_text(rendered_html + "\n", encoding="utf-8")
        rendered[config.slug] = rendered_html

        report_lines = [
            f"# Rapport de corrections - {config.title}",
            "",
            f"- Source : `{source.relative_to(ROOT)}`",
            f"- Sauvegarde source : `{source.name}.bak-{timestamp}`",
            f"- Source primaire : {config.source_label}",
            "- Locuteurs : non applicable, aucun label de locuteur source.",
            "",
            "## Corrections appliquées",
            "",
            "| Avant | Après | Catégorie |",
            "|---|---|---|",
        ]
        if changes:
            for before, after, category in changes:
                report_lines.append(f"| `{before}` | `{after}` | {category} |")
        else:
            report_lines.append("| Aucune correction automatique appliquée | Aucune | Non applicable |")

        report_lines.extend(
            [
                "",
                "## Elements non resolus",
                "",
                "- Passages incertains conservés quand la source STT ne permet pas une correction sûre.",
                "- Noms propres et graphies à revérifier par l'équipe métier.",
            ]
        )
        report_path.write_text("\n".join(report_lines) + "\n", encoding="utf-8")

    return rendered


def marker(slug: str, block: str) -> str:
    return f"<!-- transcript:{slug}:start -->\n{block}\n<!-- transcript:{slug}:end -->"


def replace_or_insert(text: str, slug: str, block: str, fallback_anchor: str, after: bool = True) -> str:
    start_marker = f"<!-- transcript:{slug}:start -->"
    end_marker = f"<!-- transcript:{slug}:end -->"
    wrapped = marker(slug, block)

    if start_marker in text and end_marker in text:
        start = text.index(start_marker)
        end = text.index(end_marker, start) + len(end_marker)
        return text[:start] + wrapped + text[end:]

    index = text.index(fallback_anchor)
    insert_at = index + len(fallback_anchor) if after else index
    return text[:insert_at] + "\n" + wrapped + text[insert_at:]


def remove_marker(text: str, slug: str) -> str:
    start_marker = f"<!-- transcript:{slug}:start -->"
    end_marker = f"<!-- transcript:{slug}:end -->"
    if start_marker not in text or end_marker not in text:
        return text
    start = text.index(start_marker)
    end = text.index(end_marker, start) + len(end_marker)
    return text[:start] + text[end:]


def after_section(text: str, section_id: str) -> str:
    section_start = text.index(f'<section id="{section_id}"')
    return text.index("</section>", section_start) + len("</section>")


def inject_pages(rendered: dict[str, str]) -> None:
    index_path = SRC_DIR / "index.html"
    text = index_path.read_text(encoding="utf-8")
    anchor = '<p class="page3__project-meta">Diffusion : Forum des images, <a href="https://youtu.be/Le2Ybd_X6A0?si=hi0dl2k455NCpaog" target="_blank" rel="noopener noreferrer">Galerie Joseph</a></p>'
    text = replace_or_insert(text, "galerie-joseph", rendered["galerie-joseph"], anchor)
    index_path.write_text(update_css_version(text), encoding="utf-8")

    for page, section_id, slug in (
        ("dessine-moi-le-vent.html", "page-45", "dessine-moi-le-vent"),
        ("voyage-autour-de-moi.html", "page-42", "voyage-autour-de-moi"),
        ("monroe-roman-graphique.html", "roman-graphique-video", "roman-graphique"),
        ("experience-monroe.html", "page-11", "experience-monroe"),
        ("monroe-piece.html", "la-piece-video", "la-piece"),
        ("monroe-installation.html", "installation-video", "installation-galerie-joseph"),
        ("monroe-experiences.html", "estrade-video", "estrade-marilyn"),
        ("monroe-interviews.html", "interviews-videos", "interview-gombeaud-montagner"),
        ("monroe-interviews.html", "interviews-videos", "interview-amy-greene"),
    ):
        path = SRC_DIR / page
        text = path.read_text(encoding="utf-8")
        if f"<!-- transcript:{slug}:start -->" in text:
            text = replace_or_insert(text, slug, rendered[slug], "")
        else:
            insert_at = after_section(text, section_id)
            text = text[:insert_at] + "\n" + marker(slug, rendered[slug]) + text[insert_at:]
        path.write_text(update_css_version(text), encoding="utf-8")

    podcasts_path = SRC_DIR / "monroe-podcasts.html"
    text = podcasts_path.read_text(encoding="utf-8")
    podcast_block = "\n".join(rendered[slug] for slug in PAGE_TARGETS["src/monroe-podcasts.html"])
    text = remove_marker(text, "podcasts")
    insert_at = after_section(text, "page-33")
    wrapped_podcasts = marker(
        "podcasts",
        (
            '<section class="media-transcripts media-transcripts--podcasts" '
            'aria-labelledby="podcasts-transcripts-title">\n'
            '    <h2 id="podcasts-transcripts-title" class="media-transcripts__title">Transcriptions des podcasts</h2>\n'
            f"{podcast_block}\n"
            "</section>"
        ),
    )
    text = text[:insert_at] + "\n" + wrapped_podcasts + text[insert_at:]
    podcasts_path.write_text(update_css_version(text), encoding="utf-8")


def update_css_version(text: str) -> str:
    return re.sub(r"css/style\.css\?v=[0-9a-z-]+", f"css/style.css?v={CSS_VERSION}", text)


def main() -> int:
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_sources(timestamp)
    rendered = write_public_files(timestamp)
    inject_pages(rendered)
    print(f"Transcripts publics générés : {len(rendered)}")
    print(f"Dossier : {PUBLIC_DIR.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
