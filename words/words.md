<div class="section">
    <div>
    	<iframe id="splash" width="960" height="480" src="banners/splash.html"></iframe>
        <div style="top: 70px;font-size: 75px;font-weight: bold;">
        	Kaj se bo zgodilo v prihodnje?
       	</div>
		<div style="font-weight: 500;top: 140px;left: 10px;font-size: 29px;">
			Prihodnost COVID-19, predstavljena z igrivimi simulacijami
		</div>
		<div style="font-weight: 100;top: 189px;left: 10px;font-size: 19px;line-height: 21px;">
			<b>
				🕐 30 min igranja/branja
				&nbsp;&middot;&nbsp;
			</b>
			napisal
			<a href="https://scholar.google.com/citations?user=_wHMGkUAAAAJ&amp;hl=en">Marcel Salathé</a>
			(epidemolog)
			&
			<a href="https://ncase.me/">Nicky Case</a>
			(umetnik)
		</div>
	</div>
</div>

"Edino česar se moramo bati, je strahu samega!" je bil neumen nasvet.

Seveda, ne delajte si zalog toaletnega papirja – ampak, če se politiki sami bojijo strahu, bodo zmanjšali pomen resnične nevarnosti in se izognili "množični paniki". Strah ni problem. Problem je kam *preusmerimo* svoj strah.
Strah nam daje energijo, da se zdaj soočimo z nevarnostmi in se pripravimo na vse nevarnosti, ki še prihajajo.

Iskreno, midva (Marcel, epidemolog + Nicky, umetnik) sva v skrbeh. Staviva, da ste tudi vi! Zato sva usmerila najin strah v izvedbo teh **igralnih simulacij**, da lahko tudi *vi* usmerite svoj strah v razumevanje:

* **Zadnjih nekaj mesecev** (epidemiology 101, SEIR model, R & R<sub>0</sub>)
* **Naslednjih nekaj mesecev** (lockdowns, contact tracing, masks)
* **Naslednjih nekaj let** (loss of immunity? no vaccine?)

Ta vodič (objavljeno 1.5.2020, kliknite za opombo!→[^timestamp]) bi vam naj dal upanje *in* strah, da premagate COVID-19 **na način, ki ščiti našo mentalno in duševno zdravje**. Optimizen potrebujemo za ustvarjanje načrtov, za pripravo rezervnih načrtov pa potrebujemo pesimizem.
Kot je nekoč rekel Gladys Bronwyn, *“Optimist si izmisli letalo, pesimist pa padalo.”*

[^timestamp]: Te sprotne opombe bodo imele vire, povezave ali dodatne komentarje. Tako kot ta komentar!

    **Ta vodič je bil objavljen 1. maja 2020** Številne podrobnosti bodo zastarele, ampak sva prepričana, da bo ta vodič zajel 95% verzij prihodnosti, da bo knjiga Epidemiology 101 za vedno ostala uporabna.

Torej, pripnite se, kmalu bomo doživeli nekaj turbolenc!

<div class="section chapter">
    <div>
		<img src="banners/curve.png" height=480 style="position: absolute;"/>
        <div>Zadnjih nekaj mesecev</div>
    </div>
</div>

Piloti uporabljajo simulatorje letenja, da se naučijo, kako ne bi strmoglavili letal.

**Epidemologi uporabljajo simolatorje epidemij, da se naučijo, kako nebi strmoglavili človeštva.**

Torej, naredimo zelo, * zelo * preprost "simulator epidemije letenja"! V tej simulaciji lahko <icon i></icon>  okuženi ljudje spremenijo <icon s></icon> dovzetne ludi v <icon i></icon> okužene ljudi:

![](pics/spread.png)

Ocenjuje se, da *na začetku* izbruha COVID-19, virus skoči iz <icon i></icon> na <icon s></icon> vsake 4 dni, *v povprečju*.[^serial_interval] (ne pozabite, da obstaja veliko različic)

[^serial_interval]: “Povprečni [serijski] interval je bil 3.96 dni (95% CI 3.53–4.39 dni)”. [Du Z, Xu X, Wu Y, Wang L, Cowling BJ, Ancel Meyers L](https://wwwnc.cdc.gov/eid/article/26/6/20-0357_article) (Disclaimer: Članki z zgodnjo izdajo se ne štejejo v končne različice)

Če imitiramo "podvojimo vsake 4 dni" *in nič drugega*, na populaciji s samo 0.001% <icon i></icon>, kaj se zgodi?

**Pritisni "Začetek" za predvajanje simulacije! Kasneje lahko ponoviš z drugačnimi nastavitvami:** (tehnična opozorila: [^caveats])

[^caveats]: **Ne pozabite: vse te simulacije so zelo poenostavljene zaradi izobraževalnih namenov.**

    Ena poenostavitev: Ko ukažete tej simulaciji "Okužite 1 novo osebo vsakih X dni", se dejansko vsak dan poveča število okuženih za 1 / X. Enako za prihodnje nastavitve v teh simulacijah – "Ozdravi vsakih X dni" dejansko znanjša število okuženih za 1 / X vsak dan.

    Ti *niso* popolnoma enaki, ampak so dovolj blizu in so v izobraževalne namene manj moteni kot neposredna nastavitev hitrosti prenosa/okrevanja.   

<div class="sim">
		<iframe src="sim?stage=epi-1" width="800" height="540"></iframe>
</div>

To je **eksponentna krivulja.** Najprej narašča zelo počasi in nato eksplodira. "Ah, to je samo gripa" do "Ojoj, gripa ne bi smela ustvarjati *množičnih grobišč v mestih*".

![](pics/exponential.png)
Ampak ta simulacija je napačna, saj se na srečo ekponentna 
rast ne more odvijati v neskončnost. 
Ena od omejitev širjenja virusa je tudi, da se ne more širiti, če
so vsi že okuženi:

![](pics/susceptibles.png)

Več <icon i></icon> kot je, hitreje <icon s></icon>
 postanejo <icon i></icon>, ** ampak manj kot je <icon s></icon>,
   *počasneje* <icon s></icon> postanejo <icon i></icon>.**

Kako to vpliva na rast epidemije? 
Odgovor se skriva v naslednjih vrsticah:

<div class="sim">
		<iframe src="sim?stage=epi-2" width="800" height="540"></iframe>
</div>

To je "S-oblikovana" **logistična krivulja rasti.**
Sprva raste počasi, eskplodira in se spet upočasni.


Ampak ta simulacija je *še vedno* napačna.
 Ne upoštevamo dejstva, da <icon i></icon> okuženi ljudje ščasoma niso več nalezljivi, 
 saj so 1) ozdraveli,  2) "ozdraveli" s pljučno degeneracijo ali 3) umrli.

Poenostavimo, da so si vsi <icon i></icon> okuženi ljudje <icon r></icon> opomogli. (Zgolj ne pozabi, da si v 
realnosti nekateri ne opomorejo.) Pretvarjajmo se, da se <icon r></icon> nemorejo ponovno okužiti – *za zdaj!*
 – ostanejo imuni celo življenje.

Pri COVID-19 je predvideno, da si *v povprečju* <icon i></icon> kužen
10 dni. [^nalezljivost] To pomeni, da si bodo nekateri opomogli prej, nekateri kasneje.
**Spodnja simulacija prikazuje, kako bi izgledalo, če bi *na začetku* bili
100% <icon i></icon>:**

