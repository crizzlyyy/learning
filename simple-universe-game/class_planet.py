
import random
from class_buildings import Building


class Planet:
    def __init__(self, name, max_population=20):
        self.name = name
        self.population = 0
        self.max_population = max_population
        self.food = random.randint(300, 2000)
        self.wood = random.randint(1500, 2000)
        self.stone = random.randint(1500, 2000)
        self.gold = 200
        self.has_town_hall = False

    def add_human(self, human):
        if not self.has_town_hall:
            print("Kein Rathhaus verfügbar. Baue zuerst ein Rathaus!")
        if self.has_town_hall:
            if self.population < self.max_population:
                self.population += 1
                print(f"Bewohner erstellt. Die aktulle Bevölkerung beträgt {self.population}")
            else:
                print("Bevölkerungslimit erreicht.")

    def building_possible(self, building_costs):
        return (self.food >= building_costs["food_costs"] and 
                self.stone >= building_costs["stone_costs"] and 
                self.wood >= building_costs["wood_costs"] and 
                self.gold >= building_costs["gold_costs"])
    
    def create_town_hall(self):
        costs_town_hall = {"food_costs": 50, "stone_costs": 1200, "wood_costs": 1200, "gold_costs": 80}
        if self.building_possible(costs_town_hall):
            self.food -= costs_town_hall["food_costs"]
            self.stone -= costs_town_hall["stone_costs"]
            self.wood -= costs_town_hall["wood_costs"]
            self.gold -= costs_town_hall["gold_costs"]
            self.has_town_hall = True
            print(f"Rathaus wurde auf Planet {self.name} gebaut!")
        else:
            print("Nicht genügend Ressourcen vorhanden")





    def __str__(self):
        return f"""Name: {self.name} - Bevölkerung {self.population} - Nahrung {self.food} - Holz: {self.wood} - Stein: {self.stone} - Gold: {self.gold}\n"""
    
