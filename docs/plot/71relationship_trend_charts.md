---
layout: default
title: 7.1 Relationship and Trend Charts
parent: 7. Plot & Business Intelligence
nav_order: 1
permalink: /relationship_trend_charts.html
---

# Relationship and Trend Charts
{: .no_toc }

Short paragraph on  Relationship and Trend Charts

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Line Chart

A line chart is a basic mathematical plot that maps two variables on the Cartesian plane, determining the horizontal and vertical position of each data point based on the values of the first and second variable respectively. Line charts typically sort data points by their horizontal axis values and connect them with lines to show trends and patterns over continuous intervals. This chart can be used, for example, to plot the relationship between the sepal length and width of iris plants.

Use the `Line Chart function` by browsing in the tools ribbon:

| Plot $$\rightarrow$$ Relationship & Trend Charts $$\rightarrow$$ Line Chart|

### Input
{: .no_toc}

A data table in long format consisting of at least two columns, at least one of which is numerical. 

### Configuration
{: .no_toc}

| **Chart Title**           | Type the chart title.|   |
| **Horizontal Axis Title** | Type the horizontal axis title.|   |
| **Vertical Axis Title**   | Type the vertical axis title. |   |
| **Add Column Pairs**      | Select the input column pair(s) to be plotted against each other. |   |
|                           | **Select X column**  | Select from the drop-down menu the numerical or categorical variable to be plotted on the x axis |
|                           | **Select Y column**  | Select from the drop-down menu the numerical variable to be plotted on the y axis |
| **Remove Selected Column Pairs** | Remove the selected column pair(s). |   |



### Chart customization 
{: .no_toc}

Upon executing the Line Chart function, the chart will appear in a separate window where the following customization options are available:

| **Show Legend**  | Display a legend consisting of the column pair names. |   |
| **Show Grid** | Display grid lines in the background. |   |
| **X axis ticks**   | Select the number of horizontal grid line ticks from the drop-down menu. |   |
| **Y axis ticks**      | Select the number of vertical grid line ticks from the drop-down menu. |   |
| **Point Size**      | Drag and select the data point size. |   |
| **Background**      | Select the background color. |   |
| **Series Properties**      | Select the desired properties for each series of column pairs plotted on the chart. |   |
|                           | **Series Color** | Select series color |
|                           | **Line**  | Show connected data points with a line |
|                           | **Point**  | Show data points |
|                           | **Symbol**  |  Select the symbol denoting each data point (e.g. circle or square) |


### Output
{: .no_toc}

A line plot displaying a selection of data points connected by lines, where the x and y coordinates represent the values of the first and second input variables, respectively. 


### Example
{: .no_toc}

##### Input
{: .no_toc}

In the left-hand spreadsheet import a table consisting of the categories and the corresponding values (1).

<div style="text-align: center;">
<img src="images/plots/line_input.png" alt="Input Line Chart" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}
1.	Use the Line Chart function by browsing in the tools ribbon:

    | Plot $$\rightarrow$$ Relationship & Trend Charts $$\rightarrow$$ Line Chart (1)|

    <div style="text-align: center;">
    <img src="images/plots/line_configure1.png" alt="Configure Line Chart" width="800" height="300" class="img-responsive">
    </div>

2.	Type the chart, horizontal axis, and vertical axis titles (2).
3.	Click Add Column Pair(s) (3) and selected the variables to be plotted on the horizontal (Select X Column) and the vertical axis (Select Y Column) (4). Click Add (5) to select multiple column pairs. When all column pairs are added click Add & Close (6).
4.	Click Execute to generate a line chart (7).

<div style="text-align: center;">
<img src="images/plots/line_configure2.png" alt="Configure Line Chart" width="400" height="300" class="img-responsive">
</div>

##### Chart customization
{: .no_toc}

Upon clicking Execute the line chart appears in a separate window. 
1.	Display the chart legend and grid lines (1).
2.	Select the number of horizontal and vertical grid line ticks (2).
3.	Select the data point size (3).
4.	Select the background color (4).
5.	In the Series Properties section, select the series color, line or/and point configuration, and data point symbol (5).

<div style="text-align: center;">
<img src="images/plots/line_customize.png" alt="Customize Line Chart" width="700" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}

By browsing through the File options: File→ Save as Image (1), the line chart can be saved in PNG format.

<div style="text-align: center;">
<img src="images/plots/line_save.png" alt="Save Line Chart" width="400" height="300" class="img-responsive">
</div>

The downloadable, customized line chart is presented below.

<div style="text-align: center;">
<img src="images/plots/line_output.png" alt="Line Chart" width="400" height="300" class="img-responsive">
</div>

---

## Scatter Chart

---

## Bivariate Area Chart

---

## Stream Chart

---

## Polar Chart

---

## Version History
Introduced in Isalos Analytics Platform v0.2.4

_Instructions last updated on November 2025_