---
layout: default
title: 6.8 Post DoE Analysis
parent: 6. DOE
nav_order: 8
permalink: /post-doe-analysis.html
description: "Analyse DoE results in Isalos with Pareto charts, main effects plots, and interaction plots and Multi-Objective Optimization."
---

# Post DoE Analysis
{: .no_toc }

Post DoE Analysis provides a comprehensive set of tools to evaluate and interpret experimental results obtained through Design of Experiments (DoE) methodologies. With this module, users can easily identify the most influential factors, explore the impact of individual variables, and study interactions between them and optimize responses based on one or multiple objectives. Available visualization options include:
1.	Pareto Chart for ranking and visualizing the relative importance of effects.
1.	Main Effects Plots show how changes in a single factor influence the response and test whether the relationship between the dependent variable and each factor is linear.
1.	Interaction Plots to illustrate how two factors jointly affect the outcome and test whether there is interaction between two factors.
1.	Combined Main Effects + Interaction Plots for a holistic view of factor influences.
1.  Desirability & Response Profiles to visualize how predicted responses and composite desirability change across factor ranges. These profiles support multi-objective optimization by revealing trade-offs between responses and highlighting factor settings that maximize overall desirability.

The tool supports both factorial/screening designs and response surface designs, making it adaptable to a wide variety of experimental setups.
For screening and factorial designs only, users may choose to include center points in the design. This does not mean the addition of extra experimental points in the design but rather that center points already included in the design will be handled differently. This is done by adding an extra 0/1 indicator variable, where a value of 1 identifies center points. Including this variable allows the algorithm to capture a portion of unexplained variability that is not accounted for by the main effects and interaction terms. This indicator is not included in the Pareto plots or in the main effect and interaction plots; it is only used internally to improve the explanation of variability. In contrast, for response surface designs, this option is not available, since the inclusion of curvature and quadratic terms already incorporates the information provided by center points.

---

## Pareto Analysis

Pareto Analysis is used to visualize the relative importance of model terms (main effects, quadratic terms and interactions) and to identify which factors have a statistically significant impact on the response. The construction of the plot depends on whether the error term in the model has available degrees of freedom.
1.	 Error with Degrees of Freedom 
In this case, a Pareto Plot of standardized effects is created. Each effect is divided by its estimated standard error to obtain a standardized effect size. The plot ranks these standardized effects in descending order of magnitude, making it easy to identify the most influential terms. A significance line is drawn to indicate the threshold value above which an effect is considered statistically significant, based on the Level of Significance specified by the user.

1.	Error with No Degrees of Freedom 
When no residual degrees of freedom are available, standard errors for the effects cannot be estimated directly. In this case, a Pareto Plot of raw effects is generated, showing the absolute effect size for each term. To assess significance, Lenth’s Pseudo Standard Error (PSE) is calculated and used together with a t-distribution, where the degrees of freedom are defined as the number of effects divided by three. The resulting threshold is then applied to determine significance, again using the Level of Significance specified by the user.

Use the `Pareto Analysis` tool by browsing in the top ribbon: 

|DOE $$\rightarrow$$ Post DoE Analysis $$\rightarrow$$ Pareto Analysis|

### Input
{: .no_toc}

All variables must be specified in the datasheet. The input to the algorithm consists of the results of a Design of Experiments (DoE) method, with the addition of the response calculated for each experimental run. The response variable must be strictly numerical. Experimental factors may be numerical or categorical. Categorical factors are permitted only when they contain exactly two levels. Additionally, categorical factors can only be included when the model does not contain quadratic terms. Each row corresponds to a single observation from the experiment. 

### Configuration
{: .no_toc}

