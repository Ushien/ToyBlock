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
                Commencons par choisir un nom pour cette monnaie révolutionnaire: 
        </div>
        )
}

function text1(){
        return(<div>
                <div>
                Le chef du village achète un carnet qui répertorie chaque transaction, afin de pouvoir déduire automatiquement combien chaque habitant peut encore dépenser. 
                Les animaux le préviennent qu’ils veulent faire une transaction, et il l’écrit pour eux.
                </div> 
                <h2>
                Problème:
                </h2>
                <div>
                Si quelqu’un de malhonnête accède à son carnet, la liste de transactions pourrait être modifiée, voire pire : brûlée !
                </div>
        </div>
        )
}

function text2(moneyname){
        return(<div>
                <div>
                Donnons un carnet à chaque habitant qui veut pouvoir échanger sa monnaie. Une fois que 2 animaux se sont mis d’accord sur une transaction, ils l’écrivent dans leur fichier propre, et envoient une lettre à tous les habitants du village : « Attention, inscrivez que Pingouin a donné 2 {moneyname}s à Paresseux ». Tout le monde le note dans son propre carnet.
                </div> 
                <h2>
                Problème:
                </h2>
                <div>
                Renard a vite besoin d’argent pour acheter une tarte. Il écrit dans une lettre : « Inscrivez tous que Grenouille m’a donné 100 {moneyname}s ! ». Le reste du village reçoit la lettre, et ils copient la transaction dans leur carnet. 
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
                2 : Un trousseau de clé, une pour chaque habitant du village.
                Avant d’écrire une transaction dans une lettre, et de la transmettre, Pingouin sécurise sa lettre en la mettant dans un coffre, avec sa serrure propre. Personne d’autre ne peut réaliser la même serrure que lui. Pour savoir qui a envoyé la lettre, ils testent toutes les clés qu’ils possèdent et comprennent vite que, vu que la clé de pingouin fonctionne, ça ne peut être que Pingouin qui a rédigé cette transaction. Une fois que la lettre est transmise, à l’intérieur de son coffre, les animaux la copient dans leur carnet.
                </div> 
                <h2>
                Problème:
                </h2>
                <div>
                Cette fois-ci, Renard a envie d’un cookie, et d’un jus de fruits, coûtant 5 {moneyname}s chacun ! Problème : Renard est presque à sec, il ne lui reste que 5 {moneyname}s. Pourtant, il a très envie d’acheter les deux douceurs. Il trouve une stratégie.
                Renard prépare 2 lettres : L’une d’elle dit qu’il a dépensé 5 {moneyname}s dans un cookie, l’autre qu’il les a dépensés dans un jus de fruit. Il les enferme dans leur coffre, avec la serrure renard. Il envoie sa première lettre à un coin du village, et court vite de l’autre côté pour envoyer la deuxième.
                Pingouin reçoit d’abord la première lettre. Il vérifie dans son carnet, et voit que Renard a acheté un cookie avec ses 5 derniers {moneyname}s. Il note l’info, et retransmet la lettre au reste du village. Pendant ce temps-là, de l’autre côté, Paresseux reçoit la lettre numéro 2. Il vérifie, selon son carnet, Renard possède encore 5 {moneyname}s. Il ne voit donc aucun problème à inscrire la transaction !
                Ca y est, Renard a réussi à mettre des infos contradictoires en circulation dans le village.
                </div>
        </div>          
        )
}

function text4(){
        return(<div>
                <div>
                Solution : Listes d’attentes
                On donne à chaque habitant, en plus de son carnet, un petit tableau et une craie pour noter les transactions en attende de validation. Dès que Pingouin reçoit une transaction dans une lettre, il l’écrit, non plus dans son carnet, mais sur son petit tableau. Ainsi, tous les jours à 18 heures, le chef du village choisit une liste d’attente au hasard, par exemple celle de Paresseux, et fait une annonce au village pour dire que la liste d’attente de paresseux a été choisie comme liste officielle, et tout le monde recopie les transactions de cette liste d’attente dans son carnet. Après ça, tout le monde efface son tableau.
                </div> 
                <h2>
                Problème:
                </h2>
                <div>
                Renard pourrait écrire des informations fausses sur son tableau, et il existe une petite chance qu’il soit un jour choisi au hasard. Tout le monde recopierait des informations fausses !
                </div>
        </div>         
        )
}

