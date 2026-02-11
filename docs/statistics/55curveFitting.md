---
layout: default
title: 5.5 Curve Fitting
parent: 5. Statistics
nav_order: 5
permalink: /curvefitting.html
---

# Curve Fitting
{: .no_toc }
Curve fitting is the process of estimating model parameters so a mathematical function best represents an observed relationship between an independent variable $$X$$ and a dependent response $$𝑌$$. In practice, you choose a model form (e.g., linear, polynomial, exponential, or mechanistic models such as Hill-type dose–response curves) and define a criterion for “best”. The most common criterion is least squares, where parameters are selected to minimize the sum of squared residuals $$ r_i = y_i - \hat{y_i}$$. Depending on the model, fitting can be done with linear regression (closed-form solutions) or nonlinear regression (iterative optimization). When the response variance is not constant across $$X$$, weighted least squares is often used so points with lower variance (higher confidence) influence the fit more than noisier points.

Different curve fitting methods make different assumptions and trade-offs. Nonlinear least squares is widely used for dose–response because it directly estimates interpretable parameters, but it can be sensitive to starting values, local minima, and parameter correlation—especially in multi-parameter models. Robust regression reduces the influence of outliers, while regularization or constraints (fixing slopes, bounding parameters) can stabilize fits when data are sparse or noisy. Good practice is to evaluate fit quality using residual plots, confidence intervals, and goodness-of-fit metrics (e.g., $$R^2$$), and to prefer models that are both statistically adequate and biologically/chemically plausible rather than simply the most flexible.

This section is organized into two subsections that reflect the main families of curve fitting used in this framework. The first subsection covers nonlinear equations, where model parameters are estimated using the Levenberg–Marquardt algorithm. The second subsection focuses on Lethal Concentration/Dose (LCx/LDx) analysis, which relies on probit regression solved using the Newton–Raphson method. The theoretical basis, assumptions, and practical implications of each approach are described in detail in their respective sections.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Non Linear Equations
In this context, a nonlinear equation is any model where the predicted response $$\hat{Y}$$ depends on parameters in a way that cannot be rewritten as a linear combination of those parameters. Formally, you model the relationship as
<div id="nonLinearEquations">
\begin{equation}
Y_i = f(X_i,\theta) + \epsilon_i
\end{equation}
</div>
where $$f(⋅)$$ is a chosen functional form (e.g., Hill-type dose–response, exponential growth/decay, biphasic/bell-shaped models), $$\theta$$ is the vector of unknown parameters, and $$\epsilon_i$$ represents measurement noise and unexplained variability. “Nonlinear” here refers to the parameters, not necessarily the curve shape: a model can be curved but still linear-in-parameters (e.g., polynomial regression), whereas dose–response models are typically nonlinear because parameters appear inside exponents, ratios, or both. Because there is no closed-form solution for $$\theta$$, parameters are estimated by numerical optimization, most commonly by minimizing an objective function such as the sum of squared residuals:
<div id="sse">
\begin{equation}
S(\theta) = \sum_{i=1}^n w_i(Y_i - f(X_i,\theta))^2
\end{equation}
</div>
with $$w_i = 1$$ for ordinary least squares.

To estimate parameters for these nonlinear least-squares models, Isalos uses the Levenberg–Marquardt (LM) algorithm. LM is an iterative method designed specifically for minimizing sums of squared residuals. It updates the parameter vector $$\theta$$ by using the model’s Jacobian (sensitivities of predictions to parameters) to propose a step that improves the fit. Intuitively, LM blends two behaviors: when the current estimate is close to the optimum and the model is locally well-approximated by a quadratic surface, LM behaves like Gauss–Newton (fast convergence); when the problem is ill-conditioned or far from the optimum, LM increases a damping term and behaves more like gradient descent (more stable steps). This balance makes LM a good default for dose–response-type equations: these models are naturally expressed as least-squares problems, usually have a moderate number of parameters, and benefit from an algorithm that is both efficient near the solution and robust when initial guesses are imperfect or parameters are correlated.

After fitting, parameter uncertainty is commonly summarized with confidence intervals. Symmetrical (Wald-type) confidence intervals use the local curvature of the objective function at the optimum—via the approximate covariance matrix derived from the Jacobian—to produce intervals of the form $$\hat{\theta}_j \pm tSE(\hat{\theta}_j)$$. They are fast and work well when the estimator is approximately normal and the loss surface is locally symmetric. Profile likelihood confidence intervals are more computationally intensive but often more reliable for nonlinear models: each parameter $$\theta_j$$ is fixed across a grid of values, the remaining parameters are re-optimized, and the interval is defined by the set of values that worsen the fit by no more than a threshold . In practice, if symmetric and profile intervals are similar, the parameter is usually well-identified; if they differ substantially (profile intervals asymmetric or much wider), that signals strong nonlinearity, parameter correlation, boundary effects, or limited information in the data—conditions where symmetric intervals can be misleadingly optimistic.

The remainder of this nonlinear-equation section is organized into three practical cases, based on how many dependent variables (response columns) the model is fitted to. First, we cover models fitted to a single dependent variable (Y column). Next, we extend the workflow to models that simultaneously fit two dependent variables (two Y columns), typically sharing one or more parameters. Finally, we address multiple dependent variables, where the same model framework is applied across several responses in parallel (often with global/shared parameters). Each case is accompanied by dedicated, instructions and examples to show the setup.

Fit your data using the `Non Linear Equations` function by browsing in the top ribbon:

| `Statistics` $$\rightarrow$$ `Curve Fitting` $$\rightarrow$$ `Non Linear Equations` |

### Case 1: One dependent variable
#### Input
{: .no_toc }
Numerical values should be specified in the input datasheet. The design Non Linear Equations with one dependent variable (Case 1) requires at least two columns in the input sheet: one column representing the independent variable, and another column for the numerical response variable (dependent variable). Columns with empty cells cannot be inculded in the analysis. Each row represents a single observation.

#### Configuration
{: .no_toc }

|**Category**| Select the model family that best matches your analysis. |
|**Model**| Select the specific equation to fit within the chosen category. |
|**Independent Variable**| Select the column that corresponds to values of the independent variable. |
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Extra Parameters**| Enter values for any additional model-specific parameters required for the selected equation. Refer to the documentation for the chosen model (in the list of available models) for the definition, allowed range/options, and recommended settings for each extra parameter.|
|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Confidence Interval Type**| Choose how confidence intervals are computed: `Symmetrical, Approximate` and `Assymetrical(Likelihood)`.|
|**Logarithmize Independent Variable Data**| Use this option to logarithmize (base 10) the data in the specified independent variable column.|

#### Output
{: .no_toc }
The output spreadsheet contains two tables:
1. Parameter Estimates: Reports the fitted value for each estimated parameter along with the lower and upper confidence limits at the selected confidence level. For parameters expressed on a log scale (e.g., LogEC50), the output also includes the corresponding back-transformed values (e.g., EC50) and their confidence limits.
1. Goodness of Fit: Summarizes overall fit statistics, including the number of data points used, degrees of freedom, residual sum of squares (SS), and the standard error of the regression.

In addition, a pop-up window displays a plot of the fitted curve overlaid with the experimental data points.

#### Example
{: .no_toc }

##### Input
{: .no_toc }
In the input datasheet the requirement is to specify at least two numerical columns and insert the appropriate data, as shown below.
<div style="text-align: center;">
<img src="images/Curve Fitting/case_1_input.png" alt="CurveFittingCase1Example-input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select  `Statistics` → `Curve Fitting` → `Non Linear Equations`.
1. Specify the `Category` [1] of the model you wish to use.
1. Select the specific `Model` [2] to fit. 
1. Select the column that corresponds to the `Independent Variable`[3]. 
1. Select the column that corresponds to the `Dependent Variable`[4]. 
1. Specify the value of any extra parameters for the specified model [5].
1. Specify the `Confidence Level (%)`[6] for tests.
1. Select the `Confidence Interval Type` [7].
1. Select/tick if you wish to `Logarithmize Independent Variable Data` before fitting [8].
1. Click on the `Execute` button [9] to perform the Non Linear Curve Fitting method.
<div style="text-align: center;">
<img src="images/Curve Fitting/case_1_config.png" alt="CurveFittingCase1Example-config" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
The parameter estimates and goodness of fit tables are shown in the output spreadsheet and the line chart showcasing the fitted curve and the experimental points is shown in a separate window.
<div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
  <img src="images/Curve Fitting/case_1_output.png"
       alt="CurveFittingCase1Example-output"
       style="max-width:350px; width:100%; height:auto;"
       class="img-responsive">

  <img src="images/Curve Fitting/case_1_output_plot.png"
       alt="CurveFittingCase1Example-output-plot"
       style="max-width:350px; width:100%; height:auto;"
       class="img-responsive">
</div>

### Case 2: Two dependent variables
#### Input
{: .no_toc }
Numerical values should be specified in the input datasheet. The design Non Linear Equations with two dependent variable (Case 2) requires at least three columns in the input sheet: one column representing the independent variable, and two columns for the numerical responses variable (dependent variables). The independent-variable column must not contain empty cells. Missing values are allowed only in the dependent-variable columns; rows with missing Y values are excluded from the fit for that specific dependent variable. Each row corresponds to a single observation.

#### Configuration
{: .no_toc }

|**Category**| Select the model family that best matches your analysis. |
|**Model**| Select the specific equation to fit within the chosen category. |
|**Independent Variable**| Select the column that corresponds to values of the independent variable. |
|**Dependent Variables**| Select the column that corresponds to values of each dependent variable. For each specific model that requires two dependent variables the label is changed to describe what the algorithm expects for each dependent variable. |
|**Extra Parameters**| Enter values for any additional model-specific parameters required for the selected equation. Refer to the documentation for the chosen model (in the list of available models) for the definition, allowed range/options, and recommended settings for each extra parameter.|
|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Confidence Interval Type**| Choose how confidence intervals are computed: `Symmetrical, Approximate` and `Assymetrical(Likelihood)`.|
|**Logarithmize Independent Variable Data**| Use this option to logarithmize (base 10) the data in the specified independent variable column.|

#### Output
{: .no_toc }
The output spreadsheet contains two tables:
1. Parameter Estimates: Reports the fitted value for each estimated parameter along with the lower and upper confidence limits at the selected confidence level. For parameters expressed on a log scale (e.g., LogEC50), the output also includes the corresponding back-transformed values (e.g., EC50) and their confidence limits.
1. Goodness of Fit: Summarizes overall fit statistics, including the number of data points used, degrees of freedom, residual sum of squares (SS), and the standard error of the regression.

In addition, a pop-up window displays a plot of the fitted curve overlaid with the experimental data points for each dependent variable.

#### Example
{: .no_toc }

##### Input
{: .no_toc }
In the input datasheet the requirement is to specify at least three numerical columns and insert the appropriate data, as shown below.
<div style="text-align: center;">
<img src="images/Curve Fitting/case_2_input.png" alt="CurveFittingCase2Example-input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select  `Statistics` → `Curve Fitting` → `Non Linear Equations`.
1. Specify the `Category` [1] of the model you wish to use.
1. Select the specific `Model` [2] to fit. 
1. Select the column that corresponds to the `Independent Variable`[3]. 
1. Select the column that corresponds to the two `Dependent Variables`[4], [5]. 
1. Specify the `Confidence Level (%)`[6] for tests.
1. Select the `Confidence Interval Type` [7].
1. Select/tick if you wish to `Logarithmize Independent Variable Data` before fitting [8].
1. Click on the `Execute` button [9] to perform the Non Linear Curve Fitting method.
<div style="text-align: center;">
<img src="images/Curve Fitting/case_2_config.png" alt="CurveFittingCase2Example-config" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
The parameter estimates and goodness of fit tables are shown in the output spreadsheet and the line chart showcasing the fitted curve and the experimental points for each dependent variable is shown in a separate window.
<div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
  <img src="images/Curve Fitting/case_2_output.png"
       alt="CurveFittingCase2Example-output"
       style="max-width:350px; width:100%; height:auto;"
       class="img-responsive">

  <img src="images/Curve Fitting/case_2_output_plot.png"
       alt="CurveFittingCase2Example-output-plot"
       style="max-width:350px; width:100%; height:auto;"
       class="img-responsive">
</div>

### Case 3: Multi-dependent variable models
#### Input
{: .no_toc }
Numerical values should be specified in the input datasheet. The design Non Linear Equations with multiple dependent variables (Case 3) requires at least three columns in the input sheet: one column representing the independent variable, and at least two columns for the numerical responses variable (dependent variables). The independent-variable column must not contain empty cells. Missing values are allowed only in the dependent-variable columns; rows with missing Y values are excluded from the fit for that specific dependent variable. Each row corresponds to a single observation.

#### Configuration
{: .no_toc }

|**Category**| Select the model family that best matches your analysis. |
|**Model**| Select the specific equation to fit within the chosen category. |
|**Add Column Pair(s)**| Click to open the dialog for adding independent–dependent variable column pairs. |
|**Select X Column/ Select Y Column/Concentration Value**| Choose the column for the independent variable (X) and the column for the dependent variable (Y), and enter the corresponding ligand concentration for that pair. |
|**Add/Add & Close/Close**| Use these buttons to add the specified pair, add and close the dialog, or close without adding. |
|**Remove Selected Column Pair(s)**| Remove the currently selected column pair(s). |
|**Extra Parameters**| Enter values for any additional model-specific parameters required for the selected equation. Refer to the documentation for the chosen model (in the list of available models) for the definition, allowed range/options, and recommended settings for each extra parameter.|
|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Confidence Interval Type**| Choose how confidence intervals are computed: `Symmetrical, Approximate` and `Assymetrical(Likelihood)`.|
|**Logarithmize Independent Variable Data**| Use this option to logarithmize (base 10) the data in the specified independent variable column.|

#### Output
{: .no_toc }
The output spreadsheet contains two tables:
1. Parameter Estimates: Reports the fitted value for each estimated parameter along with the lower and upper confidence limits at the selected confidence level. For parameters expressed on a log scale (e.g., LogEC50), the output also includes the corresponding back-transformed values (e.g., EC50) and their confidence limits.
1. Goodness of Fit: Summarizes overall fit statistics, including the number of data points used, degrees of freedom, residual sum of squares (SS), and the standard error of the regression.

In addition, a pop-up window displays a plot of the fitted curve overlaid with the experimental data points for each dependent variable.

#### Example
{: .no_toc }

##### Input
{: .no_toc }
In the input datasheet the requirement is to specify at least three numerical columns and insert the appropriate data, as shown below.
<div style="text-align: center;">
<img src="images/Curve Fitting/case_3_input.png" alt="CurveFittingCase3Example-input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select  `Statistics` → `Curve Fitting` → `Non Linear Equations`.
1. Specify the `Category` [1] of the model you wish to use.
1. Select the specific `Model` [2] to fit. 
1. Click on the `Add Column Pair(s)`[3] button to open the column pairs dialogue. 
1. Select the column that corresponds to the independent variable (`X Column`) [4], the column that corresponds to the dependent variable (`Y Column`) [5] and specify the `Concentration Value`[6] of the ligand for each pair. Use these buttons at the bottom of the dialogue[7] to add the specified pair, add and close the dialog, or close without adding.
1. Optionally `Remove Selected Column Pair(s)`[8] that are not wanted in the analysis.
1. Specify the `Confidence Level (%)`[9] for tests.
1. Select the `Confidence Interval Type` [10].
1. Select/tick if you wish to `Logarithmize Independent Variable Data` before fitting [11].
1. Click on the `Execute` button [12] to perform the Non Linear Curve Fitting method.
<div style="text-align: center;">
<img src="images/Curve Fitting/case_3_config.png" alt="CurveFittingCase3Example-config" width="650" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
The parameter estimates and goodness of fit tables are shown in the output spreadsheet and the line chart showcasing the fitted curve and the experimental points for each dependent variable is shown in a separate window.
<div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
  <img src="images/Curve Fitting/case_3_output.png"
       alt="CurveFittingCase3Example-output"
       style="max-width:350px; width:100%; height:auto;"
       class="img-responsive">

  <img src="images/Curve Fitting/case_3_output_plot.png"
       alt="CurveFittingCase3Example-output-plot"
       style="max-width:350px; width:100%; height:auto;"
       class="img-responsive">
</div>

---



