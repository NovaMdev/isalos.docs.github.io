---
layout: default
title: 7.1 Relationship and Trend Charts
parent: 7. Plot & Business Intelligence
nav_order: 1
permalink: /relationship_trend_charts.html
---

# Relationship and Trend Charts
{: .no_toc }

Relationship and trend charts are powerful tools for understanding how data behaves and interacts. By highlighting patterns, correlations, and shifts within datasets, they enable users to quickly identify trends, detect anomalies, and make informed decisions. As a versatile category of visualizations, these charts provide a clear and intuitive way to explore relationships between variables and track developments across diverse data contexts.

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
| **Add Column Pairs**      | Select the input column pair(s) to be plotted against each other.  |  |
|                           | **Select X column**  | Select from the drop-down menu the numerical or categorical variable to be plotted on the horizontal axis. |
|                           | **Select Y column**  | Select from the drop-down menu the numerical variable to be plotted on the vertical axis. |
| **Remove Selected Column Pairs** | Remove the selected column pair(s). |   |



### Chart customization 
{: .no_toc}

Upon executing the Line Chart function, the chart will appear in a separate window where the following customization options are available:

| **Show Legend**  | Display a legend consisting of the column pair names. |   |
| **Show Grid** | Display grid lines in the background. |   |
| **X axis ticks**   | Select the number of horizontal grid line ticks from the drop-down menu. |   |
| **Y axis ticks**      | Select the number of vertical grid line ticks from the drop-down menu. |   |
| **Point Size**      | Drag and select the data points size. |   |
| **Background**      | Select the background color. |   |
| **Series Properties**      | Select the desired properties for each series of column pairs plotted on the chart. |   |
|                           | **Series Color** | Select series color. |
|                           | **Line**  | Show a line connecting the data points. |
|                           | **Point**  | Show data points. |
|                           | **Symbol**  |  Select the symbol denoting each data point (e.g. circle or square). |


### Output
{: .no_toc}

A line plot displaying a selection of data points connected by lines, where the horizontal and vertical coordinates represent the values of the first and second input variables, respectively. 


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
3.	Select the data points size (3).
4.	Select the background color (4).
5.	In the Series Properties section, select the series color, line or/and point configuration, and data point symbol (5).

<div style="text-align: center;">
<img src="images/plots/line_customize.png" alt="Customize Line Chart" width="700" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}
To save the chart customization changes in Isalos, click  File→ Save (1).
To save the chart as a PNG image, select File→ Save as Image (2).

<div style="text-align: center;">
<img src="images/plots/chart_save.png" alt="Save Line Chart" width="200" height="100" class="img-responsive">
</div>

The downloadable, customized line chart is presented below.

<div style="text-align: center;">
<img src="images/plots/line_output.png" alt="Line Chart" width="400" height="300" class="img-responsive">
</div>

---

## Scatter Chart
A scatter chart, or scatter plot, is a mathematical diagram that captures the relationships between two variables on the Cartesian plane. The position of each data point on the horizontal and vertical axis is determined by the values of the first and second variable respectively. 

The scatter plot format is useful for identifying correlations, trends and outliers among variables. For example, it can be used to visualize the relationship between a child’s height (in cm) and its age (in years).

Use the `Scatter Chart function` by browsing in the tools ribbon:

| Plot $$\rightarrow$$ Relationship & Trend Charts $$\rightarrow$$ Scatter Chart|

### Input
{: .no_toc}

A data table in long format consisting of at least two columns, at least one of which is numerical. 

### Configuration
{: .no_toc}

| **Chart Title**           | Type the chart title.|   |
| **Horizontal Axis Title** | Type the horizontal axis title.|   |
| **Vertical Axis Title**   | Type the vertical axis title. |   |
| **Add Column Pairs**      | Select the input column pair(s) to be plotted against each other.  |  |
|                           | **Select X column**  | Select from the drop-down menu the numerical or categorical variable to be plotted on the horizontal axis. |
|                           | **Select Y column**  | Select from the drop-down menu the numerical variable to be plotted on the vertical axis. |
| **Remove Selected Column Pairs** | Remove the selected column pair(s). |   |



