---
layout: default
title: 7.3 Distribution and Density Charts
parent: 7. Plot & Business Intelligence
nav_order: 3
permalink: /distribution_density_charts.html
---

# Relationship and Trend Charts
{: .no_toc }

Short paragraph on Distribution and Density Charts

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## HeatMap Chart

HeatMaps are graphical visualizations in the form of table-like charts that use color coding to represent the intensity of the relationships and interactions between a set of selected variables. They provide an intuitive way to interpret multivariate datasets through a color gradient where one end typically represents low values, the other high values, and intermediate shades indicate values in between. This aspect of a HeatMap chart is valuable for identifying trends across large datasets. Additionally, plotting all variables against each other provides an indicator of their correlations. 
HeatMaps are valuable tools across various fields of analytics, including genomic, health data, financial and cybersecurity analyses. 


Use the `HeatMap Chart function` by browsing in the tools ribbon:

| Plot $$\rightarrow$$ Distribution and Density Charts $$\rightarrow$$ HeatMap Chart|

### Input
{: .no_toc}

Two categorical columns listing the x and y category names. Optionally a  numerical column containing the values of each category. All Isalos charts use the long format, so if your data is in a wide format, it can be easily converted using the Wide to Long function available in the Data Transformation → Data Manipulation  ribbon.

### Configuration
{: .no_toc}

| **Chart Title**           | Type the chart title.|  
| **Horizontal Axis Title** | Type the horizontal axis title.|  
| **Vertical Axis Title**   | Type the vertical axis title. |   
| **X Category Column**      | Select the X category column. |   
| **Y Category Column**      | Select the Y category column. |   
| **Include Value**      | Check to include numerical value. |   
| **Value**      | Select the numerical value column. |   



### Chart customization 
{: .no_toc}

Upon executing the HeatMap Chart function, the chart will appear in a separate window where the following customization options are available:

| **Show Legend**  | Display a legend consisting of the value range. |   
| **Show Axis** | Display category values in axis. |   
| **Show Cell Values** | Display cell values as either counts or percentages. |   
| **X Bins** | Specify the number of categories along the X-axis. |   
| **Y Bins** | Specify the number of categories along the Y-axis. |   
| **Max Color**      | Choose the maximum color for the gradient. |  
| **Background**      | Select the background color. |   

### Output
{: .no_toc}

A graphical representation of the data in a heatmap chart format. Without a specified value, it displays the count of each combination of categorical variables. When a value is specified, the heatmap uses a color gradient to represent the magnitude of the values.


### Example
{: .no_toc}

##### Input
{: .no_toc}

In the left-hand spreadsheet import a data consisting of the categories and the value.

<div style="text-align: center;">
<img src="images/plots/distribution_input.png" alt="Input Heatmap Chart" width="250" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}
1.	Use the HeatMap Chart function by browsing in the tools ribbon:

    | Plot $$\rightarrow$$ Distribution and Density Charts $$\rightarrow$$ HeatMap Chart (1)|

    <div style="text-align: center;">
    <img src="images/plots/heatmap_configure1.png" alt="Configure Heatmap Chart" width="800" height="300" class="img-responsive">
    </div>

2.	Type the chart, horizontal axis, and vertical axis titles (2).
3.	Add x category and y category columns (3).
4.  Optionally include a value column (4).

<div style="text-align: center;">
<img src="images/plots/heatmap_configure2.png" alt="Configure Heatmap Chart" width="400" height="300" class="img-responsive">
</div>

##### Chart customization
{: .no_toc}

Upon clicking Execute the heatmap chart appears in a separate window. 
1.	Display the gradient legend (1).
2.	Display the x and y category axis (2).
3.	Show cell values as count or percentage (3).
4.  Set number of x and y bins (4).
5.  Set max gradient and background colors (5).

<div style="text-align: center;">
<img src="images/plots/heatmap_customize.png" alt="Customize Heatmap Chart" width="700" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}
To save the chart customization changes in Isalos, click  File→ Save (1).
To save the chart as a PNG image, select File→ Save as Image (2).