|**Dependent Variable**| Select the column that corresponds to values of the dependent variable.|
|**Analysis Type**| Select the desired analysis type for the analysis. Available options include: Main Effects, Main Effects + Two-Factor, Main Effects + Two Factor + Three Factor, Main Effects + Quadratic, Main Effects + Two-Factor + Quadratic, Main Effects + Two Factor + Three Factor + Quadratic. For screening/factorial designs, it is recommended not to include quadratic terms, while for response surface designs, quadratic terms should typically be included. If there are categorical factors in the analysis then quadratic factors cannot be selected.|
|**Level Of Significance**| Specify the level of significance for the analysis. Values should range from 0 to 1 with the default value being 0.05. |
|**Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one factor column should be specified. |
|**DOE type**| Select whether you have performed a Factorial/Screening or a Response Surface Design. If categorical factors are selected the only acceptable option is Factorial/Screening. |
|**Include Center Points**| If you have performed a Factorial/Screening design, select whether to include center points in the analysis.|

### Output
{: .no_toc}
The output spreadsheet contains the same table of effects in descending order. In addition, a pop-up window displays the Pareto chart, where a significance line is shown based on the user-specified level of significance.


### Example
{: .no_toc}

#### Input
{: .no_toc}
In the input datasheet minimum requirement is to specify two columns, one factor and one dependent variable, as shown below.
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-pareto-input.png" alt="Pareto input" width="400" height="400" class="img-responsive">
</div> 

#### Configuration
{: .no_toc}

1.  Select `DOE` → `Post DoE Analysis` →`Pareto Analysis`.
1.  Select the `Dependent Variable`[1] from the list of available options. This column should only contain numerical values.
1.  Select the `Analysis Type` [2] from the list of available options : `Main Effects`, `Main Effects` + `Quadratic`, `Main Effects + Two Factor`, `Main Effects + Two Factor + Quadratic`, `Main Effects + Two Factor + Three Factor`, `Main Effects + Two Factor + Three Factor + Quadratic`
1.  Specify the `Level Of Significance`[3] used to calculate the significance threshold. Default value is 0.05.
1.  Select the columns by clicking on the arrow buttons [7] and moving columns between the `Excluded Columns` [4] , the `Factors` [5]  and `Covariates`[6] lists.
1.  Select whether the DoE[8] method used before this step was a `Factorial/Screening` or a `Response Surface` method.
1.  If the `Factorial/Screening` option is selected, select/tick to `Include Center Points`[9]. 
1.  Click on the `Execute` button [10] to perform Pareto Analysis
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-pareto-config.png" alt="Pareto config" width="400" height="400" class="img-responsive">
</div> 



#### Output
{: .no_toc}
The effects of each term in the model are presented in the output spreadsheet in descending order and the pareto chart is shown in a separate window.
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-pareto-output.png" alt="Pareto output" width="400" height="400" class="img-responsive">
</div> 

<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-pareto-chart.png" alt="Pareto chart" width="400" height="400" class="img-responsive">
</div> 

---

## Factorial Plot Analysis

The Main Effects and Interaction Plots differ in construction depending on the type of experimental design chosen: Screening/Factorial or Response Surface.
1.	Screening / Factorial Designs
    1. Main Effects Plots:
    For each factor, the response is evaluated at its two extreme levels (low and high) while all other factors are fixed at their center values. A line is drawn between these two fitted points to represent the main effect of that factor. The center point is also plotted to assess whether it aligns with the expected linear relationship.

    1. Interaction Plots:
    For a given interaction (e.g., Factor A × Factor B), two lines are constructed: One with Factor B set at its low level. Another with Factor B set at its high level. For each line, the response is fitted at Factor A = low and Factor A = high. The center point is also included to check consistency with the modeled trend.

1. Response Surface Designs

    1. Main Effects Plots:
    The fitted second-order model (including quadratic terms) is used to compute the response as each factor varies across its range. All other factors are fixed at their center values. This produces a smooth second-order curve showing the factor’s main effect on the response.
    
    1. Interaction Plots:
    For two interacting factors, the second-order model is again used. One factor is varied across its range, while the second factor is fixed at three different levels: low, center, and high. This results in three separate curves, allowing the user to visualize how the interaction modifies the relationship between the factors and the response.

