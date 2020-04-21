# What Happens Next?

## COVID-19 Possibilities, Explained With Playable Simulations

"The only thing to fear is fear itself" is stupid.

Sure, don't hoard toilet paper. But if someone's too scared to think about scary things, and they deny or downplay danger *when it's already here*, then they've got more problems than toilet paper.

The problem's not fear, but how we *use* our fear. Taiwan and South Korea *bravely used their fear* (from SARS) to invest in "pandemic insurance", and it paid off in controlling COVID-19! Fear gives you energy to deal with present dangers & plan for future dangers – *if* you know how to channel your fear.

So, we (Marcel & Nicky) have channeled our COVID-19 fears into making these playable simulations – so that *you* can channel *your* fear into gaining a deep, intuitive understanding of:

* The Last Few Months (epidemiology 101, SIR model, R0 & Rt)
* The Next Few Months (lockdowns, contact tracing, masks)
* The Next Few Years (vaccines, summers, loss of immunity)

Note: We're publishing this on April 30th, 2020. Still the early days. As humanity learns more about COVID-19, our plans will and *should* change – but we hope this post will address 99% of all future possibilities!

Honestly, some of the possibilities are scary. And some are hopeful! But preparing for the scary possibilites is what *creates* the hopeful possibilites. You don't get to save the prince/ss without facing the dragon.

Let's bravely use our fear, and face this dragon.

---

# The Last Few Months

...has been a real worldwide cram-school in Epidemiology 101.

Pilots use flight simulators to learn how not to crash planes. **Epidemiologists use epidemic simulators to learn how not to crash humanity.**

So, let's set up an epidemic simulator! First, we need some simulation rules.

Let's say you have some Infected (i) people and not-yet-infected Susceptible (s) people. One (i) infects a (s), those 2 (i) infect another 2 (s), those 4 (i) infect another 4 (s), and so on:

// pic

*On average*, COVID-19 jumps from an (i) to a (s) every 4 days.[1](source) The average # of days it takes for an (i) to infect an (s) is called the **"generation time"**[2-note](serial interval). (Click the gray circles for sources, and the blue squares for side-notes!)

*Rule #1: The more (i)s there are, the faster (s)s become (i)s.*

// pic - rule

If we simulate *just this rule and nothing else*, here's what it looks like over 3 months, starting with 99.9% (s) and just 0.1% (i):

**Click "Start" play the simulation! You can then change the "generation time", and see how that changes the simulation:**

// sim

Starts small ("it's just a flu"), then explodes ("oh right, flus don't break hospitals in rich countries"). This is the "J-shaped" **exponential growth curve**.

But this simulation is wrong. There are things that prevent an (i) from infecting someone else – like if that other person is *already* an (i):

// pic - 100% spread, 50% spread, 0% spread

*Rule #2: The fewer (s)s there are, the slower (s)s become (i)s.*

// pic - rule

Now, what happens if we simulate *both* these rules?

**Again, click Start to play the simulation!**

// sim

Starts small, explodes, then slows down again. This is the "S-shaped" **logistic growth curve.**

Still, this simulation predicts 100% of people will get the virus, and even the most pessimistic COVID-19 simulations don't predict *that*. 

What we're missing: You stop being infectious for COVID-19 when you recover... or die.

For the sake not making these simulations too depressing, let's only simulate Infected (i) becoming (r) Recovered. (The math works out the same.) And let's assume *(for now!!!)* that (r)s can't get infected again. So, new rule:

*Rule #3: (i)s eventually become (r)s.* 

// pic - rule

Let's have (i)s become (r)s after 14 days, *on average*.[3-note](technical notes) This means some (i)s will recover *before* 14 days, and some recover *after*! This is closer to real life.

To show *only* Rule #3, here's a simulation starting with 100% (i):

// sim

This is the "flipped-J-shaped" **exponential decay curve.**

Now, what happens if you simulate all 3 rules at once? What happens when you combine an S-shaped logistic curve with a flipped-J exponential decay curve?

// pic

Let's find out:

// sim

And *that's* where that famous curve comes from! It's not a bell curve, it's not even a "log-normal" curve. It has no name. But you've seen it a zillion times, and beseeched to flatten.

// pic: 3 rules

This is the **SIR Model**, the *second*-most important idea in epidemiology.