<div style="text-align: center;">
<img src="images/plots/chart_save.png" alt="Save Heatmap Chart" width="200" height="100" class="img-responsive">
</div>

The downloadable, customized heatmap chart is presented below.

<div style="text-align: center;">
<img src="images/plots/heatmap_output.png" alt="Heatmap Chart" width="400" height="300" class="img-responsive">
</div>

---

## Bubble Grid Chart

The bubble grid chart is a two-dimensional visualization technique that combines elements of a heat map and a bubble plot. The two axes of the bubble table represent the categories of two variables, and at each intersection (table cell) a bubble is placed based on the magnitude of the relationship between the corresponding categories. Larger bubbles indicate a stronger relationship between categories. Bubble grid charts are useful for quickly identifying the most important relationships within a dataset, e.g. finding the most common polymeric products (PET, HDPE, PVC) used in different market sectors (Transportation, Packaging, Electronics).

Use the `Bubble Grid Chart function` by browsing in the tools ribbon:

| Plot $$\rightarrow$$ Distribution and Density Charts $$\rightarrow$$ Bubble Grid Chart|

### Input
{: .no_toc}

Two categorical columns listing the x and y category names and a  numerical column containing the values of each category combination. All Isalos charts use the long format, so if your data is in a wide format, it can be easily converted using the Wide to Long function available in the Data Transformation → Data Manipulation  ribbon.

### Configuration
{: .no_toc}

| **Chart Title**           | Type the chart title.|  
| **Horizontal Axis Title** | Type the horizontal axis title.|  
| **Vertical Axis Title**   | Type the vertical axis title. |   
| **X Category Column**      | Select the X category column. |   
| **Y Category Column**      | Select the Y category column. |   
| **Value**      | Select the numerical value column. |   



### Chart customization 
{: .no_toc}

Upon executing the Bubble Grid Chart function, the chart will appear in a separate window where the following customization options are available:

| **Show Legend**  | Display a legend consisting of the x category labels. |   
| **Show Grid** | Display grid lines. |   
| **Show Cell Values** | Display cell values. |   
| **Background**      | Select the background color. |   
| **Category Colors**      | Choose X axis category  colors. |  

### Output
{: .no_toc}

A graphical representation of the data in a bubble chart format, which uses bubble size to represent the magnitude of the values for each category combination.


### Example
{: .no_toc}

##### Input
{: .no_toc}

In the left-hand spreadsheet import a data consisting of the two categories and the value.

<div style="text-align: center;">
<img src="images/plots/distribution_input.png" alt="Input Bubble Grid Chart" width="250" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}
1.	Use the Bubble Grid Chart function by browsing in the tools ribbon:

    | Plot $$\rightarrow$$ Distribution and Density Charts $$\rightarrow$$ Bubble Grid Chart (1)|

    <div style="text-align: center;">
    <img src="images/plots/bubble_configure1.png" alt="Configure Bubble Grid Chart" width="800" height="300" class="img-responsive">
    </div>

2.	Type the chart, horizontal axis, and vertical axis titles (2).
3.	Add x category, y category and value columns (3).

<div style="text-align: center;">
<img src="images/plots/bubble_configure2.png" alt="Configure Bubble Grid Chart" width="400" height="300" class="img-responsive">
</div>

##### Chart customization
{: .no_toc}

Upon clicking Execute the bubble grid chart appears in a separate window. 
1.	Display the x category legend and grid lines(1).
2.	Show cell values (2).
3.	Set background and x category colors (3).

<div style="text-align: center;">
<img src="images/plots/bubble_customize.png" alt="Customize Bubble Grid Chart" width="700" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}
To save the chart customization changes in Isalos, click  File→ Save (1).
To save the chart as a PNG image, select File→ Save as Image (2).

<div style="text-align: center;">
<img src="images/plots/chart_save.png" alt="Save Bubble Grid Chart" width="200" height="100" class="img-responsive">
</div>

The downloadable, customized bubble grid chart is presented below.