### Available Models
#### Dose-Response
##### Inhibitor – Sigmoidal 4P – Raw response
The  Inhibitor – Sigmoidal 4P – Raw response model fits a monophasic inhibitory Hill-type sigmoidal curve using linear inhibitor concentration on the X-axis. It estimates Top (uninhibited plateau), Bottom (maximally inhibited plateau), the IC50 (inhibitor concentration producing 50% inhibition across the response range), and a free HillSlope that controls curve steepness/apparent cooperativity. Because the X-axis is linear, the low-concentration region is compressed, so dense sampling around IC50 is important to define the transition reliably. This 4-parameter form is preferred when both asymptotes are supported by the data and slope differences are biologically or experimentally relevant.


###### Equation
{: .no_toc }
<div id="inhibitor-response-variable slope-four-parameters">
\begin{equation}
\begin{alignedat}{1}
Y &= \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{1 + (\frac{\mathrm{IC50}}{X})^{\mathrm{HillSlope}}}  
\end{alignedat}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\inhibitor_response_variable_slope_four_parameters.png" alt="inhibitor - response - variable slope (four parameters)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$ Top:$$ The upper asymptote (response with ~0 inhibitor), representing the uninhibited control plateau.

1. $$Bottom$$: The lower asymptote at high inhibitor, representing the maximally inhibited plateau (residual activity/background).

1. $$IC50$$: The inhibitor concentration that reduces the response by 50% over the dynamic range between the Top (uninhibited) and Bottom (maximally inhibited) plateaus; it is a standard measure of inhibitory potency. Lower IC50 indicates higher potency under the same assay conditions.

1. $$HillSlope$$: The slope factor controlling the steepness of the inhibitory transition; reflects apparent cooperativity/heterogeneity (not necessarily mechanistic).

---

##### Inhibitor – Sigmoidal 3P (slope = 1) – Raw response
The Inhibitor – Sigmoidal 3P (slope = 1) – Raw response model fits a monophasic inhibitory sigmoidal relationship using linear inhibitor concentration on the X-axis. In this formulation the HillSlope is fixed to 1, imposing a standard steepness and reducing model flexibility. The fit focuses on estimating IC50 (potency, in concentration units) and the two free plateau. Because the X-axis is linear, dense sampling around IC50 is important to define the transition accurately.


###### Equation
{: .no_toc }
<div id="inhibitor-response-three-parameters">
\begin{equation}
\begin{alignedat}{1}
Y &= \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{1 + \frac{X}{IC50}}
\end{alignedat}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\inhibitor_response_three_parameters.png" alt="inhibitor - response (three parameters)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$ Top:$$  The upper asymptote (response with ~0 inhibitor), representing the uninhibited control plateau.

1. $$Bottom$$: The lower asymptote at high inhibitor, representing the maximally inhibited plateau (residual activity/background).

1. $$IC50$$: The inhibitor concentration that reduces the response by 50% over the dynamic range between the Top (uninhibited) and Bottom (maximally inhibited) plateaus; it is a standard measure of inhibitory potency. Lower IC50 indicates higher potency under the same assay conditions.

---


##### Inhibitor – Sigmoidal 4P – Normalized 0–100% response
The Inhibitor – Sigmoidal 4P – Normalized 0–100% response model fits a monophasic inhibitory sigmoidal curve to normalized data (e.g., % of control) using linear inhibitor concentration on the X-axis. Normalization constrains the response range to 100% (Top) at low inhibitor and 0% (Bottom) at high inhibitor, improving comparability across experiments. The fit estimates IC50 (in concentration units) and a free HillSlope that governs steepness/apparent cooperativity, while Top/Bottom may be fixed or constrained depending on the normalization. Because the X-axis is linear, dense sampling around IC50 is important for robust potency and slope estimates.


###### Equation
{: .no_toc }
<div id="inhibitor-normalized response-variable slope">
\begin{equation}
\begin{alignedat}{1}
Y &= \frac{100}{1 + (\frac{\mathrm{IC50}}{X})^{\mathrm{HillSlope}}}
\end{alignedat}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\inhibitor_normalized_response_variable_slope.png" alt="inhibitor - normalized response - variable slope" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$IC50$$: The inhibitor concentration that reduces the response by 50% over the dynamic range between the Top (uninhibited) and Bottom (maximally inhibited) plateaus; it is a standard measure of inhibitory potency. Lower IC50 indicates higher potency under the same assay conditions.

1. $$HillSlope$$: The slope factor controlling the steepness of the inhibitory transition; reflects apparent cooperativity/heterogeneity (not necessarily mechanistic).

---

##### Inhibitor – Sigmoidal 3P (slope = 1) – Normalized 0–100% response
The Inhibitor – Sigmoidal 3P (slope = 1) – Normalized 0–100% response model fits a monophasic inhibitory sigmoidal relationship to data normalized to % of control (or similar) using linear inhibitor concentration on the X-axis. In this formulation the HillSlope is fixed to 1, imposing a standard steepness and focusing interpretation on potency shifts. Normalization constrains the response range near 100% (Top) at low inhibitor and 0% (Bottom) at high inhibitor, with Top/Bottom fixed to 100/0. The fit primarily estimates IC50 (in concentration units), so adequate sampling around IC50 is critical given the compressed low-dose region on a linear X-axis.


###### Equation
{: .no_toc }
<div id="inhibitor-normalized response">
\begin{equation}
\begin{alignedat}{1}
Y &= \frac{100}{1 + \frac{X}{\mathrm{IC50}}}
\end{alignedat}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\inhibitor_normalized_response.png" alt="inhibitor - normalized response" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$IC50$$: The inhibitor concentration that reduces the response by 50% over the dynamic range between the Top (uninhibited) and Bottom (maximally inhibited) plateaus; it is a standard measure of inhibitory potency. Lower IC50 indicates higher potency under the same assay conditions.

---

##### log10(Inhibitor) – Sigmoidal 4P – Raw response
The log10(Inhibitor) – Sigmoidal 4P – Raw response model fits a monophasic inhibitory sigmoidal curve with $$X = log_{10}(inhibitor)$$. It estimates the Top (uninhibited plateau) and Bottom (maximally inhibited plateau), the logIC50 (log10 inhibitor concentration giving 50% inhibition across the response range), and a free HillSlope that controls curve steepness/apparent cooperativity. The log-scaled X-axis spreads the low-dose region, improving definition of the transition around IC50. 


###### Equation
{: .no_toc }
<div id="loginhibitor-response-variable slope-four-parameters">
\begin{equation}
\begin{alignedat}{1}
Y &= \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{1 + 10^{(\mathrm{LogIC50} - X) \cdot \mathrm{HillSlope}}}
\end{alignedat}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\loginhibitor_response_variable_slope_four_parameters.png" alt="loginhibitor - response - variable slope (four parameters)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$ Top:$$  The upper asymptote (response with ~0 inhibitor), representing the uninhibited control plateau.

1. $$Bottom$$: The lower asymptote at high inhibitor, representing the maximally inhibited plateau (residual activity/background).

1. $$LogIC50$$: The log10 inhibitor concentration that produces 50% inhibition of the response range between Top and Bottom; a measure of inhibitory potency.

1. $$HillSlope$$: The slope factor controlling the steepness of the inhibitory transition; reflects apparent cooperativity/heterogeneity (not necessarily mechanistic).

---

##### log10(Inhibitor) – Sigmoidal 3P (slope = 1) – Raw response
The log(inhibitor) vs. response (three parameters) model describes a monophasic inhibitory sigmoidal dose–response relationship with $$X = log_{10}(inhibitor)$$. It is a reduced form of the 4PL where one $$HillSlope = 1$$. This constraint improves fit stability when the data do not adequately define both asymptotes.


###### Equation
{: .no_toc }
<div id="loginhibitor-response-three-parameters">
\begin{equation}
\begin{alignedat}{1}
Y &= \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{1 + 10^{(X - \mathrm{LogIC50})}}
\end{alignedat}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\loginhibitor_response_three_parameters.png" alt="loginhibitor - response (three parameters)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$ Top:$$  The upper asymptote (response with ~0 inhibitor), representing the uninhibited control plateau.

1. $$Bottom$$: The lower asymptote at high inhibitor, representing the maximally inhibited plateau (residual activity/background).

1. $$LogIC50$$: The log10 inhibitor concentration that produces 50% inhibition of the response range between Top and Bottom; a measure of inhibitory potency.

---

##### log10(Inhibitor) – Sigmoidal 4P – Normalized 0–100% response
The log(inhibitor) vs. normalized response — variable slope model fits a monophasic inhibitory sigmoidal curve to normalized data (e.g., % of control) using $$X = log_{10}(inhibitor)$$. Normalization constrains the response range near 100% (Top) and 0% (Bottom), while the fit estimates logIC50 (inhibitory potency) and a free HillSlope that governs steepness/apparent cooperativity. The log-scaled X-axis expands the low-dose region, improving definition of the transition around IC50. This formulation is preferred for comparing potency and slope across conditions when absolute signal amplitudes differ between experiments. Bottom and Top are fixed to 0 and 100 respectively.


###### Equation
{: .no_toc }
<div id="loginhibitor-normalized response-variable slope">
\begin{equation}
\begin{alignedat}{1}
Y &= \frac{100}{1 + 10^{(\mathrm{LogIC50} - X) \cdot \mathrm{HillSlope}}}
\end{alignedat}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\loginhibitor_normalized_response_variable_slope.png" alt="loginhibitor - normalized response - variable slope" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$LogIC50$$: The log10 inhibitor concentration that produces 50% inhibition of the response range between Top and Bottom; a measure of inhibitory potency.

1. $$HillSlope$$: The slope factor controlling the steepness of the inhibitory transition; reflects apparent cooperativity/heterogeneity (not necessarily mechanistic).

---

##### log10(Inhibitor) – Sigmoidal 3P (slope = 1) – Normalized 0–100% response
The log(inhibitor) vs. normalized response model fits a monophasic inhibitory sigmoidal relationship to responses normalized to % of control (or similar), with $$X = log10[inhibitor]$$. Normalization constrains the response scale so the curve spans from ~100% (Top) at low inhibitor to ~0% (Bottom) at high inhibitor, improving comparability across runs. The fit is used to estimate logIC50 (inhibitory potency). Bottom and Top are fixed to 0 and 100 respectively and Hillslope is fixed to 1.

###### Equation
{: .no_toc }
<div id="loginhibitor-normalized response">
\begin{equation}
\begin{alignedat}{1}
Y &= \frac{100}{1 + 10^{(X - \mathrm{LogIC50})}}
\end{alignedat}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\loginhibitor_normalized_response.png" alt="loginhibitor - normalized response" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$LogIC50$$: The log10 inhibitor concentration that produces 50% inhibition of the response range between Top and Bottom; a measure of inhibitory potency.

---

##### Agonist – Sigmoidal 4P – Raw response
The Agonist – Sigmoidal 4P – Raw response model describes a monophasic Hill-type sigmoidal concentration–response curve using the linear agonist concentration on the X-axis. It estimates Bottom and Top plateaus, the EC50 (potency, in concentration units), and a free HillSlope that governs curve steepness/apparent cooperativity. Unlike log-transformed X models, linear scaling compresses the low-concentration region, so dense sampling around the EC50 is critical for stable parameter estimation. This 4-parameter form is preferred when both baseline and maximal plateaus are experimentally defined and should be fit rather than constrained.


###### Equation
{: .no_toc }
<div id="agonist-response-variable slope-four-parameters">
\[
\begin{equation}
\begin{alignedat}{1}
Y &= \mathrm{Bottom} + \frac{(X^{\mathrm{HillSlope}}) \cdot (\mathrm{Top} - \mathrm{Bottom})}{(X^{\mathrm{HillSlope}} + \mathrm{EC50}^{\mathrm{HillSlope}})}  
\end{alignedat}
\end{equation}
\]
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\agonist_response_variable_slope_four_parameters.png" alt="agonist - response - variable slope (four parameters)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Bottom$$: The lower asymptote of the curve (minimal response at very low agonist), often representing baseline activity/background.

1. $$Top$$: The upper asymptote (maximal response at saturating agonist), i.e., the observed Emax plateau.

1. $$ HillSlope$$: The slope factor that determines the steepness of the sigmoidal transition; reflects apparent cooperativity (not necessarily). 

1. $$ EC50$$: The agonist concentration that produces 50% of the maximal effect (halfway between Bottom and Top), and is a standard measure of potency. Lower EC50 indicates higher potency under the same assay conditions.

---

##### Agonist – Sigmoidal 3P (slope = 1) – Raw response
The Agonist – Sigmoidal 3P (slope = 1) – Raw response model fits a Hill-type sigmoidal relationship using the linear agonist concentration on the X-axis (not log-transformed). It is a reduced form where HillSlope is fixed to 1. The remaining parameters estimate EC50 (potency, in concentration units), Top and Bottom. Because the X-axis is linear, low-dose regions are less “spread out,” so good sampling near EC50 is especially important for reliable fits.


###### Equation
{: .no_toc }
<div id="agonist-response-three-parameters">
\[
\begin{equation}
\begin{alignedat}{1}
Y &= \mathrm{Bottom} + X \cdot \frac{\mathrm{Top} - \mathrm{Bottom}}{\mathrm{EC50} + X}
\end{alignedat}
\end{equation}
\]
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\agonist_response_three_parameters.png" alt="agonist - response (three parameters)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Bottom$$: The lower asymptote of the curve (minimal response at very low agonist), often representing baseline activity/background.

1. $$Top$$: The upper asymptote (maximal response at saturating agonist), i.e., the observed Emax plateau.

1. $$ EC50$$: The agonist concentration that produces 50% of the maximal effect (halfway between Bottom and Top), and is a standard measure of potency. Lower EC50 indicates higher potency under the same assay conditions.

---

##### Agonist – Sigmoidal 4P – Normalized 0–100% response
The Agonist – Sigmoidal 4P – Normalized 0–100% response model fits a Hill-type sigmoidal concentration–response curve to normalized data (e.g., % of control or % maximal) using linear agonist concentration on the X-axis. Normalization constrains the response range near 0% (Bottom) and 100% (Top), while the fit estimates EC50 (potency) and a free HillSlope that sets the curve steepness/apparent cooperativity. Because the X-axis is not log-transformed, the low-dose region is compressed, so dense measurements near EC50 are important for robust slope and potency estimates. This model is well suited for comparing potency and slope across conditions when absolute signal amplitudes vary between runs.


###### Equation
{: .no_toc }
<div id="agonist-normalized response-variable slope">
\[
\begin{equation}
\begin{alignedat}{1}
Y &= \frac{100 \cdot (X^{\mathrm{HillSlope}})}{EC50^{\mathrm{HillSlope}} + X^{\mathrm{HillSlope}}}
\end{alignedat}
\end{equation}
\]
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\agonist_normalized_response_variable_slope.png" alt="agonist - normalized response - variable slope" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$ EC50$$: The agonist concentration that produces 50% of the maximal effect (halfway between Bottom and Top), and is a standard measure of potency. Lower EC50 indicates higher potency under the same assay conditions.

1. $$ HillSlope$$: The slope factor that determines the steepness of the sigmoidal transition; reflects apparent cooperativity (not necessarily). 

---

##### Agonist – Sigmoidal 3P (slope = 1) – Normalized 0–100% response
The Agonist – Sigmoidal 3P (slope = 1) – Normalized 0–100% response model fits a Hill-type sigmoidal concentration–response relationship to data normalized to % of control or % of maximal response, using linear agonist concentration on the X-axis. Normalization constrains the response scale so the asymptotes are at 0% (Bottom) and 100% (Top), improving comparability across experiments. The fit is used to estimate EC50 (potency, in concentration units) while the HillSlope (steepness/apparent cooperativity) is fixed to 1 and Bottom/Top are fixed to 0 and 100 respectively. Because the X-axis is linear, adequate sampling around EC50 is especially important to define the transition region accurately.


###### Equation
{: .no_toc }
<div id="agonist-normalized response">
\[
\begin{equation}
\begin{alignedat}{1}
Y &= \frac{100 \cdot X}{\mathrm{EC50} + x}
\end{alignedat}
\end{equation}
\]
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\agonist_normalized_response.png" alt="agonist - normalized response" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$ EC50$$: The agonist concentration that produces 50% of the maximal effect (halfway between Bottom and Top), and is a standard measure of potency. Lower EC50 indicates higher potency under the same assay conditions.

---

