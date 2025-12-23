---
layout: default
title: 4.5 Existing Model Utilization
parent: 4. Analytics
nav_order: 5
permalink: /existing-model-utilization.html
---

# Existing Model Utilization
{: .no_toc }
This function treats or transforms the input data according to the parameters of an existing model (typically a normalization, a regression, a classification, a clustering model or an applicability domain model). The applied mathematical transformation is applied to all columns in the input data that are contained in the existing model. This model is either generated within the project or imported from the user’s Isalos models library.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Use the `Existing Model Utilization` function by browsing in the top ribbon: 

| Analytics $$\rightarrow$$ Existing Model Utilization |

### Input
{: .no_toc }
Data matrix with arbitrary data.

### Configuration
{: .no_toc }

|**Model**| Select the model to be applied to the input data from the dropdown list. If the model is developed within the same project, the name of the corresponding tab will be displayed as: `(from Tab:) Name of the tab`. |
|**Type**| (Automatically detected) The type of model. |
|**Description**| (Automatically detected) The model description provided by the user when saving a model using the `Import Model from` function. |
|**Model Input**| (Automatically detected) The list of columns to which the model will be applied. |

### Output
{: .no_toc }

Data matrix with processed data according to the applied model parameters.

### Example
{: .no_toc }

##### Input
{: .no_toc }
In the left-hand spreadsheet of the tab insert the data matrix to be transformed. In this case, the test set data is going to be normalized according to a normalization model developed under the same project.

<div style="text-align: center;">
<img src="images/Existing model utilization/existing_input.png" alt="Existing Model input" width="400" height="300" class="img-responsive">
</div>

##### Configuration
{: .no_toc }

1. Select `Analytics` $$\rightarrow$$ `Existing Model Utilization`.
1. Select from the dropdown list [1] the `Model` of interest.

<div style="text-align: center;">
<img src="images/Existing model utilization/Existing Model Utilization - configuration 1.png" alt="Existing Model configuration" width="400" height="300" class="img-responsive">
</div>

{:style="counter-reset:none"}
1. The model details will be presented automatically in `Type` [2], `Description` [3] and `Model Input` [4] fields.
1. Click on the `Execute` button [5] to apply the selected model on the input data.

<div style="text-align: center;">
<img src="images/Existing model utilization/Existing Model Utilization - configuration 2.png" alt="Existing Model configuration" width="400" height="300" class="img-responsive">
</div>

##### Output
{: .no_toc }
In the right-hand spreadsheet of the tab the output data matrix with the normalized columns is presented.

<div style="text-align: center;">
<img src="images/Existing model utilization/existing_output.png" alt="Existing Model output" width="400" height="300" class="img-responsive">
</div>

---

## Tips

The `Existing Model Utilization` function is useful in cases when test/external data shall be transformed the same as way as training data has been processed, or when predictions shall be generated for a dataset using an already developed machine learning model.

## See also
Different types of models can be applied on data including [`Normalizers`](https://www.docs.isalos.novamechanics.com/normalizers.html), [`Regression`](https://www.docs.isalos.novamechanics.com/regression.html), [`Classification`](https://www.docs.isalos.novamechanics.com/classification.html) and [`Clustering`](https://www.docs.isalos.novamechanics.com/clustering.html) models, and the applicability [`Domain – APD limits`](https://www.docs.isalos.novamechanics.com/domain-apd.html).

For model import from a library of existing models refer to [`Import Model from`](https://www.docs.isalos.novamechanics.com/save_import.html#importing-projectsmodels) and [`Export Model from`](https://www.docs.isalos.novamechanics.com/save_import.html#exporting-models) options.
---

## Version History
Introduced in Isalos Analytics Platform v0.1.18

_Instructions last updated on May 2024_