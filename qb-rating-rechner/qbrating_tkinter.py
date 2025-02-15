import tkinter
from tkinter import messagebox

def qbrating_funktion_tkinter():
    try:
        input_att = int(entry_attemps.get())
        input_comp = int(entry_completions.get())
        input_yds = int(entry_yards.get())
        input_td = int(entry_touchdowns.get())
        input_int = int(entry_interceptions.get())

        proz_comp_pass = ((input_comp / input_att) * 100 - 30) / 20
        proz_comp_pass = min(max(proz_comp_pass, 0), 2.375)

        yds_per_att = ((input_yds / input_att) - 3) * 1 / 4
        yds_per_att = min(max(yds_per_att, 0), 2.375)

        tds_per_att = (input_td / input_att) * 20
        tds_per_att = min(max(tds_per_att, 0), 2.375)

        int_per_att = 2.375 - ((input_int / input_att) * 25)
        int_per_att = min(max(int_per_att, 0), 2.375)

        qb_rating = ((proz_comp_pass + yds_per_att + tds_per_att + int_per_att) / 6) * 100 

        output_text.config(state="normal")
        output_text.delete(1.0, tkinter.END)
        output_text.insert(tkinter.END, f"{qb_rating:.2f}")
        output_text.config(state="disabled")
    except ValueError:
        messagebox.showerror("Eingabefehler", "Bitte gib eine gültige Zahl ein")


main_window = tkinter.Tk()
main_window.title("QBRating Rechner")

tkinter.Label(main_window, text="Passversuche:").grid(row=0, column=0, padx=10, pady=5)
entry_attemps = tkinter.Entry(main_window)
entry_attemps.grid(row=0, column=1, padx=10, pady=5)

tkinter.Label(main_window, text="Vollständige Pässe:").grid(row=1, column=0, padx=10, pady=5)
entry_completions = tkinter.Entry(main_window)
entry_completions.grid(row=1, column=1, padx=10, pady=5)

tkinter.Label(main_window, text="Yards:").grid(row=2, column=0, padx=10, pady=5)
entry_yards = tkinter.Entry(main_window)
entry_yards.grid(row=2, column=1, padx=10, pady=5)

tkinter.Label(main_window, text="Touchdowns:").grid(row=3, column=0, padx=10, pady=5)
entry_touchdowns = tkinter.Entry(main_window)
entry_touchdowns.grid(row=3, column=1, padx=10, pady=5)

tkinter.Label(main_window, text="Interceptions:").grid(row=4, column=0, padx=10, pady=5)
entry_interceptions = tkinter.Entry(main_window)
entry_interceptions.grid(row=4, column=1, padx=10, pady=5)

tkinter.Label(main_window, text="Quarterback Rating:").grid(row=5, column=0, padx=10, pady=5)
output_text = tkinter.Text(main_window, height=1, width=15, state="disabled")
output_text.grid(row=5, column=1, columnspan=2, padx=10, pady=5)


button_calculate = tkinter.Button(main_window, text="Berechne!", command=qbrating_funktion_tkinter)
button_calculate.grid(row=6, column=0, columnspan=2, padx=(0, 100), pady=10)

def clear_eingabe():
    entry_attemps.delete(0, tkinter.END)
    entry_completions.delete(0, tkinter.END)
    entry_yards.delete(0, tkinter.END)
    entry_touchdowns.delete(0, tkinter.END)
    entry_interceptions.delete(0, tkinter.END)

button_clear = tkinter.Button(main_window, text="Clear!", command=clear_eingabe)
button_clear.grid(row=6, column=1, padx=10, pady=10)

main_window.mainloop()