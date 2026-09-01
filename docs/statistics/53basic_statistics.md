---
layout: default
title: 5.3 Basic Statistics
parent: 5. Statistics
nav_order: 3
permalink: /descriptive-statistics.html
description: "Calculate descriptive statistics, confidence intervals, and hypothesis tests on your data using Isalos."
---

# Basic Statistics
{: .no_toc }
Basic statistics is a tool that includes fundamental techniques used to summarize and interpret a given dataset. It encompasses descriptive statistics, such as mean, median, mode, variance, and standard deviation, which help characterize the central tendency and variability of data sets. It also includes confidence intervals, providing a range within which population parameters are likely to fall, and hypothesis testing, which allows analysts to make inferences or decisions based on sample data. Additionally, weighting cases can be applied to adjust for the relative importance of different data points. These tools are essential for understanding data behavior and supporting informed decision-making in research and analysis.

---

## Descriptive Statistics
Descriptive statistics is a collection of analytical methods used to effectively summarize or describe a given dataset. These methods involve various measures, including measures of central tendency (e.g., mean, median, and mode), as well as measures of variability (e.g., range, variance, and standard deviation). By employing descriptive statistics, one can quickly evaluate the distribution and patterns within a dataset without relying on additional assumptions. Descriptive statistics play a crucial role as they offer valuable insights about a dataset in a straightforward manner, without the necessity of graphical representation, which might not have been feasible when dealing with large datasets.<sup>[1](#references-descriptive-statistics)</sup>. 


The available statistical measures in Isalos, applicable to both the population and to a sample of the population, include: 

###### Minimum
{: .no_toc}
The minimum (min) is the smallest value in a dataset, defining the lower boundary of the data range. There is no distinction in calculation between a sample and a population for this measure.

###### Maximum
{: .no_toc}
The maximum (max) is the largest value in a dataset, defining the upper boundary of the data range. Like the minimum, the calculation does not vary between a sample and a population.

###### Range
{: .no_toc}
The range is a measure of the spread between the maximum and minimum values in the dataset, calculated as:

<div id="eq. range">
$$
\begin{equation}
R = x_{\text{max}} - x_{\text{min}} {\qquad [1] \qquad}
\end{equation}
$$
</div>

This measure does not differ between population and sample data.

###### Size/Count
{: .no_toc}
The size or count is the total number of data points in the dataset, denoted as $n$. It is used as the denominator in many statistical formulas to calculate averages and variations. Both population and sample datasets use the same method for counting data points.

###### Sum
{: .no_toc}
The sum is the total of all numerical values in a dataset, calculated as: 

<div id="eq. sum">
$$
\begin{equation}
\sum_{i=1}^{n} x_{i} {\qquad [2] \qquad}
\end{equation}
$$
</div>

Here, $x_{i}$ represents each value in the dataset. The calculation is identical whether dealing with a sample or a population. 

###### Median
{: .no_toc}
The median is the middle value of a dataset when ordered. The method does not vary between sample and population datasets.

If $n$ is odd, the median is the middle number calculated at position $p$ (where $p = \frac{n + 1}{2}$):  

<div id="eq. median-odd">
$$
\begin{equation}
\tilde{x} = x_{p} {\qquad [3a] \qquad}
\end{equation}
$$
</div>

If $n$ is even, it is the average of the two middle numbers at positions $p$ and $p+1$ (where $p = \frac{n}{2}$): 

<div id="eq. median-even">
$$
\begin{equation}
\tilde{x} = \frac{x_{p} + x_{p+1}}{2} {\qquad [3b] \qquad}
\end{equation}
$$
</div>

###### Mode
{: .no_toc}
The mode is the value that appears most frequently in a dataset. A dataset may have one mode, multiple modes, or no mode if no number repeats more frequently than others. This calculation is consistent for both population and sample data.

###### Midrange
{: .no_toc}
The midrange (MR) is the average of the maximum and minimum values of the dataset, calculated as:

<div id="eq. midrange">
$$
\begin{equation}
MR = \frac{x_{\text{min}} + x_{\text{max}}}{2} {\qquad [4] \qquad}
\end{equation}
$$
</div>

This calculation is the same for both sample and population data.

###### Root Mean Square
{: .no_toc}
The root mean square (RMS) provides a measure of the magnitude of a set of numbers, typically used to calculate the standard deviation. It is calculated by taking the square root of the average of the squares of the numbers:

<div id="eq. RMS">
$$
\begin{equation}
RMS = \sqrt{\frac{1}{n} \sum_{i=1}^{n} x_{i}^{2}} {\qquad [5] \qquad}
\end{equation}
$$
</div>

This formula is consistent for both population and sample datasets.

###### Mean
{: .no_toc}
The mean, often referred to as the average, is a measure of central tendency that sums all the numerical values in a dataset and divides by the count of the values. The equation for calculating the mean is:

For populations: 
<div id="eq. mean-population">
$$
\begin{equation}
\mu = \frac{1}{n} \sum_{i=1}^{n} x_{i} {\qquad [6a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. mean-sample">
$$
\begin{equation}
\overline{x} = \frac{1}{n} \sum_{i=1}^{n} x_{i} {\qquad [6b] \qquad}
\end{equation}
$$
</div>

###### Mean Absolute Deviation
{: .no_toc}
The mean absolute deviation (MAD) is the average of absolute deviations from the mean, providing a measure of variability. 

For populations:
<div id="eq. mad-population">
$$
\begin{equation}
MAD = \frac{1}{n} \sum_{i=1}^{n} |x_{i} - \mu| {\qquad [7a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. mad-sample">
$$
\begin{equation}
MAD = \frac{1}{n} \sum_{i=1}^{n} |x_{i} - \overline{x}| {\qquad [7b] \qquad}
\end{equation}
$$
</div>

###### Standard Deviation
{: .no_toc}
Standard deviation measures the spread of data around the mean. 

For populations:
<div id="eq. sd-population">
$$
\begin{equation}
\sigma = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (x_{i} - \mu)^{2}} {\qquad [8a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. sd-sample">
$$
\begin{equation}
s = \sqrt{\frac{1}{n-1} \sum_{i=1}^{n} (x_{i} - \overline{x})^{2}} {\qquad [8b] \qquad}
\end{equation}
$$
</div>

The difference lies in the denominator, where $n-1$ (Bessel’s correction) is used for samples to provide an unbiased estimator.

###### Variance
{: .no_toc}
Variance measures the average squared deviations from the mean.

For populations:
<div id="eq. sd-population">
$$
\begin{equation}
\sigma^2 = \frac{1}{n} \sum_{i=1}^{n} (x_{i} - \mu)^{2} {\qquad [9a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. sd-sample">
$$
\begin{equation}
s^2 = \frac{1}{n-1} \sum_{i=1}^{n} (x_{i} - \overline{x})^{2} {\qquad [9b] \qquad}
\end{equation}
$$
</div>

The distinction is similar to that of standard deviation.

###### Quartiles
{: .no_toc}
Quartiles divide the data into four equal parts. $Q1$ is the median of the lower half, $Q2$ is the median of the dataset, and $Q3$ is the median of the upper half. The method for calculating quartiles is consistent across sample and population data.

###### Interquartile Range
{: .no_toc}
The interquartile Range (IQR) is the difference between the third and first quartiles ($Q3$ - $Q1$), measuring the middle 50% spread of the data. There is no variation in calculating IQR between samples and populations.

###### Outliers
{: .no_toc}
Outliers are data points significantly distant from other observations. They are typically identified using the IQR; values below $Q1 - 1.5 \times IQR$ or above $Q3 + 1.5 \times IQR$ are considered outliers. This identification method applies equally to sample and population data.

###### Sum of Squares
{: .no_toc}
The sum of squares (SS) is the sum of squared differences from the mean. 

For populations:
<div id="eq. ss-population">
$$
\begin{equation}
SS = \sum_{i=1}^{n} (x_{i} - \mu)^{2} {\qquad [10a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. ss-sample">
$$
\begin{equation}
SS = \sum_{i=1}^{n} (x_{i} - \overline{x})^{2} {\qquad [10b] \qquad}
\end{equation}
$$
</div>

This foundational calculation underpins variance and standard deviation.

###### Standard Error of the Mean
{: .no_toc}
The standard error of the mean (SEM) measures the accuracy with which a sample represents a population. 

For populations:
<div id="eq. sem-population">
$$
\begin{equation}
SEM = \frac{\sigma}{\sqrt{n}} {\qquad [11a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. sem-sample">
$$
\begin{equation}
SEM = \frac{s}{\sqrt{n}} {\qquad [11b] \qquad}
\end{equation}
$$
</div>

###### Skewness
{: .no_toc}
Skewness ($\gamma_1$) is a measure of the asymmetry of the probability distribution of a real-valued random variable. Positive skewness indicates a distribution with an asymmetric tail extending towards more positive values, and negative skewness indicates a tail that extends towards more negative values. 

For populations:
<div id="eq. gamma-population">
$$
\begin{equation}
\gamma_{1} = \frac{ \sum_{i=1}^{n} (x_{i} - \mu)^{3}}{n\sigma^{3}} {\qquad [12a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. gamma-sample">
$$
\begin{equation}
\gamma_{1} = \frac{n}{(n-1)(n-2)} \sum_{i=1}^{n} \left( \frac{x_{i} - \overline{x}}{s} \right)^{3} {\qquad [12b] \qquad}
\end{equation}
$$
</div>

###### Kurtosis
{: .no_toc}
Kurtosis ($\beta_2$) measures the "tailedness" of the probability distribution of a real-valued random variable. High kurtosis in a data set is an indicator of substantial outliers. 

For populations:
<div id="eq. beta-population">
$$
\begin{equation}
\beta_{2} = \frac{ \sum_{i=1}^{n} (x_{i} - \mu)^{4}}{n\sigma^{4}} {\qquad [13a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. beta-sample">
$$
\begin{equation}
\beta_{2} = \frac{n(n+1)}{(n-1)(n-2)(n-3)} \frac{\sum_{i=1}^{n} (x_{i} - \overline{x})^{4}}{s^{4}} {\qquad [13b] \qquad}
\end{equation}
$$
</div>

###### Kurtosis Excess
{: .no_toc}
Excess kurtosis ($\alpha_4$) is calculated by subtracting 3 from the standard kurtosis measurement. This adjustment helps to compare the tails of the distribution to those of a normal distribution, which has a kurtosis of 3.

For populations:
<div id="eq. alpha-population">
$$
\begin{equation}
\alpha_{4} = \frac{ \sum_{i=1}^{n} (x_{i} - \mu)^{4}}{n\sigma^{4}} - 3 {\qquad [14a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. alpha-sample">
$$
\begin{equation}
\alpha_{4} = \frac{n(n+1)}{(n-1)(n-2)(n-3)} \frac{\sum_{i=1}^{n} (x_{i} - \overline{x})^{4}}{s^{4}} - \frac{3(n-1)^{2}}{(n-2)(n-3)} {\qquad [14b] \qquad}
\end{equation}
$$
</div>

###### Coefficient of Variation
{: .no_toc}
The coefficient of variation (CV) is a standardized measure of dispersion of a probability distribution or frequency distribution. 
  
For populations:
<div id="eq. cv-population">
$$
\begin{equation}
CV = \frac{\sigma}{\mu} {\qquad [15a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. cv-sample">
$$
\begin{equation}
CV = \frac{s}{\overline{x}} {\qquad [15b] \qquad}
\end{equation}
$$
</div>  

This measure is useful because it allows comparison between distributions with different units or means.

###### Relative Standard Deviation
{: .no_toc}
The relative standard deviation (RSD) is expressed as a percentage and describes the dispersion or variability relative to the mean of the data. 

For populations:
<div id="eq. rsd-population">
$$
\begin{equation}
RSD = \left[ \frac{100 \times \sigma}{\mu} \right]\% {\qquad [16a] \qquad}
\end{equation}
$$
</div>

For samples:
<div id="eq. rsd-sample">
$$
\begin{equation}
RSD = \left[ \frac{100 \times s}{\overline{x}} \right]\% {\qquad [16b] \qquad}
\end{equation}
$$
</div> 

###### Frequency
{: .no_toc}
Frequency ($f_1$) refers to the number of times a particular data point or value appears in a dataset. It is a simple yet fundamental measure used to describe the distribution of data values. The basic formula for frequency is: 

<div id="eq. f1-sample">
$$
\begin{equation}
f_{i} = \text{Number of occurrences of value } \times x_{i} {\qquad [17] \qquad}
\end{equation}
$$
</div>

where $f_{i}$ represents the frequency of the $i$-th value $x_{i}$.

Use the `Descriptive Statistics` function by browsing in the top ribbon: 

| Statistics $$\rightarrow$$ Basic Statistics $$\rightarrow$$ Descriptive Statistics |

#### Input
{: .no_toc }
The input spreadsheet consists of multiple columns, each representing a distinct dataset on which descriptive statistics will be utilized.

#### Configuration
{: .no_toc }

|**List of statistics**| Select the appropriate methods for conducting descriptive statistics analysis by clicking on the corresponding radio buttons. The available statistics are described above. |
|**Select Type**| Select from the dropdown list the option that describes wether the data represents a sample or population. |

#### Output
{: .no_toc }
In the output sheet, descriptive statistics analysis is performed by applying selected statistical measures to each dataset represented in the input sheet. The results display the statistical measures alongside their corresponding datasets in the respective columns.

#### Example
{: .no_toc }

###### Input
{: .no_toc }
The input sheet on the left hand-side is organized with individual columns representing each data set. Insert the data sets in a manner that allows for independent analysis of each set when performing descriptive statistics.

<div style="text-align: center;">
<img src="images/Descriptive Statistics/input.png" alt="input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }

1. Select `Statistics` $$\rightarrow$$ `Basic Statistics` $$\rightarrow$$ `Descriptive Statistics`.
1. Click on the statistics that you wish to calculate for the input data [1] and determine whether the data correspond to `Population` or `Sample` [2]. 
1. Click on the `Execute` button [3] to calculate the selected statistics.

<div style="text-align: center;">
<img src="images/Descriptive Statistics/configuration.svg" alt="configuration" width="250" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The right-hand side of the output sheet displays individual datasets per column, accompanied by the corresponding statistical measure chosen on each row.

<div style="text-align: center;">
<img src="images/Descriptive Statistics/output.PNG" alt="output" width="400" height="300" class="img-responsive">
</div>

---

## Confidence Intervals

A confidence interval (CI) is a statistical tool used to estimate the range within which a population parameter (like a mean or proportion) is likely to fall, based on information from sample data<sup>[1](#references-confidence)</sup>. This interval is constructed around the sample estimate and provides an indication of where the true parameter might be with a certain level of confidence, usually expressed as a percentage like 95% or 99%.<sup>[2](#references-confidence)</sup>


To calculate a confidence interval, you typically need the sample mean (which provides a central estimate), the standard deviation (which measures the spread of the data), and the sample size (the number of data points). For proportions, you use the sample proportion instead of the mean. The formula for a confidence interval generally involves the sample statistic plus or minus a margin of error ([Eq. 1](#eq. confidence1)), which is derived from the standard deviation and the sample size, adjusted by a factor from a statistical distribution (like the Z-score in large samples or the t-score in smaller samples)<sup>[1,2](#references-confidence)</sup>.

The confidence interval when considering sample data is calculated based on below formula:

<div id="eq. confidence1">
$$
\begin{equation}
CI = \left( \overline{x} \pm t_{\text{critical}} \times \frac{s}{\sqrt{n}} \right) {\qquad [1] \qquad}
\end{equation}   
$$
</div>

where <span>$$\begin{equation}
\overline{x}
\end{equation}$$</span> is the sample mean, $s$ is the standard deviation of the sample data, $n$ is the sample data size and <span>$$\begin{equation}t_{\text{critical}} \end{equation}$$</span> is derived from the t-distribution, which accounts for degrees of freedom (df) that depend on the sample size and is found using [Eq. 2](#eq. confidence2) when confidence level is for example 95%:

<div id="eq. confidence2">
$$
\begin{equation}
t_{\text{critical}} = t_{\frac{\alpha}{2}, df} {\qquad [2] \qquad}
\end{equation}   
$$
</div>

where <span>$$\begin{equation}df=n-1\end{equation}$$</span> and $\alpha$ is the significance level which is calculated as <span>$$\begin{equation}\alpha=1-\text{confidence level}\end{equation}$$</span>. The value <span>$$\begin{equation}\frac{\alpha}{2}\end{equation}$$</span> reflects the two-tailed nature of the typical confidence interval (e.g. for 95 % confidence interval, <span>$$\begin{equation}\alpha=0.05\end{equation}$$</span> and <span>$$\begin{equation}\frac{\alpha}{2}=0.025\end{equation}$$</span>).<sup>[2](#references-confidence)</sup>

The confidence interval when considering population data is calculated based on [Eq. 3](#eq. confidence3):

<div id="eq. confidence3">
$$
\begin{equation}
CI = \left( \mu \pm Z_{\text{critical}} \times \frac{\sigma}{\sqrt{n}} \right) {\qquad [3] \qquad}
\end{equation}   
$$
</div>

Where $μ$ is the population mean, $σ$ is the standard deviation of the population data, $n$ is the population size and <span>$$\begin{equation}Z_{\text{critical}}\end{equation}$$</span> is derived from the standard normal distribution (Z-distribution), which is symmetric and has a mean of zero and a standard deviation of one. The <span>$$\begin{equation}Z_{\text{critical}}\end{equation}$$</span> value for a given confidence level  is: 


<div id="eq. confidence4">
$$
\begin{equation}
Z_{\text{critical}} = Z_{\frac{\alpha}{2}} {\qquad [4] \qquad}
\end{equation}   
$$
</div>

Where $$\frac{\alpha}{2}$$ again accounts for the two-tailed nature of the test or interval. For a 95 % confidence interval, you look up or calculate the Z-value that corresponds to 97.5 % of the distribution (since 2.5 % is in each tail).<sup>[2](#references-confidence)</sup>

The confidence interval when considering population proportion is calculated based on [Eq. 5](#eq. confidence5):

<div id="eq. confidence5">
$$
\begin{equation}
CI = \left( p \pm z_{\text{critical}} \times \sqrt{\frac{p(1-p)}{n}} \right) {\qquad [5] \qquad}
\end{equation}   
$$
</div>

where $p$ is the sample proportion and is calculated as <span>$$\begin{equation}p = \frac{X}{n}\end{equation}$$</span>: where X is the number of successes in the dataset and n is the total sample size.

Isalos offers three methods for calculating confidence intervals. The first method involves inputting raw (sample) data, assumed to be a representative sample. In this method, the mean can be automatically calculated, and the user has the option to manually input the standard deviation value or allow the software to calculate it automatically. This flexible approach allows for accurate estimation of confidence intervals based on the provided sample raw data. The second method requires the user to manually enter the mean value, standard deviation, and sample size. Additionally, the user must indicate whether the data represents a sample or population. The third method calculates confidence intervals based on proportions. Here, the user needs to specify the probability and sample size.

These different calculation options in Isalos provide flexibility and accommodate various scenarios for estimating confidence intervals with ease and accuracy. All the above three options allow the user to manually specify the confidence level.


---

### Raw Data

As previously mentioned, the confidence intervals can be calculated using input raw (sample) data. The mean is automatically calculated, and the user has the option to manually enter or automatically calculate the standard deviation of the sample data. Additionally, the user can specify the desired confidence level for the calculation of the confidence intervals.

Use the `Raw Data` function for calculating confidence intervals by browsing in the top ribbon: 

|Statistics $$\rightarrow$$ Basic Statistics $$\rightarrow$$ Confidence Intervals $$\rightarrow$$ Raw Data|

#### Input
{: .no_toc}

Users are allowed to input numerical values in any columns of their choice, without being constrained by specific limitations on the number of columns. It is important to note that the calculation will be rendered unable to be performed if categorical or text data is inserted.

#### Configuration
{: .no_toc}

| **Confidence level (α)** | Manually insert confidence level which may range from 0 to 100. |
| **Standard Deviation Method** | Select any of the two options available, user-defined (`Select by the user`) or calculate the standard deviation based on the provided data (`Autocalculate from input data`). |
| **Standard Deviation** | If the previous option, `Select by the user` is chosen then enter manually the value that represents the standard deviation of the sample data. |
| **Include/exclude columns** | Select manually the columns that are going to be used for the calculation of the confidence interval through the dialog window: Use the buttons to move columns between the `Included Columns` and `Excluded Columns` list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. |

#### Output
{: .no_toc}

The confidence interval is computed for each selected column, and the resulting values are presented in the output data sheet. Specifically, the lower limit is displayed in one row, while the upper limit is presented in another row.

#### Example
{: .no_toc}

###### Input
{: .no_toc}

In the left-hand spreadsheet, each column specifies a data set for which we are interested in performing calculations for confidence intervals.

<div style="text-align: center;">
<img src="images/Confidence Intervals/raw-data-input.png" alt="Raw Data input" width="300" height="200" class="img-responsive">
</div>

###### Configuration
{: .no_toc}

1.   Select `Statistics` $$\rightarrow$$ `Basic Statistics` $$\rightarrow$$ `Confidence Intervals` $$\rightarrow$$ `Raw Data`. 
1.   Select `Confidence Level (α)` [1]. The value will range from 0 to 100.
1.   Select one of the two available options for the `Standard Deviation Method` [2]: either `Autocalculate from input data` or `Select by the user`. If you choose the option to `Select by the user`, enter the value of the `Standard Deviation` [3].
1.   Select the columns that are going to be used in the calculation by clicking on the arrow buttons [4] and moving columns between the `Excluded Columns` and `Included Columns` lists.
1.   Click on the `Execute` button [5] to apply the confidence intervals calculation on the selected columns.

<div style="text-align: center;">
<img src="images/Confidence Intervals/raw-data.svg" alt="Raw Data" width="400" height="200" class="img-responsive">
</div>

###### Configuration
{: .no_toc}

The output data of the calculation is presented in the right-hand spreadsheet of the tab, displaying the "Lower Limit" and "Upper Limit" for each selected column. These values indicate the range of the confidence interval.

<div style="text-align: center;">
<img src="images/Confidence Intervals/raw-data-output.png" alt="Raw Data output" width="400" height="200" class="img-responsive">
</div>

---

### Sample Size, Mean and Standard Deviation

This method offers the flexibility to the user to input the desired sample size, mean, and standard deviation, and to choose between sample data or population data representation. The user can also specify the confidence level.

Use the `Sample Size, Mean and Standard Deviation` function for calculating confidence intervals by browsing in the top ribbon:

|Statistics $$\rightarrow$$ Basic Statistics $$\rightarrow$$ Confidence Intervals $$\rightarrow$$ Sample Size, Mean and Standard Deviation|

#### Input
{: .no_toc}

No input data are needed to use this function.

#### Configuration
{: .no_toc}

| **Confidence level (α)** | Manually insert confidence level which may range from 0 to 100. |
| **Sample size (n)** | Insert the number of data points in the dataset. |
| **Mean ($\overline{\text{x}}$)** | Type the mean value of the dataset. |
| **Population/Sample** | Select any of the two options available, `σ` or `s` that denotes that the dataset is population or sample data, respectively. |
| **Standard Deviation** | Type the value that represents the standard deviation of the data. |

#### Output
{: .no_toc}

The output datasheet presents the Lower Limit and Upper Limit values in separate rows.

#### Example
{: .no_toc}

###### Input
{: .no_toc}

The left-hand spreadsheet contains a column that is populated with the necessary data for calculating the confidence interval.

<div style="text-align: center;">
<img src="images/Confidence Intervals/sample-input.png" alt="Sample input" width="250" height="200" class="img-responsive">
</div>

###### Configuration
{: .no_toc}

1.   Select `Statistics` $$\rightarrow$$ `Basic Statistics` $$\rightarrow$$ `Confidence Intervals` $$\rightarrow$$ `Sample Size, Mean and Standard Deviation`.
1.   Type the `Confidence Level` [1]. The value will range from 0 to 100.
1.   Type the  `Sample Size (n)` [2].
1.   Type the  `Mean ($\overline{\text{x}}$)` [3].
1.   Select one of the two available options for the `Population/Sample` [4]: either `σ` or `s` that denotes that the dataset is population or sample data, respectively.
1.   Click on the `Execute` button [5] to apply the confidence intervals calculation.

<div style="text-align: center;">
<img src="images/Confidence Intervals/sample.svg" alt="Sample" width="400" height="200" class="img-responsive">
</div>

###### Output
{: .no_toc}

The output data of the calculation is presented in the right-hand spreadsheet of the tab, displaying the Lower Limit and Upper Limit.

<div style="text-align: center;">
<img src="images/Confidence Intervals/sample-output.png" alt="Sample output" width="300" height="200" class="img-responsive">
</div>

---

### Population Proportion

This method illustrates how the confidence interval provides a range of plausible values for the population proportion based on the sample data, factoring in the given level of confidence.

Use the `Population Proportion` function for calculating confidence intervals by browsing in the top ribbon:

|Statistics $$\rightarrow$$ Basic Statistics $$\rightarrow$$ Confidence Intervals $$\rightarrow$$ Population Proportion|

#### Input
{: .no_toc}

Ensure that the input datasheet contains only one column of data. The data should be of nominal type and are divided into distinct categories that are mutually exclusive. Examples of such categories include "yes" or "no" responses, "male" or "female" categories, "pass" or "fail" outcomes, etc. If integer values are used to represent these categories, such as 1 or 0, it is acceptable.

#### Configuration
{: .no_toc}

| **Confidence level** | Manually insert confidence level which may range from 0 to 100. |
| **Sample size (n)** | Insert the number of data points in the dataset. |
| **Possibility (p)** | Enter the value that represents the sample proportion. |

#### Output
{: .no_toc}

The output datasheet presents the Lower Limit and Upper Limit values in separate rows.

#### Example
{: .no_toc}

###### Input
{: .no_toc}

The left-hand spreadsheet contains a column that is populated with the necessary data for calculating confidence intervals for a population proportion.

<div style="text-align: center;">
<img src="images/Confidence Intervals/population-input.png" alt="Population Proportion
 input" width="250" height="200" class="img-responsive">
</div>

###### Configuration
{: .no_toc}

1.   Select `Statistics` $$\rightarrow$$ `Basic Statistics` $$\rightarrow$$ `Confidence Intervals` $$\rightarrow$$ `Population Proportion`.
1.   Type the  `Confidence Level` [1]. The value will range from 0 to 100.
1.   Type the  `Sample Size (n)` [2].
1.   Type the  `Possibility (p)` [3].
1.   Click on the `Execute` button [4] to apply the confidence intervals calculation.

<div style="text-align: center;">
<img src="images/Confidence Intervals/population.svg" alt="Population Proportion" width="350" height="200" class="img-responsive">
</div>

###### Output
{: .no_toc}

The output data of the calculation is presented in the right-hand spreadsheet of the tab, displaying the Lower Limit and Upper Limit. This interval suggests that we are 95% confident that the true proportion of "yes" responses in the population lies between 41.6% and 98.4%.

<div style="text-align: center;">
<img src="images/Confidence Intervals/population-output.png" alt="Population Proportion Output" width="350" height="200" class="img-responsive">
</div>

---

## Correlation Analysis

Correlation analysis quantifies the strength and direction of the linear or monotonic relationship between pairs of numerical columns. For each pair of included columns a correlation coefficient and an associated p-value are computed. Optionally, columns that are redundant with respect to a user-defined threshold are identified and flagged for removal, supporting feature selection workflows.<sup>[1](#references-basic-statistics)</sup>

Three correlation methods are available:

**Pearson** — measures the linear relationship between two continuous variables. The Pearson correlation coefficient r is calculated as:

$$
r =
\frac{
\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})
}{
\sqrt{
\sum_{i=1}^{n}(x_i-\bar{x})^2
\sum_{i=1}^{n}(y_i-\bar{y})^2
}
}
$$

where x<sub>i</sub> and y<sub>i</sub> are the paired observations, x̄ and ȳ are their respective means, and n is the number of paired observations. The coefficient r ranges from −1 (perfect negative linear correlation) to +1 (perfect positive linear correlation), with 0 indicating no linear correlation.

P-values are computed from the t-distribution with n − 2 degrees of freedom:

$$
t = r \sqrt{\frac{n-2}{1-r^2}}, \quad
p = 2\left(1-F_t\left(|t|,\,n-2\right)\right)
$$

**Spearman** — a rank-based measure of monotonic association. Data are replaced by their ranks and Pearson's formula is applied to the ranked values. P-values use the same t-statistic approximation as Pearson.

**Kendall's Tau** — measures the proportion of concordant minus discordant pairs relative to the total number of pairs. The p-value is computed from a normal approximation of the S statistic with variance correction for tied values:

$$z = \frac{S}{\sqrt{\mathrm{Var}(S)}}, \quad p = 2\,\Phi(-|z|)$$

where S = τ · √((n₀ − tieX)(n₀ − tieY)), n₀ = n(n−1)/2, and Var(S) includes tie-correction terms for both variables.

**Redundancy filtering**

When a threshold is specified, the algorithm performs a greedy forward sweep over all pairs (i, j) with i < j in the order they appear in the Included Columns list. If abs(coefficient(i, j)) ≥ threshold and column i has not already been flagged for removal, column j is flagged. The `Removed | Highly Correlated` column in the output records which column was flagged and by which column it was first made redundant, tracing the justification back to the original root cause. Columns that survive (are never flagged) are appended to the output table as data columns. When no threshold is set (or threshold = 1.0), no columns are flagged and all included columns are appended to the output.

Use the `Correlation Analysis` function by browsing in the top ribbon:

| Statistics $$\rightarrow$$ Basic Statistics $$\rightarrow$$ Correlation Analysis |

#### Input
{: .no_toc }

The input spreadsheet consists of numerical columns without missing values. At least 2 complete numerical columns are required. Columns with missing values are automatically excluded from the available column list.

#### Configuration
{: .no_toc }

| **Excluded Columns** | Lists all eligible numerical columns not yet selected. |
| **Included Columns** | Lists the columns to be analysed. At least 2 columns must be present. |
| **Method** | Select the correlation method: `Pearson`, `Spearman`, or `Kendall's Tau`. Default: Pearson. |
| **Threshold** | Specify a value in [0.0, 1.0] for the redundancy-filtering threshold. Pairs whose absolute correlation coefficient meets or exceeds this value trigger removal of the later column. Default: 1.0. |

#### Output
{: .no_toc }

The output table contains one row per column pair, followed by the surviving data columns appended to the right. The fixed columns are:

| Column | Content |
|---|---|
| `Column 1` | Name of the first column in the pair. |
| `Column 2` | Name of the second column in the pair. |
| `Correlation Value` | The computed correlation coefficient for this pair. |
| `p-Value` | The p-value associated with the computed correlation coefficient, indicating the statistical significance of the observed correlation. |
| `Removed \| Highly Correlated` | If a column is flagged as redundant on this row, contains `<Removed column> \| <Highly-Correlated column>`; otherwise empty. |

After the five fixed columns, each surviving column (not flagged for removal) is appended as a data column with its original values.

#### Example
{: .no_toc }

##### Input
{: .no_toc }

In the left-hand spreadsheet of the tab import the data matrix. Each column should represent a distinct numerical variable to be correlated. Columns with missing values will not be available for selection.

<div style="text-align: center;">
<img src="images/Correlation Analysis/correlation-analysis-input.png" alt="Correlation Analysis input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. Select `Statistics` $$\rightarrow$$ `Basic Statistics` $$\rightarrow$$ `Correlation Analysis`.
1. Move the columns to analyse from the `Excluded Columns` list [1] to the `Included Columns` list [2] using the arrow buttons [3].
1. Select the correlation `Method` [4]: Pearson, Spearman, or Kendall's Tau.
1. Optionally enter a `Threshold` [5] in [0.0, 1.0] to enable redundancy filtering. Leave blank to report all pairs without flagging any column.
1. Click the `Execute` button [6] to run the analysis.

<div style="text-align: center;">
<img src="images/Correlation Analysis/correlation-analysis-configuration.png" alt="Correlation Analysis configuration" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }

In the right-hand spreadsheet of the tab, each row corresponds to one column pair. The first five columns report the pair names, correlation coefficient, p-value, and any redundancy flag. Surviving columns (not flagged for removal) are appended to the right as data columns.

<div style="text-align: center;">
<img src="images/Correlation Analysis/correlation-analysis-output.png" alt="Correlation Analysis output" width="400" height="300" class="img-responsive">
</div>

---
## Hypothesis Testing
Hypothesis testing is a statistical method used to decide whether the sample data sufficiently supports a particular hypothesis about a population. It generally involves formulating two competing hypotheses, the null hypothesis ($H_0$) and the alternative hypothesis ($H_a$), and then collecting data to assess the evidence. The null hypothesis ($H_0$) is the hypothesis that there is no effect or difference, and it assumes that any observed differences in the data are due to random chance. The alternative Hypothesis ($H_a$) is the hypothesis that challenges the null, proposing that there is a true effect or difference in the population.

---

The goal of hypothesis testing is to determine whether there is sufficient evidence to reject the null hypothesis. If the evidence is not strong enough, we fail to reject $H_0$, meaning the sample data does not provide enough proof against it.

The first step in hypothesis testing is to state the null and alternative hypotheses and then select a significance level ($a$) which represents the threshold for rejecting the null hypothesis, typically set at 0.05 (5%), meaning there’s a 5% chance of rejecting the null hypothesis when it is actually true (Type I error). Common values for $a$ are 0.05 (5%) and 0.01 (1%).

The next step involves choosing the test statistic. The test statistic depends on the nature of the data and the hypotheses being tested. Common test statistics include the Z-statistic (for large sample sizes or known population variance) and the t-statistic (for smaller sample sizes or unknown population variance).

For a Z-test: <!--(when population standard deviation $\sigma$ is known or large sample size):-->

<div id="eq. Z-test">
$$
\begin{equation}
Z = \frac{\bar{x} - \mu_0}{\frac{\sigma}{\sqrt{n}}} {\qquad [1] \qquad}
\end{equation}
$$
</div>

For a t-test: <!--(when population standard deviation is unknown, and sample size is small):-->

<div id="eq. t-test">
$$
\begin{equation}
t = \frac{\bar{x} - \mu_0}{\frac{s}{\sqrt{n}}} {\qquad [2] \qquad}
\end{equation}
$$
</div>

Where $\bar{x}$ is the sample mean, $\sigma$ and $s$ are the population and sample standard deviation repsectively, $n$ is the sample size and $\mu_0$ is the assumed mean of the population under the null hypothesis.

After computing the test statistic, we follow up by either calculating the p-value or comparing the test statistic with a critical value. The p-value measures the probability of obtaining a test statistic at least as extreme as the one computed, assuming the null hypothesis is true. If the p-value is less than the chosen significance level ($a$), we reject $H_0$. In some cases, you compare the test statistic directly to a critical value derived from a statistical distribution ($Z$ or $t$). If the test statistic exceeds the critical value, reject $H_0$.

There are two main types of hypothesis tests:

* One-Tailed Test. This test assesses if the population parameter is either greater than or less than a specific value. For example: 

<div id="eq. one-tailed">
$$
\begin{equation}
H_0: \, \mu \leq \mu_0 \, \text{or} \, \mu \geq \mu_0 \, (\text{depending on the research question})
\end{equation}
$$

$$
\begin{equation}
H_a: \, \mu > \mu_0 \, \text{or} \, \mu < \mu_0 \, (\text{depending on the research question}) {\qquad [3] \qquad}
\end{equation}
$$
</div>

* Two-Tailed Test. This test checks for any difference, whether positive or negative, from the hypothesized value. For example:

<div id="eq. two-tailed">
$$
\begin{equation}
H_0: \mu = \mu_0 \quad H_a: \mu \neq \mu_0 {\qquad [4] \qquad}
\end{equation}
$$
</div>

Isalos offers three methods for conducting hypothesis tests. The first method is called `Sample Size, Mean and Standard Deviation` and requires the user to input the sample size, the sample mean, select whether the standard deviation is known or calculated from the sample and give its value. The software then performs a Z-test if the population standard deviation is known or a t-test if it is unknown, based on the inputted hypotheses and significance level. The second method is called `One Sample T-test` and involves inputting raw (sample) data. In this method, the mean and the standard deviation are automatically calculated from the sample and then a t-test for the given hypotheses and significance level is performed. Finally, the last method is called `One Sample Z-test`,  and  also involves inputting raw (sample) data. Here, only the mean is automatically calculated from the sample, while the standard deviation is given from the user, and then a Z-test for the given hypotheses and significance level is performed. 

These different hypothesis testing options in Isalos offer flexibility and can accommodate a variety of testing scenarios with ease and precision. All three methods allow the user to manually specify the significance level, ensuring accurate testing for a wide range of hypotheses.

---
### Sample Size, Mean and Standard Deviation

This method offers the flexibility to the user to input the desired sample size, mean, and standard deviation, and to choose between known ($σ$) or unknown ($s$) standard deviation. The user can also specify the significance level and the hypotheses.

Use the `Sample Size, Mean and Standard Deviation` for conducting Hypothesis Testing by browsing in the top ribbon:

| Statistics $$\rightarrow$$ Basic Statistics $$\rightarrow$$ Hypothesis Testing |

And then in the `Select Method` option choose `Sample Size, Mean and Standard Deviation`.

#### Input
{: .no_toc }
This method does not require any input in terms of raw (sample) data.

#### Configuration
{: .no_toc }

|**H$_0$: μ$_0$**| Manually insert the hypothesized mean. |
|**H$_a$: μ$_a$**| Select any of the three options available for the alternative hypothesis (`<`, `≠`, `>`). |
|**Significance level (α)**| Manually insert the significance level which may range from 0 to 1. |
|**Sample size (n)**| Insert the number of data points in the dataset. |
|**Mean ($\bar{x}$)**| Select the mean value of the dataset. |
|**Standard Deviation Method**| Select any of the two options available, `Known StandardDeviation (σ)` or `Unknown StandardDeviation (s)`. |
|**Standard Deviation**| Type the value that represents the standard deviation of the data. |

#### Output
{: .no_toc }
The hypothesis test is performed, and the output spreadsheet displays the test statistic, the critical region (region of rejection), the p-value, and the decision regarding the null hypothesis—whether it was rejected or not.

#### Example
{: .no_toc }

###### Input
{: .no_toc }
This method does not require any data to be inputted into the input spreadsheet.

###### Configuration
{: .no_toc }

1. Select `Statistics` $$\rightarrow$$ `Basic Statistics` $$\rightarrow$$ `Hypothesis Testing`.
1. Select `Sample Size, Mean and Standard Deviation` as the desired method [1]. 
1. Manually insert the hypothesized mean [2]
1. Select from the dropdown menu one of the three available options for the alternative hypothesis $H_a$ [3]: either `<`, `≠` or `>`.
1. Select `Significance Level (α)` [4]. The value will range from 0 to 1.
1. Type the `Sample Size (n)` [5].
1. Select `Mean ($\bar{x}$)` [6].
1. Select one of the two available options for the `Known Standard Deviation (σ)` or `Standard Deviation (s)`  [7] : either $σ$ or $s$ will be inputted, therefore will know if standard deviation is known from population or calculated from sample.
1. Type the `Standard Deviation` [8].
1. Click on the `Execute` button [9] to perform hypothesis testing. 

<div style="text-align: center;">
<img src="images/Hypothesis Testing/sample_size_configuration.svg" alt="Sample size configuration" width="500" class="img-responsive">
</div>

###### Output
{: .no_toc }
The output data of the calculation is presented in the right-hand spreadsheet of the tab. It shows the value of the test statistic, the critical region, the p-value of the test and the decision which is  whether the null hypothesis was rejected or failed to be rejected.

<div style="text-align: center;">
<img src="images/Hypothesis Testing/sample_size_output.PNG" alt="Sample size output" width="300" class="img-responsive">
</div>

---
 
### One Sample T-test
This method allows the user to choose the null and alternative hypotheses and the significance level to perform an one sample T-test on raw data, that are stored in a single column.

Use the `One Sample T-test` method for performing hypothesis testing by browsing in the top ribbon:

| Statistics $$\rightarrow$$ Basic Statistics $$\rightarrow$$ Hypothesis Testing |

And then in the `Select Method` option choose `One Sample T-test`.

#### Input
{: .no_toc }
This method only allows hypothesis testing for a single column therefore users should fill the desired column with numerical values and not nominal values.

###### Configuration
{: .no_toc }

|**H$_0$: μ$_0$**| Manually insert the hypothesized mean. |
|**H$_a$: μ$_a$**| Select any of the three options available for the alternative hypothesis (`<`, `≠`, `>`). |
|**Significance level (α)**| Manually insert the significance level which may range from 0 to 1. |
|**Target Column**| Select which column you want to perform hypothesis testing on. |

###### Output
{: .no_toc }
The hypothesis test is performed, and the output spreadsheet displays the test statistic, the critical region (region of rejection), the p-value, and the decision regarding the null hypothesis—whether it was rejected or not.

#### Example
{: .no_toc }

###### Input
{: .no_toc }
The left-hand spreadsheet contains a column that is populated with the necessary to perform the One Sample T-test on.

<div style="text-align: center;">
<img src="images/Hypothesis Testing/t-test_input.png" alt="t-test input" width="350" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1. Select `Statistics` $$\rightarrow$$ `Basic Statistics` $$\rightarrow$$ `Hypothesis Testing`.      
1. Select `One Sample T-test` as the desired method [1]. 
1. Manually insert the hypothesized mean [2].
1. Select one of the three available options for the alternative hypothesis $H_a$ [3]: either `<`, `≠` or `>`.
1. Select `Significance Level (α)` [4]. The value will range from 0 to 1.
1. Select the `Target column` [5]  to perform hypothesis testing on. 
1. Click on the `Execute` button [6] to perform hypothesis testing.

<div style="text-align: center;">
<img src="images/Hypothesis Testing/t-test_configuration.svg" alt="t-test configuration" width="400" class="img-responsive">
</div>

###### Output
{: .no_toc }
The output data of the calculation is presented in the right-hand spreadsheet of the tab. It shows the value of the test statistic, the critical region, the p-value of the test and the decision which is  whether the null hypothesis was rejected or failed to be rejected. 

<div style="text-align: center;">
<img src="images/Hypothesis Testing/t-test_output.png" alt="t-test output" width="300" class="img-responsive">
</div>

---

### One Sample Z-test
This method allows the user to specify the null and alternative hypotheses, the significance level of the test and the population’s standard deviation (σ) to perform an one sample Z-test on raw data, that are stored in a single column.

Use the `One Sample Z-test` method for performing hypothesis testing by browsing in the top ribbon:

| Statistics $$\rightarrow$$ Basic Statistics $$\rightarrow$$ Hypothesis Testing |

And then in the `Select Method` option choosing `One Sample Z-test`.

#### Input
{: .no_toc }
This method only allows hypothesis testing for a single column therefore users should fill the desired column with numerical values and not nominal values.

###### Configuration
{: .no_toc }

|**H$_0$: μ$_0$**| Manually insert the hypothesized mean. |
|**H$_a$: μ$_a$**| Select any of the three options available for the alternative hypothesis (`<`, `≠`, `>`). |
|**Significance level (α)**| Manually insert the significance level which may range from 0 to 1. |
|**Target Column**| Select which column you want to perform hypothesis testing on. |
|**Population Standard Deviation (σ)**| Type the the standard deviation of the population which is a non-negative real number. |

###### Output
{: .no_toc }
The hypothesis test is performed, and the output spreadsheet displays the test statistic, the critical region (region of rejection), the p-value, and the decision regarding the null hypothesis—whether it was rejected or not.

#### Example
{: .no_toc }

###### Input
{: .no_toc }
The left-hand spreadsheet contains a column that is populated with the necessary to perform the One Sample Z-test on.

<div style="text-align: center;">
<img src="images/Hypothesis Testing/z-test_input.png" alt="z-test input" width="150" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1. Select `Statistics` $$\rightarrow$$ `Basic Statistics` $$\rightarrow$$ `Hypothesis Testing`.      
1. Select `One Sample Z-test`  as the desired method [1]. 
1. Manually insert the hypothesized mean [2].
1. Select one of the three available options for the alternative hypothesis $H_a$ [3]: either `<`, `≠` or `>`.
1. Select `Significance Confidence Level (α)` [4]. The value will range from 0 to 1.
1. Select the `Target Column` [5]  to perform hypothesis testing on. 
1. Manually insert the `Population Standard Deviation (σ)` [6].
1. Click on the `Execute` button [7] to perform hypothesis testing.

<div style="text-align: center;">
<img src="images/Hypothesis Testing/z-test_configuration.svg" alt="z-test configuration" width="400" class="img-responsive">
</div>

###### Output
{: .no_toc }
The output data of the calculation is presented in the right-hand spreadsheet of the tab. It shows the value of the test statistic, the critical region, the p-value of the test and the decision which is  whether the null hypothesis was rejected or failed to be rejected. 

<div style="text-align: center;">
<img src="images/Hypothesis Testing/z-test_output.png" alt="z-test output" width="350" class="img-responsive">
</div>

---
## Weight Cases
The term “weight cases” in statistics typically refers to the practice of assigning a weight to each case (or a data point) in a dataset to adjust for its importance or representativeness. In some data samples, certain groups may be over-represented or under-represented relative to their actual prevalence in the population data. Weights are used to correct these imbalances, ensuring that the results more accurately reflect the total population. Properly weighted data can provide more accurate and generalizable estimates that reflect the population from which the sample data was drawn. However, applying weights also typically increases the standard error of estimates, reflecting the added uncertainty from the weighting process<sup>[1](#references-weight-cases)</sup>. Weighting is particularly critical in complex survey designs and is widely implemented in fields ranging from public health to market research to correct for sampling and non-sampling errors<sup>[1](#references-weight-cases)</sup>.

Use the `Weight Cases` function by browsing in the top ribbon: 

|Statistics $$\rightarrow$$ Basic Statistics $$\rightarrow$$ Weight Cases|


#### Input 
{: .no_toc}

The input data required for weight cases calculation consists of integers or real values. It does not typically handle categorical or textual data directly without converting those into numerical values first, since the calculations require quantifiable inputs.

#### Configuration
{: .no_toc}

| **Include/exclude columns** | Select the columns manually from the available options within the dialog window to perform weight cases calculation: Use the buttons to move columns between the `Included Columns` and `Excluded Columns` list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. Columns with categorical features cannot be selected for weight cases calculation. |

#### Output
{: .no_toc}

The output displays the frequency and percentage distribution of values for each column in your input dataset. It lists distinct values in each column along with their count (instances) and proportion of the total (% instances), providing a concise summary of the data’s distribution across these variables.

#### Example
{: .no_toc}

###### Input
{: .no_toc}

In the left-hand spreadsheet, insert the data for each variable you plan to use for weight cases calculations. In this example, this includes entering the values for gender as integers, age and weight directly into their respective columns. Each row should represent a single data point, ensuring the dataset is structured correctly for further analysis and weight calculation.

<div style="text-align: center;">
<img src="images/Weight Cases/input.png" alt="Weight Cases input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc}

*   Select `Statistics` $$\rightarrow$$ `Basic Statistics` $$\rightarrow$$ `Weight Cases`.
*   Select the columns that are going to be used for weight cases calculation by clicking on the arrow buttons [3] and moving columns between the `Excluded Columns` [1] and `Included Columns` [2] lists. In this case the calculations are performed only for the columns 3-"age" and 4-"weight".
*   Click on the `Execute` button [4] to apply the weight cases calculation on the selected columns.

<div style="text-align: center;">
<img src="images/Weight Cases/weight.svg" alt="Weight Cases" width="450" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc}

In the right-hand spreadsheet of the tab the output data displays the count (instances) and percentage of the total occurrences (instances %) for each unique value for the selected columns.

<div style="text-align: center;">
<img src="images/Weight Cases/output.png" alt="Weight Cases output" width="550" height="300" class="img-responsive">
</div>

---

## References {#references-basic-statistics}
1. Jones, J.S., Exploratory and descriptive statistics. 2022: SAGE Publications Limited.
1.	Smithson, M., Confidence intervals. 2003: Sage. [doi.org/10.4135/9781412983761](https://doi.org/10.4135/9781412983761)
1.  Meeker, W.Q., G.J. Hahn, and L.A. Escobar, Statistical intervals: a guide for practitioners and researchers. Vol. 541. 2017: John Wiley & Sons.
1. Moore, DS, McCabe, GP. Introduction to the practice of statistics. WH Freeman/Times Books/Henry Holt & Co.; 1989.
1. Bluman, A. Elementary Statistics: A step by step approach 9e. McGraw Hill.; 2014.
1. Valliant, R. and J.A. Dever, Survey weights: a step-by-step guide to calculation. Vol. 1. 2018: Stata Press College Station, TX.

---

## Version History
Introduced in Isalos Analytics Platform v0.2.4

_Instructions last updated on August 2026_