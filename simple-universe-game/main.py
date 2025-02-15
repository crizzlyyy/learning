from class_planet import Planet
import time
import os
from class_human import Human
from class_buildings import Building


class Menu:

    list_of_planets = []
    
    def __init__(self):
        self.main_menu()
    
    def create_planet(self):
        name = input("Gib den Namen deines Planeten ein")
        new_planet = Planet(name)
        self.list_of_planets.append(new_planet)
        print(f"Der neue Planet {name} wurde erstellt.")
        time.sleep(3)
        self.main_menu
        

    def show_planets(self):
        print("Aktuelle Planeten")
        if not self.list_of_planets:
            print("Keine Planeten vorhanden")
        else:
            for planet in self.list_of_planets:
                print(planet)

    def clear_console(self):
        os.system("cls")

    def create_human(self):
        while True:
            for index, planet in enumerate(self.list_of_planets):
                print(f"{index} {planet.name}")
            try:
                choose_planet = int(input("Auf welchem Planeten soll dein Mensch erstellt werden?"))
                if 0 <= choose_planet < len(self.list_of_planets):
                    selected_planet = self.list_of_planets[choose_planet]
                else:
                    print("Bitte einen existierenden Planeten auswählen")
                    continue
                new_human = Human(name=input("Name des Menschen: "), age=int(input("Wie alt ist der Mensch: ")), profession=input("Beruf des Menschen: "))
                selected_planet.add_human(new_human)
                time.sleep(3)
                self.main_menu()
            except ValueError:
                print("Bitte Zahl")
            except UnboundLocalError:
                print("Bitte einen existierenden Planeten auswählen")

    def create_building(self):
        while True:
            for index_planet, planet in enumerate(self.list_of_planets):
                print(f"{index_planet} {planet.name}")
            try:
                choose_planet = int(input("Auf welchem Planet soll ein Gebäude gebaut werden?"))
                self.clear_console()
                if 0 <= choose_planet < len(self.list_of_planets):
                    selected_planet = self.list_of_planets[choose_planet]
                    print(f"Verfügbare Gebäude auf {selected_planet} ")
                    for index_building, building in enumerate(Building.avaiable_buildings):
                        print(f"Gebäude {index_building}: {building["name"]} - Kosten:\nNahrung: {building["food_costs"]} - Stein: {building["stone_costs"]} - Holz: {building["wood_costs"]} - Gold: {building["gold_costs"]}")
                    choose_building = int(input("Welches Gebäude möchtest du bauen?"))
                    if choose_building == 0:
                        selected_planet.create_town_hall()
                        time.sleep(3)
                        self.main_menu()
                else:
                    print("Bitte einen vorhandenen Planeten auswählen")    
            except ValueError:
                print("Bitte Zahl.")
            except UnboundLocalError:
                print("Bitte einen vorhandenen Planeten auswählen")
    
    
    def main_menu(self):
        self.clear_console()
        while True:
            self.show_planets()
            print("Hauptmenü\nBitte auswählen\n1: Neuen Planeten erstellen\n2: Menschen erschaffen\n3: Gebäude bauen\n4: Programm beenden")
            try:
                choose = int(input("Auswahl: "))
                if choose == 1:
                    self.create_planet()
                    break
                if choose == 2:
                    self.create_human()
                    break
                if choose == 3:
                    self.create_building()
                    break
                else:
                    print("Ungültige Auswahl")
            except ValueError:
                print("Zahl eingeben.")


if __name__ == "__main__":
    app = Menu()
    app.main_menu()




    
