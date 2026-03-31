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
The Kaplan–Meier estimator requires at least one column of numerical data to be specified in the input datasheet. The required input is a time variable column containing non-negative numerical values, representing the observed time-to-event or time-to-censoring for each subject. In addition to the time variable, several optional inputs may be provided to extend the functionality of the analysis. A censoring column may be specified as a binary variable, either numerical or textual, indicating whether each observation corresponds to an event or a censored case. A frequency column may also be included, consisting of non-negative numerical values that represent the number of identical observations associated with each row; if this column is not provided, each row is treated as a single observation by default. Furthermore, an event mode column may be defined, which can be either numerical or textual, and is used to distinguish between different types of events depending on the analysis configuration. Finally, a grouping column can be specidied as a categorical variable, either numerical or textual, indicating the group membership of each observation. All input columns must be of consistent type and should not contain invalid or missing values, as this may prevent the method from executing correctly.

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
| **Censoring Column** |  If the `Use a Censoring Column` option is enabled, select the column containing censoring information for each observation. This column must be binary (contain exactly two levels) and may be either numerical or textual. |
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
The output spreadsheet contains a table summarizing the survival analysis results at each observed time point. This includes the number of subjects at risk, the number of events, the estimated survival probability, its standard error, and the corresponding confidence interval bounds at the selected confidence level. If a grouping column is specified, the spreadsheet first presents the overall results for the full sample, followed by separate tables for each group.

In addition, a pop-up window displays the Kaplan–Meier survival curve, showing the stepwise estimate of survival probability over time along with the associated confidence interval bounds. When grouping is enabled, the plot includes the overall survival curve as well as separate curves with confidence bounds for each group. Similarly, if selected, the hazard function and cumulative probability of failure plots are generated and display both the overall estimates and the corresponding group-specific curves.

#### Example
{: .no_toc }

##### Input
{: .no_toc }

##### Configuration
{: .no_toc }

##### Output
{: .no_toc }

---

### Life Table Analysis
The Life Table method (also known as the Actuarial method) is a non-parametric approach used to estimate survival characteristics from time-to-event data by grouping observations into time intervals. Unlike the Kaplan–Meier estimator, which updates the survival estimate at each distinct event time, the Life Table method summarizes the data within predefined intervals and computes the relevant quantities at the interval level.

The time axis is partitioned into consecutive intervals of the form $$[0,e_0), [e_0,e_1), ... , [e_{k-1},e_k), [e_k,\inf)$$. These intervals may either be specified explicitly through user-defined endpoints or generated automatically using a given end time and interval width.

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
The Life Table method requires at least one column of numerical data to be specified in the input datasheet. The required input is a time variable column containing non-negative numerical values, representing the observed time-to-event or time-to-censoring for each subject. In addition to the time variable, several optional inputs may be provided to extend the functionality of the analysis. A censoring column may be specified as a binary variable, either numerical or textual, indicating whether each observation corresponds to an event or a censored case. A frequency column may also be included, consisting of non-negative numerical values that represent the number of identical observations associated with each row; if this column is not provided, each row is treated as a single observation by default. Furthermore, an event mode column may be defined, which can be either numerical or textual, and is used to distinguish between different types of events depending on the analysis configuration. A grouping column may also be specified as a categorical variable, either numerical or textual, indicating the group membership of each observation. An additional optional column may be provided to specify the endpoints of the intervals used in the analysis; if this is not specified, the intervals are generated automatically based on the chosen end time and interval width. All input columns must be of consistent type and should not contain invalid or missing values, as this may prevent the method from executing correctly.

#### Configuration
{: .no_toc }

| **Time Column** | Select the column corresponding to the observed time-to-event or time-to-censoring for each subject. This column must be numerical and contain non-negative values. |
|**Configure Event Mode Options**| Use this button to open the `Configure Event Mode Options` window |
|**Event Mode Column**| Within the `Configure Event Mode Options` window, specify the column containing event mode information. |
|**Levels not Considered as Event/Levels Considered as Event**| Manually select which levels should be treated as events from the available levels of the Event Mode Column. Use the arrow buttons to move levels between the two lists. Single-arrow buttons move selected levels, while double-arrow buttons move all levels. At least one level must be selected as an event. |
|**Clear Event Mode Options**| Use this button to clear all selections related to event mode configuration. |
|**Specify End Time and Time Steps / Use a column to specify end points**| SSelect whether to define the intervals automatically by specifying an end time and interval width, or to provide a column containing the endpoints of each interval. |
|**Intervals through / by**| Specify the end time and the width of each interval when automatic interval generation is selected. |
|**End Points Column**|  If the option to use a column is selected, choose the column containing the endpoints of the intervals. This column must be numerical and contain non-negative values. |
| **Use a Frequency Column** | Enable this option to include a frequency column in the analysis. |
| **Frequency Column** |  If the `Use a Frequency Column` option is enabled, select the column containing frequency information for each observation. This column must be numerical and contain non-negative values. |
| **Use a Censoring  Column** | Enable this option to include a censoring column in the analysis. |
| **Censoring Column** |  If the `Use a Censoring Column` option is enabled, select the column containing censoring information for each observation. This column must be binary (contain exactly two levels) and may be either numerical or textual. |
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

##### Configuration
{: .no_toc }

##### Output
{: .no_toc }

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
The Nelson-Aalen Method requires at least one column of numerical data to be specified in the input datasheet. The required input is a time variable column containing non-negative numerical values, representing the observed time-to-event or time-to-censoring for each subject. In addition to the time variable, several optional inputs may be provided to extend the functionality of the analysis. A censoring column may be specified as a binary variable, either numerical or textual, indicating whether each observation corresponds to an event or a censored case. A frequency column may also be included, consisting of non-negative numerical values that represent the number of identical observations associated with each row; if this column is not provided, each row is treated as a single observation by default. Furthermore, an event mode column may be defined, which can be either numerical or textual, and is used to distinguish between different types of events depending on the analysis configuration. Finally, a grouping column can be specidied as a categorical variable, either numerical or textual, indicating the group membership of each observation. All input columns must be of consistent type and should not contain invalid or missing values, as this may prevent the method from executing correctly.

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
| **Censoring Column** |  If the `Use a Censoring Column` option is enabled, select the column containing censoring information for each observation. This column must be binary (contain exactly two levels) and may be either numerical or textual. |
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

##### Configuration
{: .no_toc }

##### Output
{: .no_toc }

---


## References {#references-survivalAnalysis}
1. Emmert-Streib, Frank, and Matthias Dehmer. "Introduction to survival analysis in practice." Machine Learning and Knowledge Extraction 1, no. 3 (2019): 1013-1038. [doi.org/10.3390/make1030058](https://doi.org/10.3390/make1030058).
1. Jenkins, Stephen P. "Survival analysis." Unpublished manuscript, Institute for Social and Economic Research, University of Essex, Colchester, UK 42, no. 54-56 (2005): 1.
1. Guo, Shenyang. Survival analysis. Oxford University Press, 2010.
1. Hosmer Jr, D.W., Lemeshow, S. and May, S., 2008. Applied survival analysis: regression modeling of time-to-event data. John Wiley & Sons. 

---

## Version History
Introduced in Isalos Analytics Platform v2.0.3

_Instructions last updated on April 2026_