<div style="text-align: center;">
<img src="images/plots/bubble_output.png" alt="Bubble Grid Chart" width="400" height="300" class="img-responsive">
</div>

---


## Matrix Chart

Matrix charts are useful visual tools that represent relationships between categories in a grid format. The presence of a relationship is indicated by a symbol, or value within each cell, while the strength of the relationship can be conveyed through variations in color. A matrix chart can be used to determine problem causes, compare possible solutions/improvements, analyze the requirements of a task and assign responsibilities based on required skills. 

Use the `Matrix Chart function` by browsing in the tools ribbon:

| Plot $$\rightarrow$$ Distribution and Density Charts $$\rightarrow$$ Matrix Chart|

### Input
{: .no_toc}

Two categorical columns listing the x and y category names and a  numerical or categorical column containing the values of each category combination. All Isalos charts use the long format, so if your data is in a wide format, it can be easily converted using the Wide to Long function available in the Data Transformation → Data Manipulation  ribbon.

### Configuration
{: .no_toc}

| **Chart Title**           | Type the chart title.|  
| **Horizontal Axis Title** | Type the horizontal axis title.|  
| **Vertical Axis Title**   | Type the vertical axis title. |   
| **X Category Column**      | Select the X category column. |   
| **Y Category Column**      | Select the Y category column. |   
| **Value**      | Select the numerical or categorical value column. |   



### Chart customization 
{: .no_toc}

Upon executing the Matrix Chart function, the chart will appear in a separate window where the following customization options are available:

| **Show Legend**  | Display a legend consisting of numeric range or category labels. |   
| **Value** | Declare if the value column is categorical or numerical. |   
| **Show Cell Values** | Display cell values. |   
| **Threshold** | Visible when value is numerical. Set threshold to categorize values. |   
| **Category Colors** | Visible when value is categorical. Set category colors. |  
| **Background**      | Select the background color. |   

### Output
{: .no_toc}

A graphical representation of the data in a matrix format based on two categories. If the value is numerical, the threshold determines how each value is categorized. If the value is categorical, the matrix displays the corresponding categories.


### Example
{: .no_toc}

##### Input
{: .no_toc}

In the left-hand spreadsheet import a data consisting of the categories and the value.

<div style="text-align: center;">
<img src="images/plots/distribution_input.png" alt="Input Matrix Chart" width="250" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}
1.	Use the Matrix Chart function by browsing in the tools ribbon:

    | Plot $$\rightarrow$$ Distribution and Density Charts $$\rightarrow$$ Matrix Chart (1)|

    <div style="text-align: center;">
    <img src="images/plots/matrix_configure1.png" alt="Configure Matrix Chart" width="800" height="300" class="img-responsive">
    </div>

2.	Type the chart, horizontal axis, and vertical axis titles (2).
3.	Add x category, y category and value columns (3).

<div style="text-align: center;">
<img src="images/plots/matrix_configure2.png" alt="Configure Matrix Chart" width="400" height="300" class="img-responsive">
</div>

##### Chart customization
{: .no_toc}

Upon clicking Execute the matrix chart appears in a separate window. 
1.	Display the x category legend (1).
2.	Set value type, numerical or categorical (2).
3.  Show cell values (3).
4.	Set threshold value to categorize value, when value is numerical (4a). Category colors when value is categorical (4b).
5.  Set background color (5).

<div style="text-align: center;">
<img src="images/plots/matrix_customize.png" alt="Customize matrix Chart" width="700" height="300" class="img-responsive">
</div>

<div style="text-align: center;">
<img src="images/plots/matrix_customizeC.png" alt="Customize matrix Chart" width="700" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}
To save the chart customization changes in Isalos, click  File→ Save (1).
To save the chart as a PNG image, select File→ Save as Image (2).

<div style="text-align: center;">
<img src="images/plots/chart_save.png" alt="Save Matrix Chart" width="200" height="100" class="img-responsive">
</div>

The downloadable, customized matrix chart, with numerical value is presented below.

