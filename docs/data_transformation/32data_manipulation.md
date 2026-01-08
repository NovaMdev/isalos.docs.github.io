---
layout: default
title: 3.2 Data Manipulation
parent: 3. Data Transformation
nav_order: 2
permalink: /data-manipulation.html
---

# Data Manipulation
{: .no_toc }
This menu includes functionalities that enable the users to prepare their data for modelling and analysis. These functions correspond to standard pre-processing steps for the development of data analysis and machine learning workflows, such as data filtering, missing values filling, sorting and matrix transpose.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Remove Column(s)
This function identifies and removes columns containing redundant data. It removes included columns if there exists at least one distinct value that the percentage of its instances in the specific column is above the user-defined threshold.

Use the `Remove Column(s)` function by browsing in the top ribbon: 

| Data Transformation $$\rightarrow$$ Data Manipulation $$\rightarrow$$ Remove Column(s) |

### Input
{: .no_toc }
Data matrix with arbitrary data requiring filtering.

### Configuration
{: .no_toc }

|**Include/exclude columns**| Select manually the columns that are going to be subject to filtering through the dialog window: Use the buttons to move columns between the `Included Columns` (subject to filtering) and `Excluded Columns` list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. |
|**Threshold Percentage**| An integer number between (0, 100) indicating the cutoff threshold. Default value: 5. |

### Output
{: .no_toc }
Data matrix with filtered data. 

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data matrix that is going to be filtered.

<div style="text-align: center;">
<img src="images/Data manipulation/remove-columns-input.PNG" alt="remove-columns-input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select `Data Transformation` $$\rightarrow$$ `Data Manipulation` $$\rightarrow$$ `Remove Column(s)`.
1. Select the columns on which the filtering is going to be applied by clicking on the arrow buttons [3] and moving columns between the `Excluded Columns` [1] and `Included Columns` [2] lists. In this case only columns “petal_width” and “species” are subject to filtering.
1. Type the threshold value in the `Threshold Percentage` field [4].
1. Click on the `Execute` button [5] to apply the filtering on the selected columns.


<div style="text-align: center;">
<img src="images/Data manipulation/remove-columns-configuration.svg" alt="remove-columns-configuration" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab the output data matrix with the filtered columns. The `Excluded Columns` (“sepal_length”, “sepal_width”, and “petal_length”) remain intact in the output spreadsheet.

<div style="text-align: center;">
<img src="images/Data manipulation/remove-columns-output.PNG" alt="remove-columns-output" width="400" height="300" class="img-responsive">
</div>

---

## Select Column(s)
This function filters the input data matrix so that only the user-selected columns are passed to the output data matrix.

Use the `Select Columns` function by browsing in the top ribbon: 

| Data Transformation $$\rightarrow$$ Data Manipulation $$\rightarrow$$ Select Column(s) |

### Input
{: .no_toc }
Data matrix with arbitrary data requiring filtering.

### Configuration
{: .no_toc }

|**Include/exclude columns**| Select manually the columns that are going to be included in the output data matrix through the dialog window: Use the buttons to move columns between the `Included Columns` and `Excluded Columns` (filtered out) list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns.   |

### Output
{: .no_toc }
Data matrix with filtered data. 

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data matrix that is going to be filtered.

<div style="text-align: center;">
<img src="images/Data manipulation/remove-columns-input.PNG" alt="remove-columns-input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. 	Select `Data Transformation` $$\rightarrow$$ `Data Manipulation` $$\rightarrow$$ `Select Column(s)`.
1. Select the columns that are going to be filtered out by clicking on the arrow buttons [3] and moving columns between the `Excluded Columns` [1] and `Included Columns` [2] lists. In this case, the columns “sepal_length”, “petal_length” and “species” are going to be included in the output spreadsheet.
1. Click on the `Execute` button [4] to apply the filtering on the input columns.

<div style="text-align: center;">
<img src="images/Data manipulation/select-columns-configuration.svg" alt="select-columns-configuration" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab the output data matrix with the included columns “sepal_length”, “petal_length” and “species” is presented.