When generating main effects and interaction plots, it is essential to use the Specify Factor Values option to correctly define the low and high levels of each factor. These values determine how the plots are constructed and must be chosen carefully. Some constraints apply:
1.	The specified low value cannot be less than the minimum observed value of the factor in the dataset.
1.	The specified high value cannot be greater than the maximum observed value of the factor in the dataset.
1.	Additionally, the low value must always be strictly less than the high value.

Use the `Factorial Plot Analysis` tool by browsing in the top ribbon: 

|DOE $$\rightarrow$$ Post DoE Analysis $$\rightarrow$$ Factorial Plot Analysis|

### Input
{: .no_toc}

All variables must be specified in the datasheet. The input to the algorithm consists of the results of a Design of Experiments (DoE) method, with the addition of the response calculated for each experimental run. The response variable must be strictly numerical. Experimental factors may be numerical or categorical. Categorical factors are permitted only when they contain exactly two levels. Additionally, categorical factors can only be included when the model does not contain quadratic terms. Each row corresponds to a single observation from the experiment. 

### Configuration
{: .no_toc}

|**Dependent Variable**| Select the column that corresponds to values of the dependent variable.|
|**Analysis Type**| Select the desired analysis type for the analysis. Available options include: Main Effects, Main Effects + Two-Factor, Main Effects + Two Factor + Three Factor, Main Effects + Quadratic, Main Effects + Two-Factor + Quadratic, Main Effects + Two Factor + Three Factor + Quadratic, Full Factorial. For screening/factorial designs, it is recommended not to include quadratic terms, while for response surface designs, quadratic terms should typically be included. If there are categorical factors in the analysis then quadratic factors cannot be selected.|
|**Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one factor column should be specified. |
|**Specify Factor Values**| Specify the low and high value for each factor to ensure the plots are generated correctly. By default, these values are initialized to the minimum and maximum observed values of each variable. |
|**DOE type**| Select whether you have performed a Factorial/Screening or a Response Surface Design. If categorical factors are selected the only acceptable option is Factorial/Screening. |
|**Include Center Points**| If you have performed a Factorial/Screening design, select whether to include center points in the analysis.|

### Output
{: .no_toc}
The output spreadsheet contains the fitted response values used to generate the curves. For each curve, 300 data points are provided, allowing precise plotting and replication of the results. A separate pop-up window is generated for each plot:
1.  Main Effects Plots: One plot is displayed per factor, showing the fitted response across the specified low and high values, with the center point included when available. The y axis is shared across all main effect plots. 
1.  Interaction Plots: One plot is displayed per estimable interaction. Each plot contains three fitted curves corresponding to the second factor of the interaction set at low, center, and high values. The spreadsheet includes the corresponding data points for each curve, as shown in the interaction plot output table.



### Example
{: .no_toc}

#### Input
{: .no_toc}
In the input datasheet minimum requirement is to specify two columns, one factor and one dependent variable, as shown below.
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-factorial-input.png" alt="Factorial input" width="400" height="400" class="img-responsive">
</div> 

#### Configuration
{: .no_toc}

1.  Select `DOE` → `Post DoE Analysis` →`Factorial Plot Analysis`.
1.  Select the `Dependent Variabl`[1] from the list of available options. This column should only contain numerical values.
1.  Select the `Analysis Type` [2] from the list of available options : `Main Effects`, `Main Effects` + `Quadratic`, `Main Effects + Two Factor`, `Main Effects + Two Factor + Quadratic`, `Main Effects + Two Factor + Three Factor`, `Main Effects + Two Factor + Three Factor + Quadratic`
1.  Select the columns by clicking on the arrow buttons [6] and moving columns between the `Excluded Columns` [3] , the `Factors` [4]  and `Covariates`[5] lists.
1.  Click on `Specify Factor Values`[7] to specify the `Min`[8] and `Max`[9] value for each numerical factor, the `Low level`[10] and `High level`[11] value for each categorical factor. Once they are specified click on `OK`[12].
1.  Select whether the DoE[13] method used before this step was a `Factorial/Screening` or a `Response Surface` method.
1.  If the `Factorial/Screening` option is selected, select/tick to `Include Center Points`[14]. 
1.  Click on the `Execute` button [15] to perform Factorial Plot Analysis
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-factorial-config.png" alt="Factorial Config" width="400" height="400" class="img-responsive">
</div> 



