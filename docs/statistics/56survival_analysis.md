---
layout: default
title: 5.6 Survival Analysis
parent: 5. Statistics
nav_order: 6
permalink: /survival-analysis.html
description: "Analyze time-to-event data with different methods in Isalos"
---

# Survival Analysis
{: .no_toc }
Survival Analysis, also known as "Time-to-Event" data analysis, is a collectuib of statistical methods that are used for analyzing data mesauring time until an event of interest occurs. Typical examples of such events include death, onset of disease, system failure, or arrival times. These methods are particularly useful when the timing of the event is as important as whether the event occurs.

A defining characteristic of survival data is that it is often incomplete, meaning that for some observations the event of interest is not observed within the study period. This gives rise to concepts such as censoring and truncation, which must be properly handled to avoid biased results.

## Censoring
{: .no_toc }
Censoring occurs when the exact event time is not known, but partial information about it is available. Survival analysis methods are specifically designed to incorporate censored observations without discarding them.

The main types of censoring are:
1. **Right Censoring:** The most common form. The event has not occurred by the end of the observation period or the subject is lost to follow-up.
Example: A patient is still alive at the end of a clinical trial.
1. **Left Censoring:** The event has already occurred before the subject enters the study, but the exact time is unknown.
Example: A disease is detected at diagnosis, but the onset time is unknown.
1. **Interval Censoring:** The event occurs within a known time interval, but the exact timing is unknown.
Example: A condition is identified between two medical check-ups.

## Truncation
{: .no_toc }
Truncation refers to situations where certain observations are systematically excluded from the dataset based on their event times. Unlike censoring, truncated observations are not observed at all.

The main types of truncation are:
1. **Left Truncation (Delayed Entry)**: Subjects enter the study only if their event time exceeds a certain threshold.
Example: Individuals are only included if they survive past a specific age.
1. **Right Truncation**: Subjects are only observed if the event has already occurred before a certain cutoff.
Example: Studying only individuals who have already experienced failure before a given time.

Proper handling of truncation is essential, as ignoring it can lead to significant selection bias.

## Key Functions in Survival Analysis
{: .no_toc }
Survival analysis is built around several fundamental functions that describe the distribution of time-to-event data:
1. **Survival Function** $$S(t)$$:
The survival function represents the probability that the event of interest has not occurred by time $$t$$:
    <div style="text-align: center;">
        <span id="eq. Survival function">
        $$
        \begin{equation}
            S(t) = P(T > t)
        \end{equation}   
        $$
        </span>
        </div>
1. **Probability Density Function** $$f(t)$$:
Describes the instantaneous likelihood of the event occurring at time $$t$$.
1. **Cumulative Distribution Function** $$F(t)$$:
Represents the probability that the event has occurred by time $$t$$:
    <div style="text-align: center;">
        <span id="eq. Cumulative Distribution function">
        $$
        \begin{equation}
            F(t) = P(T \leq t) = 1 - P(T > t) = 1 - S(t)
        \end{equation}   
        $$
        </span> 
    </div>
1. **Hazard Function** $$h(t)$$:
The hazard function represents the instantaneous rate at which events occur at time $$t$$, given survival up to that time:
    <div style="text-align: center;">
        <span id="eq. Hazard function">
        $$
        \begin{equation}
            h(t) = lim_{\Delta t \rightarrow 0} \frac{P(t<T<\Delta t | T \geq t)}{\Delta t}
        \end{equation}   
        $$
        </span>
    </div>
It provides insight into the risk dynamics over time.
1. **Cumulative Hazard Function** $$H(t)$$:
Defined as the accumulated hazard over time:
    <div style="text-align: center;">
        <span id="eq.Cumulative Hazard function">
        $$
        \begin{equation}
            H(t) = \int_0^t h(u) du
        \end{equation}   
        $$
        </span>
    </div>
It is related to the survival function via:
    <div style="text-align: center;">
        <span id="eq.Cumulative Hazard function - Survival Function">
        $$
        \begin{equation}
            S(t) = e^{-H(t)}
        \end{equation}   
        $$
        </span>
    </div>

The above functions are equivalent ways to describe a continuous probability distribution.

## Non-Parametric Methods
Non-parametric methods in survival analysis are statistical techniques that estimate survival characteristics without assuming any specific underlying probability distribution for the time-to-event data. This makes them particularly flexible and widely applicable, especially in exploratory analysis or when the true distribution of the data is unknown.

These methods rely directly on the observed data to construct estimates of key functions such as the survival function and, in some cases, the hazard function. Because they do not impose distributional assumptions, they are generally more robust but may be less efficient than parametric approaches when the underlying distribution is known.

Non-parametric methods are primarily used to:
1. Estimate the survival function $$S(t)$$ from observed data
1. Incorporate censored observations naturally into the analysis
1. Provide descriptive insights into survival patterns over time
1. Compare survival experiences between different groups
These methods are often the first step in survival analysis, offering a data-driven overview before applying more complex modeling techniques.

### Kaplan-Meier Estimator
The Kaplan–Meier estimator is a non-parametric method used to estimate the survival function from time-to-event data. It incorporates information from all available observations—both uncensored (events) and right-censored—by constructing the survival function as a sequence of stepwise estimates at observed event times.

Rather than treating time as continuous, the method partitions the time axis into intervals defined by the ordered distinct event times. At each event time $$t_i$$, the survival probability is updated based on the observed data.

At each event time $$t_i$$, the Kaplan–Meier estimator computes the conditional probability of surviving past that time as:
<div style="text-align: center;">
    <span id="eq.Kaplan Meier eq.1">
    $$
    \begin{equation}
        1 - \frac{d_i}{n_i}
    \end{equation}   
    $$
    </span>
</div>
where:
1. $$d_i$$ is the number of events occuring at time $$t_i$$.
1. $$n_i$$ is the number of individuals at risk just prior to time $$t_i$$.

The survival function is then estimated as the product of these conditional probabilities up to time $$t$$:
<div style="text-align: center;">
    <span id="eq.Kaplan Meier eq.2">
    $$
    \begin{equation}
        \hat{S(t)} = \prod_{t_i \leq t} (1 - \frac{d_i}{n_i})
    \end{equation}   
    $$
    </span>
</div>
With the estimate being initialized with $$S(0) = 1$$.

Right-censored observations are naturally incorporated into the Kaplan–Meier estimation process by contributing to the risk set up until the time at which they are censored. At each event time, the number of individuals at risk includes all subjects who have neither experienced the event nor been censored prior to that time. Once a subject becomes censored, they are removed from the risk set for all subsequent time points and no longer contribute to the calculation of survival probabilities. Importantly, censored observations do not count as events and therefore do not directly cause decreases in the survival function. Instead, their impact is indirect, as they reduce the number of individuals at risk in future intervals, which in turn influences the magnitude of subsequent survival probability estimates.

The Kaplan–Meier estimator produces a survival function that takes the form of a right-continuous step function, where changes in the estimated survival probability occur only at observed event times. Between these times, the survival probability remains constant. When multiple events occur at the same time point, they are handled collectively by aggregating them into a single step, ensuring that the calculation properly reflects the number of events relative to the individuals at risk. As a non-parametric method, the Kaplan–Meier estimator does not rely on any assumptions regarding the underlying distribution of survival times; instead, the shape of the survival curve is determined entirely by the observed data. This data-driven nature makes the estimator highly flexible and widely applicable, although it also limits its ability to extrapolate beyond the range of observed time points.

The variability of the survival estimate is commonly assessed using Greenwood’s formula, which provides an estimate of the variance:
<div style="text-align: center;">
    <span id="eq.Greenwoods formula">
    $$
    \begin{equation}
        Var(S(t)) = (S(t))^2 \sum_{t_i \leq t} \frac{d_i}{n_i*(n_i-d_i)}
    \end{equation}   
    $$
    </span>
</div>
From this, the standard error can be derived, allowing the construction of confidence intervals for the survival function.

The results of the Kaplan–Meier estimator are visualized using the Kaplan–Meier survival curve, which displays the estimated survival probability over time and confidence intervals, shown as bands around the curve. The median survival time is can be derived directly from the curve as the time at which $$S(t) \leq 0.5$$. Optionally the user can select to visualize the estimated hazard function and the estimated cumulative probability of failure.

Use the Kaplan Meier Estimator method by browsing in the top ribbon: 


| `Statistics` $$\rightarrow$$ `Survival Analysis` $$\rightarrow$$ `Non-Parametric` $$\rightarrow$$ `Kaplan Meier Estimator` |

#### Input
{: .no_toc }
The Kaplan–Meier estimator requires at least one column of numerical data to be specified in the input datasheet. The required input is a time variable column containing non-negative numerical values, representing the observed time-to-event or time-to-censoring for each subject. In addition to the time variable, several optional inputs may be provided to extend the functionality of the analysis. A censoring column may be specified as a variable, either numerical or textual, indicating whether each observation corresponds to an event or a censored case. A frequency column may also be included, consisting of non-negative numerical values that represent the number of identical observations associated with each row; if this column is not provided, each row is treated as a single observation by default. Furthermore, an event mode column may be defined, which can be either numerical or textual, and is used to distinguish between different types of events depending on the analysis configuration. Finally, a grouping column can be specidied as a categorical variable, either numerical or textual, indicating the group membership of each observation. All input columns must be of consistent type and should not contain invalid or missing values, as this may prevent the method from executing correctly.

#### Configuration
{: .no_toc }

