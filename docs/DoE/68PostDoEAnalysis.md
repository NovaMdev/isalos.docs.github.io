---
layout: default
title: 6.8 Post DoE Analysis
parent: 6. DOE
nav_order: 8
permalink: /post-doe-analysis.html
---

# Post DoEAnalysis
{: .no_toc }

Post DoE Analysis provides a comprehensive set of tools to evaluate and interpret experimental results obtained through Design of Experiments (DoE) methodologies. With this module, users can easily identify the most influential factors, explore the impact of individual variables, and study interactions between them. Available visualization options include:
1.	Pareto Chart for ranking and visualizing the relative importance of effects.
1.	Main Effects Plots show how changes in a single factor influence the response and test whether the relationship between the dependent variable and each factor is linear.
1.	Interaction Plots to illustrate how two factors jointly affect the outcome and test whether there is interaction between two factors.
1.	Combined Main Effects + Interaction Plots for a holistic view of factor influences.

The tool supports both factorial/screening designs and response surface designs, making it adaptable to a wide variety of experimental setups.
For screening and factorial designs only, users may choose to include center points in the design. This does not mean the addition of extra experimental points in the design but rather that center points already included in the design will be handled differently. This is done by adding an extra 0/1 indicator variable, where a value of 1 identifies center points. Including this variable allows the algorithm to capture a portion of unexplained variability that is not accounted for by the main effects and interaction terms. This indicator is not included in the Pareto plots or in the main effect and interaction plots; it is only used internally to improve the explanation of variability. In contrast, for response surface designs, this option is not available, since the inclusion of curvature and quadratic terms already incorporates the information provided by center points.

# Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

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

All variables must be specified in the datasheet. The input to the algorithm consists of the results of a Design of Experiments (DoE) method, with the addition of the response calculated for each experimental run. Both the response variable and all factors must be numerical. Each row corresponds to a single observation from the experiment. In addition, the algorithm supports the optional inclusion of a covariate, which should also be numerical and can be used to account for unexplained variability and improve the accuracy of the analysis.

### Configuration
{: .no_toc}

|**Dependent Variable**| Select the column that corresponds to values of the dependent variable.|
|**Analysis Type**| Select the desired analysis type for the analysis. Available options include: Main Effects, Main Effects + Two-Factor, Main Effects + Two Factor + Three Factor, Main Effects + Quadratic, Main Effects + Two-Factor + Quadratic, Main Effects + Two Factor + Three Factor + Quadratic. For screening/factorial designs, it is recommended not to include quadratic terms, while for response surface designs, quadratic terms should typically be included.|
|**Level Of Significance**| Specify the level of significance for the analysis. Values should range from 0 to 1 with the default value being 0.05. |
|**Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one factor column should be specified. |
|**DOE type**| Select whether you have performed a Factorial/Screening or a Response Surface Design. |
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
1.  Select the `Dependent Variabl`[1] from the list of available options. This column should only contain numerical values.
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

All variables must be specified in the datasheet. The input to the algorithm consists of the results of a Design of Experiments (DoE) method, with the addition of the response calculated for each experimental run. Both the response variable and all factors must be numerical. Each row corresponds to a single observation from the experiment. In addition, the algorithm supports the optional inclusion of a covariate, which should also be numerical and can be used to account for unexplained variability and improve the accuracy of the analysis.

## Configuration
{: .no_toc}

|**Dependent Variable**| Select the column that corresponds to values of the dependent variable.|
|**Analysis Type**| Select the desired analysis type for the analysis. Available options include: Main Effects, Main Effects + Two-Factor, Main Effects + Two Factor + Three Factor, Main Effects + Quadratic, Main Effects + Two-Factor + Quadratic, Main Effects + Two Factor + Three Factor + Quadratic. For screening/factorial designs, it is recommended not to include quadratic terms, while for response surface designs, quadratic terms should typically be included.|
|**Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one factor column should be specified. |
|**Specify Factor Values**| Specify the low and high value for each factor to ensure the plots are generated correctly. By default, these values are initialized to the minimum and maximum observed values of each variable. |
|**DOE type**| Select whether you have performed a Factorial/Screening or a Response Surface Design. |
|**Include Center Points**| If you have performed a Factorial/Screening design, select whether to include center points in the analysis.|

## Output
{: .no_toc}
The output spreadsheet contains the fitted response values used to generate the curves. For each curve, 300 data points are provided, allowing precise plotting and replication of the results. A separate pop-up window is generated for each plot:
1.  Main Effects Plots: One plot is displayed per factor, showing the fitted response across the specified low and high values, with the center point included when available. The y axis is shared across all main effect plots. 
1.  Interaction Plots: One plot is displayed per estimable interaction. Each plot contains three fitted curves corresponding to the second factor of the interaction set at low, center, and high values. The spreadsheet includes the corresponding data points for each curve, as shown in the interaction plot output table.



## Example
{: .no_toc}

#### Input
{: .no_toc}
In the input datasheet minimum requirement is to specify two columns, one factor and one dependent variable, as shown below.
<div style="text-align: center;">
<img src="images/Design of experiments/postDoE-factorial-input.png" alt="Factorial input" width="400" height="400" class="img-responsive">
</div> 

#### Configuration
{: .no_toc}

1.  Select `DOE` → `Post DoE Analysis` →`Pareto Analysis`.
1.  Select the `Dependent Variabl`[1] from the list of available options. This column should only contain numerical values.
1.  Select the `Analysis Type` [2] from the list of available options : `Main Effects`, `Main Effects` + `Quadratic`, `Main Effects + Two Factor`, `Main Effects + Two Factor + Quadratic`, `Main Effects + Two Factor + Three Factor`, `Main Effects + Two Factor + Three Factor + Quadratic`
1.  Select the columns by clicking on the arrow buttons [6] and moving columns between the `Excluded Columns` [3] , the `Factors` [4]  and `Covariates`[5] lists.
1.  Click on `Specify Factor Values`[7] to specify the `Min`[8] and `Max`[9] value for each factor. Once they are specified click on `OK`[10].
1.  Select whether the DoE[11] method used before this step was a `Factorial/Screening` or a `Response Surface` method.
1.  If the `Factorial/Screening` option is selected, select/tick to `Include Center Points`[12]. 
1.  Click on the `Execute` button [13] to perform Pareto Analysis
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



## References {#references-design-of-experiments}
1. Alkiayat, M., A practical guide to creating a Pareto chart as a quality improvement tool. Global Journal on Quality and Safety in Healthcare, 2021. 4(2): p. 83–84. [doi.org/10.36401/JQSH-21-X1](https://doi.org/10.36401/JQSH-21-X1).

---

## Version History
Introduced in Isalos Analytics Platform v0.2.4

_Instructions last updated on November 2025_