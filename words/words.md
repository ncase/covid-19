# What Happens Next?

## COVID-19 Futures, Explained With Playable Simulations

"The only thing to fear is fear itself" was stupid advice.

If people fear fear itself, they'll deny danger because they don't want to create "mass panic". The problem's not fear, but how we *use* our fear. Fear, used well, gives you energy to deal with current dangers, and prepare for future dangers.

Honestly, the two of us (Marcel, epidemiologist + Nicky, artist/coder) are worried about the future. We bet you are, too. That's why we've channeled *our* worries into making these **playable simulations**, so that you can channel *your* worries into understanding:

* **The Last Few Months** (epidemiology 101, SEIR model, R & R<sub>0</sub>)
* **The Next Few Months** (lockdowns, contact tracing, masks)
* **The Next Few Years** (loss of immunity? no safe vaccine?)

This guide is meant to give you hope *and* fear. To beat this virus **in a way that also protects our mental & financial health**, we need optimism to create plans, and pessimism to create backup plans. As Gladys Bronwyn Stern once said, *“The optimist invents the airplane and the pessimist the parachute.”*

So, buckle in: we're about to experience some turbulence.

---

# The Last Few Months

Pilots use flight simulators to learn how not to crash planes.

**Epidemiologists use epidemic simulators to learn how not to crash humanity.**

So, let's create a very simple "epidemic flight simulator"! Here, we have some (i) Infectious people & some not-yet-infected (s) Susceptible people. (i)s turn (s)s into more (i)s:

// pic

At the start of a COVID-19 outbreak, it's estimated that the virus jumps from an (i) to an (s) every 4 days.[^1] (*On average.* Remember, there's lots of variation.)

[^1]: source

Here's a simulation of a population with *just* 0.001% (i) and 99.999% (s), over 6 months. If we simulate "double every 4 days" *and nothing else*, what happens?

**Click "Start" to play the simulation! (Afterwards, you can re-play the simulation with different settings)**

// sim

This is the **exponential growth curve.** Starts small, then explodes. "Oh it's just a flu" to "Oh right, flus don't create *mass graves in rich cities*". 

// pic - exponential double rice

But, this simulation is wrong. Exponential growth, thankfully, can't go on forever. One thing that stops a virus from spreading is if others *already* have the virus:

// pic - 100% spread, 50% spread, 0% spread

**The more (i)s there are, the faster (s)s become (i)s, but the fewer (s)s there are, the *slower* (s)s become (i)s.**

Now, what happens if we simulate that?

// sim

This is the "S-shaped" **logistic growth curve.** Starts small, explodes, then slows down again.

But, this simulation is *still* wrong. We're missing the fact that (i) Infectious people eventually stop being infectious, either by 1) recovering, 2) "recovering" with lung damage, or 3) dying.

For simplicity's sake, let's pretend that all (i) Infectious people become (r) Recovered. (r)s can't be infected again, and let's pretend – *for now!* – that they stay immune for life.

When you're infected with COVID-19, it's estimated you stay (i) infectious for 12 days.[^2] (Again, *on average.*)

[^2]: source

Here's a simulation that starts with 100% (i). Most people recover after 12 days, then most of the remainder recover after another 12 days, then most of the remainder *of that remainder* recover after another 12 days, etc:

// sim

This is the opposite of exponential growth, the **exponential decay curve**.

Now, what happens if you combine this with the S-shaped logistic curve of infection?

// pic

Let's find out. Here's a simulation of an epidemic *with* recovery:

// sim

And *that's* where that famous curve comes from! It's not a bell curve, it's not even a "log-normal" curve. It has no name. But you've seen it a zillion times, and beseeched to flatten.

// pic: 3 rules

This is the the **SIR Model**, ((s) **S**usceptible → (i) **I**nfectious →  (r) **R**ecovered) the second-most important idea in Epidemiology 101.

Note: The simulations that inform policy are *far* more sophisticated than this! But the SIR model can still help us understand a lot about COVID-19, even if missing the nuances.

Actually, let's add one more nuance: before an (s) becomes an (i), they first become an (e) Exposed person, when they're infect*ed* but not yet infect*ious* – they have the virus but can't pass it on (yet).