##### log10(Agonist) – Sigmoidal 4P – Raw response
The log10(Agonist) – Sigmoidal 4P – Raw response model describes a monophasic sigmoidal concentration–response relationship with $$X=log_{10}(agonist)$$. The curve is parameterized by Bottom and Top plateaus, logEC50 (the log concentration producing 50% of the maximal effect), and the Hill slope. Allowing a variable Hill slope captures differences in steepness/cooperativity rather than assuming a fixed unit slope. It is the standard choice for estimating potency (EC50) and efficacy (Emax/Top) when no biphasic behavior is present.


###### Equation
{: .no_toc }
<div id="logagonist-response-variable slope-four-parameters">
\[
\begin{equation}
\begin{alignedat}{1}
Y &= \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{1 + 10^{(\mathrm{LogEC50} - X) \cdot \mathrm{HillSlope}}}
\end{alignedat}
\end{equation}
\]
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\logagonist_response_variable_slope_four_parameters.png" alt="logagonist - response - variable slope (four parameters)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Bottom$$: The lower asymptote of the curve (minimal response at very low agonist), often representing baseline activity/background.

1. $$Top$$: The upper asymptote (maximal response at saturating agonist), i.e., the observed Emax plateau.

1. $$LogEC50$$: The log10 agonist concentration that produces 50% of the response range between Bottom and Top; a measure of potency.

1. $$HillSlope$$: The slope factor that determines the steepness of the sigmoidal transition; reflects apparent cooperativity (not necessarily mechanistic).

---

##### log10(Agonist) – Sigmoidal 3P (slope = 1) – Raw response
The log10(Agonist) – Sigmoidal 3P (slope = 1) – Raw response model is a sigmoidal (Hill-type) concentration–response fit with $$X = log_{10}(agonist)$$, used when a monophasic effect is observed across the tested range. It is the reduced form of the 4PL in which HillSlope is fixed to 1. The remaining parameters estimate Top, logEC50 (potency), and Bottom . This constraint improves parameter identifiability and stability when the baseline or maximal plateau is not well defined by the data.


###### Equation
{: .no_toc }
<div id="logagonist-response-three-parameters">
\[
\begin{equation}
\begin{alignedat}{1}
Y &= \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{1 + 10^{(\mathrm{LogEC50} - X)}}
\end{alignedat}
\end{equation}
\]
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\logagonist_response_three_parameters.png" alt="logagonist - response (three parameters)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Bottom$$: The lower asymptote of the curve (minimal response at very low agonist), often representing baseline activity/background.

1. $$Top$$: The upper asymptote (maximal response at saturating agonist), i.e., the observed Emax plateau.

1. $$LogEC50$$: The log10 agonist concentration that produces 50% of the response range between Bottom and Top; a measure of potency.

---

##### log10(Agonist) – Sigmoidal 4P – Normalized 0–100% response
The log10(Agonist) – Sigmoidal 4P – Normalized 0–100% response model fits a sigmoidal concentration–response curve to normalized data (e.g., % of control or % maximal), using $$X=log_{10}(agonist)$$. Normalization constrains the asymptotes at 0% (Bottom) and 100% (Top), while the fit estimates logEC50 (potency) and a free HillSlope. Allowing a variable HillSlope captures differences in steepness/apparent cooperativity without changing the normalization scale. It is commonly used to compare shifts in potency and slope across treatments when absolute response amplitudes vary.


###### Equation
{: .no_toc }
<div id="logagonist-normalized response-variable slope">
\[
\begin{equation}
\begin{alignedat}{1}
Y &= \frac{100}{1 + 10^{(\mathrm{LogEC50} - X)\,\mathrm{HillSlope}}}
\end{alignedat}
\end{equation}
\]
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\logagonist_normalized_response_variable_slope.png" alt="logagonist - normalized response - variable slope" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$LogEC50$$: The log10 agonist concentration that produces 50% of the response range between Bottom and Top; a measure of potency.

1. $$HillSlope$$: The slope factor that determines the steepness of the sigmoidal transition; reflects apparent cooperativity (not necessarily mechanistic).

---

##### log10(Agonist) – Sigmoidal 3P (slope = 1) – Normalized 0–100% response
The log10(Agonist) – Sigmoidal 3P (slope = 1) – Normalized 0–100% response model fits a sigmoidal (Hill-type) concentration–response relationship to data that have been normalized, to % of control or % of maximal response. With $$X=log_{10}(agonist)$$, normalization constrains the response scale so the plateaus are at 0% (Bottom) and 100% (Top), reducing inter-experiment variability. The fit estimates logEC50 (potency) while, the HillSlope (steepness/cooperativity) is fixed to 1, and Bottom/Top are fixed to 0/100. This approach is useful for comparing potency across conditions when absolute signal amplitudes differ.


###### Equation
{: .no_toc }
<div id="logagonist-normalized response">
\[
\begin{equation}
\begin{alignedat}{1}
Y &= \frac{100}{1 + 10^{(\mathrm{LogEC50} - X)}}
\end{alignedat}
\end{equation}
\]
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\logagonist_normalized_response.png" alt="logagonist - normalized response" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$LogEC50$$: The log10 agonist concentration that produces 50% of the response range between Bottom and Top; a measure of potency.

---

##### Asymmetric Sigmoidal 5P, X is Concentration
The Asymmetric Sigmoidal 5P, X is Concentration, fits a sigmoidal concentration–response curve that allows asymmetry around the midpoint, rather than forcing a symmetric transition as in the 4PL. In addition to Bottom, Top, EC50 (or IC50), and HillSlope, it includes an asymmetry (shape) parameter that skews the curve so the approach to one plateau differs from the other. This is useful when the data show systematic left/right skew due to heterogeneity, mixed mechanisms, or assay artifacts that a symmetric logistic cannot capture. As with other linear-X fits, adequate sampling around the inflection region is critical for stable estimation of EC50 and shape.


###### Equation
{: .no_toc }
<div id="asymmetric-five-parameter-concentration">
\[
\begin{equation}
\begin{alignedat}{2}
Numerator = Top - Bottom \qquad & 
Denominator = {((2^{\frac{1}{S}} - 1) \cdot (\frac{\mathrm{EC50}}{X})^{\mathrm{HillSlope}} + 1)}^S
\end{alignedat}
\end{equation}
\]
</div>

<div id="asymmetric-five-parameter-concentration_2">
\begin{equation}
Y = Bottom + \frac{\mathrm{Numerator}}{\mathrm{Denominator}} 
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\asymmetric_five_parameter_concentration.png" alt="Asymmetric (five parameter), X is concentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Bottom$$: The lower asymptote (minimal response at very low concentration), typically reflecting baseline/background or fully inhibited activity.

1. $$Top$$: The upper asymptote (maximal response at high concentration), i.e., the observed Emax or uninhibited plateau.

1. $$EC50 / IC50$$: The concentration producing 50% of the response range between Top and Bottom (activation) or 50% inhibition across that range (inhibition); a measure of potency.

1. $$HillSlope$$: The slope factor controlling the steepness of the transition region; reflects apparent cooperativity/heterogeneity.

1. $$S (symmetry/shape parameter)$$: A unitless parameter that introduces asymmetry around the midpoint; S = 1 yields a symmetric 4PL-like curve, while S ≠ 1 skews the curve.

---



##### Asymmetric Sigmoidal 5P, X is log10(concentration)
The Asymmetric Sigmoidal 5P, X is log10(concentration), fits a sigmoidal dose–response curve while allowing asymmetry around the midpoint. It includes Bottom, Top, logEC50/logIC50, HillSlope, and a symmetry (shape) parameter (S) that skews the curve so the approach to one plateau differs from the other. Using a log-scaled X-axis expands the low-dose region and typically improves definition of the transition near the midpoint. This model is useful when a symmetric 4PL systematically misfits the data (e.g., residuals indicate consistent left/right skew). It preserves standard potency interpretation via logEC50/logIC50 while capturing non-symmetric curve shape.


###### Equation
{: .no_toc }
<div id="asymmetric-five-parameter-logconcentration">
\begin{equation}
\mathrm{LogX}_{b} = \mathrm{LogEC50} + \frac{Log\!\left(2^{\frac{1}{S}} - 1\right)}{\mathrm{HillSlope}}
\end{equation}
</div>

<div id="asymmetric-five-parameter-logconcentration_2">
\begin{equation}
\begin{alignedat}{2}
Numerator = Top - Bottom \qquad & 
Denominator = {(10^{\mathrm{HillSlope} \cdot (\mathrm{LogX}_{b}-X)} + 1)}^S
\end{alignedat}
\end{equation}
</div>

<div id="asymmetric-five-parameter-logconcentration_3">
\begin{equation}
Y = Bottom + \frac{\mathrm{Numerator}}{\mathrm{Denominator}} 
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\asymmetric_five_parameter_log_concentration.png" alt="Asymmetric (five parameter), X is log(concentration)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Bottom$$: The lower asymptote (minimal response at very low concentration), typically reflecting baseline/background or fully inhibited activity.

1. $$Top$$: The upper asymptote (maximal response at high concentration), i.e., the observed Emax or uninhibited plateau.

1. $$LogEC50 / LogIC50$$: The log10 concentration producing 50% of the response range between Top and Bottom (activation) or 50% inhibition across that range (inhibition); a potency metric.

1. $$HillSlope$$: The slope factor controlling the steepness of the transition region; reflects apparent cooperativity/heterogeneity.

1. $$S (symmetry/shape parameter)$$: A unitless parameter that introduces asymmetry around the midpoint; S = 1 yields a symmetric 4PL-like curve, while S ≠ 1 skews the curve.

---



##### Biphasic, X is Concentration
TheBiphasic, X is Concentration is used when the response shows two distinct phases across the concentration range, consistent with two components of different potency and/or direction. The observed curve is typically modeled as the sum of two Hill-type terms, each with its own EC50 (and often its own amplitude), while sharing a common baseline. One phase may dominate at low concentrations and the other at higher concentrations, producing an inflection or “shoulder” that a single-site logistic cannot fit. This approach is often interpreted as reflecting two receptor populations, two binding sites, or mixed mechanisms, though the fit itself is phenomenological. Dense sampling across both transition regions is important to reliably resolve both components.


###### Equation
{: .no_toc }
<div id="biphasic, concentration">
\[
\begin{equation}
Span = Top - Bottom
\end{equation}
\]
</div>

<div id="biphasic, concentration_2">
\[
\begin{equation}
\begin{alignedat}{2}
Section_{1} = \frac{Span \cdot Frac}{(\frac{\mathrm{EC50}_{1}}{X})^{\mathrm{nH}_{1}} + 1} \qquad & 
Section_{2} = \frac{Span \cdot (-Frac + 1)}{(\frac{\mathrm{EC50}_{2}}{X})^{\mathrm{nH}_{2}} + 1}
\end{alignedat}
\end{equation}
\]
</div>

<div id="biphasic, concentration_3">
\[
\begin{equation}
Y = Bottom + Section_{1} + Section_{2} 
\end{equation}
\]
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\biphasic_concentration.png" alt="biphasic, X is concentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Bottom$$: The lower asymptote (minimal response at very low concentration), typically reflecting baseline/background or fully inhibited activity.

1. $$Top$$: The upper asymptote (maximal response at high concentration), i.e., the observed Emax or uninhibited plateau.

1. $\mathrm{EC50}_1$ and $\mathrm{EC50}_2$: represent the concentrations (expressed in the same units as X) at which each phase reaches 50% of its respective maximal effect — the first for the stimulatory component and the second for the inhibitory component.

1. $$nH_1$$: The steepness factor for phase 1; captures apparent cooperativity/heterogeneity of the first component.

1. $$nH_2$$: The steepness factor for phase 2; defines how sharply the second phase transitions.

---

##### Biphasic, X is log10(concentration)
The Biphasic, X is log10(concentration) is used when the response exhibits two separable phases across the concentration range that cannot be captured by a single sigmoidal curve. The observed profile is modeled as the sum of two Hill-type components sharing a common baseline, each with its own logEC50 (and typically its own amplitude and slope). Using a log-scaled X-axis expands the low-dose region, helping to resolve distinct transitions and “shoulders” between phases. This behavior is often consistent with two receptor populations, two binding sites, or mixed mechanisms, though the model remains phenomenological. Robust estimation requires data that cover both transition regions with sufficient points.


###### Equation
{: .no_toc }
<div id="biphasic, log(concentration)">
\begin{equation}
Span = Top - Bottom
\end{equation}
</div>

<div id="biphasic, log(concentration)_2">
\[
\begin{equation}
\begin{alignedat}{2}
Section_{1} = \frac{Span \cdot Frac}{10^{\mathrm{nH}_{1} \cdot (\mathrm{LogEC50}_{1}-X)} + 1} \qquad & 
Section_{2} = \frac{Span \cdot (-Frac + 1)}{10^{\mathrm{nH}_{2} \cdot (\mathrm{LogEC50}_{2}-X)} + 1}
\end{alignedat}
\end{equation}
\]
</div>

<div id="biphasic, log(concentration)_3">
\begin{equation}
Y = Bottom + Section_{1} + Section_{2} 
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\biphasic_logconcentration.png" alt="biphasic, X is log(concentration)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Bottom$$: The lower asymptote (minimal response at very low concentration), typically reflecting baseline/background or fully inhibited activity.

1. $$Top$$: The upper asymptote (maximal response at high concentration), i.e., the observed Emax or uninhibited plateau.

1. $$\mathrm{LogEC50}_{1}$$ and $$\mathrm{LogEC50}_{2}$$:  denote the log-transformed concentrations (in the same units as X) at which each phase achieves 50% of its maximal effect — LogEC50_1 for the stimulatory component and LogEC50_2 for the inhibitory component.

1. $$nH_1$$: The steepness factor for phase 1; captures apparent cooperativity/heterogeneity of the first component.

1. $$nH_2$$: The steepness factor for phase 2; defines how sharply the second phase transitions.

---

##### Bell-shaped, X is Concentration
The Bell-shaped dose-response model (X is concentration/dose) is used when a compound produces two opposing effects accross the concentration range, either stimulation at one range and inhibition at another or the reverse. The observed "bell" is modeled as the sum of two Hill-type dose-response curves that share a common baseline.


###### Equation
{: .no_toc }
<div id="bell-shaped">
\[
\begin{equation}
\begin{alignedat}{2}
\mathrm{Span}_1 &= \mathrm{Plateau}_1 - \mathrm{Dip} \qquad & 
\mathrm{Span}_2 &= \mathrm{Plateau}_2 - \mathrm{Dip} \\
\mathrm{Section}_1 &= \frac{\mathrm{Span}_1}{1+(\mathrm{LogEC50}_1 - X)^{nH_1}} \qquad &
\mathrm{Section}_2 &= \frac{\mathrm{Span}_2}{1+(X - \mathrm{LogEC50}_2)^{nH_2}} \\
\end{alignedat}
\end{equation}
\]
</div>

<div id="bell-shaped-2">
\begin{equation}
Y = Dip + Section_1 + Section_2 
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/bell_shaped_X.png" alt="Bell Shaped" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Dip$$: The shared baseline (offset) of the whole model. The predicted response starts from Dip, and then the two components (Section1 and Section2) add to it.

1. $$Plateau_1$$: Defines the asymptotic level used to set the amplitude of component 1. If $$Span_1 > 0$$, component 1 contributes upward, otherwise downward.

1. $$EC50_1$$/$$IC50_1$$: This is the concentration where component 1 is half-maximal. ($$nH_1$$ > 0 → stimulation → parameter is $$EC50_1$$, $$nH_1$$ < 0 → inhibition → parameter is $$IC50_1$$)

1. $$nH_1$$: Controls the steepness of component 1 and the stimulation vs inhibition

1. $$Plateau_2$$: Defines the asymptotic level used to set the amplitude of component 2. If $$Span_2 > 0$$, component 2 contributes upward, otherwise downward.

1. $$EC50_2$$/$$IC50_2$$: This is the concentration where component 2 is half-maximal. ($$nH_2$$ > 0 → stimulation → parameter is $$EC50_2$$, $$nH_2$$ < 0 → inhibition → parameter is $$IC50_2$$)

1. $$nH_2$$: Controls the steepness of component 2 and the stimulation vs inhibition

---

##### Bell-shaped, X is log10(concentration)
The Bell-shaped dose-response model (X is log10 concentration/dose) is used when a compound produces two opposing effects accross the concentration range, either stimulation at one range and inhibition at another or the reverse. The observed "bell" is modeled as the sum of two Hill-type dose-response curves that share a common baseline.