### Chart customization 
{: .no_toc}

Upon executing the Scatter Chart function, the chart will appear in a separate window where the following customization options are available:

| **Show Legend**  | Display a legend consisting of the column pair names. |   
| **Show Grid** | Display grid lines in the background. |   
| **X axis ticks**   | Select the number of horizontal grid line ticks from the drop-down menu. |   
| **Y axis ticks**      | Select the number of vertical grid line ticks from the drop-down menu. |   
| **Point Size**      | Drag and select the data points size. |   
| **Background**      | Select the background color. |   
| **Series Color** | Select series color. |


### Output
{: .no_toc}

A scatter plot displaying a selection of data points, where the horizontal and vertical coordinates represent the values of the first and second input variables, respectively. 


### Example
{: .no_toc}

##### Input
{: .no_toc}

In the left-hand spreadsheet import a table consisting of the categories and the corresponding values (1).

<div style="text-align: center;">
<img src="images/plots/line_input.png" alt="Input Scatter Chart" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}
1.	Use the Scatter Chart function by browsing in the tools ribbon:

    | Plot $$\rightarrow$$ Relationship & Trend Charts $$\rightarrow$$ Scatter Chart (1)|

    <div style="text-align: center;">
    <img src="images/plots/scatter_configure1.png" alt="Configure Scatter Chart" width="800" height="300" class="img-responsive">
    </div>

2.	Type the chart, horizontal axis, and vertical axis titles (2).
3.	Click Add Column Pair(s) (3) and selected the variables to be plotted on the horizontal (Select X Column) and the vertical axis (Select Y Column) (4). Click Add (5) to select multiple column pairs. When all column pairs are added click Add & Close (6).
4.	Click Execute to generate a scatter chart (7).

<div style="text-align: center;">
<img src="images/plots/scatter_configure2.png" alt="Configure Scatter Chart" width="400" height="300" class="img-responsive">
</div>

##### Chart customization
{: .no_toc}

Upon clicking Execute the scatter chart appears in a separate window. 
1.	Display the chart legend and grid lines (1).
2.	Select the number of horizontal and vertical grid line ticks (2).
3.	Select the data points size (3).
4.	Select the background color (4).
5.	Select the series color (5).

<div style="text-align: center;">
<img src="images/plots/scatter_customize.png" alt="Customize Scatter Chart" width="700" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}
To save the chart customization changes in Isalos, click  File→ Save (1).
To save the chart as a PNG image, select File→ Save as Image (2).

<div style="text-align: center;">
<img src="images/plots/chart_save.png" alt="Save Scatter Chart" width="200" height="100" class="img-responsive">
</div>

The downloadable, customized scatter chart is presented below.

<div style="text-align: center;">
<img src="images/plots/scatter_output.png" alt="Scatter Chart" width="400" height="300" class="img-responsive">
</div>
---

## Bivariate Area Chart
The bivariate area chart is a visualization tool used to display the evolution of two numerical variables along a shared x axis, which is often a time variable. It is particularly useful for identifying trends in both variables, and more importantly, for highlighting the gap, balance, flips, and trade-offs between them. Its most distinctive feature is that the variables’ curves are color-coded, and the area where one variable exceeds the other across the x axis is shaded accordingly. This makes it easier to identify both the number and extent of imbalances between the variables.

The chart is commonly used for commercial and economic analyses, e.g. to visualize the trends in exports and imports over time.

Use the `Bivariate Area Chart function` by browsing in the tools ribbon:

| Plot $$\rightarrow$$ Relationship & Trend Charts $$\rightarrow$$ Bivariate Area Chart|

### Input
{: .no_toc}

A data table consisting of the values of two numerical variables and a common numerical variable to be displayed on the horizontal axis. 

