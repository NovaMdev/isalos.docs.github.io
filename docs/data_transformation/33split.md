---
layout: default
title: 3.3 Split
parent: 3. Data Transformation
nav_order: 3
permalink: /split.html
---

# Split
{: .no_toc }
The splitting of a dataset is a common pre-processing step in data analysis and modelling, either to reduce the volume of the data or to create subsets that will be used within the model external validation process<sup>[1](#references-split)</sup>. In the latter case, two representative subsets are often required, and for that the initial dataset is divided into training and test sets. Objects within the test set are not used during model development but are left out to measure the performance of the model in real-case scenarios<sup>[2,3](#references-split)</sup>. The splitting can be performed either randomly or using a method of representative selection, so that the selected instances cover uniformly the data space.

## Table of contents
{: .no_toc .text-delta }


1. TOC
{:toc}

---

## Kennard-Stone
The Kennard-Stone method facilitates the selection of two representative subsets (e.g., training and test sets) with a uniform distribution over an initial dataset<sup>[4](#references-split)</sup>. This function implements the approach of Daszykowski _et al_.<sup>[1](#references-split)</sup>:

1.	Initially, a central object is selected from the dataset.
1.	Extreme objects from the data space border are then added to the training set.

Specifically, the method begins by calculating the mean of the dataset. The object closest to this mean, deemed the most representative, is assigned as the first object in the training set (first partition) and subsequently removed from the initial dataset. The second object chosen for the training set is the one furthest from the first and is also removed from the dataset.

Following this, the algorithm continues by iteratively adding objects to the training set. For each iteration, it calculates the Euclidean distance between each remaining unassigned object and the already selected objects. The object furthest from its closest neighbor in the training set is selected and added to the training set. This process repeats until the desired number of samples is included in the training set.

Use the `Kennard-Stone` function by browsing in the top ribbon: 

| Data Transformation $$\rightarrow$$ Split $$\rightarrow$$ Kennard-Stone |

### Input
{: .no_toc }
Data matrix to partition. 

### Configuration
{: .no_toc }

|**Target Column** | Select the target column (dependent variable). This will be excluded from the splitting procedure. String columns are automatically excluded. |
|**Percentage** | An integer number between (0, 100) specifying the splitting ratio, i.e., the proportion of input rows included in the first partition. Default value: 40. |
|**Perform Computations** | Choose whether to perform calculations on the CPU or the GPU (if available on the user’s PC). The GPU option enables faster computations by leveraging the graphics processing unit. |

### Output
{: .no_toc }
Two data partitions. The results are not visible in the output spreadsheet, but the different partitions can be imported independently in other tabs.

### Example
{: .no_toc }

##### Input
{: .no_toc }

In the left-hand spreadsheet of the tab import the data matrix that is going to be split.

<div style="text-align: center;">
<img src="images/Split/split-input.PNG" alt="split-input" width="500" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. Select `Data Transformation` $$\rightarrow$$ `Split` $$\rightarrow$$ `Kennard-Stone`.
1. Select the `Target Column` name from the dropdown list [1]. 
1. Type in the `Percentage` field [2] the ratio of input rows included in the first partition.
1. Select whether the calculations are performed on CPU or GPU [3]. 
1. Click on the `Execute` button [4] to perform the data partitioning.

<div style="text-align: center;">
<img src="images/Split/kennard-stone-configuration.svg" alt="kennard-stone-configuration" width="700" height="300" class="img-responsive">
</div>


##### Output
{: .no_toc }

1. In the right-hand spreadsheet of the tab the input data matrix is presented intact.
1. Insert a new tab by clicking on the `+` button [1].
1. Right click on the left-hand spreadsheet and select `Import from SpreadSheet` [2].
1. In the configuration window select from the `Select input tab` the training (first partition) or the test set (second partition) [3]. 
1. Click on the `Execute` button [4] and continue with the rest of your analysis steps.

<div style="text-align: center;">
<img src="images/Split/random-split-output.svg" alt="random-split-output" width="600" height="300" class="img-responsive">
</div>

---

## Random Partitioning 
Random row-wise split of the input data matrix in two subsets (e.g., training and test sets).

Use the `Random Partitioning` function by browsing in the top ribbon: 

| Data Transformation $$\rightarrow$$ Split $$\rightarrow$$ Random Partitioning |

### Input
{: .no_toc }

Data matrix to partition.

### Configuration
{: .no_toc }

|**Training set percentage** | An integer number between (0, 100) specifying the splitting ratio, i.e., the proportion of input rows included in the first partition. Default value: 40. |
|**Usage of random generator seed** | Specify an integer number as fixed seed to acquire reproducible results in case of re-execution of the splitting step. If you tick on the `Usage of random generator seed` checkbox, different splits will be produced upon re-execution. |
|**Stratified sampling** | Check this box, then select the column name from the dropdown list to ensure that the distribution of its values is approximately preserved during partitioning. |

### Output
{: .no_toc }

Two data partitions. The results are not visible in the output spreadsheet, but the different partitions can be imported independently in other tabs.

### Example
{: .no_toc }

##### Input
{: .no_toc }

In the left-hand spreadsheet of the tab import the data matrix that is going to be split.

<div style="text-align: center;">
<img src="images/Split/split-input.PNG" alt="split-input" width="500" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. Select `Data Transformation` $$\rightarrow$$ `Split` $$\rightarrow$$ `Random Partitioning`.
1. Type the `Training set percentage` [1] and the fixed seed [2] to achieve reproducible splits. Otherwise, click on the `Usage of random seed generator` [3].
1. (Optional) Click on the `Stratified sampling` checkbox [4] and select the column name [5] that corresponds to the feature whose values distribution will be preserved in both partitions. 
1. Click on the `Execute` button [6] to perform the data partitioning.

<div style="text-align: center;">
<img src="images/Split/random-split-configuration.svg" alt="random-split-configuration" width="500" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }

1. In the right-hand spreadsheet of the tab the input data matrix is presented intact.
1. Insert a new tab by clicking on the `+` button [1].
1. Right click on the left-hand spreadsheet and select `Import from SpreadSheet` [2].
1. In the configuration window select from the `Select input tab` the training (first partition) or the test set (second partition) [3]. 
1. Click on the `Execute` button [4] and continue with the rest of your analysis steps.

<div style="text-align: center;">
<img src="images/Split/random-split-output.svg" alt="random-split-output" width="600" height="300" class="img-responsive">
</div>

---

## Tips

* The splitting functions are useful when two (or more) subsets of data are needed e.g., as training and test/validation sets in model development or when the original dataset is too large to process in its entirety, allowing for analysis to be conducted on a more manageable subset.
* The Kennard and Stone methodology, in contrast to the random partitioning, is a deterministic methodology, producing consistent partitions for given input parameters and data matrices. It also allows more representative subset selection that covers all the data space. However, it is more time-consuming compared to random partitioning for the same input data matrix and splitting ratio.
* Consider [data scaling](https://www.docs.isalos.novamechanics.com/normalizers.html)  -if necessary- prior to the use of Kennard-Stone function, as calculation of distances is performed.
* The external validation using the Kennard-Stone splitting is advised to be supplemented by cross-validation and or/other validation methodologies, as it is possible that the results lead to an overestimation of the models’ predictive ability (test set too similar to the training set). 


## See also
The generated train and test sets from the splitting function can be imported to subsequent tabs/nodes (see [`Data Representation`](https://www.docs.isalos.novamechanics.com/data-representation.html)). For data scaling refer to the [`Normalizers`](https://www.docs.isalos.novamechanics.com/normalizers.html) functions.

## References {#references-split}
1. Daszykowski M, Walczak B, Massart DL. Representative subset selection. Anal Chim Acta 2002. [doi.org/10.1016/S0003-2670(02)00651-7](https://doi.org/10.1016/S0003-2670(02)00651-7).
1. Witten Ian H and Frank, Eibe and Hall, Mark A and Pal CJ. Data Mining: Practical Machine Learning Tools and Techniques. Fourth. Morgan Kaufmann; 2011. [doi.org/10.1016/C2009-0-19715-5](https://doi.org/10.1016/C2009-0-19715-5).
1. Varsou D-D, Kolokathis PD, Antoniou M, Sidiropoulos NK, Tsoumanis A, Papadiamantis AG, et al. In silico assessment of nanoparticle toxicity powered by the Enalos Cloud Platform: Integrating automated machine learning and synthetic data for enhanced nanosafety evaluation. Comput Struct Biotechnol J 2024;25:47–60. [doi.org/10.1016/j.csbj.2024.03.020](https://doi.org/10.1016/j.csbj.2024.03.020).
1. Kennard RW, Stone LA. Computer aided design of experiments 1969;11:137–48. [doi.org/10.2307/1266770](https://doi.org/10.2307/1266770).

---

## Version History
Introduced in Isalos Analytics Platform v0.2.3

_Instructions last updated on June 2024_

<!-- Use labels as a way to add an additional mark to a section of your docs. Labels come in a few colors. By default, labels will be blue.

<div class="code-example" markdown="1">
Default label
{: .label }

Blue label
{: .label .label-blue }

Stable
{: .label .label-green }

New release
{: .label .label-purple }

Coming soon
{: .label .label-yellow }

Deprecated
{: .label .label-red }
</div>
```markdown
Default label
{: .label }

Blue label
{: .label .label-blue }

Stable
{: .label .label-green }

New release
{: .label .label-purple }

Coming soon
{: .label .label-yellow }

Deprecated
{: .label .label-red }
``` -->