###### Equation
{: .no_toc }
<div id="bell-shaped-logX">
\[
\begin{equation}
\begin{alignedat}{2}
\mathrm{Span}_1 &= \mathrm{Plateau}_1 - \mathrm{Dip} \qquad & 
\mathrm{Span}_2 &= \mathrm{Plateau}_2 - \mathrm{Dip} \\
\mathrm{Section}_1 &= \frac{\mathrm{Span}_1}{1+10^{(\mathrm{LogEC50}_1 - X)\,nH_1}} \qquad &
\mathrm{Section}_2 &= \frac{\mathrm{Span}_2}{1+10^{(X-\mathrm{LogEC50}_2)\,nH_2}} \\
\end{alignedat}
\end{equation}
\]
</div>

<div id="bell-shaped-logX_2">
\begin{equation}
Y = Dip + Section_1 + Section_2 
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/bell_shaped_logX.png" alt="Bell Shaped - Log X" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Dip$$: The shared baseline (offset) of the whole model. The predicted response starts from Dip, and then the two components (Section1 and Section2) add to it.

1. $$Plateau_1$$: Defines the asymptotic level used to set the amplitude of component 1. If $$Span_1 > 0$$, component 1 contributes upward, otherwise downward.

1. $$LogEC50_1$$/$$LogIC50_1$$: This is the log10 concentration where component 1 is half-maximal. ($$nH_1$$ > 0 → stimulation → parameter is $$LogEC50_1$$, $$nH_1$$ < 0 → inhibition → parameter is $$LogIC50_1$$)

1. $$nH_1$$: Controls the steepness of component 1 and the stimulation vs inhibition

1. $$Plateau_2$$: Defines the asymptotic level used to set the amplitude of component 2. If $$Span_2 > 0$$, component 2 contributes upward, otherwise downward.

1. $$LogEC50_2$$/$$LogIC50_2$$: This is the log10 concentration where component 2 is half-maximal. ($$nH_2$$ > 0 → stimulation → parameter is $$LogEC50_2$$, $$nH_2$$ < 0 → inhibition → parameter is $$LogIC50_2$$)

1. $$nH_2$$: Controls the steepness of component 2 and the stimulation vs inhibition

---

##### Find ECF - Sigmoidal 4P, X is concentration
The Find ECF - Sigmoidal 4P, X is concentration analysis fits a standard sigmoidal concentration–response curve using linear agonist concentration on the X-axis, then reports the concentration producing a user-defined effect level (ECx). Instead of restricting output to EC50, it interpolates (or extrapolates, if allowed) the agonist concentration at x% of the response range between Bottom and Top (or another specified reference). The underlying fit typically estimates Top, Bottom, EC50, and a slope term (fixed or variable, depending on settings), and then computes ECanything from that fitted curve. Because X is linear, reliable ECx estimates require sufficient data density in the region surrounding the target response level. This method is useful for reporting regulatory or pharmacological endpoints such as EC10, EC20, EC80, etc., on a consistent model basis.

###### Equation
{: .no_toc }
<div id="ecf-sigmoidal4p-concentration">
\begin{equation}
\mathrm{EC50} = \frac{\mathrm{ECF}}{(\frac{F}{-F+100})^{\frac{1}{\mathrm{HillSlope}}}}
\end{equation}
</div>

<div id="ecf-sigmoidal4p-concentration_2">
\begin{equation}
Y = \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{(\frac{\mathrm{EC50}}{X})^{\mathrm{HillSlope}} + 1}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\ecf_sigmoidal4p_concentration.png" alt="ecf-sigmoidal4p-concentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the agonist concentration on a linear scale (i.e., X=[agonist], in any consistent concentration units). The model also requires a column containing the dependent variable (Y) response values (in consistent response units, e.g., % effect or signal). This analysis additionally requires specification of one extra setting:
- $$ECx level (x%)$$: The target effect level at which to report ECanything (e.g., EC10, EC20, EC80), defined as x% of the fitted response range between Bottom and Top (or relative to the chosen baseline/normalization convention).


###### Parameters
{: .no_toc }
1. $$ECF$$ ($$EC_{anything}$$): The agonist concentration that produces a response at F% of the span between Bottom and Top (e.g., F=80 gives EC80). The software typically reports both ECF and logECF.

1. $$HillSlope$$: The slope (steepness) parameter of the sigmoidal curve; values >1 indicate a steeper transition and values <1 a shallower transition, with 1.0 often used as a standard constraint.

1. $$Top$$ /$$ Bottom$$: The upper and lower plateaus of the response (in Y-units), defining the dynamic range used to compute the F% effect level.

1. $$F$$: The user-specified target effect percentage that defines “ECanything” (e.g., 10, 20, 50, 80), interpreted relative to the fitted Bottom-to-Top range.

---

##### Find ECF - Sigmoidal 4P, X is log10(concentration)
The Find ECF - Sigmoidal 4P, X is log10(concentration) analysis fits a standard sigmoidal concentration–response curve with $$X = log_{10}(agonist)$$ and then reports the agonist level that produces a user-defined effect (ECF/ECx). Rather than limiting the output to EC50, it computes the concentration giving F% of the fitted response range between Bottom and Top (e.g., EC10, EC80). The underlying fit estimates Bottom, Top, and HillSlope, and uses the fitted curve to interpolate the corresponding logECF (and ECF). Log-scaling expands the low-dose region, typically improving precision for EC values on the lower part of the curve. This approach is useful for standardized potency reporting at specific effect levels across conditions.

###### Equation
{: .no_toc }
<div id="ecf-sigmoidal4p-log(concentration)">
\begin{equation}
\mathrm{LogEC50} = \mathrm{LogECF} - \frac{\mathrm{Log(\frac{F}{-F + 100})}}{\mathrm{HillSlope}}
\end{equation}
</div>

<div id="ecf-sigmoidal4p-log(concentration)_2">
\begin{equation}
Y = \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{10^{\mathrm{HillSlope} \cdot (\mathrm{LogEC50} - X)} + 1}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\ecf_sigmoidal4p_logconcentration.png" alt="ecf-sigmoidal4p-log(concentration)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the agonist concentration on a log10 scale (i.e., $$X=log⁡_{10}(\mathrm{agonist})$$, in any consistent concentration units). The model also requires a column containing the dependent variable (Y) response values (in consistent response units, e.g., % effect or signal). This analysis additionally requires specification of one extra setting:

- $$ECx_{level} (x\%)$$: The target effect level at which to report ECanything (e.g., EC10, EC20, EC80), defined as x% of the fitted response range between Bottom and Top (or relative to the chosen baseline/normalization convention).

###### Parameters
{: .no_toc }
1. $$ECF (ECanything) $$: The agonist concentration that produces a response at F% of the span between Bottom and Top (e.g., F=80 gives EC80). The software typically reports both ECF and logECF.

1. $$HillSlope$$: The slope (steepness) parameter of the sigmoidal curve; values >1 indicate a steeper transition and values <1 a shallower transition, with 1.0 often used as a standard constraint.

1. $$Top$$ /$$ Bottom$$: The upper and lower plateaus of the response (in Y-units), defining the dynamic range used to compute the F% effect level.

1. $$F$$: The user-specified target effect percentage that defines “ECanything” (e.g., 10, 20, 50, 80), interpreted relative to the fitted Bottom-to-Top range.

---

##### Operational model - Receptor depletion, X is Concentration
The Operational model — receptor depletion (X is concentration) is an extension of the Black–Leff operational model used to quantify agonism when the functional response is measured after reducing the available receptor population (e.g., irreversible antagonist or alkylation). By incorporating a depletion term (often expressed as the fraction of receptors remaining), the model separates affinity ($K_{a}$) from efficacy (τ, transducer ratio) and predicts how curves shift and depress as receptor reserve is removed. Fitting concentration–response data before/after depletion allows estimation of system-dependent amplification and agonist intrinsic efficacy, not just EC50 and Emax. It is especially useful for distinguishing partial agonism from limited receptor availability in the assay system.


###### Equation
{: .no_toc }
<div id="operational, receptor depletion, concentration">
\begin{equation}
operate = {(\frac{\mathrm{K}_{a} + X}{\mathrm{T}_{au} \cdot X})}^n
\end{equation}
</div>

<div id="operational, receptor depletion, concentration_2">
\begin{equation}
Y = \mathrm{Basal} + \frac{\mathrm{Effect}_{max} - \mathrm{Basal}}{\mathrm{operate} + 1}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\operational_receptor_depletion_concentration.png" alt="operational, receptor depletion, X is concentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). This model requires two dependent-variable columns: one for no depletion and one depletion , both in consistent units. The two datasets must correspond to the same $$X$$ values (or overlapping $$X$$ ranges) so they can be fitted.

###### Parameters
{: .no_toc }
1. $$Effect_{max}$$: The system’s maximal achievable response (Y-units), i.e., the upper limit of the assay when receptors are not depleted and the agonist can drive the system to saturation.

1. $$Basal$$: The response in the absence of agonist (baseline, Y-units); often fixed to 0 if data have been baseline-subtracted.

1. $$K_a$$: The agonist–receptor dissociation constant (X-units), a direct index of affinity; it is mechanistically distinct from EC50, which is system-dependent.

1. $$T_{au}$$: The transducer ratio/operational efficacy parameter describing coupling efficiency and receptor reserve; larger tau implies less occupancy is needed to generate a given effect.

1. $$n$$: A unitless transducer slope (shape) parameter controlling the steepness of the operational stimulus–response relationship; it is related to, but not the same as, a Hill slope.

---

##### Operational model - Receptor depletion, X is log10(concentration)
The Operational model — receptor depletion ($$X = log_{10}(concentration)$$) applies the Black–Leff operational framework to concentration–response data collected before and after reducing the available receptor population. Using a log-scaled X-axis expands the low-dose region and facilitates comparison of curve shifts and Emax depression produced by depletion. The model estimates $K_{a}$ (agonist affinity) and τ (operational efficacy/transducer ratio), often alongside Basal, Effectmax, and an optional transducer slope (n). By explicitly accounting for receptor reserve, it can separate true affinity/efficacy from system amplification that confounds simple EC50/Emax fits.


###### Equation
{: .no_toc }
<div id="operational, receptor depletion, log(concentration)">
\begin{equation}
operate = {(\frac{10^{\mathrm{LogK}_{a}} + 10^{X}}{10^{\mathrm{LogT}_{au} + X}})}^n
\end{equation}
</div>

<div id="operational, receptor depletion, log(concentration)_2">
\begin{equation}
Y = \mathrm{Basal} + \frac{\mathrm{Effect}_{max} - \mathrm{Basal}}{\mathrm{operate} + 1}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\operational_receptor_depletion_logconcentration.png" alt="operational, receptor depletion, X is log(concentration)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) can be entered on a log10 scale. In that case, X represents log10(concentration) values, which may be negative for concentrations below 1 in the chosen units, and these values are included in the fit. This model requires two dependent-variable columns: one for no depletion and one depletion, both in consistent units. The two datasets must correspond to the same $$X$$ values (or overlapping $$X$$ ranges) so they can be fitted. 

###### Parameters
{: .no_toc }
1. $$Basal$$: The baseline response in the absence of agonist (constitutive/background signal), in Y-units.

1. $$Effect_{max}$$: The maximal system response achievable in the assay (upper limit/Emax), in Y-units.

1. $$logK{a}$$: The log10 of the agonist–receptor dissociation constant (affinity term); lower $K_{a}$ implies higher affinity.

1. $$LogT_{au}$$: The log10 of the transducer ratio (tau), an operational measure of efficacy/coupling efficiency and receptor reserve; higher tau indicates greater efficacy.

1. $$n$$: The unitless transducer slope (shape) parameter controlling the steepness of the stimulus–response mapping (related to, but distinct from, a Hill slope).

---

##### Operational model - Partial agonist, X is Concentration
The Operational model — Partial agonist (X is Concentration) applies the Black–Leff framework to agonists that produce a submaximal effect even at full receptor occupancy. Using linear concentration on the X-axis, the model relates stimulus to response through affinity ($${K}_{a}$$) and operational efficacy (τ) rather than relying solely on EC50/Emax. It predicts both rightward shifts and reduced Emax relative to a full agonist, allowing separation of binding affinity from functional efficacy. The formulation can include Basal, Effectmax, and an optional transducer slope (n) to describe curve shape. This model is particularly useful for comparing partial vs. full agonists within the same receptor system.


###### Equation
{: .no_toc }
<div id="operational, partial agonist, concentration">
\begin{equation}
operate = {(\frac{\mathrm{K}_{a} + X}{\mathrm{T}_{au} \cdot X})}^n
\end{equation}
</div>

<div id="operational, partial agonist, concentration_2">
\begin{equation}
\begin{alignedat}{2}
\mathrm{Y}_{\mathrm{\langle A \rangle}} &= \mathrm{Basal} + \frac{\mathrm{Effect}_{max} - \mathrm{Basal}}{\left(\dfrac{\mathrm{EC}_{50}}{X}\right)^{n} + 1}
\qquad &
\mathrm{Y}_{\mathrm{\langle \sim A \rangle}} &= \mathrm{Basal} + \frac{\mathrm{Effect}_{max} - \mathrm{Basal}}{\mathrm{operate} + 1}
\end{alignedat}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\operational_partial_concentration.png" alt="operational, partial agonist, X is concentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). This model requires two dependent-variable columns: one for full and one partial agonist, both in consistent units. The two datasets must correspond to the same $$X$$ values (or overlapping $$X$$ ranges) so they can be fitted.

###### Parameters
{: .no_toc }
1. $$Effect_{max}$$: The maximum response the system can produce (Y-units), defined by the upper plateau of the full agonist concentration–response curve.

1. $$Basal$$: The response measured with no agonist present (baseline, Y-units); if you baseline-corrected the data, it is often fixed to 0.

1. $$n$$: A unitless transducer slope/shape parameter that governs curve steepness; it is related to, but not identical with, the Hill slope and is often constrained to 1.0.

1. $$\mathrm{K}_{a}$$ (and $$\mathrm{LogK}_{a}$$): The equilibrium dissociation constant of the partial agonist (same units as X), quantifying binding affinity; Prism commonly reports both $K_{a}$ and its log10 value.

1. $$T_{au}$$: The transducer ratio, an operational index of efficacy/coupling efficiency; it reflects how much receptor occupancy is required to generate a given response, and Prism may report both τ and log10(tau).

1. $$EC50$$: The agonist concentration (in the same units as X) that produces 50% of the maximal response range between Basal (or Bottom) and Effectmax (or Top); a direct measure of potency.

---

##### Operational model - Partial agonist, X is log10(concentration)
The Operational model — receptor depletion ($$X = log_{10}(concentration)$$) applies the Black–Leff operational framework to datasets collected before and after reducing receptor availability (e.g., irreversible antagonist treatment). With a log-scaled X-axis, the low-dose region is expanded, improving definition of the transition and facilitating comparison of rightward shifts and Emax depression caused by depletion. The model estimates $logK_{a}$ (affinity) and logtau/tau (operational efficacy/transducer ratio), typically alongside Basal, Effectmax, and an optional transducer slope (n). By explicitly accounting for receptor reserve, it separates ligand properties from system amplification more effectively than standard EC50/Emax fits.


###### Equation
{: .no_toc }
<div id="operational, partial agonist, log(concentration)">
\begin{equation}
operate = {(\frac{10^{\mathrm{logK}_{a}} + 10^{X}}{10^{\mathrm{logT}_{au} + X}})}^n
\end{equation}
</div>

<div id="operational, partial agonist, log(concentration)_2">
\begin{equation}
\begin{alignedat}{2}
\mathrm{Y}_{\mathrm{\langle A \rangle}} &= \mathrm{Basal} + \frac{\mathrm{Effect}_{max} - \mathrm{Basal}}{10^{n \cdot (\mathrm{LogEC}_{50} - X)} + 1}
\qquad &
\mathrm{Y}_{\mathrm{\langle \sim A \rangle}} = \mathrm{Basal} + \frac{\mathrm{Effect}_{max} - \mathrm{Basal}}{\mathrm{operate} + 1}
\end{alignedat}
\end{equation}
</div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\operational_partial_log_concentration.png" alt="operational, partial agonist, X is log(concentration)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) can be entered on a log10 scale. In that case, X represents log10(concentration) values, which may be negative for concentrations below 1 in the chosen units, and these values are included in the fit. This model requires two dependent-variable columns: one for full and one partial agonist, both in consistent units. The two datasets must correspond to the same $$X$$ values (or overlapping $$X$$ ranges) so they can be fitted.