### Configuration
{: .no_toc}

| **Chart Title**           | Type the chart title.|   
| **Horizontal Axis Title** | Type the horizontal axis title.|   
| **Vertical Axis Title**   | Type the vertical axis title. |   
| **Horizontal Axis Column**| Select the common numerical variable to be plotted on the horizontal axis.  |  
| **First variable column** | Select the first numerical variable to be plotted on the vertical axis. |
| **Second variable column**| Select the second numerical variable to be plotted on the vertical axis. | 


### Chart customization 
{: .no_toc}

Upon executing the Bivariate Area Chart function, the chart will appear in a separate window where the following customization options are available:

| **Show Legend**  | Display a legend consisting of the two series names. |   
| **Show Grid** | Display grid lines in the background. |   
| **X axis ticks**   | Select the number of horizontal grid line ticks from the drop-down menu. |   
| **Y axis ticks**      | Select the number of vertical grid line ticks from the drop-down menu. | 
| **Show Points**      | Show data points on the chart. |   
| **Point Size**      | Drag and select the data points size. |  
| **Show Bivariate Area** | Show the color-coded area where one variable exceeds the other. |  
| **Background**      | Select the background color. |   
| **Series Colors**      | Select the series colors. |  


### Output
{: .no_toc}

A bivariate area chart in which the areas where one variable exceeds the other are shaded accordingly. 


### Example
{: .no_toc}

##### Input
{: .no_toc}

In the left-hand spreadsheet import a table consisting of at least three numerical columns, including a common numerical variable to be plotted on the horizontal axis and two variables to be plotted on the vertical axis (1).

<div style="text-align: center;">
<img src="images/plots/line_input.png" alt="Input Bivariate Chart" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}
1.	Use the Bivariate Area Chart function by browsing in the tools ribbon:

    | Plot $$\rightarrow$$ Relationship & Trend Charts $$\rightarrow$$ Bivariate Area Chart (1)|

    <div style="text-align: center;">
    <img src="images/plots/bivariate_configure1.png" alt="Configure Bivariate Chart" width="800" height="300" class="img-responsive">
    </div>

2.	Type the chart, horizontal axis, and vertical axis titles (2).
3.	Select from the drop-down menu the horizontal axis variable (3), and the first (4) and second (5) vertical axis variables.
4.	Click Execute to generate a bivariate area chart (6).


<div style="text-align: center;">
<img src="images/plots/bivariate_configure2.png" alt="Configure Bivariate Chart" width="400" height="300" class="img-responsive">
</div>

##### Chart customization
{: .no_toc}

Upon clicking Execute the bivariate area chart appears in a separate window. 
1.	Display the chart legend and grid lines (1).
2.	Select the number of horizontal and vertical grid line ticks (2).
3.	Show the data points on the chart (3).
4.	Select the data point size (4).
5.	Show the color-coded area where one variable exceeds the other (5).
6.	Select the background color (6).
7.	Select the series colors (7).

<div style="text-align: center;">
<img src="images/plots/bivariate_customize.png" alt="Customize Bivariate Chart" width="700" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}
To save the chart customization changes in Isalos, click  File→ Save (1).
To save the chart as a PNG image, select File→ Save as Image (2).

<div style="text-align: center;">
<img src="images/plots/chart_save.png" alt="Save Bivariate Chart" width="200" height="100" class="img-responsive">
</div>

The downloadable, customized bivariate area chart is presented below.

<div style="text-align: center;">
<img src="images/plots/bivariate_output.png" alt="Bivariate Area Chart" width="400" height="300" class="img-responsive">
</div>
---

## Stream Chart
A stream chart, or streamgraph, is a type of stacked area graph in which the numerical values of different categories (layers) are distributed around a horizontal axis in the center of the graph, creating a flowing, stream-like shape. The stacked categories are displayed as continuous areas through interpolation between the given data points. The height of each layer is analogous to its numeric value, and the total height of the graph reflects the sum of categories at any given point. The geometry of the chart is dependent on the bottom layer outline which is determined by the minimization of the average of the squares of slopes between each layer’s midpoints, weighted by layer height.