function text5(){
        return(<div>
                <div>
                Le village se met d’accord sur un nouveau système. Chaque tableau noir possède, en plus de sa liste d’attente, un chiffre, commun à tout le monde. Ce chiffre s’appelle l’identifiant. 
                Imaginons que tout le monde reçoive le chiffre 10.
                Le chef du village annonce une règle : « Le premier qui trouve l’identifiant suivant gagne le droit d’imposer sa liste d’attente à tout le reste du village ! »
                Il ajoute : « Pour trouver l’identifiant suivant, il suffit de multiplier l’identifiant actuel par 20 »
                Tous les habitants savent que Renard veut inscrire des bêtises dans les transactions, donc ils se pressent tous pour être le premier à réussir la multiplication. Paresseux finit par trouver le résultat, après quelques minutes de recherche. Il écrit immédiatement le nombre qu’il a trouvé : 80, et sa liste d’attente sur le panneau d’affichage du village. Pingouin était en train de calculer, mais il voit l’annonce. Il vérifie, et voit très vite que, effectivement, l’identifiant trouvé par Paresseux est correct. Tout le monde arrive à la même conclusion, et la liste d’attente de Paresseux est donc recopiée par tout le village. 
                Pour connaître qui sera le prochain à imposer sa liste, le village prend l’identifiant trouvé par Paresseux comme nouvel identifiant. Ce sera donc celui qui trouve 80 multiplié par 20 qui pourra proposer sa liste. Et cetera !
                On a donc créé des listes d’attentes liées entre elles par leur identifiant, comme les maillons d’une chaîne. Chaque liste d’attente représente un bloc, on vient donc de créer ce qui s’appelle une blockchain.
                </div> 
                <h2>
                Problème:
                </h2>
                <div>
                Le calcul proposé par le chef du village est un peu facile… Comme Renard est malin, il calcule à l’avance tous les résultats, en peut désormais proposer des listes d’attentes fausses.
                </div>
        </div>              
        )
}

function text6(){
        return(<div>
                <div>
                Pour nous aider à résoudre ce problème, nous aurons besoin du hashage :
                Le hashage, c’est un procédé informatique qui consiste à transformer de manière automatique un texte, grand ou moyen en un court nombre de taille fixe. Un peu comme un magasin représente tous les produits de son stock par un petit code-barre.
                Le hashage a également une spécificité supplémentaire : Une fois que l’on a hashé un texte, il est impossible de calculer le texte initial à partir du résultat. C’est très utile, car cela a plein d’utilisations pour partager des infos de manière sécurisée.
                Le chef du village décide de débloquer un peu de budget, et il offre un ordinateur à chaque habitant vu village un ordinateur avec un programme de hashage !

                Comme vu juste avant, un identifiant et une liste de transactions forment donc un bloc. On colle ces deux éléments à un nombre inconnu appelé le nonce. Ensemble, ils forment un gros texte !
                L’objectif est simple, il faut hasher le texte formé par ces 3 données, et trouver un nombre qui respecte une condition fixée. Par exemple, le chef annonce : « Le résultat du hashage doit débuter par 5555 ! »
                Par exemple, le résultat 55550044 serait un résultat satisfaisant.
                Comme il est impossible de retrouver un texte initial à partir d’un résultat de hashage, il n’y a qu’une seule possibilité pour résoudre ce problème : Tester toutes les valeurs possibles pour le nonce, et regarder si le hashage correspondant respecte la règle mise en place, le plus vite possible.
                </div> 
                <div>
                Si un habitant trouve un nombre acceptable, on appelle alors cela la proof of work, il gagne le droit de transmettre sa liste d’attente à tout le village. Le résultat du hashage, lui, devient l’identifiant du bloc suivant.  
                La fraude devient pratiquement impossible, car Renard n’a pas le temps de tester des nombres au hasard toute la journée. Et même s’il le faisait, il a peu de chances de tomber dessus.
                Cette solution permet aussi d’empêcher la modification de transactions déjà validées, car le moindre chiffre changé modifierait le résultat du hashage, et donc tous les identifiants des blocs suivants.
                </div>
                <h2>
                Problème:
                </h2>
                <div>
                Problème : 
                Pingouin est content du système, mais tester des nombres toute la journée ne le motive pas vraiment…
                </div>
        </div>             
        )
}

function text7(moneyname){
        return(<div>
                <div>
                Le chef du village réagit : Après chaque cycle, l’animal ayant fourni la proof of work recevra 10 {moneyname}s créés juste pour lui, qu’il peut dépenser comme il l’entend. Ainsi, cela motive les habitants à lutter pour la sécurité de tous !
                </div> 
                <h2>
                Problème:
                </h2>
                <div>
                Le village grandit et le système {moneyname} a beaucoup de succès ! Mais il grandit tellement, qu’au final, Pingouin n’arrive plus jamais à trouver le nombre. Quelqu’un de plus rapide réussit toujours avant lui.
                </div>
        </div>        
        )
}

function text8(){
        return(<div>
                <div>
                Au lieu de travailler tout seul, des quartiers du village décident de former une équipe et s’organiser pour avoir plus de chance de trouver la proof of work. Ils se répartissent la tâche pour optimiser leurs chances, et se partagent les gains en cas de réussite. Leur temps est mieux utilisé car ils sont garantis de ne jamais tester le même nombre qu’un autre du groupe a déjà testé ! Les membres du groupes gagnent donc plus souvent, mais la somme est partagée.
                </div> 
        </div>        
        )
}

export {introtext1, introtext2, introtext3, introtext4, text1, text2, text3, text4, text5, text6, text7, text8}