###### Parameters
{: .no_toc }
1. $$Basal$$: The baseline response in the absence of agonist (background/constitutive signal), in Y-units.

1. $$Effect_{max}$$: The maximal system response achievable (upper limit of the assay, Y-units), typically defined under no-depletion conditions.

1. $$LogK_{a}$$: The log10 of the agonist–receptor dissociation constant (affinity); lower Kₐ (higher log affinity) indicates tighter binding.

1. $$LogT_{au}$$: The log10 of the transducer ratio τ, an operational index of efficacy/coupling efficiency and receptor reserve; higher values imply greater efficacy.

1. $$n$$: A unitless transducer slope parameter controlling the steepness of the operational stimulus–response relationship; often constrained to 1.0.

1. $$LogEC50$$: The $$log10$$ agonist concentration that produces 50% of the response range between Bottom and Top (or Basal and Effectmax, depending on the model); it is a standard index of potency.

---

##### Gaddum/Schild EC50 shift, X is concentration
The Gaddum/Schild EC50 shift model (X is concentration) fits a family of agonist concentration–response curves measured at fixed antagonist concentrations to quantify competitive antagonism. Under surmountable competition, the agonist curves show parallel rightward shifts (increased EC50) with minimal change in maximal response. The shift is summarized by the dose ratio (EC50′/EC50) at each antagonist level and related to antagonist concentration via the Gaddum/Schild relationship. From these shifts, the model estimates antagonist affinity as $K_{B}$ (often reported as $pA_2 = −log_{10}$ $K_{B}$ when consistent with Schild theory). Using linear X makes accurate sampling around each EC50 especially important for reliable dose-ratio estimates.


###### Equation
{: .no_toc }
<div id="gaddum-schild, shift, concentration">
\begin{equation}
Antag = {(\frac{B}{10^{-\mathrm{pA}_{2}}})}^{\mathrm{SchildSlope}} + 1
\end{equation}
</div>

<div id="gaddum-schild, shift, concentration_2">
\begin{equation}
Y = \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}
{\left(\frac{\mathrm{EC50}\cdot \mathrm{Antag}}{X}\right)^{\mathrm{HillSlope}} + 1}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\gaddum_schild_shift_concentration.png" alt="gaddum-schild, shift, X is concentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear concentration scale and therefore strictly positive ($$X>0$$). Zero or negative X values are excluded from the calculations. The dependent variable (Y) should contain the agonist response (e.g., % effect or response units) measured across the agonist concentration range.
This is a global fit across multiple agonist dose–response curves: one control curve (no antagonist) and additional curves collected at fixed antagonist concentrations ([B]). Provide one Y column for the control and one Y column for each antagonist level; the antagonist concentrations must be entered consistently (same units as $K_{B}$). The curves should share overlapping X ranges so the EC50 shifts (dose ratios) can be estimated reliably.

###### Parameters
{: .no_toc }
1. $$EC50$$ / $$LogEC50$$: EC50 is the agonist concentration producing a half-maximal response in the absence of antagonist (potency). logEC50 is the log10 of that value (in the same “log units” used to label X), while EC50 is the antilog in concentration units.

1. $$pA_{2}$$: The negative log10 of the antagonist concentration that causes a twofold rightward shift of the agonist EC50 (dose ratio = 2). If SchildSlope = 1, $pA_2$ corresponds to $$pK_B$$ ($$−log10 K_B$$).

1. $$A_{2}$$: The antagonist concentration that produces a twofold EC50 shift (dose ratio = 2). When $$SchildSlope = 1$$, A2 equals $K_{B}$ (equilibrium dissociation constant of the antagonist).

1. $$HillSlope$$: The slope factor controlling the steepness of the agonist concentration–response curve; commonly constrained to 1 for standard sigmoidal behavior.

1. $$SchildSlope$$: Describes how closely the EC50 shifts follow the competitive antagonism prediction; values near 1 indicate simple competition, whereas deviations suggest non-ideal behavior.

1. $$Top$$ /$$ Bottom$$: The upper and lower plateaus of the response, in Y-units, assumed to be shared across curves when shifts are purely horizontal.

---

##### Gaddum/Schild EC50 shift, X is log10(concentration)
The Gaddum/Schild EC50 shift model ($$X = log_{10}(concentration)$$) analyzes families of agonist concentration–response curves measured at fixed antagonist concentrations under a competitive antagonism framework. On a log-scaled X-axis, the curves are expected to show parallel rightward shifts with little or no change in Top/Bottom when antagonism is purely surmountable. The fit quantifies the shift via the dose ratio (EC50′/EC50) and estimates antagonist affinity as $pA_2$ (and, when SchildSlope ≈ 1, $pK_{B}$). Allowing SchildSlope to vary tests concordance with Schild theory, while HillSlope controls the steepness of the agonist response. This approach is widely used to infer $K_{B}$ from functional EC50 shifts rather than direct binding.


###### Equation
{: .no_toc }
<div id="gaddum-schild, shift, log(concentration)">
\begin{equation}
\begin{alignedat}{2}
Antag &= {(\frac{B}{10^{-\mathrm{pA}_{2}}})}^{\mathrm{SchildSlope}} + 1
\qquad &
\mathrm{LogEC} &= \mathrm{Log(\mathrm{EC50} \cdot \mathrm{Antag})} 
\end{alignedat}
\end{equation}
</div>

<div id="gaddum-schild, shift, log(concentration)_2">
\begin{equation}
Y = \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{10^{\mathrm{HillSlope} \cdot (\mathrm{LogEC} - X)} + 1}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\gaddum_schild_shift_logconcentration.png" alt="gaddum-schild, shift, X is log(concentration)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) is entered on a log10 concentration scale, so X represents log10[agonist] values. These values (which may be negative for concentrations below 1 in the chosen units) are included directly in the calculations. The dependent variable (Y) should contain the agonist response (e.g., % effect or response units) measured across the agonist concentration range.
This is a global fit across multiple agonist dose–response curves: one control curve (no antagonist) and additional curves collected at fixed antagonist concentrations [B]. Provide one Y column for the control and one Y column for each antagonist level; the antagonist concentrations must be entered consistently (same units as $K_{B}$). The curves should share overlapping log X ranges so the EC50 shifts (dose ratios) can be estimated reliably.


###### Parameters
{: .no_toc }
1. $$EC50$$ / $$LogEC50$$: EC50 is the agonist concentration producing a half-maximal response in the absence of antagonist (potency). logEC50 is the log10 of that value (in the same “log units” used to label X), while EC50 is the antilog in concentration units.

1. $$pA_{2}$$: The negative log10 of the antagonist concentration that causes a twofold rightward shift of the agonist EC50 (dose ratio = 2). If SchildSlope = 1, $pA_2$ corresponds to $$pK_B$$ ($$−log10 K_B$$).

1. $$A_{2}$$: The antagonist concentration that produces a twofold EC50 shift (dose ratio = 2). When $$SchildSlope = 1$$, A2 equals $K_{B}$ (equilibrium dissociation constant of the antagonist).

1. $$HillSlope$$: The slope factor controlling the steepness of the agonist concentration–response curve; commonly constrained to 1 for standard sigmoidal behavior.

1. $$SchildSlope$$: Describes how closely the EC50 shifts follow the competitive antagonism prediction; values near 1 indicate simple competition, whereas deviations suggest non-ideal behavior.

1. $$Top$$ /$$ Bottom$$: The upper and lower plateaus of the response, in Y-units, assumed to be shared across curves when shifts are purely horizontal.

---

##### Gaddum/Schild EC50 shift (SchildSlope = 1), X is concentration
The Gaddum/Schild EC50 shift model with SchildSlope fixed to 1 (X is concentration) assumes simple, competitive, surmountable antagonism, so agonist curves exhibit parallel rightward shifts without changing Emax. With the Schild slope constrained, the relationship between antagonist concentration and dose ratio is fixed, and the fit focuses on estimating antagonist affinity as $K_{B}$ (often reported as $pK_{B}$/$pA_2$). The shift is quantified via the dose ratio (EC50′/EC50) computed from the fitted agonist curves at each antagonist level. Using linear X requires good sampling around each EC50 to estimate dose ratios accurately.


###### Equation
{: .no_toc }
<div id="gaddum-schild, shift, slope1 concentration">
\begin{equation}
Antag = \frac{B}{10^{-\mathrm{pA}_{2}}} + 1
\end{equation}
</div>

<div id="gaddum-schild, shift, slope1 concentration_2">
\begin{equation}
Y = \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}
{\left(\frac{\mathrm{EC50}\cdot \mathrm{Antag}}{X}\right)^{\mathrm{HillSlope}} + 1}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\gaddum_schild_shift_slope1_concentration.png" alt="gaddum-schild, shift, slope1, X is concentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear concentration scale and therefore strictly positive $$(X>0)$$. Zero or negative X values are excluded from the calculations. The dependent variable (Y) should contain the agonist response (e.g., % effect or response units) measured across the agonist concentration range.
This is a global fit across multiple agonist dose–response curves: one control curve (no antagonist) and additional curves collected at fixed antagonist concentrations ([B]). Provide one Y column for the control and one Y column for each antagonist level; the antagonist concentrations must be entered consistently (same units as $K_{B}$). The curves should share overlapping X ranges so the EC50 shifts (dose ratios) can be estimated reliably.

###### Parameters
{: .no_toc }
1. $$EC50$$ /$$ LogEC50$$: EC50 is the agonist concentration giving 50% of the maximal response in the absence of antagonist. logEC50 is the log10 form (in the same “log units” used for X labels), and EC50 is its antilog in concentration units.

1. $$pA_{2}$$ ( $$= pK_B$$ when $$SchildSlope = 1$$): The negative log10 of the antagonist concentration that produces a twofold rightward shift of the agonist curve; with SchildSlope fixed to 1 it directly reports antagonist affinity as $$ pK_B$$.

1. $$A_{2}$$ ( $$= K_B$$ when $$SchildSlope = 1$$): The antagonist concentration that yields a dose ratio of 2; when the Schild slope is constrained to 1, A2 is equivalent to$$ K_B$$ (equilibrium dissociation constant).

1. $$HillSlope$$: Controls the steepness of the agonist concentration–response curves; it is often constrained to 1.0 to enforce standard sigmoidal behavior across the family of curves.

1. $$ Top$$ /$$ Bottom$$: The upper and lower response plateaus (in Y-units), defining the dynamic range and assumed to be common across curves when antagonism is purely surmountable.

---

##### Gaddum/Schild EC50 shift (SchildSlope = 1), X is log10(concentration)
The Gaddum/Schild EC50 shift model with SchildSlope fixed to 1 ($$X = log_{10}(concentration)$$) assumes simple competitive, surmountable antagonism, so agonist curves undergo parallel rightward shifts with no change in maximal response. With the Schild slope constrained, the fit directly links the dose ratio (EC50′/EC50) to antagonist concentration and estimates antagonist affinity as $K_{B}$ (often reported as $pK_{B}$, equivalent to $pA_2$ under this constraint). Using log10 X expands the low-dose region, improving definition of the transition around EC50 and the precision of the estimated shifts. This formulation is typically applied to a family of curves measured at fixed antagonist concentrations to obtain a single global affinity estimate.


###### Equation
{: .no_toc }
<div id="gaddum-schild, shift, slope1 log(concentration)">
\begin{equation}
\begin{alignedat}{2}
\mathrm{Antag} &= \frac{B}{10^{-\mathrm{pA}_{2}}} + 1
\qquad &
\mathrm{LogEC50} &= Log(\mathrm{EC50}\cdot \mathrm{Antag})
\end{alignedat}
\end{equation}
</div>

<div id="gaddum-schild, shift, slope1 log(concentration)_2">
\begin{equation}
Y = \mathrm{Bottom} + \frac{\mathrm{Top}-\mathrm{Bottom}}{10^{\mathrm{HillSlope} \cdot (\mathrm{LogEC} - X)} + 1}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\gaddum_schild_shift_slope1_logconcentration.png" alt="gaddum-schild, shift, slope1, X is logconcentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) is entered on a log10 concentration scale, so X represents log10[agonist] values. These values (which may be negative for concentrations below 1 in the chosen units) are included directly in the calculations. The dependent variable (Y) should contain the agonist response (e.g., % effect or response units) measured across the agonist concentration range.
This is a global fit across multiple agonist dose–response curves: one control curve (no antagonist) and additional curves collected at fixed antagonist concentrations [B]. Provide one Y column for the control and one Y column for each antagonist level; the antagonist concentrations must be entered consistently (same units as $K_{B}$). The curves should share overlapping log X ranges so the EC50 shifts (dose ratios) can be estimated reliably.


###### Parameters
{: .no_toc }
1. $$EC50$$ /$$ LogEC50$$: EC50 is the agonist concentration giving 50% of the maximal response in the absence of antagonist. logEC50 is the log10 form (in the same “log units” used for X labels), and EC50 is its antilog in concentration units.

1. $$pA_2$$ ( $$= pK_B$$ when $$SchildSlope = 1$$): The negative log10 of the antagonist concentration that produces a twofold rightward shift of the agonist curve; with SchildSlope fixed to 1 it directly reports antagonist affinity as $$ pK_B$$.

1. $$A_2$$ ( $$= K_B$$ when $$SchildSlope = 1$$): The antagonist concentration that yields a dose ratio of 2; when the Schild slope is constrained to 1, A2 is equivalent to$$ K_B$$ (equilibrium dissociation constant).

1. $$HillSlope$$: Controls the steepness of the agonist concentration–response curves; it is often constrained to 1.0 to enforce standard sigmoidal behavior across the family of curves.

1. $$ Top$$ /$$ Bottom$$: The upper and lower response plateaus (in Y-units), defining the dynamic range and assumed to be common across curves when antagonism is purely surmountable.

---

##### EC50 shift, X is concentration
The EC50 shift model (X is concentration) compares agonist concentration–response curves measured under control conditions and in the presence of a fixed modulator (e.g., antagonist) by quantifying the change in potency. The primary readout is the shift in EC50 (often expressed as an EC50 ratio or “dose ratio”), typically assuming the curves remain sigmoidal with similar HillSlope. In the simplest implementation, the modulator produces a horizontal displacement of the curve along the concentration axis, while Top and Bottom may be shared or allowed to vary depending on the mechanism. This approach is useful for summarizing potency changes without explicitly fitting a full Schild relationship. Reliable estimation requires dense sampling around each EC50 on the linear X-axis.


###### Equation
{: .no_toc }
<div id="shift-concentration">
\begin{equation}
\begin{alignedat}{2}
\mathrm{EC}_{\langle A \rangle} &= \mathrm{EC50}_{Control}
\qquad &
\mathrm{EC}_{\langle \sim A \rangle} &= \mathrm{EC50}_{Control} \cdot \mathrm{EC50}_{Ratio}
\end{alignedat}
\end{equation}
</div>

<div id="shift-concentration_2">
\begin{equation}
Y = \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{(\frac{EC}{X})^{\mathrm{HillSlope}} + 1}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\shift_concentration.png" alt="shift-concentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). This model requires two dependent-variable columns: one for no Inhibitor and one Inhibitor, both in consistent units. The two datasets must correspond to the same $$X$$ values (or overlapping $$X$$ ranges) so they can be fitted.

###### Parameters
{: .no_toc }
1. $$ EC50_{Control}$$: The agonist concentration that produces a half-maximal response under control conditions (no modulator present), i.e., baseline potency.

1. $$ Top / Bottom$$: The upper and lower response plateaus (in Y-units), typically shared across curves to model a pure horizontal potency shift.

1. $$EC50_{Ratio}$$: The fold-shift in potency, defined as $$ EC50_{modulator} /EC50_{control} $$; values >1 indicate a rightward shift (reduced potency).

1. $$HillSlope$$: The shared slope parameter describing the steepness of the sigmoidal transition between Bottom and Top.

---

##### EC50 shift, X is log10(concentration)
The EC50 shift model ($$X = log_{10}(concentration)$$) analyzes a set of agonist concentration–response curves collected with and without a modulator by quantifying the change in potency on a log-scaled X-axis. The modulator effect is captured as an EC50 ratio (dose ratio), producing a horizontal displacement of the curve along log concentration. In the standard implementation, Top, Bottom, and HillSlope are shared across curves, so the fit isolates a pure EC50 shift without altering efficacy. Using log10 X expands the low-dose region and typically improves precision of the estimated shift around the midpoint. This approach provides a concise summary of modulator-induced potency changes without requiring a full Schild analysis.