#### Output
{: .no_toc}
The data points for each produced plot are shown in the output spreadsheet and the main effect and interaction plots are shown in separate windows.
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-factorial-output.png" alt="Factorial output" width="650" height="400" class="img-responsive">
</div> 

<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-mainEffect-chart.png" alt="Factorial main effect chart" width="700" height="400" class="img-responsive">
</div> 

<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-interraction-chart.png" alt="Factorial interaction chart" width="900" height="700" class="img-responsive">
</div> 

---
## Multi-Objective Optimization

Multi-Objective Optimization is used to determine factor settings that simultaneously optimize multiple responses. When responses have competing goals (for example, maximizing yield while minimizing reaction time), the algorithm converts each response into a desirability function and combines them into a single composite desirability score. The optimal solution corresponds to the factor settings that maximize this composite desirability.

Isalos supports two optimization strategies:
1. Continuous optimization, where factor settings are searched across the modeled design space.
1. Discrete optimization, where optimization is restricted to the observed factor levels present in the dataset. This option ensures that recommended settings correspond to experimentally tested conditions and may be preferred when interpolation between levels is not desired.

Users may also constrain the optimization domain by specifying allowable ranges for each factor, and/or fixing factors to specific values to evaluate constrained operating conditions. To compute predictions used during optimization, users must select the model structure to be fitted. For screening and factorial designs, simpler models are typically preferred, while response surface designs generally require quadratic terms to capture curvature. 

For each response, users define an optimization objective:
1. Maximize — increases the response toward higher values.
1. Minimize — drives the response toward lower values.
1. Target — seeks a specified value while penalizing deviations.

Each response is transformed into an individual desirability value ranging from 0 (undesirable) to 1 (fully desirable). The shape and influence of each desirability function are controlled by two parameters:
1. Scale controls how quickly desirability changes as the response moves away from its goal. Higher scale values create a steeper penalty near limits or targets, while lower values produce a more gradual transition.
1. Importance defines the relative priority of each response in the composite desirability calculation. Responses with higher importance exert greater influence on the optimization result.

Together, these settings allow users to balance competing objectives and tailor the optimization to process priorities.

For each predicted response, the model provides both confidence intervals (CI) and prediction intervals (PI) to quantify uncertainty. A confidence interval describes the range within which the true mean response is expected to lie at the specified factor settings and confidence level (e.g., 95%). It reflects uncertainty in estimating the model’s mean prediction. In contrast, a prediction interval represents the range within which a future individual observation is expected to fall under the same conditions. Because prediction intervals account for both model uncertainty and inherent experimental variability, they are always wider than confidence intervals.

Use the `Multi-Objective Optimization` tool by browsing in the top ribbon: 

|DOE $$\rightarrow$$ Post DoE Analysis $$\rightarrow$$ Multi-Objective Optimization|

### Input
{: .no_toc}

All variables must be specified in the datasheet. The input to the algorithm consists of the results of a Design of Experiments (DoE) method, with the addition of the response variables calculated for each experimental run. Response variables must be strictly numerical. Experimental factors may be numerical or categorical. Categorical factors are permitted only when they contain exactly two levels. Additionally, categorical factors can only be included when the model does not contain quadratic terms.Each row corresponds to a single observation from the experiment. 

### Configuration
{: .no_toc}

