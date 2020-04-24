# What Happens Next?

## COVID-19 Futures, Explained With Playable Simulations

"The only thing to fear is fear itself" was stupid advice.

If people fear fear itself, they'll deny danger because they don't want to create "mass panic". The problem's not fear, but how we *use* our fear. Fear, used well, gives you energy to deal with current dangers, and prepare for future dangers.

Honestly, the two of us (Marcel, epidemiologist + Nicky, artist/coder) are worried about the future. We bet you are, too. That's why we want to channel *our* worries into making these **playable simulations**, so that you can channel *your* worries into understanding:

* **The Last Few Months** (epidemiology 101, SEIR model, R & R<sub>0</sub>)
* **The Next Few Months** (lockdowns, contact tracing, masks)
* **The Next Few Years** (vaccines, loss of immunity?)

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

**R<sub>0</sub>** (pronounced R-nought) is what R is *at the start of an outbreak, before immunity or interventions*. R<sub>0</sub> is also called the "basic reproduction number". R<sub>0</sub> more closely reflects the power of the virus itself, but it still changes from place to place. For example, because heat 'kills' coronaviruses, R<sub>0</sub> for COVID-19 is lower in hot places than cold ones. Not low enough to contain it, though.

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

When enough people have natural immunity, R < 1, and the virus is contained! This is called **herd immunity**, and while it's *terrible* policy, (we'll explain why later – it's not for the reason you may think!) it's essential to understanding Epidemiology 101.

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

(And even if, extreme-worst-case, R<sub>0</sub> = *6*, you still "only" need to stop 84% of transmissions. That's a B grade.)

// calculator - custom

*Every* COVID-19 intervention you've heard of – handwashing, social distancing, lockdowns, self-isolation, contact tracing & quarantining, face masks, even "herd immunity" – they're *all* doing the same thing:

Getting R < 1.

So now, let's use our "epidemic flight simulator" to figure out the next few months! How will we get R < 1 in a way that protects not just our physical health, **but also our mental health, social health, *and* financial health?**

Brace yourselves for an emergency landing...