<div style="text-align: center;">
<img src="images/Data manipulation/select-columns-output.PNG" alt="select-columns-output" width="300" height="300" class="img-responsive">
</div>

---

## Matrix Transpose
This function transposes the input data table: it flips the table data by turning rows into columns and columns into rows.

To transpose any input table, browse in the top ribbon: 

|Data Transformation $$\rightarrow$$ Data Manipulation $$\rightarrow$$ Matrix Transpose |

### Input
{: .no_toc }
Data table to transpose.

### Output
{: .no_toc }
Table transposed by flipping rows and columns. Note that the new column types may differ from the original data types (the most general type is selected).

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data table that is going to be transposed.

<div style="text-align: center;">
<img src="images/Data manipulation/remove-columns-input.PNG" alt="remove-columns-input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. 	Select `Data Transformation`$$\rightarrow$$ `Data Manipulation` $$\rightarrow$$ `Matrix Transpose`.

<div style="text-align: center;">
<img src="images/Data manipulation/transpose.png" alt="transpose" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
The transposed input data table. In all columns the column type is changed to string (S).

<div style="text-align: center;">
<img src="images/Data manipulation/transpose-output.PNG" alt="transpose-output" width="500" height="300" class="img-responsive">
</div>

---

## Sort by Column
This function sorts the input data table according to a user-selected column.

To sort any input table, browse in the top ribbon: 

| Data Transformation $$\rightarrow$$ Data Manipulation $$\rightarrow$$ Sort by Column |

### Input
{: .no_toc }
Data table to be sorted. Both numerical and string values are accepted.

### Configuration
{: .no_toc }

|**Select Column**| Select from the dropdown list the column name corresponding to the column according to which the data should be sorted. |
|**Select Method**| Select whether it should be sorted in `ascending` or `descending` order. |

### Output
{: .no_toc }
The sorted table.

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data table that is going to be sorted.

<div style="text-align: center;">
<img src="images/Data manipulation/sort-input.PNG" alt="sort-input" width="500" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1.	Select `Data Transformation` $$\rightarrow$$ `Data Manipulation` $$\rightarrow$$ `Sort by Column`.
1.	Select the query column [1] and the order method [2].
1.	Click on the `Execute` button [3] to sort the input table.


<div style="text-align: center;">
<img src="images/Data manipulation/sort-configuration.svg" alt="sort-configuration" width="500" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
The sorted input data table. In this case data rearrangement is performed according to the “year” column.

<div style="text-align: center;">
<img src="images/Data manipulation/sort-output.PNG" alt="sort-output" width="500" height="300" class="img-responsive">
</div>

---

## Fill Missing Column(s) Values
In cases of missing values in some variables, to prevent complications during statistical analysis or modeling, you can impute them using the `Fill Missing Column(s) Values`. The goal is to impute the missing values in a column as consistently as possible without many arbitrary decisions, so that the subsequent data analysis is not affected on the imputed values. Some standard imputation methodologies are presented bellow:

##### Numerical values
{: .no_toc }
* **Mean**: Missing values are replaced by the mean value of the variable’s non-missing values within the same column. 
* **Mean of nearby points (or moving average)**: Missing values are replaced by the mean value of the cells located in the same column around the missing value cell. The range of positions (before and after the missing value cell) to be considered in the calculation is a user-defined parameter. If the nearby cells also contain missing values, then the mean value of all non-missing cells of the column is used.
* **Median**: Missing values are replaced by the median value of the variable’s non-missing values within the same column.
* **Median of nearby points**: Missing values are replaced by the median value of the cells located in the same column around the missing value cell. The range of positions (before and after the missing value cell) to be considered in the calculation is a user-defined parameter. If the nearby cells also contain missing values, then the median of all non-missing cells of the column is used.
* **Linear interpolation**: Missing values are filled in through linear interpolation using the values of the variables from the observation preceding and the one following the position of the missing value. This method cannot be applied if there are also rows with missing values before and/or after the row containing the missing value.
* **Linear trend at point**: This method is recommended for use with time series data, especially when there is a linear trend in the variable’s data in relation to the time sequence. Missing values are filled in through linear regression. In this case, the dependent variable is considered to be the variable-column itself, and the “position” of each value of the variable based on the time sequence is considered the independent variable.