###### Equation
{: .no_toc }
<div id="shift-log(concentration)">
\begin{equation}
\begin{alignedat}{2}
\mathrm{LogEC}_{\langle A \rangle} &= \mathrm{LogEC50}_{Control}
\qquad &
\mathrm{LogEC}_{\langle \sim A \rangle} &= \mathrm{LogEC50}_{Control} + \mathrm{LogEC50}_{Ratio}
\end{alignedat}
\end{equation}
</div>

<div id="shift-log(concentration)_2">
\begin{equation}
Y = \mathrm{Bottom} + \frac{\mathrm{Top} - \mathrm{Bottom}}{10^{\mathrm{HillSlope} \cdot (\mathrm{LogEC} - X)} + 1}
\end{equation}
</div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images\Curve Fitting\shift_logconcentration.png" alt="shift-log(concentration)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) can be entered on a log10 scale. In that case, X represents log10(concentration) values, which may be negative for concentrations below 1 in the chosen units, and these values are included in the fit. This model requires two dependent-variable columns: one for no inhibitor and one inhibitor, both in consistent units. The two datasets must correspond to the same $$X$$ values (or overlapping $$X$$ ranges) so they can be fitted.

###### Parameters
{: .no_toc }
1. $$ EC50_{Control}$$: The agonist concentration that produces a half-maximal response under control conditions (no modulator present), i.e., baseline potency.

1. $$ Top / Bottom$$: The upper and lower response plateaus (in Y-units), typically shared across curves to model a pure horizontal potency shift.

1. $$EC50_{Ratio}$$: The fold-shift in potency, defined as $$ EC50_{modulator} /EC50_{control} $$; values >1 indicate a rightward shift (reduced potency).

1. $$HillSlope$$: The shared slope parameter describing the steepness of the sigmoidal transition between Bottom and Top.

---

##### Allosteric EC50 shift, X is Concentration
The Allosteric EC50 shift model fits agonist dose–response curves measured at multiple fixed concentrations of an allosteric modulator (including a no-modulator control). The modulator does not directly generate a response; instead, it shifts the agonist’s apparent potency by changing the effective agonist concentration required to produce a given effect. The model globally estimates the agonist potency in the absence of modulator (EC50), the modulator affinity for its allosteric site (KB), and a cooperativity factor ($$a$$) that quantifies how modulator binding alters agonist potency. Curves shift left ($$a > 1$$) when the modulator increases agonist potency and shift right ($$α < 1$$) when it decreases potency.


###### Equation
{: .no_toc }
<div id="allosteric-ec50-shift"> \[ \begin{equation} \begin{alignedat}{2} \beta &= \frac{1+\mathrm{Allo}/K_B}{1+\alpha\,\mathrm{Allo}/K_B} \qquad & \mathrm{Antag} &= \mathrm{Agonist}\cdot \beta \\ Y &= \mathrm{Bottom} + \frac{\mathrm{Top}-\mathrm{Bottom}} {1+\left(\frac{\mathrm{EC50}}{\mathrm{Antag}}\right)^{\mathrm{HillSlope}}} \qquad & \end{alignedat} \end{equation} \] </div>

(Here $$Allo$$ is the fixed modulator concentration for each curve.)

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/allosteric_ec50_shift_X.png" alt="Allosteric EC50 shift, X is Concentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The dependent variable (Y) contains the measured response values. This is a global fit across multiple curves: each curve corresponds to a fixed modulator concentration ($$Allo$$). Provide one dataset with $$Allo=0$$ (no modulator) and additional datasets for each modulator level, using consistent concentration units throughout.

###### Parameters
{: .no_toc }
1. $$Top$$: The upper plateau of the inhibition curve (response with no inhibitor / very low inhibitor). Same units as $$Y$$.

1. $$Bottom$$: The lower plateau approached by the tested inhibitor at high concentrations (residual response). Same units as $$Y$$.

1. $$EC50$$: Agonist concentration that produces half-maximal response in the absence of modulator. Same units as $$X$$. Lower $$EC50$$ indicates higher agonist potency.

1. $$HillSlope$$: Controls the steepness of the curve transition.

1. $$KB$$: Equilibrium dissociation constant (affinity) of the modulator for its allosteric site. Same molar units as $$Allo$$. Lower $$KB$$ indicates tighter modulator binding.

1. $$a$$: Cooperativity factor describing how modulator binding changes agonist potency:
     1. $$a = 1$$: no shift (modulator does not affect potency)
     1. $$a > 1$$: left shift (agonist becomes more potent; EC50 decreases)
     1. $$a < 1$$: right shift (agonist becomes less potent; EC50 increases)

---

##### Allosteric EC50 shift, X is log10(concentration)
The Allosteric EC50 shift model fits agonist dose–response curves measured at multiple fixed concentrations of an allosteric modulator (including a no-modulator control), when the agonist concentrations are entered as log₁₀ values. The modulator changes the apparent potency of the agonist without necessarily changing maximal efficacy, producing left- or right-shifts of the dose–response curves. By fitting all curves globally, the model estimates the agonist potency in the absence of modulator (logEC50), the modulator affinity for its site (logKB), and a cooperativity factor $$(logAlpha / α)$$ that quantifies how modulator binding alters agonist potency. Curves shift left when $$α>1$$ and shift right when $$α<1$$.


###### Equation
{: .no_toc }
<div id="allosteric-ec50-shift-logX"> \[ \begin{equation} \begin{alignedat}{2} \mathrm{EC50} &= 10^{\mathrm{logEC50}} \qquad & K_B &= 10^{\mathrm{logKB}} \\ \alpha &= 10^{\mathrm{logAlpha}} \qquad & \mathrm{Antag} &= \frac{1+\mathrm{Allo}/K_B}{1+\alpha\,\mathrm{Allo}/K_B} \\ \mathrm{LogEC} &= \log_{10}\!\left(\frac{\mathrm{EC50}}{\mathrm{Antag}}\right) \qquad & \end{alignedat} \end{equation} \] </div> <div id="allosteric-ec50-shift-logX-2"> \[ \begin{equation} Y=\mathrm{Bottom}+\frac{\mathrm{Top}-\mathrm{Bottom}}{1+10^{(\mathrm{LogEC}-X)\cdot \mathrm{HillSlope}}} \end{equation} \] </div>

(Here $$Allo$$ is the fixed modulator concentration for each curve.)

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/allosteric_ec50_shift_logX.png" alt="Allosteric EC50 shift, X is log10(concentration)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log₁₀-transformed agonist concentration ($$X = log_{10}(agonist)$$).. The dependent variable (Y) contains the measured response values. This is a global fit across multiple curves: each curve corresponds to a fixed modulator concentration ($$Allo$$). Provide one dataset with $$Allo=0$$ (no modulator) and additional datasets for each modulator level, using consistent concentration units throughout.

###### Parameters
{: .no_toc }
1. $$Top$$: The upper plateau of the inhibition curve (response with no inhibitor / very low inhibitor). Same units as $$Y$$.

1. $$Bottom$$: The lower plateau approached by the tested inhibitor at high concentrations (residual response). Same units as $$Y$$.

1. $$logEC50$$: The base-10 logarithm of the agonist concentration that produces half-maximal response in the absence of modulator.

1. $$HillSlope$$: Controls the steepness of the curve transition.

1. $$logKB$$: The base-10 logarithm of the equilibrium dissociation constant for the modulator binding to its allosteric site.

1. $$logAlpha$$: The base-10 logarithm of the cooperativity factor a:
     1. $$a = 1$$: no shift (modulator does not affect potency)
     1. $$a > 1$$: left shift (agonist becomes more potent; EC50 decreases)
     1. $$a < 1$$: right shift (agonist becomes less potent; EC50 increases)

---

##### Absolute IC/EC50, X is Concentration
The Absolute IC/EC50 (X is concentration) model fits an inhibitory/stimulatory dose–response curve when you want the IC50/EC50 defined relative to a fixed reference baseline rather than relative to the fitted Bottom plateau. In many assays, the “fully inhibited” level is determined by a standard inhibitor / positive control (or another external reference) and may not coincide with the Bottom plateau reached by the tested compound. This model therefore distinguishes between Bottom (the asymptote of the tested compound) and Baseline (the externally defined 100% inhibition reference). The fitted Absolute IC50 is the concentration at which the response falls halfway between Top (no inhibitor) and Baseline (maximal inhibition reference), while the rest of the curve (Top, Bottom, HillSlope) is fitted to the data.


###### Equation
{: .no_toc }
<div id="absolute-ic50-x"> \[ \begin{equation} \begin{alignedat}{2} \mathrm{Fifty} &= \frac{\mathrm{Top}+\mathrm{Baseline}}{2} \qquad & \\ \mathrm{Scale} &= \frac{\mathrm{Top}-\mathrm{Bottom}}{\mathrm{Fifty}-\mathrm{Bottom}}-1 \qquad & \end{alignedat} \end{equation} \] </div> <div id="absolute-ic50-x-2"> \[ \begin{equation} Y=\mathrm{Bottom}+\frac{\mathrm{Top}-\mathrm{Bottom}}{1+\left(\mathrm{Scale}\cdot\left(\frac{\mathrm{AbsoluteIC50}}{X}\right)\right)^{\mathrm{HillSlope}}} \end{equation} \] </div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/absolute_X.png" alt="Absolute IC/EC50, X is Concentration" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the concentration/dose on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units). This equation also requires the specification of one extra parameter:
1. $$Baseline$$: The response level corresponding to maximal inhibition defined by a standard control (e.g., a reference inhibitor). It is used to define “100% inhibition” for the purpose of computing Absolute IC50. Baseline must be provided by the user and is in the same units as $$Y$$.

###### Parameters
{: .no_toc }
1. $$Top$$: The upper plateau of the inhibition curve (response with no inhibitor / very low inhibitor). Same units as $$Y$$.

1. $$Bottom$$: The lower plateau approached by the tested inhibitor at high concentrations (residual response). Same units as $$Y$$.

1. $$AbsoluteIC50/AbsoluteEC50$$: The inhibitor/stimulation concentration that produces a response halfway between Top and Baseline.

1. $$HillSlope$$: Controls the steepness of the curve transition.

---

##### Absolute IC/EC50, X is log10(concentration)
The Absolute IC/EC50 (X is concentration) model fits an inhibitory/stimulatory dose–response curve when you want the IC50/EC50 defined relative to a fixed reference baseline rather than relative to the fitted Bottom plateau. In many assays, the “fully inhibited” level is determined by a standard inhibitor / positive control (or another external reference) and may not coincide with the Bottom plateau reached by the tested compound. This model therefore distinguishes between Bottom (the asymptote of the tested compound) and Baseline (the externally defined 100% inhibition reference). The fitted Absolute IC50 is the concentration at which the response falls halfway between Top (no inhibitor) and Baseline (maximal inhibition reference), while the rest of the curve (Top, Bottom, HillSlope) is fitted to the data. Here, $$X$$ is $$log_{10}(concentration)$$.


###### Equation
{: .no_toc }
<div id="absolute-ic50-logX-defs"> \[ \begin{equation} \begin{alignedat}{2} \mathrm{Fifty} &= \frac{\mathrm{Top}+\mathrm{Baseline}}{2} \qquad & \\ \mathrm{Shift} &= \log_{10}\!\left(\frac{\mathrm{Top}-\mathrm{Bottom}}{\mathrm{Fifty}-\mathrm{Bottom}}-1\right) \qquad & \end{alignedat} \end{equation} \] </div> <div id="absolute-ic50-logX-eq"> \[ \begin{equation} Y = \mathrm{Bottom} + \frac{\mathrm{Top}-\mathrm{Bottom}} {1+10^{\big((\mathrm{LogAbsoluteIC50}-X)\cdot \mathrm{HillSlope} + \mathrm{Shift}\big)}} \end{equation} \] </div>


###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/absolute_logX.png" alt="Absolute IC/EC50, X is log10(concentration)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed concentration/dose (i.e., $$𝑋 = log_{10}(concentration/dose)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units). This equation also requires the specification of one extra parameter:
1. $$Baseline$$: The response level corresponding to maximal inhibition defined by a standard control (e.g., a reference inhibitor). It is used to define “100% inhibition” for the purpose of computing Absolute IC50. Baseline must be provided by the user and is in the same units as $$Y$$.

###### Parameters
{: .no_toc }
1. $$Top$$: The upper plateau of the inhibition curve (response with no inhibitor / very low inhibitor). Same units as $$Y$$.

1. $$Bottom$$: The lower plateau approached by the tested inhibitor at high concentrations (residual response). Same units as $$Y$$.

1. $$LogAbsoluteIC50/LogAbsoluteEC50$$: The $$log_{10}(concentration)$$ that produces a response halfway between Top and Baseline.

1. $$HillSlope$$: Controls the steepness of the curve transition.

---




#### Receptor Binding

##### One Site -- Total
The One-site — Total binding model describes radioligand binding when the measured signal includes both specific binding to a single class of sites and nonspecific binding. Specific binding follows a one-site saturation isotherm and approaches a maximum capacity (Bmax) with increasing ligand concentration, with Kd equal to the ligand concentration that produces half-maximal specific binding. Nonspecific binding is assumed to increase linearly with ligand concentration, with slope NS, and an optional constant Background term accounts for baseline signal in the absence of added radioligand.


###### Equation
{: .no_toc }
<div id="oneSite_total">
\begin{equation}
Y = Bmax \frac{X}{K_d+X} + NS*X + Background
\end{equation}
</div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/oneSite_Total.png" alt="One Site -- Total" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Bmax$$: The shared baseline (offset) of the whole model. The predicted response starts from Dip, and then the two components (Section1 and Section2) add to it.

1. $$K_d$$: The equilibrium dissociation constant of the ligand–site interaction. It is the concentration at which the specific binding term reaches 50% of Bmax; lower $$K_d$$ indicates higher affinity.

1. $$NS$$: The slope of nonspecific binding, assuming nonspecific binding increases linearly with concentration

1. $$Background$$: A constant baseline offset in the measured signal (binding at $$X=0$$), representing instrument/counter background or residual signal not explained by specific or nonspecific binding.

---

##### One Site -- Total, accounting for ligand depletion
The One site — Total, accounting for ligand depletion model fits total radioligand binding when a non-negligible fraction of ligand becomes bound, so the free ligand concentration is lower than the amount added (i.e., ligand depletion). Unlike the simple one-site total binding model (which assumes free ≈ added), this formulation explicitly accounts for depletion by solving the binding relationship using a quadratic expression.

###### Equation
{: .no_toc }
<div id="one-site-depletion-1"> 
\begin{equation} 
\mathrm{K_dCPM} = \mathrm{K_dNm}\cdot \mathrm{Vol}\cdot 1000 \cdot \mathrm{SpecAct} \qquad 
\end{equation} 
</div> 
<div id="one-site-depletion-2"> 
\begin{equation} 
b = \mathrm{K_dCPM} + \mathrm{NS}\cdot \mathrm{K_dCPM} + X + 2X\cdot \mathrm{NS} + 
\mathrm{Bmax} 
\end{equation} 
</div> 
<div id="one-site-depletion-3"> 
\begin{equation} 
c = -1\cdot X\left(\mathrm{NS}\cdot \mathrm{K_dCPM} + X\cdot \mathrm{NS} + \mathrm{Bmax}\right) \qquad 
\end{equation} 
</div> 
<div id="one-site-depletion-4"> 
\[ \begin{equation} Y=\frac{-b+\sqrt{b^{2}-4ac}}{2a} \end{equation} \] 
</div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/oneSite_Total_depletion.png" alt="One Site -- Total" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units). This equation also requires the specification of two extra parameters:
1. $$SpecAct$$: The specific radioactivity (e.g., CPM per fmol). Used to convert concentrations into CPM units for the depletion calculation.
1. $$Vol$$: The reaction volume (e.g., mL). Also used in the concentration → CPM conversion for KdCPM.

###### Parameters
{: .no_toc }
1. $$Bmax$$: The maximum specific binding capacity for the saturable one-site component. In this model it is reported in CPM (same units as $$Y$$).

1. $$K_dNm$$: The equilibrium dissociation constant (affinity) in nM. It is the free-ligand concentration that produces half-maximal specific binding at equilibrium (lower $$K_d$$ ⇒ higher affinity). Internally it is converted to $$K_dCPM$$ using 
$$Vol$$ and $$SpecAct$$.

