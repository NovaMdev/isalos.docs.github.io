---
layout: default
title: 2.2 Data Representation
parent: 2. Getting Started
nav_order: 2
permalink: /data-representation.html
---

# Data Representation
{: .no_toc }
Isalos enables you to manipulate your data using the well-known spreadsheet environment. In the spreadsheets data are represented as tables of instances: in the columns the values of the different variables-features are included, and each row contains an instance-example which is characterized by the values of the different features. The core concept in the operation of Isalos is that each tab acts like a node, where data are imported and exported in a tabular format, following processing and transformation using specific functions.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---
In practice, each tab consists of an input spreadsheet (left-hand) [1] from which data are imported to the function-node [2] and an output spreadsheet (right-hand) [3] where results are presented. The output spreadsheet of the tab can be imported to the next tab [4] and eventually it is possible to build predictive models through a series of spreadsheets that comprise a workflow [5] of well-defined steps<sup>[1](#references-data-representation)</sup>. The main Isalos functionalities are available through the top ribbon of the user interface: [`Data Transformation`](https://www.docs.isalos.novamechanics.com/data-transformation.html) [6], [`Analytics`](https://www.docs.isalos.novamechanics.com/analytics.html) [7], [`Statistics`](https://www.docs.isalos.novamechanics.com/statistics.html) [8], and [`Plot`](https://www.docs.isalos.novamechanics.com/plot_bi.html) [9].  

<div style="text-align: center;">
<img src="images/Data representation/GUI.svg" alt="GUI" width="800" class="img-responsive">
</div>

## Data Input
{: .no_toc }
You can import your data to Isalos from an existing file, an existing spreadsheet within the current project, or by manually entering the data values.

### Import from file
{: .no_toc }
To import data into a new tab, right-click on the spreadsheet located on the left-hand side and select `Import from file` [1]. Then, choose the directory containing your data file and select the file you wish to upload [2]. Accepted formats include CSV, XLSX, and XLS.

<div style="text-align: center;">
<img src="images/Data representation/import-from-file.svg" alt="import-from-file" width="500" class="img-responsive">
</div>

<div style="text-align: center;">
<img src="images/Data representation/import-from-file1.svg" alt="import-from-file1" width="600" class="img-responsive">
</div>

In the pop-up window select if the first row contains column name headers and if the first column contains row IDs by selecting the boxes `User Header` and  `User Row ID`, respectively [3]. In case that an XLSX or a XLS file is imported, select the sheet from which data are imported from the `Select Sheet dropdown` list [4]. From the `Select Separator` dropdown list [5] select the character string delimiting columns between semicolon (`;`) and comma (`,`). Click on the `Execute` button [6] to complete the data import.

<div style="text-align: center;">
<img src="images/Data representation/import-from-file2.svg" alt="import-from-file2" width="400" class="img-responsive">
</div>

### Import from spreadsheet {#import-from-spreadsheet}
{: .no_toc }
To import data from an existing spreadsheet, right-click on the spreadsheet located on the left-hand side and select `Import from SpreadSheet` [1]. Then, choose from the `Select input tab` dropdown list the name of the tab from which data are going to be read and imported [2]. Please note that data cannot be imported from the spreadsheet of the first tab of the workflow.

<div style="text-align: center;">
<img src="images/Data representation/import-from-spreadsheet.svg" alt="import-from-spreadsheet" width="600" class="img-responsive">
</div>

### Manual import
{: .no_toc }
Alternatively, you can directly insert your data by manually typing the values on the left-hand side spreadsheet. It is also possible to copy and paste your data to the input spreadsheet from an external file.

### Export spreadsheet data
{: .no_toc }
You can export the processed data and the results at any stage of the analysis workflow by right-clicking on any of the two input and output spreadsheets and selecting `Export SpreadSheet` data [1]. 

<div style="text-align: center;">
<img src="images/Data representation/export-spreadsheet.svg" alt="export-from-spreadsheet" width="800" class="img-responsive">
</div>

In the `File Preferences` window select the `File Extension` between the XLSX and CSV [2] and check the boxes of `User Header` and `User Row ID` [3] if you wish to save the column and row names respectively. In case that the XLSX extension is selected, select also if the input or output spreadsheet (depending on your initial selection of spreadsheet) is also going to be exported in the file, by clicking on the `Include Input Sheet` (or `Include Output Sheet`) [4]. In this case, the input and output spreadsheets are going to be saved as different sheets in your XLSX file [5]. In case that the CSV extension is selected, click on the `Select Separator` dropdown menu [6], and select the the character string delimiting columns between semicolon (`;`) and comma (`,`). 

<div style="text-align: center;">
<img src="images/Data representation/file-preferences.svg" alt="file-preferences" width="650" class="img-responsive">
</div>

<div style="text-align: center;">
<img src="images/Data representation/exported-xlsx.svg" alt="exported-xlsx" width="300" class="img-responsive">
</div>

Click on the `Execute` button [7] and type the name of the file and select the folder where it is going to be saved [8] and click on the `Save` button to complete the export process.

<div style="text-align: center;">
<img src="images/Data representation/select-folder.svg" alt="select-folder" width="450" class="img-responsive">
</div>

### Clear spreadsheet
{: .no_toc }
By right-clicking on any spreadsheet and by selecting `Clear SpreadSheet`, its data is removed.

## Workflow Development
{: .no_toc }
In Isalos each tab acts like a node, where data are imported (through the left-hand spreadsheet), processed (using one of the available functions), and exported (through the right-hand spreadsheet). In each tab a specific function is applied on the data so, to develop a complete analysis workflow, you should add more tabs and allow data flow between input and output spreadsheets. 

### Insert new tabs
{: .no_toc }
When you open an empty Isalos project, a single tab named `Action` is displayed [1]. You can rename this tab by right clicking on the name of the tab and selecting `Rename` [2]. In the presented configuration window, type the new name of the tab [3] and click on `OK` button [4]. You can follow this process whenever you wish to rename an existing tab. 

<div style="text-align: center;">
<img src="images/Data representation/rename-tab.svg" alt="rename-tab" width="550" class="img-responsive">
</div>

By clicking on the `+` symbol next to the name of the last tab [5], you can insert a new tab-node to your analysis workflow. In the configuration window, type the name of the tab [6] and click on `OK` button [7]. An empty tab is created, ready for data input and analysis. 

<div style="text-align: center;">
<img src="images/Data representation/add-new-tab.svg" alt="add-new-tab" width="250" class="img-responsive">
</div>

Right-clicking on any tab and selecting `Delete` will remove the tab [8]. This action is irreversible.

<div style="text-align: center;">
<img src="images/Data representation/delete-tab.svg" alt="delete-tab" width="300" class="img-responsive">
</div>

### Workflow representation
{: .no_toc }
Each tab functions as a node in the data analysis workflow. These nodes are represented in the workflow outline area at the top of the interface [1]. When a new tab is added, a corresponding node is automatically created in the workflow outline [2]. As the analysis progresses and data flows between tabs (see [Import from spreadsheet](#import-from-spreadsheet)), the nodes are automatically connected, forming a fully integrated workflow [3]. Clicking on a specific node switches the interface to the related tab.

<div style="text-align: center;">
<img src="images/Data representation/workflow.svg" alt="workflow" width="600" class="img-responsive">
</div>

## Tips
* You can periodically save the intermediate results of your data analysis or modelling using the [`Export SpreadSheet`](https://www.docs.isalos.novamechanics.com/save_import.html#exporting-data) data option, for further analysis or study of the effects of each workflow step. This is particularly useful for debugging purposes.
* To have an overview of the analysis through the workflow outline, as the analysis progresses choose to import your data using the [`Import from SpreadSheet`](https://www.docs.isalos.novamechanics.com/data-representation.html#import-from-spreadsheet) option rather than copying and pasting data between tabs.


## References {#references-data-representation}
1. Varsou D-D, Tsoumanis A, Papadiamantis AG, Melagraki G, Afantitis A. Isalos Predictive Analytics Platform: Cheminformatics, Nanoinformatics, and Data Mining Applications. Springer International Publishing; 2023. [doi.org/10.1007/978-3-031-20730-3_9](https://doi.org/10.1007/978-3-031-20730-3_9).

---

## Version History
Introduced in Isalos Analytics Platform v0.1.18

_Instructions last updated on May 2024_

<!--
View this site's [\_config.yml](https://github.com/just-the-docs/just-the-docs/tree/main/_config.yml) file as an example.

## Site logo (*)

```yaml
# Set a path/url to a logo that will be displayed instead of the title
logo: "/assets/images/just-the-docs.png"
```

## Site favicon (*)

```yaml
# Set a path/url to a favicon that will be displayed by the browser
favicon_ico: "/assets/images/favicon.ico"
```

If the path to your favicon is `/favicon.ico`, you can leave `favicon_ico` unset.

## Search (*)

```yaml
# Enable or disable the site search
# Supports true (default) or false
search_enabled: true

search:
  # Split pages into sections that can be searched individually
  # Supports 1 - 6, default: 2
  heading_level: 2
  # Maximum amount of previews per search result
  # Default: 3
  previews: 3
  # Maximum amount of words to display before a matched word in the preview
  # Default: 5
  preview_words_before: 5
  # Maximum amount of words to display after a matched word in the preview
  # Default: 10
  preview_words_after: 10
  # Set the search token separator
  # Default: /[\s\-/]+/
  # Example: enable support for hyphenated search words
  tokenizer_separator: /[\s/]+/
  # Display the relative url in search results
  # Supports true (default) or false
  rel_url: true
  # Enable or disable the search button that appears in the bottom right corner of every page
  # Supports true or false (default)
  button: false
  # Focus the search input by pressing `ctrl + focus_shortcut_key` (or `cmd + focus_shortcut_key` on macOS)
  focus_shortcut_key: 'k'
```

## Mermaid Diagrams (*)
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

The minimum configuration requires the key for `version` ([from jsDelivr](https://cdn.jsdelivr.net/npm/mermaid/)) in `_config.yml`:

```yaml
mermaid:
  # Version of mermaid library
  # Pick an available version from https://cdn.jsdelivr.net/npm/mermaid/
  version: "9.1.3"
```
 
## Aux links (*)

```yaml
# Aux links for the upper right navigation
aux_links:
  "Just the Docs on GitHub":
    - "//github.com/just-the-docs/just-the-docs"

# Makes Aux links open in a new tab. Default is false
aux_links_new_tab: false
```

## Heading anchor links (*)

```yaml
# Heading anchor links appear on hover over h1-h6 tags in page content
# allowing users to deep link to a particular heading on a page.
#
# Supports true (default) or false
heading_anchors: true
```

## External navigation links (*)
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

 

## Footer content (*)

```yaml
# Footer content
# appears at the bottom of every page's main content
# Note: The footer_content option is deprecated and will be removed in a future major release. Please use `_includes/footer_custom.html` for more robust
markup / liquid-based content.
footer_content: "Copyright &copy; 2017-2020 Patrick Marsceill. Distributed by an <a href=\"https://github.com/just-the-docs/just-the-docs/tree/main/LICENSE.txt\">MIT license.</a>"

# Footer last edited timestamp
last_edit_timestamp: true # show or hide edit time - page must have `last_modified_date` defined in the frontmatter
last_edit_time_format: "%b %e %Y at %I:%M %p" # uses ruby's time format: https://ruby-doc.org/stdlib-2.7.0/libdoc/time/rdoc/Time.html

# Footer "Edit this page on GitHub" link text
gh_edit_link: true # show or hide edit this page link
gh_edit_link_text: "Edit this page on GitHub."
gh_edit_repository: "https://github.com/just-the-docs/just-the-docs" # the github URL for your repo
gh_edit_branch: "main" # the branch that your docs is served from
# gh_edit_source: docs # the source that your files originate from
gh_edit_view_mode: "tree" # "tree" or "edit" if you want the user to jump into the editor immediately
```

_note: `footer_content` is deprecated, but still supported. For a better experience we have moved this into an include called `_includes/footer_custom.html` which will allow for robust markup / liquid-based content._

- the "page last modified" data will only display if a page has a key called `last_modified_date`, formatted in some readable date format
- `last_edit_time_format` uses Ruby's DateTime formatter; see examples and more information [at this link.](https://apidock.com/ruby/DateTime/strftime)
- `gh_edit_repository` is the URL of the project's GitHub repository
- `gh_edit_branch` is the branch that the docs site is served from; defaults to `main`
- `gh_edit_source` is the source directory that your project files are stored in (should be the same as [site.source](https://jekyllrb.com/docs/configuration/options/))
- `gh_edit_view_mode` is `"tree"` by default, which brings the user to the github page; switch to `"edit"` to bring the user directly into editing mode

## Color scheme (*)

```yaml
# Color scheme supports "light" (default) and "dark"
color_scheme: dark
```

<button class="btn js-toggle-dark-mode">Preview dark color scheme</button>

<script>
const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

jtd.addEvent(toggleDarkMode, 'click', function(){
  if (jtd.getTheme() === 'dark') {
    jtd.setTheme('light');
    toggleDarkMode.textContent = 'Preview dark color scheme';
  } else {
    jtd.setTheme('dark');
    toggleDarkMode.textContent = 'Return to the light side';
  }
});
</script>

See [Customization]({% link docs/data_representation.md %}) for more information.

## Callouts (*)
{: .d-inline-block }

New (v0.4.0)
{: .label .label-green }

To use this feature, you need to configure a `color` and (optionally) `title` for each kind of callout you want to use, e.g.:

```yaml
callouts:
  warning:
    title: Warning
    color: red
```

This uses the color `$red-000` for the background of the callout, and `$red-300` for the title and box decoration.[^dark] You can then style a paragraph as a `warning` callout like this:

```markdown
{: .warning }
A paragraph...
```

[^dark]:
    If you use the `dark` color scheme, this callout uses `$red-300` for the background, and `$red-000` for the title.

The colors `grey-lt`, `grey-dk`, `purple`, `blue`, `green`, `yellow`, and `red` are predefined; to use a custom color, you need to define its `000` and `300` levels in your SCSS files. For example, to use `pink`, add the following to your `_sass/custom/setup.scss` file:

```scss
$pink-000: #f77ef1;
$pink-100: #f967f1;
$pink-200: #e94ee1;
$pink-300: #dd2cd4;
```

You can override the default `opacity` of the background for a particular callout, e.g.:

```yaml
callouts:
  custom:
    color: pink
    opacity: 0.3
```

You can change the default opacity (`0.2`) for all callouts, e.g.:

```yaml
callouts_opacity: 0.3
```

You can also adjust the overall level of callouts.
The value of `callouts_level` is either `quiet` or `loud`;
`loud` increases the saturation and lightness of the backgrounds.
The default level is `quiet` when using the `light` or custom color schemes,
and `loud` when using the `dark color scheme.`

 
## Google Analytics (*)

{: .warning }
> [Google Analytics 4 will replace Universal Analytics](https://support.google.com/analytics/answer/11583528). On **July 1, 2023**, standard Universal Analytics properties will stop processing new hits. The earlier you migrate, the more historical data and insights you will have in Google Analytics 4.

Universal Analytics (UA) and Google Analytics 4 (GA4) properties are supported.

```yaml
# Google Analytics Tracking (optional)
# Supports a CSV of tracking ID strings (eg. "UA-1234567-89,G-1AB234CDE5")
ga_tracking: UA-2709176-10
ga_tracking_anonymize_ip: true # Use GDPR compliant Google Analytics settings (true/nil by default)
```

### Multiple IDs (*)
{: .d-inline-block .no_toc }

New (v0.4.0)
{: .label .label-green }

This theme supports multiple comma-separated tracking IDs. This helps seamlessly transition UA properties to GA4 properties by tracking both for a while.

```yaml
ga_tracking: "UA-1234567-89,G-1AB234CDE5"
```

## Document collections (*)

By default, the navigation and search include normal [pages](https://jekyllrb.com/docs/pages/).
You can also use [Jekyll collections](https://jekyllrb.com/docs/collections/) which group documents semantically together.

{: .warning }
> Collection folders always start with an underscore (`_`), e.g. `_tests`. You won't see your collections if you omit the prefix.

For example, put all your test files in the `_tests` folder and create the `tests` collection:

```yaml
# Define Jekyll collections
collections:
  # Define a collection named "tests", its documents reside in the "_tests" directory
  tests:
    permalink: "/:collection/:path/"
    output: true

just_the_docs:
  # Define which collections are used in just-the-docs
  collections:
    # Reference the "tests" collection
    tests:
      # Give the collection a name
      name: Tests
      # Exclude the collection from the navigation
      # Supports true or false (default)
      # nav_exclude: true
      # Fold the collection in the navigation
      # Supports true or false (default)
      # nav_fold: true  # note: this option is new in v0.4
      # Exclude the collection from the search
      # Supports true or false (default)
      # search_exclude: true
```

The navigation for all your normal pages (if any) is displayed before those in collections.

<span>New (v0.4.0)</span>{: .label .label-green }
Including `nav_fold: true` in a collection configuration *folds* that collection:
an expander symbol appears next to the collection name,
and clicking it displays/hides the links to the top-level pages of the collection.[^js-disabled]

[^js-disabled]: <span>New (v0.6.0)</span>{: .label .label-green }
    When JavaScript is disabled in the browser, all folded collections are automatically expanded,
    since clicking expander symbols has no effect.
    (In previous releases, navigation into folded collections required JavaScript to be enabled.)

You can reference multiple collections.
This creates categories in the navigation with the configured names.

```yaml
collections:
  tests:
    permalink: "/:collection/:path/"
    output: true
  tutorials:
    permalink: "/:collection/:path/"
    output: true

just_the_docs:
  collections:
    tests:
      name: Tests
    tutorials:
      name: Tutorials
```

When *all* your pages are in a single collection, its name is not displayed.

The navigation for each collection is a separate name space for page titles: a page in one collection cannot be a child of a page in a different collection, or of a normal page.
-->
