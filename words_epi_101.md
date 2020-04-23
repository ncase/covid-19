# The Last Few Months

...has been a real lesson in Epidemiology 101.

Pilots use flight simulators to learn how not to crash planes. **Epidemiologists use disease simulators to learn how not to crash humanity.**

So, let's set up an disease "flight simulator"! First, we need some simulation rules.

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