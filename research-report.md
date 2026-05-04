# Jobs-to-be-Done theory: a practitioner's reference

**Jobs-to-be-Done (JTBD) is an innovation framework built on one premise: people don't buy products — they hire them to make progress in their lives.** Rather than asking "who is our customer?" JTBD asks "what job is the customer trying to get done?" This reframing shifts product design away from demographics and feature lists toward the underlying motivations and circumstances that cause someone to seek a solution. The theory has become a foundational tool in modern product strategy, used by teams at Intercom, Bosch, and Southern New Hampshire University to make better design, positioning, and prioritization decisions.

This document covers the theory end-to-end: core concepts, origins, frameworks, research methods, canonical examples, critiques, and a glossary — structured for quick reference during product design work.

---

## 1. What is a "job" and what does it mean to "hire" a product?

A **job-to-be-done** is the progress a person is trying to make in a particular circumstance. It is not the product, not the feature, and not the activity — it is the underlying goal that drives someone to act. Jobs are stable over time even as the products hired to fulfill them change. People have been hiring solutions to "get a message to someone quickly" for centuries; the solutions have evolved from couriers to telegrams to email to Slack.

The **hiring metaphor** is central. When you buy a product, you "hire" it to do a job. When it stops doing that job well — or something better comes along — you "fire" it. This language forces a shift in thinking: the product exists in service of the customer's progress, not the other way around.

**Three key properties of a well-defined job:**

- It is **solution-agnostic** — described without reference to any specific product or technology
- It is **stable over time** — the job persists even as tools and solutions evolve
- It has **functional, emotional, and social dimensions** — the practical task, the feelings involved, and how the person wants to be perceived

Clayton Christensen put it plainly: *"The job, not the customer, is the fundamental unit of analysis."* A 16-year-old and a 60-year-old might hire the same milkshake for the same morning-commute job. A single person might hire that milkshake for a totally different job at 4 PM. Demographics don't explain the purchase. The circumstance and desired progress do.

---

## 2. Origins and key thinkers — three schools, one theory

JTBD has intellectual roots stretching back to Theodore Levitt's famous observation — *"People don't want a quarter-inch drill, they want a quarter-inch hole"* — and Peter Drucker's writing on understanding the customer's purpose. But the formalized theory emerged in the 1990s from three primary thinkers whose approaches have since diverged.

**Tony Ulwick** conceived the core JTBD/ODI concept around 1990 while working as a product manager at IBM, where he witnessed chronically high product failure rates. He founded **Strategyn** in 1991 and developed **Outcome-Driven Innovation (ODI)**, a structured, quantitative methodology. His first major success came at Cordis Corporation, where ODI helped a medical device product jump from **1% to market-leading share** in angioplasty balloons. Ulwick published *What Customers Want* (2005) and *Jobs to Be Done: Theory to Practice* (2016), laying out an 84-step innovation process. Philip Kotler called him *"the Deming of innovation."*

**Bob Moesta**, an engineer by training, formed early JTBD ideas alongside Rick Pedi, Julia Wesson, and others at Harvard Business School in the early 1990s. Pedi is credited by Christensen as having *"coined for us the language Jobs to Be Done."* Moesta conducted the famous milkshake study (~1995–96) and developed the **Four Forces of Progress** framework with Chris Spiek. His approach is qualitative, interview-driven, and focused on understanding the emotional timeline of switching behavior. Key books include *The Jobs-to-be-Done Handbook* (2014), *Demand-Side Sales 101* (2020), and *Learning to Build*. He has helped launch over **3,500 products**.

**Clayton Christensen** (1952–2020), the Harvard Business School professor known for disruptive innovation theory, became JTBD's most prominent popularizer. He was introduced to ODI by Ulwick in 1999, and incorporated JTBD thinking into *The Innovator's Solution* (2003) and the landmark HBR article *"Marketing Malpractice: The Cause and the Cure"* (2005). His definitive statement came in *Competing Against Luck* (2016), in which he credited Moesta and Pedi as originators — notably omitting reference to Ulwick's ODI, a decision that created lasting tension.