|**Analysis Type**| Select the desired analysis type for the analysis. Available options include: Main Effects, Main Effects + Two-Factor, Main Effects + Two Factor + Three Factor, Main Effects + Quadratic, Main Effects + Two-Factor + Quadratic, Main Effects + Two Factor + Three Factor + Quadratic, Full Factorial. For screening/factorial designs, it is recommended not to include quadratic terms, while for response surface designs, quadratic terms should typically be included. If there are categorical factors in the analysis then quadratic factors cannot be selected.|
|**Confidence Level**| Specify the confidence level for the analysis. Values should range from 0 to 100 with the default value being 95 |
|**Factors/Dependent Variables/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to dependent variables through the dialog window: Use the buttons to move columns between the Factors and Dependent Variables list and Excluded Columns list.  At least one factor column and one Dependent Variable Column should be specified. |
|**Specify Factor Values**| Specify the low and high value for each factor to ensure the plots are generated correctly. By default, these values are initialized to the minimum and maximum observed values of each variable. Optionally specify constraints to fix factors to a specific value within the allowed range.|
|**Specify Dependent Variable Ranges**| Specify the minimum and maximum acceptable value for each dependent variable to correctly set objective goals and compute individual desirabilities. By default, these values are initialized to the minimum and maximum observed values of each variable.|
|**Dependent Variable Settings**|For each dependent variable added, specify the goal (Minimize/ Maximize/ Target), the target value if the Target option is selected, the scale and the importance of the dependent variable. The allowed range for scale is [0.01,10] and for importance it is [1,5].|
|**Optimize on the Discretized Space (Only factor values that appear in the dataset will be considered)**| Use this option to enable discretized optimization, to restrict the optimization to the observed factor levels present in the dataset. |

### Output
{: .no_toc}
The output spreadsheet reports the optimal factor settings identified by the optimization routine, along with the predicted values for each response at those settings. For each response, the table includes the predicted value, standard error, confidence intervals, and prediction intervals. Individual desirability values are shown for every response, together with the overall composite desirability score used to rank the solution.

In addition, a pop-up window displays the Desirability & Response Profiles, illustrating how composite desirability and each predicted response vary across the range of each factor while other factors are held constant. Vertical reference lines indicate the optimal factor settings, and horizontal reference lines denote the predicted response or desirability values at the optimum, enabling visual assessment of trade-offs and sensitivity.


### Example
{: .no_toc}

#### Input
{: .no_toc}
In the input datasheet minimum requirement is to specify two columns, one factor and one dependent variable, as shown below.
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-multiObjective-input.png" alt="Multi Objective Optimization input" width="600" height="400" class="img-responsive">
</div> 

#### Configuration
{: .no_toc}

1.  Select `DOE` → `Post DoE Analysis` →`Multi-Objective Optimization`.
1.  Select the `Analysis Type` [1] from the list of available options : `Main Effects`, `Main Effects` + `Quadratic`, `Main Effects + Two Factor`, `Main Effects + Two Factor + Quadratic`, `Main Effects + Two Factor + Three Factor`, `Main Effects + Two Factor + Three Factor + Quadratic`, `Full Factorial`
1.  Specify the `Significance Level`[2] used to calculate the confidence intervals. Default value is 95.
1.  Select the columns by clicking on the arrow buttons [3],[4] and moving columns between the `Excluded Columns` [5] , the `Factors` [6]  and `Dependent Variables`[7] lists.
1.  Specify the `Goal` [8], the `Target Value`[9] if the Target goal is selected, the `Scale`[10] and the `Importance`[11] of each dependent variable.
1.  Click on `Specify Factor Values`[12] to specify the `Min`[14] and `Max`[15] value for each numerical factor, the `Low level`[15] and `High level`[16] value for each categorical factor and optionally constrain factors to a `Fixed Value`[17]. Once they are specified click on `OK`[18].
1.  Click on `Specify Dependent Variable Ranges`[19] to specify the `Min`[20] and `Max`[21] value for each dependent variable . Once they are specified click on `OK`[22].
1.  Click on `Optimize on the Discretized Space (Only factor values that appear in the dataset will be considered)` [23] to only optimize on the discretized space.
1.  Click on the `Execute` button [24] to perform Multi-Objective optimization
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-multiObjective-config.png" alt="Multi-Objective Optimization config" width="800" height="550" class="img-responsive">
</div> 



