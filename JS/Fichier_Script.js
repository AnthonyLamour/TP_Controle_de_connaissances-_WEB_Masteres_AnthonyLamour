//SetNewFocusOn sert à seter le focus sur un nouvel élément à partir de l'id passé en paramètre
function SetNewFocusOn(IDElementToFocus){
    
    //set du focus sur le nouvel élément
    document.getElementById(IDElementToFocus).focus();
    
}

//ValideDate sert à valider la date entré par l'utilisateur
function ValideDate(){
 
    //Jour correspond au jour choisi par l'utilisateur
    Jour=document.getElementById("JourNaissance").value;
    //Mois correspond au mois choisi par l'utilisateur
    Mois=document.getElementById("MoisNaissance").value;
    //Annee correspond à l'année choisi par l'utilisateur
    Annee=document.getElementById("AnneeNaissance").value;
    
    //NbJourParMois correspond à une liste du nombre de jour en fonction du mois ici Janvier sera donc 0
    NbJourParMois=[31,28,31,30,31,30,31,31,30,31,30,31];
    
    //Si l'année est bissextile alors...
    if ( (!(Annee % 4) && Annee % 100) || !(Annee % 400)) 
    {
        //...on modifie NbJourParMois pour Février
        NbJourParMois[1]=29;
    }
    
    //Si le mois est valide alors...
    if(Mois>0 && Mois<12){
    
        //...si le jour choisi n'existe pas alors...
        if (Jour>NbJourParMois[Mois-1])
        {
            //... on l'affiche à l'utilisateur
            document.getElementById("SpanErreurJourNaissance").innerHTML="Veuillez entrer un jour valide.";
            //on vide les champs
            document.getElementById("JourNaissance").value=0;
            document.getElementById("MoisNaissance").value=0;
            document.getElementById("AnneeNaissance").value=0;
            //on renvoie false
            return false;
            
        //sinon...
        }else{
            //... on vide l'érreur
            document.getElementById("SpanErreurJourNaissance").innerHTML="";
            //on renvoie true
            return true;
        }
    
    //sinon...
    }else{
        
        //... on l'affiche à l'utilisateur
        document.getElementById("SpanErreurMoisNaissance").innerHTML="Veuillez entrer un mois valide.";
        //on vide les champs
        document.getElementById("JourNaissance").value=0;
        document.getElementById("MoisNaissance").value=0;
        document.getElementById("AnneeNaissance").value=0;
        //on renvoie false
        return false;
        
    }
    
}

//CalculAge sert à caculer l'Age de la personne
function CalculAge(){
    
    //Si la date est valide alors on exécute la fonction
    if(ValideDate){
        
        //Jour correspond au jour choisi par l'utilisateur
        JourDeNaissance=Number(document.getElementById("JourNaissance").value);
        //Jour correspond au mois choisi par l'utilisateur
        MoisDeNaissance=Number(document.getElementById("MoisNaissance").value);
        //Jour correspond à l'année choisi par l'utilisateur
        AnneDeNaissance=Number(document.getElementById("AnneeNaissance").value);
        
        //DateActuelle correspond à la date actuelle
        DateActuelle = new Date().toISOString().slice(0, 10);
        
        //JourActuel correspond au jour actuel
        JourActuel=Number(DateActuelle.substring(8,10));
        //MoisActuel correspond au mois actuel
        MoisActuel=Number(DateActuelle.substring(5,7));
        //AnneActuel correspond à l'année actuel
        AnneActuel=Number(DateActuelle.substring(0,4));
        
        //Age correspond à l'age de la personne
        Age=AnneActuel-AnneDeNaissance;
        
        //Si le mois de naissance n'est pas passé alors...
        if(MoisActuel<MoisDeNaissance){
            //...Set d'age
            Age=Age-1;
        //sinon si le mois actuel correspond à celui de naissance alors...
        }else if(MoisActuel==MoisDeNaissance){
            //... si le jour est inférieur à celui de naissance alors...
            if(JourActuel<JourDeNaissance){
                //... Set d'age
                Age=Age-1;
            }
        }
        
        //récupération de l'age
        document.getElementById("Age").value=Age;
    }
    
}

//MakeResum sert à faire le résumé des informations de l'utilisateur
function MakeResum(){
    
    //Chaine sera le résumé
    Chaine=""
    
    //Ajout du nom de la personne
    Chaine=Chaine+"Votre Nom est : "+document.getElementById("Nom").value+"\n ";
    //Ajout du prénom de la personne
    Chaine=Chaine+"Votre Prénom est : "+document.getElementById("Prenom").value+"\n ";
    
    //Ajout du sexe de la personne
    if(document.getElementById("RadioHomme").checked==true){
        Chaine=Chaine+"Vous êtes un Homme \n ";
    }else if(document.getElementById("RadioFemme").checked==true){
        Chaine=Chaine+"Vous êtes une Femme \n";
    }else if(document.getElementById("RadioAutre").checked==true){
        Chaine=Chaine+"Vous êtes Autre \n ";
    }
    
    //Ajout de la date de naissance de la personne
    Chaine=Chaine+"Vous êtes né le : "+document.getElementById("JourNaissance").value+"/"+document.getElementById("MoisNaissance").value+"/"+document.getElementById("AnneeNaissance").value+"\n ";
    
    //Ajout de l'age
    if(Age>"0"){
        Chaine=Chaine+"Vous avez "+document.getElementById("Age").value+" ans.\n "
    }else{
        Chaine=Chaine+"Vous naîtré dans "+document.getElementById("Age").value.substring(1,document.getElementById("Age").value.length)+" ans \n ";
    }
    
    //Ajout de la note
    Chaine=Chaine+"Votre note est :"+document.getElementById("Note").value+"/10 \n ";
    
    //envoie dans le formulaire
    document.getElementById("Resume").value=Chaine;
    
}

//ChangeNote sert à changer la note de l'utilisateur
function ChangeNote(note){
    
    document.getElementById("Note").value=note;
    
}

//Reception permet de créer le tableau de valeur
function Reception(){
 
    var TabData=""
    var parameters = location.search.substring(1).split("&");
    var data = "";
    for (x in parameters)
    {
        var temp = parameters[x].split("=");
        thevar = unescape(temp[0]);
        thevalue = unescape(temp[1]);
        thevalue = thevalue.replace("+", " ");
        data += thevar + "=" + thevalue + "<br>";
        console.log(data);
    }
    
    document.getElementById("Nom").innerHTML=(data.substring(data.indexOf("Nom")+4,data.indexOf("Prenom")-3));
    document.getElementById("Prenom").innerHTML=(data.substring(data.indexOf("Prenom")+7,data.indexOf("Radio")-3));
    document.getElementById("Sexe").innerHTML=(data.substring(data.indexOf("RadioSexe")+10,data.length));
    
    /*changement de couleur
    document.body.style.backgroundColor = "red";*/
    
}