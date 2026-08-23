ADMIN LOGIN + GOOGLE SHEET SETUP  (MAC Aqua Filtration)
=======================================================

Isse aapko milega:
  - Admin panel me PASSWORD login
  - Products ko Google Sheet me add/manage karna
  - Password Google Sheet me (Config tab, cell B1) — kabhi bhi badal sakte ho

--------------------------------------------------------
STEP 1 — Google Sheet banao
--------------------------------------------------------
1. sheets.google.com kholo -> "Blank spreadsheet" -> naam do "MAC Aqua Data".

--------------------------------------------------------
STEP 2 — Apps Script code paste karo
--------------------------------------------------------
2. Us sheet me upar menu -> "Extensions" -> "Apps Script".
3. Jo code (Code.gs file) main diya hai, use poora COPY karke
   Apps Script editor me paste kar do (jo default "function myFunction" ho use hata do).
4. Upar "Save" (floppy icon) dabao.

--------------------------------------------------------
STEP 3 — Deploy (Web app banao)
--------------------------------------------------------
5. Upar right "Deploy" -> "New deployment".
6. "Select type" (gear icon) -> "Web app".
7. Settings:
      Description : mac aqua api
      Execute as  : Me (aapka email)
      Who has access : ANYONE
8. "Deploy" dabao. (Pehli baar "Authorize access" -> apna Google account choose ->
   "Advanced" -> "Go to ... (unsafe)" -> Allow. Ye normal hai, aapka apna script hai.)
9. Ek "Web app URL" milega jo aise dikhega:
      https://script.google.com/macros/s/AKfy..../exec
   ISKO COPY KAR LO.

--------------------------------------------------------
STEP 4 — Admin me URL daalo aur login karo
--------------------------------------------------------
10. admin.html kholo -> login screen pe niche "Setup / Apps Script URL" kholo ->
    wahi URL paste karke "Save URL".
11. Password daalo: DEFAULT = admin123  -> Login.
12. Ab "Products" tab me "Add Product" -> details bharo ->
    "Save to Google Sheet". Sheet me turant save ho jayega.

--------------------------------------------------------
PASSWORD BADALNA
--------------------------------------------------------
- Apni Google Sheet -> "Config" tab -> cell B1 me naya password likh do. Bas.
  (Default admin123 ko zaroor badal lena.)

--------------------------------------------------------
ZAROORI BAATEIN
--------------------------------------------------------
- admin.html ko aap GitHub pe rakh sakte ho, par chaho to sirf apne computer pe
  rakho (zyada safe). Login front-end lock hai; password Google server pe check
  hota hai, isliye code me chhupa nahi hota.
- Products website pe DIKHANE ka part abhi baaki hai — jab aapka sheet+login
  chalu ho jaye, bata dena, main website pe "Products" page jod dunga jo seedha
  is sheet se products uthaega.

Files:
  Code.gs                    -> Google Apps Script me paste karne ke liye
  admin.html                 -> naya admin (login + products)
  README-admin-setup.txt     -> ye file