#### Output
{: .no_toc}
The optimal factor settings, the predicted values and the individual and overall desirabilities are presented in the output spreadsheet and the Desirability & Response Profiles are shown in a separate window.
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-multiObjective-output.png" alt="Multi-Objective Optimization output" width="400" height="400" class="img-responsive">
</div> 

<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-multiObjective-chart.png" alt="Multi-Objective Optimization chart" width="600" height="600" class="img-responsive">
</div> 

---

## Mixture Analysis
Mixture Analysis is used to model the relationship between a response variable and the proportions of the components in a mixture and optionally any process variables present in the experiment. Unlike ordinary regression, mixture experiments are subject to the constraint

<div style="text-align: center;"> $$ \sum_{i=1}^{q} x_i = 1 $$ </div>

where $$x_i$$ represents the proportion of component $$i$$.

Because of this dependency, standard polynomial regression models cannot be used directly. Instead, Mixture Analysis employs Scheffé canonical polynomials, which are specifically designed for mixture experiments.

The software supports Linear, Quadratic, Special Cubic, Full Cubic, Special Quartic and Full Quartic mixture models. Binary process variables may also be included to investigate whether external operating conditions influence the mixture response.

### Supported Mixture Models
{: .no_toc}

#### Linear Model
{: .no_toc}

The linear model estimates only the individual contribution of each component.
<div style="text-align: center;"> $$ \eta = \sum_{i=1}^{q}\beta_i x_i $$ </div>
where:

1. $$x_i$$ = proportion of component $$i$$.
1. $$\beta_i$$ = expected response when the mixture consists entirely of component $$i$$.


#### Quadratic Model
{: .no_toc}

The quadratic model additionally captures pairwise blending effects between components.
<div style="text-align: center;"> $$ \eta = \sum_{i=1}^{q}\beta_i x_i + \sum_{i<j}\beta_{ij}x_i x_j $$ </div>
The interaction coefficient $$\beta_{ij}$$ describes whether the combination of components i and j produces a response different from what would be expected based on their individual effects alone.


#### Special Cubic Model
{: .no_toc}

The special cubic model includes three-component blending effects.
<div style="text-align: center;"> $$ \eta = \sum_{i=1}^{q}\beta_i x_i + \sum_{i<j}\beta_{ij}x_i x_j + \sum_{i<j<k}\beta_{ijk}x_i x_j x_k $$ </div>

The coefficients $$\beta_{ijk}$$ represent interactions among three components simultaneously.


#### Full Cubic Model
{: .no_toc}

The full cubic model extends the special cubic model by including asymmetry terms.
<div style="text-align: center;"> $$ \eta = \sum_{i=1}^{q}\beta_i x_i + \sum_{i<j}\beta_{ij}x_i x_j + \sum_{i<j}\delta_{ij}x_i x_j(x_i-x_j) + \sum_{i<j<k}\beta_{ijk}x_i x_j x_k $$ </div>

The terms $$x_ix_j(x_i-x_j)$$ allow the model to distinguish situations where component i dominates component j from situations where the reverse occurs.


#### Special Quartic Model
{: .no_toc}

The special quartic model introduces fourth-order blending effects.
<div style="text-align: center;"> $$ \eta = \sum_{i=1}^{q}\beta_i x_i + \sum_{i<j}\beta_{ij}x_i x_j + \sum_{i<j<k}\beta_{iijk}x_i^2x_jx_k + \sum_{i<j<k}\beta_{ijjk}x_ix_j^2x_k + \sum_{i<j<k}\beta_{ijkk}x_ix_jx_k^2 $$ </div>