1. $$NS$$: TThe slope of nonspecific binding, assuming nonspecific binding increases linearly with ligand. Units are effectively CPM per CPM in this formulation because both $$X$$ and $$Y$$ are in CPM (practically: “how much nonspecific signal rises as added ligand increases”).

---

##### One Site -- Total and NonSpecific Binding
The One site —  total and nonspecific binding model is used when you have measured total binding and nonspecific binding as separate data sets (typically under the same radioligand concentrations). The model fits both curves simultaneously: specific binding is described by a one-site saturation isotherm ($$Bmax,K_d$$), while nonspecific binding is modeled as a linear function of radioligand concentration. Total binding is then modeled as the sum of specific and nonspecific binding. Fitting the two data sets together improves identifiability because the nonspecific component is estimated directly from the nonspecific dataset while still contributing to the total binding fit.

###### Equation
{: .no_toc }
<div id="one-site-total-ns"> 
\[ \begin{equation} 
\mathrm{Specific}(X) = \frac{\mathrm{Bmax}\,X}{\mathrm{Kd}+X} 
\end{equation} \]
\[ \begin{equation} \mathrm{Nonspecific}(X) = \mathrm{NS}\cdot X + \mathrm{Background} 
\end{equation} \] 
\[ \begin{equation}
\mathrm{Total}(X) = \mathrm{Specific}(X) + \mathrm{Nonspecific}(X) 
\end{equation} \] 
</div> 


<div id="one-site-total-ns-2"> 
\[ \begin{equation} \begin{aligned} Y_A = \mathrm{Total}(X) \quad
Y_B = \mathrm{Nonspecific}(X) \end{aligned} 
\end{equation} \]
 </div>

(Here $$Y_A$$ corresponds to the total-binding dataset and $$Y_B$$ corresponds to the nonspecific-binding dataset.)

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/oneSite_Total_And_NonSpecific.png" alt="One Site -- Total and NonSpecific Binding" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). This model requires two dependent-variable columns: one for total binding and one for nonspecific binding, both in consistent units. The two datasets must correspond to the same $$X$$ values (or overlapping $$X$$ ranges) so they can be fitted.

###### Parameters
{: .no_toc }
1. $$Bmax$$: The maximum specific binding capacity (the plateau of the saturable one-site component). Reported in the same units as the binding response $$Y$$.

1. $$K_d$$: The equilibrium dissociation constant (affinity), in the same units as 
$$X$$. It is the radioligand concentration that produces half-maximal specific binding. Lower $$K_d$$ indicates higher affinity.

1. $$NS$$: TThe slope of nonspecific binding, assuming nonspecific binding increases linearly with ligand. 

1. $$Background$$: A constant baseline offset for nonspecific binding (binding when $$X=0$$). Often represents counter/instrument background or residual signal.

---

##### One Site -- Specific Binding
The One site — Specific binding model describes binding to a single class of saturable sites after nonspecific binding has been removed from the data. Because only specific binding is analyzed, the response follows a simple one-site saturation isotherm that approaches a maximum (Bmax) as ligand concentration increases. The shape of the curve reflects reversible equilibrium binding, where binding rises steeply at low ligand concentrations and plateaus as receptors become saturated.

This model assumes that any nonspecific binding has already been subtracted (for example using a Remove Baseline analysis or by experimentally measuring and correcting for nonspecific binding). Consequently, the fitted curve represents only the receptor–ligand interaction, without a linear nonspecific component or background term.


###### Equation
{: .no_toc }
<div id="oneSite_specific">
\begin{equation}
Y =  \frac{BmaxX}{K_d+X}
\end{equation}
</div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/oneSite_specific.png" alt="One Site -- Specific Binding" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Bmax$$: The shared baseline (offset) of the whole model. The predicted response starts from Dip, and then the two components (Section1 and Section2) add to it.

1. $$K_d$$: The equilibrium dissociation constant of the ligand–site interaction. It is the concentration at which the specific binding term reaches 50% of Bmax; lower $$K_d$$ indicates higher affinity.

---

##### Two Sites -- Specific Binding
The Two sites — Specific binding model is used when the measured signal represents specific binding (i.e., nonspecific binding has already been removed) but the binding behavior cannot be explained by a single class of receptors. The model assumes there are two independent binding site populations (often interpreted as a high-affinity and a low-affinity site), each following a one-site saturation isotherm with its own capacity and affinity. The total specific binding is modeled as the sum of the two saturable components, producing a curve that can show an initially steep rise (high-affinity sites) followed by a broader approach to saturation (low-affinity sites).

###### Equation
{: .no_toc }
<div id="two-sites-specific"> 
\[ \begin{equation} 
\begin{alignedat}{2} \mathrm{Site}_\mathrm{Hi}(X) &= \frac{\mathrm{BmaxHi}\,*X}{\mathrm{KdHi}+X} \qquad & \mathrm{Site}_\mathrm{Lo}(X) &= \frac{\mathrm{BmaxLo}\,*X}{\mathrm{KdLo}+X} \\ 
\end{alignedat} 
\end{equation} \] 
</div> 
<div id="two-sites-specific-2"> 
\[ \begin{equation} Y = \mathrm{Site}_\mathrm{Hi}(X) + \mathrm{Site}_\mathrm{Lo}(X) \end{equation} \] 
</div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/twoSite_specific.png" alt="Two Sites -- Specific Binding" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$BmaxHi$$: The maximum specific binding capacity of the high-affinity site population (plateau contribution from that site). Reported in the same units as $$Y$$.

1. $$K_d^{Hi}$$: The equilibrium dissociation constant for the high-affinity site population, in the same units as $$X$$. It is the concentration that produces half-maximal binding for the high-affinity component . Lower $$K_d$$ indicates higher affinity.

1. $$BmaxLo$$: The maximum specific binding capacity of the low-affinity site population (plateau contribution from that site). Reported in the same units as $$Y$$.

1. $$K_d^{Lo}$$: The equilibrium dissociation constant for the low-affinity site population, in the same units as $$X$$. It is the concentration that produces half-maximal binding for the low-affinity component . Lower $$K_d$$ indicates higher affinity.

---

##### Allosteric Modulator Shift
The Allosteric Modulator Shift model describes radioligand binding to a single class of sites when an allosteric modulator is present at one or more fixed concentrations. Entire saturation binding curves are measured at each modulator level (including a no-modulator control). The model assumes the modulator binds to a distinct allosteric site and changes the apparent affinity of the radioligand via a cooperativity factor, $$α$$. By fitting all curves globally, the model estimates the radioligand affinity in the absence of modulator, the modulator’s affinity for its site, and how strongly modulator binding shifts radioligand binding.

###### Equation
{: .no_toc }
<div id="allosteric-modulator-shift"> 
\[ \begin{equation} 
\begin{alignedat}{2} \mathrm{Hot} &= X \qquad & \alpha &= 10^{\mathrm{Log}\alpha} \\ K_B &= 10^{\mathrm{Log}K_B} \qquad & K_{\mathrm{App}} &= K_{d,\mathrm{Hot}}\, \frac{1+\mathrm{Allo}/K_B}{1+\alpha\,\mathrm{Allo}/K_B} \end{alignedat} \end{equation} \] 
</div> 

<div id="allosteric-modulator-shift-2"> 
\[ \begin{equation} 
Y=\frac{\mathrm{Bmax}\cdot \mathrm{Hot}}{\mathrm{Hot}+K_{\mathrm{App}}} 
\end{equation} \] 
</div>

(Here, $$Allo$$ is the fixed modulator concentration for a given curve/column.)

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/AllostericModulatorShift.png" alt="Allosteric Modulator Shift" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The dependent variables (Y) should contain specific binding values.
This is a global fit across multiple curves: each curve corresponds to a fixed allosteric modulator concentration ($$Allo$$). Provide one column for the no-modulator control and additional columns for binding measured at each modulator level. The modulator concentrations must be specified consistently (same units as $$KB$$); 

###### Parameters
{: .no_toc }
1. $$Bmax$$: The maximum specific binding capacity (plateau) of the radioligand saturation curve. Reported in the same units as $$Y$$.

1. $$K_{d,Hot}$$: The equilibrium dissociation constant of the radioligand in the absence of modulator, in the same units as $$X$$. It is the radioligand concentration that gives half-maximal binding when $$Allo=0$$.

1. $$K_B$$: The equilibrium dissociation constant of the allosteric modulator for its allosteric site (affinity of the modulator). It is in the same molar units used for $$Allo$$. Smaller $$K_B$$ indicates tighter modulator binding. 

1. $$alpha$$: The cooperativity (ternary complex) factor that quantifies how modulator binding changes radioligand affinity.
     1. $$αlpha=1$$: no shift (modulator does not change radioligand affinity)
     1. $$αlpha < 1$$: apparent affinity of radioligand decreases (curve shifts right; less binding at a given $$X$$).
     1. $$alpha > 1$$: apparent affinity of radioligand increases (curve shifts left; more binding at a given $$X$$).

---

##### Specific Binding with Hill Slope
The Specific binding with Hill slope model extends the one-site specific binding isotherm by allowing the curve’s steepness to vary through a Hill coefficient. It is used when nonspecific binding has already been removed and you are fitting specific binding only, but the transition from low to high binding is steeper or shallower than expected for simple 1:1 mass-action binding. The Hill slope ($$h$$) provides an empirical way to capture apparent cooperativity or heterogeneity in binding behavior, while still estimating the binding capacity (Bmax) and the concentration scale parameter (Kd).

###### Equation
{: .no_toc }
<div id="specific-binding-hill"> 
\[ \begin{equation} 
\begin{alignedat}{2} 
Y &= \frac{\mathrm{Bmax}\,X^{h}}{\mathrm{Kd}^{h}+X^{h}} \qquad & 
\end{alignedat} \end{equation} \]
 </div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/specificBindingHillSlope.png" alt="Specific Binding with Hill Slope" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be on a linear scale and therefore must be strictly positive $$(X>0)$$. Zero or negative X values are not used in the calculations (they are ignored/excluded). The dependent variable ($$Y$$) should contain specific binding values in consistent units, with any nonspecific binding removed prior to fitting.

###### Parameters
{: .no_toc }
1. $$Bmax$$: The maximum specific binding capacity of the high-affinity site population (plateau contribution from that site). Reported in the same units as $$Y$$.

1. $$K_d$$: The concentration scale parameter in the same units as $$X$$. When $$h=1$$, $$K_d$$ is the equilibrium dissociation constant and equals the ligand concentration that yields half-maximal specific binding. When $$h
\neq 1$$, $$K_d$$ still sets the concentration range where the curve transitions, but its strict mechanistic interpretation as a true dissociation constant depends on why $$h$$ differs from 1.

1. $$h$$: Controls the steepness of the binding curve: 
     1. $$h=1$$: classic one-site binding (no cooperativity)
     1. $$h>1$$: steeper, more sigmoidal transition (often associated with positive cooperativity or multiple interacting sites)
     1. $$0<h<1$$: shallower transition (often consistent with site heterogeneity or negative cooperativity)

---

##### One site - Fit Ki, X is log10(competitor)
The One site — Fit Ki model is used in competition binding experiments to estimate the affinity ($$K_i$$) of an unlabeled competitor ligand. Binding of a fixed concentration of radioligand is measured while increasing concentrations of the competitor are added. As competitor concentration increases, radioligand binding decreases in a sigmoidal manner when plotted versus the log10 competitor concentration. The model fits this inhibition curve and converts the fitted midpoint to $$K_i$$ using the Cheng–Prusoff relationship, accounting for the radioligand concentration and its $$K_d$$.

###### Equation
{: .no_toc }
<div id="one-site-fit-ki"> 
\[ \begin{equation} 
\begin{alignedat}{2} 
\mathrm{LogEC50} &= \log_{10}\!\Big(10^{\mathrm{log}K_i}\big(1+\frac{\mathrm{HotNM}}{\mathrm{HotKdNM}}\big)\Big) \qquad & \\ Y &= \mathrm{Bottom} + \frac{\mathrm{Top}-\mathrm{Bottom}}{1+10^{(X-\mathrm{LogEC50})}} \qquad & 
\end{alignedat} 
\end{equation} \] 
</div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/oneSite_fitKi.png" alt="One site - Fit Ki, X is log10(competitor)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed competitor concentration (i.e., $$𝑋 = log_{10}(competitor)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units). This equation also requires the specification of two extra parameters:

1. $$HotNM$$: The concentration of radioligand used in the experiment (in nM). It is constant across the dataset.

1. $$HotKdNM$$: The equilibrium dissociation constant ($$K_d$$) of the radioligand (in nM). Used to convert the fitted midpoint to $$K_i$$.

###### Parameters
{: .no_toc }
1. $$Top$$: The upper plateau of the curve (binding when competitor is very low/absent). Reported in the same units as $$Y$$.

1. $$Bottom$$: The lower plateau of the curve (residual binding at very high competitor concentrations). Reported in the same units as $$Y$$.

1. $$logK_i$$: The base-10 logarithm of the competitor affinity. It is the primary fitted affinity parameter reported on a log scale.

---

##### One site - Fit LogIC50, X is log10(competitor)
The One site — Fit Ki model is used in competition binding experiments to estimate the affinity ($$K_i$$) of an unlabeled competitor ligand. Binding of a fixed concentration of radioligand is measured while increasing concentrations of the competitor are added. As competitor concentration increases, radioligand binding decreases in a sigmoidal manner when plotted versus the log10 competitor concentration. The model fits this inhibition curve and converts the fitted midpoint to $$K_i$$ using the Cheng–Prusoff relationship, accounting for the radioligand concentration and its $$K_d$$.

