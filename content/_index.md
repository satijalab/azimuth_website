---
type: "static"
---

{{< section >}}

<p style='font-size:18px'>
Azimuth is a web application that uses an annotated reference dataset to <b>automate the processing, analysis, and interpretation of a new single-cell RNA-seq experiment</b>. Azimuth leverages a <b>'reference-based mapping'</b> pipeline that inputs a counts matrix of gene expression in single cells, and performs normalization, visualization, cell annotation, and differential expression (biomarker discovery). All results can be explored within the app, and easily downloaded for additional downstream analysis.
</p>

The development of Azimuth is led by the New York Genome Center Mapping Component as part of the [NIH Human Biomolecular Atlas Project (HuBMAP)](https://commonfund.nih.gov/hubmap). Eleven molecular reference maps are currently available, with more coming soon.

{{< /section >}}

{{< azimuth_references >}}

{{< azimuth_references_previous >}}

{{< section >}}

# General Workflow
1. Upload a single-cell gene expression matrix, or click the `Load demo dataset` button.
2. If desired, filter cells based on common QC metrics in the Preprocessing tab.
3. Click the `Map cells to reference` button to launch analysis. A query dataset of 10,000 cells will typically finish processing in less than 1 minute.
4. View results.
    * "Cell Plots" tab: Visualize query cells and annotations projected onto the reference UMAP.
    * "Feature Plots" tab: Explore the expression of individual features (genes) in your data, and automatically identify differentially expressed genes and biomarkers.
5. If desired, download files for further analysis from the "Download Results" tab.

# Run Azimuth Locally
You can also bypass the web application and run Azimuth on your local computer, directly in R. The following vignette demonstrates how to download a reference and map new data (either in Seurat, h5, or h5ad format), in only a few commands. Check it out [here](https://satijalab.github.io/azimuth/articles/run_azimuth_tutorial.html).

{{< /section >}}

{{< azimuth_faq >}}