#### Full Quartic Model
{: .no_toc}
The full quartic model is the most flexible mixture model available and includes all quartic terms.

<div style="text-align: center;"> $$ \eta = \sum_{i=1}^{q}\beta_i x_i + \sum_{i<j}\beta_{ij}x_i x_j + \sum_{i<j}\delta_{ij}x_i x_j(x_i-x_j) + \sum_{i<j}\gamma_{ij}x_i x_j(x_i-x_j)^2 $$ </div>
<div style="text-align: center;"> $$ + \sum_{i<j<k}\beta_{iijk}x_i^2x_jx_k + \sum_{i<j<k}\beta_{ijjk}x_ix_j^2x_k + \sum_{i<j<k}\beta_{ijkk}x_ix_jx_k^2 $$ </div>
<div style="text-align: center;"> $$ + \sum_{i<j<k<l}\beta_{ijkl}x_ix_jx_kx_l $$ </div>

### Process Variables
{: .no_toc}
Binary process variables may be included in the analysis.
Categorical process variables are internally coded using effect coding:
<div style="text-align: center;"> $$ \text{Low Level} = -1 $$ </div>
<div style="text-align: center;"> $$ \text{High Level} = +1 $$ </div>

For each process variable, interaction terms with all mixture model terms are automatically generated. This allows the software to determine whether the process condition changes the effect of individual components or component combinations.

For example, if temperature is included as a process variable T, interaction terms such as $$x_A T, x_Ax_BT$$ may be added to the model.

### Inverse Terms
{: .no_toc}

Optionally, inverse mixture terms may be included:
<div style="text-align: center;"> $$ \frac{1}{x_i} $$ </div>
These terms can be useful when the response increases rapidly as the proportion of a component approaches zero.

Inverse terms cannot be estimated when any component contains zero values.

### Model Estimation
{: .no_toc}
The model is fitted using ordinary least squares regression.

The parameter estimates are obtained by solving
<div style="text-align: center;"> $$ \hat{\beta} = (X^TX)^{-1} X^Ty $$ </div>
where:

1. $$X$$ is the design matrix
1. $$y$$ is the response vector

Terms that are linearly dependent due to the mixture constraint are automatically detected and removed from the model.

### Variance Inflation Factor (VIF)
{: .no_toc}

The Variance Inflation Factor measures the degree of multicollinearity among the model terms.

For each predictor, an auxiliary regression is fitted where the predictor is regressed against all remaining predictors.

The coefficient of determination from this auxiliary model is $$R_i^2$$. The VIF is then calculated as: 
<div style="text-align: center;"> $$  VIF_i = \frac{1}{1-R_i^2} $$ </div>

Interpreatation: 

| **VIF** | **Interpretation** |
| 1 | No collinearity | 
| 1-5 | Mild collinearity | 
| 5-10 | Moderate collinearity | 
| >10 | Severe collinearity | 

Large VIF values indicate that a model term is highly correlated with other terms and its coefficient may be unstable.

### Handling Non-Estimable Terms
{: .no_toc}

Because mixture models are subject to the sum-to-one constraint certain model terms may become perfectly collinear and therefore cannot be estimated.

The software automatically identifies these terms using collinearity checks and removes them from the analysis. Any excluded terms are reported to the user as warnings.

Use the `Mixture Analysis` tool by browsing in the top ribbon: 

|DOE $$\rightarrow$$ Post DoE Analysis $$\rightarrow$$ Mixture Analysis|

### Input
{: .no_toc}

All variables must be specified in the datasheet. The input to the algorithm consists of the results of a Mixture Design of Experiment (DoE) method, with the addition of the response calculated for each experimental run. The response variable must be strictly numerical. Experimental factors/ Components must also be numerical while process variables can be either numerical or cateforical and should contain exactly two levels.

### Configuration
{: .no_toc}