###### Equation
{: .no_toc }
<div id="one-site-fit-logic50"> 
\[ \begin{equation} 
\begin{alignedat}{2} Y &= \mathrm{Bottom} + \frac{\mathrm{Top}-\mathrm{Bottom}}{1+10^{(X-\mathrm{LogIC50})}} \qquad & 
\end{alignedat} 
\end{equation} \] 
</div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/oneSite_fitLogIC50.png" alt="One site - Fit LogIC50, X is log10(competitor)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed competitor concentration (i.e., $$𝑋 = log_{10}(competitor)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Top$$: The upper plateau of the curve (binding when competitor is very low/absent). Reported in the same units as $$Y$$.

1. $$Bottom$$: The lower plateau of the curve (residual binding at very high competitor concentrations). Reported in the same units as $$Y$$.

1. $$LogIC50$$: The base-10 logarithm of the competitor concentration that reduces binding to halfway between $$Top$$ and $$Bottom$$. Lower $$LogIC50$$ (or $$IC50$$) values indicate higher competitor potency.

---

##### Two sites - Fit Ki, X is log10(competitor)
The Two sites — Fit Ki model is used in competition binding experiments when the radioligand (or receptor population) exhibits two binding site classes (typically high- and low-affinity). Binding is measured at a fixed radioligand concentration while increasing concentrations of an unlabeled competitor are added, with $$X$$ entered as the log10 competitor concentration. The curve is fit as the sum of two sigmoidal inhibition components, weighted by the fraction of sites in the high-affinity class. The fitted midpoints are converted to two $$K_i$$ values (high and low) using a Cheng–Prusoff–style adjustment that accounts for radioligand concentration and the radioligand $$K_d$$ for each site class.

###### Equation
{: .no_toc }
<div id="two-sites-fit-ki"> 
\[ \begin{equation} 
\begin{alignedat}{2} 
\mathrm{LogEC50}_{\mathrm{Lo}} &= \log_{10}\!\Big(10^{\mathrm{log}K_{i,\mathrm{Lo}}}\big(1+\frac{\mathrm{HotNM}}{\mathrm{HotKdNM}_{\mathrm{Lo}}}\big)\Big) \qquad & \mathrm{LogEC50}_{\mathrm{Hi}} &= \log_{10}\!\Big(10^{\mathrm{log}K_{i,\mathrm{Hi}}}\big(1+\frac{\mathrm{HotNM}}{\mathrm{HotKdNM}_{\mathrm{Hi}}}\big)\Big) \\ \mathrm{Span} &= \mathrm{Top}-\mathrm{Bottom} \qquad & \mathrm{Part}_1 &= \frac{\mathrm{FractionHi}\cdot \mathrm{Span}}{1+10^{(X-\mathrm{LogEC50}_{\mathrm{Hi}})}} \\ \mathrm{Part}_2 &= \frac{(1-\mathrm{FractionHi})\cdot \mathrm{Span}}{1+10^{(X-\mathrm{LogEC50}_{\mathrm{Lo}})}} \qquad & 
\end{alignedat} 
\end{equation} \] 
</div>
<div id="two-sites-fit-ki-2"> 
\[ \begin{equation} Y=\mathrm{Bottom}+\mathrm{Part}_1+\mathrm{Part}_2 \end{equation} \] 
</div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/twoSites_fitKi.png" alt="Two sites - Fit Ki, X is log10(competitor)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed competitor concentration (i.e., $$𝑋 = log_{10}(competitor)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units). This equation also requires the specification of three extra parameters:

1. $$HotNM$$: Radioligand concentration used in the experiment (nM), constant across the dataset.

1. $$HotKdNM_{Hi},HotKdNM_{Lo}$$: Radioligand $$K_d$$ values (nM) for the high- and low-affinity site classes. Used in the Cheng–Prusoff adjustment that links $$IC50$$ midpoints to $$K_i$$.

###### Parameters
{: .no_toc }
1. $$Top$$: The upper plateau of the curve (binding when competitor is very low/absent). Reported in the same units as $$Y$$.

1. $$Bottom$$: The lower plateau of the curve (residual binding at very high competitor concentrations). Reported in the same units as $$Y$$.

1. $$FractionHi$$: The fraction of binding sites (or binding component) that follow the high-affinity competitor interaction. Constrained to $$ 0≤FractionHi≤1 $$. The low-affinity fraction is $$1−FractionHi$$.

1. $$logK_i^{Hi}, logK_i^{Lo}$$: Base-10 logarithms of the competitor affinities for the high- and low-affinity site classes.

---

##### Two sites - Fit LogIC50, X is log10(competitor)
The Two sites — Fit logIC50 model is used for competition binding experiments when the data suggest two distinct classes of binding sites (or binding components) with different affinities for the competitor. Binding is measured at a fixed radioligand concentration while increasing concentrations of unlabeled competitor are added, with $$X$$ entered as the log₁₀ competitor concentration. The observed inhibition curve is modeled as the sum of two logistic components, each with its own midpoint (logIC50), weighted by the fraction of sites belonging to the high-affinity class. Unlike the “Fit Ki” version, this model does not convert midpoints to $$K_i$$; instead, it directly estimates two empirical logIC50 values that describe where each component is half-inhibited.

###### Equation
{: .no_toc }
<div id="two-sites-fit-logic50"> 
\[ \begin{equation} 
\begin{alignedat}{2} \mathrm{Span} &= \mathrm{Top}-\mathrm{Bottom} \qquad & \\ \mathrm{Part}_1 &= \frac{\mathrm{FractionHi}\cdot \mathrm{Span}} {1+10^{(X-\mathrm{LogIC50}_{\mathrm{Hi}})}} \qquad & \mathrm{Part}_2 = \frac{(1-\mathrm{FractionHi})\cdot \mathrm{Span}} {1+10^{(X-\mathrm{LogIC50}_{\mathrm{Lo}})}} 
\end{alignedat} 
\end{equation} \] 
</div> 
<div id="two-sites-fit-logic50-2"> 
\[ \begin{equation} Y = \mathrm{Bottom} + \mathrm{Part}_1 + \mathrm{Part}_2 
\end{equation} \] 
</div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/twoSites_fitLogIC50.png" alt="Two sites - Fit LogIC50, X is log10(competitor)" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed competitor concentration (i.e., $$𝑋 = log_{10}(competitor)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units).

###### Parameters
{: .no_toc }
1. $$Top$$: The upper plateau of the curve (binding when competitor is very low/absent). Reported in the same units as $$Y$$.

1. $$Bottom$$: The lower plateau of the curve (residual binding at very high competitor concentrations). Reported in the same units as $$Y$$.

1. $$FractionHi$$: The fraction of binding sites (or binding component) that follow the high-affinity competitor interaction. Constrained to $$ 0≤FractionHi≤1 $$. The low-affinity fraction is $$1−FractionHi$$.

1. $$LogIC50_{Hi}, LogIC50_{Lo}$$: Base-10 logarithms of the $$log_{10}(concentration)$$ that inhibits half of the high/low-affinity component.

---

##### One site - Homologous
The One site — Homologous model is used in competition binding experiments where the labeled and unlabeled ligands are assumed to have identical affinity for the same single class of receptors (i.e., they are chemically identical or behave equivalently at the binding site). Binding of a fixed concentration of radioligand is measured while increasing concentrations of the unlabeled (cold) ligand are added, with $$X$$ entered as the $$log_{10}$$ competitor concentration. Because both ligands are assumed to share the same $$K_d$$, the analysis allows you to estimate a single common affinity along with Bmax and a linear nonspecific component.

###### Equation
{: .no_toc }
<div id="one-site-homologous"> 
\[ \begin{equation} 
\begin{alignedat}{2} \mathrm{ColdNM} &= 10^{X} \qquad \text{(cold competitor in nM)} \\ \mathrm{KdNM} &= 10^{\mathrm{LogKd}} \qquad \text{(shared affinity in nM)} 
\end{alignedat} 
\end{equation} \] 
</div>

<div id="one-site-homologous-2"> 
\[ \begin{equation} 
Y = \frac{\mathrm{Bmax}\cdot \mathrm{HotNM}} {\mathrm{HotNM}+\mathrm{ColdNM}+\mathrm{KdNM}} + \mathrm{Bottom} 
\end{equation} \] 
</div>

(Here HotNM is the fixed radioligand concentration for a given curve, and ColdNM is the competitor concentration derived from $$X=log_{10}(competitor)$$.)

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/oneSite_homologous.png" alt="One site - Homologous" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed competitor concentration (i.e., $$𝑋 = log_{10}(competitor)$$). The model also requires at lease one column containing the dependent variable (Y) response values (in any consistent units). You must provide the radioligand concentration (HotNM) for each curve. Using at least two different radioligand concentrations is recommended for more reliable estimation of $$K_d, Bmax$$, and nonspecific binding.

###### Parameters
{: .no_toc }
1. $$LogKd$$: The base-10 logarithm of the equilibrium dissociation constant shared by both labeled and unlabeled ligand.

1. $$Bmax$$: The maximum binding capacity of the receptor system (same units as $$Y$$). It represents binding when receptors are saturated with ligand.

1. $$NS$$: A constant baseline representing nonspecific binding (or residual signal). It is effectively the binding observed at very high competitor concentrations and is reported in the same units as $$Y$$.
Conceptually, this reflects the fraction of radioligand that binds nonspecifically rather than to receptors.

---

##### One Site -- Heterologous with depletion
The One Site — Heterologous with depletion model is used for competition binding experiments when a substantial fraction of the added radioligand becomes bound, so the free radioligand concentration is meaningfully lower than the amount added (ligand depletion). In this setting, the usual competition model (which assumes free ≈ added) can bias affinity estimates. This depletion-aware formulation uses the experimental design constants (radioligand amount in CPM, radioligand $$K_d$$, specific activity, and reaction volume) to correct for depletion and fit the competition curve accordingly.Because the method relies on comparing added ligand and bound ligand in the same CPM units, it is intended for radioactive ligands and is generally not applicable to fluorescent ligand formats.

###### Equation
{: .no_toc }
<div id="one-site-heterologous-depletion"> 
\[ \begin{equation}
 \begin{alignedat}{2} \mathrm{KdCPM} &= \mathrm{KdNM}\cdot \mathrm{SpAct}\cdot \mathrm{Vol}\cdot 1000 \qquad & \\ R &= \mathrm{NS}+1 \qquad & S &= 1+10^{(X-\mathrm{Log}K_i)}\cdot \mathrm{KdCPM} + \mathrm{Hot} \\ a &= -1\cdot R \qquad & b &= R\cdot S + R\cdot \mathrm{Hot} + \mathrm{Bmax} \\ c &= -1\cdot \mathrm{Hot}\,(S\cdot \mathrm{NS} + \mathrm{Bmax}) \qquad & 
 \end{alignedat} 
 \end{equation} \] 
 </div> 
 <div id="one-site-heterologous-depletion-2"> 
 \[ \begin{equation} Y=\frac{-b+\sqrt{b^{2}-4ac}}{2a} 
 \end{equation} \] 
 </div>

###### Visualization
{: .no_toc }
<div style="text-align: center;">
<img src="images/Curve Fitting/oneSite_heterologous.png" alt="One Site -- Heterologous with depletion" width="400" height="300" class="img-responsive">
</div>

###### Input 
{: .no_toc }
The independent variable (X) must be the log10-transformed competitor concentration (i.e., $$𝑋 = log_{10}(competitor)$$). The model also requires a column containing the dependent variable (Y) response values (in any consistent units). This equation also requires the specification of three extra parameters:

1. $$Hot$$: The amount/concentration of radioligand used for the experiment, expressed in CPM (constant across the dataset).

1. $$KdNM$$: The radioligand equilibrium dissociation constant in nM.

1. $$SpAct$$: Specific radioactivity (e.g., CPM per fmol), used to convert concentration units into CPM units.

1. $$Vol$$: Reaction volume (e.g., mL), used in the concentration → CPM conversion for $$KdCPM$$.

###### Parameters
{: .no_toc }
1. $$LogKi$$: The base-10 logarithm of the competitor affinity.

1. $$Bmax$$: The maximum specific binding capacity (in CPM) corresponding to saturable receptor binding. Because it represents total receptor capacity, it is typically higher than the observed “Top” of an inhibition curve.

1. $$NS$$: The nonspecific binding fraction (or proportionality factor) describing the portion of radioligand signal attributable to nonspecific binding sites under this CPM-based formulation.

---

## Lethal Concentration/Dose (LCx/LDx)
In this context, LCx/LDx analysis refers to estimating the concentration (LCx) or dose (LDx) that produces a specified proportion $$x%$$ of “response” (typically mortality) in a population. Unlike the nonlinear least-squares models above, LCx/LDx models are naturally formulated as a binomial-response problem: each observation represents $$y_i$$ affected individuals out of $$n_i$$ tested at a given concentration/dose $$X_i$$. The probability of response, $$p_i$$, is modeled using a generalized linear model (GLM) with a probit link:

<div id="lcx-generic"> 
\[ \begin{equation} 
y_i \sim \mathrm{Binomial}(n_i, p_i) \end{equation} \] 
</div> 
<div id="lcx-probit"> 
\[ \begin{equation} \Phi^{-1}(p_i)=\eta_i=\beta_0+\beta_1\,g(X_i) 
\end{equation} \] 
</div> 
where $$\Phi^{-1}(\cdot)$$ is the inverse standard normal CDF (the **probit** link), $$\eta_i$$ is the linear predictor, $$\beta_0,\beta_1$$ are regression coefficients, and $$g(X)$$ is the chosen predictor scale (commonly $$\log_{10}(X)$$ for dose/concentration–response).

Once $$\beta_0$$ and $$\beta_1$$ are estimated, the LCx/LDx value is obtained by solving for the $$X$$ that yields $$ p = x/100$$. Let $$z_x = \Phi^{-1}(x/100)$$. Then:

<div id="lcx-solve"> 
\[ \begin{equation}
 z_x=\beta_0+\beta_1\,g(LC_x)\quad\Rightarrow\quad g(LC_x)=\frac{z_x-\beta_0}{\beta_1} 
 \end{equation} \] 
 </div> 
 and $$LC_x$$ (or $$LD_x$$) is found by applying the inverse of $$g(\cdot)$$ (e.g., exponentiating if $$g(X)=\log_{10}(X)$$). This framework is preferred for lethal endpoints because it explicitly models **probabilities**, respects the **0–1 bounds**, and correctly handles the fact that variance depends on $$p_i$$ and $$n_i$$, rather than assuming constant-variance residuals.

To fit probit GLMs, Isalos uses the generalized linear model routine with parameters estimated by the Newton–Raphson method. Newton–Raphson updates the coefficient vector by repeatedly using the gradient and curvature of the log-likelihood to move toward the maximum-likelihood solution. This approach is standard for GLMs because it is efficient, converges rapidly for well-behaved datasets, and provides the estimated coefficient covariance matrix needed for uncertainty quantification.

After fitting, uncertainty can be reported either on the regression coefficients  or directly on derived quantities such as LC50/LD50. Symmetrical confidence intervals are computed from the approximate normality of the maximum-likelihood estimates (Wald-type intervals).

Fit your data using the Lethal Concentration/Dose (LCx/LDx) function by browsing in the top ribbon:

| `Statistics` $$\rightarrow$$ `Curve Fitting` $$\rightarrow$$ `Lethal Concentration/Dose (LCx/LDx)` |

### Input
{: .no_toc }
Numerical values should be specified in the input datasheet. The design for  Lethal Concentration/Dose (LCx/LDx) requires at least three numerical columns in the input sheet: one column representing the independent variable, one column corresponding to the number of trials performed with the specified concentration/dose and one column with the number of successes. Columns with empty cells cannot be inculded in the analysis. Each row represents a single observation.

### Configuration
{: .no_toc }

|**Concentration/Dose Column**| Select the column that contains the independent variable (applied concentration or dose). |
|**Trials Column**| Select the column that indicates the total number of individuals/units tested at each concentration or dose. |
|**Successes Column**| Select the column that indicates the number of observed lethal responses at each concentration or dose. |
|**Logarithmize Concentration/Dose Column**| Enable this option to transform the concentration/dose values using a base-10 logarithm, which is commonly used to stabilize variance and linearize the probit relationship.|
|**Logarithm Base**| Choose the base used for the logarithmic transformation of the concentration/dose column (default is base 10). |
|**Lethal Effect (%)**| Specify the target effect level (e.g., 50% for LC50/LD50) for which the corresponding concentration or dose will be estimated. |
|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |

### Output
{: .no_toc }
The output spreadsheet contains three tables:
1. Lethal Concentration/Dose Estimation Table: contains the estimate for the lethal concentration/dose at the specified user percentage alongside its confidence interval.
1. Parameter Estimates Table: includes the estimated coefficients. Each row corresponds to a predictor and includes its coefficient, standard error, confidence interval, test statistic, degrees of freedom, and p-value.
1. Goodness of Fit: includes statistical measures that assess how well the model fits the data, such as Deviance, Log-Likelihood, AIC, BIC, and related metrics.

In addition, a pop-up window displays a plot of the fitted curve overlaid with the experimental data points.

### Example
{: .no_toc }

#### Input
{: .no_toc }
In the input datasheet the requirement is to specify at least three numerical columns and insert the appropriate data, as shown below.
<div style="text-align: center;">
<img src="images/Curve Fitting/lcld_input.png" alt="LCx/LDx-input" width="400" height="300" class="img-responsive">
</div>

#### Configuration
{: .no_toc }
1. Select  `Statistics` → `Curve Fitting` → `Lethal Concentration/Dose (LCx/LDx)`.
1. Select the column that corresponds to the `Concentration/Dose Column`[1]. 
1. Select the column that corresponds to the `Trials Column`[2]. 
1. Select the column that corresponds to the `Successes Column`[3]. 
1. Select/tick if you wish to `Logarithmize Concentration/Dose Column` before fitting [4].
1. If the logaritmize option is selected, specify the `Logarithm Base`[5] for the transformation.
1. Specify the `Lethal Effect Level (%)`[6]  for which the corresponding concentration or dose will be estimated.
1. Specify the `Confidence Level (%)`[7] for tests.
1. Click on the `Execute` button [8] to perform the Non Linear Curve Fitting method.
<div style="text-align: center;">
<img src="images/Curve Fitting/lcld_config.png" alt="LCx/LDx-config" width="400" height="300" class="img-responsive">
</div>

#### Output
{: .no_toc }
The lethal concentration/dose estimates, parameter estimates and goodness of fit tables are shown in the output spreadsheet and the line chart showcasing the fitted curve and the experimental points is shown in a separate window.
<div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
  <img src="images/Curve Fitting/lcld_output.png"
       alt="LCx/LDx-output"
       style="max-width:350px; width:100%; height:auto;"
       class="img-responsive">

  <img src="images/Curve Fitting/lcld_output_plot.png"
       alt="LCx/LDx-output-plot"
       style="max-width:350px; width:100%; height:auto;"
       class="img-responsive">
</div>

---
 

## References {#references-distributions}
1. Vetterling, William T., and William H. Press. Numerical recipes: example book C. Cambridge University Press, 1992.
1. Glantz, Stanton A., Bryan K. Slinker, and Torsten B. Neilands. "Primer of applied regression & analysis of variance." (No Title) (1990).


---

## Version History
Introduced in Isalos Analytics Platform  v2.1.0

_Instructions last updated on January 2025_