This chart is typically used to illustrate how the values of each category evolve over the baseline category on the x axis (e.g. the variable of time). This characteristic makes it particularly useful for visualizing the relative proportions of the whole as they evolve along the horizontal axis, while also revealing trends and patterns within the data. For example, stream charts can be used to capture the trends of energy consumption across different sectors (industrial, commercial, transportation) over a given period of time.

It should be noted that since the horizontal axis is not fixed in a stream chart, distinguishing between positive and negative values is not possible. Therefore, exclusively positive or negative values should be included in one plot.


Use the `Stream Chart function` by browsing in the tools ribbon:

| Plot $$\rightarrow$$ Relationship & Trend Charts $$\rightarrow$$ Stream Chart|

### Input
{: .no_toc}

A categorical or numerical column consisting of the categories to be layered and a numerical column with continuous values for each category. The baseline values (categorical or numerical) over which the main categories are evolving should be given in a separate column. If needed, the conversion from wide to long format can be achieved via the `Wide to Long` found in the `Data Transformation` menu in the tools ribbon. 

### Configuration
{: .no_toc}

| **Chart Title**           | Type the chart title.|   
| **Horizontal Axis Title** | Type the horizontal axis title.|   
| **Vertical Axis Title**   | Type the vertical axis title. |   
| **Time**| Select the categorical or numerical column consisting of baseline values over which the main categories are evolving.  |  
| **Category** | Select the categories column which can be either numerical or categorical. |
| **Value**| Select the numerical values column. | 


### Chart customization 
{: .no_toc}

Upon executing the Stream Chart function, the chart will appear in a separate window where the following customization options are available:

| **Show Legend**  | Display a legend consisting of the categories names. |   
| **Show Smooth Lines** | Connect chart peaks with smooth lines. |    
| **Background**      | Select the background color. |   
| **Stream Colors**      | Select the stream colors. |  


### Output
{: .no_toc}

A stream chart depicting the evolution of the given variables along a baseline as a symmetrical flowing shape. 


### Example
{: .no_toc}

##### Input
{: .no_toc}

In the left-hand spreadsheet, import a table in long format that consists of a numerical or categorical baseline variable (for example, a time variable), a numerical or categorical column representing different categories, and a numerical column containing the corresponding values (1).

<div style="text-align: center;">
<img src="images/plots/stream_input.png" alt="Input Stream Chart" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}
1.	Use the Stream Chart function by browsing in the tools ribbon:

    | Plot $$\rightarrow$$ Relationship & Trend Charts $$\rightarrow$$ Stream Chart (1)|

    <div style="text-align: center;">
    <img src="images/plots/stream_configure1.png" alt="Configure stream Chart" width="800" height="300" class="img-responsive">
    </div>

2.	Type the chart, horizontal axis, and vertical axis titles (2).
3.	Select from the drop-down menu the baseline (Time) variable (3), the categories column (4), and numerical variable (5).
4.	Click Execute to generate a stream chart (6).



<div style="text-align: center;">
<img src="images/plots/stream_configure2.png" alt="Configure stream Chart" width="400" height="300" class="img-responsive">
</div>

##### Chart customization
{: .no_toc}

Upon clicking Execute the stream chart appears in a separate window. 
1.	Display the chart legend (1).
2.	Connect the chart peaks with smooth lines (2).
3.	Select the background color (3).
4.	Select the streams colors (4).

<div style="text-align: center;">
<img src="images/plots/stream_customize.png" alt="Customize stream Chart" width="700" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}
To save the chart customization changes in Isalos, click  File→ Save (1).
To save the chart as a PNG image, select File→ Save as Image (2).

<div style="text-align: center;">
<img src="images/plots/chart_save.png" alt="Save stream Chart" width="200" height="100" class="img-responsive">
</div>