|**Dependent Variable**| Select the column that corresponds to values of the dependent variable.|
|**Analysis Type**| Select the desired analysis type for the analysis. Available options include: Linear, Quadratic, Special Cubic, Full Cubic, Special Quartic, Full Quartic.|
|**Include inverse component terms**| Use this option to include inverse component terms. This option is only allowed when no component has a zero value in the input data. |
|**Confidence Level(%)**| Specify the confidence level for the analysis. Values should range from 0 to 100 with the default value being 95. |
|**Components/Process Variables/Excluded Columns**| Select manually the columns that correspond to components and the columns that correspond to process variables through the dialog window: Use the buttons to move columns between the Components and Process Variables list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least two Component column should be specified. Process Variables must be binary. |
|**Specify Process Variables Values**| Use this buttton to specify the reference level for each process variable, that will internally be encoded as -1. If this option is not modified, then the last level for each variable will automatically be chosen.|

### Output
{: .no_toc}
The output spreadsheet contains the parameter estimate table with the following information.
1. Variable: Model term being estimated
1. Coefficient: Estimated regression coefficient
1. Std Error: Standard error of the coefficient
1. Lower CI: Lower confidence interval limit
1. Upper CI: Upper confidence interval limit
1. Test Statistic: Student's t-statistic
1. df: Degrees of freedom used in the test
1. p-value: Significance level for the coefficient
1. VIF: Variance Inflation Factor


### Example
{: .no_toc}

#### Input
{: .no_toc}
In the input datasheet minimum requirement is to specify three columns, two components and one dependent variable, as shown below.
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-mixture-input.png" alt="Mixture Analysis input" width="400" height="400" class="img-responsive">
</div> 

#### Configuration
{: .no_toc}

1.  Select `DOE` → `Post DoE Analysis` →`Mixture Analysis`.
1.  Select the `Dependent Variable`[1] from the list of available options. This column should only contain numerical values.
1.  Select the `Analysis Type` [2] from the list of available options : `Linear`, `Quadratic`, `Special Qubic`, `Full Cubic`, `Special Quartic`, `Full Quartic`
1.  Select/tic to `Include inverse proportion terms` [3] in the analysis. To be able to use this option, no zero values should be present in the input for any component.
1.  Specify the `Confidence Level (%)`[4] used to calculate confidence intervals. Default value is 0.95.
1.  Select the columns by clicking on the arrow buttons [7] and moving columns between the `Excluded Columns` [5] , the `Components` [6]  and `Process Variables`[7] lists.
1.  Optionally `Specify Process Variables Values` [9].
1.  Click on the `Execute` button [10] to perform Mixture Analysis
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-mixture-config.png" alt="Mixture config" width="400" height="400" class="img-responsive">
</div> 



#### Output
{: .no_toc}
The parameter estimates table with all information about the estimated coefficients is shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-mixture-output.png" alt="Mixture output" width="800" height="600" class="img-responsive">
</div> 

---


## References {#references-design-of-experiments}
1. Alkiayat, M., A practical guide to creating a Pareto chart as a quality improvement tool. Global Journal on Quality and Safety in Healthcare, 2021. 4(2): p. 83–84. [doi.org/10.36401/JQSH-21-X1](https://doi.org/10.36401/JQSH-21-X1).
1. Derringer, G., & Suich, R. (1980). Simultaneous Optimization of Several Response Variables. Journal of Quality Technology, 12(4), 214–219. [doi.org/10.1080/00224065.1980.11980968](https://doi.org/10.1080/00224065.1980.11980968)
1. Cornell, J. (2002) Experiments with Mixtures: Designs, Models, and the Analysis of Mixture. 3rd Edition, John Wiley & Sons, Inc., New York. [doi.org/10.1002/9781118204221](http://dx.doi.org/10.1002/9781118204221)


---

## Version History
Introduced in Isalos Analytics Platform v0.2.4

_Instructions last updated on June 2026_