---
layout: default
title: 5.2 Model Metrics
parent: 5. Statistics
nav_order: 2
permalink: /model-metrics.html
---

# Model Metrics
{: .no_toc }
The assessment of a machine learning model’s performance can be achieved using statistical metrics that quantify the accuracy of the model’s predictions (how closely the predictions match their true values) and identify possible underfitting or overfitting. A regression model’s performance is assessed based on how close the actual ($$y_i$$) and the predicted ($$\widehat{y_i}$$) values of the target are, usually by calculating the differences (residuals) between actual and predicted values. The performance of classification models is evaluated based on the number of correct predictions and the number of misclassifications.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Regression Metrics 
The computed statistical metrics include the mean squared error (MSE, [Eq. 1](#eq. MSE)), the root mean squared error (RMSE, [Eq. 2](#eq. RMSE)), the mean absolute error (MAE, [Eq. 3](#eq. MAE)), and the R Square ($R^2$, [Eq. 4](#eq. R2))<sup>[1,2](#references-metrics)</sup>. 

<div id="eq. MSE">
$$
\begin{equation}
\text{MSE} = \frac{1}{N} \sum_{i=1}^{N} (y_i - \hat{y}_i)^2 {\qquad [1] \qquad}
\end{equation}
$$
</div>

<div id="eq. RMSE">
$$
\begin{equation}
\text{RMSE} = \sqrt{\frac{1}{N} \sum_{i=1}^{N} (y_i - \hat{y}_i)^2} {\qquad [2] \qquad}
\end{equation}
$$
</div>

<div id="eq. MAE">
$$
\begin{equation}
\text{MAE} = \frac{1}{N} \sum_{i=1}^{N} |y_i - \hat{y}_i| {\qquad [3] \qquad}
\end{equation}
$$
</div>

<div id="eq. R2">
$$
\begin{equation}
R^2 = \left( \frac{\sum_{i=1}^{N} (y_i - \bar{y})(\hat{y}_i - \bar{\hat{y}})}{\sqrt{\sum_{i=1}^{N} (y_i - \bar{y})^2} \sqrt{\sum_{i=1}^{N} (\hat{y}_i - \bar{\hat{y}})^2}} \right)^2 {\qquad [4] \qquad}
\end{equation}
$$
</div>

where $$y_i$$ and $$\widehat{y_i}$$ are the actual and the predicted target values, respectively over the $$N$$ samples, $$\bar{y}$$ and $$\bar{\hat{y_i}}$$ are the averages of the original and predicted values, respectively.

Use the `Regression Metrics` function by browsing in the top ribbon: 

| Statistics $$\rightarrow$$ Model Metrics $$\rightarrow$$ Regression Metrics |

### Input
{: .no_toc }
Data matrix with at least two columns, including the actual and predicted response (target/endpoint) variable values (numerical data).

### Configuration
{: .no_toc }

|**Actual Value Column**| Select from the dropdown menu the column name corresponding to the actual target values. |
|**Prediction Value Column**| Select from the dropdown menu the column name corresponding to the predicted target values. |

### Output
{: .no_toc }
Table with the computed statistical metrics.

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data matrix where the actual [1] and the predicted [2] target values are included.

<div style="text-align: center;">
<img src="images/Model Metrics/regression-predictions.svg" alt="regression-predictions" width="600" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. `Statistics` $$\rightarrow$$ `Model Metrics` $$\rightarrow$$ `Regression Metrics`.
1. Select the from the dropdown lists `Actual Value Column` [3] and `Prediction Value Column` [4] the column names that correspond to the actual and predicted target values, respectively. In this case the column “price” contains the observed class values and the column “kNN Prediction” the predicted values from a developed machine learning model.
1. Click on the `Execute` button [5] to perform computations.

<div style="text-align: center;">
<img src="images/Model Metrics/regression-configuration.svg" alt="regression-configuration" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab the metrics values are presented [6].

<div style="text-align: center;">
<img src="images/Model Metrics/regression-metrics.svg" alt="regression-metrics" width="500" height="300" class="img-responsive">
</div>

---
 
## Classification Metrics
The results of the classification are summarized in a confusion matrix, which is a table showing the number of True Positives (TP), False Positives (FP), True Negatives (TN) and False Negatives (FN). From the confusion matrix the following statistical metrics are calculated: accuracy ([Eq. 5](#eq. Accuracy)), precision ([Eq. 6](#eq. Precision)), sensitivity/recall ([Eq. 7](#eq. Recall)), specificity ([Eq. 8](#eq. Specificity)), F<sub>1</sub> score and F<sub>$$\mathrm{\beta}$$</sub> scores ([Eqs. 9](#eq. F1) and [10](#eq. Fbeta)) and the Matthews correlation coefficient (MCC, [Eq. 11](#eq. MCC))<sup>[1,2](#references-metrics)</sup>. 

| | **Actual Class** |
| **Predicted Class** | Positive | Negative |
| Positive | TP | FP |
| Negative | FN | TN |

<div id="eq. Accuracy">
$$
\begin{equation}
\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN} {\qquad [5] \qquad}
\end{equation}
$$
</div>

<div id="eq. Precision">
$$
\begin{equation}
\text{Precision} = \frac{TP}{TP + FP} {\qquad [6] \qquad}
\end{equation}
$$
</div>

<div id="eq. Recall">
$$
\begin{equation}
\text{Sensitivity/Recall} = \frac{TP}{TP + FN} {\qquad [7] \qquad}
\end{equation}
$$
</div>

<div id="eq. Specificity">
$$
\begin{equation}
\text{Specificity} = \frac{TN}{TN + FP} {\qquad [8] \qquad}
\end{equation}
$$
</div>

<div id="eq. F1">
$$
\begin{equation}
F1 = 2 \cdot \frac{\text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}} {\qquad [9] \qquad}
\end{equation}
$$
</div>

<div id="eq. Fbeta">
$$
\begin{equation}
F_\beta = (1 + \beta^2) \cdot \frac{\text{Precision} \cdot \text{Recall}}{(\beta^2 \cdot \text{Precision}) + \text{Recall}} {\qquad [10] \qquad}
\end{equation}
$$
</div>

<div id="eq. MCC">
$$
\begin{equation}
MCC = \frac{ TP \times TN - FP \times FN }{ \sqrt{ (TP + FP)(TP + FN)(TN + FP)(TN + FN) } } {\qquad [11] \qquad}
\end{equation}
$$
</div>

Use the `Classification` function by browsing in the top ribbon: 

| Statistics $$\rightarrow$$ Model Metrics $$\rightarrow$$ Classification Metrics |

### Input
{: .no_toc }
Data matrix with at least two columns, including the actual and predicted response (target/endpoint) variable values (categorical data, two or more classes).

### Configuration
{: .no_toc }

|**Actual Value Column**| Select from the dropdown menu the column name corresponding to the actual (original/observed) class values. |
|**Prediction Value Column**| Select from the dropdown menu the column name corresponding to the predicted class values. |
|**beta of F score**| The beta parameter for the calculation of F<sub>$$\mathrm{\beta}$$</sub> score. |


### Output
{: .no_toc }
The confusion matrix and the accuracy statistics.

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data matrix where the actual [1] and the predicted [2] class values are included.

<div style="text-align: center;">
<img src="images/Model Metrics/classification-predictions.svg" alt="classification-predictions" width="500" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select `Statistics` $$\rightarrow$$ `Model Metrics` $$\rightarrow$$ `Classification Metrics`.
1. Select from the dropdown lists `Actual Value Column` [3] and `Prediction Value Column` [4] the column names that correspond to the actual and predicted class values, respectively. In this case the column "Species" contains the observed class values and the column "Prediction" the predicted values from a developed machine learning model.
1. Type the value $$\beta$$ value for the F<sub>$$\mathrm{\beta}$$</sub> calculation in the `beta of F Score` field [5].
1. Click on the `Execute` button [6] to perform computations.

<div style="text-align: center;">
<img src="images/Model Metrics/classification-configuration.svg" alt="classification-configuration" width="400" height="300" class="img-responsive">
</div>

<div style="text-align: center;">
<img src="images/Model Metrics/classification-configuration2.svg" alt="classification-configuration2" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab the confusion matrix is depicted [7], followed by the overall classification accuracy [8], and the rest of the statistics measures [9].

<div style="text-align: center;">
<img src="images/Model Metrics/classification-metrics.svg" alt="classification-metrics" width="500" height="300" class="img-responsive">
</div>

---

## Tips
*  In model development, the abovementioned statistical measures can be calculated for both training set predictions (to assess model fit and potential overfitting) and external/test set predictions (to assess generalization and predictive performance).
*  In classification, the following metrics: precision, recall/sensitivity, specificity, F<sub>1</sub> score, and F<sub>$$\mathrm{\beta}$$</sub> score, are calculated for all classes. This approach is crucial when dealing with imbalanced class distributions, where one class might be much more frequent than the other(s). By calculating these statistics for both the positive and negative classes, you can better understand how well the developed model performs across both common and rare events. This comprehensive evaluation provides a complete performance picture of the model.

## See also
For the development of regression models refer to the [`Regression`](https://www.docs.isalos.novamechanics.com/regression.html) functions and for the development of classification models refer to the [`Classification`](https://www.docs.isalos.novamechanics.com/classification.html) functions.

### Workflows
{: .no_toc }

#### Bodyfat prediction case study
{: .no_toc }
* [Isalos workflow](files/Regression/Bodyfat prediction/body_fat.iap)
* [Report](files/Regression/Bodyfat prediction/Bodyfat Prediction.pdf)

#### House pricing case study
{: .no_toc }
* [Isalos workflow](files/Regression/Housing prices/house_pricing.iap)
* [Report](files/Regression/Housing prices/Housing Prices.pdf)

#### Insurance charges case study
{: .no_toc }
* [Isalos workflow](files/Regression/Insurance charges/insurance_charges.iap)
* [Report](files/Regression/Insurance charges/Insurance Charges.pdf)

#### MA score case study
{: .no_toc }
* [Isalos workflow](files/Regression/MA score/ma_score_data.iap)
* [Report](files/Regression/MA score/MA score Data.pdf)

#### Salary prediction case study
{: .no_toc }
* [Isalos workflow](files/Regression/Salary prediction/salary_prediction.iap)
* [Report](files/Regression/Salary prediction/Salary Prediction.pdf)

#### Breast cancer case study
{: .no_toc }
* [Isalos workflow](files/Classification/Breast cancer/breast_cancer.iap)
* [Report](files/Classification/Breast cancer/Breast Cancer.pdf)

#### Credit card case study
{: .no_toc }
* [Isalos workflow](files/Classification/Credit card/credit_card.iap)
* [Report](files/Classification/Credit card/Credit Card.pdf)

#### Parkinson's disease case study
{: .no_toc }
* [Isalos workflow](files/Classification/Parkinson's disease/parkinsons_disease.iap)
* [Report](files/Classification/Parkinson's disease/Parkinson's Disease.pdf)

#### Students' performance case study
{: .no_toc }
* [Isalos workflow](files/Classification/Student's performance/students_performance.iap)
* [Report](files/Classification/Student's performance/Students' Performance.pdf)

## References 
1. Naser MZ, Alavi AH. Error Metrics and Performance Fitness Indicators for Artificial Intelligence and Machine Learning in Engineering and Sciences. Archit Struct Constr 2021. [doi.org/10.1007/s44150-021-00015-8](https://doi.org/10.1007/s44150-021-00015-8).
1. Witten Ian H and Frank, Eibe and Hall, Mark A and Pal CJ. Data Mining: Practical Machine Learning Tools and Techniques. Fourth. Morgan Kaufmann; 2011. [doi.org/10.1016/C2009-0-19715-5](https://doi.org/10.1016/C2009-0-19715-5).

---

## Version History
Introduced in Isalos Analytics Platform v0.1.18

_Instructions last updated on May 2024_


<!--These spacers are available to use for margins and padding with responsive utility classes. Combine these prefixes with a screen size and spacing scale to use them responsively.

| Classname prefix | What it does                  |
|:-----------------|:------------------------------|
| `.m-`            | `margin`                      |
| `.mx-`           | `margin-left`, `margin-right` |
| `.my-`           | `margin top`, `margin bottom` |
| `.mt-`           | `margin-top`                  |
| `.mr-`           | `margin-right`                |
| `.mb-`           | `margin-bottom`               |
| `.ml-`           | `margin-left`                 |

| Classname prefix | What it does                    |
|:-----------------|:--------------------------------|
| `.p-`            | `padding`                       |
| `.px-`           | `padding-left`, `padding-right` |
| `.py-`           | `padding top`, `padding bottom` |
| `.pt-`           | `padding-top`                   |
| `.pr-`           | `padding-right`                 |
| `.pb-`           | `padding-bottom`                |
| `.pl-`           | `padding-left`                  |

Spacing values are based on a `1rem = 16px` spacing scale, broken down into these units:

| Spacer/suffix  | Size in rems  | Rem converted to px |
|:---------------|:--------------|:--------------------|
| `1`            | 0.25rem       | 4px                 |
| `2`            | 0.5rem        | 8px                 |
| `3`            | 0.75rem       | 12px                |
| `4`            | 1rem          | 16px                |
| `5`            | 1.5rem        | 24px                |
| `6`            | 2rem          | 32px                |
| `7`            | 2.5rem        | 40px                |
| `8`            | 3rem          | 48px                |
| `auto`         | auto          | auto                |

Use `mx-auto` to horizontally center elements.

#### Examples 
{: .no_toc }

In Markdown, use the `{: }` wrapper to apply custom classes:

```markdown
This paragraph will have a margin bottom of 1rem/16px on large screens.
{: .mb-lg-4 }

This paragraph will have 2rem/32px of padding on the right and left at all screen sizes.
{: .px-6 }
```

| Classname               | What it does                     |
|:------------------------|:---------------------------------|
| `.float-left`           | `float: left`                    |
| `.float-right`          | `float: right`                   |
| `.flex-justify-start`   | `justify-content: flex-start`    |
| `.flex-justify-end`     | `justify-content: flex-end`      |
| `.flex-justify-between` | `justify-content: space-between` |
| `.flex-justify-around`  | `justify-content: space-around`  |

_Note: any of the `flex-` classes must be used on a parent element that has `d-flex` applied to it._

## Vertical Alignment (*)

| Classname              | What it does                    |
|:-----------------------|:--------------------------------|
| `.v-align-baseline`    | `vertical-align: baseline`      |
| `.v-align-bottom`      | `vertical-align: bottom`        |
| `.v-align-middle`      | `vertical-align: middle`        |
| `.v-align-text-bottom` | `vertical-align: text-bottom`   |
| `.v-align-text-top`    | `vertical-align: text-top`      |
| `.v-align-top`         | `vertical-align: top`           |

## Display (*)

Display classes aid in adapting the layout of the elements on a page:

| Class             |                         |
|:------------------|:------------------------|
| `.d-block`        | `display: block`        |
| `.d-flex`         | `display: flex`         |
| `.d-inline`       | `display: inline`       |
| `.d-inline-block` | `display: inline-block` |
| `.d-none`         | `display: none`         |

Use these classes in conjunction with the responsive modifiers.

#### Examples
{: .no_toc }

In Markdown, use the `{: }` wrapper to apply custom classes:

```markdown
This button will be hidden until medium screen sizes:

[ A button ](#url)
{: .d-none .d-md-inline-block }

These headings will be `inline-block`:

### heading 3
{: .d-inline-block }

### heading 3
{: .d-inline-block }
```-->