| **Time Column** | Select the column corresponding to the observed time-to-event or time-to-censoring for each subject. This column must be numerical and contain non-negative values. |
|**Configure Event Mode Options**| Use this button to open the `Configure Event Mode Options` window |
|**Event Mode Column**| Within the `Configure Event Mode Options` window, specify the column containing event mode information. |
|**Levels not Considered as Event/Levels Considered as Event**| Manually select which levels should be treated as events from the available levels of the Event Mode Column. Use the arrow buttons to move levels between the two lists. Single-arrow buttons move selected levels, while double-arrow buttons move all levels. At least one level must be selected as an event. |
|**Clear Event Mode Options**| Use this button to clear all selections related to event mode configuration. |
| **Use a Frequency Column** | Enable this option to include a frequency column in the analysis. |
| **Frequency Column** |  If the `Use a Frequency Column` option is enabled, select the column containing frequency information for each observation. This column must be numerical and contain non-negative values. |
| **Use a Censoring  Column** | Enable this option to include a censoring column in the analysis. |
| **Censoring Column** |  If the `Use a Censoring Column` option is enabled, select the column containing censoring information for each observation. This column must be categorical and may be either numerical or textual. |
| **Censoring Indicator Value** | If a censoring column is used, specify which of its two levels represents a censored observation. |
| **Censor times at or above a value** | Enable this option to treat all time values greater than or equal to a specified threshold as censored. |
| **Censoring Threshold Value** | If the `Censor times at or above a value` option is enabled, specify the value above or equal to which observations will be treated as censored. |
| **Use a Grouping Column** | Enable this option to include a grouping column in the analysis, allowing comparison of survival across different groups in the population. |
| **Grouping Column** |  If the `Use a Grouping Column` option is enabled, select the column containing grouping information for each observation. This column must be categorical. |
| **Confidence Level (%)** | Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. Default value is set to 95. |
| **Confidence Interval Type** | Select the type of confidence interval to compute. Available options include: `Two-sided`, `Lower Bound`, `Upper Bound`. |
| **Hazard Function Plot** | Enable this option to generate a plot of the estimated hazard function over time. |
| **Cumulative Probability of Failure Plot** | Enable this option to generate a plot of the estimated cumulative probability of failure over time. |


#### Output
{: .no_toc }
The output spreadsheet contains a table summarizing the survival analysis results at each observed time point. This includes the number of subjects at risk, the number of events, the estimated survival probability, its standard error, and the corresponding confidence interval bounds at the selected confidence level. If a grouping column is specified, the spreadsheet first presents the overall results for the full sample, followed by separate tables for each group. In addition, a pop-up window displays the Kaplan–Meier survival curve, showing the stepwise estimate of survival probability over time along with the associated confidence interval bounds. When grouping is enabled, the plot includes the overall survival curve as well as separate curves with confidence bounds for each group. Similarly, if selected, the hazard function and cumulative probability of failure plots are generated and display both the overall estimates and the corresponding group-specific curves.

#### Example
{: .no_toc }

##### Input
{: .no_toc }
In the input datasheet the requirement is to specify at least one numerical column and insert the appropriate data, as shown below.
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_input.png" alt="KaplanMeier-input" width="800" height="600" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select  `Statistics` → `Survival Analysis` → `Non-Parametric` → `Kaplan-Meier Estimator`.
1. Select the `Time Column`[1]. This column should contain non-negative numeric values.
1. Optionally click on the `Configure Event Mode Options` [2] button to select an `Event Mode Column` [3] and use the arrow buttons [4] to select the levels that should be accounted for in the analysis by moving them between the `LEvels not Considered as Event`[5] and `Levels Considered as Event`[6] lists. `Save` or `Cancel` any changes made using the appropriate buttons [7].
1. Once you have configured some Event Mode Options you can optionally use the `Clear Event Mode Options` [8] button to erase any selections made.
1. Select/tick to `Use a Frequency Column` [9]. 
1. If the `Use a Frequency Column` option is selected, specify a `Frequency Column`[10]. This column should contain non-negative numeric values.
1. Select/tick to `Use a Censoring Column` [11]. 
1. If the `Use a Censoring Column` option is selected, specify a `Censoring Column`[12] and the value of this column that should be the `Censored Indicator Value` [13].
1. Select/tick to `Censor times at or above a value` [14]. 
1. If the ``Censor times at or above a value` option is selected, specify a `Censoring Thresholdd Value`[15] above which events are considered censored.
1. Select/tick to `Use a Grouping Column` [16]. 
1. If the `Use a Grouping Column` option is selected, specify a `Grouping Column`[17]. This column should be categorical, either textual or numerical.
1. Specify the `Confidence Level` (%) [18] for Confidence Intervals and the desired `Confidence Interval Type` [19].
1. Optionally select/tick to calculate and present the `Hazard Function Plot` [20] and the `Cumulative Probability of Failure Plot` [21].
1. Click on the `Execute` button [22] to perform the Kaplan-Meier Estimator. 
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_configuration.png" alt="KaplanMeier-configuration" width="600" height="600" class="img-responsive">
</div>

##### Output
{: .no_toc }
The tables summarizing the survival analysis results for the non grouped dataset and each grouping level are shown in the output spreadsheet.
In addition, a pop-up window displays the Kaplan–Meier survival curve and, if selected, the hazard function and cumulative probability of failure plots.
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_output.png" alt="KaplanMeier-output" width="800" height="600" class="img-responsive">
</div>
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_chart.png" alt="KaplanMeier-chart" width="800" height="600" class="img-responsive">
</div>

---

### Life Table Analysis
The Life Table method (also known as the Actuarial method) is a non-parametric approach used to estimate survival characteristics from time-to-event data by grouping observations into time intervals. Unlike the Kaplan–Meier estimator, which updates the survival estimate at each distinct event time, the Life Table method summarizes the data within predefined intervals and computes the relevant quantities at the interval level.

The time axis is partitioned into consecutive intervals of the form $$[0,e_0), [e_0,e_1), ... , [e_{k-1},e_k), [e_k,\infty)$$. These intervals may either be specified explicitly through user-defined endpoints or generated automatically using a given end time and interval width.

For each interval $$i$$, the method determines the number of subjects entering the interval, the number of events occurring within the interval, and the number of censored observations. If a frequency column is provided, observations contribute according to their specified frequencies. Optional censoring indicators and threshold censoring are also incorporated, and event mode filtering allows only selected event types to be considered.

Because censoring may occur at any point within an interval, the method uses an effective sample size defined as

<div style="text-align: center;"> $$ n_i' = n_i - \frac{w_i}{2} $$ </div>

where $$n_i$$ is the number of subjects entering interval $$i$$ and $$w_i$$ is the number censored within that interval. This adjustment reflects the assumption that censoring occurs approximately uniformly throughout the interval.

The conditional probability of failure in interval $$i$$ is then estimated as

<div style="text-align: center;"> $$ q_i = \frac{d_i}{n_i - \frac{w_i}{2}} $$ </div>

where $$d_i$$ is the number of events occurring in that interval.

The survival function is estimated as the product of the conditional survival probabilities across intervals:

<div style="text-align: center;"> $$ \hat{S}(t) = \prod_{t_j \leq t} (1 - q_j) $$ </div>

with the estimate initialized at $$S(0)=1$$. The resulting survival curve is a step function with changes occurring at the interval boundaries.

In addition to the survival function, the method also estimates the hazard function within each finite interval. In this implementation, the hazard is computed using an exposure-based approximation, where the exposure accounts for both censoring and events within the interval. The hazard estimate therefore represents the event rate over the interval and is associated with the midpoint of the interval.

The variability of the estimates is assessed using a Greenwood-type variance formulation applied at the interval level. Standard errors are computed for the conditional probability of failure, the survival function, and the hazard function, and corresponding confidence intervals are constructed according to the selected confidence level and interval type.

The Life Table method produces a structured tabular output in which each row corresponds to an interval. For each interval, the table reports the number entering the interval, the number of events, the number censored, the effective sample size, the conditional probability of failure, the estimated survival probability at the end of the interval, and the hazard function, together with their standard errors and confidence interval bounds. The final interval is represented as an open-ended interval $$[a,+∞)$$; quantities that depend on a finite interval width, such as the hazard function and survival updates, are only reported for the finite intervals.

The results are typically visualized using plots of the survival function, and optionally the hazard function and cumulative probability of failure, providing a graphical representation of the interval-based estimates.

Use the Life Table Analysis method by browsing in the top ribbon: 


| `Statistics` $$\rightarrow$$ `Survival Analysis` $$\rightarrow$$ `Non-Parametric` $$\rightarrow$$ `Life Table Analysis` |

#### Input
{: .no_toc }
The Life Table method requires at least one column of numerical data to be specified in the input datasheet. The required input is a time variable column containing non-negative numerical values, representing the observed time-to-event or time-to-censoring for each subject. In addition to the time variable, several optional inputs may be provided to extend the functionality of the analysis. A censoring column may be specified as a categorical variable, either numerical or textual, indicating whether each observation corresponds to an event or a censored case. A frequency column may also be included, consisting of non-negative numerical values that represent the number of identical observations associated with each row; if this column is not provided, each row is treated as a single observation by default. Furthermore, an event mode column may be defined, which can be either numerical or textual, and is used to distinguish between different types of events depending on the analysis configuration. A grouping column may also be specified as a categorical variable, either numerical or textual, indicating the group membership of each observation. An additional optional column may be provided to specify the endpoints of the intervals used in the analysis; if this is not specified, the intervals are generated automatically based on the chosen end time and interval width. All input columns must be of consistent type and should not contain invalid or missing values, as this may prevent the method from executing correctly.

#### Configuration
{: .no_toc }

| **Time Column** | Select the column corresponding to the observed time-to-event or time-to-censoring for each subject. This column must be numerical and contain non-negative values. |
|**Configure Event Mode Options**| Use this button to open the `Configure Event Mode Options` window |
|**Event Mode Column**| Within the `Configure Event Mode Options` window, specify the column containing event mode information. |
|**Levels not Considered as Event/Levels Considered as Event**| Manually select which levels should be treated as events from the available levels of the Event Mode Column. Use the arrow buttons to move levels between the two lists. Single-arrow buttons move selected levels, while double-arrow buttons move all levels. At least one level must be selected as an event. |
|**Clear Event Mode Options**| Use this button to clear all selections related to event mode configuration. |
|**Specify End Time and Time Steps / Use a column to specify end points**| Select whether to define the intervals automatically by specifying an end time and interval width, or to provide a column containing the endpoints of each interval. |
|**Intervals through / by**| Specify the end time and the width of each interval when automatic interval generation is selected. |
|**End Points Column**|  If the option to use a column is selected, choose the column containing the endpoints of the intervals. This column must be numerical and contain non-negative values. |
| **Use a Frequency Column** | Enable this option to include a frequency column in the analysis. |
| **Frequency Column** |  If the `Use a Frequency Column` option is enabled, select the column containing frequency information for each observation. This column must be numerical and contain non-negative values. |
| **Use a Censoring  Column** | Enable this option to include a censoring column in the analysis. |
| **Censoring Column** |  If the `Use a Censoring Column` option is enabled, select the column containing censoring information for each observation. This column must be categorical and may be either numerical or textual. |
| **Censoring Indicator Value** | If a censoring column is used, specify which of its two levels represents a censored observation. |
| **Censor times at or above a value** | Enable this option to treat all time values greater than or equal to a specified threshold as censored. |
| **Censoring Threshold Value** | If the `Censor times at or above a value` option is enabled, specify the value above or equal to which observations will be treated as censored. |
| **Use a Grouping Column** | Enable this option to include a grouping column in the analysis, allowing comparison of survival across different groups in the population. |
| **Grouping Column** |  If the `Use a Grouping Column` option is enabled, select the column containing grouping information for each observation. This column must be categorical. |
| **Confidence Level (%)** | Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. Default value is set to 95. |
| **Confidence Interval Type** | Select the type of confidence interval to compute. Available options include: `Two-sided`, `Lower Bound`, `Upper Bound`. |
| **Hazard Function Plot** | Enable this option to generate a plot of the estimated hazard function over time. |
| **Cumulative Probability of Failure Plot** | Enable this option to generate a plot of the estimated cumulative probability of failure over time. |


#### Output
{: .no_toc }
The output spreadsheet contains a table summarizing the survival analysis results for each time interval. This includes the number of subjects entering the interval, the number of events, the number censored, the effective sample size, the estimated conditional probability of failure, its standard error, and the corresponding confidence interval bounds at the selected confidence level. In addition, the table reports the estimated survivor function at the end of each interval, along with its standard error and confidence bounds, as well as the estimated hazard function and its associated uncertainty measures for finite intervals. If a grouping column is specified, the spreadsheet first presents the overall results for the full sample, followed by separate tables for each group.

In addition, a pop-up window displays the Life Table survival curve, showing the stepwise estimate of survival probability across intervals along with the associated confidence interval bounds. When grouping is enabled, the plot includes the overall survival curve as well as separate curves with confidence bounds for each group. Similarly, if selected, the hazard function and cumulative probability of failure plots are generated and display both the overall estimates and the corresponding group-specific curves.

#### Example
{: .no_toc }

##### Input
{: .no_toc }
In the input datasheet the requirement is to specify at least one numerical column and insert the appropriate data, as shown below.
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/LifeTable_input.png" alt="LifeTable-input" width="800" height="600" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select  `Statistics` → `Survival Analysis` → `Non-Parametric` → `Kaplan-Meier Estimator`.
1. Select the `Time Column`[1]. This column should contain non-negative numeric values.
1. Optionally click on the `Configure Event Mode Options` [2] button to select an `Event Mode Column` [3] and use the arrow buttons [4] to select the levels that should be accounted for in the analysis by moving them between the `LEvels not Considered as Event`[5] and `Levels Considered as Event`[6] lists. `Save` or `Cancel` any changes made using the appropriate buttons [7].
1. Once you have configured some Event Mode Options you can optionally use the `Clear Event Mode Options` [8] button to erase any selections made.
1. Select whether to `Specify End Time and Time Steps` or `Use a column to specify end points` for the Interval Creation [9].
1. If you choose to `Specify End Time and Time Steps` then specify the end time[10] and the time steps [11], otherwise select the `End Points Column`[12]
1. Select/tick to `Use a Frequency Column` [13]. 
1. If the `Use a Frequency Column` option is selected, specify a `Frequency Column`[14]. This column should contain non-negative numeric values.
1. Select/tick to `Use a Censoring Column` [15]. 
1. If the `Use a Censoring Column` option is selected, specify a `Censoring Column`[16] and the value of this column that should be the `Censored Indicator Value` [17].
1. Select/tick to `Censor times at or above a value` [18]. 
1. If the ``Censor times at or above a value` option is selected, specify a `Censoring Thresholdd Value`[19] above which events are considered censored.
1. Select/tick to `Use a Grouping Column` [20]. 
1. If the `Use a Grouping Column` option is selected, specify a `Grouping Column`[21]. This column should be categorical, either textual or numerical.
1. Specify the `Confidence Level` (%) [22] for Confidence Intervals and the desired `Confidence Interval Type` [23].
1. Optionally select/tick to calculate and present the `Hazard Function Plot` [24] and the `Cumulative Probability of Failure Plot` [25].
1. Click on the `Execute` button [26] to perform the Life-table analysis. 
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/LifeTable_configuration.png" alt="LifeTable-configuration" width="600" height="600" class="img-responsive">
</div>

