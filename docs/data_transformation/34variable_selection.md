---
layout: default
title: 3.4 Variable Selection
parent: 3. Data Transformation
nav_order: 4
permalink: /variable-selection.html
---

# Variable Selection
{: .no_toc }
Variable Selection, also referred to as feature selection, is a process that confronts the problem of identifying and selecting the most relevant variables from the overall set of available variables. This crucial aspect of machine learning plays a significant role in improving model performance, reducing overfitting and enhancing interpretability by focusing on the most meaningful data. By eliminating irrelevant or redundant variables, variable selection not only simplifies the model’s structure but also reduces computational complexity, paving the way for faster training times and better generalization to unseen data.

Variable selection methods are generally split into the following subcategories:

* The "filter" approaches: 
These methods select variables based on _a priori_ information provided by the analyst, such as the Signal-to-Noise ratio or other statistical measures, irrespective of the machine learning algorithms used. They are, generally, computationally inexpensive and easy to implement but since they operate independently, they might miss data interactions that could be important for prediction.

* The "wrapper" approaches: 
These methods evaluate the machine learning model’s performance on different subsets of variables. The evaluation is performed using a validation set, if available, or through cross-validation techniques to assess the model’s predictive accuracy. The wrapper methods consider how each feature influences the model, and they can be adapted to different model types and evaluation metrics, but using such methods is computationally expensive and may lead to overfitted models.