<div style="text-align: center;">
<img src="images/plots/matrix_output.png" alt="Matrix Chart" width="400" height="300" class="img-responsive">
</div>

The downloadable, customized matrix chart, with categorical value is presented below.

<div style="text-align: center;">
<img src="images/plots/matrix_outputC.png" alt="Matrix Chart" width="400" height="300" class="img-responsive">
</div>

---

## Ridge Line Chart

The ridge line chart consists of a series of line plots that are stacked vertically, each one depicting the distribution of the numerical values of different categories. The categories names and a common scale for the distributions are displayed on the vertical and horizontal axes, respectively.
Ridge line charts are particularly useful for visualizing the distribution of multiple categories within a variable, especially in cases where there is a clear pattern or ranking within the categories, e.g. the temperature distribution of every month in a year.


Use the `Ridge Line Chart function` by browsing in the tools ribbon:

| Plot $$\rightarrow$$ Distribution and Density Charts $$\rightarrow$$ Ridge Line Chart|

### Input
{: .no_toc}

One categorical column listing the category names and a  numerical column containing the values of each category. All Isalos charts use the long format, so if your data is in a wide format, it can be easily converted using the Wide to Long function available in the Data Transformation → Data Manipulation  ribbon.

### Configuration
{: .no_toc}

| **Chart Title**           | Type the chart title.|  
| **Horizontal Axis Title** | Type the horizontal axis title.|  
| **Vertical Axis Title**   | Type the vertical axis title. |   
| **Horizontal Value Column**      | Select the numerical value column. |   
| **Vertical Category Column**      | Select the category column. |   




### Chart customization 
{: .no_toc}

Upon executing the Ridge Line Chart function, the chart will appear in a separate window where the following customization options are available:

| **Show Legend**  | Display a legend consisting of the category labels. |   
| **Show Smooth Lines** | Display smooth lines. |   
| **Bin size** | Set number of bins to use to create histograms of each distribution. |   
| **Background**      | Select the background color. |   
| **Category Colors**      | Choose category  colors. |  

### Output
{: .no_toc}

A graphical representation of the data in a ridge line chart format, which shows the distribution of each different category.


### Example
{: .no_toc}

##### Input
{: .no_toc}

In the left-hand spreadsheet import a data consisting of the category and the value.

<div style="text-align: center;">
<img src="images/plots/distribution_input.png" alt="Input Ridge Line Chart" width="250" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}
1.	Use the Ridge Line Chart function by browsing in the tools ribbon:

    | Plot $$\rightarrow$$ Distribution and Density Charts $$\rightarrow$$ Ridge Line Chart (1)|

    <div style="text-align: center;">
    <img src="images/plots/ridge_configure1.png" alt="Configure Ridge Line Chart" width="800" height="300" class="img-responsive">
    </div>

2.	Type the chart, horizontal axis, and vertical axis titles (2).
3.	Add vertical value and horizontal category columns (3).

<div style="text-align: center;">
<img src="images/plots/ridge_configure2.png" alt="Configure Ridge Line Chart" width="400" height="300" class="img-responsive">
</div>

##### Chart customization
{: .no_toc}

Upon clicking Execute the ridge line chart appears in a separate window. 
1.	Display the category legend (1).
2.	Show smooth Lines values (2).
3.  Declare bin size for distributions (3). 
4.	Set background and category colors (4).

<div style="text-align: center;">
<img src="images/plots/ridge_customize.png" alt="Customize Ridge Line Chart" width="700" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}
To save the chart customization changes in Isalos, click  File→ Save (1).
To save the chart as a PNG image, select File→ Save as Image (2).

<div style="text-align: center;">
<img src="images/plots/chart_save.png" alt="Save Ridge Line Chart" width="200" height="100" class="img-responsive">
</div>

The downloadable, customized ridge line chart is presented below.

<div style="text-align: center;">
<img src="images/plots/ridge_output.png" alt="Ridge Line Chart" width="400" height="300" class="img-responsive">
</div>

---

## Version History
Introduced in Isalos Analytics Platform v0.2.4

_Instructions last updated on November 2025_