##### Output
{: .no_toc }
The tables summarizing the survival analysis results for the non grouped dataset and each grouping level are shown in the output spreadsheet.
In addition, a pop-up window displays the Life-table survival curve and, if selected, the hazard function and cumulative probability of failure plots.
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/LifeTable_output.png" alt="LifeTable-output" width="800" height="600" class="img-responsive">
</div>
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/LifeTable_chart.png" alt="LifeTable-chart" width="800" height="600" class="img-responsive">
</div>

---

---

### Nelson-Aalen Method
The Nelson–Aalen estimator is a non-parametric method used to estimate the cumulative hazard function from time-to-event data. Unlike the Kaplan–Meier estimator, which directly estimates the survival function, the Nelson–Aalen method focuses on estimating the cumulative hazard and then derives the survival function from it.

The method operates on the ordered distinct event times. For each time point $$t_i$$, the number of individuals at risk just prior to that time and the number of events occurring at that time are determined. Observations may contribute with frequency weights if a frequency column is provided, and optional censoring indicators, threshold censoring, and event mode filtering are incorporated in the same manner as in other survival methods.

At each event time $$t_i$$, the hazard increment is estimated as

<div style="text-align: center;"> $$ \frac{d_i}{n_i} $$ </div>

where $$d_i$$ is the number of events occurring at time $$t_i$$ and $$n_i$$ is the number of individuals at risk just prior to that time.

The cumulative hazard function is then obtained by summing these increments over time:

<div style="text-align: center;"> $$ \hat{H}(t) = \sum_{t_i \leq t} \frac{d_i}{n_i} $$ </div>

The estimate is initialized at $$H(0)=0$$ and increases in a stepwise manner at observed event times.

Right-censored observations are incorporated by contributing to the risk set up until their censoring time. At each time point, the number at risk includes all individuals who have not yet experienced the event or been censored prior to that time. After their censoring time, these observations are removed from the risk set and no longer contribute to subsequent calculations. As with other non-parametric methods, censored observations do not count as events and therefore do not directly affect the hazard increments, but they influence the estimates through their effect on the number at risk.

The Nelson–Aalen estimator produces a cumulative hazard function that is a non-decreasing step function, with jumps occurring only at observed event times. The size of each jump corresponds to the ratio of the number of events to the number at risk at that time.

The variability of the cumulative hazard estimate is assessed using the variance estimator

<div style="text-align: center;"> $$ \text{Var}(\hat{H}(t)) = \sum_{t_i \leq t} \frac{d_i}{n_i^2} $$ </div>

from which the standard error can be derived. Confidence intervals for the cumulative hazard are constructed using a normal approximation based on the selected confidence level.

The survival function is obtained from the cumulative hazard through the transformation

<div style="text-align: center;"> $$ \hat{S}(t) = \exp(-\hat{H}(t)) $$ </div>

and the cumulative probability of failure is computed as

<div style="text-align: center;"> $$ \hat{F}(t) = 1 - \hat{S}(t) $$ </div>

Confidence intervals for the survival function and cumulative probability of failure are derived by transforming the confidence bounds of the cumulative hazard estimate.

The Nelson–Aalen method produces a tabular output in which each row corresponds to a time point at which at least one event occurs. For each such time, the table reports the number at risk, the number of events, the hazard increment, the cumulative hazard estimate, and its standard error, together with the corresponding confidence interval bounds. In addition, the table includes the derived survival probability and cumulative probability of failure, along with their associated confidence intervals.

The results are typically visualized using stepwise plots of the the survival function, and optionally the cumulative probability of failure and the cumulative hazard function, providing a comprehensive view of the event dynamics over time.

Use the Nelson-Aalen Method by browsing in the top ribbon: 


| `Statistics` $$\rightarrow$$ `Survival Analysis` $$\rightarrow$$ `Non-Parametric` $$\rightarrow$$ `Nelson-Aalen Method` |

#### Input
{: .no_toc }
The Nelson-Aalen Method requires at least one column of numerical data to be specified in the input datasheet. The required input is a time variable column containing non-negative numerical values, representing the observed time-to-event or time-to-censoring for each subject. In addition to the time variable, several optional inputs may be provided to extend the functionality of the analysis. A censoring column may be specified as a categorical variable, either numerical or textual, indicating whether each observation corresponds to an event or a censored case. A frequency column may also be included, consisting of non-negative numerical values that represent the number of identical observations associated with each row; if this column is not provided, each row is treated as a single observation by default. Furthermore, an event mode column may be defined, which can be either numerical or textual, and is used to distinguish between different types of events depending on the analysis configuration. Finally, a grouping column can be specidied as a categorical variable, either numerical or textual, indicating the group membership of each observation. All input columns must be of consistent type and should not contain invalid or missing values, as this may prevent the method from executing correctly.

#### Configuration
{: .no_toc }

