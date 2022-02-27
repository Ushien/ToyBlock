function introtext1(){
        return(<div>
                Au beau milieu de la forêt se trouve un village...
        </div>
        )
}

function introtext2(){
        return(<div>
                Peuplé de petits animaux sympathiques...
        </div>
        )
}

function introtext3(){
        return(<div>
                <div>
                Les pommes de pin ça prend beaucoup de place dans les poches... Et si on créait une vraie monnaie ?
                </div>
                <div>
                Êtes-vous prêt à leur donner un coup de main ?
                </div>
        </div>

        )
}

function introtext4(){
        return(<div>
                Commençons par choisir un nom pour cette monnaie révolutionnaire. Sois créatif ! :
        </div>
        )
}

function text1(){
        return(<div>
                <div>
                Le chef du village achète un carnet qui répertorie chaque transaction, afin de pouvoir déduire automatiquement 
                combien chaque habitant peut encore dépenser. 
                Les animaux le préviennent qu’ils veulent faire une transaction, et il l’écrit pour eux.
                </div> 

                <div class ="problem">
                Problème:
                </div>
                <div>
                Si quelqu’un de malhonnête accède au carnet du chef, la liste de transactions pourrait être modifiée, voire 
                pire : brûlée !
                </div>
        </div>
        )
        // On place la machine 1 (carnet) avant le problème
}

function text2(moneyname){
        return(<div>
                <div>
                Utilisons le même système de carnets, mais donnons un carnet à chaque habitant qui veut pouvoir échanger sa 
                monnaie. Une fois que 2 animaux se sont mis d’accord sur une transaction, ils l’écrivent dans leur fichier 
                propre, et envoient une lettre à tous les habitants du village : « Attention, inscrivez que Pingouin a 
                donné 2 {moneyname}s à Paresseux ». Dès que quelqu'un reçoit une transaction par lettre, il l'inscrit dans son 
                propre carnet.
                </div> 
                <div class ="problem">
                Problème:
                </div>
                <div>
                Renard a vite besoin d’argent pour acheter une tarte. Il écrit dans une lettre : « Inscrivez tous que Grenouille 
                m’a donné 100 {moneyname}s ! ». Le reste du village reçoit la lettre, et ils copient la transaction dans leur 
                carnet. 
                N’importe qui peut inscrire des transactions fausses et le reste du village va les copier !
                </div>
        </div>

        )
}

function text3(moneyname){
        return(<div>
                <div>
                Chaque nouvel habitant qui souhaite rejoindre le système reçoit 2 choses : 
                1 : Un modèle de serrure personnelle top secrète.
                2 : Un trousseau de clés, une pour chaque habitant du village.
                Avant d’écrire une transaction dans une lettre, et de la transmettre, Pingouin sécurise sa lettre en la mettant 
                dans un coffre, avec sa serrure propre. Personne d’autre ne peut réaliser la même serrure que lui. Pour savoir 
                qui a envoyé la lettre, ils testent toutes les clés qu’ils possèdent et comprennent vite que, vu que la clé de 
                pingouin fonctionne, ça ne peut être que Pingouin qui a rédigé cette transaction. Une fois que la lettre est 
                transmise, à l’intérieur de son coffre, les animaux la copient dans leur carnet.
                </div> 
                <div class ="problem">
                Problème:
                </div>
                <div>
                Cette fois-ci, Renard a envie d’un cookie, et d’un jus de fruits, coûtant 5 {moneyname}s chacun ! Problème : 
                Renard est presque à sec, il ne lui reste que 5 {moneyname}s. Pourtant, il a très envie d’acheter les deux 
                douceurs. Il trouve une stratégie.
                Renard prépare 2 lettres : L’une d’elle dit qu’il a dépensé 5 {moneyname}s dans un cookie, l’autre qu’il les 
                a dépensés dans un jus de fruit. Il les enferme dans leur coffre, avec la serrure renard. Il commence par 
                acheter un cookie d'un côté du village, envoie sa première lettre, et court vite de l’autre côté pour acheter 
                un jus de fruit, et envoyer la deuxième.
                Pingouin reçoit d’abord la première lettre. Il vérifie dans son carnet, et voit que Renard a acheté un cookie 
                avec ses 5 derniers {moneyname}s. Il note l’info, et retransmet la lettre au reste du village. Pendant 
                ce temps-là, de l’autre côté, Paresseux reçoit la lettre numéro 2. Il vérifie, selon son carnet, Renard 
                possède encore 5 {moneyname}s. Il ne voit donc aucun problème à inscrire la transaction !
                Ca y est, Renard a réussi à mettre des infos contradictoires en circulation dans le village.
                </div>
        </div>          

        // Dessin serrures coffre ?
        )
}