**NOTE:** The simulations you've been hearing in the news are *far* more complex than the ones you're seeing here! But the sims you'll play with here reach the same general conclusions, even if missing the nuances.

One nuance you could add is the **SIRS Model**, where the final "S" also stands for (s) Susceptible – this is when people recover, are immune for a bit, *then lose that immunity and can be infected again.* (We'll consider this in the Next Few Years section)

Another nuanced version is the **SEIR Model**, where the "E" stands for (e) Exposed, a brief period of time *after* you've been infected, but *before* you can infect others. This is called the **"latent period"**, and for COVID-19 it's around 3 days.[4]()

Here's what happens if you simulate that:

// sim

Doesn't change much, so let's stick to the vanilla SIR model. We brought (e)s up because the exact timing of contagiousness is important in "contact tracing", which we'll explain in the Next Few Months section.

Oh! But almost forgot, the *first*-most important idea in epidemiology:

**"R"**

Which is short for "Reproduction Number". It's the *average* number of people an (i) will infect *before* they recover:

// pic - R>1 R=1 R<1

**R0** (pronounced R-nought) is the Reproduction Number for a virus *at the very beginning of an outbreak, before we have immunity or interventions*. (Also called "Basic Reproduction Number")

**Rt** (the 't' stands for time) is the Reproduction Number *right now*, after we have some immunity or interventions. (Also called "Re", e standing for "Effective Reproduction Number". Also called just "R", to... confuse people)

// pic of R0 and Rt over time for the Famous Curve – with peak for inflection!

(A lot of news outlets confuse these two Rs! They're different!)

The R0 for the flu[6](more) is around 1.3. The R0 for COVID-19 is somewhere between 2 and 5.[7](source)  The huge uncertainty is because R0 depends on exactly how quickly new people are infected ("generation time") vs how quickly people recover[8](technical note):

// sim

Rt for COVID-19 depends on the interventions we do (or don't) have, as well as how many people *aren't* (s) Susceptible. (because they're (r) Recovered, currently (i) Infected, or... dead.)

// sim

Note that when (s)% is low enough, you can get Rt<1 – *containing the virus!* This is called **the "herd immunity" threshold**. "Herd immunity" is a terrible *policy* (TODO: explain why), but it's important for understanding epidemiology.

Now, let's run the same SIR model simulation again, but this time showing 1) Rt changing over time, and 2) the herd immunity threshold:

// sim

Note how total cases ((i)+(r)) *overshoots* the herd immunity threshold! And the *exact* moment it does this is when infections peak *and* when Rt drops below 1!

If there's only one lesson you take away today, here it is, in big shiny letters:

# Rt>1 = bad
# Rt<1 = good

**NOTE: We do not need to catch all transmissions, or even nearly all transmissions, to stop COVID-19.**

It's a paradox – COVID-19 is incredibly contagious, yet to contain it, we "only" need to stop 72% of infections. 72%?! That's, like, a C– grade. But if R0 = 3.5, then reducing that by 72% will make Rt < 1 = good.

(And even if worst-case, R0=5, you "only" need to stop 80%. That's a B–.)

*Every* COVID-19 intervention you've heard of – handwashing, social distancing, lockdowns, self-isolation, contact tracing & quarantining, face masks, even "herd immunity" – they're *all* doing the same thing:

Reducing Rt.

Let's see how we can get Rt<1 – in a way that protects not just our physical health, but also our mental health, social health, *and* financial health!

---

# The Next Few Months

...could have been worse.

###Scenario 0: Do Absolutely Nothing

For COVID-19, 1 in 20 (i)s need to be hospitalized. In rich countries like the US and UK, there's 1 hospital bed for every 1000 people. Therefore: a rich country can handle a maximum of 20 (i)s per 1000 people – or, a maximum of 2% of the population being simultaneously sick.

Here's the same simulation from before, but with the "2%" threshold drawn:

// sim

It's not good.

That's the same thing the March 16th Imperial College report found: if we do nothing, hospitals break. Almost everyone gets infected. Even with a low 0.5% infection fatality ratio, 80% of people infected in a large country like the US still means over a million dead... *IF* we did nothing.

(A lot of news & social media chose to report the scary bit, *without* "IF WE DO NOTHING". Fear was channeled into clicks, not understanding. *Sigh.*)

###Scenario 1: Flatten The Curve

Handwashing was discovered in ____ by the doctor _______, when he realized that by getting his staff to wash their hands, child deaths in his hospital were cut by *90%!*

Doctors around the world immediately hailed his life-saving discovery, and ha ha just kidding they committed him to an asylum where he was beat to death by guards.

In any case, frequent handwashing reduces your chances of catching influenza by 50%![9]() And if we combine this with other hygiene tips – cough into your elbow, don't touch your face – let's guess-timate that 100% compliance (which we will *NOT* get) will result in a 60% reduction in new infections, in Rt:

// controls

It can't get Rt<1, but it *does* reduce it! How does that affect the epidemic?

// sim

That's a... *better* catastrophe.

Contrary to many news & social media posts, "flattening the curve" *does also reduce total cases*. But as long as Rt is still above 1, our hospitals will still most likely shatter.

That's what the Imperial College report also found: any attempt at mere **"mitigation"** (Reduce Rt, but still Rt>1 = bad) will fail, and the only way out is **"suppression"**. (Reduce Rt, so that Rt<1 = good!)

*Crush* the curve, not just flatten it. For example, by doing a...

###Scenario 2: Months-Long Lockdown (we are here)

There's different degrees of "physical distancing". (previously called "social distancing") At the mildest, avoiding crowds. At the strongest, a full city-wide lockdown.

London's full lockdown reduced Rt by 70%.[11]() So, let's guess-timate that as the maximum effect for distancing.

Here's how hygiene & distancing together change Rt:

// calc

That's Rt<1 = good!

Let's see what happens if we *crush* the curve with a lockdown for 3 months, then finally, *finally* return to normal life:

**Remember, you can re-play the simulation, and change the sliders *WHILE* it's running, to simulate your own COVID-19 strategy! You can also pause & slow down the simulation:**

// sim

Oh.

Right, as soon as you remove the lockdown, Rt>1 again, and so you get a spike in cases that's almost as bad as if you'd done *nothing at all.*

**A lockdown isn't a cure, it's just a restart.**

So, what, do we just lockdown again & again?

###Scenario 3: Intermittent Lockdown

// sim

This was one solution suggested by the March 16 Imperial College report, and analyzed again by Marc Lipsitch ______ etc. [https://science.sciencemag.org/content/early/2020/04/14/science.abb5793?]

This *would* keep hospitals below capacity! You just have to... shut everything down for 2 months, every 3 months, until a vaccine is available in 18 months.

Look, it's all well & good to draw a line on a graph saying "healthcare capacity", but there's lots of important things we *can't* simulate here. Like:

Mental Health) Loneliness is one of the biggest risk factors for depression, anxiety, and suicide. And it's as negatively associated with an early death as smoking 15 cigarettes a day.

Financial Health) "What about the economy" sounds like you care more about dollars than lives, but "the economy" isn't just stocks, it's people's ability to provide food & shelter for their loved ones, to invest in their kids' futures, and enjoy arts, foods, videogames – the stuff makes life worth living. And besides, poverty *itself* has horrible impacts on mental and physical health.

Not saying we should rule out intermittent lockdowns! But it's not ideal.

Wait, didn't we say Taiwan & South Korea "bravely used their fear" to control COVID-19? For 4 whole months? How?

###Scenario 4: Test, Trace, Isolate

You may be thinking:

*Sure, we \*could\* have done what Taiwan + South Korea did at the start, but it's too late now. We missed the start.*

But that's exactly it! A lockdown isn't a cure, it's just a restart – **and a fresh start is what we need.** (TODO: Actually, South Korea started late!)

The lockdown will let us reduce (i) cases, and buy time to copy what Taiwan & South Korea are already successfully doing: isolating COVID-19 cases, *and finding out who've they been in extended close contact with* (**"contact tracing"**) *and quarantining them too*.

(Pedantic note: **"isolate"** is for infected cases, **"quarantine"** is for contacts)

Why do we need to quarantine the contacts? Because they could have been (e) Exposed & caught the virus, but not know it yet:

// timeline

If you *only* isolate the cases, the virus can still spread:

// timeline

But if you *also* quarantine the contacts, you stop the spread, by staying one step ahead!

// timeline

(TODO: 30 min)

Contact tracing was how they contained Ebola in (where?) Africa! And that was just good ol' fashioned "ask people who they met" contact tracing.

...which, unfortunately, will not work for COVID-19. Interviews are too slow and human memory is too unreliable. [MARCEL'S SOURCE] There's only *3 days* between being exposed to the virus (e) and being able to infect others (i).

So, regrettably, some countries have resorted to privacy-invasive techniques, like grabbing loads of citizens' phone location data. But does protecting human lives mean surrendering to Big Brother?

HECK NO

**Here's a short comic we made, explaining how you can do digital contact tracing in a privacy-protecting way.** And when we say "privacy-protecting", we mean that *even if the central server was hacked and all its data stolen*, the hacker would learn *nothing* about people's identities, locations, or who met who.

(And here's a 3Blue1Brown video adaptation of our comic! Thanks Grant!)

And this isn't just "in theory". Several apps are *already* being developed for this. The European council vote (FILL IN). And Google/Apple's new announcement specifically supports the privacy-protecting protocol as described in our comic above. (Don't trust Google/Apple? Neither do we! The beauty of the protocol is that *it doesn't rely on trust.*)

Okay okay, enough tooting our own horn. How does isolating cases & quarantining contacts reduce Rt?

University of Oxford study estimates that:

* (i) Symptomatic **cases** account for 40% of new infections. So by isolating cases, **you reduce Rt by up to 40%.**
* (e) Pre-symptomatic & A-symptomatic **contacts** account for 50%. So by quarantining contacts, **you can reduce Rt by up to 50%.**
* Stuff like doorknobs accounts for the rest, 10%.

[Loong note about "pre" vs "a" symptomatic & how the media screwed it up AGAIN]()

So, combined, isolating cases & quarantining contacts can get Rt comfortably below 1, *even with NO physical distancing!*

// calc

Remember: **we do not need to catch all transmissions, or even nearly all transmissions, to stop COVID-19.** So the fact that not everybody is able (or willing) to download a privacy-protecting contact tracing app isn't a dealbreaker.

We don't need to catch *all* contacts, isolate *all* cases, or even wash *all* the hands. Just enough to get that C– grade of 72%, to get Rt<1 = good.

(do wash your hands, though)

Alright, enough chat. Here's a simulation of using a lockdown as reset, then switching to "Test, Trace, Isolate":

// sim

And here it is again, with a vaccine at 18 months, which converts (s) into an immune (r), without having to become a (i). This gives us "herd immunity" the *right* way, and we can *finally* stop all other interventions.

(actually, keep washing your hands. come on, a doctor was beaten to death in an asylum.)

// sim 

So that's it!

That's currently the best working plan, recommended by several independent teams of epidemiologists & policymakers from across the political spectrum. (LINKS) Lockdown to get a fresh start, switch to Taiwan & South Korea's strategy later.

But...

...you may be feeling a knot in your stomach. Things have *already* gone horribly wrong, more stuff could *still* go horribly wrong with this plan, right?

You're dang right it could. Let's channel that fear... into making some *backup plans:*

###Scenario X: Other Interventions & Backup Plans

If handwashing + case isolation + contact quarantining *still* isn't enough to get Rt<1... we can supplement it with three things:

**Deep Cleaning:**

Remember we said "stuff like doorknobs" accounts for 10% of new infections? The technical jargon for things that can pass a virus from one human to another is a **"fomite".**

10% means frequent deep cleanings of public spaces – subways, libraries, and malls – can reduce Rt by up to 10%. Which sounds useless, but if it reduces Rt from 1.05 to 0.95... that's Rt<1 = tens of thousands of lives saved.

// calc?

**Masks For All:**

[small brain] Correlation implies causation!

[normal brain] Correlation doesn't imply causation, you need Randomized Controlled Trials (RCTs) to prove things.

[large brain] Actually, under Bayes' Theorem, *all* correlations are evidence for causation, because the likelihood of {seeing a correlation, given causation} is greater than the likelihood of {seeing a correlation, given *no* causation}. It's just not 100% proof, because *nothing* in science is 100% proof, not even RCTs (hence the replication crisis). **Evidence isn't 0% or 100%, they have a full range of "weights".** And though correlational evidence has a lower "weight" than an RCT, it *is still evidence.* (See this 3Blue1Brown video for a visual explanation of Bayes' Theorem)

What we're trying to say is:

There aren't any RCTs (yet) testing "Cloth masks prevent COVID-19 spread" *specifically*. But there's lots of other evidence, if of lower "weight":

* Staff in hospitals without masks are more likely to die of COVID-19
* Taiwan & South Korea have widespread public wearing of masks
* For colds & flus, masks reduce droplets/aerosols from the *wearer*.

Pandemics are like poker. Act when you "have enough info", and you'll lose everything at stake. You'll never have enough info, just cost/benefit analyses under uncertainty. Like so:

Cost of cloth masks (certain): Small. Same as handwashing.

Benefit of cloth masks (uncertain): They probably don't stop *the wearer* from getting COVID-19, but they probably stop a pre-symptomatic wearer from *spreading* COVID-19. Let's guess masks reduce Rt by 0% to 20%. *Even though "0%" is still likely*, the average "expected value" is *halfway* between 0% and 20% – that is, 10%, same as deep cleaning, but at minuscule cost.

Analysis: If someone offered you a coin flip, where tails = nothing happens, and heads = 1000s of lives saved... and the price for playing this game is a rag and two rubber bands... even though "nothing" is as likely as "lives saved", you should do it. 

Cloth masks for all: do it!

// calc?

**Summer:**

Okay, this is not an "intervention" we have control of, but it *does* help reduce Rt!

For every extra 1° Celsius (2.2° Fahrenheit), Rt drops by ___%. The average difference between winter & summer in New York is 15°C (60°F), so summer will make Rt drop by _%.

Many news sites (wrongly) report summer won't slow COVID-19. They're probably trying not to get your hopes up: with R0=3.5, a _% reduction is Rt=\_, still above 1.

But still, it's *something*. If we have limited resources, we can scale back some interventions in the summer – so we can scale them higher in the winter.

// calc? over time

**A "Circuit Breaker" Lockdown:**

And if all that *still* isn't enough to get Rt<1... we can do another lockdown.

But because Rt was reduced dramatically, we wouldn't have to do a 2-month-lockdown-every-3-months! Probably just *one* more 1-month lockdown, between now and when we have a vaccine.

Here's a simulation of that (with sliders for *ALL* the interventions):

// sim

. . .

We hope these plans give you hope. 

It *is* possible to keep Rt<1, *without* locking down for most of 18 months. With plans like "Test, Trace, Isolate", supplemented with backup plans like "Masks For All", we can get back to a normal-ish life!

Sure, your hands may be dry. But you'll get to invite a date out to a comics bookstore! You'll get to watch the latest cash-grab Hollywood sequel with friends. You'll get to people-watch at a library, taking joy in people going about the simple business of *being alive.*

Life will go on, even under the worst-case scenario.

So now, let's use our fear's energy, and plan for some *even worse* worst-case scenarios:

---

# The Next Few Years

You get COVID-19, and recover. Or you get the COVID-19 vaccine! Either way, you're now immune...

...*for how long?*

SARS, which was closely related (TODO: is it?) to this new coronavirus, gave its survivors around 2 years of immunity.[12](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2851497/). Some coronaviruses, like the ones that cause "the" common cold[13], give you just [1 year of immunity](https://pubmed.ncbi.nlm.nih.gov/2170159/). (TODO: MERS' immunity)

Let's think about the scariest scenario: immunity doesn't last.

*Rule #4: (r)s eventually become (s)s*

// pic

The SIRS model: the (r) Recovered become (s) Susceptible again.

Let's simulate what that'll look like, with *no* interventions:

// sim

Previously, we only had *one* hospital-breaking spike with no interventions. Now, we have several, *and* the simulation comes to a rest with % of (i) infected *permanently above* hospital capacity. 

(If you replay the simulation above with immunity lasting 3 years, that wouldn't be so bad! The % of (i) would rest comfortably *below* capacity. There'd still be spikes, but you can deal with them using the same interventions listed in last section)

It's like a pendulum: total (i)+(r) cases swings around the "herd immunity" threshold, before settling exactly at "herd immunity", where Rt=1. The virus no longer grows or shrinks. It's just with us forever: it's **endemic.**

// pic?

Thankfully, summer will make it better by reducing Rt:

// sim

Oh wait no it doesn't. Summer *does* reduce new people becoming (i) infected, but that also reduces new people becoming (r) immune. Which means immunity in the population will drop *even further* with summer, allowing for *big regular spikes* in the winter.

It's like a pendulum where you're moving the top back and forth: that just makes the cycles *worse*.

// pic?

Finally, the *worst* worst-case:

What if, like HIV, there's just *never* a vaccine?

Our only option now is to increase our capacity for COVID-19 cases. You could do this directly, by creating more hospital beds and ventilators. Or you could do this indirectly, by creating treatments for COVID-19, so that if you *do* get it, you're less likely to need a hospital bed or ventilator.

Here's the same simulation, but 1) starting with herd immunity (which wanes quickly), and 2) with adjustable hospital capacity:

// sim

HIV/AIDS killed millions, mostly in marginalized communities. And yet, despite it being the worst-case pandemic scenario, and despite all the stigma against people who have it... HIV isn't a death sentence anymore.

HIV has no vaccine. There's *definitely* no herd immunity. And yet, with treatments like antiretroviral therapy, people can and *are* living full lives with the virus. COVID-19 is devastating, but nowhere as much as HIV.

Life will go on, even under the *worst* worst-case scenario.

...

That said, the virus behind COVID-19 is way simpler than HIV, so there'll almost definitely be a vaccine. Even if it only grants immunity for a year. If so, we'll just have to do a vaccination campaign each autumn – and we can just do this alongside our regular flu shots:

// sim

**Finally, here's a Simulation Sandbox, with *every* option available. You can now also share your *own* simulations!**

// sim

Play around to intuitively understand the core rules of epidemiology. 

Try simulating different COVID-19 scenarios, plans, and backup plans. 

Ask questions, try to find an answer with the sim, and share your sim with others.

This (again, very *VERY* basic!) simulation has let us answer so many questions about the past few months, next few months, and next few years.

So now, let's return to...

---

# The Now

In summary, here's how we bravely use our fear, slay the dragon, and save the lives of millions of princes(ses):

**PHASE 1) Lockdown to get a fresh start.**

Get current (i)s low, while building capability to do...

**PHASE 2) "Test, Trace, Isolate"**

We replace lockdown with other ways to get Rt<1. Life gets back to normal-ish! 🎉

More testing so we can *actually* tell what Rt currently is.

Create policies to get cases to isolate/quarantine. Paid leave & bonus financial incentives if they do, *maybe* fines if they don't. 

Use *privacy-protecting* contact tracing apps to find contacts. Remember, not everybody has to have the app to get Rt<1.

If Rt still not below 1: "Masks For All". Get most people to wear at *least* cloth face masks. Give out free masks if you have to.

If Rt *still* not below 1: Deep clean public spaces often. Mild social distancing. Maybe one or two more "circuit breaker" lockdowns. (but still avoiding "lockdown for most of 18 months"!)

This will buy us time to finally do...

**PHASE 3) Vaccinate!**

If immunity doesn't last long: Vaccination campaign every autumn, like we already do for flu shots. 

If vaccine is *never* available: Raise our capacity for COVID-19 cases by creating more hospital beds & ventilators, and developing antivirals & treatments. (which we should be doing *anyway!*)

**What's this mean for YOU, _right now?_**

**For everyone:** Respect the lockdown so we can get out of Phase I asap. Keep washing those hands! Make your own masks. Download a *privacy-protecting* contact tracing app when those are available next month. Stay healthy, physically & mentally! And write your local policymaker to get off their butt and...

**For policymakers:** Create policies that compensate (or reward!) folks who have to self-isolate/quarantine. Direct funds into all the stuff we should be building, like...

**For builders:** Build tests. Build ventilators. Build masks – cloth, surgical and N95. Build privacy-protecting contact tracing apps. Build antivirals and other treatments. Build vaccines. Build science. 

Will we *need* all that? "Probably" not, the same way you "probably" won't need safety belts, fire insurance, or parachutes on planes. It's like doing a cost/benefit analysis of Russian Roulette: the chance of disaster is small, but the *cost* of disaster is far, far bigger.

In situations like this, it pays to listen honestly to your fears, face them, and prepare for them.

The only thing to fear is people who think the only thing to fear is fear itself.

---

(TODO: US vs Korea/Taiwain resources)