| **Time Column** | Select the column corresponding to the observed time-to-event or time-to-censoring for each subject. This column must be numerical and contain non-negative values. |
|**Configure Event Mode Options**| Use this button to open the `Configure Event Mode Options` window |
|**Event Mode Column**| Within the `Configure Event Mode Options` window, specify the column containing event mode information. |
|**Levels not Considered as Event/Levels Considered as Event**| Manually select which levels should be treated as events from the available levels of the Event Mode Column. Use the arrow buttons to move levels between the two lists. Single-arrow buttons move selected levels, while double-arrow buttons move all levels. At least one level must be selected as an event. |
|**Clear Event Mode Options**| Use this button to clear all selections related to event mode configuration. |
| **Use a Frequency Column** | Enable this option to include a frequency column in the analysis. |
| **Frequency Column** |  If the `Use a Frequency Column` option is enabled, select the column containing frequency information for each observation. This column must be numerical and contain non-negative values. |
| **Use a Censoring  Column** | Enable this option to include a censoring column in the analysis. |
| **Censoring Column** |  If the `Use a Censoring Column` option is enabled, select the column containing censoring information for each observation. This column must be categorical and may be either numerical or textual. |
| **Censoring Indicator Value** | If a censoring column is used, specify which of its two levels represents a censored observation. |
| **Censor times at or above a value** | Enable this option to treat all time values greater than or equal to a specified threshold as censored. |
| **Censoring Threshold Value** | If the `Censor times at or above a value` option is enabled, specify the value above or equal to which observations will be treated as censored. |
| **Use a Grouping Column** | Enable this option to include a grouping column in the analysis, allowing comparison of survival across different groups in the population. |
| **Grouping Column** |  If the `Use a Grouping Column` option is enabled, select the column containing grouping information for each observation. This column must be categorical. |
| **Confidence Level (%)** | Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. Default value is set to 95. |
| **Confidence Interval Type** | Select the type of confidence interval to compute. Available options include: `Two-sided`, `Lower Bound`, `Upper Bound`. |
| **Cumulative Hazard Function Plot** | Enable this option to generate a plot of the estimated cumulative hazard function over time. |
| **Cumulative Probability of Failure Plot** | Enable this option to generate a plot of the estimated cumulative probability of failure over time. |


#### Output
{: .no_toc }
The output spreadsheet contains a table summarizing the survival analysis results at each observed time point. This includes the number of subjects at risk, the number of events, the estimated survival probability, its standard error, and the corresponding confidence interval bounds at the selected confidence level. If a grouping column is specified, the spreadsheet first presents the overall results for the full sample, followed by separate tables for each group.

In addition, a pop-up window displays the Kaplan–Meier survival curve, showing the stepwise estimate of survival probability over time along with the associated confidence interval bounds. When grouping is enabled, the plot includes the overall survival curve as well as separate curves with confidence bounds for each group. Similarly, if selected, the cumulative hazard function and cumulative probability of failure plots are generated and display both the overall estimates and the corresponding group-specific curves.

#### Example
{: .no_toc }

##### Input
{: .no_toc }
In the input datasheet the requirement is to specify at least one numerical column and insert the appropriate data, as shown below.
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_input.png" alt="NelsonAalen-input" width="800" height="600" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select  `Statistics` → `Survival Analysis` → `Non-Parametric` → `Nelson-Aalen Method`.
1. Select the `Time Column`[1]. This column should contain non-negative numeric values.
1. Optionally click on the `Configure Event Mode Options` [2] button to select an `Event Mode Column` [3] and use the arrow buttons [4] to select the levels that should be accounted for in the analysis by moving them between the `LEvels not Considered as Event`[5] and `Levels Considered as Event`[6] lists. `Save` or `Cancel` any changes made using the appropriate buttons [7].
1. Once you have configured some Event Mode Options you can optionally use the `Clear Event Mode Options` [8] button to erase any selections made.
1. Select/tick to `Use a Frequency Column` [9]. 
1. If the `Use a Frequency Column` option is selected, specify a `Frequency Column`[10]. This column should contain non-negative numeric values.
1. Select/tick to `Use a Censoring Column` [11]. 
1. If the `Use a Censoring Column` option is selected, specify a `Censoring Column`[12] and the value of this column that should be the `Censored Indicator Value` [13].
1. Select/tick to `Censor times at or above a value` [14]. 
1. If the ``Censor times at or above a value` option is selected, specify a `Censoring Thresholdd Value`[15] above which events are considered censored.
1. Select/tick to `Use a Grouping Column` [16]. 
1. If the `Use a Grouping Column` option is selected, specify a `Grouping Column`[17]. This column should be categorical, either textual or numerical.
1. Specify the `Confidence Level` (%) [18] for Confidence Intervals and the desired `Confidence Interval Type` [19].
1. Optionally select/tick to calculate and present the `Cumulative Hazard Function Plot` [20] and the `Cumulative Probability of Failure Plot` [21].
1. Click on the `Execute` button [22] to perform the Nelson-Aalen Method. 
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/NelsonAalen_configuration.png" alt="NelsonAalen-configuration" width="600" height="600" class="img-responsive">
</div>

##### Output
{: .no_toc }
The tables summarizing the survival analysis results for the non grouped dataset and each grouping level are shown in the output spreadsheet.
In addition, a pop-up window displays the Nelson-Aalen survival curve and, if selected, the cumulative hazard function and cumulative probability of failure plots.
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/NelsonAalen_output.png" alt="NelsonAalen-output" width="800" height="600" class="img-responsive">
</div>
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/NelsonAalen_chart.png" alt="NelsonAalen-chart" width="800" height="600" class="img-responsive">
</div>

---

---

### Turnbull Estimator
The Turnbull estimator is a non-parametric method used to estimate the survival function from interval-censored time-to-event data, where the exact event time is not observed but is known to lie within a time interval. This method generalizes the Kaplan–Meier estimator by allowing each observation to be represented as an interval $$(l_i,r_i]$$, where the event is known to occur after time $$l_i$$ and at or before time $$r_i$$.

The input data consists of two columns specifying the lower and upper bounds of the observation intervals. These bounds may be partially specified; in particular, the lower bound may be missing to indicate left-censoring, and the upper bound may be missing to indicate right-censoring. However, both bounds cannot be missing simultaneously for the same observation. All interval bounds must be non-negative, and the lower bound must not exceed the upper bound.

The Turnbull estimator constructs a set of disjoint intervals by collecting and sorting all distinct interval endpoints present in the data. These intervals define the support over which the probability distribution of event times is estimated. Each observation contributes to all intervals that lie entirely within its corresponding censoring interval.

The method estimates the probability mass assigned to each interval using an iterative procedure based on the Expectation–Maximization (EM) algorithm. Starting from an initial distribution over the admissible intervals, the algorithm repeatedly updates the estimated probability masses by redistributing the observed data across intervals in a manner consistent with the censoring constraints. At each iteration, the expected number of events in each interval is computed and used to update the probability masses until convergence is achieved within a specified tolerance or until a maximum number of iterations is reached.

The resulting estimates define a discrete probability distribution over the constructed intervals. From this distribution, the survival function is obtained as the complement of the cumulative distribution function:

<div style="text-align: center;"> $$ \hat{S}(t) = 1 - \sum_{j: \tau_j \leq t} p_j $$ </div>

where $$p_j$$ is the estimated probability mass assigned to interval $$j$$. The cumulative probability of failure is correspondingly given by

<div style="text-align: center;"> $$ \hat{F}(t) = 1 - \hat{S}(t) $$ </div>

The Turnbull estimator produces a stepwise survival function, with changes occurring at the boundaries of the constructed intervals. Unlike methods based on exact event times, the resolution of the estimate depends on the structure of the observed censoring intervals.

The variability of the estimated probability masses is assessed using a likelihood-based covariance approach. The observed information matrix is constructed based on the fitted model, and the covariance of the interval probabilities is obtained under the constraint that the total probability sums to one. From this covariance matrix, standard errors are derived for both the interval probability masses and the cumulative quantities. In cases where the information matrix is singular or numerically unstable, an approximate variance calculation is used as a fallback.

The Turnbull method produces a tabular output in which each row corresponds to an interval with positive estimated probability mass. For each interval, the table reports the number of subjects entering the interval, the estimated number of events, the probability mass assigned to the interval, and the associated standard error and confidence interval bounds. In addition, the table includes the estimated survival probability and cumulative probability of failure at the end of each interval, together with their corresponding uncertainty measures. The final interval, which may extend to infinity, is reported separately, and quantities that depend on finite support are omitted where appropriate.

The results are typically visualized using stepwise plots of the survival function and cumulative probability of failure, providing a graphical representation of the distribution of event times under interval censoring.

Use the Turnbull Estimator by browsing in the top ribbon: 


| `Statistics` $$\rightarrow$$ `Survival Analysis` $$\rightarrow$$ `Non-Parametric` $$\rightarrow$$ `Turnbull Estimator` |

#### Input
{: .no_toc }
The Turnbull method requires two columns of numerical data to be specified in the input datasheet. The required inputs are a lower bound column and an upper bound column, representing the interval within which the event is known to occur for each observation. These columns must contain non-negative numerical values. Empty cells are allowed in either the lower bound column or the upper bound column to represent left-censored or right-censored observations respectively; however, both values cannot be empty in the same row. In addition, when both bounds are specified, the lower bound must not exceed the upper bound. In addition to the interval bounds, several optional inputs may be provided to extend the functionality of the analysis. A frequency column may also be included, consisting of non-negative numerical values that represent the number of identical observations associated with each row; if this column is not provided, each row is treated as a single observation by default. Furthermore, an event mode column may be defined, which can be either numerical or textual, and is used to distinguish between different types of events depending on the analysis configuration. Finally, a grouping column can be specified as a categorical variable, either numerical or textual, indicating the group membership of each observation. All input columns must be of consistent type and should not contain invalid or missing values, as this may prevent the method from executing correctly.

#### Configuration
{: .no_toc }

| **Interval Start (Lower Bound)** | Select the column corresponding to the lower bound of the interval for each subject. This column must be numerical and contain non-negative values. |
| **Interval End (Upper Bound)** | Select the column corresponding to the upper bound of the interval for each subject. This column must be numerical and contain non-negative values. For each row the upper bound should be larger or equal to the lower bound.|
|**Event Mode Column**| Within the `Configure Event Mode Options` window, specify the column containing event mode information. |
|**Levels not Considered as Event/Levels Considered as Event**| Manually select which levels should be treated as events from the available levels of the Event Mode Column. Use the arrow buttons to move levels between the two lists. Single-arrow buttons move selected levels, while double-arrow buttons move all levels. At least one level must be selected as an event. |
|**Clear Event Mode Options**| Use this button to clear all selections related to event mode configuration. |
| **Use a Frequency Column** | Enable this option to include a frequency column in the analysis. |
| **Frequency Column** |  If the `Use a Frequency Column` option is enabled, select the column containing frequency information for each observation. This column must be numerical and contain non-negative values. |
| **Use a Grouping Column** | Enable this option to include a grouping column in the analysis, allowing comparison of survival across different groups in the population. |
| **Grouping Column** |  If the `Use a Grouping Column` option is enabled, select the column containing grouping information for each observation. This column must be categorical. |
| **Confidence Level (%)** | Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. Default value is set to 95. |
| **Confidence Interval Type** | Select the type of confidence interval to compute. Available options include: `Two-sided`, `Lower Bound`, `Upper Bound`. |
| **Cumulative Probability of Failure Plot** | Enable this option to generate a plot of the estimated cumulative probability of failure over time. |
| **Max Iterations** | Specify the maximum number of iterations for the EM algorithm. The default value is 1000. |
| **Convergence Tolerance** | Specify the convergence tolerance for the EM algorithm. The default value is $$10^{-7}$$ |


#### Output
{: .no_toc }
The output spreadsheet contains a table summarizing the survival analysis results at each interval. This includes the number entering the interval, the number of events during the interval, the estimated probability mass for the interval, the estimated survival probability and the cumulative probability of failure, along with their standard errors, and the corresponding confidence interval bounds at the selected confidence level. If a grouping column is specified, the spreadsheet first presents the overall results for the full sample, followed by separate tables for each group.

In addition, a pop-up window displays the Kaplan–Meier survival curve, showing the stepwise estimate of survival probability over time along with the associated confidence interval bounds. When grouping is enabled, the plot includes the overall survival curve as well as separate curves with confidence bounds for each group. Similarly, if selected, cumulative probability of failure plot is generated and displays both the overall estimates and the corresponding group-specific curves.

#### Example
{: .no_toc }

##### Input
{: .no_toc }
In the input datasheet the requirement is to specify at least one numerical column and insert the appropriate data, as shown below.
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_input.png" alt="KaplanMeier-input" width="800" height="600" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select  `Statistics` → `Survival Analysis` → `Non-Parametric` → `Kaplan-Meier Estimator`.
1. Select the `Time Column`[1]. This column should contain non-negative numeric values.
1. Optionally click on the `Configure Event Mode Options` [2] button to select an `Event Mode Column` [3] and use the arrow buttons [4] to select the levels that should be accounted for in the analysis by moving them between the `LEvels not Considered as Event`[5] and `Levels Considered as Event`[6] lists. `Save` or `Cancel` any changes made using the appropriate buttons [7].
1. Once you have configured some Event Mode Options you can optionally use the `Clear Event Mode Options` [8] button to erase any selections made.
1. Select/tick to `Use a Frequency Column` [9]. 
1. If the `Use a Frequency Column` option is selected, specify a `Frequency Column`[10]. This column should contain non-negative numeric values.
1. Select/tick to `Use a Censoring Column` [11]. 
1. If the `Use a Censoring Column` option is selected, specify a `Censoring Column`[12] and the value of this column that should be the `Censored Indicator Value` [13].
1. Select/tick to `Censor times at or above a value` [14]. 
1. If the ``Censor times at or above a value` option is selected, specify a `Censoring Thresholdd Value`[15] above which events are considered censored.
1. Select/tick to `Use a Grouping Column` [16]. 
1. If the `Use a Grouping Column` option is selected, specify a `Grouping Column`[17]. This column should be categorical, either textual or numerical.
1. Specify the `Confidence Level` (%) [18] for Confidence Intervals and the desired `Confidence Interval Type` [19].
1. Optionally select/tick to calculate and present the `Hazard Function Plot` [20] and the `Cumulative Probability of Failure Plot` [21].
1. Click on the `Execute` button [22] to perform the Kaplan-Meier Estimator. 
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_configuration.png" alt="KaplanMeier-configuration" width="600" height="600" class="img-responsive">
</div>

