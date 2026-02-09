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
with $$w_i = 1$$ for ordinary least squares or user-defined/variance-based weights for weighted least squares.

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

### Available Models
#### Dose-Response
##### Bell-shaped, X is log10(concentration)
{: .no_toc }
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

##### Bell-shaped, X is Concentration
{: .no_toc }
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

#### Receptor Binding

##### One Site -- Total
{: .no_toc }
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
{: .no_toc }
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
{: .no_toc }
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
{: .no_toc }
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
{: .no_toc }
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
{: .no_toc }
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



## Lethal Concentration/Dose (LCx/LDx)


---
 

## References {#references-distributions}
1. Vetterling, William T., and William H. Press. Numerical recipes: example book C. Cambridge University Press, 1992.
1. Glantz, Stanton A., Bryan K. Slinker, and Torsten B. Neilands. "Primer of applied regression & analysis of variance." (No Title) (1990).


---

## Version History
Introduced in Isalos Analytics Platform  v2.1.0

_Instructions last updated on January 2025_
