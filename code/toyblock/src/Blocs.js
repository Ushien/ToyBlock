function introtext1() {
        return (<div>
                Au beau milieu de la forêt se trouve un village...
        </div>
        )
}

function introtext2() {
        return (<div>
                Peuplé de petits animaux sympathiques...
        </div>
        )
}

function introtext3() {
        return (<div>
                <div>
                        Les pommes de pin ça prend beaucoup de place dans les poches... Et si on créait une vraie monnaie ?
                </div>
                <div>
                        Êtes-vous prêt à leur donner un coup de main ?
                </div>
        </div>

        )
}

function introtext4() {
        return (<div>
                Commençons par choisir un nom pour cette monnaie révolutionnaire. Sois créatif ! :
        </div>
        )
}

function text1(moneyname) {
        return (<div>
                Le chef du village achète un carnet qui répertorie chaque transaction, afin de pouvoir déduire automatiquement
                combien chaque habitant peut encore dépenser. Comment ? Il lui suffit de savoir le nombre de {moneyname}s qu'ils avaient au départ, et ensuite de retracer leurs transactions.<br/>
                Les animaux le préviennent qu’ils veulent faire une transaction, et lui s'occupe de l'écrire pour eux.
        </div>
        )
}

// On place la machine 1 (carnet) avant le problème

function text1_1() {
        return (<div>
                <div class="problem">
                        Problème:
                </div>

                <div>
                        Si quelqu’un de malhonnête accède au carnet du chef, <b>la liste de transactions pourrait être modifiée</b>, voire
                        pire : brûlée !
                </div>
        </div>
        )
}

function text2(moneyname) {
        return (<div>
                <div>
                        Utilisons le même système de carnets, mais <b>donnons un carnet à chaque habitant qui veut pouvoir échanger sa
                        monnaie</b>. Une fois que 2 animaux se sont mis d’accord sur une transaction, ils l’écrivent dans leur fichier
                        propre, et envoient une lettre à tous les habitants du village : <br/>« Attention, inscrivez que Pingouin a
                        donné 2 {moneyname}s à Paresseux ». <br/>Dès que quelqu'un reçoit une transaction par lettre, il l'inscrit dans son
                        propre carnet, <b>de cette manière, tout le monde possède la même liste</b>, et si quelqu'un perd la sienne, les autres peuvent l'aider à la réécrire.
                </div>
                <div class="problem">
                        Problème:
                </div>
                <div>
                        Renard a vite besoin d’argent pour acheter une tarte. Il écrit dans une lettre : « Inscrivez tous que Grenouille
                        m’a donné 100 {moneyname}s ! ». Le reste du village reçoit la lettre, et ils copient la transaction dans leur
                        carnet.<br/>
                        Quel est le problème ? <b>N’importe qui peut inscrire des transactions fausses</b> et le reste du village va les copier !
                </div>
        </div>

        )
}

function text3(moneyname) {
        // Dessin coffrets serrures
        return (<div>
                <div>
                        Chaque nouvel habitant qui souhaite rejoindre le système reçoit 2 choses :
                        Premièrement, <b>un modèle de serrure personnelle top secrète</b>.
                        Deuxièmement, <b>un trousseau de clés</b>, avec une clé propre à chaque habitant du village.<br/>
                        Avant d’écrire une transaction dans une lettre, et de la transmettre, Pingouin sécurise sa lettre en la mettant
                        dans un petit coffret, avec sa serrure propre. Personne d’autre ne peut réaliser la même serrure que lui. Pour s'assurer 
                        que c'est bien Pingouin qui a écrit cette lettre, ils testent toutes les clés qu’ils possèdent et comprennent vite que, 
                        vu que seule la clé de Pingouin fonctionne, <b>ça ne peut être que Pingouin qui a rédigé cette transaction</b> ! <br/>
                        Avec ce système, plus d'arnaque, on sait que la personne qui rédigé la transaction était bien d'accord de le faire.
                </div>

        </div>
        )
}

function text3_1(moneyname) {
        return (<div>
                <div class="problem">
                        Problème:
                </div>
                <div>
                        Cette fois-ci, Renard a envie d’un cookie, et d’un jus de fruits, coûtant 5 {moneyname}s chacun ! Mais mauvaise nouvelle :
                        Renard est presque à sec, il ne lui reste que 5 {moneyname}s. Pourtant, il a très envie d’acheter les deux
                        douceurs. Il trouve finalement une nouvelle stratégie.<br/>
                        Renard prépare 2 lettres : L’une d’elle dit qu’il a dépensé 5 {moneyname}s dans un cookie, l’autre qu’il les
                        a dépensés dans un jus de fruit. Il les enferme dans leur coffret respectif, avec la serrure renard. Il commence par
                        acheter un cookie d'un côté du village, envoie sa première lettre, et <b>court vite de l’autre côté</b> pour acheter
                        un jus de fruit, et envoyer la deuxième enveloppe, dans son coffret.<br/>
                        Pingouin reçoit d’abord la première lettre. Il vérifie dans son carnet, et voit que Renard a acheté un cookie
                        avec ses 5 derniers {moneyname}s. Pas d'arnaque en vue ! Il note l’info, et retransmet la lettre au reste du village. Pendant
                        ce temps-là, de l’autre côté, Chat reçoit la lettre numéro 2. Il vérifie, selon son carnet, Renard
                        possède encore 5 {moneyname}s. Il ne voit donc aucun problème à inscrire la transaction !<br></br>
                        <b>Ca y est, Renard a réussi à mettre des infos contradictoires en circulation dans le village</b>.
                </div>
        </div>
        )
}