##### Output
{: .no_toc }
The tables summarizing the survival analysis results for the non grouped dataset and each grouping level are shown in the output spreadsheet.
In addition, a pop-up window displays the Kaplan–Meier survival curve and, if selected, the hazard function and cumulative probability of failure plots.
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_output.png" alt="KaplanMeier-output" width="800" height="600" class="img-responsive">
</div>
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_chart.png" alt="KaplanMeier-chart" width="800" height="600" class="img-responsive">
</div>

---

---

### Survival Curve Comparison Tests
Survival curve comparison tests are non-parametric statistical procedures used to assess whether two or more groups share the same underlying hazard function over time. These tests are based on weighted comparisons between the observed number of events in each group and the number expected under the null hypothesis of equal hazard rates.

The general null hypothesis tested is

<div style="text-align: center;"> $$ H_0: h_1(t) = h_2(t) = \cdots = h_K(t), \quad \text{for all } t $$ </div>

against the alternative that at least one group differs at some point in time.

These methods operate on the ordered distinct event times in the pooled sample. At each event time $$t_i$$, the following quantities are defined:
1. $$d_{ij}$$: number of events in group j at time $$t_i$$.
1. $$Y_{ij}$$: number of individuals at risk in group j just prior to $$t_i$$.
1. $$d_i = \sum_{j=1}^Kd_{ij}$$: total number of events at time $$t_i$$.
1. $$Y_i = \sum_{j=1}^KY_{ij}$$: total number at risk at time $$t_i$$.

Observations may contribute with frequency weights if a frequency column is provided. Censoring is handled in the same manner as in other non-parametric methods: censored observations contribute to the risk set up to their censoring time and are removed thereafter.

#### Test Statistic
{: .no_toc }
All available tests belong to the class of weighted log-rank tests. For each group j, a test statistic is constructed as

<div style="text-align: center;"> $$ Z_j = \sum_{t_i} W(t_i) \left( d_{ij} - Y_{ij} \frac{d_i}{Y_i} \right) $$ </div>
where:

1. $$W(t_i)$$ is a non-negative weight function
1. $$d_{ij}$$ the observed number of events
1. $$Y_{ij} \frac{d_i}{Y_i}$$ is the expected number of events under $$H_0$$. 

Thus, each test compares the observed and expected number of events at each time point, with differences weighted according to $$W(t_i)$$

#### Variance and Covariance
{: .no_toc }
The variance of the statistic for group j is estimated as

<div style="text-align: center;"> $$ \widehat{\text{Var}}(Z_j) = \sum_{t_i} W(t_i)^2 \cdot \frac{Y_{ij}}{Y_i} \left(1 - \frac{Y_{ij}}{Y_i} \right) \cdot \frac{Y_i - d_i}{Y_i - 1} \cdot d_i $$ </div>

and the covariance between groups j and g is

<div style="text-align: center;"> $$ \widehat{\text{Cov}}(Z_j, Z_g) = - \sum_{t_i} W(t_i)^2 \cdot \frac{Y_{ij}}{Y_i} \cdot \frac{Y_{ig}}{Y_i} \cdot \frac{Y_i - d_i}{Y_i - 1} \cdot d_i, \quad j \neq g $$ </div>

These expressions account for ties through the factor $$\frac{Y_i-d_i}{Y_i-1}$$.


#### Overall Test Statistic
{: .no_toc }
Since the group-specific statistics are linearly dependent, the overall test is based on K−1 independent components. The test statistic is

<div style="text-align: center;"> $$ \chi^2 = Z^\top \Sigma^{-1} Z $$ </div>

which asymptotically follows a chi-square distribution with K−1 degrees of freedom.

#### Weight Functions and Available Tests
The different tests arise from different choices of the weight function $$W(t_i)$$, which determine how deviations between observed and expected events are emphasized over time.

##### Log-Rank Test
<div style="text-align: center;"> $$ W(t_i) = 1 $$ </div>

The log-rank test assigns equal weight to all event times. It is most powerful when the hazard functions of the groups are proportional over time and differences are consistent throughout the study period.

##### Log-Rank Test
<div style="text-align: center;"> $$ W(t_i) = 1 $$ </div>

The log-rank test assigns equal weight to all event times. It is most powerful when the hazard functions of the groups are proportional over time and differences are consistent throughout the study period.

##### Wilcoxon (Breslow) Test
<div style="text-align: center;"> $$ W(t_i) = Y_i $$ </div>

This test gives more weight to early event times, where the number at risk is largest. As a result, it is more sensitive to differences that occur early in time.

##### Peto–Peto Test
The Peto–Peto test uses a modified estimate of the pooled survival function

<div style="text-align: center;"> $$ \tilde{S}(t_i) = \prod_{t_\ell \leq t_i} \left(1 - \frac{d_\ell}{Y_\ell + 1} \right) $$ </div>

and defines the weight function as

<div style="text-align: center;"> $$ W(t_i) = \tilde{S}(t_i) $$ </div>

This approach retains the early-time emphasis of the Wilcoxon test but adjusts for censoring, making it more robust when censoring patterns differ between groups.

##### Tarone–Ware Test
<div style="text-align: center;"> $$ W(t_i) = \sqrt{Y_i} $$ </div>

The Tarone–Ware test provides an intermediate weighting scheme between the log-rank and Wilcoxon tests. It balances sensitivity across early and later time points, giving moderate emphasis to the middle range of the follow-up period.

##### Fleming–Harrington Test
The Fleming–Harrington class of tests uses a flexible weight function based on the pooled Kaplan–Meier survival estimate $$\hat{S}(t)$$

<div style="text-align: center;"> $$ W_{p,q}(t_i) = \hat{S}(t_{i-1})^p \left(1 - \hat{S}(t_{i-1}) \right)^q, \quad p \ge 0,\ q \ge 0 $$ </div>

The parameters p and q control the emphasis:
1. $$p>0$$ increases sensitivity to early differences
1. $$q>0$$ increases sensitivity to late differences
1. $$(p,q)=(0,0)$$ reduces to the log-rank test

This class provides a flexible framework for targeting specific types of departures from the null hypothesis.

All tests assess whether the observed number of events in each group deviates significantly from what would be expected under equal hazard rates. The choice of weight function determines the sensitivity of the test to differences occurring at different parts of the time axis:
1. Early differences → Wilcoxon, Peto–Peto, Fleming–Harrington with p>0
1. Late differences → Fleming–Harrington with q>0
1. Consistent differences → Log-rank
1. Balanced sensitivity → Tarone–Ware