**Alan Klement** contributed the **Job Story** format and published *When Coffee and Kale Compete* (2016). He drew a sharp distinction between **"Jobs-as-Activities"** (Ulwick) and **"Jobs-as-Progress"** (Christensen/Moesta), championing the latter. Ulwick publicly criticized Klement's framing.

**Des Traynor and Intercom** became the theory's most visible evangelists in the tech world. Traynor hired Moesta's Re-Wired Group to conduct JTBD research on Intercom's customer base and published *Intercom on Jobs-to-be-Done* (~2016). The company abandoned personas entirely in favor of job-based segmentation.

### The two major schools today

| Dimension | Ulwick's ODI (Jobs-as-Activities) | Moesta's demand-side (Jobs-as-Progress) |
|---|---|---|
| **Philosophy** | Innovation is a science; jobs are functional processes | Innovation is empathy; jobs are about emotional progress |
| **Method** | Quantitative surveys of 180–3,000 customers | Qualitative switch interviews with 10–20 customers |
| **Unit of analysis** | The job as an 8-step process map | The switching moment and its forces |
| **Key output** | Opportunity scores, prioritized outcome lists | Force diagrams, buyer timelines, job stories |
| **Best suited for** | Large companies, product innovation, feature prioritization | Startups, marketing, sales, understanding why people buy |
| **Definition of "job"** | A task or objective the customer is trying to accomplish | The progress a person seeks in a struggling moment |

These are not mutually exclusive. Many practitioners use both — ODI for quantitative prioritization, switch interviews for qualitative depth.

---

## 3. Key frameworks and tools

### The Job Map