[^nalezljivost]: “Povprečna doba nalezljivosti  \[...\] je bila 9.5 dni.” [Hu, Z., Song, C., Xu, C. et al](https://link.springer.com/article/10.1007/s11427-020-1661-4) 
Ja, vemo, da "mediana" ni isto kot "povprečje". Za lažje razumevanje zanemarimo razliko.

<div class="sim">
		<iframe src="sim?stage=epi-3" width="800" height="540"></iframe>
</div>

To je ravno nasprotje eksponentne rasti, **eksponentno padajoča krivulja.**

Kaj se zgodi, če simuliraš S-obliko logistične krivulje
rasti *z* okrevanjem?

![](pics/graphs_q.png)

Let's find out.

<b style='color:#ff4040'>Rdeča krivulja</b> so *trenutni* primeri <icon i></icon>,    
<b style='color:#999999'>Siva krivulja</b> so *vsi* primeri (trenutni + opomogli <icon r></icon>),
kjer je na začetku 0.001% <icon i></icon>:

<div class="sim">
		<iframe src="sim?stage=epi-4" width="800" height="540"></iframe>
</div>

In *tako* pridemo do najbolj znane krivulje! 
To ni normalna porazdelitev, niti ni "logaritemsko normalna" porazdelitev. Krivulja ni poimenovana, vendar si jo že videl
nešteto krat.

To je **model SIR**,[^sir]    
(<icon s></icon>**S**usceptible(Dovzetni) <icon i></icon>**I**nfectious(nalezljivi) <icon r></icon>**R**ecovered(opomogli))      
*Druga*-najbolj pomembna ugotovitev v knjigi Epidemiology 101:

[^sir]: Bolj podrobna pojasnitev modela SIR: [the Institute for Disease Modeling](https://www.idmod.org/docs/hiv/model-sir.html#) in [Wikipedia](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model)


![](pics/sir.png)

**Opomba: Simulacija teh napovedi je veliko, *veliko* bolj kompleksna kot je predstavljeno!** 
Ampak model SIR še vedno pojasni glavne rezultate, čeprav so izpuščene podrobnosti.

Pravzaprav, dodajmo še en detajl: preden <icon s></icon> postane <icon i></icon>, je sprva <icon e></icon> izpostavljen.
To je obdoblje, ko se je okužil, ampak še virusa ne prenaša na druge - je okužen ampak še nenalezljiv.


![](pics/seir.png)

(To različico imenujemo **model SEIR**[^seir], kjer je "E" okrajšava za <icon e></icon> "Exposed" (izpostavljene). 
Pomni, da tukaj izpostavljenost *nima* vsakodnevnega pomena. V tej strokovni definiciji "Izpostavljenost" pomeni, da 
si definitivno okužen. Strokovna terminologija je slaba.)

[^seir]: Bolj strokovno razlago modela SEIR najdeš: [the Institute for Disease Modeling](https://www.idmod.org/docs/hiv/model-seir.html) in [Wikipedia](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SEIR_model)

Pri COVID-19 je predvidena ocena, da si <icon e></icon> okužen, ampak še nenalezljiv, *v povprečju* 3 dni.[^latent] 
Kaj se zgodi, če to upoštevamo pri simulaciji?

[^latent]: “Assuming an incubation period distribution of mean 5.2 days from a separate study of early COVID-19 cases,
 we inferred that infectiousness started from 2.3 days (95% CI, 0.8–3.0 days) before symptom onset”
  (prevod: Domnevno se simptomi pokažejo po 5 dneh, virus pa širiš že 2 dni prej = Nalezljivost se začne 3 dan)
   [He, X., Lau, E.H.Y., Wu, P. et al.](https://www.nature.com/articles/s41591-020-0869-5)

<b style='color:#ff4040'>Rdeča <b style='color:#FF9393'>+ Roza</b> krivulja</b> so *trenutni* primeri (okuženi <icon i></icon> + izpostavljeni <icon e></icon>),    
<b style='color:#888'>Siva krivulja</b> so *vsi* primeri (trenutni + opomogli <icon r></icon>):

<div class="sim">
		<iframe src="sim?stage=epi-5" width="800" height="540"></iframe>
</div>

Ni se veliko spremenilo! Kako dolgo si <icon e></icon> izpostavljen spremeni razmerje med <icon e></icon>-in-<icon i></icon>,
 in *kdaj* trenutni primeri dosežejo ekstrem... ampak "*višina*" ekstrema, in vseh primerov na koncu, ostane enaka.

Zakaj je temu tako? Zaradi *prve*-najpomemnejše ugotovitve v Epidemiology 101:

![](pics/r.png)

R je kratica, s katero označimo "število za razmnoževanje". Predstavlja *povprečno* število ljudi, ki se okužijo *preden* ozdravijo (ali umrejo).

![](pics/r2.png)

**R** se med izbruhom spremeni, saj sčasoma pridobimo imunost in sprejmemo ustrezne ukrepe.

**R<sub>0</sub>** (izgovarjamo R-nič) predstavlja R *na začetku izbruha, torej pred imunostjo in ukrepi*. **R<sub>0</sub>** natančneje odraža moč virusa, vendar se le-ta še vedno spreminja od mesta do mesta. Na primer: **R<sub>0</sub>** je višji v gosteje naseljenih mestih kakor v redkih podeželskih območjih.

(V večini novic, celo v nekaterih raziskovalnih člankih, pride do zmede zaradi zamenjave R in R<sub>0</sub>. Znova je potrebno poudariti, da je znanstvena terminologija zares slaba.)

R<sub>0</sub> za t.i. »sezonsko gripo« znaša približno 1,28[^r0_flu]. To pomeni, da na *začetku* izbruha gripe vsak v *povprečju* okuži 1.28 drugih ljudi. (Če morda komu to, da to ni celo število, zveni nenavadno, ne pozabite, da ima "povprečna" mama 2,4 otroka. To pa seveda ne pomeni, da okoli teka polbrat.)

[^r0_flu]: “Srednja vrednost R za sezonsko gripo je znašala 1,28” [Biggerstaff, M., Cauchemez, S., Reed, C. et al.](https://bmcinfectdis.biomedcentral.com/articles/10.1186/1471-2334-14-480)

Predvideva se, da bo vrednost R<sub>0</sub> za COVID-19 znašala približno 2,2,[^r0_covid] vendar *sicer še nedokončana* študija v Wuhanu znaša 5,7![^r0_wuhan]

[^r0_covid]: “Osnovno reprodukcijsko število R0 leta 2019-nCoV smo ocenili na približno 2,2 (90-odstoten gost interval: 1,4–3,8)” [Riou J, Althaus CL.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7001239/)

[^r0_wuhan]: “Izračunali smo srednjo vrednost **R<sub>0</sub>** 5,7 (95% CI 3,8–8,9)” [Sanche S, Lin YT, Xu C, Romero-Severson E, Hengartner N, Ke R.](https://wwwnc.cdc.gov/eid/article/26/7/20-0282_article)

V naših simulacijah oseba *na začetku v povprečju* okuži nekoga drugega vsake 4 dni ter to počne več kot 10 dni. "4 dnevi" grejo v "10 dni" dva in pol krat. To pomeni, da vsaka oseba *na začetku v povprečju* okuži 2,5 drugih oseb. Zato je potemtakem R<sub>0</sub> = 2,5. (opozorila: [^r0_caveats_sim])

[^r0_caveats_sim]: Pretvarjamo se, da so vsi enako kužni v svojem t.i. "nalezljivem obdobju". Zaradi izobraževalnih namenov je znova prišlo do manjših poenostavitev.

**Preizkusi R<sub>0</sub> kalkulator, ki prikazuje, kako R<sub>0</sub> vpliva na čas zdravljenja in čas, v katerem pride do nove infekcije:**
<div class="sim">
		<iframe src="sim?stage=epi-6a&format=calc" width="285" height="255"></iframe>
</div>

Ne pozabite, manj kot je <icon s></icon>, *počasnejši* postanejo <icon i></icon>. *Trenutno* reprodukcijsko število (R) ni odvisno samo od *osnovnega* reprodukcijskega števila (R<sub>0</sub>), ampak *tudi* od tega, koliko ljudi ni več <icon s></icon> dovzetnih. (Na primer: Nekateri ozdravijo in pridobijo naravno imunost.)

<div class="sim">
		<iframe src="sim?stage=epi-6b&format=calc" width="285" height="390"></iframe>
</div>

Ko je dovolj ljudi imunih, je R < 1 in virus je moč obvladovati! Temu pravimo **imuniteta črede**. Imuniteto črede pri gripi dosežemo *s cepivom*. Ideja o tem, da bi "naravno imunost črede" dosegli tako, da bi se ljudje okužili, je *grozljiva*. (Vendar ne iz razloga, za katerega morda mislite! Pojasnilo sledi kasneje.)

Znova uporabimo Model SEIR, vendar sedaj prikažimo R<sub>0</sub>, R skozi čas in mejo imunosti črede:
<div class="sim">
		<iframe src="sim?stage=epi-7" width="800" height="540"></iframe>
</div>

**OPOMBA: Skupni primeri se pri imuniteti črede *ne ustavijo*, temveč mejo presežejo!** To se zgodi *točno takrat*, ko trenutni primeri dosežejo vrhunec. (Do tega pride ne glede na to, kako spremenite nastavitve – poskusite sami!)

Temu je tako, ker v primeru, ko je več <icon s></icon> kot je meja imunosti črede, dobite R < 1. In ko je R < 1, novi primeri prenehajo rasti: pride do vrhunca.

**Če boste iz tega priročnika odnesli le eno lekcijo, je to sledeča** - pred vami je izredno zapleten diagram, zato si prosim vzemite čas, da ga boste popolnoma razumeli:

![](pics/r3.png)

**To pomeni: za zaustavitev COVID-19 nam NI potrebno ujeti večine, kaj šele vseh prenosov!**

To je paradoks. COVID-19 je izjemno nalezljiv, kljub temu pa moramo ustaviti "le" nekaj več kot 60% okužb. 60% ?! Če bi bila to šolska ocena, je to zadostno(2). Če pa je R<sub>0</sub> = 2,5, sledi, da za 61% zmanjšamo R = 0,975. Potem je R < 1 in virus je obvladljiv, saj je tako rekoč omejen! (natančna formula: [^exact_formula])

[^exact_formula]: Pomni: R = R<sub>0</sub> * razmerje prenosov, ki so še dovoljeni. Ne pozabite tudi, da je dovoljeno razmerje prenosov = 1 – razmerje *ustavljenih* prenosov.

    Če želite dobiti R < 1, morate dobiti R<sub>0</sub> * dovoljeni prenosi < 1.

    Sledi: dovoljeni prenosi < 1/R<sub>0</sub>
    
    Sledi: 1 – ustavljeni prenosi < 1/R<sub>0</sub>
 
    Sledi: ustavljeni prenosi > 1 – 1/R<sub>0</sub>

    Zato je potrebno ustaviti več kot **1 – 1/R<sub>0</sub>** prenosov, da dobimo R < 1 in omejimo virus!

![](pics/r4.png)

(Če menite, da so R<sub>0</sub> ali druge številke v naših simulacijah prenizke/previsoke, je to odlično, saj tako izpodbijate naše predpostavke! Na koncu tega priročnika bo na voljo "način peskovnika", kjer lahko priključite *svoje* številke in simulirajte, kaj se zgodi.)

*Vsak* poseg glede COVID-19, za katerega ste slišali - pranje rok, socialno/fizično distanciranje, zaprtja, samoizolacija, sledenje stikom in karantena, maske za obraz, celo "imuniteta črede" - *vsi* počnejo popolnoma isto:

Pridobivajo R < 1.

Sedaj uporabimo naš "simulator epidemije letenja", da ugotovimo sledeče: Kako lahko dobimo R < 1 na način, ki **ščiti tudi naše duševno *in* finančno zdravje?**

Pripravite se na zasilni pristanek...

<div class="section chapter">
    <div>
		<img src="banners/curve.png" height=480 style="position: absolute;"/>
        <div>Naslednjih nekaj mesecev</div>
    </div>
</div>

…lahko bi bilo huje. V nadaljevanju sledi prikaz vzporednega sveta, kateremu smo se uspeli izogniti:

###Scenarij 0: Ne naredite popolnoma ničesar

Približno eden izmed 20 ljudi, ki so okuženi s COVID-19, se mora odpraviti na oddelek za intenzivno nego.[^icu_covid] V bogatih državah, kot so na primer ZDA, 1 oddelek za intenzivno nego premore le 1 ležišče za kar 3400 ljudi.[^icu_us] Zato lahko ZDA *hkrati* sprejmejo le 20 izmed 3400 okuženih ljudi – oziroma 0,6% prebivalstva.

[^icu_covid]: ["Odstotek primerov COVID-19 v ZDA od 12. februarja do 16. marca 2020, za katere je bil potreben sprejem na oddelku intenzivne nege (starostna skupina)"](https://www.statista.com/statistics/1105420/covid-icu-admission-rates-us-by-age-group/). Le ta se je za vse primere COVID-19, ki so potrebovali intenzivno nego, gibal med 4,9% in 11,5%. Če smo pri tem še malenkost velikodušni in tako izberemo spodnjo mejo, ugotovimo, da je to 5% oziroma eden izmed dvajsetih. Upoštevati morate, da je ta vrednost značilna za starostno skupino ZDA ter da bo vrednost v državah s starejšim prebivalstvom višja in nižja v državah z mlajšim prebivalstvom.

[^icu_us]: “Število ležišč na oddelku za intenzivno nego = 96.596”. Leta 2019 je bilo število prebivalcev ZDA iz družbe za kritično oskrbo ([the Society of Critical Care Medicine](https://sccm.org/Blog/March-2020/United-States-Resource-Availability-for-COVID-19)) enako 328.200.000. 96.596 od 328.200.000 = približno 1 na 3400.

Tudi če bi to vrednost *več kot potrojili* na 2%, nam spodnja simulacija prikazuje, kaj bi se zgodilo, *če ne bi storili absolutno ničesar:*

<div class="sim">
		<iframe src="sim?stage=int-1&format=lines" width="800" height="540"></iframe>
</div>

Slabo kaže…

Britanska fakulteta je 16. marca ([the March 16 Imperial College report](http://www.imperial.ac.uk/mrc-global-infectious-disease-analysis/covid-19/report-9-impact-of-npis-on-covid-19/)) prišla do sledeče ugotovitve: Ne naredimo ničesar in se posledično spopadajmo s problemom premajhnega števila ležišč na oddelkih intenzivne nege, saj se je do sedaj okužilo več kot 80% prebivalstva. 
(ne pozabite: skupni primeri *prekoračijo* imuniteto črede)

Tudi če umre le 0,5% okuženih – velikodušna domneva, ko ni več možnosti oskrbe na oddelku za intenzivno nego – v veliki državi, kot je ZDA, s 300 milijoni ljudi, 0,5% od 80% od 300 milijonov = še vedno 1,2 milijona mrtvih… *ČE nismo naredili ničesar*.

(Številne novice in mediji so poročali le "80% okuženih" *brez*, da bi temu priključili še "ČE NISMO NAREDILI NIČESAR". Strah je bil usmerjen v klike, ne pa v razumevanje. *Vzdih.*)

###Scenarij 1: Izravnajte krivuljo / Imuniteta črede

Načrt "Izravnati krivuljo" je bil predstavljen s strani prav vsake izmed javnih zdravstvenih organizacij, medtem ko je bil prvotni načrt Združenega kraljestva, imenovan "imuniteta črede", splošno razglašen. Šlo je za *enak načrt*. Razlika je le v tem, da je Združeno kraljestvo svoj načrt sporočilo slabo in površno.[^yong]

[^yong]: “Pravi, da je dejanski cilj enak kot v drugih državah: zravnati krivuljo s pravo razporeditvijo začetka okužb. Posledično lahko država doseže imuniteto črede; je stranski učinek in ne cilj. [...] Dejanski akcijski načrt vlade za koronavirus, ki je na voljo na spletu, sploh ne omenja čredne imunosti. ”

    Iz članka [The Atlantic article by Ed Yong](https://www.theatlantic.com/health/archive/2020/03/coronavirus-pandemic-herd-immunity-uk-boris-johnson/608065/)

Oba načrta pa sta imela dobesedno usodno napako.

Najprej si oglejmo dva glavna načina za "zravnanje krivulje": pranje rok in fizično distanciranje.

Povečano pranje rok je v državah z visokim dohodkom zmanjšalo zaščito pred prehladom in mrazom za ~25%[^handwashing], medtem ko je mestno zaprtje v Londonu tesne stike zmanjšalo za ~70%[^london]. Predpostavimo lahko, da lahko pranje rok R zmanjša za *do* 25%, distanciranje pa *do* 70%:

[^handwashing]: “Vseh osem kvalificiranih študij je poročalo, da je pranje rok zmanjšalo tveganje za okužbo dihal, zmanjšanje tveganja pa je znašalo od 6% do 44% [združena vrednost 24% (95% CI 6-40%)].« Zaradi enostavnosti smo v simulacijah združeno vrednost zaokrožili na 25%. [Rabie, T. and Curtis, V.](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1365-3156.2006.01568.x) Opomba: kot kaže ta meta-analiza, je kakovost študij glede pranja rok (vsaj v državah z visokimi dohodki) grozljiva. 

[^london]: “Ugotovili smo, da se je povprečno dnevno število stikov na udeleženca zmanjšalo za 73%. To bi zadostovalo za zmanjšanje R0 iz vrednosti 2,6 pred zaprtjem na 0,62 (med 0,37 in 0,89) v času zaprtja”. Ponovno smo zaradi enostavnosti v simulaciji vrednost zaokrožili na 70%. [Jarvis and Zandvoort et al](https://cmmid.github.io/topics/covid19/comix-impact-of-physical-distance-measures-on-transmission-in-the-UK.html)

**Preizkusite spodnji kalkulator in videli boste, kako delež <icon s></icon>, pranje rok in distanciranje zmanjšajo R:** (kalkulator predstavlja njihove *relativne* učinke, zato *izgleda* kakor, da povečanje enega izmed njih zmanjša učinek drugih.[^log_caveat])

[^log_caveat]: Tega izkrivljanja bi se znebili, če bi R risali na logaritmični lestvici… vendar bi potem mogli dodatno razložiti še *logaritmične lestvice*.

<div class="sim">
		<iframe src="sim?stage=int-2a&format=calc" width="285" height="260"></iframe>
</div>

Sedaj simulirajmo, kaj bi se zgodilo z epidemijo COVID-19, če bi od marca 2020 dalje imeli le povečano pranje rok, fizično distanciranje pa bi ostalo v *(pre)blagi* obliki – R je tako nižji, vendar še vedno nad 1: 

<div class="sim">
		<iframe src="sim?stage=int-2&format=lines" width="800" height="540"></iframe>
</div>

Tri opombe:

1. To *zmanjšuje* skupno število primerov! **Četudi ne dobite R < 1, nižanje R na način, da poskušamo zmanjševati 'prekoračitve' nad imunostjo črede, še vedno rešuje življenja.** Večina ljudi misli, da načrt "Izravnati krivuljo" le širi primere, ne da bi pri tem zmanjšali celoto. Vendar to ni mogoče v *nobenem* epidemiološkem modelu. Ker pa so novice kot neizogibno dejstvo poročale, da bo "okuženih več kot 80% ljudi", so ljudje posledično mislili, da bodo skupni primeri enaki ne glede na vse. *Vzdih.*

2. Zaradi dodatnih ukrepov trenutni primeri dosežejo vrhunec *preden* se doseže imuniteta črede. Dejansko v tej simulaciji skupni primeri le premaknejo *majhen delček* nad imuniteto črede – gre za načrt Združenega kraljestva! Na tej točki, kjer je R < 1, lahko opustite vse druge ukrepe in virus nam je uspelo uspešno zajeziti! Srečamo se le z eno težavo…

3. Še vedno vam primanjkuje enot za intenzivno nego. In to za kar nekaj mesecev. (in ne pozabite, za te simulacije smo enote za intenzivno nego *že* potrojili)

To je bila druga ugotovitev poročila britanske fakultete (16. marec), ki je Združeno kraljestvo uspelo prepričati, da opusti svoj prvotni načrt. Prepričani so bili, da bo vsak poskus **blaženja** (zmanjšati R, vendar vseeno ohraniti R < 1) spodletel. Tako rekoč je preostal le izhod v sili, in sicer **zaviranje** virusa (zmanjšati R tako, da je R < 1).

![](pics/mitigation_vs_suppression.png)

Se pravi, krivulje ne le "izravnajte", potrebno jo je *zdrobiti*. Na primer, z…

###Scenarij 2: Nekaj mesečno zaprtje

Poglejmo, kaj se zgodi, če krivuljo *zatremo* s 5-mesečnim zaprtjem, <icon i></icon> zmanjšamo skoraj na nič, nato pa se *končno* vrnemo v normalno življenje:

<div class="sim">
		<iframe src="sim?stage=int-3&format=lines" width="800" height="540"></iframe>
</div>

Ojej.

Gre za "drugi val" o katerem že vsi govorijo. Takoj ko odstranimo zaprtje, ponovno dobimo R > 1. Torej lahko en sam izpuščen <icon i></icon> (ali uvožen <icon i></icon>) povzroči konico v primerih, ki so skoraj tako slabi, kot če bi se soočili s scenarijem 0: Absolutno nič.

**Zaprtje ni zdravilo, je le ponovni zagon.**

Torej se znova in znova le zapiramo?

###Scenarij 3: Občasno zaprtje

To rešitev je sprva 16. marca predlagalo poročilo britanske fakultete, kasneje pa še listina Harvard.[^lockdown_harvard]

Absent other interventions, a key metric for the success of social distancing is whether critical care capacities are exceeded. To avoid this, prolonged or intermittent social distancing may be necessary into 2022.
[^lockdown_harvard]: “Če ni drugih intervencij, je ključno merilo uspešnosti socialnega distanciranja to, ali so presežene zmogljivosti kritične oskrbe. Da bi se temu izognili, bo morda potrebno dolgotrajno ali občasno distanciranje do leta 2022.” [Kissler and Tedijanto et al](https://science.sciencemag.org/content/early/2020/04/14/science.abb5793)

**Tukaj je simulacija:** (Po predvajanju "posnetega scenarija" lahko poskusite simulirati *svoj* urnik zaprtja tako, da spremenite drsnike, *medtem* ko simulacija teče! Ne pozabite, da lahko zaustavite in nadaljujete simulacijo ter spremenite njeno hitrost.)

<div class="sim">
		<iframe src="sim?stage=int-4&format=lines" width="800" height="540"></iframe>
</div>

This *would* keep cases below ICU capacity! And it's *much* better than an 18-month lockdown until a vaccine is available. We just need to... shut down for a few months, open up for a few months, and repeat until a vaccine is available. (And if there's no vaccine, repeat until herd immunity is reached... in 2022.)

Look, it's nice to draw a line saying "ICU capacity", but there's lots of important things we *can't* simulate here. Like:

**Mental Health:** Loneliness is one of the biggest risk factors for depression, anxiety, and suicide. And it's as associated with an early death as smoking 15 cigarettes a day.[^loneliness]

[^loneliness]: See [Figure 6 from Holt-Lunstad & Smith 2010](https://journals.sagepub.com/doi/abs/10.1177/1745691614568352). Of course, big disclaimer that they found a *correlation*. But unless you want to try randomly assigning people to be lonely for life, observational evidence is all you're gonna get.

**Financial Health:** "What about the economy" sounds like you care more about dollars than lives, but "the economy" isn't just stocks: it's people's ability to provide food & shelter for their loved ones, to invest in their kids' futures, and enjoy arts, foods, videogames – the stuff that makes life worth living. And besides, poverty *itself* has horrible impacts on mental and physical health.

Not saying we *shouldn't* lock down again! We'll look at "circuit breaker" lockdowns later. Still, it's not ideal.

But wait... haven't Taiwan and South Korea *already* contained COVID-19? For 4 whole months, *without* long-term lockdowns?

How?

###Scenario 4: Test, Trace, Isolate

*"Sure, we \*could've\* done what Taiwan & South Korea did at the start, but it's too late now. We missed the start."*

But that's exactly it! “A lockdown isn't a cure, it's just a restart”... **and a fresh start is what we need.**

To understand how Taiwan & South Korea contained COVID-19, we need to understand the exact timeline of a typical COVID-19 infection[^timeline]:

[^timeline]: **3 days on average to infectiousness:** “Assuming an incubation period distribution of mean 5.2 days from a separate study of early COVID-19 cases, we inferred that infectiousness started from 2.3 days (95% CI, 0.8–3.0 days) before symptom onset” (translation: Assuming symptoms start at 5 days, infectiousness starts 2 days before = Infectiousness starts at 3 days) [He, X., Lau, E.H.Y., Wu, P. et al.](https://www.nature.com/articles/s41591-020-0869-5)  

    **4 days on average to infecting someone else:** “The mean [serial] interval was 3.96 days (95% CI 3.53–4.39 days)” [Du Z, Xu X, Wu Y, Wang L, Cowling BJ, Ancel Meyers L](https://wwwnc.cdc.gov/eid/article/26/6/20-0357_article)

    **5 days on average to feeling symptoms:** “The median incubation period was estimated to be 5.1 days (95% CI, 4.5 to 5.8 days)” [Lauer SA, Grantz KH, Bi Q, et al](https://annals.org/AIM/FULLARTICLE/2762808/INCUBATION-PERIOD-CORONAVIRUS-DISEASE-2019-COVID-19-FROM-PUBLICLY-REPORTED)

![](pics/timeline1.png)

If cases only self-isolate when they know they're sick (that is, they feel symptoms), the virus can still spread:

![](pics/timeline2.png)

And in fact, 44% of all transmissions are like this: *pre*-symptomatic! [^pre_symp]

[^pre_symp]: “We estimated that 44% (95% confidence interval, 25–69%) of secondary cases were infected during the index cases’ presymptomatic stage” [He, X., Lau, E.H.Y., Wu, P. et al](https://www.nature.com/articles/s41591-020-0869-5)

But, if we find *and quarantine* a symptomatic case's recent close contacts... we stop the spread, by staying one step ahead!

![](pics/timeline3.png)

This is called **contact tracing**. It's an old idea, was used at an unprecedented scale to contain Ebola[^ebola], and now it's core part of how Taiwan & South Korea are containing COVID-19!

[^ebola]: “Contact tracing was a critical intervention in Liberia and represented one of the largest contact tracing efforts during an epidemic in history.” [Swanson KC, Altare C, Wesseh CS, et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6152989/)

(It also lets us use our limited tests more efficiently, to find pre-symptomatic <icon i></icon>s without needing to test almost everyone.)

Traditionally, contacts are found with in-person interviews, but those *alone* are too slow for COVID-19's ~48 hour window. That's why contact tracers need help, and be supported by – *NOT* replaced by – contact tracing apps.

(Ta ideja ni prišla s strani računalničarjev: uporaba aplikacije za boj proti COVID-19 je bila sprva predlagana s strani [ekipe Oxford-skih epidemiologov](https://science.sciencemag.org/content/early/2020/04/09/science.abb6936).)

Čakaj, aplikacije, ki beležijo s kom si bil v stiku? ... Ali to pomeni, da se odrekamo zasebnosti in jo dajamo "Velikemu bratu"?


Seveda ne! **[DP-3T](https://github.com/DP-3T/documents#decentralized-privacy-preserving-proximity-tracing)**, 
skupina epidemiologov & kriptografov (including one of us, Marcel Salathé) *že* delajo na tej aplikaciji – 
z javno dostopno kodo – ki ne razkrije **nobenih informacij o tvoji identiteti, lokaciji, s kom 
ali celo *s koliko ljudmi* si bil v stiku.**

Tako deluje:

![](pics/dp3t.png)

(& [Tukaj je celoten strip.](https://ncase.me/contact-tracing/))

Skupaj s podobnimi skupinami kot so TCN Protocol[^tcn] in MIT PACT[^pact], so navdihnili podjetji Apple & Google
to bake sledenje stikov, katerih prioriteta je varovanje zasebnosti neposredno v sistem Android/iOS.[^gapple]
(Ne zaupaš Google-u/Apple-u? Dobro! Lepota sistema je, da ne *potrebuje* zaupanja.
Kmalu bo lokalna zdravstena agencija morda predlagala, da jo preneseš. Če je prioriteta aplikacije varovanje zasebnosti z javno dostopno kodo,
jo, prosim, prenesi!

[^tcn]: [Temporary Contact Numbers, decentraliziran protokol sledenja stikov z varnostjo zasebnosti](https://github.com/TCNCoalition/TCN#tcn-protocol)

[^pact]: [PACT: Private Automated Contact Tracing](https://pact.mit.edu/)

[^gapple]: [Podjetji Apple and Google sodelujeta pri tehnologiji sledenja stikov v zvezi z virusom COVID-19](https://www.apple.com/ca/newsroom/2020/04/apple-and-google-partner-on-covid-19-contact-tracing-technology/). Pomni, da ne ustvarjajo aplikacij *samih*, zgolj sisteme, ki jih bodo podpirale.

Kaj pa ljudje brez pametnih telefonov? Ali pa okužbe preko "vratnih kljuk"? Ali "popolnoma" asimptomatski primeri? Aplikacije sledenja stikov ne morejo prestreči vseh prenosov ... *Kar je čisto V redu!* Ni nam treba prestreči *vseh*, vsaj 60%, da je R < 1.

(razburjanje glede zmede med pre-simptomatskimi in *popolnoma* asimptomatskimi. Slednji so redki:[^razburjenje])

[^razburjenje]: Veliko novih poročil - iskreno, res veliko - ni razlikovalo med "primeri, ki niso pokazali nikakršnih simptomov, ko smo jih testirali" (pre-simptomatski) in "primeri, ki jih *nikdar* niso pokazali" (popolnoma asimptomatski). Edini način razlikovanja je poznejše nadoknadenje primerov.

    Kar je točno to, kar je [raziskava](https://wwwnc.cdc.gov/eid/article/26/8/20-1274_article) naredila. (Izjava o omejevanju odgovornosti: "Zgodnje izšli članki niso obravnavani kot končne različice.") V klicnem centru v Južni Koreji, kjer so imeli izbruh virusa COVID-19, "so le štirje (1.9 %) ostali asimptomatski v roku štirinajstih dni karantene in noben od stikov z njihovimi gospodinjstvi ni pripeljal do sekunarnih okužb."

    To pomeni, da so  "popolnoma asimptimatski" redki, nalezenje od popolnoma asimptomatskega primera pa še redkeje!

Izolacija *simptomatskih* primerov bi znižala R do 40 %, and karantenizacija njihovih *pre/a-simptomatičnih* stikov bi znižala R vse do 50 %[^oxford]:

[^oxford]: Iz iste oxford-ske raziskave, ki je prva predlagala aplikacije za boj proti virusu COVID-19: [Luca Ferretti & Chris Wymant et al](https://science.sciencemag.org/content/early/2020/04/09/science.abb6936/tab-figures-data) Glej diagram 2. Če predpostavimo R<sub>0</sub> = 2.0, potem velja:    

    * Simptomatski prispevajo R = 0,8 (40 %)
    * Pre-simptomatski prispevajo R = 0,9 (45 %)
    * Asimptomatski prispevajo R = 0.1 (5 %, sicer njihov model še ima negotovosti in je lahko R precej nižji.)
    * Okoljski predmeti kot so kljuke prispevajo R = 0.2 (10%)

    In seštej pre- & a-simptomatske stike (45% + 5%) in znaša R 50%!

<div class="sim">
		<iframe src="sim?stage=int-4a&format=calc" width="285" height="340"></iframe>
</div>

Zatorej, četudi se nena 100% stikov osami, lahko dobimo R < 1  *brez karantene!* Veliko boljše za naše mentalno & finančno zdravje.
(Kar se tiče stroškov za ljudi, ki se morajo samoosamiti / karantenizirati, *vlada bi jih morala podpreti* – plačati teste, preprečiti izgubo službe, subvencionirati plačani dopust, etc. Še vedno veliko cenejša od karantene.)

Potem ohranjamo R < 1 until dokler nimamo zdravila, ki spremeni dovzetne <icon s></icon> v imune <icon r></icon>. Imuniteta črede, tokrat na *pravi* način:

<div class="sim">
		<iframe src="sim?stage=int-4b&format=calc" width="285" height="230"></iframe>
</div>

(Pomni: ta kalkulator privzema, da je zdravilo 100% učinkovito. Ne pozabi, da v realnosti bomo morali kompenzirati cepljenje *več* kot "čredne imunosti", da  *dejansko* dobimo čredno imunost)

Dobro, dovolj govorjenja. Tukaj je simulacija za:

1. Nekaj mesečno karanteno, dokler ne ...
2. Preklopimo na "Testiraj, Izsledi, Izoliraj" dokler ne...
3. cepimo dovolj ljudi, kar pomeni...
4. Zmagali smo.

<div class="sim">
		<iframe src="sim?stage=int-5&format=lines" width="800" height="540"></iframe>
</div>

Torej, to je to! Tako izvedemo zasilni pristanek na tem letalu.

Tako premagamo COVID-19.

...


Kaj pa, če gredo stvari *še vedno* narobe? 
Stvari so že potekale zelo narobe. To je strah in to je dobro! Strah nam da energijo, da ustvarimo *rezervne načrte*.

Pesimist izumi padalo.

###Scenarij 4+: Maske za vse, poletje, varnostno stikalo

Kaj če je  R<sub>0</sub> veliko višji kot smo predvideli, in zgornji posegi, tudi z blagim distanciranjem, *še vedno* niso dovolj, da dobimo R < 1?

Ne pozabi, 
tudi če ne moremo dobiti R <1, zmanjšanje R še vedno zniža "presežek" v skupnih primerih, kar reši življenja. 
Kljub temu je R <1 idealen, zato je tu še nekaj načinov za zmanjšanje R:

**Maske za vse:**

*"Čakaj,"* mogoče se boš vprašal, *"obrazne maske ne preprečijo, da zboliš?"*

Prav imaš. Maske ne preprečijo, da zboliš[^incoming]... preprečijo ti, da okužiš *ostale*.

[^incoming]: “Nobena od teh kirurških mask ni pokazala ustreznih lastnosti filtra in obraznega prileganja, da bi jih lahko šteli kot pripomočke za zaščito dihal.” [Tara Oberg & Lisa M. Brosseau](https://www.sciencedirect.com/science/article/pii/S0196655307007742)

[^outgoing]: “Skupno 3,4-kratno zmanjšanje [70 % zmanjšanje] kopirnih števil aerosola, ki smo ga opazovali kombiniranega s skoraj popolno eliminacijo razpršila velikih kapljic, ki je bil demonstriran s strani Johnsona et al., predlaga, da bi kirurške maske, ki jih nosijo okuženi, lahko imele klinično signifikantni prispevek k prenosu.” [Milton DK, Fabian MP, Cowling BJ, Grantham ML, McDevitt JJ](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3591312/)

[^homemade]: [Davies, A., Thompson, K., Giri, K., Kafatos, G., Walker, J., & Bennett, A](https://www.cambridge.org/core/journals/disaster-medicine-and-public-health-preparedness/article/testing-the-efficacy-of-homemade-masks-would-they-protect-in-an-influenza-pandemic/0921A05A69A9419C862FA2F35F819D55) Glej seznam 1: 100 % bombažna majica ima okrog 2/3 filtrirne učinkovitosti kirurške maske, kar velja za dva bakterijska aerosola, za katera so testirali.

![](pics/masks.png)

Predstavljeno v številkah: kirurška maska *na zboleli osebi* zmanjša prenos virusa pri prehladu & gripi preko zraka do 70 %.[^outgoing] Zmanjšanje prenosov za 70 % bi imelo tako velik vpliv kot karantena!

Vseeno, ne vemo zagotovo kakšen vpliv imajo maske pri virusu COVID-19 *specifično*. V znanosti, se ugotovitev lahko objavi samo, če je gotovost 95 %. (...lahko.[^replication]) Maske imajo, od 1. maja 2020, manjšo zanesljivost od 95 %.

[^replication]: 
Vsak dejanski znanstvenik, ki je prebral zadnji stavek, se verjetno trenutno smeje-joče. Glej: [p-hacking](https://en.wikipedia.org/wiki/Data_dredging), [kriza podvajanja](https://en.wikipedia.org/wiki/Replication_crisis))

Pandemija je kot poker. **Če staviš zgolj, ko si 95% prepričan, boš izgubil vse.** Kot ugotavlja nedavni članek o maskah v Britanskem medicinskem časopisu,[^precautionary]  *moramo* sprejemati cena/korist analize glede na negotovost. Kot so:

[^precautionary]: “Čas je za vpeljavo previdnostnega načela” [Trisha Greenhalgh et al \[PDF\]](https://www.bmj.com/content/bmj/369/bmj.m1435.full.pdf)

Cena: V primeru doma izdelanih iz blaga (ki so približno 2/3 tako efektivne kot kirurške maske [^homemade]) je cena zelo ugodna. V primeru kirurških mask je cena višja, a še vedno precej ugodna.

Korist: Tudi, če je možnost, da kirurške maske znižajo prenos za 0 % ali 70 %, 50 %, je povprečna "pričakovana vrendnost" še zmeraj 35 %. Tako kot polovična karantena! Torej ugibajmo, da kirurške maske znižajo R za največ 35%, zaradi negotovosti. (Ponovno, lahko preveriš naše predpostavke s premikanjem drsnikov gor ali dol)

<div class="sim">
		<iframe src="sim?stage=int-6a&format=calc" width="285" height="380"></iframe>
</div>

(ostali argumenti za/proti maskam:[^mask_args])

[^mask_args]: **"Prihraniti moramo zaloge za bolnišnice."** *Absolutno drži.* Toda to je bolj argument za povečanje proizvodnje mask, ne omejevanje količine.
Medtem pa si lahko naredimo maske iz tkanin.

   **"Težko jih je nositi pravilno."** Prav tako si je težko umivati roke v skladu s smernicami WHO – resno, "korek 3.) Dlan desne roke preko hrbtišča leve?! – Vseeno še vedno priporočamo umivanje rok, saj je nepopolno še zmeraj bolje kakor nič.

   **"Ljudje bodo bolj nepremišljeni pri umivanju rok in socialem distanciranju."** Kakopak! Zaradi varnostnih pasov ljudje tudi ignorirajo stop znake, prav tako zaradi nitkanja ljudje jedo kamenje. Zdaj pa zares, zavzemali bi se za nasprotno: maske so *neprestani fizični opomnik*, da moramo biti previdni – V Vzhodni Aziji so celo simbol solidarnosti.



Maske *same* ne bodo privedle do R < 1. Toda, če nas umivanje rok in "Testiraj, Izsledi, Izoliraj" pride zgolj do R = 1.10, bi z nošo mask 1/3 ljudi dosegli R < 1 in virus obvladali!

**Poletje:**

Ok, to ni "intervencija", ki jo lahko nadzorujemo, lahko pa pomaga! Nekatere novice poročajo, da poletje COVID-19 ne bo ničesar storilo. Imajo deloma res: poljetje ne bo zagotovilo R < 1, ampak ga *bo* zmanjšalo R.

Pri COVID-19, vsaka dodatna 1° Celsius (2.2° Fahrenheit) povzroči upad R za 1.2%.[^heat] 
Temperaturna razlika poletje-zima je v New Yorku  15 ° C (60 ° F), torej bo s poletjem upad R za 18%.

[^heat]: “Zvišanje temperature za eno stopinjo Celzija [...] zniža R za 0.0225” in “Povprečna vrednost R teh 100 mest je 1,83”. 0.0225 ÷ 1.83 = ~1.2%. [Wang, Jingyuan and Tang, Ke and Feng, Kai and Lv, Weifeng](https://papers.ssrn.com/sol3/Papers.cfm?abstract_id=3551767)

<div class="sim">
		<iframe src="sim?stage=int-6b&format=calc" width="285" height="220"></iframe>
</div>

*Poletje samo ne bo znižalo R < 1, če pa imamo omejene vire, we can scale back some interventions in the summer – so we can scale them *higher* in the winter.

** "Varnostno stikalo" - karantena:**

In če vse to še  *vedno* ni dovolj, da dobimo R < 1... lahko ponovno uvedemo karanteno.

But we wouldn't have to be 2-months-closed / 1-month-open over & over! Because R is reduced, we'd only need one or two more "circuit breaker" lockdowns before a vaccine is available. (Singapore had to do this recently, "despite" having controlled COVID-19 for 4 months. That's not failure: this *is* what success takes.)

Here's a simulation a "lazy case" scenario:

1. Lockdown, then
2. A moderate amount of hygiene & "Test, Trace, Isolate", with a mild amount of "Masks For All", then...
3. One more "circuit breaker" lockdown before a vaccine's found.

<div class="sim">
		<iframe src="sim?stage=int-7&format=lines&height=620" width="800" height="620"></iframe>
</div>

Not to mention all the *other* interventions we could do, to further push R down:

* Travel restrictions/quarantines
* Temperature checks at malls & schools
* Deep-cleaning public spaces
* [Replacing hand-shaking with foot-bumping](https://twitter.com/V_actually/status/1233785527788285953)
* And all else human ingenuity shall bring

. . .

We hope these plans give you hope.

**Even under a pessimistic scenario, it *is* possible to beat COVID-19, while protecting our mental and financial health.** Use the lockdown as a "reset button", keep R < 1 with case isolation + privacy-protecting contract tracing + at *least* cloth masks for all... and life can get back to a normal-ish!

Sure, you may have dried-out hands. But you'll get to invite a date out to a comics bookstore! You'll get to go out with friends to watch the latest Hollywood cash-grab. You'll get to people-watch at a library, taking joy in people going about the simple business of *being alive.*

Even under the worst-case scenario... life perseveres.

So now, let's plan for some *worse* worst-case scenarios. Water landing, get your life jacket, and please follow the lights to the emergency exits:

<div class="section chapter">
    <div>
		<img src="banners/curve.png" height=480 style="position: absolute;"/>
        <div>The Next Few Years</div>
    </div>
</div>

You get COVID-19, and recover. Or you get the COVID-19 vaccine. Either way, you're now immune...

...*for how long?*

* COVID-19 is most closely related to SARS, which gave its survivors 2 years of immunity.[^SARS immunity]
* The coronaviruses that cause "the" common cold give you 8 months of immunity.[^cold immunity]
* There's reports of folks recovering from COVID-19, then testing positive again, but it's unclear if these are false positives.[^unclear]
* One *not-yet-peer-reviewed* study on monkeys showed immunity to the COVID-19 coronavirus for at least 28 days.[^monkeys]

But for COVID-19 *in humans*, as of May 1st 2020, "how long" is the big unknown.

[^SARS immunity]: “SARS-specific antibodies were maintained for an average of 2 years [...] Thus, SARS patients might be susceptible to reinfection ≥3 years after initial exposure.” [Wu LP, Wang NC, Chang YH, et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2851497/) "Sadly" we'll never know how long SARS immunity would have really lasted, since we eradicated it so quickly.

[^cold immunity]: “We found no significant difference between the probability of testing positive at least once and the probability of a recurrence for the beta-coronaviruses HKU1 and OC43 at 34 weeks after enrollment/first infection.” [Marta Galanti & Jeffrey Shaman (PDF)](http://www.columbia.edu/~jls106/galanti_shaman_ms_supp.pdf)

[^unclear]: “Once a person fights off a virus, viral particles tend to linger for some time. These cannot cause infections, but they can trigger a positive test.” [from STAT News by Andrew Joseph](https://www.statnews.com/2020/04/20/everything-we-know-about-coronavirus-immunity-and-antibodies-and-plenty-we-still-dont/)

[^monkeys]: From [Bao et al.](https://www.biorxiv.org/content/10.1101/2020.03.13.990226v1.abstract) *Disclaimer: This article is a preprint and has not been certified by peer review (yet).* Also, to emphasize: they only tested re-infection 28 days later.

For these simulations, let's say it's 1 year.
**Here's a simulation starting with 100% <icon r></icon>**, exponentially decaying into susceptible, no-immunity <icon s></icon>s after 1 year, on *average*, with variation:

<div class="sim">
		<iframe src="sim?stage=yrs-1&format=lines&height=600" width="800" height="600"></iframe>
</div>

Return of the exponential decay!

This is the **SEIRS Model**. The final "S" stands for <icon s></icon> Susceptible, again.

![](pics/seirs.png)

Now, let's simulate a COVID-19 outbreak, over 10 years, with no interventions... *if immunity only lasts a year:*

<div class="sim">
		<iframe src="sim?stage=yrs-2&format=lines&height=600" width="800" height="600"></iframe>
</div>

In previous simulations, we only had *one* ICU-overwhelming spike. Now, we have several, *and* <icon i></icon> cases come to a rest *permanently at* ICU capacity. (Which, remember, we *tripled* for these simulations)

R = 1, it's **endemic.**

Thankfully, because summer reduces R, it'll make the situation better:

<div class="sim">
		<iframe src="sim?stage=yrs-3&format=lines&height=640" width="800" height="640"></iframe>
</div>

Oh.

Counterintuitively, summer makes the spikes worse *and* regular! This is because summer reduces new <icon i></icon>s, but that in turn reduces new immune <icon r></icon>s. Which means immunity plummets in the summer, *creating* large regular spikes in the winter.

Thankfully, the solution to this is pretty straightforward – just vaccinate people every fall/winter, like we do with flu shots:

**(After playing the recording, try simulating your own vaccination campaigns! Remember you can pause/continue the sim at any time)**

<div class="sim">
		<iframe src="sim?stage=yrs-4&format=lines" width="800" height="540"></iframe>
</div>

But here's the scarier question:

What if there's no vaccine for *years*? Or *ever?*

**To be clear: this is unlikely.** Most epidemiologists expect a vaccine in 1 to 2 years. Sure, there's never been a vaccine for any of the other coronaviruses before, but that's because SARS was eradicated quickly, and "the" common cold wasn't worth the investment.

Still, infectious disease researchers have expressed worries: What if we can't make enough?[^vax_enough] What if we rush it, and it's not safe?[^vax_safe]

[^vax_enough]: “If a coronavirus vaccine arrives, can the world make enough?” [by Roxanne Khamsi, on Nature](https://www.nature.com/articles/d41586-020-01063-8)

[^vax_safe]: “Don’t rush to deploy COVID-19 vaccines and drugs without sufficient safety guarantees” [by Shibo Jiang, on Nature](https://www.nature.com/articles/d41586-020-00751-9)

Even in the nightmare "no-vaccine" scenario, we still have 3 ways out. From most to least terrible:

1) Do intermittent or loose R < 1 interventions, to reach "natural herd immunity". (Warning: this will result in many deaths & damaged lungs. *And* won't work if immunity doesn't last.)

2) Do the R < 1 interventions forever. Contact tracing & wearing masks just becomes a new norm in the post-COVID-19 world, like how STI tests & wearing condoms became a new norm in the post-HIV world.

3) Do the R < 1 interventions until we develop treatments that make COVID-19 way, way less likely to need critical care. (Which we should be doing *anyway!*) Reducing ICU use by 10x is the same as increasing our ICU capacity by 10x:

**Here's a simulation of *no* lasting immunity, *no* vaccine, and not even any interventions – just slowly increasing capacity to survive the long-term spikes:**

<div class="sim">
		<iframe src="sim?stage=yrs-5&format=lines" width="800" height="540"></iframe>
</div>

Even under the *worst* worst-case scenario... life perseveres.

. . .

Maybe you'd like to challenge our assumptions, and try different R<sub>0</sub>'s or numbers. Or try simulating your *own* combination of intervention plans!

**Here's an (optional) Sandbox Mode, with *everything* available. (scroll to see all controls) Simulate & play around to your heart's content:**

<div class="sim">
		<iframe src="sim?stage=SB&format=sb" width="800" height="540"></iframe>
</div>

This basic "epidemic flight simulator" has taught us so much. It's let us answer questions about the past few months, next few months, and next few years.

So finally, let's return to...

<div class="section chapter">
    <div>
		<img src="banners/curve.png" height=480 style="position: absolute;"/>
        <div>The Now</div>
    </div>
</div>

Plane's sunk. We've scrambled onto the life rafts. It's time to find dry land.[^dry_land]

[^dry_land]: Dry land metaphor [from Marc Lipsitch & Yonatan Grad, on STAT News](https://www.statnews.com/2020/04/01/navigating-covid-19-pandemic/)

Teams of epidemiologists and policymakers ([left](https://www.americanprogress.org/issues/healthcare/news/2020/04/03/482613/national-state-plan-end-coronavirus-crisis/), [right](https://www.aei.org/research-products/report/national-coronavirus-response-a-road-map-to-reopening/ ), and [multi-partisan](https://ethics.harvard.edu/covid-roadmap)) have come to a consensus on how to beat COVID-19, while protecting our lives *and* liberties.

Here's the rough idea, with some (less-consensus) backup plans:

![](pics/plan.png)

So what does this mean for YOU, right now?

**For everyone:** Respect the lockdown so we can get out of Phase I asap. Keep washing those hands. Make your own masks. Download a *privacy-protecting* contact tracing app when those are available next month. Stay healthy, physically & mentally! And write your local policymaker to get off their butt and...

**For policymakers:** Make laws to support folks who have to self-isolate/quarantine. Hire more manual contact tracers, *supported* by privacy-protecting contact tracing apps. Direct more funds into the stuff we should be building, like...

**For builders:** Build tests. Build ventilators. Build personal protective equipment for hospitals. Build tests. Build masks. Build apps. Build antivirals, prophylactics, and other treatments that aren't vaccines. Build vaccines. Build tests. Build tests. Build tests. Build hope.

Don't downplay fear to build up hope. Our fear should *team up* with our hope, like the inventors of airplanes & parachutes. Preparing for horrible futures is how we *create* a hopeful future.

The only thing to fear is the idea that the only thing to fear is fear itself.