Use the Survival Curve Comparison Tests by browsing in the top ribbon: 


| `Statistics` $$\rightarrow$$ `Survival Analysis` $$\rightarrow$$ `Non-Parametric` $$\rightarrow$$ `Survival Curve Comparison Tests` |

#### Input
{: .no_toc }
The Survival Curve Comparison Tests require at least two columns, one of numerical data and one with categorical data to be specified in the input datasheet. The required input is a time variable column containing non-negative numerical values, representing the observed time-to-event or time-to-censoring for each subject and a grouping column indicating the group membership of each observation. In addition to the time variable, several optional inputs may be provided to extend the functionality of the analysis. A censoring column may be specified as a categorical variable, either numerical or textual, indicating whether each observation corresponds to an event or a censored case. A frequency column may also be included, consisting of non-negative numerical values that represent the number of identical observations associated with each row; if this column is not provided, each row is treated as a single observation by default. Furthermore, an event mode column may be defined, which can be either numerical or textual, and is used to distinguish between different types of events depending on the analysis configuration. All input columns must be of consistent type and should not contain invalid or missing values, as this may prevent the method from executing correctly.

#### Configuration
{: .no_toc }

| **Time Column** | Select the column corresponding to the observed time-to-event or time-to-censoring for each subject. This column must be numerical and contain non-negative values. |
|**Configure Event Mode Options**| Use this button to open the `Configure Event Mode Options` window |
|**Event Mode Column**| Within the `Configure Event Mode Options` window, specify the column containing event mode information. |
|**Levels not Considered as Event/Levels Considered as Event**| Manually select which levels should be treated as events from the available levels of the Event Mode Column. Use the arrow buttons to move levels between the two lists. Single-arrow buttons move selected levels, while double-arrow buttons move all levels. At least one level must be selected as an event. |
|**Clear Event Mode Options**| Use this button to clear all selections related to event mode configuration. |
| **Use a Frequency Column** | Enable this option to include a frequency column in the analysis. |
| **Frequency Column** |  If the `Use a Frequency Column` option is enabled, select the column containing frequency information for each observation. This column must be numerical and contain non-negative values. |
| **Use a Censoring  Column** | Enable this option to include a censoring column in the analysis. |
| **Censoring Column** |  If the `Use a Censoring Column` option is enabled, select the column containing censoring information for each observation. This column must be categorical and may be either numerical or textual. |
| **Censoring Indicator Value** | If a censoring column is used, specify which of its two levels represents a censored observation. |
| **Censor times at or above a value** | Enable this option to treat all time values greater than or equal to a specified threshold as censored. |
| **Censoring Threshold Value** | If the `Censor times at or above a value` option is enabled, specify the value above or equal to which observations will be treated as censored. |
| **Grouping Column** |  Select the column containing grouping information for each observation. This column must be categorical. At least two distinct groups are required to perform the comparison tests.|
| **Log-Rank Test** | Enable this option to calculate the Log-Rank test |
| **Wilcoxon Test** | Enable this option to calculate the Wilcoxon test |
| **Peto-Peto Test** | Enable this option to calculate the Peto-Peto test. |
| **Tarone-Ware Test** | Enable this option to calculate the Tarone-Ware test |
| **Fleming-Harrington Test** | Enable this option to calculate the Fleming-Harrington test. |
| **Fleming-Harrington Parameters** | If the `Fleming-Harrington Test` option is enabled, specify the values for the two parameters (p, q) of the test. |


#### Output
{: .no_toc }
The output spreadsheet contains a table summarizing the non-parametric comparison tests that were selected. For each selected test this included the name of the test, the test statistic, the degrees of freedom and the calculated p-value of the test.


#### Example
{: .no_toc }