function text4(moneyname){
        return(<div>
                <div>
                Solution : Listes d’attentes
                On donne à chaque habitant, en plus de son carnet, un petit tableau et une craie pour noter les transactions 
                en attente de validation. Dès que Pingouin reçoit une transaction dans une lettre, il l’écrit, non plus dans 
                son carnet, mais à la craie sur son petit tableau. Ainsi, tous les jours à 18 heures, le chef du village 
                choisit une liste d’attente au hasard, par exemple celle de Paresseux, et fait une annonce au village pour 
                dire que la liste d’attente de paresseux a été choisie comme liste officielle. Après ça, tout le monde recopie 
                les transactions de cette liste d’attente dans son carnet. Une fois que c'est fait, tout le monde efface son 
                tableau et on est sûrs que tout le monde possède exactement la même liste.
                </div> 
                <div class ="problem">
                Problème:
                </div>
                <div>
                Renard pourrait écrire des informations fausses sur son tableau. Il pourrait par exemple inscrire que tout le 
                monde lui a donné 100 {moneyname}s, et il existe une petite chance qu’il soit un jour choisi au hasard. 
                Tout le monde recopierait des informations fausses !
                </div>
        </div>         
        )
}

function text5(){
        return(<div>
                <div>
                Le village se met d’accord sur un nouveau système. Chaque tableau noir possède, en plus de sa liste d’attente, 
                un chiffre, commun à tout le monde. Ce chiffre s’appelle l’identifiant. 
                Imaginons que tout le monde reçoive le chiffre 10.
                Le chef du village annonce une règle : « Le premier qui trouve l’identifiant suivant gagne le droit d’imposer 
                sa liste d’attente à tout le reste du village ! »
                Il ajoute : « Pour trouver l’identifiant suivant, il suffit de multiplier l’identifiant actuel par 8 »
                Tous les habitants savent que Renard veut inscrire des bêtises dans les transactions, donc ils se pressent tous 
                pour être le premier à réussir la multiplication. Paresseux finit par trouver le résultat, après quelques minutes 
                de recherche. Il écrit immédiatement le nombre qu’il a trouvé : 80, et sa liste d’attente sur le panneau 
                d’affichage du village. Pingouin était en train de calculer, mais il voit l’annonce. Il vérifie, et voit très 
                vite que, effectivement, l’identifiant trouvé par Paresseux est correct. Tout le monde arrive à la même 
                conclusion, et la liste d’attente de Paresseux est donc recopiée par tout le village. 
                Pour connaître qui sera le prochain à imposer sa liste, le village prend l’identifiant trouvé par Paresseux comme 
                nouvel identifiant. Ce sera donc celui qui trouve 80 multiplié par 8 qui pourra proposer sa liste. Et cetera !
                On a donc créé des listes d’attentes liées entre elles par leur identifiant, comme les maillons d’une chaîne. 
                Chaque liste d’attente représente un bloc, on vient donc de créer ce qui s’appelle une blockchain.
                </div> 
                <div class ="problem">
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

function text6_1(){
        return(<div>
                <div>
                Le chef du village décide de débloquer un peu de budget, et il offre un ordinateur à chaque habitant du village 
                un ordinateur avec un programme de hashage !

                Comme vu juste avant, un identifiant et une liste de transactions forment donc un bloc. On colle ces deux 
                éléments à un nombre inconnu appelé le nonce. Ensemble, ils forment un gros texte !
                L’objectif est simple, il faut hasher le texte formé par ces 3 données, et trouver un nouveau texte qui respecte 
                une condition fixée. Par exemple, le chef annonce : « Le résultat du hashage doit débuter par abc ! »
                Par exemple, le résultat abc55cc22 serait un résultat satisfaisant.
                Comme il est impossible de retrouver un texte initial à partir d’un résultat de hashage, il n’y a qu’une seule 
                possibilité pour résoudre ce problème : Tester toutes les valeurs possibles pour le nonce, et regarder si le 
                hashage correspondant respecte la règle mise en place, le plus vite possible.
                </div> 
                <div>
                Si un habitant trouve un nombre acceptable, on appelle alors cela la proof of work, il gagne le droit de 
                transmettre sa liste d’attente à tout le village. Le résultat du hashage, lui, devient l’identifiant du bloc 
                suivant.  
                La fraude devient pratiquement impossible, car Renard n’a pas le temps de tester des nombres au hasard toute la 
                journée. Et même s’il le faisait, il a peu de chances de tomber dessus.
                Cette solution permet aussi d’empêcher la modification de transactions déjà validées, car la moindre lettre 
                changée modifierait le résultat du hashage, et donc tous les identifiants des blocs suivants.
                </div>
                <div class ="problem">
                Problème:
                </div>
                <div>
                Problème : 
                Pingouin est content du système, mais passer sa journée à faire des calculs ne le motive pas vraiment…
                </div>
        </div>             
        )
}

function text6(){
        return(<div>
                Pour nous aider à résoudre ce problème, nous aurons besoin du hashage :
                Le hashage, c’est un procédé informatique qui consiste à transformer de manière automatique un texte, grand ou 
                moyen en une suite de chiffres et lettres de taille fixe. C'est un peu comme si on associait à une phrase 
                précise un code secret unique ! On peut comparer ça à une sorte d'empreinte digitale : Il est impossible de 
                deviner l'identité de quelqu'un sur base de son empreinte digitale, si la personne ne l'a jamais partagée. Par 
                contre, une fois qu'on lui a demandé son empreinte digitale, on sait que cette empreinte digitale appartient à 
                lui et à lui seul.
                De la même manière, si on nous donne un hashage au hasard, il est impossible de retrouver le texte initial. 
                C’est très utile, car cela a plein d’utilisations: par exemple, on peut vérifier facilement qu'un texte n'a pas 
                été modifié. Au lieu de comparer les textes lettres par lettres, il suffit de chacun les hasher, et voir si les 
                résultats sont identiques. La moindre lettre de différence dans le texte de base aurait complètement changé le 
                hashing de celui-ci !

        </div>        
        )
}

// On place la machine de hashage

function text7(moneyname){
        return(<div>
                <div>
                Le chef du village réagit : Après chaque cycle, l’habitant ayant fourni la proof of work recevra 10 {moneyname}s 
                créés juste pour lui, qu’il peut dépenser comme il l’entend. Ainsi, cela motive les habitants à lutter pour la 
                sécurité de tous !
                </div> 
                <div class ="problem">
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

function text8(){
        return(<div>
                <div>
                Au lieu de travailler tout seul, des habitants du village décident de former une équipe et s’organiser pour 
                avoir plus de chance de trouver la proof of work. Ils se répartissent la tâche pour optimiser leurs chances, 
                et se partagent les gains en cas de réussite. Par exemple, Grenouille se charge des identifiants commençant par 5, 
                et Paresseux se charge des identifiants commençant par 6. Leur temps est mieux utilisé car ils sont garantis de 
                ne jamais tester le même nombre qu’un autre du groupe a déjà testé ! Les membres du groupes gagnent donc plus 
                souvent, mais les gains sont partagés.
                </div> 
        </div>        
        )
}

function text9(){
        return(<div>
                <div>
                Cela a pris du temps... Mais finalement, l'entièreté du village semble avoir trouvé une solution qui leur 
                convient. Le système de Blockchain en proof en work fonctionne du tonnerre et on n'entend plus beaucoup parler 
                de Renard. Le Chef du village tient à vous remercier pour votre aide et organise une grande fête en votre 
                honneur ! Félicitations !
                </div> 
        </div>        
        )
        // Dessin fête
}

export {introtext1, introtext2, introtext3, introtext4, text1, text2, text3, text4, text5, text6, text6_1, text7, text8, text9}