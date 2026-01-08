---
layout: default
title: 4.1 Regression
parent: 4. Analytics
nav_order: 1
permalink: /regression.html
---

# Regression
{: .no_toc }
Regression is a typical supervised learning task in predictive modelling that aims to investigate the relationship between a set of independent features and a dependent target variable. Regression analysis algorithms are employed when the target variable is a continuous numeric value.<sup>[1](#references-regression)</sup>

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## k Nearest Neighbors (kNN)

k Nearest Neighbors (kNN) is a simple non-parametric algorithm that operates by identifying the data points from the training set that are most proximate to a new unseen input. This instance-based learning method determines the closeness of data points by calculating the Euclidean distance between instances considering all attribute values. The _k_ parameter denotes the number of nearest neighbors to consider.<sup>[2](#references-regression)</sup> The target value for a new instance is predicted by averaging the distance-weighted target values of the _k_ nearest data points. As calculations of Euclidean distances are performed, scaling of data is performed within the function.

Use the `k Nearest Neighbors (kNN)` function by browsing in the top ribbon:

|Analytics $$\rightarrow$$ Regression $$\rightarrow$$ k Nearest Neighbors (kNN)|

### Input
{: .no_toc}
Data matrix with training set data.

### Configuration
{: .no_toc}

|**Target Column**| Select from the drop-down menu the column containing the target variable that is going to be predicted. Columns with categorical features cannot be selected as targets.|
|**Number of Neighbors**| An integer representing the number of closest neighbours-data points (_k_) used to make predictions for a new data point.|

### Output
{: .no_toc}
A data matrix including the actual target value and the value predicted by the algorithm ("kNN Prediction"). For each data point, the closest neighbors from the training set are listed in the "Closest NN" columns, along with their corresponding distances in the "Distance from NN" columns.

### Example
{: .no_toc}

##### Input
{: .no_toc}
In the left-hand spreadsheet of the tab import the data matrix including the target variable for prediction. 

<div style="text-align: center;">
<img src="images/Regression/knn-input.png" alt="kNN input" width="500" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `k Nearest Neighbors (kNN)`.
1. Select the column that is going to be predicted from the drop-down menu [1]. The columns containing categorical features are automatically excluded from the list.
1. Type the `Number of Neighbors` [2] to consider.
1. Click on the `Execute` button [3] to apply the algorithm on the input table.

<div style="text-align: center;">
<img src="images/Regression/knn.svg" alt="kNN" width="400" height="300" class="img-responsive">
</div> 

##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab the output data matrix with the actual and the predicted value of the target is presented. Also, the _k_ most proximate identified instances from the training set are given for each data point (5 in this case), along with the corresponding Euclidean distances from each neighbor. Note that the  "Closest NN1" represents the nearest neighbor, which is the data point itself when applied on the training set. Consequently, the "Distance from NN1" is 0 for all given training instances.

<div style="text-align: center;">
<img src="images/Regression/knn-output.png" alt="kNN output" width="700" height="900" class="img-responsive">
</div> 

##### Application on external set
{: .no_toc }
You can apply the trained `k Nearest Neighbors (kNN)` model to any external (test) data using the [`Existing Model Utilization`](https://www.docs.isalos.novamechanics.com/existing-model-utilization.html) function:

1. Import the external data in the left-hand spreadsheet of the tab. Include the same columns used to build the kNN model.
1. Select `Analytics` $$\rightarrow$$ `Existing Model Utilization`. Select the trained kNN model [1] and click on the `Execute` button [2].

<div style="text-align: center;">
<img src="images/Regression/knn-application.svg" alt="kNN application" width="400" height="300" class="img-responsive">
</div> 

{:style="counter-reset:none"}
1. Inspect the results in the right-hand spreadsheet of the tab. Note that in this case the closest neighbor listed in the "Closest NN1" belongs to the training set, and the "Distance from NN1" is not zero.

<div style="text-align: center;">
<img src="images/Regression/knn-application.png" alt="kNN application" width="700" height="900" class="img-responsive">
</div> 

---

## Fully Connected Neural Network

A type of feedforward artificial neural network consisting of multiple layers of neurons. It consists of an input layer, one or more hidden layers and an outer layer, which are fully connected with each other. A variety of non-linear activation functions are typically used in the hidden layer, allowing the network to learn complex patterns in data. MLP uses a backpropagation algorithm to train the model and classify instances.<sup>[1,2](#references-regression)</sup>

Use the `Fully Connected Neural Network` function by browsing in the top ribbon: 

|Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Fully Connected Neural Network|

### Input
{: .no_toc}
Data matrix with training set data. String columns are not taken into account in the algorithm implementation, therefore categorical features must be removed or encoded into numerical values.

### Configuration
{: .no_toc}

| **Batch Size** | Select from the drop-down menu the number of training instances that will be propagated through the network. Four options are available for selection: `16`, `32`, `64`, and `128`. |
| **Number of Epochs** | Specify the number (integer) of complete passes through the data during training. |
| **Learning Rate** | Specify the learning rate (between 0 and 1), which controls the size of the steps taken during optimization. |
| **Momentum** | Specify the momentum rate (between 0 and 1) for the backpropagation algorithm. |
| **+/-** | Click on the `+` and `-` buttons to add or remove hidden layers, respectively. |
| **Hidden Layers** | For each added hidden layer, specify the number of neurons and select the non-linear activation function used to map the weighted inputs to the output of each neuron. Options for the activation functions include: <br> &nbsp;&nbsp;&nbsp;&nbsp;- `RELU`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `RELU6`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `LEAKYRELU`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `SELU`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `SWISH`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `RRELU`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `SIGMOID`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `SOFTMAX`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `SOFTPLUS`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `SOFTSIGN`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `TANH`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `THRESHOLDEDRELU`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `GELU`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `ELU`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `MISH`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `CUBE`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `HARDSIGMOID`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `HARDTANH`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `IDENTITY`, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `RATIONALTANH`, and <br> &nbsp;&nbsp;&nbsp;&nbsp;- `RECTIFIEDTANH`. |
| **Target Column** | Select from the drop-down menu the column containing the feature that is going to be predicted. |
| **RNG Seed** | Select an integer as seed to get reproducible results. The option to select a time-based random number-generated seed is available. |

### Output
{: .no_toc }
A data matrix including the actual target value and the value predicted by the algorithm ("Prediction") is presented. 

### Example
{: .no_toc}

##### Input
{: .no_toc}

In the left-hand spreadsheet of the tab import the data matrix including the target variable with at least two distinct categories for prediction. In case that categorical-string columns are included in the set, these should be encoded into representative numerical values.

<div style="text-align: center;">
<img src="images/Regression/mlp-input.PNG" alt="MLP input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}

1.  Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Fully Connected Neural Network`
1.  Select the hyperparameters that determine the training procedure: the `Batch Size` [1], the `Number of Epochs` [2], the `Learning Rate` [3] and the `Momentum` [4].
1.  Select the hyperparameters that determine the `Hidden Layers` [5] of the neural network: the number of neurons [6] and the activation function [7] of each layer.
1.  Add [8] or remove [9] hidden layers to define the architecture of the neural network.
1.  Select the column that is going to be predicted from the drop-down menu [10].
1.  Select a Seed for reproducible results or a random number generated `Time-based (RNG) Seed` [11].
1.  Click on the `Execute` button [12] to apply the training algorithm on the input columns.

<div style="text-align: center;">
<img src="images/Classification/mlp.svg" alt="MLP" width="550" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}

In the right-hand spreadsheet of the tab the output data matrix with the actual and the predicted values of the target is presented.

<div style="text-align: center;">
<img src="images/Regression/mlp-output.PNG" alt="MLP output" width="300" height="300" class="img-responsive">
</div>

---

## Radial Basis Function Network

Radial basis function networks (RBF) network is an artificial neural network that employs RBF kernels as activation functions. The network consists of three layers: the input layer modeling a vector that passes data, the hidden layer that performs computations and the output layer designated for regression problems. The output layer of the neural network is a linear combination of the activation (output) from the hidden units.<sup>[1, 3](#references-regression)</sup>

A Radial Basis Function is a real-valued function $φ(r)$ that is dependent only on the distance between a fixed input point ($r$) to the center ($c$) of each neuron as reference point [Eq. 1](#eq. rbf1).<sup>[3](#references-regression)</sup> 

<div id="eq. rbf1">
$$
\begin{equation}
\varphi(r) = d(\|r - c\|) {\qquad [1] \qquad}
\end{equation}
$$
</div>

The radial basis function kernels available in Isalos include:

Gaussian:

<div id="eq. rbf2">
$$
\begin{equation}
\varphi(r) = e^{-(\varepsilon r)^{2}}\end{equation}  {\qquad [2] \qquad}
$$
</div>

Multiquadric:

<div id="eq. rbf3">
$$
\begin{equation}
\varphi(r) = \sqrt{1 + (\varepsilon r)^{2}}\end{equation}  {\qquad [3] \qquad}
$$
</div>

Inverse Quadratic:

<div id="eq. rbf4">
$$
\begin{equation}
\varphi(r) = \frac{1}{1 + (\varepsilon r)^{2}}\end{equation}  {\qquad [4] \qquad}
$$
</div>

Inverse Multiquadric:

<div id="eq. rbf5">
$$
\begin{equation}
\varphi(r) = \frac{1}{\sqrt{1 + (\varepsilon r)^{2}}}\end{equation}  {\qquad [5] \qquad}
$$
</div>

Polyharmonic spline:

<div id="eq. rbf6">
$$
\begin{equation}
\varphi(r) = 
\begin{cases}
r^{k}, \: k = 1, 3, 5, \ldots \\
r^{k} \ln(r), \: k = 2, 4, 6, \ldots
\end{cases}
\end{equation} {\qquad [6] \qquad}
$$
</div>

where $k$ is the order of the spline.

Thin Plate Spline:

<div id="eq. rbf7">
$$
\begin{equation}
\varphi(r) = r^{2} \ln(r)\end{equation}  {\qquad [7] \qquad}
$$
</div>

Bump Function:

<div id="eq. rbf8">
$$
\begin{equation}
\varphi(r) = 
\begin{cases}
\exp\left( -\frac{1}{1 - (\varepsilon r)^{2}} \right), \: \text{ if } r < \frac{1}{\varepsilon}, \\
0, \: \text{ otherwise }
\end{cases}
\end{equation}  {\qquad [8] \qquad}
$$
</div>

where $\varepsilon$ is the shape parameter used to scale the input of the radial kernel.

Use the `Radial Basis Function Network` regression function by browsing in the top ribbon: 

|Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Radial Basis Function Network|

### Input
{: .no_toc }
Data matrix with training set data. String columns are not taken into account in the algorithm implementation, therefore categorical features must be removed or encoded into numerical values. RBF does not allow the use of integer or string input.

### Configuration
{: .no_toc }

| **Hidden Neurons** | Specify the number of neurons in the hidden layer of the network.|
| **RBF Kernel** | Select from the drop-down menu the radial basis function kernel. Options include: <br> &nbsp;&nbsp;&nbsp;&nbsp;- `GAUSSIAN` [Eq. 2](#eq. rbf2), <br> &nbsp;&nbsp;&nbsp;&nbsp;- `MULTIQUADRIC` [Eq. 3](#eq. rbf3), <br> &nbsp;&nbsp;&nbsp;&nbsp;- `INVERSE QUADRATIC` [Eq. 4](#eq. rbf4), <br> &nbsp;&nbsp;&nbsp;&nbsp;- `INVERSE MULTIQUADRIC` [Eq. 5](#eq. rbf5), <br> &nbsp;&nbsp;&nbsp;&nbsp;- `POLYHARMONIC SPLINE` [Eq. 6](#eq. rbf6), <br> &nbsp;&nbsp;&nbsp;&nbsp;- `THIN PLATE SPLINE` [Eq. 7](#eq. rbf7), and <br> &nbsp;&nbsp;&nbsp;&nbsp;- `BUMP FUNCTION` [Eq. 8](#eq. rbf8). <br> A new configuration field appears accordingly after `RBF Kernel` selection, for the selection of `Epsilon` ($\varepsilon$) shape parameter or `K` ($k$) where applicable.|
| **Point Selection** | Select manually the way that determines how the centers of the neural network are chosen. Options include: <br> &nbsp;&nbsp;&nbsp;&nbsp;- `Random Points from Training set`: chosen randomly from the training data. <br> &nbsp;&nbsp;&nbsp;&nbsp;- `Use KMeans`: RBF centers are the cluster centers of the partitioned training data.|
| **RNG Seed** | Select an integer as seed to get reproducible results. The option to select a time-based random number-generated seed is available.|
| **Target Column** | Select from the drop-down menu the column containing the target variable that is going to be predicted. Columns with categorical features cannot be selected as targets. |

### Output
{: .no_toc }
A data matrix including the actual target value and the value predicted by the algorithm ("Prediction") is presented. 

### Example
{: .no_toc }

##### Input
{: .no_toc }

In the left-hand spreadsheet of the tab import the data matrix including the target variable for prediction. Note that the "Species" categorical column is presented as double (D).

<div style="text-align: center;">
<img src="images/Regression/rbf-input.png" alt="Rbf input" width="500" height="400" class="img-responsive">
</div> 

##### Configuration
{: .no_toc }
1. Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Radial Basis Function Network`
1. Type the number (integer) of `Hidden Neurons` [1].
1. Select the `RBF Kernel` [2] used as activation function of the hidden layer and subsequently select the `Epsilon` [3] or `K` parameter where applicable.
1. Select the `Point Selection` [4] method to determine the center of the network.
1. Type an `RNG Seed` for reproducible results or a random number generated `Time-based (RNG) Seed` [5].
1. Select the `Target Column` that is going to be predicted from the drop-down menu [6]. Columns with categorical features cannot be selected as targets. 
1. Click on the `Execute` button [7] to proceed with training.

<div style="text-align: center;">
<img src="images/Regression/rbf.svg" alt="Rbf configuration" width="400" height="400" class="img-responsive">
</div> 

##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab the output data matrix with the actual and the predicted value of the target variable is presented. 

<div style="text-align: center;">
<img src="images/Regression/rbf-output.png" alt="Rbf output" width="400" height="400" class="img-responsive">
</div> 

---

## Linear SGD

Stochastic Gradient Descent (SGD) is a method used to minimize an objective (loss) function, which measures the error between the actual values and the predicted outcomes of data points. SGD is employed to incrementally fit various linear regressors by iteratively updating the parameters of a linear model. At each step, it estimates the gradient of the loss function and adjusts the parameters using a constant or decreasing learning rate. Unlike traditional gradient descent, which processes the entire training set in each iteration, SGD operates on a small batch of the training data, enabling faster convergence.<sup>[1,5](#references-regression)</sup>

Use the `Linear SGD` regression function by browsing in the top ribbon: 

|Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Linear SGD|

### Input
{: .no_toc }
Data matrix with training set data. String columns are not taken into account in the algorithm implementation, therefore categorical features must be removed or encoded into numerical values. Linear SGD does not allow the use of integer or string input.

### Configuration
{: .no_toc }

| **Target Column** | Select from the drop-down menu the column containing the target variable that is going to be predicted. Columns with categorical features cannot be selected as targets. |
| **Loss function** | Select manually from the drop-down menu the objective function to be minimized. Three options are available for selection, namely: <br> &nbsp;&nbsp;&nbsp;&nbsp;- `Squared Loss`: average of the squared errors, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `Absolute Loss`: average of the absolute differences, and <br> &nbsp;&nbsp;&nbsp;&nbsp;- `Huber` Loss: combination of Squared Loss and Absolute Loss. |
| **Optimizer** | Select manually the gradient optimizer from the drop-down menu. Three options are available for selection, namely: <br> &nbsp;&nbsp;&nbsp;&nbsp;- `Linear Decay SGD`: decreasing learning rate over time <br> &nbsp;&nbsp;&nbsp;&nbsp;- `Simple SGD`: constant learning rate through training <br> &nbsp;&nbsp;&nbsp;&nbsp;- `Squared Root Decay SGD`: learning rate is decreasing inversely to the number of iterations. |
| **Learning rate** | Specify the initial step size (between 0 and 1) used in the iterative optimization procedure (default value: 0.1). |
| **Number of epochs** | Specify the number (integer) of complete passes through the data during training (default value: 10). |
| **RNG Seed** | Select an integer as seed to get reproducible results. The option to select a time-based random number-generated seed is available. |

### Output
{: .no_toc }

A data matrix including the actual target value and the value predicted by the algorithm ("Prediction") is presented. 

### Example
{: .no_toc }

##### Input
{: .no_toc }

In the left-hand spreadsheet of the tab import the data matrix including the target variable for prediction. Note that the  "Species" categorical column is presented as double (D).

<div style="text-align: center;">
<img src="images/Regression/sgd-input.png" alt="Rbf output" width="500" height="400" class="img-responsive">
</div> 

##### Configuration
{: .no_toc }

1.   Select `Analytics`$$\rightarrow$$ `Regression`$$\rightarrow$$ `Linear SGD`.
1.   Select the column containing the target variable that is going to be predicted from the drop-down menu [1]. Columns with categorical features cannot be selected as targets. 
1.   Select the `Loss function` [2] and the gradient `Optimizer` [3] from the drop-down menus.
1.   Type the hyperparameters that determine the structure of the model: the `Learning rate` [4] and the `Number of epochs`[5]. Default values, data types (double or integer) and acceptable ranges are indicated as guidance on the input parameter values.
1.   Type an `RNG Seed` for reproducible results or a random number generated `Time-based (RNG) Seed` [6].
1.   Click on the `Execute` button [7] to apply the training algorithm on the input data.

<div style="text-align: center;">
<img src="images/Regression/sgd.svg" alt="SGD" width="400" height="400" class="img-responsive">
</div> 

##### Output
{: .no_toc }

In the right-hand spreadsheet of the tab the output data matrix with the actual and the predicted value of the target is presented.

<div style="text-align: center;">
<img src="images/Regression/sgd-output.png" alt="SGD" width="300" height="300" class="img-responsive">
</div> 

---

## XGBoost 

The Extreme Gradient Boosting (XGBoost) open-source library<sup>[6](#references-regression)</sup> is used to implement the gradient boosting framework. The library uses a class of ensemble machine learning algorithms constructed from decision tree models. Ensemble learning operates by combining different individual base learners to obtain a final prediction.<sup>[7](#references-regression)</sup> In an iterative process, trees are added to the ensemble so that the prediction error (loss) of previous models is reduced. In regression problems, the mean squared error is used as loss function.<sup>[8](#references-regression)</sup>

Use the `XGBoost` regression function by browsing in the top ribbon: 

|Analytics $$\rightarrow$$ Regression $$\rightarrow$$ XGBoost|

### Input
{: .no_toc }

Data matrix with training set data. String columns are not taken into account in the algorithm implementation, therefore categorical features must be removed or encoded into numerical values (integer or double). 

### Configuration
{: .no_toc }

| **Target Column** | Select from the drop-down menu the column containing the target variable that is going to be predicted. Columns with categorical features cannot be selected as targets. |
| **booster** | Select from the drop-down menu which booster to use. Three options are available for selection, namely: <br> &nbsp;&nbsp;&nbsp;&nbsp;- `gbtree`: default tree-based models, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `dart`: tree-based models, and <br> &nbsp;&nbsp;&nbsp;&nbsp;- `gblinear`: linear functions. |
| **objective** | Select from the drop-down menu the learning objective of the method. Options include: <br> &nbsp;&nbsp;&nbsp;&nbsp;- `reg:squarederror`: regression with squared loss, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `reg:gamma`: gamma regression with log-link, whose output is a mean of gamma distribution, and <br> &nbsp;&nbsp;&nbsp;&nbsp;- `reg:tweedie`: tweedie regression with log-link. |
| **number of estimators** | Type the number of models (integer) to train in the learning ensemble. |
| **eta** | Specify the learning rate (between 0 and 1) which determines the step size shrinkage to prevent overfitting (default value: 0.3). |
| **gamma** | Specify the minimum loss reduction required to make a further partition on a leaf node of the tree (default value: 0). |
| **max depth** | Specify the maximum depth of a tree as a positive integer (default value: 6). |
| **min child weight** | Specify the minimum sum of instance weight (hessian) needed in a child (default value: 1). |
| **column sample by tree** | Specify the subsample ratio of features when constructing each tree. Subsampling will occur once for every tree constructed. |
| **sub sample** | Specify the subsampling ratio (between 0 and 1) of the training instances. Subsampling will occur once in every boosting iteration (default value: 1). |
| **tree method** | Select the tree construction algorithm used in XGBoost. Options include: <br> &nbsp;&nbsp;&nbsp;&nbsp;- `auto`: use this heuristically to choose the fastest method typically based on the dataset size, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `exact`: exact greedy algorithm, <br> &nbsp;&nbsp;&nbsp;&nbsp;- `approx`: approximates the greedy algorithm using quantile sketch and gradient histogram, and <br> &nbsp;&nbsp;&nbsp;&nbsp;- `hist`: fast histogram optimized approximate greedy algorithm. |
| **lambda** | Specify the L2 regularization term on leaf weights (default value: 1). |
| **alpha** | Specify the L1 regularization term on leaf weights (default value: 0). |
| **RNG Seed** | Select an integer as seed to get reproducible results. The option to select a time-based random number-generated seed is available by clicking on the `Time-based RNG Seed` checkbox. |

### Output 
{: .no_toc }
A data matrix including the actual target value and the value predicted by the algorithm ("Prediction") is presented. 

### Example
{: .no_toc }

##### Input
{: .no_toc }

In the left-hand spreadsheet of the tab import the data matrix including the target variable for prediction. Note that the  "Species" categorical column is presented as double (D).

<div style="text-align: center;">
<img src="images/Regression/xgboost-input.png" alt="XGBoost input" width="500" height="400" class="img-responsive">
</div> 

##### Configuration 
{: .no_toc }

1.   Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `XGBoost` .
1.   Select the column that is going to be predicted from the drop-down menu [1]. 
1.   Select the tree `booster` [2] method, the `objective` function [3] for loss and type the `number of estimators` [4] involved in the ensemble. 
1.   Select the hyperparameters involved in the regularization of the model: `eta` [5], `gamma` [6], `lambda` [12] and `alpha` [13]. Select the hyperparameters involved in tree construction: `max depth` [7] and` min child weight` [8]. Select the column sampling rate by tree [9] and the overall subsampling rates [10]. Default values, data types (double or integer) and acceptable ranges are indicated as guidance on the input parameter values.
1.   Select the tree construction algorithm [11] used in the XGBoost.
1.   Type an `RNG Seed` for reproducible results or a random number generated `Time-based RNG Seed` [14].
1.   Click on the `Execute` button [15] to apply the training algorithm on the input data. 

<div style="text-align: center;">
<img src="images/Regression/xgboost.svg" alt="XGBoost" width="450" height="400" class="img-responsive">
</div> 

##### Output 
{: .no_toc }

In the right-hand spreadsheet of the tab the output data matrix with the actual and the predicted value of the target variable is presented.

<div style="text-align: center;">
<img src="images/Regression/xgboost-output.png" alt="XGBoost output" width="400" height="400" class="img-responsive">
</div> 
---

## Random Forest

Random forest regressor is an ensemble learning method that operates by building multiple randomized decision trees during training and obtaining the prediction of the individual trees. The decision trees are constructed in parallel, with no interaction between them, using random subsets of training data and input attributes to ensure diversity. Predictions independently made by all the trees in the forest are aggregated and averaged to produce a final prediction.<sup>[7,9](#references-regression)</sup>

Use the `Random Forest` function by browsing in the top ribbon:

|Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Random Forest|

### Input
{: .no_toc }

Data matrix with training set data. String columns are not taken into account in the algorithm implementation, therefore categorical features must be excluded or encoded into numerical values (integer or double). 

### Configuration
{: .no_toc }

| **Features fraction** | Specify the feature subsampling rate represented as a fraction of features (between 0 and 1) available in each tree split (default value: 0.9). |
| **Min impurity decrease** | Specify the impurity decrease threshold (between 0 and 1) necessary to determine the quality of splits in the decision trees. A split is only considered if it results in a decrease of impurity greater than or equal to this value (default value: 0.1). |
| **Seed** | Select an integer as seed to get reproducible results. The option to select a time-based random number-generated seed is available. |
| **Number of ensembles** | Specify the number of individual trees to be generated by the algorithm (default value: 10). |
| **Target column** | Select manually from the drop-down menu the column name containing the target variable that is going to be predicted. |


### Output
{: .no_toc }

A data matrix including the actual target value and the value predicted by the algorithm ("Prediction") is presented. 

### Example
{: .no_toc }

##### Input
{: .no_toc }

In the left-hand spreadsheet of the tab import the data matrix including the target variable for prediction. Note that the  "Species" categorical column is presented as double (D).

<div style="text-align: center;">
<img src="images/Regression/random-forest-input.png" alt="Random Forest input" width="500" height="400" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1.   Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Random Forest`.
1.   Specify the hyperparameters that determine the structure of the model: the `Features fraction` [1], `Min impurity decrease` [2] and `Number of ensembles` [4]. Default values, data types (double or integer) and acceptable ranges are indicated as guidance on the input parameter values.
1.   Type a `Seed` for reproducible results or a random number generated `Time-based RNG Seed` [3].
1.   Select the column name with the target variable that is going to be predicted from the drop-down menu [5].
1.   Click on the `Execute` button [6] to apply the training algorithm on the input columns

<div style="text-align: center;">
<img src="images/Regression/random-forest.svg" alt="Random Forest" width="400" height="400" class="img-responsive">
</div>

##### Output
{: .no_toc }

In the right-hand spreadsheet of the tab the output data matrix with the actual and the predicted value of the target is presented.

<div style="text-align: center;">
<img src="images/Regression/random-forest-output.png" alt="Random Forest" width="350" height="400" class="img-responsive">
</div>
---

## Statistical fitting

### MLR
Multiple Linear Regression is a statistical technique that predicts a dependent variable using two or more independent variables. MLR models the relationship between the dependent variable and the predictor using a linear equation. It is an extension of the simple linear regression allowing for more than one independent variable. An MLR model consists of the following key components:
1. Mean Structure: The expected value of the response variable is modeled as a linear combination of predictors:
<div id="mean structure" style="text-align: center;">
    $$
    \begin{equation}
    y_i = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + ... + \beta_p x_{ip} + \epsilon_i
    \end{equation}
    $$
</div> 
where $$\beta_0$$ is the intercept, $$\beta_j$$ are regression coefficients, $$x_{ij}$$  are predictor values, and $$\epsilon_i$$ is the error term.

1.	Assumptions: MLR relies on several key assumptions for valid inference:
    1. Linearity: The relationship between predictors and outcome is linear.
    1. Independence: Observations are independent of each other.
    1. Homoscedasticity: Errors have constant variance across all levels of predictors.
    1. Normality of errors: Residuals are normally distributed (for hypothesis testing).
    1. No multicollinearity: Predictors are not highly correlated with each other.
1.  Estimation Method: Coefficients are typically estimated using Ordinary Least Squares (OLS), which minimizes the sum of squared residuals.
1. 	Interpretation of Coefficients: Each $$\beta_j$$ represents the expected change in the dependent variable for a one-unit change in predictor , $$x_{ij}$$, holding all other predictors constant.
1. 	Model Evaluation: Goodness of fit and explanatory power are commonly assessed with metrics such as $$R^2$$, adjusted $$R^2$$, F-tests, and residual diagnostics.

This method is a simpler implementation allowing only for continuous data and main effects to be included in the model, if you want to perform multiple linear regression with categorical data and more complex options you can refer to Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Linear Models.

Use the MLR method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Classification $$\rightarrow$$ Statistical fitting $$\rightarrow$$ MLR |

#### Input
{: .no_toc }
The input should contain only numerical data and at least 2 columns should be specified, one corresponding to the target variable and at least 1 more to act as an independent predictor. All columns included in the input spreadsheet will be included in the analysis.

#### Configuration
{: .no_toc }

|**Target Column**| Select from the drop-down menu the column containing the target variable that is going to be predicted. Columns with categorical features cannot be selected as targets.|

#### Output
{: .no_toc }
A data matrix including the actual target value and the value predicted by the MLR method.  Also the regression coefficients are present next to the predictions.

#### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab import the data matrix including the target variable for prediction.
<div style="text-align: center;">
<img src="images/MLR/MLR_Input.png" alt="MLR-input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }
1. Select `Analytics` $$\rightarrow$$ `Classification` $$\rightarrow$$ `Statistical fitting` $$\rightarrow$$ `MLR`.
1.	Select the column that is going to be the `Target Column` [1].
1.	Click on the `Execute` button [2] to apply the algorithm on the input table.
<div style="text-align: center;">
<img src="images/MLR/MLR_Configuration.png" alt="MLR-config" width="400" height="300" class="img-responsive">
</div>


##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab the output data matrix with the actual and the predicted value of the target is presented. Also, the coefficients of the regression model are shown. The coefficient below “1” corresponds to the intercept and all other coefficients corresponds to the variable which has the name specified above the value.
<div style="text-align: center;">
<img src="images/MLR/MLR_Output.png" alt="MLR-output" width="400" height="300" class="img-responsive">
</div>


### Generalized Linear Models
Generalized Linear Models (GLMs) are a flexible class of regression models that generalize ordinary linear regression to allow for response variables that have error distributions other than the normal distribution. GLMs are particularly useful when the response variable is categorical (e.g., binary outcomes) or count data, where assumptions of normality and constant variance are inappropriate.
A GLM consists of three components:
1. 	Random Component: The response variable $$y_i$$  is assumed to follow a distribution from the exponential family (e.g., Normal, Binomial, Poisson, Gamma).
1. 	Systematic Component: A linear predictor  $$\eta_i= x_i^T \beta$$, where $$x_i$$ is the vector of predictors for the i-th observation, and $$\beta$$ is the vector of coefficients.
1. 	Link Function: A smooth, monotonic function $$g(⋅)$$ that relates the mean  $$\mu_i= E[y_i]$$ of the response to the linear predictor via $$g(\mu_i )= \eta_i$$.

Unlike traditional linear regression, GLMs do not assume a linear relationship between the predictors and the response. Instead, the link function transforms the expected value of the response variable to a scale where it can be modeled as a linear combination of the predictors.
GLM parameters are estimated using Maximum Likelihood Estimation (MLE). The likelihood is constructed based on the assumed distribution of the response variable, and the log-likelihood function is maximized to obtain the parameter estimates.
Because log-likelihood is usually a nonlinear function of the parameters, iterative optimization method such as Newton-Raphson and Fisher Scoring are used to obtain the maximum likelihood estimates of the parameters of each model.
Categorical variables are encoded using one-hot encoding, where each category is represented by a binary (0 or 1) dummy variable. The reference category for each categorical variable is the first observed category, and its corresponding dummy variable is omitted to avoid multicollinearity. This omission allows the reference category to be implicitly represented in the model intercept, providing a baseline for interpreting the effects of the other categories.


#### Linear
The classical linear regression model assumes that the response variable follows a normal (Gaussian) distribution, conditional on the explanatory variables. Specifically, for a continuous dependent variable $$Y$$, the model expresses $$Y$$ as a linear function of one or more independent variables $$X_1, X_2, …, X_p$$, plus a normally distributed error term:
<div id="linear regression equation" style="text-align: center;">
    $$
    \begin{equation}
    Y = \beta_0 + \beta_1X_1 + ... + \beta_pX_p + \epsilon \text{  ,  } \epsilon \sim \mathcal{N}(0,\sigma^2)
    \end{equation}
    $$
</div> 

Within the framework of Generalized Linear Models (GLMs), linear regression corresponds to the case where the distribution of the dependent variable is Gaussian, and the link function is the identity function:   
<div id="linear regression link function" style="text-align: center;">
    $$
    \begin{equation}
    g(\mu) = \mu \text{, where } \mu = \mathbb{E}[Y]
    \end{equation}
    $$
</div>                        

This identity link implies that the expected value of the outcome is directly modeled as a linear combination of the predictors.
Linear regression is the most used when the dependent variable is continuous, unbounded, and approximately normally distributed, and when the relationship between the predictors and the outcome is assumed to be additive and linear.

Use the Linear Regression method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Linear Models |

And then choosing "Linear" as the `Type`.


##### Input
{: .no_toc }
All variables need to be specified in the datasheet. Numerical values will be used for the covariates and the dependent variable. Factors, however, can be textual as well as numerical. The design for Linear Regression requires at least two columns in the input sheet: one column representing either a categorical factor or a covariate (independent variable), and another column for the numerical response. Each row represents a single observation.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Scale Parameter Method**| Determines how the scale (error variance) parameter is estimated. Options include: Fixed value, Deviance, or Pearson Chi-square. |
|**Value**| Specifies the scale parameter value manually, only when Fixed value is selected in the Scale Parameter Method. |
|**Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one covariate  or factor column should be specified.|
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the linear regression procedure is organized into:
1. The Predicted Values Table contains the actual values of the dependent variable and the corresponding predicted values generated by the model for each observation.
1. The Goodness of Fit Table includes statistical measures that assess how well the model fits the data, such as Deviance, Log-Likelihood, AIC, BIC, and related metrics.
1. The Parameter Estimates Table displays the estimated coefficients for each variable in the model, along with standard errors, confidence intervals, test statistics, degrees of freedom, and p-values.


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The input datasheet must include one continuous dependent variable, which will serve as the target, and at least one column with a continuous or categorical independent variable.
<div style="text-align: center;">
<img src="images/GLM/LinearGLM_Input.png" alt="linearGLM-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1. Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting` $$\rightarrow$$ `Generalized Linear Models`
1. Set the `Type` [1] of regression to Linear.
1. Specify the `Confidence Level (%)` [2] for the test.
1. Select the `Dependent Variable` [3].
1. Select the `Scale Parameter Method` [4].
1. Specify the `Value` [5] of the scale parameter method if the Fixed value option was chosen as the scale parameter method.
1. Select the columns by clicking on the arrow buttons [9] and moving columns between the `Excluded Columns` [6] and `Factors` [7] and `Covariates` [8] lists.
1. `Specify Reference Levels` [10] for the categorical factors.
1. Select your preferred option to define the model you want to analyze [11].
1. If the `Custom` option is selected, specify the `Formula` [12] for the analysis.
1. Click on the `Execute` button [13] to perform the Linear Regression method.

<div style="text-align: center;">
<img src="images/GLM/LinearGLM_Configuration.png" alt="linearGLM-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The predictions, Goodness of Fit table and Parameter Estimates table are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GLM/LinearGLM_Output.png" alt="linearGLM-output" width="400" height="300" class="img-responsive">
</div>

#### Negative Binomial 
Negative Binomial Regression is a type of generalized linear model (GLM) used for modeling count data that exhibit overdispersion – that is, when the variance exceeds the mean. It assumes that the dependent variable follows a Negative Binomial distribution, which is a generalization of the Poisson distribution that introduces an additional dispersion parameter to account for variability beyond the mean. The most  commonly used link function is the log link, which models the logarithm of the expected count as a linear combination of the predictors:
<div id="negative binomial regression link function" style="text-align: center;">
    $$
    \begin{equation}
    g(\mu) = log(\mu) = x\beta
    \end{equation}
    $$
</div>       
Negative Binomial Regression is particularly useful in scenarios such as modeling the number of hospital visits, insurance claims, or any count-based outcome where the data are not well-fitted by Poisson model due to excess variation.

Use the Negative Binomial Regression method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Linear Models |

And then choosing "Negative Binomial" as the `Type`.

##### Input
{: .no_toc }
All variables must be specified in the datasheet. The dependent variable must be a non-negative integer count, as Negative Binomial Regression is designed for modeling count data. The dependent variable should not contain decimal values, negative numbers, or missing entries. Independent variables may be either numerical or categorical. Categorical variables can be represented using either text labels or numerical codes. The input datasheet must contain at least two columns: one for the dependent variable and one or more for the independent variables. Each row corresponds to single observation. This model is especially appropriate when the count data show overdispersion, meaning that the variance is greater than the mean – something that the standard Poisson model cannot adequately handle.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**| Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Maximum Step-Halving**| Controls how many times the algorithm is allowed to halve the step size during parameter updates when an iteration leads to worse model fit.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Parameter Estimation**| This option lets you choose how the model parameters will be estimated, Newton-Raphson, Fisher Scoring or Hybrid.|
|**Maximum Scoring Iterations**| The "Maximum Scoring Iterations" parameter is used when the hybrid estimation method is selected, instead of Newton-Raphson or Fisher scoring alone, and specifies the maximum number of iterations to be performed during the scoring phase.|
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached.|
|**Scale Parameter Method**| Determines how the scale (error variance) parameter is estimated. Options include: Fixed value, Deviance, or Pearson Chi-square. |
|**Value**| Specifies the scale parameter value manually, only when Fixed value is selected in the Scale Parameter Method. |
|**Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one covariate  or factor column should be specified.|
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Negative Binomial regression procedure is organized into three main sections: the Predicted Values Table, the Goodness of Fit Statistics, and the Parameter Estimates Table.
1. The Predicted Values Table contains the actual values of the dependent variable and the corresponding predicted values generated by the model for each observation.
1. The Goodness of Fit Table includes statistical measures that assess how well the model fits the data, such as Deviance, Log-Likelihood, AIC, BIC, and related metrics.
1. The Parameter Estimates Table displays the estimated coefficients for each variable in the model, along with standard errors, confidence intervals, test statistics, degrees of freedom, and p-values.


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The input datasheet must include one continuous, non-negative dependent variable, which will serve as the target, and at least one column with a continuous or categorical independent variable.
<div style="text-align: center;">
<img src="images/GLM/NegBinGLM_Input.png" alt="negbinGLM-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1.	Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting`  $$\rightarrow$$ `Generalized Linear Models`
1.	Set the `Type` [1] of regression to Negative Binomial.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify the `Maximum Step-Halving` [4].
1.	Select the `Dependent Variable` [5].
1.	Select the `Parameter Estimation Method` [6].
1.	Specify the `Maximum Scoring Iterations` if Hybrid option is selected as the `Parameter Estimation Method`[7].
1.	Specify the `Minimum Change in Parameter Estimates` [8].
1.	Select the `Scale Parameter Method` [9].
1.	Specify the `Value` [10] of the scale parameter method if the Fixed value option was chosen as the scale parameter method.
1.	Select the columns by clicking on the arrow buttons [14] and moving columns between the `Excluded Columns` [11] and `Factors` [12] and `Covariates` [13] lists.
1. `Specify Reference Levels` [15] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [16].
1.	If the `Custom` option is selected, specify the `Formula` [17] for the analysis.
1.	Click on the `Execute` button [18] to perform the Negative Binomial Regression method.
<div style="text-align: center;">
<img src="images/GLM/NegBinGLM_Configuration.png" alt="negbinGLM-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The predictions, Goodness of Fit table and Parameter Estimates table are shown in the output spreadsheet
<div style="text-align: center;">
<img src="images/GLM/NegBinGLM_Output.png" alt="negbinGLM-output" width="400" height="300" class="img-responsive">
</div>

#### Poisson 
Poisson Regression is type of generalized linear model (GLM) used for modeling count data, where the dependent variable represents the number of times an event occurs within a fixed period, space, or exposure. It assumes that the response variable follows a Poisson distribution, where the mean is equal to the variance. The most common link function used is the log link, which relates the natural logarithm of the expected count to a linear combination of independent variables..
<div id="poisson regression link function" style="text-align: center;">
    $$
    \begin{equation}
    g(\mu) = log(\mu) = x\beta
    \end{equation}
    $$
</div>   
The independent variables can be either numerical or categorical, and they are used to explain variation in the count outcome. Poisson Regression is typically applied in cases such as modeling the number of doctor visits, traffic accidents, or product defects.

Use the Poisson Regression method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Linear Models |

And then choosing "Poisson" as the `Type`.

##### Input
{: .no_toc }
All variables must be specified in the datasheet. The dependent variable must be a non-negative integer count, as Poisson Regression is designed for modeling count data. The dependent variable should not contain decimal values, negative numbers, or missing entries. Independent variables may be either numerical or categorical. Categorical variables can be represented using either text labels or numerical codes. The input datasheet must include at least two columns: one for the dependent variable and one or more for the independent variables. Each row corresponds to a single observation. This model is appropriate when the count data has a variance approximately equal to the mean.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**| Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Maximum Step-Halving**| Controls how many times the algorithm is allowed to halve the step size during parameter updates when an iteration leads to worse model fit.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Parameter Estimation**| This option lets you choose how the model parameters will be estimated, Newton-Raphson, Fisher Scoring or Hybrid.|
|**Maximum Scoring Iterations**| The "Maximum Scoring Iterations" parameter is used when the hybrid estimation method is selected, instead of Newton-Raphson or Fisher scoring alone, and specifies the maximum number of iterations to be performed during the scoring phase.|
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached.|
|**Scale Parameter Method**| Determines how the scale (error variance) parameter is estimated. Options include: Fixed value, Deviance, or Pearson Chi-square. |
|**Value**| Specifies the scale parameter value manually, only when Fixed value is selected in the Scale Parameter Method. |
|**Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one covariate  or factor column should be specified.|
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Poisson regression procedure is organized into three main sections: the Predicted Values Table, the Goodness of Fit Statistics, and the Parameter Estimates Table. 
1. The Predicted Values Table contains the actual values of the dependent variable and the corresponding predicted values generated by the model for each observation.
1. The Goodness of Fit Table includes statistical measures that assess how well the model fits the data, such as Deviance, Log-Likelihood, AIC, BIC, and related metrics.
1. The Parameter Estimates Table displays the estimated coefficients for each variable in the model, along with standard errors, confidence intervals, test statistics, degrees of freedom, and p-values.


##### Example
{: .no_toc }

###### Input
{: .no_toc }
Τhe dataset must include a target variable consisting of non-negative integer counts, appropriate for modeling with Poisson regression, and at least one column with a continuous or categorical independent variable.
<div style="text-align: center;">
<img src="images/GLM/PoissonGLM_Input.png" alt="poissonGLM-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1.	Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting`  $$\rightarrow$$ `Generalized Linear Models`
1.	Set the `Type` [1] of regression to Poisson.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify the `Maximum Step-Halving` [4].
1.	Select the `Dependent Variable` [5].
1.	Select the `Parameter Estimation Method` [6].
1.	Specify the `Maximum Scoring Iterations` if Hybrid option is selected as the `Parameter Estimation Method`[7].
1.	Specify the `Minimum Change in Parameter Estimates` [8].
1.	Select the `Scale Parameter Method` [9].
1.	Specify the `Value` [10] of the scale parameter method if the Fixed value option was chosen as the scale parameter method.
1.	Select the columns by clicking on the arrow buttons [14] and moving columns between the `Excluded Columns` [11] and `Factors` [12] and `Covariates` [13] lists.
1. `Specify Reference Levels` [15] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [16].
1.	If the `Custom` option is selected, specify the `Formula` [17] for the analysis.
1.	Click on the `Execute` button [18] to perform the Poisson Regression method.
<div style="text-align: center;">
<img src="images/GLM/PoissonGLM_Configuration.png" alt="poissonGLM-config" width="400" height="300" class="img-responsive">
</div>


###### Output
{: .no_toc }
The predictions, Goodness of Fit table and Parameter Estimates table are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GLM/PoissonGLM_Output.png" alt="poissonGLM-output" width="400" height="300" class="img-responsive">
</div>

#### Gamma 
Gamma regression is a type of generalized linear model (GLM) used when the response variable is continuous, strictly positive, and right-skewed behavior. It assumes that the dependent variable follows a Gamma distribution, which is well-suited for modeling non-negative data with a variance that increases with the mean. A common choice for the link function in Gamma regression is the log link, which relates the mean of the response variable to the linear predictors via the natural logarithm.
<div id="gamma link function" style="text-align: center;">
    $$
    \begin{equation}
    g(\mu) = log(\mu) = x\beta
    \end{equation}
    $$
</div> 
Gamma regression is particularly useful in applications such as modeling costs, waiting times, insurance claims, or any scenario where the outcome is positive and skewed. It provides a flexible framework to account for heteroscedasticity and asymmetry in data.

Use the Gamma Regression method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Linear Models |

And then choosing "Gamma" as the `Type`.

##### Input
{: .no_toc }
All variables must be specified in the datasheet. The dependent variable must be strictly positive continuous numerical variable, as Gamma regression is not defined for zero or negative values. Independent variables may be either numerical or numerical. Categorical factors can be represented as text labels or coded numerically. The input datasheet must include at least two columns: one for the dependent variable and one or more columns for the independent variables. Each row in the datasheet represents a single observation. It is important to check for zero or missing values in the dependent variable, as they may cause the model to fail or produce invalid estimates.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**| Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Maximum Step-Halving**| Controls how many times the algorithm is allowed to halve the step size during parameter updates when an iteration leads to worse model fit.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Parameter Estimation**| This option lets you choose how the model parameters will be estimated, Newton-Raphson, Fisher Scoring or Hybrid.|
|**Maximum Scoring Iterations**| The "Maximum Scoring Iterations" parameter is used when the hybrid estimation method is selected, instead of Newton-Raphson or Fisher scoring alone, and specifies the maximum number of iterations to be performed during the scoring phase.|
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached.|
|**Scale Parameter Method**| Determines how the scale (error variance) parameter is estimated. Options include: Fixed value, Deviance, or Pearson Chi-square. |
|**Value**| Specifies the scale parameter value manually, only when Fixed value is selected in the Scale Parameter Method. |
|**Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one covariate  or factor column should be specified.|
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Gamma regression procedure is organized into three main sections: the Predicted Values Table, the Goodness of Fit Statistics, and the Parameter Estimates Table. 
1. The Predicted Values Table contains the actual values of the dependent variable and the corresponding predicted values 1. generated by the model for each observation.
1. The Goodness of Fit Table includes statistical measures that assess how well the model fits the data, such as Deviance, Log-Likelihood, AIC, BIC, and related metrics.
1. The Parameter Estimates Table displays the estimated coefficients for each variable in the model, along with standard errors, confidence intervals, test statistics, degrees of freedom, and p-values.


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The input datasheet must include one continuous, positive dependent variable, which will serve as the target, and at least one column with a continuous or categorical independent variable.
<div style="text-align: center;">
<img src="images/GLM/GammaGLM_Input.png" alt="gammaGLM-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
###### Configuration
{: .no_toc }
1.	Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting`  $$\rightarrow$$ `Generalized Linear Models`
1.	Set the `Type` [1] of regression to Gamma.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify the `Maximum Step-Halving` [4].
1.	Select the `Dependent Variable` [5].
1.	Select the `Parameter Estimation Method` [6].
1.	Specify the `Maximum Scoring Iterations` if Hybrid option is selected as the `Parameter Estimation Method`[7].
1.	Specify the `Minimum Change in Parameter Estimates` [8].
1.	Select the `Scale Parameter Method` [9].
1.	Specify the `Value` [10] of the scale parameter method if the Fixed value option was chosen as the scale parameter method.
1.	Select the columns by clicking on the arrow buttons [14] and moving columns between the `Excluded Columns` [11] and `Factors` [12] and `Covariates` [13] lists.
1. `Specify Reference Levels` [15] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [16].
1.	If the `Custom` option is selected, specify the `Formula` [17] for the analysis.
1.	Click on the `Execute` button [18] to perform the Gamma Regression method.
<div style="text-align: center;">
<img src="images/GLM/GammaGLM_Configuration.png" alt="gammaGLM-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The predictions, Goodness of Fit table and Parameter Estimates table are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GLM/GammaGLM_Output.png" alt="gammaGLM-output" width="400" height="300" class="img-responsive">
</div>

#### Tweedie with Identity Link
Tweedie Regression is a type of generalized linear model (GLM) designed to handle semi-continuous response variables, variables that exhibit a combination of many exact zeros and positive, continuous values. It assumes the response variable follows a Tweedie distribution, a member of the exponential dispersion family that encompasses distributions such as the normal, Poisson, gamma, and inverse Gaussian as special cases.
When the Tweedie power parameter lies between 1 and 2, the distribution corresponds to a compound Poisson–Gamma process, which makes it particularly suitable for modeling zero-inflated, right-skewed data—such as insurance claim amounts, healthcare costs, or ecological measurements.
In this formulation, the identity link function is used, meaning that the expected value of the response variable is modeled directly as a linear function of the predictors:
<div id="tweedie regression identity link function" style="text-align: center;">
    $$
    \begin{equation}
    g(\mu) = \mu = x\beta
    \end{equation}
    $$
</div>       

This link is appropriate when the response values are already on a meaningful scale and do not require transformation. However, care must be taken to ensure that the predicted values remain in a valid range (e.g., non-negative), since the identity link does not constrain the output.

Use the Tweedie Regression method with identity link by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Linear Models |

And then choosing "Tweedie with Identity Link" as the `Type`.


##### Input
{: .no_toc }
All variables must be specified in the datasheet. The dependent variable must be a non-negative continuous numeric value, which may include many zeros alongside positive, right-skewed values. This reflects the typical structure of semi-continuous data for which Tweedie Regression with identity link is appropriate. Because the identity link function models the expected value directly, care should be taken to ensure that the response values are within a reasonable range, and that the model will not predict invalid (e.g., negative) values. The dependent variable should not contain negative numbers or missing entries. Independent variables may be either numerical or categorical. Categorical variables can be represented using text labels or numerical codes. The input datasheet must include at least two columns: one for the dependent variable and one or more for the independent variables. Each row should represent a single observation.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**| Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Maximum Step-Halving**| Controls how many times the algorithm is allowed to halve the step size during parameter updates when an iteration leads to worse model fit.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Parameter Estimation**| This option lets you choose how the model parameters will be estimated, Newton-Raphson, Fisher Scoring or Hybrid.|
|**Maximum Scoring Iterations**| The "Maximum Scoring Iterations" parameter is used when the hybrid estimation method is selected, instead of Newton-Raphson or Fisher scoring alone, and specifies the maximum number of iterations to be performed during the scoring phase.|
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached.|
|**Scale Parameter Method**| Determines how the scale (error variance) parameter is estimated. Options include: Fixed value, Deviance, or Pearson Chi-square. |
|**Value**| Specifies the scale parameter value manually, only when Fixed value is selected in the Scale Parameter Method. |
|**Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one covariate  or factor column should be specified.|
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Tweedie regression with identity link procedure is organized into three main sections: the Predicted Values Table, the Goodness of Fit Statistics, and the Parameter Estimates Table. 
1. The Predicted Values Table contains the actual values of the dependent variable and the corresponding predicted values generated by the model for each observation.
1. The Goodness of Fit Table includes statistical measures that assess how well the model fits the data, such as Deviance, Log-Likelihood, AIC, BIC, and related metrics.
1. The Parameter Estimates Table displays the estimated coefficients for each variable in the model, along with standard errors, confidence intervals, test statistics, degrees of freedom, and p-values.


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The input datasheet must include one non-negative continuous dependent variable, which will serve as the target, and at least one column with a continuous or categorical independent variable.
<div style="text-align: center;">
<img src="images/GLM/TweedieIdentityGLM_Input.png" alt="tweedieidentityGLM-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1.	Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting`  $$\rightarrow$$ `Generalized Linear Models`
1.	Set the `Type` [1] of regression to Tweedie with Identity Link.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify the `Maximum Step-Halving` [4].
1.	Select the `Dependent Variable` [5].
1.	Select the `Parameter Estimation Method` [6].
1.	Specify the `Maximum Scoring Iterations` if Hybrid option is selected as the `Parameter Estimation Method`[7].
1.	Specify the `Minimum Change in Parameter Estimates` [8].
1.	Select the `Scale Parameter Method` [9].
1.	Specify the `Value` [10] of the scale parameter method if the Fixed value option was chosen as the scale parameter method.
1.	Select the columns by clicking on the arrow buttons [14] and moving columns between the `Excluded Columns` [11] and `Factors` [12] and `Covariates` [13] lists.
1. `Specify Reference Levels` [15] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [16].
1.	If the `Custom` option is selected, specify the `Formula` [17] for the analysis.
1.	Click on the `Execute` button [18] to perform the Tweedie Regression with Identity Link method.
<div style="text-align: center;">
<img src="images/GLM/TweedieIdentityGLM_Configuration.png" alt="tweedieidentityGLM-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The predictions, Goodness of Fit table and Parameter Estimates table are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GLM/TweedieIdentityGLM_Output.png" alt="tweedieidentityGLM-output" width="400" height="300" class="img-responsive">
</div>

#### Tweedie with Log Link
Tweedie Regression is a type of generalized linear model (GLM) designed to handle semi-continuous response variables – that is, variables that take on many exact zeros and positive, continuous values otherwise. It assumes the response variable follows a Tweedie distribution, which belongs to the exponential dispersion family and includes the normal, Poisson, gamma and inverse Gaussian distributions as special cases. When the Tweedie power parameter lies between 1 and 2, the distribution corresponds to a compound Poisson- Gamma process, making it ideal for modeling zero-inflated, right-skewed data such as insurance claim amounts, healthcare expenditures, or ecological measurements. The most common link function used is the log link, where the logarithm of the expected value is modeled as a linear function of the predictors.
<div id="tweedie regression log link function" style="text-align: center;">
    $$
    \begin{equation}
    g(\mu) = log(\mu) = x\beta
    \end{equation}
    $$
</div>    

Use the Tweedie Regression with Log Link method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Linear Models |

And then choosing "Tweedie with Log Link" as the `Type`.

##### Input
{: .no_toc }
All variables must be specified in the datasheet. The dependent variable must be a non-negative continuous numeric value, which may include many zeros alongside positive, right-skewed continuous values. This reflects the typical structure of semi-continuous data for which Tweedie Regression is appropriate. The dependent variable should not contain negative numbers or missing entries. Independent variables may be either numerical or categorical. Categorical variables can be represented using text labels or numerical codes. The input datasheet must include at least two columns: one for the dependent variable and one or more for the independent variables. Each row should represent a single observation.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**| Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Maximum Step-Halving**| Controls how many times the algorithm is allowed to halve the step size during parameter updates when an iteration leads to worse model fit.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Parameter Estimation**| This option lets you choose how the model parameters will be estimated, Newton-Raphson, Fisher Scoring or Hybrid.|
|**Maximum Scoring Iterations**| The "Maximum Scoring Iterations" parameter is used when the hybrid estimation method is selected, instead of Newton-Raphson or Fisher scoring alone, and specifies the maximum number of iterations to be performed during the scoring phase.|
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached.|
|**Scale Parameter Method**| Determines how the scale (error variance) parameter is estimated. Options include: Fixed value, Deviance, or Pearson Chi-square. |
|**Value**| Specifies the scale parameter value manually, only when Fixed value is selected in the Scale Parameter Method. |
|**Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one covariate  or factor column should be specified.|
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Tweedie regression with log link procedure is organized into three main sections: the Predicted Values Table, the Goodness of Fit Statistics, and the Parameter Estimates Table. 
1. The Predicted Values Table contains the actual values of the dependent variable and the corresponding predicted values generated by the model for each observation.
1. he Goodness of Fit Table includes statistical measures that assess how well the model fits the data, such as Deviance, Log-Likelihood, AIC, BIC, and related metrics.
1. The Parameter Estimates Table displays the estimated coefficients for each variable in the model, along with standard errors, confidence intervals, test statistics, degrees of freedom, and p-values.


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The input datasheet must include one non-negative continuous dependent variable, which will serve as the target, and at least one column with a continuous or categorical independent variable.
<div style="text-align: center;">
<img src="images/GLM/TweedieLogGLM_Input.png" alt="tweedielogGLM-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1.	Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting`  $$\rightarrow$$ `Generalized Linear Models`
1.	Set the `Type` [1] of regression to Tweedie with Log Link.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify the `Maximum Step-Halving` [4].
1.	Select the `Dependent Variable` [5].
1.	Select the `Parameter Estimation Method` [6].
1.	Specify the `Maximum Scoring Iterations` if Hybrid option is selected as the `Parameter Estimation Method`[7].
1.	Specify the `Minimum Change in Parameter Estimates` [8].
1.	Select the `Scale Parameter Method` [9].
1.	Specify the `Value` [10] of the scale parameter method if the Fixed value option was chosen as the scale parameter method.
1.	Select the columns by clicking on the arrow buttons [14] and moving columns between the `Excluded Columns` [11] and `Factors` [12] and `Covariates` [13] lists.
1. `Specify Reference Levels` [15] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [16].
1.	If the `Custom` option is selected, specify the `Formula` [17] for the analysis.
1.	Click on the `Execute` button [18] to perform the Tweedie Regression with Log Link method.
<div style="text-align: center;">
<img src="images/GLM/TweedieLogGLM_Configuration.png" alt="tweedielogGLM-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The predictions, Goodness of Fit table and Parameter Estimates table are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GLM/TweedieLogGLM_Output.png" alt="tweedielogGLM-output" width="400" height="300" class="img-responsive">
</div>

### Loglinear Models
Log-linear models are a special case of generalized linear models that explain how cell counts vary across the levels of categorical variables in a contingency table. They also let us examine associations and interaction patterns among those variables. By default, these models treat the predictors (factors) as nominal, and the response is the count for each combination of factor levels—either the implicit number of times a combination appears in the raw data or, when present, the value in a frequency column.

In practice, they fit a GLM with a logarithmic link function and a Poisson or a Multinomial distribution for the response variable, estimating:
<div id="loglinear link" style="text-align: center;">
    $$
    \begin{equation}
    log(\mu) = \alpha \beta_1 x_1 + ... + \beta_k x_k
    \end{equation}
    $$
</div>
where $$\mu$$ is the expected count for a given set of factor levels. The $$x_s$$ are indicator variables for factor levels and their interactions.

A saturated log-linear model includes all main effects and all possible interactions among the factors. It exactly reproduces the observed cell counts, so the fitted means, $$\hat{\mu_i}$$, equal the data, $$y_i$$, the residual deviance is 0, and the residual degrees of freedom are 0. Because diagnostics like standardized/adjusted residuals can involve divisions by $$\sqrt{\hat{\mu_i}}$$, we optionally add a small positive constant $$\delta$$ when the model is saturated to avoid division by zero when $$𝑦_𝑖=0$$.

Beyond the saturated case, there is also a custom model option where we include only the terms we want (e.g., main effects only, selected two-way interactions, etc.). 

For each cell (factor combination) we provide the following cell diagnostics:
1. Observed count:
    <div id="observed count" style="text-align: center;">
        $$
        \begin{equation}
        y_i
        \end{equation}
        $$
    </div>
1. Observed percentage:
    <div id="observed percentage" style="text-align: center;">
        $$
        \begin{equation}
        \frac{y_i}{\sum_{i=1}^n y_i}
        \end{equation}
        $$
    </div>
1. Expected count
    <div id="expected count" style="text-align: center;">
        $$
        \begin{equation}
        \hat{\mu_i}
        \end{equation}
        $$
    </div>
1. Expected percentage:
    <div id="expected percentage" style="text-align: center;">
        $$
        \begin{equation}
        \frac{\hat{\mu_i}}{\sum_{i=1}^n \hat{\mu_i}}
        \end{equation}
        $$
    </div>
1. Residual:
    <div id="residual" style="text-align: center;">
        $$
        \begin{equation}
        r_i = y_i - \hat{\mu_i}
        \end{equation}
        $$
    </div>
1. Standardized Residual:
    <div id="standardized residual" style="text-align: center;">
        $$
        \begin{equation}
        r_i^{std} = \frac{y_i - \hat{\mu_i}}{\sqrt{\hat{\mu_i}}}
        \end{equation}
        $$
    </div>
1. Adjusted Residual:
    <div id="adjusted residual" style="text-align: center;">
        $$
        \begin{equation}
        r_i^{adj} = \frac{y_i - \hat{\mu_i}}{\sqrt{\hat{\mu_i}}(1-h_{ii})}
        \end{equation}
        $$
    </div>
    where $$h_{ii}$$ is the i-th diagonal element of the hat matrix.
1. Deviance Residual:
    <div id="deviance residual" style="text-align: center;">
        $$
        \begin{equation}
        d_i = 2sign(y_i-\hat{\mu_i})[y_ilog(\frac{y_i}{\hat{\mu_i}}) - (y_i \hat{\mu_i})]
        \end{equation}
        $$
    </div>

Use the Loglinear Model method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Loglinear Models |

#### Input
{: .no_toc}
All variables need to be specified in the data sheet. Numerical values will be used for the cell covariates as well as for dependent variables, which is the cell count or frequency. Factors, however, can be textual as well as numerical. The design for log-linear modeling requires at least two elements in the input sheet: one or more columns representing the categorical factors that define the contingency cells, and either a numeric frequency column (for pre-aggregated tables) or raw rows with no frequency column (in which case counts are computed from the repetitions). Each row represents a single observation in the raw-data case and corresponds to a single cell in the aggregated-table case; optional cell covariates can be included as additional numeric columns.

#### Configuration 
{: .no_toc}

|**Distribution of Cell Counts**|Specify the desired distribution of cell counts. Available options include Poisson and Multinomial.|
|**Confidence Level(%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages.|
|**Max Iterations**|Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Minimum Change in Parameter Estimates**|Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached.|
|**Delta**|Specify a small positive constant added only for numerical stability when the model is saturated (perfect fit).  Values should range from 0 to 1 with the default option being 0.5.|
|**Do not weight cases/ Weight cases by**|Choose whether each row contributes equally or according to a weight variable. If the “Do not weight cases” option is selected, then each row counts as 1. If the “Weight cases by” option is selected, select a numeric column to be treated as the frequency. For each factor combination, the model uses the sum of that column as the cell frequency. Values must be numerical and non-negative.|
|**Factors/Cell Covariates/Excluded Columns**|Select manually the columns that correspond to factors and the columns that correspond to cell covariates through the dialog window: Use the buttons to move columns between the Factors and Cell Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns and double-arrow buttons will move all columns. At least one factor column should be specified.|
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Saturated Model/Custom Model**|These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Saturated Model option includes both all main effects and all possible interaction terms to build a full model.Note that the Saturated Model option does not allow the use of a formula.|
|**Formula**|Specify the model formula used for the analysis if the Custom Model option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the categorical variables involved, i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

#### Output
{: .no_toc}
The output of the log-linear procedure is organized into four sections: the Counts & Residuals Table, the Covariance Matrix, the Correlations Matrix and the Parameter Estimates Table. 
The Counts & Residuals Table provides the cell diagnostics we discussed earlier. For each cell we provide the Observed count, the Observed percentage, the Expected Count, The Expected Percentage, the Residual, the Standardized Residual, the Adjusted Residual and the Deviance.
The Covariance and Correlations matrices show the covariance and correlation of each pair of variables in the model accordingly.
The Parameter Estimates Table displays the estimated coefficients for each variable in the model, along with standard errors, confidence intervals, test statistics, degrees of freedom, and p-values.

#### Example
{: .no_toc}

##### Input
{: .no_toc}
The input datasheet must include at least one factor variable, either numeric or textual.
<div style="text-align: center;">
<img src="images/Loglinear/Loglinear_Input.png" alt="loglinear-input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc}
1. Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting` $$\rightarrow$$ `Loglinear Models`.
1.	Select the `Distribution of Cell Counts` [1].
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify the `Minimum Change in Parameter Estimates` [4].
1.	Specify the `Delta`[5] parameter for numerical stability.
1.	Choose whether to `Do not weight cases` or `Weight cases by` [6]. If the `Weight cases by` option is selected, specify the `frequency` column[7].
1.	Select the columns by clicking on the arrow buttons [11] and moving columns between the `Excluded Columns` [8] and `Factors` [9] and `Cell Covariates `[10] lists.
1. `Specify Reference Levels` [12] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [13].
1.	If the `Custom Model` option is selected, specify the `Formula` [14] for the analysis.
1.	Click on the `Execute` button [15] to perform the Loglinear method.
<div style="text-align: center;">
<img src="images/Loglinear/Loglinear_Configuration.png" alt="loglinear-config" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc}
The Counts & Residuals Table, Covariance Matrix, Correlations Matrix and the Parameter Estimates Table are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/Loglinear/Loglinear_Output.png" alt="loglinear-output" width="800" height="600" class="img-responsive">
</div>

### Generalized Estimating Equations
Generalized Estimating Equations (GEEs) extend Generalized Linear Models (GLMs) to handle correlated or clustered response data, such as repeated measures or longitudinal observations. GEEs are particularly useful when responses are not independent, as they allow for within-subject correlation, making them ideal for analyzing data collected over time or across related units.
A GEE model consists of the following key components:
1.  Mean Structure: Like GLMs, the expected value of the response variable is modeled using a linear predictor :
<div id="linear predictor" style="text-align: center;">
    $$
    \begin{equation}
    \eta_i = x_i^T\beta
    \end{equation}
    $$
</div> 

Where $$x_i$$ is the vector of predictors and $$\beta$$ is the vector of coefficients.
1. 	Link Function: A monotonic function $$g(∙)$$ that links the mean of the response $$\mu_i= E[y_i]$$ to the linear predictor, so that $$g(\mu_i)=\eta_i$$.
1. Working Correlation Matrix: Specifies the assumed correlation structure among repeated observations within the same subject. Common structures include:
    1. Independent: assumes no within-subject correlation.
    1. Exchangeable: assumes equal correlation between all pairs of observations.
    1. AR(1): assumes correlations decrease with time distance.
    1. Unstructured: allows a distinct correlation for each pair of observations, with no constraints.
    1. M-dependent: assumes nonzero correlations only up to lag M, and zero correlations beyond that distance.

GEE estimation relies on solving quasi-likelihood equations rather than maximizing a full likelihood function, making it a semi-parametric approach. Parameters are estimated using iterative methods such as iteratively reweighted least squares (IRLS), and standard errors are typically computed using robust estimators to ensure valid inference even if the correlation structure is misspecified.
In GEE models, a subject variable is required to identify the unit over which repeated measurements occur (e.g., patient ID). Optionally, a within-subject variable (e.g., time or visit number) can be specified to define the ordering of repeated measurements. Cases are usually sorted by subject and within-subject variables to ensure correct modeling of correlation patterns.
The robust covariance estimator is the default choice, providing consistent standard errors under mild assumptions. The model-based estimator may be more efficient if the correlation structure is correctly specified, but it is more sensitive to misspecification.
Categorical variables are encoded using dummy coding, as in GLMs. The reference category is omitted by default to avoid multicollinearity and serve as a baseline for interpreting effects.

Each variant of this method is specified by the distribution of the response variable and the link function used. In the table below we specify the distribution and link function used for each variant:

|**GEE Variant**|**Distribution**|**Link Function**|
|Linear|Normal|Identity|
|Negative Binomial|Negative Binomial|Log|
|Poisson|Poisson|Log|
|Gamma|Gamma|Log|
|Tweedie with Identity Link|Tweedie|Identity|
|Tweedie with Log Link|Tweedie|Log|


#### Linear
Use the Linear Regression method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Estimating Equations |

And then choosing "Linear" as the `Type`.

##### Input
{: .no_toc }
All variables must be specified in the datasheet. The dependent variable must be numerical, as Linear Regression within the GEE framework models continuous outcomes. Covariates should also be numerical, while categorical predictors (factors) can be represented using either text labels or numeric codes. The input datasheet must include at least two columns: one for the dependent variable and one or more for the independent variables (covariates or factors). Each row should correspond to a single observation. Additionally, a subject identifier column is required to define clusters of repeated measurements, and optionally a within-subject variable (e.g., time) to specify the order of observations within each subject.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**|Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Iterations Between Updates**|Defines how often the working correlation matrix is updated during estimation.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached. |
|**Hessian Convergence**| Specifies a threshold for convergence based on the second derivatives (Hessian matrix). |
|**Scale Parameter**| Adjusts the variance of the model. |
|**Within Subject**| Selects the column that defines the ordering of repeated observations within each subject.|
|**Structure**| Defines the working correlation structure for repeated measurements within subjects. Choices include Independent, Exchangeable, AR(1), Unstructured and M-Dependent.|
|**M**|In the M-Dependent correlation structure, M specifies the maximum number of consecutive observations within each cluster that are assumed to be correlated, with correlations set to zero for observations more than M time points apart. M must be an integer in the range from 1 to (number of within-subject observations – 1).|
|**Covariance Matrix**|In the Covariance Matrix option, the user selects how the model's standard errors will be estimated. The Robust estimator is resistant to misspecification of the correlation structure, while the Model-based estimator assumes the specified correlation is correct.|
|**Subjects/Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to subjects, factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Subjects, Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns. At least one covariate or factor column should be specified. Also, a column for the Subject is required. |
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Generalized Estimating Equations (GEEs) procedure is organized into three main sections: the Predicted Values Table, the Parameter Estimates Table and the Working Correlation Matrix. 
1. The Predicted Values Table shows the fitted values for the dependent variable on the specified model. 
1. The Parameter Estimates Table includes the estimated coefficients for the independent variables. Each row corresponds to a predictor and includes its coefficient, standard error, confidence interval, test statistic, degrees of freedom, and p-value.
1. The Working Correlation Matrix displays the estimated correlations between repeated measurements of the same subject over time.


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The dataset must include a continuous target variable suitable for modeling with linear regression. It should also contain at least one independent variable, which can be continuous or categorical. In addition, the dataset must include a subject identifier to group repeated observations from the same individual or unit, as well as a within-subject time or measurement indicator to reflect the longitudinal or clustered nature of the data.
<div style="text-align: center;">
<img src="images/GEE/LinearGEE_Input.png" alt="linearGEE-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1. Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting` $$\rightarrow$$ `Generalized Estimating Equations`.
1.	Set the `Type` [1] of regression to Linear.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify `Iterations Between Updates` [4].
1.	Select the `Dependent Variable` [5].
1.	Specify the `Minimum Change in Parameter Estimates` [6].
1.	Specify the `Hessian Convergence` [7].
1.	Specify the `Scale Parameter` [8].
1.	Select the `Within Subject` [9].
1.	Select the `working correlation Structure` and specify the value of `M` if you select M-Dependent as the correlation structure. [10].
1.	Select the method used to estimate the `covariance matrix` [11] of the standard errors.
1.	Select the columns by clicking on the arrow buttons [16] and moving columns between the `Excluded Columns` [12] and `Subjects` [13] and `Factors` [14] and `Covariates `[15] lists.
1. `Specify Reference Levels` [17] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [18].
1.	If the `Custom` option is selected, specify the `Formula` [19] for the analysis.
1.	Click on the `Execute` button [20] to perform the Linear Regression method.
<div style="text-align: center;">
<img src="images/GEE/LinearGEE_Configuration.png" alt="linearGEE-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The Predictions, Parameter Estimates table and Working Correlation Matrix are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GEE/LinearGEE_Output.png" alt="linearGEE-output" width="400" height="300" class="img-responsive">
</div>

#### Negative Binomial 
Use the Negative Binomial Regression method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Estimating Equations |

And then choosing "Negative Binomial" as the `Type`.

##### Input
{: .no_toc }
All variables must be specified in the datasheet. The dependent variable must be a count variable, consisting of non-negative integers, and suitable for modeling with a Negative Binomial distribution. Negative Binomial Regression within the GEE framework is appropriate for overdispersed count data where the variance exceeds the mean, such as the number of events, visits, or occurrences over time. Covariates should be numerical, while categorical predictors can be represented using either text labels or numeric codes. The input datasheet must include at least two columns: one for the dependent variable and one or more for the independent variables (covariates or factors). Each row should correspond to a single observation. Additionally, a subject identifier column is required to define clusters of repeated measurements, and optionally a within-subject variable (e.g., time or measurement occasion) to specify the order of observations within each subject. The structure of the dataset should support modeling intra-subject correlation under the Negative Binomial distribution assumption using an appropriate link function (e.g., log link) within the GEE framework.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**|Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Iterations Between Updates**|Defines how often the working correlation matrix is updated during estimation.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached. |
|**Hessian Convergence**| Specifies a threshold for convergence based on the second derivatives (Hessian matrix). |
|**Scale Parameter**| Adjusts the variance of the model. |
|**Within Subject**| Selects the column that defines the ordering of repeated observations within each subject.|
|**Structure**| Defines the working correlation structure for repeated measurements within subjects. Choices include Independent, Exchangeable, AR(1), Unstructured and M-Dependent.|
|**M**|In the M-Dependent correlation structure, M specifies the maximum number of consecutive observations within each cluster that are assumed to be correlated, with correlations set to zero for observations more than M time points apart. M must be an integer in the range from 1 to (number of within-subject observations – 1).|
|**Covariance Matrix**|In the Covariance Matrix option, the user selects how the model's standard errors will be estimated. The Robust estimator is resistant to misspecification of the correlation structure, while the Model-based estimator assumes the specified correlation is correct.|
|**Subjects/Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to subjects, factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Subjects, Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns. At least one covariate or factor column should be specified. Also, a column for the Subject is required. |
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Generalized Estimating Equations (GEEs) procedure is organized into three main sections: the Predicted Values Table, the Parameter Estimates Table and the Working Correlation Matrix. 
1. The Predicted Values Table shows the fitted values for the dependent variable on the specified model. 
1. The Parameter Estimates Table includes the estimated coefficients for the independent variables. Each row corresponds to a predictor and includes its coefficient, standard error, confidence interval, test statistic, degrees of freedom, and p-value.
1. The Working Correlation Matrix displays the estimated correlations between repeated measurements of the same subject over time


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The dataset must include a count target variable suitable for modeling with negative binomial regression. The dependent variable should consist of non-negative integer values and must exhibit overdispersion, which is a key condition for using the negative binomial distribution. It should also contain at least one independent variable, which can be continuous or categorical. In addition, the dataset must include a subject identifier to group repeated observations from the same individual or unit, as well as a within-subject time or measurement indicator to reflect the longitudinal or clustered nature of the data. The structure of the dataset should allow for the modeling of within-cluster correlation using a log link function under the negative binomial distribution assumption in the GEE framework.
<div style="text-align: center;">
<img src="images/GEE/NegBinGEE_Input.png" alt="negbinGEE-input" width="400" height="300" class="img-responsive">
</div>


###### Configuration
{: .no_toc }
1. Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting` $$\rightarrow$$ `Generalized Estimating Equations`.
1.	Set the `Type` [1] of regression to Negative Binomial.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify `Iterations Between Updates` [4].
1.	Select the `Dependent Variable` [5].
1.	Specify the `Minimum Change in Parameter Estimates` [6].
1.	Specify the `Hessian Convergence` [7].
1.	Specify the `Scale Parameter` [8].
1.	Select the `Within Subject` [9].
1.	Select the `working correlation Structure` and specify the value of `M` if you select M-Dependent as the correlation structure. [10].
1.	Select the method used to estimate the `covariance matrix` [11] of the standard errors.
1.	Select the columns by clicking on the arrow buttons [16] and moving columns between the `Excluded Columns` [12] and `Subjects` [13] and `Factors` [14] and `Covariates `[15] lists.
1. `Specify Reference Levels` [17] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [18].
1.	If the `Custom` option is selected, specify the `Formula` [19] for the analysis.
1.	Click on the `Execute` button [20] to perform the Negative Binomial Regression method.
<div style="text-align: center;">
<img src="images/GEE/NegBinGEE_Configuration.png" alt="negbinGEE-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The Predictions, Parameter Estimates table and Working Correlation Matrix are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GEE/NegBinGEE_Output.png" alt="negbinGEE-output" width="400" height="300" class="img-responsive">
</div>


#### Poisson 
Use the Poisson Regression method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Estimating Equations |

And then choosing "Poisson" as the `Type`.

##### Input
{: .no_toc }
count variable, consisting of non-negative integer values and suitable for modeling with a Poisson distribution, as Poisson Regression within the GEE framework is used for modeling count data such as number of events, visits, or occurrences over time. Covariates should be numerical, while categorical predictors can be represented using either text labels or numeric codes. The input datasheet must include at least two columns: one for the dependent variable and one or more for the independent variables (covariates or factors). Each row should correspond to a single observation. Additionally, a subject identifier column is required to define clusters of repeated measurements, and optionally a within-subject variable to specify the order of observations within each subject. The structure of the dataset should support modeling intra-subject correlation under the Poisson distribution assumption using an appropriate link function (e.g., log link) within the GEE framework.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**|Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Iterations Between Updates**|Defines how often the working correlation matrix is updated during estimation.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached. |
|**Hessian Convergence**| Specifies a threshold for convergence based on the second derivatives (Hessian matrix). |
|**Scale Parameter**| Adjusts the variance of the model. |
|**Within Subject**| Selects the column that defines the ordering of repeated observations within each subject.|
|**Structure**| Defines the working correlation structure for repeated measurements within subjects. Choices include Independent, Exchangeable, AR(1), Unstructured and M-Dependent.|
|**M**|In the M-Dependent correlation structure, M specifies the maximum number of consecutive observations within each cluster that are assumed to be correlated, with correlations set to zero for observations more than M time points apart. M must be an integer in the range from 1 to (number of within-subject observations – 1).|
|**Covariance Matrix**|In the Covariance Matrix option, the user selects how the model's standard errors will be estimated. The Robust estimator is resistant to misspecification of the correlation structure, while the Model-based estimator assumes the specified correlation is correct.|
|**Subjects/Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to subjects, factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Subjects, Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns. At least one covariate or factor column should be specified. Also, a column for the Subject is required. |
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Generalized Estimating Equations (GEEs) procedure is organized into three main sections: the Predicted Values Table, the Parameter Estimates Table and the Working Correlation Matrix. 
1. The Predicted Values Table shows the fitted values for the dependent variable on the specified model. 
1. The Parameter Estimates Table includes the estimated coefficients for the independent variables. Each row corresponds to a predictor and includes its coefficient, standard error, confidence interval, test statistic, degrees of freedom, and p-value.
1. The Working Correlation Matrix displays the estimated correlations between repeated measurements of the same subject over time


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The dataset must include a count outcome variable with non-negative integers suitable for Poisson regression. It should also include at least one independent variable (continuous or categorical), a subject identifier to group repeated measures, and a within-subject time or measurement variable to indicate observation order. The data structure should support modeling within-cluster correlation using a log link under the Poisson distribution in the GEE framework.
<div style="text-align: center;">
<img src="images/GEE/PoissonGEE_Input.png" alt="poissonGEE-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1. Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting` $$\rightarrow$$ `Generalized Estimating Equations`.
1.	Set the `Type` [1] of regression to Poisson.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify `Iterations Between Updates` [4].
1.	Select the `Dependent Variable` [5].
1.	Specify the `Minimum Change in Parameter Estimates` [6].
1.	Specify the `Hessian Convergence` [7].
1.	Specify the `Scale Parameter` [8].
1.	Select the `Within Subject` [9].
1.	Select the `working correlation Structure` and specify the value of `M` if you select M-Dependent as the correlation structure. [10].
1.	Select the method used to estimate the `covariance matrix` [11] of the standard errors.
1.	Select the columns by clicking on the arrow buttons [16] and moving columns between the `Excluded Columns` [12] and `Subjects` [13] and `Factors` [14] and `Covariates `[15] lists.
1. `Specify Reference Levels` [17] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [18].
1.	If the `Custom` option is selected, specify the `Formula` [19] for the analysis.
1.	Click on the `Execute` button [20] to perform the Poisson Regression method.
<div style="text-align: center;">
<img src="images/GEE/PoissonGEE_Configuration.png" alt="poissonGEE-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The Predictions, Parameter Estimates table and Working Correlation Matrix are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GEE/PoissonGEE_Output.png" alt="poissonGEE-output" width="400" height="300" class="img-responsive">
</div>

#### Gamma 
Use the Gamma Regression method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Estimating Equations |

And then choosing "Gamma" as the `Type`.

##### Input
{: .no_toc }
All variables must be specified in the datasheet. The dependent variable must be continuous, strictly positive, and suitable for modeling with a Gamma distribution, as Gamma Regression within the GEE framework is used for positively skewed outcomes such as cost, time, or rates. Covariates should be numerical, while categorical predictors can be represented using either text labels or numeric codes. The input datasheet must include at least two columns: one for the dependent variable and one or more for the independent variables (covariates or factors). Each row should correspond to a single observation. Additionally, a subject identifier column is required to define clusters of repeated measurements, and optionally a within-subject variable to specify the order of observations within each subject. The structure of the dataset should support modeling intra-subject correlation under the Gamma distribution assumption using an appropriate link function (e.g., log link) within the GEE framework.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**|Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Iterations Between Updates**|Defines how often the working correlation matrix is updated during estimation.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached. |
|**Hessian Convergence**| Specifies a threshold for convergence based on the second derivatives (Hessian matrix). |
|**Scale Parameter**| Adjusts the variance of the model. |
|**Within Subject**| Selects the column that defines the ordering of repeated observations within each subject.|
|**Structure**| Defines the working correlation structure for repeated measurements within subjects. Choices include Independent, Exchangeable, AR(1), Unstructured and M-Dependent.|
|**M**|In the M-Dependent correlation structure, M specifies the maximum number of consecutive observations within each cluster that are assumed to be correlated, with correlations set to zero for observations more than M time points apart. M must be an integer in the range from 1 to (number of within-subject observations – 1).|
|**Covariance Matrix**|In the Covariance Matrix option, the user selects how the model's standard errors will be estimated. The Robust estimator is resistant to misspecification of the correlation structure, while the Model-based estimator assumes the specified correlation is correct.|
|**Subjects/Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to subjects, factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Subjects, Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns. At least one covariate or factor column should be specified. Also, a column for the Subject is required. |
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Generalized Estimating Equations (GEEs) procedure is organized into three main sections: the Predicted Values Table, the Parameter Estimates Table and the Working Correlation Matrix. 
1. The Predicted Values Table shows the fitted values for the dependent variable on the specified model. 
1. The Parameter Estimates Table includes the estimated coefficients for the independent variables. Each row corresponds to a predictor and includes its coefficient, standard error, confidence interval, test statistic, degrees of freedom, and p-value.
1. The Working Correlation Matrix displays the estimated correlations between repeated measurements of the same subject over time.


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The dataset must include a positive continuous target variable suitable for modeling with Gamma regression. The outcome should be strictly positive and continuous, reflecting a right-skewed distribution typical of Gamma-distributed data. It should also contain at least one independent variable, which can be continuous or categorical. In addition, the dataset must include a subject identifier to group repeated observations from the same individual or unit, as well as a within-subject time or measurement indicator to reflect the longitudinal or clustered nature of the data. The structure of the dataset should allow for the modeling of within-cluster correlation using a log link function in the GEE framework.
<div style="text-align: center;">
<img src="images/GEE/GammaGEE_Input.png" alt="gammaGEE-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1. Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting` $$\rightarrow$$ `Generalized Estimating Equations`.
1.	Set the `Type` [1] of regression to Gamma.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify `Iterations Between Updates` [4].
1.	Select the `Dependent Variable` [5].
1.	Specify the `Minimum Change in Parameter Estimates` [6].
1.	Specify the `Hessian Convergence` [7].
1.	Specify the `Scale Parameter` [8].
1.	Select the `Within Subject` [9].
1.	Select the `working correlation Structure` and specify the value of `M` if you select M-Dependent as the correlation structure. [10].
1.	Select the method used to estimate the `covariance matrix` [11] of the standard errors.
1.	Select the columns by clicking on the arrow buttons [16] and moving columns between the `Excluded Columns` [12] and `Subjects` [13] and `Factors` [14] and `Covariates `[15] lists.
1. `Specify Reference Levels` [17] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [18].
1.	If the `Custom` option is selected, specify the `Formula` [19] for the analysis.
1.	Click on the `Execute` button [20] to perform the Gamma Regression method.
<div style="text-align: center;">
<img src="images/GEE/GammaGEE_Configuration.png" alt="gammaGEE-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The Predictions, Parameter Estimates table and Working Correlation Matrix are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GEE/GammaGEE_Output.png" alt="gammaGEE-output" width="400" height="300" class="img-responsive">
</div>

#### Tweedie with Identity Link
Use the Tweedie Regression method with identity link by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Estimating Equations |

And then choosing "Tweedie with Identity Link" as the `Type`.

##### Input
{: .no_toc }
The dataset must be appropriately structured to support Tweedie regression with an identity link function within the framework of Generalized Estimating Equations (GEE). The dependent variable should be continuous and non-negative, and exhibit characteristics suitable for modeling with the Tweedie distribution, which is particularly well-suited to semicontinuous outcomes that contain a point mass at zero and positive continuous values. Such outcomes commonly arise in fields such as actuarial science, health economics, and environmental studies, where responses like claim amounts, medical costs, or precipitation levels often exhibit a 
The dataset must include at least the following components: a dependent variable, one or more independent variables (which may be numerical or categorical, with categorical variables represented as text labels or numeric codes), a subject identifier column to define clusters of repeated observations from the same unit or individual, and optionally, a within-subject measurement indicator to capture the temporal or sequential structure of the observations within each cluster.
Each row in the dataset must correspond to a single observation. The data structure must support the estimation of within-cluster correlation using GEE under the Tweedie distribution with an identity link, which enables modeling of repeated or correlated data where the response variable reflects non-negative semicontinuous behavior, and where a direct, untransformed relationship between the predictors and the mean of the response is appropriate.


##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**|Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Iterations Between Updates**|Defines how often the working correlation matrix is updated during estimation.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached. |
|**Hessian Convergence**| Specifies a threshold for convergence based on the second derivatives (Hessian matrix). |
|**Scale Parameter**| Adjusts the variance of the model. |
|**Within Subject**| Selects the column that defines the ordering of repeated observations within each subject.|
|**Structure**| Defines the working correlation structure for repeated measurements within subjects. Choices include Independent, Exchangeable, AR(1), Unstructured and M-Dependent.|
|**M**|In the M-Dependent correlation structure, M specifies the maximum number of consecutive observations within each cluster that are assumed to be correlated, with correlations set to zero for observations more than M time points apart. M must be an integer in the range from 1 to (number of within-subject observations – 1).|
|**Covariance Matrix**|In the Covariance Matrix option, the user selects how the model's standard errors will be estimated. The Robust estimator is resistant to misspecification of the correlation structure, while the Model-based estimator assumes the specified correlation is correct.|
|**Subjects/Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to subjects, factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Subjects, Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns. At least one covariate or factor column should be specified. Also, a column for the Subject is required. |
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Generalized Estimating Equations (GEEs) procedure is organized into three main sections: the Predicted Values Table, the Parameter Estimates Table and the Working Correlation Matrix. 
1. The Predicted Values Table shows the fitted values for the dependent variable on the specified model. 
1. The Parameter Estimates Table includes the estimated coefficients for the independent variables. Each row corresponds to a predictor and includes its coefficient, standard error, confidence interval, test statistic, degrees of freedom, and p-value.
1. The Working Correlation Matrix displays the estimated correlations between repeated measurements of the same subject over time.


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The dataset must include a continuous, non-negative outcome variable suitable for Tweedie regression with an identity link function. The dependent variable should reflect semicontinuous data with a mass at zero and positive continuous values, as commonly observed in applications such as insurance claims, healthcare expenditures, or environmental measures. The dataset should also include at least one independent variable, which may be continuous or categorical, a subject identifier to define clusters of repeated measurements from the same individual or unit, and a within-subject time or measurement variable to indicate the order of observations within each subject. The data structure should support the modeling of within-cluster correlation using an identity link under the Tweedie distribution in the GEE framework, allowing for a direct linear relationship between the covariates and the expected value of the outcome.
<div style="text-align: center;">
<img src="images/GEE/TweedieIdentityGEE_Input.png" alt="tweedieidentityGEE-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1. Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting` $$\rightarrow$$ `Generalized Estimating Equations`.
1.	Set the `Type` [1] of regression to Tweedie with Identity Link.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify `Iterations Between Updates` [4].
1.	Select the `Dependent Variable` [5].
1.	Specify the `Minimum Change in Parameter Estimates` [6].
1.	Specify the `Hessian Convergence` [7].
1.	Specify the `Scale Parameter` [8].
1.	Select the `Within Subject` [9].
1.	Select the `working correlation Structure` and specify the value of `M` if you select M-Dependent as the correlation structure. [10].
1.	Select the method used to estimate the `covariance matrix` [11] of the standard errors.
1.	Select the columns by clicking on the arrow buttons [16] and moving columns between the `Excluded Columns` [12] and `Subjects` [13] and `Factors` [14] and `Covariates `[15] lists.
1. `Specify Reference Levels` [17] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [18].
1.	If the `Custom` option is selected, specify the `Formula` [19] for the analysis.
1.	Click on the `Execute` button [20] to perform the Tweedie Regression with Identity Link method.
<div style="text-align: center;">
<img src="images/GEE/TweedieIdentityGEE_Configuration.png" alt="tweedieidentityGEE-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The Predictions, Parameter Estimates table and Working Correlation Matrix are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GEE/TweedieIdentityGEE_Output.png" alt="tweedieidentityGEE-output" width="400" height="300" class="img-responsive">
</div>

#### Tweedie with Log Link
Use the Tweedie Regression with Log Link method by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Regression $$\rightarrow$$ Statistical fitting $$\rightarrow$$ Generalized Estimating Equations |

And then choosing "Tweedie with Log Link" as the `Type`.

##### Input
{: .no_toc }
All variables must be specified in the datasheet. The dataset must be appropriately structured to support the application of Tweedie regression with a log link function within the Generalized Estimating Equations (GEE) framework. The dependent variable should be continuous, non-negative, and exhibit characteristics consistent with the Tweedie distribution, which is particularly suitable for semicontinuous outcomes that contain a point mass at zero alongside positive continuous values. Common examples of such data include insurance claim amounts, healthcare expenditures, and rainfall measurements.
The dataset must include, at minimum, the following columns: a dependent variable, one or more independent variables, which may be numeric or categorical (categorical predictors can be represented either by text labels or numeric codes), and a subject identifier that defines clusters of subject measurement indicator, representing the order or timing of observations within each cluster.
Each row of the dataset should correspond to single observation. The overall structure must support the modeling of within-cluster correlation under the Tweedie distribution assumption with a log link, enabling the analysis of longitudinal or clustered data where the response variable combines features of both count and continuous distributions-such as zero inflation and positive skewness commonly observed in real world outcomes.

##### Configuration
{: .no_toc }

|**Confidence Level (%)**| Specify the confidence level of the analysis. Values should range from 0 to 100 and correspond to percentages. |
|**Max Iterations**|Defines the maximum number of iterations the model is allowed to perform during the estimation process. If the model fails to converge before reaching this number, the algorithm stops and returns the values of the last iteration.|
|**Iterations Between Updates**|Defines how often the working correlation matrix is updated during estimation.|
|**Dependent Variable**| Select the column that corresponds to values of the dependent variable. |
|**Minimum Change in Parameter Estimates**| Sets the tolerance level for convergence — the smallest change in parameter estimates between iterations required to continue optimization. If the change in all parameters is below this value, the algorithm assumes convergence has been reached. |
|**Hessian Convergence**| Specifies a threshold for convergence based on the second derivatives (Hessian matrix). |
|**Scale Parameter**| Adjusts the variance of the model. |
|**Within Subject**| Selects the column that defines the ordering of repeated observations within each subject.|
|**Structure**| Defines the working correlation structure for repeated measurements within subjects. Choices include Independent, Exchangeable, AR(1), Unstructured and M-Dependent.|
|**M**|In the M-Dependent correlation structure, M specifies the maximum number of consecutive observations within each cluster that are assumed to be correlated, with correlations set to zero for observations more than M time points apart. M must be an integer in the range from 1 to (number of within-subject observations – 1).|
|**Covariance Matrix**|In the Covariance Matrix option, the user selects how the model's standard errors will be estimated. The Robust estimator is resistant to misspecification of the correlation structure, while the Model-based estimator assumes the specified correlation is correct.|
|**Subjects/Factors/Covariates/Excluded Columns**| Select manually the columns that correspond to subjects, factors and the columns that correspond to covariates through the dialog window: Use the buttons to move columns between the Subjects, Factors and Covariates list and Excluded Columns list. Single-arrow buttons will move all selected columns. At least one covariate or factor column should be specified. Also, a column for the Subject is required. |
|**Specify Reference Levels**| Specify the reference level for each of the categorical factors specified. The default option for each factor is its last level. |
|**Custom/Include All Main Effects/Full Factorial**| These options refer to the terms that will be included in the model. The Custom option allows the user to input a formula defining the exact terms to be included. The Include All Main Effects option allows the analysis of a model that only includes all main effects and finally, the Full Factorial option includes both all main effects and all possible interaction terms to build a full model. Note that the Include All Main Effects and Full Factorial options do not allow the use of a formula.|
|**Formula**| Specify the model formula used for the analysis if the Custom option is selected. Include all variables listed under Factors or Covariates, separated by “+”. To include interaction terms, use the format VariableA:VariableB. If interaction terms are included, the dataset must contain all combinations of the levels of the involved categorical variables — i.e., the design must be fully crossed — to ensure the model can be properly estimated.|

##### Output
{: .no_toc }
The output of the Generalized Estimating Equations (GEEs) procedure is organized into three main sections: the Predicted Values Table, the Parameter Estimates Table and the Working Correlation Matrix. 
1. The Predicted Values Table shows the fitted values for the dependent variable on the specified model. 
1. The Parameter Estimates Table includes the estimated coefficients for the independent variables. Each row corresponds to a predictor and includes its coefficient, standard error, confidence interval, test statistic, degrees of freedom, and p-value.
1. The Working Correlation Matrix displays the estimated correlations between repeated measurements of the same subject over time.


##### Example
{: .no_toc }

###### Input
{: .no_toc }
The dataset must include a non-negative, continuous outcome variable suitable for Tweedie regression with a log link. The dependent variable should reflect semicontinuous data with a mass at zero and positive continuous values, as seen in insurance claims, healthcare costs, or rainfall. It must also contain at least one independent variable (continuous or categorical), a subject identifier to define clusters of repeated measures, and a within-subject measurement variable to indicate the order of observations. The dataset structure should support within-cluster correlation modeling using a log link under the Tweedie distribution in the GEE framework, allowing for a multiplicative relationship between predictors and the expected outcome.
<div style="text-align: center;">
<img src="images/GEE/TweedieLogGEE_Input.png" alt="tweedielogGEE-input" width="400" height="300" class="img-responsive">
</div>

###### Configuration
{: .no_toc }
1. Select `Analytics` $$\rightarrow$$ `Regression` $$\rightarrow$$ `Statistical fitting` $$\rightarrow$$ `Generalized Estimating Equations`.
1.	Set the `Type` [1] of regression to Tweedie with Log Link.
1.	Specify the `Confidence Level (%)` [2] for the test.
1.	Specify `Max Iterations` [3].
1.	Specify `Iterations Between Updates` [4].
1.	Select the `Dependent Variable` [5].
1.	Specify the `Minimum Change in Parameter Estimates` [6].
1.	Specify the `Hessian Convergence` [7].
1.	Specify the `Scale Parameter` [8].
1.	Select the `Within Subject` [9].
1.	Select the `working correlation Structure` and specify the value of `M` if you select M-Dependent as the correlation structure. [10].
1.	Select the method used to estimate the `covariance matrix` [11] of the standard errors.
1.	Select the columns by clicking on the arrow buttons [16] and moving columns between the `Excluded Columns` [12] and `Subjects` [13] and `Factors` [14] and `Covariates `[15] lists.
1. `Specify Reference Levels` [17] for the categorical factors.
1.	Select your preferred option to define the model you want to analyze [18].
1.	If the `Custom` option is selected, specify the `Formula` [19] for the analysis.
1.	Click on the `Execute` button [20] to perform the Tweedie Regression with Log Link method.
<div style="text-align: center;">
<img src="images/GEE/TweedieLogGEE_Configuration.png" alt="tweedielogGEE-config" width="400" height="300" class="img-responsive">
</div>

###### Output
{: .no_toc }
The Predictions, Parameter Estimates table and Working Correlation Matrix are shown in the output spreadsheet.
<div style="text-align: center;">
<img src="images/GEE/TweedieLogGEE_Output.png" alt="tweedielogGEE-output" width="400" height="300" class="img-responsive">
</div>
---

## Tips

k Nearest neighbors:
*   It works more efficiently for small to medium datasets and low-dimensional data. kNN is sensitive to missing data.
*   The performance of the model is highly influenced by the selection of _k_.

Radial Basis Function Network:
*   The number of neurons in the hidden layer has a high impact on the model performance, since a large number of neurons can lead to overfitting.

Linear SGD:
*   It is effective in large datasets and can handle high-dimensional feature spaces. Higher learning rates may be required when Huber loss is selected, because it is less sensitive to outliers.
*   Consider scaling the input data with a [`Z score`](https://www.docs.isalos.novamechanics.com/normalizers.html) normalizer to center them to mean and have a unit standard deviation.

XGBoost:
*   Be cautious during hyperparameter tuning: Choosing smaller `eta` values, as well as increasing the `lambda`, `alpha` and `gamma` values result in a more conservative boosting process. Increasing the value of `max depth` parameter makes the model more complex, more likely to overfit.

Random Forest:
*   This algorithm performs well with datasets that contain missing values. However, it is not as efficient with a large number of sparse features or with categorical variables of many levels that are improperly encoded.

## See also 

The model generated by either the `k Nearest Neighbors (kNN)`, `Fully Connected Neural Network`, `Radial Basis Function Network`, `Linear SGD`, `XGBoost` or `Random Forest` algorithms can be applied to any input data through the [`Existing Model Utilization`](https://www.docs.isalos.novamechanics.com/existing-model-utilization.html) function (e.g., a regression algorithm trained from the training set data of a machine learning model can be applied to the test/external set data).


## References {#references-regression}
1.	Witten Ian H and Frank, Eibe and Hall, Mark A and Pal CJ. Data Mining: Practical Machine Learning Tools and Techniques. Fourth. Morgan Kaufmann; 2011. [https://doi.org/10.1016/C2009-0-19715-5](https://doi.org/10.1016/C2009-0-19715-5).
1. 	Murphy KP. Machine Learning: A Probabilistic Perspective. The MIT Press; 2012. [10.5555/2380985](https://dl.acm.org/doi/book/10.5555/2380985).
1.	Lee C-C, Chung P-C, Tsai J-R, Chang C-I. Robust radial basis function neural networks. IEEE Transactions on Systems, Man, and Cybernetics, Part B (Cybernetics) 1999;29:674–85. [https://doi.org/10.1109/3477.809023](https://doi.org/10.1109/3477.809023). 
1.	Ghosh J, Nag A. An Overview of Radial Basis Function Networks. In: Howlett RJ, Jain LC, editors. Radial Basis Function Networks 2: New Advances in Design, Heidelberg: Physica-Verlag HD; 2001, p. 1–36. [https://doi.org/10.1007/978-3-7908-1826-0_1](https://doi.org/10.1007/978-3-7908-1826-0_1).
1.	Bottou L. Large-Scale Machine Learning with Stochastic Gradient Descent. In: Lechevallier Y, Saporta G, editors. Proceedings of COMPSTAT’2010, Heidelberg: Physica-Verlag HD; 2010, p. 177–86. [https://doi.org/10.1007/978-3-7908-2604-3_16](https://doi.org/10.1007/978-3-7908-2604-3_16).
1.	XGBoost Parameters — xgboost 2.1.0-dev documentation n.d. [https://xgboost.readthedocs.io/en/latest/parameter.html](https://xgboost.readthedocs.io/en/latest/parameter.html) (accessed June 3, 2024). 
1.	Hastie T, Tibshirani R, Friedman J. The Elements of Statistical Learning. New York, NY: Springer New York; 2009. [https://doi.org/10.1007/978-0-387-84858-7](https://doi.org/10.1007/978-0-387-84858-7).
1.	Chen T, Guestrin C. XGBoost: A Scalable Tree Boosting System. Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, 2016, p. 785–94. [https://doi.org/10.1145/2939672.2939785](https://doi.org/10.1145/2939672.2939785).
1.	Breiman L. Random Forests. Machine Learning 2001;45:5–32. [https://doi.org/10.1023/A:1010933404324](https://doi.org/10.1023/A:1010933404324).
1. Nelder JA, Wedderburn RWM. Generalized linear models. J R Stat Soc A. 1972;135(3):370-84.[https://doi.org/10.2307/2344614](https://doi.org/10.2307/2344614).
1. McCullagh P, Nelder JA. Generalized linear models. 2nd ed. London: Chapman & Hall/CRC; 1989. [https://doi.org/10.1201/9780203753736](https://doi.org/10.1201/9780203753736).
1. McCullagh P. Regression models for ordinal data. J R Stat Soc B. 1980;42(2):109-42. [https://doi.org/10.1111/j.2517-6161.1980.tb01109.x](https://doi.org/10.1111/j.2517-6161.1980.tb01109.x).
1. Liang KY, Zeger SL. Longitudinal data analysis using generalized linear models. Biometrika. 1986;73(1):13-22. [https://doi.org/10.1093/biomet/73.1.13](https://doi.org/10.1093/biomet/73.1.13).

---

## Version History
Introduced in Isalos Analytics Platform v0.1.18

_Instructions last updated on May 2025_