##### Input
{: .no_toc }
In the input datasheet the requirement is to specify at least one numerical column and insert the appropriate data, as shown below.
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_input.png" alt="KaplanMeier-input" width="800" height="600" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select  `Statistics` → `Survival Analysis` → `Non-Parametric` → `Kaplan-Meier Estimator`.
1. Select the `Time Column`[1]. This column should contain non-negative numeric values.
1. Optionally click on the `Configure Event Mode Options` [2] button to select an `Event Mode Column` [3] and use the arrow buttons [4] to select the levels that should be accounted for in the analysis by moving them between the `LEvels not Considered as Event`[5] and `Levels Considered as Event`[6] lists. `Save` or `Cancel` any changes made using the appropriate buttons [7].
1. Once you have configured some Event Mode Options you can optionally use the `Clear Event Mode Options` [8] button to erase any selections made.
1. Select/tick to `Use a Frequency Column` [9]. 
1. If the `Use a Frequency Column` option is selected, specify a `Frequency Column`[10]. This column should contain non-negative numeric values.
1. Select/tick to `Use a Censoring Column` [11]. 
1. If the `Use a Censoring Column` option is selected, specify a `Censoring Column`[12] and the value of this column that should be the `Censored Indicator Value` [13].
1. Select/tick to `Censor times at or above a value` [14]. 
1. If the ``Censor times at or above a value` option is selected, specify a `Censoring Thresholdd Value`[15] above which events are considered censored.
1. Select/tick to `Use a Grouping Column` [16]. 
1. If the `Use a Grouping Column` option is selected, specify a `Grouping Column`[17]. This column should be categorical, either textual or numerical.
1. Specify the `Confidence Level` (%) [18] for Confidence Intervals and the desired `Confidence Interval Type` [19].
1. Optionally select/tick to calculate and present the `Hazard Function Plot` [20] and the `Cumulative Probability of Failure Plot` [21].
1. Click on the `Execute` button [22] to perform the Kaplan-Meier Estimator. 
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_configuration.png" alt="KaplanMeier-configuration" width="600" height="600" class="img-responsive">
</div>

##### Output
{: .no_toc }
The tables summarizing the survival analysis results for the non grouped dataset and each grouping level are shown in the output spreadsheet.
In addition, a pop-up window displays the Kaplan–Meier survival curve and, if selected, the hazard function and cumulative probability of failure plots.
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_output.png" alt="KaplanMeier-output" width="800" height="600" class="img-responsive">
</div>
<div style="text-align: center;">
<img src="images/SurvivalAnalysis/KaplanMeier_chart.png" alt="KaplanMeier-chart" width="800" height="600" class="img-responsive">
</div>

---

## Semi-Parametric Methods
Semi-parametric methods in survival analysis combine elements of both parametric and non-parametric approaches. They avoid making strict assumptions about the baseline distribution of survival times, while still incorporating a structured model to assess the effect of covariates on the hazard function. This balance provides flexibility alongside inferential power, making these methods central to modern survival analysis.

The most prominent semi-parametric framework is the Cox Proportional Hazards Model, which models the hazard function as a product of an unspecified baseline hazard and a parametric component driven by covariates. This allows estimation of relative risk effects without requiring explicit specification of the underlying time-to-event distribution.

Two key variants of this method are included:

1. Fixed Covariates Model: Assumes that covariates remain constant over time for each subject. The model evaluates how these baseline characteristics proportionally affect the hazard.
1. Time-Varying Covariates Model: Allows covariates to change over time, enabling more realistic modeling of dynamic systems where subject characteristics evolve during the observation period.

Semi-parametric methods are primarily used to:

1. Estimate the effect of covariates on the hazard function without specifying the baseline hazard
1. Handle censored data naturally within the partial likelihood framework
1. Model relative risks through hazard ratios, enabling interpretation of covariate impact
1. Incorporate both static and time-dependent covariates for more flexible modeling
1. Provide a bridge between exploratory non-parametric methods and fully specified parametric models

These methods are typically applied after initial exploratory analysis, offering a robust and interpretable way to quantify relationships between predictors and survival outcomes without imposing restrictive distributional assumptions.

An important aspect of model specification in Cox regression is the handling of tied event times and the choice of variance–covariance estimation method.

When multiple events occur at the same observed time, a tie-handling method must be specified. Common approaches include the Breslow and Efron methods. The Breslow method provides a simpler approximation and is computationally efficient, but may be less accurate when there are many tied events. The Efron method offers a more refined approximation by accounting for the ordering of tied events within a risk set and generally provides better accuracy in moderate to large samples. However, it requires that frequency values (if used) are integers, as it relies on discrete event counts.

The variance–covariance type determines how uncertainty in the estimated coefficients is quantified. The model-based (naïve) variance estimator assumes that the model is correctly specified and that observations are independent, providing efficient estimates under these assumptions. In contrast, the robust (sandwich) variance estimator relaxes these assumptions and provides standard errors that are consistent even in the presence of model misspecification or correlated observations (e.g., clustered or repeated measures data). When the robust estimator is used, certain likelihood-based inference procedures—such as likelihood ratio tests and related ANOVA components—are not valid and therefore cannot be estimated, while Wald and robust score tests remain applicable.

### Cox Proportional Hazards with Fixed Covariates
The Cox Proportional Hazards Model with fixed covariates is a semi-parametric survival regression method used to evaluate how predictor variables affect the risk of an event occurring over time. The model does not require a specific distribution for survival times. Instead, it estimates covariate effects through the partial likelihood while leaving the baseline hazard function unspecified.

In this model, each subject has one fixed set of predictor values throughout the observation period. These predictors may include continuous covariates, categorical factors, interaction terms, or custom formula terms. The model estimates regression coefficients that describe how each predictor changes the hazard relative to a baseline risk.

The hazard function is modeled as:
<div style="text-align: center;"> $$ h(t|x) = h_0(t) exp (x^T \beta) $$ </div>
where $$h_0(t)$$ is the unspecified baseline hazard, x is the vector of fixed covariates, and $$\beta$$ is the vector of estimated coefficients.

This method supports:

1. Right-censored survival data
1. Optional frequency weights
1. Optional event-mode filtering
1. Optional administrative censoring at a specified censoring value
1. Optional entry times for delayed entry / left truncation
1. Optional stratification of the baseline hazard
1. Continuous covariates and categorical factors
1. Custom model formulas, main-effects models, and full factorial models
1. Model-based or robust variance estimation
1. Cluster-adjusted robust standard errors
1. Multiple tie-handling methods, including Breslow
1. Predicted survival curves for user-specified covariate patterns

The model output includes coefficient estimates, standard errors, confidence intervals, Wald statistics, degrees of freedom, and p-values for each fitted parameter. Coefficients are usually interpreted through hazard ratios, where positive coefficients increase the hazard and negative coefficients decrease the hazard.

The method also provides model-level summaries, including the partial log-likelihood, pseudo $$R_2$$, AIC, AICc, BIC, and CAIC. Goodness-of-fit tests may include Wald, likelihood ratio, and score tests when model-based variance estimation is used. When robust variance estimation is selected, Wald and robust score tests are reported.

Stratification may be used when different groups are expected to have different baseline hazard functions but the same covariate effects. In that case, the baseline cumulative hazard is estimated separately for each stratum, while the regression coefficients remain common across strata.

This model is useful when the primary goal is to quantify the association between predictors and survival outcomes while avoiding strong assumptions about the shape of the underlying survival distribution.

Use the Cox Proportional Hazards Model with Fixed Covariates by browsing in the top ribbon: 

| `Statistics` $$\rightarrow$$ `Survival Analysis` $$\rightarrow$$ `Semi-Parametric` $$\rightarrow$$ `Cox Proportional Hazards Model with Fixed Covariates` |

#### Input
{: .no_toc }
The Cox Proportional Hazards Model with Fixed Covariates requires at least two columns to be specified in the input datasheet: one numerical time column and at least one predictor variable. The time column must contain non-negative numerical values representing the observed time-to-event or time-to-censoring for each subject. Predictor variables may be specified either as categorical factors or numerical covariates and are used to model their effect on the hazard of the event occurring.

In addition to the time variable and predictor variables, several optional inputs may be provided to extend the analysis. A censoring column may be specified as a  numerical or textual variable indicating whether each observation corresponds to an event or a censored case. A frequency column may be included, consisting of non-negative numerical values that represent the number of identical observations associated with each row; if this column is not provided, each row is treated as a single observation by default. An event mode column may also be defined, using numerical or textual values to distinguish between different event types and determine which observations should be included in the analysis. An entry time column may be provided to account for delayed entry or left-truncated observations, where subjects enter the risk set after time zero.

The method may also include a stratification column, which defines groups with separate baseline hazard functions while keeping the same covariate effects across strata. If robust variance estimation is selected, a cluster ID column may be specified to compute cluster-adjusted standard errors.

Categorical factors may require reference levels, while numerical covariates are entered directly into the model. The selected predictors may be combined using a custom model formula, main-effects model, or full factorial model. All input columns must be of consistent type and should not contain invalid or missing values, as this may prevent the method from executing correctly.

#### Configuration
{: .no_toc }

| **Time Column** | Select the column corresponding to the observed time-to-event or time-to-censoring for each subject. This column must be numerical and contain non-negative values. |
|**Configure Response Options**| Use this button to open the `Configure Response Options` window to configure Event Mode, Frequency, Censoring and Entry Time Options [More on Response Options](https://www.docs/survival-analysis.html#configure-response-options)|
| **Clear Response Options** | Use this button to clear all selections related to the response configuration. |
| **Stratify baseline hazard by a column** | Enable this option to allow different baseline hazard functions across groups defined by a stratification column, while keeping the same covariate effects across all strata. |
| **Stratification Column** |  Select the categorical column used to define strata. Each level will have its own baseline hazard function. This option is only available when stratification is enabled. |
| **Confidence Level (%)** | Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. Default value is set to 95. |
| **Confidence Interval Type** | Select the type of confidence interval to compute. Available options include: `Two-sided`, `Lower Bound`, `Upper Bound`. |
| **Tie Handling Method** | Specify the method used to handle tied event times. Available options include methods such as Breslow and Efron. The Efron method can only be used when frequency values are integers, as it relies on discrete event counts.  |
| **Variance/Covariance Type** | Select the method used to estimate the variance-covariance matrix of the coefficients. Options include Model-based and Robust. The robust option provides sandwich (cluster-adjusted) standard errors that are less sensitive to model misspecification.  |
| **Cluster ID Column** | Select the column identifying clusters of observations. This option is optional and is only available when the robust variance option is selected. It is used to compute cluster-adjusted standard errors.  |
| **Max Iterations** |  Specify the maximum number of iterations allowed for the optimization algorithm (Newton-Raphson). Higher values may be required for complex models but will increase computation time. Default value is set to 25. |
| **Minimum Change in Estimates** | Define the convergence threshold for the optimization algorithm. The algorithm stops when the change in parameter estimates between iterations falls below this value. Default value is set to 1e-6.  |
| **Factors/ Covariates / exclude columns** | Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one covariate column should be specified. |
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Formula Type**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. |
|**Specify Custom Model Formula**| Specify the model formula used for the analysis if the Custom option is selected. The formula is created in the Custom Formula Creation dialog window by selecting factors and covariates and adding interaction terms up to the required order. Main effects of the included columns are always part of the model and cannot be excluded. |
|**Use default prefictor variable values for plots**| When enabled, predicted survival curves are generated using default values for predictors. These defaults are the reference levels for categorical factors and the midpoints of the observed ranges for numerical covariates.|
|**Specify Predictor Variable Values for the plot**| Define custom values for predictors to generate predicted survival curves. The user may specify up to 10 different sets of predictor values, and a separate survival curve will be produced for each set. |



#### Output
{: .no_toc }
The output of the Cox Proportional Hazards Model with Fixed Covariates is presented in a structured spreadsheet containing multiple tables that summarize the fitted model, statistical inference, and overall model performance.

The main output includes a Parameter Estimates table, which reports the estimated regression coefficients for each covariate, along with their corresponding standard errors, confidence interval bounds at the selected confidence level, test statistics, degrees of freedom, and p-values. 

A Goodness-of-Fit table is also provided, summarizing key model diagnostics including the partial log-likelihood, pseudo $$R^2$$, Akaike Information Criterion (AIC), finite-sample corrected AIC (AICc), Bayesian Information Criterion (BIC), and Consistent AIC (CAIC). These measures allow for assessment of model fit and comparison between competing models.

In addition, a Goodness-of-Fit Tests table is included, presenting global hypothesis tests for the model. When model-based variance estimation is selected, this table includes Wald, likelihood ratio, and score tests, each with their associated degrees of freedom, test statistics, and p-values. If the robust variance estimator is selected, the likelihood ratio test cannot be estimated.

An ANOVA table is also generated, providing term-wise inference for each predictor (and interaction terms, if specified). This table includes Wald, likelihood ratio, and score test statistics and p-values for each model term when model-based variance estimation is used. If the robust variance estimator is selected, the likelihood ratio and score ANOVA tests cannot be estimated, and only Wald-based results are reported.

In addition to the tabular output, a pop-up window displays the predicted survival probability curves based on the fitted model. These curves are computed using the estimated coefficients and the baseline cumulative hazard function. Confidence interval bounds are displayed according to the selected confidence interval type. When multiple sets of predictor values are specified, a separate survival curve (with confidence bounds) is plotted for each set, allowing direct comparison of survival profiles under different covariate configurations.



#### Example
{: .no_toc }

##### Input
{: .no_toc }

##### Configuration
{: .no_toc }

##### Output
{: .no_toc }

---

### Cox Proportional Hazards with Time-Varying Covariates
The Cox Proportional Hazards Model with Time-Varying Covariates is a semi-parametric survival regression method used when predictor values may change over the observation period. Instead of representing each subject with a single row, the data are organized into intervals, where each row describes the covariate values that apply during a specific time interval.

The model does not assume a specific distribution for survival times. It estimates covariate effects through the Cox partial likelihood while leaving the baseline hazard function unspecified. The hazard function is modeled as:
The hazard function is modeled as:
<div style="text-align: center;"> $$ h(t|x) = h_0(t) exp (x(t)^T \beta) $$ </div>
where $$h_0(t)$$ is the unspecified baseline hazard, $$x(t)$$ is the vector of covariates at time t, and $$\beta$$ is the vector of estimated coefficients.

This method supports:

1. Start–stop interval survival data
1. Time-dependent covariates
1. Right-censored observations
1. Optional subject ID validation
1. Optional frequency weights
1. Optional event-mode filtering
1. Optional stratification of the baseline hazard
1. Continuous covariates and categorical factors
1. Custom model formulas, main-effects models, and full factorial models
1. Model-based or robust variance estimation
1. Optional cluster-adjusted robust standard errors
1. Multiple tie-handling methods
1. Predicted survival curves for user-specified covariate profiles

Each subject may contribute multiple rows, provided that their time intervals do not overlap. If a subject ID column is specified, the method checks that each subject has non-overlapping intervals, no more than one event, and that any event occurs only in the subject’s final interval.

Use the Cox Proportional Hazards Model with Time-Varying Covariates by browsing in the top ribbon: 

| `Statistics` $$\rightarrow$$ `Survival Analysis` $$\rightarrow$$ `Semi-Parametric` $$\rightarrow$$ `Cox Proportional Hazards Model with Time-Varying Covariates` |

#### Input
{: .no_toc }


#### Configuration
{: .no_toc }

| **Interval Start (Lower Bound)** | Select the numerical column containing the lower bound of each observation interval. Values must be non-negative. |
| **Interval End (Upper Bound)** | Select the numerical column containing the upper bound of each observation interval. Values must be non-negative and should define the end of the interval over which the row’s covariate values apply. |
|**Configure Response Options**| Use this button to open the `Configure Response Options` window to configure Event Mode, Frequency, Censoring and Subject ID Options [More on Response Options](https://www.docs/survival-analysis.html#configure-response-options)|
| **Clear Response Options** | Use this button to clear all selections related to the response configuration. |
| **Stratify baseline hazard by a column** | Enable this option to allow different baseline hazard functions across groups defined by a stratification column, while keeping the same covariate effects across all strata. |
| **Stratification Column** |  Select the categorical column used to define strata. Each level will have its own baseline hazard function. This option is only available when stratification is enabled. |
| **Confidence Level (%)** | Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. Default value is set to 95. |
| **Confidence Interval Type** | Select the type of confidence interval to compute. Available options include: `Two-sided`, `Lower Bound`, `Upper Bound`. |
| **Tie Handling Method** | Specify the method used to handle tied event times. Available options include methods such as Breslow and Efron. The Efron method can only be used when frequency values are integers, as it relies on discrete event counts.  |
| **Variance/Covariance Type** | Select the method used to estimate the variance-covariance matrix of the coefficients. Options include Model-based and Robust. The robust option provides sandwich (cluster-adjusted) standard errors that are less sensitive to model misspecification.  |
| **Cluster ID Column** | Select the column identifying clusters of observations. This option is optional and is only available when the robust variance option is selected. It is used to compute cluster-adjusted standard errors.  |
| **Max Iterations** |  Specify the maximum number of iterations allowed for the optimization algorithm (Newton-Raphson). Higher values may be required for complex models but will increase computation time. Default value is set to 25. |
| **Minimum Change in Estimates** | Define the convergence threshold for the optimization algorithm. The algorithm stops when the change in parameter estimates between iterations falls below this value. Default value is set to 1e-6.  |
| **Factors/ Covariates / exclude columns** | Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one covariate column should be specified. |
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Formula Type**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. |
|**Specify Custom Model Formula**| Specify the model formula used for the analysis if the Custom option is selected. The formula is created in the Custom Formula Creation dialog window by selecting factors and covariates and adding interaction terms up to the required order. Main effects of the included columns are always part of the model and cannot be excluded. |
|**Use default prefictor variable values for plots**| When enabled, predicted survival curves are generated using default values for predictors. These defaults are the reference levels for categorical factors and the midpoints of the observed ranges for numerical covariates.|
|**Specify Predictor Variable Values for the plot**| Define custom values for predictors to generate predicted survival curves. The user may specify up to 10 different sets of predictor values, and a separate survival curve will be produced for each set. |



#### Output
{: .no_toc }
The output of the Cox Proportional Hazards Model with Time-Varying Covariates is presented in a structured spreadsheet containing multiple tables that summarize the fitted model, statistical inference, and overall model performance.

The main output includes a Parameter Estimates table, which reports the estimated regression coefficients for each covariate, along with their corresponding standard errors, confidence interval bounds at the selected confidence level, test statistics, degrees of freedom, and p-values. 

A Goodness-of-Fit table is also provided, summarizing key model diagnostics including the partial log-likelihood, pseudo $$R^2$$, Akaike Information Criterion (AIC), finite-sample corrected AIC (AICc), Bayesian Information Criterion (BIC), and Consistent AIC (CAIC). These measures allow for assessment of model fit and comparison between competing models.

In addition, a Goodness-of-Fit Tests table is included, presenting global hypothesis tests for the model. When model-based variance estimation is selected, this table includes Wald, likelihood ratio, and score tests, each with their associated degrees of freedom, test statistics, and p-values. If the robust variance estimator is selected, the likelihood ratio test cannot be estimated.

An ANOVA table is also generated, providing term-wise inference for each predictor (and interaction terms, if specified). This table includes Wald, likelihood ratio, and score test statistics and p-values for each model term when model-based variance estimation is used. If the robust variance estimator is selected, the likelihood ratio and score ANOVA tests cannot be estimated, and only Wald-based results are reported.

In addition to the tabular output, a pop-up window displays the predicted survival probability curves based on the fitted model. These curves are computed using the estimated coefficients and the baseline cumulative hazard function. Confidence interval bounds are displayed according to the selected confidence interval type. When multiple sets of predictor values are specified, a separate survival curve (with confidence bounds) is plotted for each set, allowing direct comparison of survival profiles under different covariate configurations.



#### Example
{: .no_toc }

##### Input
{: .no_toc }

##### Configuration
{: .no_toc }

##### Output
{: .no_toc }

---

### Configure Response Options
The Response Options dialog window allows the user to configure optional information related to how survival outcomes are interpreted and processed before fitting the Cox model. These options extend the basic time input by defining event types, censoring behavior, frequency weights, and model-specific time structure.

There are two variants of this dialog window: one for the fixed covariates model and one for the time-varying covariates model.

1. For the Cox model with fixed covariates, the dialog includes Event Mode Options, Entry Time Options, Frequency Options, and Censoring Options. The entry time option allows the user to specify delayed entry or left truncation, where subjects enter the risk set after time zero. The censoring options also allow the user to censor observations at or above a specified threshold value.

1. For the Cox model with time-varying covariates, the dialog includes Event Mode Options, Subject Options, Frequency Options, and Censoring Options. The subject option allows the user to specify a subject ID column, which is used to identify repeated intervals belonging to the same subject. When provided, the method checks that intervals for each subject do not overlap, that each subject has no more than one event, and that any event occurs only in the final interval for that subject.

The Event Mode Options section allows the user to specify an event mode column when the dataset contains different types of events. The levels of this column can be moved between the “Levels not Considered as Event” and “Levels Considered as Event” lists. Only observations with selected event levels are included as events according to the analysis configuration.

The Frequency Options section allows the user to specify a frequency column containing non-negative numerical values. This column represents the number of identical observations associated with each row. If no frequency column is selected, each row is treated as one observation.

The Censoring Options section allows the user to specify a censoring column and the value that identifies censored observations. The censoring column may be numerical or textual. In the fixed covariates variant, the user may also choose to censor times at or above a specified threshold value.

These options are optional. If they are not configured, the model assumes that all rows represent single observations, all included rows correspond to the selected event structure, and no additional censoring, frequency weighting, entry-time adjustment, or subject-level validation is applied.

#### Dialog window components (Fixed Covariates Model)
{: .no_toc }

|**Use an Event Mode Column**| Enable this option to include an event  mode column in the analysis. |
|**Event Mode Column**|  If the `Use an Event Mode Column` option is enabled, specify the column containing event mode information. |
|**Levels not Considered as Event/Levels Considered as Event**| Manually select which levels should be treated as events from the available levels of the Event Mode Column. Use the arrow buttons to move levels between the two lists. Single-arrow buttons move selected levels, while double-arrow buttons move all levels. At least one level must be selected as an event. |
| **Use an Entry Time Column** | Enable this option to include an entry time column in the analysis. This is used only in the fixed covariates model to account for delayed entry (left truncation), where subjects enter the risk set after time zero. |
| **Entry Time Column** | If the `Use an Entry Time Column` option is enabled, select the column containing entry time values for each observation. This column must be numerical, contain non-negative values, and each entry time must be less than or equal to the corresponding event or censoring time. |
| **Use a Frequency Column** | Enable this option to include a frequency column in the analysis. |
| **Frequency Column** |  If the `Use a Frequency Column` option is enabled, select the column containing frequency information for each observation. This column must be numerical and contain non-negative values. |
| **Use a Censoring  Column** | Enable this option to include a censoring column in the analysis. |
| **Censoring Column** |  If the `Use a Censoring Column` option is enabled, select the column containing censoring information for each observation. This column must be categorical and may be either numerical or textual. |
| **Censoring Indicator Value** | If a censoring column is used, specify which of its two levels represents a censored observation. |
| **Censor times at or above a value** | Enable this option to treat all time values greater than or equal to a specified threshold as censored. |
| **Censoring Threshold Value** | If the `Censor times at or above a value` option is enabled, specify the value above or equal to which observations will be treated as censored. |

#### Dialog window components (Time-Varying Covariates Model)
{: .no_toc }

|**Use an Event Mode Column**| Enable this option to include an event  mode column in the analysis. |
|**Event Mode Column**|  If the `Use an Event Mode Column` option is enabled, specify the column containing event mode information. |
|**Levels not Considered as Event/Levels Considered as Event**| Manually select which levels should be treated as events from the available levels of the Event Mode Column. Use the arrow buttons to move levels between the two lists. Single-arrow buttons move selected levels, while double-arrow buttons move all levels. At least one level must be selected as an event. |
| **Use a Subject Column** | Enable this option to include a subject identifier column in the analysis. This option is used only in the time-varying covariates model to link multiple rows belonging to the same subject. |
| **Subject Column** | If the `Use a Subject Column` option is enabled, select the column identifying subjects. This column is used to validate that intervals for each subject do not overlap, that each subject has at most one event, and that any event occurs only in the subject’s final interval. |
| **Use a Frequency Column** | Enable this option to include a frequency column in the analysis. |
| **Frequency Column** |  If the `Use a Frequency Column` option is enabled, select the column containing frequency information for each observation. This column must be numerical and contain non-negative values. |
| **Use a Censoring  Column** | Enable this option to include a censoring column in the analysis. |
| **Censoring Column** |  If the `Use a Censoring Column` option is enabled, select the column containing censoring information for each observation. This column must be categorical and may be either numerical or textual. |
| **Censoring Indicator Value** | If a censoring column is used, specify which of its two levels represents a censored observation. |

---

## References {#references-survivalAnalysis}
1. Emmert-Streib, Frank, and Matthias Dehmer. "Introduction to survival analysis in practice." Machine Learning and Knowledge Extraction 1, no. 3 (2019): 1013-1038. [doi.org/10.3390/make1030058](https://doi.org/10.3390/make1030058).
1. Jenkins, Stephen P. "Survival analysis." Unpublished manuscript, Institute for Social and Economic Research, University of Essex, Colchester, UK 42, no. 54-56 (2005): 1.
1. Guo, Shenyang. Survival analysis. Oxford University Press, 2010.
1. Hosmer Jr, D.W., Lemeshow, S. and May, S., 2008. Applied survival analysis: regression modeling of time-to-event data. John Wiley & Sons. 
1. Turnbull, Bruce W. "The empirical distribution function with arbitrarily grouped, censored and truncated data." Journal of the Royal Statistical Society: Series B (Methodological) 38, no. 3 (1976): 290-295. [doi.org/10.1111/j.2517-6161.1976.tb01597.x]( https://doi.org/10.1111/j.2517-6161.1976.tb01597.x) 
1. Turnbull, Bruce W. "Nonparametric estimation of a survivorship function with doubly censored data." Journal of the American statistical association 69, no. 345 (1974): 169-173. [doi.org/10.1080/01621459.1974.10480146](https://doi.org/10.1080/01621459.1974.10480146)


---

## Version History
Introduced in Isalos Analytics Platform v2.0.3

_Instructions last updated on April 2026_