// Machine 2

function text4(moneyname) {
        return (<div>
                <div>
                        Voilà la solution à tout ce bazar : <b>Les listes d’attentes</b><br/>
                        On donne à chaque habitant, en plus de son carnet, un petit tableau et une craie pour noter les transactions
                        en attente de validation. Dès que Pingouin reçoit une transaction dans une lettre, il l’écrit, <b>non plus dans
                        son carnet</b>, mais à la craie sur son petit tableau. Ainsi, tous les jours à 18 heures, le chef du village
                        choisit une liste d’attente au hasard, par exemple celle de Paresseux, et fait une annonce au village pour
                        dire que la liste d’attente de Paresseux a été choisie comme liste officielle. <br/>
                        Après ça, tout le monde recopie
                        les transactions de cette liste d’attente dans son carnet. Une fois que c'est fait, tout le monde efface son
                        tableau et on est sûrs que tout le monde possède exactement la même liste.
                </div>
                <div class="problem">
                        Problème:
                </div>
                <div>
                        Renard pourrait écrire des informations fausses sur son tableau. Il pourrait par exemple inscrire que tout le
                        monde lui a donné 100 {moneyname}s, et il existe une petite chance qu’il soit un jour choisi au hasard.<br/>
                        <b>Tout le monde recopierait des informations fausses et le système serait complètment déréglé !</b>
                </div>
        </div>
        )
}

function text5() {
        return (<div>
                <div>
                        Le village se met d’accord sur un nouveau système. Chaque tableau noir possède, en plus de sa liste d’attente,
                        un chiffre, commun à tout le monde. Ce chiffre s’appelle <b>l’identifiant</b>.<br/>
                        Imaginons par exemple que tout le monde reçoive le chiffre 10.
                        Le chef du village annonce une règle : « Le premier qui trouve l’identifiant suivant gagne le droit <b>d’imposer
                        sa liste d’attente à tout le reste du village</b> ! »<br/>
                        Il ajoute : « Pour trouver l’identifiant suivant, il suffit de <b>multiplier l’identifiant actuel par 8</b> »<br/><br/>
                        Tous les habitants savent que Renard veut inscrire des bêtises dans les transactions, donc ils se pressent tous
                        pour être le premier à réussir la multiplication. Paresseux finit par trouver le résultat, après quelques minutes
                        de recherche. Il écrit immédiatement le nombre qu’il a trouvé : 80, ainsi que sa liste d’attente sur le panneau
                        d’affichage du village. <br/>
                        Pingouin était en train de calculer, mais il voit l’annonce. Il vérifie, et voit très
                        vite que, effectivement, l’identifiant trouvé par Paresseux est correct. Tout le monde arrive à la même
                        conclusion, et <b>la liste d’attente de Paresseux est donc recopiée par tout le village</b>.<br/>
                        Pour connaître qui sera le prochain à imposer sa liste, le village prend l’identifiant trouvé par Paresseux comme
                        nouvel identifiant. Ce sera donc celui qui trouve 80 multiplié par 8 qui pourra proposer sa liste en suivant. Et cetera ! <br/><br/>
                        On a donc créé des listes d’attentes liées entre elles par leur identifiant, comme les maillons d’une chaîne.
                        Chaque liste d’attente représente un bloc, <b>on vient donc de créer ce qui s’appelle une blockchain</b>.
                </div>
                <div class="problem">
                        Problème:
                </div>
                <div>
                        Le calcul proposé par le chef du village est un peu facile… Comme Renard est malin, il calcule à l’avance tous
                        les résultats, en peut désormais proposer des listes d’attentes fausses. En bref, c'est l'habitant le plus rapide
                        en calcul qui impose ce qu'il veut, au final.
                </div>
        </div>
        )
}