The downloadable, customized stream chart is presented below.

<div style="text-align: center;">
<img src="images/plots/stream_output.png" alt="Stream Chart" width="400" height="300" class="img-responsive">
</div>
---

## Polar Chart
A polar graph is used to represent data defined by a radius-angle coordinate system, where each data point is specified by a magnitude (radius) and a direction (angle). This type of chart is particularly effective for visualizing measurements that depend on orientation, rotation, or angular position, allowing patterns and variations to be observed around a central point rather than along linear axes. For example, the polar chart is used to capture the trends in signal phase vs. amplitude in physics or engineering problems.

Use the `Polar Chart function` by browsing in the tools ribbon:

| Plot $$\rightarrow$$ Relationship & Trend Charts $$\rightarrow$$ Polar Chart|

### Input
{: .no_toc}

A data table in long format consisting of at least two numerical columns. 

### Configuration
{: .no_toc}

| **Chart Title**           | Type the chart title.|   |
| **Add Column Pairs**      | Select the input column pair(s) to be plotted against each other.  |  |
|                           | **Radius**  | Select from the drop-down menu the numerical variable representing the magnitude. |
|                           | **Angle**  | Select from the drop-down menu the numerical variable representing the direction. |
| **Remove Selected Column Pairs** | Remove the selected column pair(s). |   |



### Chart customization 
{: .no_toc}

Upon executing the Polar Chart function, the chart will appear in a separate window where the following customization options are available:

| **Show Legend**  | Display a legend consisting of the column pair names. |   
| **Show Values** | Display the coordinates on the chart. |   
| **Point Size**   | Drag and select the data points size. |   
| **Background**      | Select the background color. |   
| **Series Colors**      | Select the series colors. | 


### Output
{: .no_toc}

A polar chart depicting data on the polar system, with each point defined by a radius and an angle.


### Example
{: .no_toc}

##### Input
{: .no_toc}

In the left-hand spreadsheet, import a table in long format that consists of at least two numerical columns (1).

<div style="text-align: center;">
<img src="images/plots/polar_input.png" alt="Input Polar Chart" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}
1.	Use the Polar Chart function by browsing in the tools ribbon:

    | Plot $$\rightarrow$$ Relationship & Trend Charts $$\rightarrow$$ Polar Chart (1)|

    <div style="text-align: center;">
    <img src="images/plots/polar_configure1.png" alt="Configure Polar Chart" width="800" height="300" class="img-responsive">
    </div>

2.	Type the chart title (2).
3.	Click Add Column Pair(s) (3) and select the radius and angle variables (4). Click Add (5) to select multiple column pairs. When all column pairs are added click Add & Close (6).
4.	Click Execute to generate a polar chart (7).

<div style="text-align: center;">
<img src="images/plots/polar_configure2.png" alt="Configure Polar Chart" width="400" height="300" class="img-responsive">
</div>

##### Chart customization
{: .no_toc}

Upon clicking Execute the polar chart appears in a separate window. 
1.	Display the chart legend (1).
2.	Display the coordinates for each data point (2).
3.	Drag and select the points size (3).
4.	Select the background color (4).
5.	Select the series colors (5).

<div style="text-align: center;">
<img src="images/plots/polar_customize.png" alt="Customize Polar Chart" width="700" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}
To save the chart customization changes in Isalos, click  File→ Save (1).
To save the chart as a PNG image, select File→ Save as Image (2).

<div style="text-align: center;">
<img src="images/plots/chart_save.png" alt="Save Polar Chart" width="200" height="100" class="img-responsive">
</div>

The downloadable, customized polar chart is presented below.

<div style="text-align: center;">
<img src="images/plots/polar_output.png" alt="Polar Chart" width="400" height="300" class="img-responsive">
</div>
---

## Version History
Introduced in Isalos Analytics Platform v0.2.6

_Instructions last updated on January 2026_