<!--A key step during model development is the feature selection. The main goal of this step is to exclude from further analysis noisy variables that may lead to over-fitting phaenomena. By reducing the data space, the modelling computational time is also reduced, and the predictive performance is improved.<sup>[1,2](#references-variable-selection)</sup>-->

## Table of contents
{: .no_toc .text-delta }


1. TOC
{:toc}

---


## Best First
The Best First algorithm is a "wrapper" method used for feature selection, where subsets of features are evaluated using an evaluation function ($f(x)$). Each feature subset is represented as a node in a tree. Depending on the algorithm's direction (forward, backward, or bidirectional), the children (neighboring subsets) of each node are generated accordingly through a process called expansion. 

At each step of the algorithm, two lists are maintained:

* OPEN: Contains subsets of features that have been generated but not yet expanded.
* CLOSED: Contains subsets that have already been expanded.

The algorithm proceeds as follows: At each iteration the best evaluation value is selected from the OPEN list and the respective subset is transferred to the CLOSED list after being expanded to generate its neighbors. Then each neighbor is evaluated using $f(x)$ and compared to the current best subset. If any of the neighbors has a better evaluation value than the current best, then the current best is updated. All of the neighbors generated during expansion are added to the OPEN list.

The algorithm terminates when there are k consecutive expansions where no improvement to the best subset is observed. The parameter k is a user-defined input that determines the stopping criterion (`#Nodes before termination`).

The initialization of the algorithm and the expansion process depend on the selected direction: 

* Forward Direction: The algorithm starts with the empty feature set and when expanding a subset, its neighbors are subsets that include all features of the current subset plus an additional feature.
* Backward Direction: The algorithm starts with the full feature set and when expanding a subset, its neighbors are subsets that include all features of the current subset except one.
* Bidirectional Direction: The algorithm starts with the empty feature set and when expanding a subset, neighbors are generated based on both forward and backward directions.

The evaluation function ($f(x)$) used in Isalos’ implementation of the algorithm is a metric called Merit which is computed as: 

<div id="eq. merit">
$$
\begin{equation}
{\text{Merit}_s = \frac{k \, \overline{r_{cf}}}{\sqrt{k + k(k-1) \, \overline{r_{ff}}}}} {\qquad [1] \qquad}
\end{equation}
$$
</div>

Where the subset $S$ contains $k$ features, $\overline{r_{cf}}$ is the average feature-class correlation and $\overline{r_{ff}}$ the average feature-feature intercorrelation: 

<div id="eq. correlations">
$$
\begin{equation}
\overline{r_{cf}} = \frac{1}{k} \sum_{i=1}^k r_{f_i y} {\qquad [2], \qquad} 
\overline{r_{ff}} = \frac{2}{k(k-1)} \sum_{i=1}^{k-1} \sum_{j=i+1}^k r_{f_i f_j} {\qquad [3] \qquad}
\end{equation}
$$
</div>

Here $r_{f_i y}$ is the correlation between variable $i$ and the response variable and $r_{f_i f_j}$ is the correlation between variables $i$ and $j$.

The numerator of this metric ([Eq. 1](#eq. merit)) can be interpreted as an indication of how predictive a group of features is while the denominator showcases how much redundancy there is among the features.

Use the `Best First` variable selection by browsing in the top ribbon: 

| Data Transformation $$\rightarrow$$ Variable Selection $$\rightarrow$$ Best First |

### Input
{: .no_toc }
The data input should consist of numerical instances, without any missing values. There are no inherent limitations on the number of columns or rows. 

### Configuration
{: .no_toc }

|**Target Column**| Choose the column that corresponds to the response variable. |
|**Select Direction**| Select any of the three available options (`forward`, `backward`, `bidirectional`) to adjust the initialization and the expansion process of the algorithm. |
|**#Nodes before termination**| Insert the `#Nodes before termination` to specify a stopping criterion for the algorithm. Acceptable values are only integers larger than 0. |

### Output
{: .no_toc }
Once the algorithm is completed, the output spreadsheet will be simplified to contain only two elements: the response variable and the best subset of features selected by the algorithm. These features represent the most relevant variables for predicting the response, as determined by the variable selection process.

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data.

<div style="text-align: center;">
<img src="images/Variable Selection/best-first-input.png" alt="Best First input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. Select `Data Transformation` $$\rightarrow$$ `Variable Selection`  $$\rightarrow$$ `Best First`
1. Select the column that corresponds to the response variable as the `Target Column` [1]. 
1. Select one of the three available options for `Select Direction` [2] to specify the initialization and expansion process of the algorithm.
1. Select `#Nodes before termination`  to specify the stopping criterion of the algorithm [3].
1. Click on the `Execute` button [4] to apply the methodology. 

<div style="text-align: center;">
<img src="images/Variable Selection/best-first-configuration.svg" alt="Best First configuration" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
The output data of the calculation is presented in the right-hand spreadsheet of the tab. It shows the dataset after the completion of Variable selection, meaning that it contains the response variable and the best subset of features selected by the algorithm.

<div style="text-align: center;">
<img src="images/Variable Selection/best-first-output.png" alt="Best First output" width="300" height="200" class="img-responsive">
</div>

---

## Stepwise
Stepwise methods are “wrapper” methods used for regression models that analyze the significance of additional variables in a model, meaning that they compare the sum of squares of two models that differ only on the inclusion of one variable and decide whether the extra sum of squares is large enough to justify the inclusion of the additional value.

Consider the two models: 

<div id="eq. model1">
$$
\begin{equation}
\text{Model 1 (M}_1\text{):} \quad y = b_0 + b_1 x_1 + \dots + b_k x_k 
\end{equation}
$$
</div>

<div id="eq. model2">
$$
\begin{equation}
\text{Model 2 (M}_2\text{):} \quad y = b_0 + b_1 x_1 + \dots + b_k x_k + b_{k+1} x_{k+1}
\end{equation}
$$
</div>

We denote the sum of squares due to regression as: 

<div id="eq. SSreg">
$$
\begin{equation}
S_1 = SS_{\text{reg}}(b_0, \dots, b_k), \quad S_2 = SS_{\text{reg}}(b_0, \dots, b_k, b_{k+1})
\end{equation}
$$
</div>

for models $M_1$ and $M_2$ respectively. The extra sum of squares due to the inclusion on $x_{k+1}$ is defined as $S_2 - S_1 = RSS_1 - RSS_2$, where $RSS$ is the residual sum of squares for each model. To test if the difference in the sum of squares is significant we estimate the variance as

<div id="eq. sigma">
$$
\begin{equation}
\hat{\sigma}^2 = \frac{RSS_2}{N - (k + 1 + 1)} {\qquad [4] \qquad}
\end{equation}
$$
</div>

and it can be shown that the test statistic $\frac{RSS_1-RSS_2}{\hat{\sigma}^2}$  follows the $F(1,N-(k+2))$ distribution which can be used to test whether the difference in sum of squares is statistically significant and therefore if the variable should be added to the model or not.

According to which method is chosen (Forward Selection, Backward Elimination) the algorithm proceeds as follows: 

* *Forward Selection*: This forward selection starts with an empty model that only contains the intercept and then examines in each subsequent iteration the effect of including each of the remaining variables. This effect is evaluated according to a partial F-test as described above. The variable with the largest partial F-value is then included in the model. This selection process continues until none of the remaining variables has a partial F-value larger than a given critical value.
* *Backward Elimination*: The backward elimination method starts by building a model with all available variables. Subsequently, the effect of removing each of the variables in the model is evaluated according to a partial F-test as in the forward selection algorithm. The variable with the smallest partial F-value is then removed. This selection process continues until all variables in the model have partial F-values larger than a given critical value. 

Use the `Stepwise` variable selection by browsing in the top ribbon: 

| Data Transformation $$\rightarrow$$ Variable Selection $$\rightarrow$$ Stepwise |

### Input
{: .no_toc }
The data input should consist of numerical instances, without any missing values. There are no inherent limitations on the number of columns or rows. 

### Configuration
{: .no_toc }

|**Select Target Column**| Choose the column that corresponds to the response variable. |
|**Select Method**| Select any of the two available options (Forward Selection , Backward Elimination) to choose which of the two methods to use. |
|**Select Model**| Select the type of regression model to be implemented (e.g. linear). |
|**Threshold**| Specify the critical value that will be used to compare F-values to decide whether the inclusion of a variable is significant. The values should range from 0 to 1. |

### Output
{: .no_toc }
Once the algorithm is completed, the output spreadsheet will be simplified to contain only two elements: the response variable and the best subset of features selected by the algorithm. These features represent the most relevant variables for predicting the response, as determined by the variable selection process.

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data.

<div style="text-align: center;">
<img src="images/Variable Selection/stepwise-input.png" alt="Stepwise input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. Select `Data Transformation` $$\rightarrow$$ `Variable Selection`  $$\rightarrow$$ `Stepwise`.
1. `Select Target Column` [1] as the column that corresponds to the response variable.
1. Select one of the two available options for `Select Method` [2] to specify which method to use.
1. `Select Model` [3] to be implemented.
1. Specify the `Threshold` [5]. Values should range from 0 to 1.
1. Click on the `Execute` button [5] to calculate the results. 

<div style="text-align: center;">
<img src="images/Variable Selection/stepwise-configuration.svg" alt="Stepwise configuration" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
The output data of the calculation is presented in the right-hand spreadsheet of the tab. It shows the dataset after the completion of variable selection, meaning that it contains the response variable and the best subset of features selected by the algorithm.

<div style="text-align: center;">
<img src="images/Variable Selection/stepwise-output.png" alt="Stepwise output" width="400" height="300" class="img-responsive">
</div>

---

## Regression Analysis
Regression analysis is a “filter” method used to determine whether variables are linearly related to the response variable. This method constructs a linear regression model with the specified variables and evaluates measures such as R-squared, adjusted R-squared and the t-tests for each of the variables included in the model.

We denote as $\mathbf{X}$ the matrix that contains the data where each row of $\mathbf{X}$ corresponds to one instance of our sample space. We also denote as $C$, the matrix $C=(X^TX)^{-1}$. To perform a regression t-test for a specific variable we can test whether the linear coefficient of a feature is significantly different to zero with the following test: 

<div id="eq. t-test">
$$
\begin{equation}
T = \frac{\hat{b}_j}{s\sqrt{c_{jj}}} \sim t_{N-k-1} {\qquad [5] \qquad}
\end{equation}
$$
</div>

Where $s^2=\frac{RSS}{N-k-1}$ is the sample variance, $\hat{b}_{j}$ is the estimator of the coefficient of the $j$-th variable and 

$t_{N-k-1}$ is the student distribution with $N-k-1$ degrees of freedom.

A p-value is computed for each variable, which indicates whether its coefficient is statistically significantly different from zero. Variables with significant coefficients are deemed important and should be included in the model.

The user specifies a confidence level for the analysis, which is used to compute confidence intervals for each coefficient.


Use the `Regression Analysis` variable selection by browsing in the top ribbon: 

| Data Transformation $$\rightarrow$$ Variable Selection $$\rightarrow$$ Regression Analysis |

### Input
{: .no_toc }
The data input should consist of numerical instances, without any missing values. There are no inherent limitations on the number of columns or rows. 

### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Select Intercept Column**| Choose the column that corresponds to the response variable. |
|**Include/exclude columns**| Select manually the columns to be included in the analysis through the dialog window: Use the buttons to move columns between the `Included Columns` and `Excluded Columns` list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. |

### Output
{: .no_toc }
Once the algorithm is completed, the output spreadsheet includes the results of the regression analysis: Metrics such as R-squared, Adjusted R-squared, the coefficients of each variable along with their test statistics, p-values, and confidence intervals, as well as the Analysis of Variance (ANOVA) table for the model.

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data.

<div style="text-align: center;">
<img src="images/Variable Selection/regression-analysis-input.png" alt="Regression Analysis input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. Select `Data Transformation` $$\rightarrow$$ `Variable Selection`  $$\rightarrow$$ `Regression Analysis`.
1. Specify the `Confidence Level (%)` [1] for the test.
1. `Select Intercept Column` [2] as the column that corresponds to the response variable.
1. Select the columns by clicking on the arrow buttons [4] and moving columns between the `Excluded Columns` [3] and `Included Columns` [5] lists.
1. Click on the `Execute` button [6] to calculate the results. 

<div style="text-align: center;">
<img src="images/Variable Selection/regression-analysis-configuration.svg" alt="Regression Analysis configuration" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }

The output data of the calculation is presented in the right-hand spreadsheet of the tab. The output includes the results of the regression analysis: Metrics such as R-squared, Adjusted R-squared, the coefficients of each variable along with their test statistics, p-values, and confidence intervals, as well as the Analysis of Variance (ANOVA) table for the model.

<div style="text-align: center;">
<img src="images/Variable Selection/regression-analysis-output.png" alt="Regression Analysis output" width="400" height="300" class="img-responsive">
</div>

At a significance level of 0.05, the p-values of the coefficients indicate that the only variable that should be excluded from the set is “X6 (longitude),” as it is the only variable with a p-value greater than 0.05.

---



## Tips
* Ensure your dataset is preprocessed correctly before applying feature selection.
* Different evaluators and configurations may yield different results; experiment to find the best setup for your specific dataset and problem.

## See also
Explore further preprocessing steps in the [`Data Transformation`](https://www.docs.isalos.novamechanics.com/data-transformation.html) group of functions.

## References {#references-variable-selection}
1. Hall, Mark A. Correlation-based feature selection of discrete and numeric class machine learning. Proceedings of the Seventeenth International Conference on Machine Learning; 2000: 359–366. [https://researchcommons.waikato.ac.nz/entities/publication/b2a8891e-8765-41fa-900d-10ca6258f29d](https://researchcommons.waikato.ac.nz/entities/publication/b2a8891e-8765-41fa-900d-10ca6258f29d).
1.	Kohavi, Ron, and George H. John. Wrappers for feature subset selection. Artificial intelligence 97.1-2; 1997: 273-324. [doi.org/10.1016/S0004-3702(97)00043-X](https://doi.org/10.1016/S0004-3702(97)00043-X).
1. Galvão, Roberto Kawakami Harrop, Mário César Ugulino de Araújo, and Sófacles Figueredo Carreiro Soares. Variable selection. In S. Brown, R. Tauler, & R. Walczak (Eds.), Comprehensive Chemometrics (Vol. 3, pp. 233–283). Oxford: Elsevier.

---

## Version History
Introduced in Isalos Analytics Platform v0.3.2

_Instructions last updated on January 2025_