function text6_1() {
        return (<div>
                <div>
                        Le chef du village décide de débloquer un peu de budget, et il offre à chaque habitant du village
                        <b>un ordinateur avec un programme de hashage !</b><br/>

                        Comme vu juste avant, un identifiant et une liste de transactions forment donc un bloc. On colle ces deux
                        éléments à un nombre inconnu appelé le <b>nonce</b>. Ensemble, ils forment un gros texte !<br/>
                        L’objectif est simple, il faut hasher le texte formé par ces 3 données, et trouver un nouveau texte <b>qui respecte
                        une condition fixée</b>. Imaginons que le chef annonce : « Le résultat du hashage doit débuter par abc ! »
                        Par exemple, le résultat abc55cc22 serait un résultat satisfaisant.<br/>
                        Comme il est impossible de retrouver un texte initial à partir d’un résultat de hashage, il n’y a qu’une seule
                        possibilité pour résoudre ce problème : Tester toutes les valeurs possibles pour le nonce, et regarder si le
                        hashage correspondant respecte la règle mise en place, le plus vite possible.
                </div>
                <div>
                        Si un habitant trouve un nonce acceptable, on appelle alors cela la <b>proof of work</b>, il gagne le droit de
                        transmettre sa liste d’attente à tout le village. Le résultat du hashage, lui, devient l’identifiant du bloc
                        suivant.
                        La fraude devient pratiquement impossible, car Renard n’a pas le temps de tester des nombres au hasard toute la
                        journée. Et même s’il le faisait, il a peu de chances de tomber dessus.
                        Cette solution permet aussi d’empêcher la modification de transactions déjà validées, car la moindre lettre
                        changée modifierait le résultat du hashage, et donc tous les identifiants des blocs suivants.
                </div>
                <div class="problem">
                        Problème:
                </div>
                <div>
                        Problème :
                        Pingouin est content du système, mais passer sa journée à faire des calculs ne le motive pas vraiment…
                </div>
        </div>
        )
}

function text6() {
        return (<div>
                Pour nous aider à résoudre ce problème, nous aurons besoin du <b>hashage</b>. Mais c'est quoi, pour commencer ? <br/>
                Le hashage, c’est un procédé informatique qui consiste à transformer de manière automatique un texte, grand ou
                moyen en <b>une suite de chiffres et lettres de taille fixe</b>. C'est un peu comme si on associait à une phrase précise un code secret unique ! <br/>
                On peut comparer ça à une sorte d'empreinte digitale : Il est impossible de
                deviner l'identité de quelqu'un sur base de son empreinte digitale, si la personne ne l'a jamais partagée. Par
                contre, on sait que son empreinte digitale, quelle qu'elle soit, appartient lui et à lui seul, et on peut donc s'en servir pour le reconnaître.
                De la même manière, si on nous donne un hashage au hasard, <b>il est impossible de retrouver le texte initial</b>.<br/><br/>
                C’est très utile, car cela a plein d’utilisations: par exemple, on peut vérifier facilement qu'un texte n'a pas
                été modifié. Au lieu de comparer les textes lettres par lettres, il suffit de chacun les hasher, et voir si les
                résultats sont identiques. La moindre lettre de différence dans le texte de base aurait complètement changé le
                hashing de celui-ci !<br/><br/>
                Voilà ce qui est important à comprendre: Il est très facile de hasher un mot, mais il est très compliqué de 
                trouver quel mot est à l'origine d'un hashage. <br/>
                <b>La seule solution, c'est tout simplement d'essayer des mots au hasard jusqu'à trouver un mot qui correspond.</b>
        </div>
        )
}

// On place la machine de hashage

function text7(moneyname) {
        return (<div>
                <div>
                        Le chef du village réagit : Après chaque cycle, l’habitant ayant fourni la proof of work recevra <b>10 {moneyname}s
                        créés juste pour lui</b>, qu’il peut dépenser comme il l’entend. Ainsi, cela motive les habitants à lutter pour la
                        sécurité de tous ! C'est aussi une façon efficace de créer de la monnaie qui pourra circuler chez les nouvelles persones qui rejoignent le système.
                </div>
                <div class="problem">
                        Problème:
                </div>
                <div>
                        Le village grandit et le système {moneyname} a beaucoup de succès ! Mais il grandit tellement, qu’au final,
                        Pingouin n’arrive plus jamais à trouver d'identifiant. Quelqu’un de plus rapide réussit toujours avant lui.
                        Il n'est plus très motivé...
                </div>
        </div>
        )
}

function text8() {
        return (<div>
                <div>
                        Au lieu de travailler tous seuls, les habitants du village décident de former des équipe et de s’organiser pour
                        avoir plus de chance de trouver la proof of work. Ils se répartissent la tâche pour optimiser leurs chances,
                        <b>et se partagent les gains en cas de réussite</b>. Par exemple, Grenouille se charge des identifiants commençant par 5,
                        et Paresseux se charge des identifiants commençant par 6. Leur temps est mieux utilisé car <b>ils sont garantis de
                        ne jamais tester le même nombre qu’un autre du groupe a déjà testé</b> ! Les membres du groupes gagnent donc plus
                        souvent, mais les gains sont partagés.
                </div>
        </div>
        )
}

function text9() {
        return (<div>
                <div>
                        Cela a pris du temps... Mais finalement, l'entièreté du village semble avoir trouvé une solution qui leur
                        convient. Le système de Blockchain en proof en work fonctionne du tonnerre et on n'entend plus beaucoup parler
                        de Renard. Le Chef du village tient à vous remercier pour votre aide et organise une grande fête en votre
                        honneur ! <b>Félicitations</b> !
                </div>
        </div>
        )
        // Dessin fête
}

export {
        introtext1,
        introtext2,
        introtext3,
        introtext4,
        text1, text1_1,
        text2,
        text3, text3_1,
        text4,
        text5,
        text6, text6_1,
        text7,
        text8,
        text9
}