##### Categorical values
{: .no_toc }
* **Most common value**: This method imputes missing values with the most frequently occurring value in the dataset. It’s a straightforward approach that assumes the most common value is a reasonable estimate for the missing values.
* **Existing values with same probability**: In this approach, missing values are imputed randomly from the existing values in the dataset. Each existing value has an equal probability of being selected to replace the missing value.
* **Existing values based on number of appearance**: This method imputes missing values randomly but considering the frequency of each value in the dataset. Values are imputed based on their occurrence in the dataset, with more frequent values having a higher chance of being selected to replace missing values.
* **Unique values**: The missing value is replaced by a unique identifier (i.e., “Unique Value 1”, “Unique Value 2”, etc.). 

To fill data gaps of any input table, browse in the top ribbon: 

|Data Transformation $$\rightarrow$$ Data Manipulation $$\rightarrow$$ Fill Missing Column(s) Values |

### Input
{: .no_toc }
Data matrix with at least two columns.

### Configuration
{: .no_toc }

|**Include/exclude columns**| Select manually the columns that are going to be treated through the dialog window: Use the buttons to move columns between the `Included Columns` and `Excluded Columns` (untreated columns) list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. |
|**Numerical Method**| Select from the dropdown list the method applied on the selected columns with numerical data to fill missing values between `Mean`, `Mean of Nearby Points`, `Median`, `Median of Nearby Points`, `Linear Interpolation`, `Linear Trend at point`. |
|**Span**| When the `Mean of Nearby Points` or `Median of Nearby Points` is selected, type the range of cells preceding and following the missing value cell that will be used to calculate the mean and median value, respectively. |
|**Categorical Method**| Select from the dropdown list the method applied on the selected columns with categorical data to fill missing values between `Most Common Value`, `Existing Values with Same Probability`, `Existing Values Based on Number of Appearance`, `Unique Values`. |

### Output
{: .no_toc }

The data matrix with imputed missing values.

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data table with the missing values.

<div style="text-align: center;">
<img src="images/Data manipulation/fill-missing-values-input.PNG" alt="fill-missing-values-input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1.	Select `Data Transformation` $$\rightarrow$$ `Data Manipulation` $$\rightarrow$$ `Fill Missing Column(s) Values`.
1.	Select the columns with missing values that are going to be imputed out by clicking on the arrow buttons [3] and moving columns between the `Excluded Columns` [1] and `Included Columns` [2] lists. 
1.	Select from the `Numerical Method` dropdown list [4] the method that is going to be applied to impute the missing numerical values (in this case to the missing values in the columns “Quality” and “Price”).
1.	Select from the `Categorical Method` dropdown list [5] the method that is going to be applied to impute the missing categorical values (in this case to the missing values in the column “Fruits”).
1.	Click on the Execute button [6] to apply the imputation methods on the input columns.

<div style="text-align: center;">
<img src="images/Data manipulation/fill-missing-values-configuration.svg" alt="fill-missing-values-configuration" width="700" height="300" class="img-responsive">
</div>


##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab, the missing values of the input table are replaced according to the configuration parameters. In this case, the missing value in “Fruits” column [1] is replaced by the label “Apples” (the most common value according to configuration) and the missing values in “Quality” and “Price” columns are replaced by 5 [2], [3] and 8.5 [4], [5], respectively (the median value of each column according to configuration).

<div style="text-align: center;">
<img src="images/Data manipulation/fill-missing-values-output.svg" alt="fill-missing-values-output" width="400" height="300" class="img-responsive">
</div>

---

## Tips
Fill Missing Column(s) Values:

* The use of the methods `Mean of Nearby Points`, `Median of Nearby Points`, and `Linear Trend at point` is recommended when the missing values are part of a time series, but they can also be used in other cases non-restrictively.

---
## Version History
Introduced in Isalos Analytics Platform v0.2.3

_Instructions last updated on June 2024_