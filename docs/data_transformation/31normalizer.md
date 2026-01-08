---
layout: default
title: 3.1 Normalizers
parent: 3. Data Transformation
nav_order: 1
permalink: /normalizers.html
---

# Normalizers
{: .no_toc }
Data scaling (normalization or standardization) is considered as a standard pre-processing procedure in data science and in machine learning model development. Both techniques aim to force data that have substantially different numerical ranges to acquire comparable values and thus, to facilitate their manipulation and modeling and contribute equally to the analysis.<sup>[1](#references-normalizers)</sup>

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---



## Z Score

Linear transformation (standardization) of the data so that each feature is Gaussian-distributed: their normalized values present a mean value equal to 0 and standard deviation equal to 1. The transformation is achieved through [Eq. 1](#eq. z-score)<sup>[1](#references-normalizers)</sup>. 

<div id="eq. z-score">
$$
\begin{equation}
{\widetilde{x}}_i=\frac{x_i-\bar{\mathbf{X}}}{s} {\qquad [1] \qquad}
\end{equation}
$$
</div>

where ${\widetilde{x}}_i$ and $x_i$ are the standardized and the original values of the $i$th instance of $\mathbf{X}$ feature vector respectively, $\bar{\mathbf{X}}$ is the mean value of $\mathbf{X}$ and, $s$ is the standard deviation of $\mathbf{X}$.

Use the `Z Score` function by browsing in the top ribbon: 

| Data Transformation $$\rightarrow$$ Normalizers $$\rightarrow$$ Z Score |

### Input
{: .no_toc }
Data matrix with arbitrary data requiring standardization.

### Configuration
{: .no_toc }

|**Include/exclude columns**| Select manually the columns that are going to be standardized through the dialog window: Use the buttons to move columns between the `Included Columns` (subject to standardization) and `Excluded Columns` list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. Columns with categorical features cannot be selected for standardization.|

### Output
{: .no_toc }
Data matrix with standardized data. If categorical features are included in the input table, these are presented intact in the output table.

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data matrix that is going to be standardized.

<div style="text-align: center;">
<img src="images/Normalizers/Normalizers_input.png" alt="Z-Score input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. Select `Data Transformation` $$\rightarrow$$ `Normalizers` $$\rightarrow$$ `Z Score`.
1. Select the columns that are going to be standardized by clicking on the arrow buttons [3] and moving columns between the `Excluded Columns` [1] and `Included Columns` [2] lists. The columns containing categorical values are not subject to normalization. In this case only columns "A" and "C" are going to be normalized.
1. Click on the `Execute` button [4] to apply the standardization on the selected columns.

<div style="text-align: center;">
<img src="images/Normalizers/z-score_configuration.png" alt="Z-Score configuration" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab the output data matrix with the standardized columns "A" and "C" is presented.

<div style="text-align: center;">
<img src="images/Normalizers/z-score_output.png" alt="Z-score output" width="400" height="300" class="img-responsive">
</div>

---
 
## Min-Max 
Linear transformation (normalization) of the data to lie within a predefined range, usually between [0, 1] or [-1, 1].  [Eq. 2](#eq. min-max) is used to transform the data to fall within the range of [0, 1]. Appropriate alterations to this equation are made for other normalization ranges<sup>[2](#references-normalizers)</sup>.

<div id="eq. min-max">
$$
\begin{equation}
{\widetilde{x}}_i=\frac{x_i-\max(\mathbf{X})}{\max(\mathbf{X})-\min(\mathbf{X})} {\qquad [2] \qquad}
\end{equation}
$$
</div>

where ${\widetilde{x}}_i$ is the transformed value of instnce $i$ of the $\mathbf{X}$ feature vector,  $x_i$ is the actual value of instance $i$ of $\mathbf{X}$, and the minimum and maximum values for each feature are taken over all instances of the $\mathbf{X}$ feature vector of the input dataset<sup>[2](#references-normalizers)</sup>.


Use the `Min-Max` function by browsing in the top ribbon: 

| Data Transformation $$\rightarrow$$ Normalizers $$\rightarrow$$ Min-Max |

### Input
{: .no_toc }
Data matrix with arbitrary data requiring normalization.

### Configuration
{: .no_toc }

|**Include/exclude columns**| Select manually the columns that are going to be normalized through the dialog window: Use the buttons to move columns between the `Included Columns` (subject to normalization) and `Excluded Columns` list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. Columns with categorical features cannot be selected for normalization.|
|**Min**|The lower bound of the range used for normalization (default value: 0).|
|**Max**|The upper bound of the range used for normalization (default value: 1).|

### Output
{: .no_toc }

Data matrix with normalized data. If categorical features are included in the input table, these are presented intact in the output table.

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data matrix that is going to be normalized.

<div style="text-align: center;">
<img src="images/Normalizers/Normalizers_input.png" alt="Min-Max input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. Select `Data Transformation` $$\rightarrow$$ `Normalizers` $$\rightarrow$$ `Min-Max`.
1. Select the columns that are going to be normalized by clicking on the arrow buttons [3] and moving columns between the `Excluded Columns` [1] and `Included Columns` [2] lists. The columns containing categorical values are not subject to normalization. In this case only columns "B" and "C" are going to be normalized.
1. Select the lower-`Min` and upper-`Max` limits [4] for the normalization.
1. Click on the `Execute` button [5] to apply the normalization on the selected columns.

<div style="text-align: center;">
<img src="images/Normalizers/Min-Max_configuration.png" alt="Min-Max configuration" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab the output data matrix with the normalized columns "B" and "C" is presented.

<div style="text-align: center;">
<img src="images/Normalizers/Min-Max_output.png" alt="Min-Max output" width="400" height="300" class="img-responsive">
</div>

---

## Tips

Z Score standardization:
*   It is useful when the feature distribution is normal or Gaussian. 
*   It is particularly useful when applying algorithms that assume that data are normally distributed, such as linear regression and logistic regression.
*   It is less sensitive to outliers, preserving the essential structure of the original data distribution while aligning it to a standardized scale.


Min-Max normalization:
*   It does not assume any distribution of the data; thus, it is suitable for data that do not follow a Gaussian distribution and when a bounded range is necessary.
*   It is useful when applying algorithms that are sensitive to the magnitude of values, such as neural networks and k-nearest neighbors (kNN).
*   It is highly sensitive to outliers since the minimum and maximum bounds are affected by extreme values. Therefore, it may alter the shape of data distribution, especially in the presence of significant outliers.

## See also
The model generated by either the Z Score or Min-Max function can be applied to any input data through the [`Existing Model Utilization`](https://www.docs.isalos.novamechanics.com/existing-model-utilization.html) (e.g., a scaling function tuned from the training set data of a machine learning model can be applied to the test/external set data).


## References {#references-normalizers}
1. Leach AR, Gillet VJ. An introduction to chemoinformatics. 2007. [doi.org/10.1007/978-1-4020-6291-9](https://doi.org/10.1007/978-1-4020-6291-9).
1. Witten Ian H and Frank, Eibe and Hall, Mark A and Pal CJ. Data Mining: Practical Machine Learning Tools and Techniques. Fourth. Morgan Kaufmann; 2011. [doi.org/10.1016/C2009-0-19715-5](https://doi.org/10.1016/C2009-0-19715-5).

---

## Version History
Introduced in Isalos Analytics Platform v0.1.18

_Instructions last updated on May 2024_