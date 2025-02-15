class Building:

    def __init__(self):
        pass

    avaiable_buildings = [
        {"name": "Rathaus", "food_costs": 50, "stone_costs": 1200, "wood_costs": 1200, "gold_costs": 80},
        {"name": "Jagdhütte", "food_costs": 10, "stone_costs": 10, "wood_costs": 200, "gold_costs": 30},
        {"name": "Bauernhof", "food_costs": 20, "stone_costs": 400, "wood_costs": 1200, "gold_costs": 50},
        {"name": "Holzfällerhütte", "food_costs": 10, "stone_costs": 100, "wood_costs": 300, "gold_costs": 25},
        {"name": "Steinbruch", "food_costs": 15, "stone_costs": 100, "wood_costs": 1200, "gold_costs": 25},
        {"name": "Goldmine", "food_costs": 40, "stone_costs": 1500, "wood_costs": 1500, "gold_costs": 30}
    ]

    @staticmethod
    def get_avaiableBuildings():
        print("Verfügbare Gebäude")
        for building in Building.avaiable_buildings:
            print(f"{building["name"]} - Nahrung: {building["food_costs"]} - Stein: {building["stone_costs"]} - Holz: {building["wood_costs"]} - Gold: {building["gold_costs"]}")

    
    
        
        
        