(This variant is called the **SEIR Model**, where "E" stands for (e) Exposed. Note this *isn't* the everyday meaning of "exposed", where you might or might not have the virus. In this technical definition, "Exposed" means you definitely have it. Yeah, science terminology is bad.)

For COVID-19, it's estimated that you're in this "latent period" for around 3 days.[^3] What happens if we add that to the simulation?

[^3]: source

// sim

Not much, actually! The "latent period" only changes *when* the peak happens, but the *height* of the peak – and total people infected – remain the same:

// pics

Why's that? Because of the *first*-most important idea in Epidemiology 101:

// pic - **"R"**

Which is short for "Reproduction Number". It's the *average* number of people an (i) infects *before* they recover (or die).

// R > 1, R = 1, R < 1 pic

**R** changes over the course of an outbreak, as we get more immunity & interventions.

**R<sub>0</sub>** (pronounced R-nought) is what R is *at the start of an outbreak, before immunity or interventions*. R<sub>0</sub> is also called the "basic reproduction number". <!--R<sub>0</sub> more closely reflects the power of the virus itself, but it still changes from place to place. For example, because heat 'kills' coronaviruses, R<sub>0</sub> for COVID-19 is lower in hot places than cold ones. Not low enough to contain it, though. [source!]-->

(A lot of news outlets – and even academic papers! – confuse R and R<sub>0</sub>. Again, science terminology is bad.)

The R<sub>0</sub> for the flu[^r0_flu] is around 1.3. The R<sub>0</sub> estimates for COVID-19 are usually between 2 and 3, maybe as high as 6.[^r0_covid]

[^r0_flu]: source

[^r0_covid]: source

In our simulations, an (i) recovers in 12 days, but infects one new (s) every 4 days. That means, *on average*, an (i) infects 3 (s)s before they recover. So for our simulations, R<sub>0</sub> is 3.

**Play around with this R<sub>0</sub> calculator, to see how R<sub>0</sub> depends on recovery time & new-infection time:**

// calc

But remember, the fewer (s)s there are, the *slower* (s)s become (i)s. 
R depends not just on R<sub>0</sub>, but also how many people are no longer Susceptible – due to, say, having recovered & gotten natural immunity.

// calc 2

When enough people have natural immunity, R < 1, and the virus is contained! This is called **herd immunity**, and while it's *terrible* policy (we'll explain why later – it's not for the reason you may think!), it's essential to understanding Epidemiology 101.

Now, let's play the last simulation again, but showing R<sub>0</sub>, R over time, and the herd immunity threshold:

// sim

Note: Total cases (the gray curve) does not stop at herd immunity, but *overshoots* it! And it does this *exactly when* current cases (the pink curve) peaks. This happens no matter how you change the settings:

// pic

This is because, by definition, when there are more non-(s)s than the herd immunity threshold, you get R < 1. And, by definition, R < 1 means new cases stop growing.

If there's only one lesson you take away from this whole guide, here it is, in big shiny letters:

# R > 1 = bad
# R < 1 = good (R=1, meh)

**This means: we do NOT need to catch all transmissions, or even nearly all transmissions, to stop COVID-19!**

It's a paradox. COVID-19 is incredibly contagious, yet to contain it, we "only" need to stop 67% of infections. 67%?! If that was a school grade, that's a D+. But if R<sub>0</sub> = 3, cutting that by 67% gives us R = 0.99, which is R < 1, which means the virus is contained!

// pic calc

*Every* COVID-19 intervention you've heard of – handwashing, social distancing, lockdowns, self-isolation, contact tracing & quarantining, face masks, even "herd immunity" – they're *all* doing the same thing:

Getting R < 1.

So now, let's use our "epidemic flight simulator" to figure out the next few months! How will we get R < 1 in a way that protects not just our physical health, **but also our mental health, social health, *and* financial health?**

Brace yourselves for an emergency landing...

---

# The Next Few Months

...could have been worse. Here's a parallel universe we avoided:

###Scenario 0: Do Absolutely Nothing

Around 1 in 20 people (i) infected with COVID-19 need an ICU (Intensive Care Unit).[^ic] In a rich country like the US, there's around 1 ICU per 3000 people.[^icus] Therefore, the US can handle 20 out of 3000 people being simultaneously (i) infected with COVID-19, or, 0.67% of the population.

Even if we *tripled* that capacity, to handle 2% of the population simultaneously (i) infected, here's what would happen *if we had done absolutely nothing:*

// sim

It's not good.

That's what the March 16 Imperial College report found: if we did absolutely nothing, we run out of ICUs & 80%+ of the population gets infected.

Even if only 0.5% of (i)s die – a generous assumption when there's no more ICUs – in a large country like the US, with 300 million people, 0.5% of 80% of 300 million = still 1.2 million dead, *IF WE DID NOTHING.*

(A lot of news outlets reported the scary bit, *without* "IF WE DO NOTHING". One can channel fear into good use, but here, fear was channeled into clicks. *Sigh.*)

###Scenario 1: Flatten The Curve / Herd Immunity

The "Flatten The Curve" plan was touted by every public health organization, while the United Kingdom's original "herd immunity" plan was universally booed. They were *the same plan.*[^yong] The UK just communicated their plan terribly.

[^yong]: s

Both plans, though, are horribly flawed.

First, the plans' specific interventions: mainly, handwashing & social distancing.

Increased handwashing cuts flus & colds in "developed nations" by 25%[^handwashing], while a city-wide lockdown cuts close person-to-person proximity by 70%[^london]. So, let's assume handwashing can reduce R by *up to* 25%, and distancing can reduce R by *up to* 70%:

[^handwashing]: s

[^london]: s

// calc

Now, let's simulate what happens if we apply fervent handwashing and *mild* social distancing – so that R is lower, but still above 1:

// sim

Three notes:

1. This *reduces* total cases! Lots of folks think "Flattening The Curve" *spread outs* cases without reducing the total. This is impossible in *any* Epidemiology 101 model. But because the news reported "80%+ of world will be infected" as inevitable – not *IF WE DO NOTHING* – folks thought total cases will be the same no matter what. *Sigh.*

2. Due to the extra interventions, current cases ((e)+(i)) peaks *before* herd immunity is reached. And in fact, total cases doesn't overshoot, but *goes to* herd immunity – the UK's plan! At that point, R < 1, you can let go of all other interventions, and COVID-19 stays contained! Well, except for one problem...

3. You still run out of ICUs. Several times over. For months.

That was the other finding of the March 16 Imperial College report, which convinced the UK to abandon its original plan. Any attempt at **mitigation** (reduce R, but R > 1) will fail. The only way out is **suppression** (reduce R so that R < 1).

// pic: difference

That is, don't merely "flatten" the curve, *crush* the curve. For example, with a...

###Scenario 2: Months-Long Lockdown (we are here)

Let's see what happens if we *crush* the curve with a lockdown for 5 months. Get R < 1, and smack (i)s to the bottom.

Then finally, *finally*, we can return to normal life:

// sim

Oh.

Right, this is the "second wave" everyone's talking about. As soon as we remove the lockdown, we get R > 1 again. So, a single leftover (i) (or a single imported (i)) can cause a spike in cases that's almost as bad as if we'd done Scenario 0: Absolutely Nothing.

**A lockdown isn't a cure, it's just a restart.**

So, what, do we just lockdown again & again?

###Scenario 3: Intermittent Lockdown

This solution was first suggested by the Imperial College, and later again by Harvard[^lockdown_harvard]:

[^lockdown_harvard]: https://science.sciencemag.org/content/early/2020/04/14/science.abb5793?

// sim

This *would* in fact keep cases below ICU capacity! We'd just need to... shut everything down for 2 months, open up for 1 month, then repeat until a vaccine is available in 18 months. That's a year in total.

(And if there's no vaccine, repeat until herd immunity is reached... in 2022.)

Look, it's nice to draw a line saying "healthcare capacity", but there's lots of important things we *can't* simulate here. Like:

**Mental Health:** Loneliness is one of the biggest risk factors for depression, anxiety, and suicide. And it's as negatively associated with an early death as smoking 15 cigarettes a day.

**Financial Health:** "What about the economy" sounds like you care more about dollars than lives, but "the economy" isn't just stocks: it's people's ability to provide food & shelter for their loved ones, to invest in their kids' futures, and enjoy arts, foods, videogames – the stuff makes life worth living. And besides, poverty *itself* has horrible impacts on mental and physical health.

But wait... haven't Taiwan, South Korea, and other countries in East Asia *already* contained COVID-19? For 4 whole months? Without a single country-wide lockdown?

How?

###Scenario 4: Test, Trace, Isolate

You may be thinking:

*Sure, we \*could've\* done what Taiwan + South Korea did at the start, but it's too late now. We missed the start.*

But that's exactly it! “A lockdown isn't a cure, it's just a restart”... **and a fresh start is what we need.**

To understand how Taiwan & South Korea have contained COVID-19, we need to understand the exact timeline of the virus:

// timeline

The problem is, if cases self-isolate *only* when they know they're infected (showing symptoms), the virus can still spread:

// timeline

But if you can find who the case had recent close contact to... (e.g. was within 6 feet of someone for 30+ minutes in the last 14 days) ...and quarantine them as well, you stop the spread, by staying one step ahead!

// timeline

This is called **contact tracing**. It's a core part of Taiwan & South Korea's strategies, and several teams of Western epidemiologists + economists + policymakers, from across the political spectrum, have converged on the same answer: *this is what we need to control COVID-19, while protecting our mental & financial health.*

Which is why, in the coming months, you may be asked to install a "contact tracing app" on your phone. Which sounds like a privacy nightmare, but teams of epidemiologists and cryptographers **have already created *anonymous, decentralized* contact tracing apps.**

(Here's a comic we made about how!)

But, critics say, contact tracing apps won't catch *all* transmissions. Some people don't have smartphones. Some transmissions are through surfaces like doorknobs.

True, *and it doesn't matter*. We don't *need* to catch all or even nearly all transmissions! Just enough to get R < 1.

Specifically, a University of Oxford study estimates that isolating symptomatic cases can reduce R by up to 40%, and that quarantining their pre/a-symptomatic contacts can reduce R by up to 50%:

(p.s: a rant about "pre" vs "a"-symptomatic)

// calc

So even if you don't isolate *all* cases or quarantine *all* contacts, you can still get R below 1, *with no social distancing!*

Okay, enough talk. Here's a simulation of:

1. A few-month lockdown, followed by...
2. A switch to "Test, Trace, Isolate", for 18 months until...
3. We can vaccinate folks, turning (s)s to (r)s directly, which gets us "herd immunity" the *right* way, which means R < 1, which means...
4. We win.

// sim

Note: "Test, Trace, Isolate" is only possible when we have low enough *current* cases (which a lockdown will do) and high enough test kits (which a lockdown will buy us time to do). We also recommend that policymakers create policies giving people paid [see Vi's thing]

So that's it! That's how we make an emergency landing on this plane.

That's how we win.

...

But... you may be feeling a knot in your stomach. Things have *already* gone wrong, what if this plan goes wrong too? That's good – that's fear, which gives us energy to come up with *backup plans*.

The pessimist invents the parachute.

###Scenario 4+: Masks For All, Summer, Circuit Breakers

What if R<sub>0</sub> is way higher than we thought, and the above interventions *still* aren't enough to get R < 1?

If so, here's a few supplements:

**Masks For All:**

If there's a surgical mask shortage in your country, obviously don't hoard surgical masks. But should we all wear *homemade* cloth masks? Or make enough surgical masks so *everyone* can wear one?

"Wait", you might ask, "I thought scientists showed masks don't stop you from getting sick?"

You're right. Masks don't stop you from getting sick – they stop you from getting *others* sick. For colds/flus, surgical masks don't block incoming aerosols[^incoming]... but they block of 70% of *outgoing* aerosols[^outgoing aerosols], and almost 100% of *outgoing* droplets[^outgoing droplets]. (And home-made cloth masks are around half as efficient as surgical masks)

[^incoming]: 

[^outgoing aerosols]: 

[^outgoing droplets]: 

Since pre-symptomatic folks account for almost *half* of transmissions, that's a big deal!

// pic: why masks don't protect you, but protect others

Still, there aren't (yet) any experiments of masks for the public on COVID-19 *specifically*. However:

1) There also aren't any experiments where we push people out of planes, and half of them get placebo parachutes. Sometimes, "solid" evidence isn't possible to get, so we have to settle for "circumstantial" evidence. (In this case: X, Y, Z) (sources)

2) Pandemics are like poker. Act only when you "have solid evidence", and you'll lose everything at stake. This isn't theory, it's practice – we *have* to make cost/benefit analyses under uncertainty. The cost of masks for the public (especially cloth masks) is low. The benefit is at worst nothing, at best a massive reduction in R.

How much, exactly? The "blocks 70% of areosols" study was for surgical masks, with proper fit. Assuming imperfect use by the public, let's guess surgical masks "only" reduce R by up to 50%. And since cloth masks are half as effective, let's guess cloth masks reduce R by up to 25%:

(If you think our guesses are too high – and that's good to challenge our assumptions! – just scale the sliders down)

// calc

Masks *alone* won't get R < 1. But if handwashing + "Test, Trace, Isolate" only gets us to R = 1.2, having just 2/3 of people wear *cloth* masks would tip that over to R < 1, virus contained!

**Summer:**

Okay, this isn't an "intervention" we have control of, but it will help! Some news outlets have reported that summer won't do anything to COVID-19. They're half right: summer won't get R < 1, but it *will* reduce R.

For every extra 1° Celsius (2.2° Fahrenheit), the R for COVID-19 drops by X%. The summer-winter difference in New York City is 15°C (60°F), so summer will make R drop by X%.

// calc, over time - in your country

It's not R < 1, but if we have limited resources, we can scale back some interventions in the summer – so we can scale them *higher* in the winter.

**A "Circuit Breaker" Lockdown:**

And if all that *still* isn't enough to get R < 1... we can do another lockdown.

But we wouldn't have to be 2-months-closed/1-month-open over & over! Because R is significantly reduced, we'd only need one or two more "circuit breaker" lockdowns before a vaccine is available. (Singapore had to do this recently, "despite" having controlled COVID-19 for 4 months. That's not failure: this *is* what success takes.)

Here's a simulation a "lazy case" scenario: we lockdown hard now, then do a moderate amount of "Test, Trace, Isolate" + a moderate amount of *cloth* "Masks For All", and do one circuit breaker lockdown before a vaccine is available:

// sim

. . .

We hope these plans give you hope. 

It *is* possible to keep R < 1, *while protecting our mental, social, and financial health*. Use the lockdown as a restart, keep R < 1 with privacy-protecting contract tracing apps, supplemented with cloth masks for all... and life can get back to a normal-ish!

Sure, your hands may be dry. But you'll get to invite a date out to a comics bookstore! You'll get to go out with friends to watch the latest Hollywood cash-grab. You'll get to people-watch at a library, taking joy in people going about the simple business of *being alive.*

Even under the worst-case scenario... life perseveres.

So now, let's plan for some *even worse* worst-case scenarios.

Water landing, get your life jacket, and please follow the lights to the emergency exits:

---

# The Next Few Years

You get COVID-19, and recover. Or you get the COVID-19 vaccine. Either way, you're now immune...

...*for how long?*

The news reports folks who test positive again after testing negative, but those were most likely false positives/negatives. Still, the possibility of **waning immunity** is very real.

"Coronavirus" is a category of viruses.[^nitpick_1] The coronavirus responsible for COVID-19 is most closely related to the coronavirus responsible for SARS. SARS probably gave its survivors around 2 years of immunity.[^SARS immunity] The coronaviruses that cause "the"[^nitpick_2] common cold give you 1 year of immunity[^cold immunity]. So here's the scary question:

[^nitpick_1]: sas

[^nitpick_2]: adsa

[^SARS immunity]: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2851497/

[^cold immunity]: https://pubmed.ncbi.nlm.nih.gov/2170159/

What if COVID-19 immunity doesn't last?

Here's a simulation starting with 100% (i), exponentially decaying into (r)s after 12 days... but then back to susceptible, no-immunity (s)s after 1 year:

// sim

Now let's simulate a COVID-19 outbreak, over 10 years, with no interventions... *if immunity only lasts a year:*

// sim

This is the **SEIRS Model**. The final "S" stands for (s) Susceptible, again.

Previously, we only had *one* hospital-breaking spike. Now, we have several, *and* (i) cases come to a rest *permanently above* hospital capacity.

R = 1, it's **endemic.**

Thankfully, because summer reduces R, it'll make the situation better:

// sim

Counterintuitively, summer makes spikes *worse*, and repeated!

Summer reduces new (i)s, but that in turn reduces new (r)s. Which means immunity plummets in the summer, *creating* large spikes in the winter. And the spikes overwhelm ICUs over and over, *even if we double hospital capacity*.

Thankfully, the solution to this is pretty straightforward – just vaccinate people every fall/winter, like we do with flu shots:

// sim

But here's the scarier question:

What if there's just *never* a vaccine?

**To be clear: this is unlikely.** Sure, there's never been a vaccine for any of the other coronaviruses before, but that's because SARS was eradicated quickly, and "the" common cold wasn't worth the investment. Coronaviruses aren't any more complex than the viruses we already have vaccines for, so most public health scientists expect a vaccine *eventually*, even if years from now.

Still, there are valid worries: when we find a COVID-19 vaccine, what if we can't make enough? What if it's not *safe* enough?[^nature]

[^nature]: link

Even in this nightmare scenario, we still have 3 ways out. From most to least terrible:

1) Do the R < 1 interventions, but *looser*, so that we can get a steady supply of (i) to reach "natural herd immunity".

(Warning: this will result in many deaths & damaged lungs. *And* it won't work if immunity doesn't last.)

// sim

2) Do the R < 1 interventions forever. Contact tracing & wearing masks just becomes a new norm in the post-COVID-19 world, like how STI tests & wearing condoms became a new norm in the post-HIV world. (Nobody suggested "herd immunity" for HIV...)

3) Do the R < 1 interventions until we develop treatments that make COVID-19 way, way less likely to need hospitalization. (Which we should be doing *anyway!*) This is effectively the same as increasing our hospital capacity:

// sim

Even under the *worst* worst-case scenario... life perseveres.

But, you may have more questions, more intervention plans & scenarios you'd like to try. Great! **Here's a Simulation Sandbox Mode, with *every* option available! Simulate & play around to your heart's content:**

// sim

Even just Epidemiology 101 + a basic "epidemic flight simulator" can teach us so much. It's let us answer questions about the past few months, next few months, and next few years.

So now, let's return to...

---

# The Now

We've scrambled into the life rafts. It's time to find dry land.

Here's the growing consensus COVID-19 plan, with some less-consensus backup plans:

// pic

So what does this mean for YOU, right now?

**For everyone:** Respect the lockdown so we can get out of Phase I asap. Keep washing those hands. Make your own masks. Download a *privacy-protecting* contact tracing app when those are available next month. Stay healthy, physically & mentally! And write your local policymaker to get off their butt and...

**For policymakers:** Create policies that support folks who have to self-isolate/quarantine. Maybe make mask laws, if enough evidence accrues. Direct more funds into the stuff we should be building, like...

**For builders:** Build tests. Build ventilators. Build personal protective equipment for hospitals. Build masks. Build apps. Build antivirals, prophylactics, and other treatments that aren't vaccines. Build vaccines. Build better COVID-19 monitoring, so we can plan better. Build science. Build morale. Build hope. 

Will we *need* all that? "Probably" not, the same way you "probably" won't need parachutes, life jackets, or inflatable rafts on an airplane. It's like a cost/benefit analysis of Russian Roulette: the chance of disaster may be small, but the *cost* of disaster is far, far worse.

So, don't deny or downplay fear to try to build hope. Our fear should *team up* with our hope, like the inventors of airplanes & parachutes. Preparing for horrible futures is how we *create* hopeful futures.

The only thing to fear is people who think the only thing to fear is fear itself.

// summary slides

// footnotes