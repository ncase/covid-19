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
        <div>The Next Few Months</div>
    </div>
</div>

...could have been worse. Here's a parallel universe we avoided:

###Scenario 0: Do Absolutely Nothing

Around 1 in 20 people infected with COVID-19 need to go to an ICU (Intensive Care Unit).[^icu_covid] In a rich country like the USA, there's 1 ICU bed per 3400 people.[^icu_us] Therefore, the USA can handle 20 out of 3400 people being *simultaneously* infected – or, 0.6% of the population.

[^icu_covid]: ["Percentage of COVID-19 cases in the United States from February 12 to March 16, 2020 that required intensive care unit (ICU) admission, by age group"](https://www.statista.com/statistics/1105420/covid-icu-admission-rates-us-by-age-group/). Between 4.9% to 11.5% of *all* COVID-19 cases required ICU. Generously picking the lower range, that's 5% or 1 in 20. Note that this total is specific to the US's age structure, and will be higher in countries with older populations, lower in countries with younger populations.

[^icu_us]: “Number of ICU beds = 96,596”. From [the Society of Critical Care Medicine](https://sccm.org/Blog/March-2020/United-States-Resource-Availability-for-COVID-19) USA Population was 328,200,000 in 2019. 96,596 out of 328,200,000 = roughly 1 in 3400.

Even if we *more than tripled* that capacity to 2%, here's what would've happened *if we did absolutely nothing:*

<div class="sim">
		<iframe src="sim?stage=int-1&format=lines" width="800" height="540"></iframe>
</div>

Not good.

That's what [the March 16 Imperial College report](http://www.imperial.ac.uk/mrc-global-infectious-disease-analysis/covid-19/report-9-impact-of-npis-on-covid-19/) found: do nothing, and we run out of ICUs, with more than 80% of the population getting infected.
(remember: total cases *overshoots* herd immunity)

Even if only 0.5% of infected die – a generous assumption when there's no more ICUs – in a large country like the US, with 300 million people, 0.5% of 80% of 300 million = still 1.2 million dead... *IF we did nothing.*

(Lots of news & social media reported "80% will be infected" *without* "IF WE DO NOTHING". Fear was channelled into clicks, not understanding. *Sigh.*)

###Scenario 1: Flatten The Curve / Herd Immunity

The "Flatten The Curve" plan was touted by every public health organization, while the United Kingdom's original "herd immunity" plan was universally booed. They were *the same plan.* The UK just communicated theirs poorly.[^yong]

[^yong]: “He says that the actual goal is the same as that of other countries: flatten the curve by staggering the onset of infections. As a consequence, the nation may achieve herd immunity; it’s a side effect, not an aim. [...] The government’s actual coronavirus action plan, available online, doesn’t mention herd immunity at all.”

    From a [The Atlantic article by Ed Yong](https://www.theatlantic.com/health/archive/2020/03/coronavirus-pandemic-herd-immunity-uk-boris-johnson/608065/)

Both plans, though, had a literally fatal flaw.

First, let's look at the two main ways to "flatten the curve": handwashing & physical distancing.

Increased handwashing cuts flus & colds in high-income countries by ~25%[^handwashing], while the city-wide lockdown in London cut close contacts by ~70%[^london]. So, let's assume handwashing can reduce R by *up to* 25%, and distancing can reduce R by *up to* 70%:

[^handwashing]: “All eight eligible studies reported that handwashing lowered risks of respiratory infection, with risk reductions ranging from 6% to 44% [pooled value 24% (95% CI 6–40%)].” We rounded up the pooled value to 25% in these simulations for simplicity. [Rabie, T. and Curtis, V.](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1365-3156.2006.01568.x) Note: as this meta-analysis points out, the quality of studies for handwashing (at least in high-income countries) are awful.

[^london]: “We found a 73% reduction in the average daily number of contacts observed per participant. This would be sufficient to reduce R0 from a value from 2.6 before the lockdown to 0.62 (0.37 - 0.89) during the lockdown”. We rounded it down to 70% in these simulations for simplicity. [Jarvis and Zandvoort et al](https://cmmid.github.io/topics/covid19/comix-impact-of-physical-distance-measures-on-transmission-in-the-UK.html)

**Play with this calculator to see how % of non-<icon s></icon>, handwashing, and distancing reduce R:** (this calculator visualizes their *relative* effects, which is why increasing one *looks* like it decreases the effect of the others.[^log_caveat])

[^log_caveat]: This distortion would go away if we plotted R on a logarithmic scale... but then we'd have to explain *logarithmic scales.*

<div class="sim">
		<iframe src="sim?stage=int-2a&format=calc" width="285" height="260"></iframe>
</div>

Now, let's simulate what happens to a COVID-19 epidemic if, starting March 2020, we had increased handwashing but only *mild* physical distancing – so that R is lower, but still above 1:

<div class="sim">
		<iframe src="sim?stage=int-2&format=lines" width="800" height="540"></iframe>
</div>

Three notes:

1. This *reduces* total cases! **Even if you don't get R < 1, reducing R still saves lives, by reducing the 'overshoot' above herd immunity.** Lots of folks think "Flatten The Curve" spreads out cases without reducing the total. This is impossible in *any* Epidemiology 101 model. But because the news reported "80%+ will be infected" as inevitable, folks thought total cases will be the same no matter what. *Sigh.*

2. Due to the extra interventions, current cases peak *before* herd immunity is reached. In fact, in this simulation, total cases only overshoots *a tiny bit* above herd immunity – the UK's plan! At that point, R < 1, you can let go of all other interventions, and COVID-19 stays contained! Well, except for one problem...

3. You still run out of ICUs. For several months. (and remember, we *already* tripled ICUs for these simulations)

That was the other finding of the March 16 Imperial College report, which convinced the UK to abandon its original plan. Any attempt at **mitigation** (reduce R, but R > 1) will fail. The only way out is **suppression** (reduce R so that R < 1).

![](pics/mitigation_vs_suppression.png)

That is, don't merely "flatten" the curve, *crush* the curve. For example, with a...

###Scenario 2: Months-Long Lockdown

Let's see what happens if we *crush* the curve with a 5-month lockdown, reduce <icon i></icon> to nearly nothing, then finally – *finally* – return to normal life:

<div class="sim">
		<iframe src="sim?stage=int-3&format=lines" width="800" height="540"></iframe>
</div>

Oh.

This is the "second wave" everyone's talking about. As soon as we remove the lockdown, we get R > 1 again. So, a single leftover <icon i></icon> (or imported <icon i></icon>) can cause a spike in cases that's almost as bad as if we'd done Scenario 0: Absolutely Nothing.

**A lockdown isn't a cure, it's just a restart.**

So, what, do we just lockdown again & again?

###Scenario 3: Intermittent Lockdown

This solution was first suggested by the March 16 Imperial College report, and later again by a Harvard paper.[^lockdown_harvard]

[^lockdown_harvard]: “Absent other interventions, a key metric for the success of social distancing is whether critical care capacities are exceeded. To avoid this, prolonged or intermittent social distancing may be necessary into 2022.” [Kissler and Tedijanto et al](https://science.sciencemag.org/content/early/2020/04/14/science.abb5793)

**Here's a simulation:** (After playing the "recorded scenario", you can try simulating your *own* lockdown schedule, by changing the sliders *while* the simulation is running! Remember you can pause & continue the sim, and change the simulation speed)

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

    ToSo that means "true asymptomatics" are rare, and catching the disease from a true asymptomatic may be even rarer!

Isolating *symptomatic* cases would reduce R by up to 40%, and quarantining their *pre/a-symptomatic* contacts would reduce R by up to 50%[^oxford]:

[^oxford]: From the same Oxford study that first recommended apps to fight COVID-19: [Luca Ferretti & Chris Wymant et al](https://science.sciencemag.org/content/early/2020/04/09/science.abb6936/tab-figures-data) See Figure 2. Assuming R<sub>0</sub> = 2.0, they found that:    

    * Symptomatics contribute R = 0.8 (40%)
    * Pre-symptomatics contribute R = 0.9 (45%)
    * Asymptomatics contribute R = 0.1 (5%, though their model has uncertainty and it could be much lower)
    * Environmental stuff like doorknobs contribute R = 0.2 (10%)

    And add up the pre- & a-symptomatic contacts (45% + 5%) and you get 50% of R!

<div class="sim">
		<iframe src="sim?stage=int-4a&format=calc" width="285" height="340"></iframe>
</div>

Thus, even without 100% contact quarantining, we can get R < 1 *without a lockdown!* Much better for our mental & financial health. (As for the cost to folks who have to self-isolate/quarantine, *governments should support them* – pay for the tests, job protection, subsidized paid leave, etc. Still way cheaper than intermittent lockdown.)

We then keep R < 1 until we have a vaccine, which turns susceptible <icon s></icon>s into immune <icon r></icon>s. Herd immunity, the *right* way:

<div class="sim">
		<iframe src="sim?stage=int-4b&format=calc" width="285" height="230"></iframe>
</div>

(Note: this calculator pretends the vaccines are 100% effective. Just remember that in reality, you'd have to compensate by vaccinating *more* than "herd immunity", to *actually* get herd immunity)

Okay, enough talk. Here's a simulation of:

1. A few-month lockdown, until we can...
2. Switch to "Test, Trace, Isolate" until we can...
3. Vaccinate enough people, which means...
4. We win.

<div class="sim">
		<iframe src="sim?stage=int-5&format=lines" width="800" height="540"></iframe>
</div>

So that's it! That's how we make an emergency landing on this plane.

That's how we beat COVID-19.

...

But what if things *still* go wrong? Things have gone horribly wrong already. That's fear, and that's good! Fear gives us energy to create *backup plans*.

The pessimist invents the parachute.

###Scenario 4+: Masks For All, Summer, Circuit Breakers

What if R<sub>0</sub> is way higher than we thought, and the above interventions, even with mild distancing, *still* aren't enough to get R < 1?

Remember, even if we can't get R < 1, reducing R still reduces the "overshoot" in total cases, thus saving lives. But still, R < 1 is the ideal, so here's a few other ways to reduce R:

**Masks For All:**

*"Wait,"* you might ask, *"I thought face masks don't stop you from getting sick?"*

You're right. Masks don't stop you from getting sick[^incoming]... they stop you from getting *others* sick.

[^incoming]: “None of these surgical masks exhibited adequate filter performance and facial fit characteristics to be considered respiratory protection devices.” [Tara Oberg & Lisa M. Brosseau](https://www.sciencedirect.com/science/article/pii/S0196655307007742)

[^outgoing]: “The overall 3.4 fold reduction [70% reduction] in aerosol copy numbers we observed combined with a nearly complete elimination of large droplet spray demonstrated by Johnson et al. suggests that surgical masks worn by infected persons could have a clinically significant impact on transmission.” [Milton DK, Fabian MP, Cowling BJ, Grantham ML, McDevitt JJ](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3591312/)

[^homemade]: [Davies, A., Thompson, K., Giri, K., Kafatos, G., Walker, J., & Bennett, A](https://www.cambridge.org/core/journals/disaster-medicine-and-public-health-preparedness/article/testing-the-efficacy-of-homemade-masks-would-they-protect-in-an-influenza-pandemic/0921A05A69A9419C862FA2F35F819D55) See Table 1: a 100% cotton T-shirt has around 2/3 the filtration efficiency as a surgical mask, for the two bacterial aerosols they tested.

![](pics/masks.png)

To put a number on it: surgical masks *on the sick person* reduce cold & flu viruses in aerosols by 70%.[^outgoing] Reducing transmissions by 70% would be as large an impact as a lockdown!

However, we don't know for sure the impact of masks on COVID-19 *specifically*. In science, one should only publish a finding if you're 95% sure of it. (...should.[^replication]) Masks, as of May 1st 2020, are less than "95% sure".

[^replication]: Any actual scientist who read that last sentence is probably laugh-crying right now. See: [p-hacking](https://en.wikipedia.org/wiki/Data_dredging), [the replication crisis](https://en.wikipedia.org/wiki/Replication_crisis))

However, pandemics are like poker. **Make bets only when you're 95% sure, and you'll lose everything at stake.** As a recent article on masks in the British Medical Journal notes,[^precautionary] we *have* to make cost/benefit analyses under uncertainty. Like so:

[^precautionary]: “It is time to apply the precautionary principle” [Trisha Greenhalgh et al \[PDF\]](https://www.bmj.com/content/bmj/369/bmj.m1435.full.pdf)

Cost: If homemade cloth masks (which are ~2/3 as effective as surgical masks[^homemade]), super cheap. If surgical masks, more expensive but still pretty cheap.

Benefit: Even if it's a 50–50 chance of surgical masks reducing transmission by 0% or 70%, the average "expected value" is still 35%, same as a half-lockdown! So let's guess-timate that surgical masks reduce R by up to 35%, discounted for our uncertainty. (Again, you can challenge our assumptions by turning the sliders up/down)

<div class="sim">
		<iframe src="sim?stage=int-6a&format=calc" width="285" height="380"></iframe>
</div>

(other arguments for/against masks:[^mask_args])

[^mask_args]: **"We need to save supplies for hospitals."** *Absolutely agreed.* But that's more of an argument for increasing mask production, not rationing. In the meantime, we can make cloth masks.

   **"They're hard to wear correctly."** It's also hard to wash your hands according to the WHO Guidelines – seriously, "Step 3) right palm over left dorsum"?! – but we still recommend handwashing, because imperfect is still better than nothing.

   **"It'll make people more reckless with handwashing & social distancing."** Sure, and safety belts make people ignore stop signs, and flossing makes people eat rocks. But seriously, we'd argue the opposite: masks are a *constant physical reminder* to be careful – and in East Asia, masks are also a symbol of solidarity!



Masks *alone* won't get R < 1. But if handwashing & "Test, Trace, Isolate" only gets us to R = 1.10, having just 1/3 of people wear masks would tip that over to R < 1, virus contained!

**Summer:**

Okay, this isn't an "intervention" we can control, but it will help! Some news outlets report that summer won't do anything to COVID-19. They're half right: summer won't get R < 1, but it *will* reduce R.

For COVID-19, every extra 1° Celsius (2.2° Fahrenheit) makes R drop by 1.2%.[^heat] The summer-winter difference in New York City is 15°C (60°F), so summer will make R drop by 18%.

[^heat]: “One-degree Celsius increase in temperature [...] lower[s] R by 0.0225” and “The average R-value of these 100 cities is 1.83”. 0.0225 ÷ 1.83 = ~1.2%. [Wang, Jingyuan and Tang, Ke and Feng, Kai and Lv, Weifeng](https://papers.ssrn.com/sol3/Papers.cfm?abstract_id=3551767)

<div class="sim">
		<iframe src="sim?stage=int-6b&format=calc" width="285" height="220"></iframe>
</div>

Summer alone won't make R < 1, but if we have limited resources, we can scale back some interventions in the summer – so we can scale them *higher* in the winter.

**A "Circuit Breaker" Lockdown:**

And if all that *still* isn't enough to get R < 1... we can do another lockdown.

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