Developed by Ulwick and Lance Bettencourt (published in HBR's *"The Customer-Centered Innovation Map"*), the Job Map breaks a core functional job into **eight universal process steps**: **define → locate → prepare → confirm → execute → monitor → modify → conclude**. It describes what the customer is trying to accomplish at each stage, not what they currently do. It is solution-agnostic and stable over time.

A job map for "prepare a healthy dinner on a weeknight" would include steps like: define dietary requirements and constraints, locate recipes and ingredients, prepare the workspace and ingredients, confirm everything is ready, execute the cooking, monitor progress, modify seasoning or timing, and conclude by plating and cleaning up.

**Used for:** Identifying the full scope of a job, revealing gaps in existing solutions, and structuring desired-outcome research.

### Outcome-Driven Innovation (ODI)

Ulwick's end-to-end methodology. The core loop: map the job → capture **desired outcome statements** → survey customers on importance and satisfaction → calculate **opportunity scores** → identify underserved and overserved segments → design solutions targeting the gaps.

**Desired outcome statements** follow a precise format: *[direction of improvement] + [performance metric] + [object of control] + [contextual clarifier]*. Example: *"Minimize the time it takes to verify that all ingredients are available before cooking."* A single job typically yields **50–150** outcomes.

**The opportunity algorithm:** Opportunity = Importance + max(Importance − Satisfaction, 0). Scores above **10** indicate underserved needs worth pursuing; above **15** signals extreme opportunity. Outcomes with low importance but high satisfaction indicate overserved areas ripe for low-cost disruption.

**Used for:** Quantitative feature prioritization, competitive analysis, market segmentation by unmet need, and predicting product-market fit before building.

### The Four Forces of Progress

Developed by Moesta and Spiek, this framework maps the four psychological forces acting on any switching decision:

Two forces **promote** switching: the **push** of the current situation (frustration, pain, limitations) and the **pull** of the new solution (attraction, promise, perceived benefits). Two forces **resist** switching: **anxiety** about the new solution (fear, uncertainty, perceived risk) and **habit** of the current situation (comfort, inertia, switching costs).

**A switch happens when push + pull > anxiety + habit.** The critical insight for product teams: you can directly influence pull (make your product attractive) and reduce anxiety (free trials, guarantees, migration tools), but you can't control push or habit on the old solution. For retention, you reduce push (fix pain points) and increase habit (deepen engagement).

**Used for:** Diagnosing why customers switch or don't switch, designing onboarding that addresses anxieties, and crafting marketing that speaks to push and pull forces.

### The Job Story format

Created by Alan Klement and popularized at Intercom: **"When [situation], I want to [motivation], so I can [expected outcome]."** Unlike user stories ("As a [persona], I want [action], so that [benefit]"), job stories anchor in context rather than identity. Example: *"When I have 2 minutes between meetings and haven't eaten, I want to grab something filling and portable so I can stay focused through the afternoon."*

**Used for:** Framing product requirements around customer context and motivation rather than assumed personas, especially during early discovery.

### The buyer's timeline

Moesta's six-stage model of how people move from struggle to switch: **first thought → passive looking → active looking → deciding → onboarding → ongoing use**. Two key trigger events punctuate this timeline: **Event One** transitions passive to active looking; **Event Two** transitions active looking to deciding. The timeline is non-linear — customers can regress to earlier stages.

**Used for:** Mapping the customer's decision journey, identifying where marketing and product touchpoints should exist, and understanding how long the buying cycle truly takes.

---

## 4. The "struggling moment" and how demand gets created

Bob Moesta defines the struggling moment as **the seed of all innovation** — the specific point when a person becomes acutely aware that their current situation is not working. *"Products don't create anything. Struggling moments — they fill the hole."*

The trigger can be sudden (a kitchen ceiling collapses from a leak) or gradual (choosing the recliner every night because the mattress is unbearable). It can come from an external prompt (a friend raves about a new tool) or an internal realization (recognizing you've spent two hours on meal prep and missed time with your kids). What matters is that the struggle **creates space in the brain** — a question forms, and only then can the person see solutions that were previously invisible.

This is the demand-side worldview: **demand is created by the customer's struggle, not by the product.** You cannot fabricate demand where no struggle exists. You can make people aware of a struggle they haven't articulated, but you cannot manufacture the underlying frustration. As Moesta puts it: *"If the struggling moment doesn't exist, it's very hard to create it."*

The emotional and social dimensions of the struggling moment are often more powerful than the functional ones. A project management tool's core job might not be "manage projects efficiently" but rather **"look organized and in control when my manager asks for a status update"** — the social anxiety of appearing incompetent was the real push. Understanding these emotional layers is what distinguishes JTBD research from feature-request collection.

Once the struggling moment occurs, the customer enters the buying timeline. **Passive looking** is casual and unfocused — noticing things tangentially, asking friends offhand questions. **Active looking** begins after Event One, a significant catalyst that makes the search intentional. **Deciding** begins after Event Two, when the field narrows and trade-offs become concrete. Throughout this journey, the four forces are constantly in tension. If anxiety about the new solution or habit with the old one remains too strong, the customer stalls or regresses — even when the functional case for switching is clear.

---

## 5. Functional, emotional, and social jobs

Every job-to-be-done has three dimensions. Understanding all three is critical for product design — functional superiority alone rarely wins.

**Functional jobs** are the practical, task-oriented core: what the customer is concretely trying to accomplish. These are measurable, observable, and solution-agnostic. Examples: *"Get from point A to point B on time," "Keep perishable food cold for a week," "Cut a piece of wood in a straight line."* Functional jobs are the primary anchor of Ulwick's ODI analysis and tend to be the most stable over time.

**Emotional jobs** concern how the customer wants to feel — or avoid feeling — while getting the functional job done. These split into **personal** and **social** dimensions:

**Personal emotional jobs** are internal: *"Feel confident that I'm feeding my family well," "Avoid the anxiety of running out of battery mid-trip," "Feel like a competent parent."* These are about the customer's relationship with themselves.

**Social emotional jobs** are about perception: *"Be seen as innovative by my team," "Avoid looking cheap in front of colleagues," "Be perceived as a responsible provider."* These are about the customer's relationship with others.

A concrete example: someone hiring a meal-kit delivery service. The functional job is *"get a healthy dinner on the table in under 30 minutes."* The personal emotional job is *"feel like I'm making an effort for my family, not just ordering takeout."* The social emotional job is *"be seen by my partner as someone who contributes to family meals."* A product that nails the functional job but ignores the emotional ones — say, by delivering ingredients in ugly, industrial packaging — may lose to a competitor that makes the customer feel good about the experience.

Christensen emphasized that emotional and social jobs often explain **why customers choose one solution over another when functional performance is roughly equal.** The Snickers bar and the Milky Way bar are both candy — but Snickers competes with coffee and energy drinks for the "curb hunger and restore energy" job, while Milky Way competes with wine and ice cream for a lighter indulgence job. Same product category, completely different jobs across all three dimensions.

---

## 6. How JTBD differs from personas and user stories

Traditional personas segment users by **who they are** — age, role, habits, psychographic profile. JTBD segments by **what they're trying to accomplish** in a given circumstance. This is more than a semantic difference; it changes what product teams optimize for.

Christensen's milkshake study illustrates the failure mode clearly. Demographic profiling of milkshake buyers produced a statistical composite — an "average" customer — but improving the product for that composite changed nothing. **The same milkshake was being hired for two completely different jobs by overlapping demographics**: morning commuters wanted something thick, slow, and filling for a boring drive; afternoon parents wanted something thin and quick so their kid could finish it without fuss. Averaging across both jobs produced a one-size-fits-none product.

**Personas can mislead in two directions.** Different demographics may share the same job (a 22-year-old freelancer and a 55-year-old executive both hire noise-canceling headphones to "create a focused work environment in a distracting space"). And the same demographic may have completely different jobs (the same person hires headphones at 9 AM for focus and at 7 PM for "decompress and escape into music"). Persona-based thinking struggles with both cases; JTBD handles them naturally.

The **Job Story** format replaces the persona with context. A user story reads: *"As a returning customer, I want to see my order history so I can reorder easily."* A job story reads: *"When I'm reordering something I buy regularly and I'm in a hurry, I want to find and repeat my last order so I can get it done in under a minute."* The job story is richer in situational detail and more solution-agnostic — it doesn't assume "order history" is the right feature.

That said, **most practitioners recommend integration, not replacement.** The Nielsen Norman Group notes that well-crafted personas already include goal information similar to JTBD, enriched with contextual and behavioral detail. Jeff Gothelf (Lean UX) argues that understanding both *why people buy* (JTBD) and *who is buying* (personas) produces the best results. A pragmatic workflow: use JTBD first to define the job and desired outcomes, then use personas to express how different user groups experience that job — their varying contexts, abilities, and constraints.

---

## 7. Applying JTBD in product design practice

### Switch interviews: the core research method

The primary qualitative technique is the **switch interview** (also called a timeline interview), developed by Moesta and Spiek. You interview **8–12 people** who recently made a switching decision — either hired your product or fired it — ideally within the last **30–90 days**, while memory is fresh.

The interview reconstructs the full decision timeline. Start with the purchase moment ("When did you buy it? Walk me through that day") to anchor memory, then jump back to the first thought ("When did you first start thinking about this? What was going on in your life?"), and fill in the middle. Throughout, you map the four forces — what pushed them away from the old solution, what pulled them toward the new one, what anxieties almost stopped them, and what habits made leaving hard.

**Key techniques:** Ask for concrete, sensory details ("What was the weather like? Was it morning or night?") to trigger associative memory. Never ask "why" — it produces rationalization. Ask "how" and "what" instead. Unpack every vague word: when someone says "faster," ask "faster than what?" Conduct interviews in pairs — one leads, one takes notes. It is cognitively demanding work.

### From research to design decisions

After 3+ interviews, patterns emerge. For each cluster of similar stories, the team draws a **force diagram**, writes a **job story**, maps the **competitive set** (which is often surprising — PM tools compete with spreadsheets, not other PM tools), and ranks **hiring criteria**.

The most actionable clusters have **strong push and pull but high anxiety** — real demand behind a solvable barrier. These directly translate into product and design work:

- **Trigger events** inform marketing targeting — show up where and when the trigger occurs
- **The anxiety inventory** becomes the onboarding design checklist — address each fear explicitly (free trial, data import, team adoption guarantee)
- **Job stories** become positioning language and homepage copy
- **The competitive set** reshapes sales messaging and battle cards
- **Force diagrams** guide content strategy: top-of-funnel content addresses push and pull; mid-funnel reduces anxiety; bottom-funnel overcomes habit

### ODI-based prioritization

For quantitative rigor, teams use Ulwick's opportunity scoring. After capturing 50–150 desired outcome statements from qualitative interviews, a survey of **180–3,000 customers** rates each outcome on importance and satisfaction. The opportunity algorithm identifies which outcomes are most underserved. Features that address high-scoring outcomes get prioritized; features addressing overserved outcomes get cut or simplified.

### Integration with other methodologies

JTBD slots into existing workflows: it defines the problem space (complementing Design Thinking's prototyping and testing), identifies opportunities (feeding Lean Startup's MVP experiments), and generates outcome-based OKRs (structuring Agile backlogs). Job stories drive roadmap-level prioritization; user stories handle sprint-level implementation.

---

## 8. Three canonical examples of JTBD in action

### The milkshake study (~1995–96)

A fast-food chain (widely understood to be McDonald's) wanted to increase milkshake sales. Traditional market research — surveying buyers on flavor preferences, adjusting thickness and sweetness — changed nothing. Moesta's team spent **18 hours** observing a restaurant and discovered that **roughly half of all milkshakes sold before 8:30 AM** to lone commuters who bought nothing else and drove away.

The morning job: make a long, boring commute less tedious while staving off the 10 AM hunger crash. The milkshake was thick enough to last 20 minutes through a thin straw, easy to hold in one hand while driving, and filling enough to last until lunch. **The competition was not other milkshakes** — it was bananas (gone in 3 minutes), bagels (dry, required two hands), donuts (crumbs everywhere), and Snickers bars (too guilt-inducing to repeat).

A second, smaller group of afternoon buyers were parents saying "yes" to their kids after a day of saying "no." But they got frustrated waiting for children to finish thick shakes. **Same product, completely different job, conflicting requirements.** The solution: thicker morning shakes with fruit chunks, moved to self-serve dispensers to skip the line; thinner, faster afternoon shakes for kids. Sales rose significantly.

### Intercom's product and marketing decisions

Intercom adopted JTBD as its core strategic framework after co-founder Des Traynor encountered Christensen's milkshake video. They hired Moesta's Re-Wired Group to conduct switch interviews with existing customers and set up a "war room" with canvas boards displaying identified jobs.

The results drove sweeping decisions. Intercom **eliminated personas entirely**: *"We never use personas. They artificially segment audiences and focus on attributes rather than motivations."* They restructured their homepage around jobs, not features. They aligned content strategy to specific jobs — publishing *Intercom on Product Management* to reach people hiring for a "learn about customers" job. They chose which conferences to sponsor based on where specific job-holders would be. And they applied strict rules for product scope: stop building when the next step overlaps with well-known services or can be done many different ways. **Result: more than tripled top-of-funnel traffic** while maintaining conversion rates.

### Southern New Hampshire University

SNHU was a small New England university with ~500 online students in 2010. President Paul LeBlanc applied JTBD thinking to understand what online learners were actually hiring SNHU to do. These students weren't traditional 18–22-year-olds seeking a campus experience — they were working adults, parents, and military personnel hiring SNHU for **career progress and credibility** while juggling competing responsibilities.

The job insight reshaped everything. SNHU redesigned admissions to process applications in **days instead of weeks**, assigned every online student a personal academic advisor, priced the online BA at one-third of on-campus tuition, and obsessed over removing friction. The competition wasn't other universities — it was non-consumption, the status quo of not having a degree. SNHU grew to **85,000+ students** and became one of the largest universities in the United States. LeBlanc: *"You have to be very hard-nosed about the job people are asking you to do for them, and then really optimize for that."*

---

## 9. Critiques and limitations worth knowing

**Abstraction is hard to calibrate.** The most common struggle: how high-level should a job be? "Be a healthier person" is too broad to act on. "Reduce prep time for dinner" might be too narrow. The right level — "get a healthy meal on the table on a busy weeknight" — requires judgment, and teams argue about it endlessly. This has been called "The JTBD War" between activity-level and progress-level framing.

**Operationalization is challenging.** JTBD insights don't map directly to sprint tickets. Teams accustomed to feature-first planning often struggle to translate "minimize the anxiety of looking disorganized in front of my manager" into a backlog item. The methodology gives you the problem — the internal work of designing solutions still follows.

**Research has practical barriers.** Switch interviews require finding recent switchers who remember decision details — a non-trivial recruitment challenge. ODI requires surveying hundreds to thousands of customers. Jeff Baker, who worked at both Microsoft and Strategyn, called ODI *"the Cadillac solution"* — powerful but resource-intensive. Not every team has the time or budget.

**The community is fragmented.** The Ulwick and Moesta schools use different definitions, methods, and terminology. Ulwick publicly criticized Klement; Christensen omitted Ulwick from *Competing Against Luck*. This ideological fracture confuses practitioners trying to learn JTBD and can undermine organizational buy-in.

**JTBD has clear boundaries.** It doesn't guide visual design, interaction patterns, accessibility, or detailed UX — only the *why* behind what you're building. Jared Spool argued JTBD is *"an occasionally useful gimmick"* that can't handle complex products. It may undervalue identity-based purchasing (luxury goods, status symbols) and subconscious brand associations. And it's backward-looking by nature — built on existing struggles, not well-suited to predicting completely novel behaviors or creating new markets from scratch.

**Common misapplications** include confusing tasks with jobs ("upload a file" vs. "share sensitive data securely"), writing generic job statements ("be more productive"), conducting solution-first interviews that validate assumptions, and treating JTBD as a one-time exercise rather than ongoing research.

---

## 10. Glossary of essential JTBD terms

**Job-to-be-Done (JTBD):** The progress a customer is trying to make in a particular circumstance. Solution-agnostic, stable over time, and independent of any specific product.

**Hiring and firing:** The core JTBD metaphor. Customers "hire" a product to get a job done and "fire" it when it stops performing or something better appears.

**Struggling moment:** The specific point when a person becomes aware their current situation isn't working and begins seeking change. The seed of all demand.

**Four Forces of Progress:** The psychological forces governing switching: push (dissatisfaction with current state), pull (attraction of new solution), anxiety (fear about the new), and habit (comfort with the old). Switch occurs when push + pull > anxiety + habit.

**Job Map:** An 8-step decomposition of a functional job: define → locate → prepare → confirm → execute → monitor → modify → conclude. Solution-agnostic framework for capturing desired outcomes.

**Desired outcome statement:** A structured need statement used in ODI. Format: [direction of improvement] + [performance metric] + [object of control] + [contextual clarifier]. Example: "Minimize the time it takes to verify all ingredients are available."

**Opportunity score:** ODI's prioritization metric. Formula: Importance + max(Importance − Satisfaction, 0). Scores above 10 = underserved; above 15 = extreme opportunity.

**Overserved / underserved:** Classification of outcomes. Underserved = high importance, low satisfaction (innovation opportunity). Overserved = low importance, high satisfaction (disruption or cost-reduction opportunity).

**Job story:** Requirement format anchored in context: "When [situation], I want to [motivation], so I can [expected outcome]." Replaces the persona in user stories with circumstance.

**Switch interview (timeline interview):** Qualitative method where recent switchers reconstruct their full decision timeline — from first thought through purchase — while the interviewer maps the four forces.

**Buyer's timeline:** The six-stage decision journey: first thought → passive looking → active looking → deciding → onboarding → ongoing use. Punctuated by Event One (passive → active) and Event Two (active → deciding).

**Non-consumption:** When people have a job but no satisfactory solution, so they do nothing. Represents a market opportunity where you compete against the absence of a solution rather than an incumbent.

**Functional / emotional / social jobs:** The three dimensions of any job. Functional = the practical task. Emotional-personal = how the customer wants to feel. Emotional-social = how they want to be perceived.

**Consumption chain jobs:** Jobs related to acquiring, setting up, using, maintaining, and disposing of a specific product — distinct from the core functional job but important for total experience design.

**Outcome-Driven Innovation (ODI):** Ulwick's systematic methodology for operationalizing JTBD. Maps jobs, quantifies desired outcomes, identifies underserved segments, and guides product strategy. Reports an 86% success rate vs. ~17% industry average.