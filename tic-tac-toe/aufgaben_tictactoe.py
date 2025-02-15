

def starte_spiel():
    spielfeld = [[" " for i in range(3)] for i in range(3)]
    aktueller_spieler = "X"

    def get_integer_input(prompt):
        while True:
            try:
                input1 = int(input(prompt))
                return input1
            except ValueError:
                print("Bitte gib eine Zahl ein!")

    def zeichne_spielfeld(spielfeld): 
        for i in spielfeld:
            print(" | ".join(i))
            print("-" * 9)
    
    def spielfeld_voll(spielfeld):
        for i in spielfeld: 
            if " " in i:
                return False
        return True
    
    def ueberpruefe_gewinner(spieler):
        for zeile in spielfeld:
            if zeile.count(spieler) == 3:
                return True
        for spalte in range(3):
            if (spielfeld[0][spalte] == spieler and
                spielfeld[1][spalte] == spieler and
                spielfeld[2][spalte] == spieler):
                return True
        if  all(spielfeld[i][i] == spieler for i in range(3)) or\
            all(spielfeld[i][2 - i] == spieler for i in range(3)): 
            return True
        return False

    while True:
        try:
            print(f"Spieler {aktueller_spieler} du bist dran!")
            zeile = int(input("Gib die Zeile (1, 2 oder 3) an")) -1
            spalte = int(input("Gib die Spalte (1, 2 oder 3) ein")) -1
            if zeile not in range(3) or spalte not in range(3):
                print("Gib eine Zahl zwischen 1 und 3 ein")
                continue
            if spielfeld[zeile][spalte] != " ":
                print("Dieses Feld ist bereits belegt")
                continue
            spielfeld[zeile][spalte] = aktueller_spieler
            zeichne_spielfeld(spielfeld)
            if spielfeld_voll(spielfeld):
                print("Das Spielfeld ist voll. Unentschieden.")
                break
            if ueberpruefe_gewinner(spielfeld, aktueller_spieler):
                print(f"Herzlichen Glückwunsch {aktueller_spieler}, du hast gewonnen!")
                break
            
            aktueller_spieler = "O" if aktueller_spieler == "X" else "X"

        except ValueError:
            print("Bitte gib eine Zahl ein!")
    
    neues_spiel = get_integer_input("Willst du ein neues Spiel starten? 1 für Ja, andere Zahl für Nein:")

    if neues_spiel == 1:
        starte_spiel()
    else:
        print("Spiel beendet")

starte_spiel()