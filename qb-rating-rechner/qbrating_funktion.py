input_attempts = "Gib die Passversuche ein"
input_completions = "Gib die vollständigen Pässe ein"
input_yards = "Gib die geworfenen Yards ein"
input_touchdowns = "Gib die Zahl der geworfenen Touchdowns ein"
input_interceptions = "Gib die Zahl der geworfenen Interceptions ein"


def get_integer_input(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Bitte eine gültige Zahl eingeben")



def qbrating_function():

    input_att = get_integer_input(input_attempts)
    input_comp = get_integer_input(input_completions)
    input_yds = get_integer_input(input_yards)
    input_td = get_integer_input(input_touchdowns)
    input_int = get_integer_input(input_interceptions)

# %-Satz der vollständigen Pässe

    proz_comp_pass = ((input_comp / input_att) * 100 - 30) / 20
    proz_comp_pass = min(max(proz_comp_pass, 0), 2.375)

# erzielter Raumgewinn in Yds pro Passversuch

    yds_per_att = ((input_yds / input_att) - 3) * 1 / 4
    yds_per_att = min(max(yds_per_att, 0), 2.375)

# erzielte TDs pro Passversuch

    tds_per_att = (input_td / input_att) * 20
    tds_per_att = min(max(tds_per_att, 0), 2.375)

# geworfene INTs pro Passversuch

    int_per_att = 2.375 - ((input_int / input_att) * 25)
    int_per_att = min(max(int_per_att, 0), 2.375)


# Vollständiges QBRating

    qb_rating = ((proz_comp_pass + yds_per_att + tds_per_att + int_per_att) / 6) * 100 
    print(f"Das Quarterbackrating beträgt {qb_rating}")

qbrating_function()